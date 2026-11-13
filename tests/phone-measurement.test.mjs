import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const repository = new URL("../", import.meta.url);

async function loadModule(path, dependencies, globals = {}) {
  const source = await readFile(new URL(path, repository), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: path,
  });
  const module = { exports: {} };
  vm.runInNewContext(outputText, {
    module,
    exports: module.exports,
    require(id) {
      assert.ok(Object.hasOwn(dependencies, id), `Unexpected dependency ${id}`);
      return dependencies[id];
    },
    process: { env: { NODE_ENV: "test" } },
    ...globals,
  });
  return module.exports;
}

async function phoneFixture(choice, { storageThrows = false } = {}) {
  const ga4 = [];
  const requests = [];
  let now = 100_000;
  let sequence = 0;
  const tracking = {
    source: "google",
    medium: "organic",
    campaign: "",
    gclid: null,
    gbraid: null,
    wbraid: null,
    landingPage: "https://rohrreinigung-kraft.de/service/kanalreinigung",
    currentPage: "https://rohrreinigung-kraft.de/service/kanalreinigung",
    referrer: "https://www.google.com/",
  };
  const api = await loadModule(
    "src/lib/tracking.ts",
    { "./gclid": { getGclid: () => null, getTrackingData: () => tracking } },
    {
      window: {
        localStorage: {
          getItem(key) {
            assert.equal(key, "rk_nuernberg_consent");
            if (storageThrows) throw new Error("Storage unavailable");
            return choice;
          },
        },
        gtag: (...args) => ga4.push(args),
      },
      Date: { now: () => now },
      crypto: { randomUUID: () => `event-${++sequence}` },
      fetch: (url, options) => {
        requests.push({ url, options });
        return Promise.resolve({ ok: true });
      },
      navigator: { sendBeacon: () => assert.fail("Unexpected retry") },
    },
  );
  return { api, ga4, requests, advance: (ms) => { now += ms; } };
}

for (const [label, choice] of [
  ["not chosen", null],
  ["rejected", "rejected"],
  ["unrecognised", "other"],
]) {
  test(`does not send phone telemetry when consent is ${label}`, async () => {
    const fixture = await phoneFixture(choice);
    fixture.api.trackDirectCallClick("service_hero");
    assert.equal(fixture.ga4.length, 0);
    assert.equal(fixture.requests.length, 0);
  });
}

test("unavailable consent storage does not throw or send phone telemetry", async () => {
  const fixture = await phoneFixture("accepted", { storageThrows: true });
  assert.doesNotThrow(() => fixture.api.trackDirectCallClick("service_hero"));
  assert.equal(fixture.ga4.length, 0);
  assert.equal(fixture.requests.length, 0);
});

test("an accepted click sends one engagement event and a matching logging ID", async () => {
  const fixture = await phoneFixture("accepted");
  fixture.api.trackDirectCallClick("service_hero");
  assert.equal(fixture.ga4.length, 1);
  const [command, name, params] = fixture.ga4[0];
  assert.equal(command, "event");
  assert.equal(name, "direct_call_click");
  assert.equal(params.send_to, "G-SFZFMCJXG2");
  assert.equal(params.event_category, "engagement");
  assert.equal(params.event_label, "service_hero");
  assert.equal(fixture.requests.length, 1);
  const { url, options } = fixture.requests[0];
  assert.equal(url, "/api/call-event");
  assert.equal(options.keepalive, true);
  const body = JSON.parse(options.body);
  assert.equal(body.eventType, "direct_call_click");
  assert.equal(body.eventId, params.event_id);
  assert.equal(body.source, "service_hero");
  assert.equal(body.utmMedium, "organic");
});

test("the existing phone aliases share the same 1.2-second deduplication guard", async () => {
  const fixture = await phoneFixture("accepted");
  fixture.api.trackDirectCallClick("service_hero");
  fixture.api.trackPhoneClick("contact_form");
  fixture.api.trackCallConfirmed("compatibility_import");
  assert.equal(fixture.ga4.length, 1);
  assert.equal(fixture.requests.length, 1);
  fixture.advance(1200);
  fixture.api.trackPhoneClick("service_bottom_cta");
  assert.equal(fixture.ga4.length, 2);
  assert.equal(fixture.requests.length, 2);
  assert.notEqual(fixture.ga4[0][2].event_id, fixture.ga4[1][2].event_id);
});

test("phone tracking remains safe during server rendering", async () => {
  const api = await loadModule("src/lib/tracking.ts", {
    "./gclid": { getGclid: () => null, getTrackingData: () => assert.fail("Unexpected tracking read") },
  });
  assert.doesNotThrow(() => api.trackDirectCallClick("server"));
});

test("TrackedPhoneLink preserves the immediate tel target, content, and attributes", async () => {
  const clicks = [];
  const { default: TrackedPhoneLink } = await loadModule(
    "src/components/ui/tracked-phone-link.tsx",
    {
      "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
      "@/lib/tracking": { trackDirectCallClick: (source) => clicks.push(source) },
    },
  );
  const link = TrackedPhoneLink({
    href: "tel:+4991189218682",
    source: "service_hero",
    className: "existing-styles",
    "aria-label": "Jetzt anrufen",
    children: "0911 89218682",
  });
  assert.equal(link.type, "a");
  assert.equal(link.props.href, "tel:+4991189218682");
  assert.equal(link.props.className, "existing-styles");
  assert.equal(link.props["aria-label"], "Jetzt anrufen");
  assert.equal(link.props.children, "0911 89218682");
  assert.equal(Object.hasOwn(link.props, "source"), false);
  assert.equal(clicks.length, 0);
  link.props.onClick();
  assert.deepEqual(clicks, ["service_hero"]);
});

async function sourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) files.push(...await sourceFiles(url));
    else if (entry.name.endsWith(".tsx")) files.push(url);
  }
  return files;
}

test("every public company telephone link has an explicit tracking handler or wrapper", async () => {
  const uncovered = [];
  const telephoneOpeningTag = /<(Link|a|TrackedPhoneLink)\b([^>]*href=\{`tel:\$\{company\.contact\.phone\}`\}[^>]*)>/g;
  for (const file of await sourceFiles(new URL("src/", repository))) {
    const source = await readFile(file, "utf8");
    for (const match of source.matchAll(telephoneOpeningTag)) {
      if (match[1] !== "TrackedPhoneLink" && !/\bonClick=/.test(match[2])) {
        uncovered.push(file.pathname);
      }
    }
  }
  assert.deepEqual(uncovered, []);
});
