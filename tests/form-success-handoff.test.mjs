import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Exercise the actual component and its submit handler with isolated hook,
// storage, router and fetch doubles. No request or analytics event can escape.
const source = await readFile(
  new URL("../src/components/home/ContactForm.tsx", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  },
  fileName: "ContactForm.tsx",
});

function findNode(tree, predicate) {
  if (Array.isArray(tree)) {
    for (const child of tree) {
      const found = findNode(child, predicate);
      if (found) return found;
    }
  } else if (tree && typeof tree === "object") {
    if (predicate(tree)) return tree;
    return findNode(tree.props?.children, predicate);
  }
  return undefined;
}

function textContent(tree) {
  if (Array.isArray(tree)) return tree.map(textContent).join(" ");
  if (tree && typeof tree === "object") return textContent(tree.props?.children);
  return typeof tree === "string" || typeof tree === "number" ? String(tree) : "";
}

function createForm({
  failStorageWrite,
  failRouterPush = false,
  responses = [{ ok: true, result: { recorded: true } }],
} = {}) {
  const slots = [];
  let cursor = 0;
  let uuidCount = 0;
  let tree;
  const requests = [];
  const alerts = [];
  const writes = [];
  const storage = new Map();
  const navigations = [];
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    react: {
      useState(initial) {
        const index = cursor++;
        if (index >= slots.length) {
          slots[index] = typeof initial === "function" ? initial() : initial;
        }
        return [slots[index], (value) => {
          slots[index] = typeof value === "function" ? value(slots[index]) : value;
        }];
      },
      useRef(initial) {
        const index = cursor++;
        if (index >= slots.length) slots[index] = { current: initial };
        return slots[index];
      },
      useCallback: (callback) => callback,
    },
    "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "fragment" },
    "next/navigation": {
      useRouter: () => ({
        push(path) {
          navigations.push(path);
          if (failRouterPush) throw new Error("Navigation unavailable");
        },
      }),
    },
    "next/link": () => null,
    "lucide-react": Object.fromEntries(
      ["Send", "Phone", "Clock", "Users", "Loader2", "CheckCircle", "Zap", "Upload", "X", "Camera"]
        .map((name) => [name, () => null]),
    ),
    "@/components/ui/button": { Button: "button" },
    "@/components/ui/input": { Input: "input" },
    "@/components/ui/textarea": { Textarea: "textarea" },
    "@/components/ui/label": { Label: "label" },
    "@/data/company": {
      company: {
        contact: { phone: "+4991189218682", phoneDisplay: "0911 89218682" },
        pricing: { services: { rohrreinigung: { from: 79 }, toiletteVerstopft: { from: 79 } } },
        stats: { projectsCompleted: "test", satisfactionRate: "test" },
      },
    },
    "@/lib/imageCompression": {
      compressImage: () => assert.fail("Unexpected image upload"),
      formatFileSize: () => "",
    },
    "@/lib/tracking": {
      getCompleteTrackingData: () => ({
        source: "direct", medium: "none", campaign: "", referrer: "direct",
      }),
      trackPhoneClick: () => assert.fail("Unexpected phone event"),
      trackCTAClick: () => assert.fail("Unexpected click event"),
    },
  };
  const module = { exports: {} };
  vm.runInNewContext(outputText, {
    module,
    exports: module.exports,
    require(id) {
      assert.ok(Object.hasOwn(dependencies, id), `Unexpected dependency ${id}`);
      return dependencies[id];
    },
    process: { env: { NODE_ENV: "test" } },
    console: { error() {}, warn() {} },
    crypto: { randomUUID: () => `test-event-${++uuidCount}` },
    alert: (message) => alerts.push(message),
    sessionStorage: {
      setItem(key, value) {
        writes.push({ key, value });
        if (writes.length === failStorageWrite) throw new Error("Storage unavailable");
        storage.set(key, value);
      },
      removeItem: (key) => storage.delete(key),
      getItem: (key) => storage.get(key) ?? null,
    },
    fetch: async (url, options) => {
      const index = requests.length;
      requests.push({ url, options, body: JSON.parse(options.body) });
      const entry = responses[index];
      assert.ok(entry, "Unexpected additional request");
      const response = entry.wait ? await entry.wait : entry;
      if (response.error) throw new Error(response.error);
      return { ok: response.ok, json: async () => response.result };
    },
  });

  function render() {
    cursor = 0;
    tree = module.exports.default();
    return tree;
  }
  function form() {
    return findNode(tree, (node) => node.type === "form");
  }
  function status() {
    return findNode(tree, (node) => node.props?.role === "status");
  }
  render();
  for (const [name, value] of Object.entries({
    name: "Test Person", phone: "00000000", city: "Nürnberg", service: "Rohrreinigung",
  })) {
    const field = findNode(tree, (node) => node.props?.name === name);
    assert.ok(field, `Missing ${name} field`);
    field.props.onChange({ target: { name, value } });
    render();
  }
  const privacy = findNode(tree, (node) => node.props?.id === "privacy");
  privacy.props.onChange({ target: { checked: true } });
  render();
  const originalSubmit = form().props.onSubmit;

  async function submit(handler = form().props.onSubmit) {
    await handler({ preventDefault() {} });
    render();
  }
  return {
    submit, originalSubmit, form, status, requests, alerts, writes, storage, navigations,
    uuidCount: () => uuidCount,
  };
}

