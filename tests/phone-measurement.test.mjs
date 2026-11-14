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
    fixture.api.trackCallConfirmed("hero");
    assert.equal(fixture.ga4.length, 0);
    assert.equal(fixture.requests.length, 0);
  });
}

test("unavailable consent storage does not throw or send phone telemetry", async () => {
  const fixture = await phoneFixture("accepted", { storageThrows: true });
  assert.doesNotThrow(() => fixture.api.trackDirectCallClick("service_hero"));
  assert.doesNotThrow(() => fixture.api.trackCallConfirmed("hero"));
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

test("phone events share the same 1.2-second deduplication guard", async () => {
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
  assert.doesNotThrow(() => api.trackCallConfirmed("server"));
});

test("confirmed intent sends only the existing call_confirmed event and matching ledger ID", async () => {
  const fixture = await phoneFixture("accepted");
  fixture.api.trackCallConfirmed("hero");
  fixture.api.trackCallConfirmed("hero");
  fixture.api.trackDirectCallClick("hero");
  assert.equal(fixture.ga4.length, 1);
  const [command, name, params] = fixture.ga4[0];
  assert.equal(command, "event");
  assert.equal(name, "call_confirmed");
  assert.equal(params.send_to, "G-SFZFMCJXG2");
  assert.equal(params.event_category, "lead");
  assert.equal(params.interaction_type, "confirmed_call_intent");
  assert.equal(params.interaction_location, "call_confirmation_modal");
  assert.equal(fixture.requests.length, 1);
  const body = JSON.parse(fixture.requests[0].options.body);
  assert.equal(body.eventType, "call_confirmed");
  assert.equal(body.eventId, params.event_id);
  assert.equal(body.source, "hero");
  fixture.advance(1200);
  fixture.api.trackDirectCallClick("service_hero");
  assert.equal(fixture.ga4[1][1], "direct_call_click");
  assert.notEqual(fixture.ga4[1][2].event_id, params.event_id);
});

function nodesIn(tree) {
  if (!tree || typeof tree !== "object") return [];
  if (Array.isArray(tree)) return tree.flatMap(nodesIn);
  return [tree, ...nodesIn(tree.props?.children)];
}

function textIn(tree) {
  if (typeof tree === "string") return tree;
  if (!tree || typeof tree !== "object") return "";
  if (Array.isArray(tree)) return tree.map(textIn).join("");
  return textIn(tree.props?.children);
}

async function modalFixture(tracking) {
  const state = [];
  let cursor = 0;
  let mounted = false;
  const location = { href: "" };
  const jsx = (type, props) => ({ type, props });
  const { default: CallConfirmModal } = await loadModule(
    "src/components/layout/CallConfirmModal.tsx",
    {
      react: {
        useState(initial) {
          const index = cursor++;
          if (!(index in state)) state[index] = initial;
          return [state[index], (value) => { state[index] = value; }];
        },
        useEffect(effect) {
          if (!mounted) { mounted = true; effect(); }
        },
      },
      "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "fragment" },
      "lucide-react": Object.fromEntries(
        ["Phone", "X", "Clock", "CheckCircle", "AlertCircle", "Loader2"]
          .map((name) => [name, name]),
      ),
      "@/data/company": { company: { contact: {
        phone: "+4991189218682", phoneDisplay: "0911 89218682",
      } } },
      "@/lib/tracking": tracking,
    },
    { window: { location }, setTimeout: () => 1 },
  );
  const render = () => {
    cursor = 0;
    return CallConfirmModal({ isOpen: true, source: "hero", onClose() {} });
  };
  const button = (tree, label) => nodesIn(tree).find(
    (node) => node.type === "button" && textIn(node).includes(label),
  );
  return { render, button, location };
}

test("opening the modal and its first confirmation do not convert; only its final button does", async () => {
  const fixture = await phoneFixture("accepted");
  const modal = await modalFixture(fixture.api);
  let tree = modal.render();
  assert.equal(fixture.ga4.length, 0);
  modal.button(tree, "Ja, jetzt anrufen").props.onClick();
  assert.equal(fixture.ga4.length, 0);
  assert.equal(modal.location.href, "");
  tree = modal.render();
  modal.button(tree, "Jetzt direkt anrufen").props.onClick();
  assert.equal(modal.location.href, "tel:+4991189218682");
  assert.deepEqual(fixture.ga4.map((entry) => entry[1]), ["call_confirmed"]);
  assert.equal(fixture.requests.length, 1);
  tree = modal.render();
  assert.ok(nodesIn(tree).some((node) =>
    node.type === "button" && node.props.disabled && textIn(node).includes("Verbinde")));
});

test("the final modal button still dials when analytics consent is absent", async () => {
  const fixture = await phoneFixture(null);
  const modal = await modalFixture(fixture.api);
  modal.button(modal.render(), "Ja, jetzt anrufen").props.onClick();
  modal.button(modal.render(), "Jetzt direkt anrufen").props.onClick();
  assert.equal(modal.location.href, "tel:+4991189218682");
  assert.equal(fixture.ga4.length, 0);
  assert.equal(fixture.requests.length, 0);
});

for (const eventType of ["direct_call_click", "call_confirmed"]) {
  test(`logs ${eventType} without claiming a connected conversation`, async () => {
    const payloads = [];
    const api = await loadModule("src/app/api/call-event/route.ts", {
      "next/server": { NextResponse: { json: (body, init) => ({ body, status: init?.status || 200 }) } },
      "@/lib/customer-events-sheet": {
        postCustomerEventToSheet: async (_url, payload) => {
          payloads.push(payload);
          return { success: true, sheetName: "📞 Alle Anfragen", row: 3 };
        },
      },
    });
    const response = await api.POST({ json: async () => ({
      eventType, eventId: "test-intent-1", source: "hero", utmSource: "google",
      utmMedium: "cpc", utmCampaign: "high-intent", gclid: "test-click-id",
    }) });
    assert.equal(response.status, 200);
    assert.equal(payloads.length, 1);
    assert.equal(payloads[0].eventName, eventType);
    assert.equal(payloads[0].callStatus, "not_confirmed");
    assert.equal(payloads[0].eventId, "test-intent-1");
    assert.equal(payloads[0].gclid, "test-click-id");
    assert.equal(payloads[0].source, "google / cpc");
    if (eventType === "call_confirmed") {
      assert.equal(payloads[0].name, "📞 Anrufabsicht bestätigt");
      assert.match(payloads[0].message, /Gespräch nicht bestätigt/);
    } else {
      assert.equal(payloads[0].name, "📞 Website-Telefonklick");
      assert.match(payloads[0].message, /Klick auf einen Telefonlink/);
    }
  });
}

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
