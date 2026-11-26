import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { getPathMatch } = require(
  "next/dist/shared/lib/router/utils/path-match",
);
const nextConfig = require("../next.config.js");
const redirects = await nextConfig.redirects();

test("redirects the bare service path to the catalogue with HTTP 301", () => {
  const redirect = redirects.find((entry) => entry.source === "/service");
  assert.deepEqual(redirect, {
    source: "/service",
    destination: "/leistungen",
    statusCode: 301,
  });
});

test("reviewed local pages remain reachable and municipality aliases stay specific", () => {
  for (const slug of [
    "rohrreinigung",
    "abflussreinigung",
    "kanalreinigung",
    "rohrreinigung-notdienst",
  ]) {
    const localRedirects = redirects.filter(entry => !entry.has);
    for (const entry of localRedirects) {
      const match = getPathMatch(entry.source);
      assert.equal(match(`/service/${slug}`), false);
      assert.equal(match(`/nuernberg/${slug}`), false);
    }
    const alias = redirects.find(entry => entry.source === `/feucht/${slug}`);
    assert.equal(alias?.destination, "/feucht");
    assert.equal(alias?.permanent, true);
  }
});

test("emits only the configured thank-you event name", async () => {
  const source = await readFile(
    new URL("../src/lib/tracking.ts", import.meta.url),
    "utf8",
  );
  assert.match(source, /trackEvent\("thank_you_page",/);
  assert.doesNotMatch(source, /trackEvent\("kraft_thank_you",/);
});

test("neutralizes formula-leading spreadsheet values", async () => {
  const source = await readFile(
    new URL("../scripts/google-sheets-customer-events.gs", import.meta.url),
    "utf8",
  );
  const context = vm.createContext({});
  vm.runInContext(source, context);
  const safeCell = (value) =>
    vm.runInContext(`safeCell_(${JSON.stringify(value)})`, context);

  assert.equal(safeCell("=IMPORTXML(1)"), "'=IMPORTXML(1)");
  assert.equal(safeCell("  +49911"), "'  +49911");
  assert.equal(safeCell("normal text"), "normal text");
});

test("keeps the current production payload valid during rollout", async () => {
  const source = await readFile(
    new URL("../scripts/google-sheets-customer-events.gs", import.meta.url),
    "utf8",
  );
  const context = vm.createContext({});
  vm.runInContext(source, context);
  const legacyPayload = {
    sourceSite: "rohrreinigung-kraft.de",
    eventId: "legacy-rollout-event",
    timestamp: "2026-09-01T00:00:00.000Z",
  };
  assert.doesNotThrow(() =>
    vm.runInContext(`validatePayload_(${JSON.stringify(legacyPayload)})`, context),
  );
  assert.throws(
    () =>
      vm.runInContext(
        `validatePayload_(${JSON.stringify({ ...legacyPayload, schemaVersion: "wrong", targetSheet: "wrong" })})`,
        context,
      ),
    /Invalid schema/,
  );
});

test("web app uses a script lock and the configured spreadsheet to append the ad fields once", async () => {
  const source = await readFile(new URL("../scripts/google-sheets-customer-events.gs", import.meta.url), "utf8");
  const rows = [];
  let locked = false;
  const sheet = {
    getLastRow: () => rows.length + 2,
    appendRow(row) { assert.equal(locked, true); rows.push([...row]); },
    getRange(row, col) {
      if (row === 1) return { getDisplayValues: () => [vm.runInContext("REQUIRED_HEADERS", context)] };
      assert.equal(col, 18);
      return { createTextFinder: (id) => ({
        matchEntireCell: () => ({ findNext: () => rows[0]?.[17] === id ? { getRow: () => 3 } : null }),
      }) };
    },
  };
  const context = vm.createContext({
    LockService: { getScriptLock: () => ({
      waitLock() { assert.equal(locked, false); locked = true; },
      releaseLock() { locked = false; },
    }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty(key) {
      assert.equal(key, "CUSTOMER_EVENTS_SPREADSHEET_ID");
      return "fixture-spreadsheet";
    } }) },
    SpreadsheetApp: { openById(id) {
      assert.equal(id, "fixture-spreadsheet");
      return { getSheetByName(name) { assert.equal(name, "📞 Alle Anfragen"); return sheet; } };
    } },
    ContentService: { MimeType: { JSON: "json" }, createTextOutput: (raw) => ({ setMimeType: () => JSON.parse(raw) }) },
  });
  vm.runInContext(source, context);
  const event = { postData: { contents: JSON.stringify({
    sourceSite: "rohrreinigung-kraft.de", timestamp: "2026-11-26T07:00:00Z", eventId: "example-event",
    campaign: "Campaign", keyword: "=literal", campaignId: "12345678901234567890",
  }) } };
  assert.equal(context.doPost(event).success, true);
  assert.equal(context.doPost(event).duplicate, true);
  assert.equal(rows.length, 1);
  assert.equal(rows[0][14], "Campaign");
  assert.deepEqual(rows[0].slice(17), ["example-event", "", "", "", "'=literal", "'12345678901234567890"]);
  assert.equal(locked, false);
});