for (const [label, options] of [
  ["first storage write fails", { failStorageWrite: 1 }],
  ["second storage write fails", { failStorageWrite: 2 }],
  ["router navigation throws", { failRouterPush: true }],
]) {
  test(`a saved request remains successful when ${label}`, async () => {
    const form = createForm(options);
    await form.submit();
    assert.equal(form.requests.length, 1);
    assert.equal(form.requests[0].url, "/api/contact");
    assert.equal(form.requests[0].body.requestType, "contact");
    assert.equal(form.uuidCount(), 1);
    assert.equal(form.alerts.length, 0);
    assert.ok(form.status());
    assert.match(textContent(form.status()), /erfolgreich gespeichert/);
    assert.equal(form.form().props.hidden, true);

    // Calling either the current hidden form or its pre-success handler must
    // not create another request or another idempotency ID.
    await form.submit();
    await form.submit(form.originalSubmit);
    assert.equal(form.requests.length, 1);
    assert.equal(form.uuidCount(), 1);
    assert.equal(form.alerts.length, 0);
  });
}

test("normal confirmed success passes the same event ID and redirects once", async () => {
  const form = createForm();
  await form.submit();
  const id = form.requests[0].body.eventId;
  assert.equal(form.storage.get("kraft_form_event_id"), id);
  assert.equal(form.storage.get("form_submitted"), "true");
  assert.deepEqual(form.writes.map(({ key }) => key), ["kraft_form_event_id", "form_submitted"]);
  assert.deepEqual(form.navigations, ["/thank-you"]);
  assert.equal(form.alerts.length, 0);
  assert.ok(form.status());
  assert.equal(form.form().props.hidden, true);
  await form.submit(form.originalSubmit);
  assert.equal(form.requests.length, 1);
  assert.equal(form.uuidCount(), 1);
  assert.deepEqual(form.navigations, ["/thank-you"]);
});

for (const [label, failure] of [
  ["server failure", { ok: false, result: { recorded: false, error: "Not saved" } }],
  ["network failure", { error: "Network unavailable" }],
]) {
  test(`${label} leaves the form available and retries with the same event ID`, async () => {
    const form = createForm({ responses: [failure, { ok: true, result: { recorded: true } }] });
    await form.submit();
    assert.equal(form.status(), undefined);
    assert.notEqual(form.form().props.hidden, true);
    assert.equal(form.writes.length, 0);
    assert.equal(form.navigations.length, 0);
    assert.equal(form.alerts.length, 1);
    await form.submit();
    assert.equal(form.requests.length, 2);
    assert.equal(form.requests[0].body.eventId, form.requests[1].body.eventId);
    assert.equal(form.uuidCount(), 1);
    assert.ok(form.status());
    assert.equal(form.form().props.hidden, true);
  });
}

test("HTTP 200 without recorded=true does not show success or attempt handoff", async () => {
  const form = createForm({ responses: [{ ok: true, result: { recorded: false } }] });
  await form.submit();
  assert.equal(form.status(), undefined);
  assert.notEqual(form.form().props.hidden, true);
  assert.equal(form.writes.length, 0);
  assert.equal(form.navigations.length, 0);
  assert.equal(form.alerts.length, 1);
});

function deferredResponse() {
  let resolve;
  let reject;
  const wait = new Promise((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { wait, resolve, reject };
}

for (const lateFailure of ["server response", "network rejection"]) {
  test(`a late ${lateFailure} cannot overturn another confirmed attempt`, async () => {
    const first = deferredResponse();
    const second = deferredResponse();
    const form = createForm({ responses: [{ wait: first.wait }, { wait: second.wait }] });

    // Both handlers start before either response arrives, so the same pending
    // event ID must identify both requests for server-side deduplication.
    const firstAttempt = form.submit(form.originalSubmit);
    const secondAttempt = form.submit(form.originalSubmit);
    assert.equal(form.requests.length, 2);
    assert.equal(form.requests[0].body.eventId, form.requests[1].body.eventId);
    assert.equal(form.uuidCount(), 1);

    first.resolve({ ok: true, result: { recorded: true } });
    await firstAttempt;
    assert.ok(form.status());
    assert.equal(form.form().props.hidden, true);
    assert.equal(form.alerts.length, 0);

    if (lateFailure === "server response") {
      second.resolve({ ok: false, result: { recorded: false, error: "Late server failure" } });
    } else {
      second.reject(new Error("Late network failure"));
    }
    await secondAttempt;
    assert.ok(form.status());
    assert.match(textContent(form.status()), /erfolgreich gespeichert/);
    assert.equal(form.form().props.hidden, true);
    assert.equal(form.alerts.length, 0);

    await form.submit();
    await form.submit(form.originalSubmit);
    assert.equal(form.requests.length, 2);
    assert.equal(form.uuidCount(), 1);
    assert.equal(form.alerts.length, 0);
  });
}
