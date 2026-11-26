import assert from "node:assert/strict";
import test from "node:test";
import { getTrackingData, initGclidTracking } from "../src/lib/gclid.ts";

const campaignName = "RK | Search | Mittelfranken | High Intent";

test("matched keyword and campaign stay together across visits and ad clicks", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const previous = Object.fromEntries(["window", "document", "localStorage"].map(
    (key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)],
  ));
  Object.defineProperties(globalThis, {
    window: { value: {}, configurable: true },
    document: { value: { referrer: "" }, configurable: true },
    localStorage: { value: storage, configurable: true },
  });
  const visit = (path) => {
    window.location = new URL(path, "https://rohrreinigung-kraft.de");
    initGclidTracking();
    const { keyword, campaign, campaignId, gclid } = getTrackingData();
    return { keyword, campaign, campaignId, gclid };
  };

  try {
    const tagged = { keyword: "abfluss nähe", campaign: campaignName, campaignId: "23874769195", gclid: "click-1" };
    assert.deepEqual(visit("/?gclid=click-1&campaignid=23874769195&keyword=abfluss+n%C3%A4he"), tagged);
    assert.deepEqual(visit("/kontakt"), tagged);
    const blank = { keyword: "", campaign: "", campaignId: "", gclid: null };
    assert.deepEqual(visit("/?gclid=click-2"), { ...blank, gclid: "click-2" });
    assert.deepEqual(visit("/?gad_campaignid=23874769195"), { ...blank, campaign: campaignName, campaignId: "23874769195" });
    assert.deepEqual(visit("/?utm_source=bing&utm_medium=cpc&utm_term=other&utm_campaign=bing-local"), { ...blank, campaign: "bing-local" });
    assert.equal(storage.getItem("rk_gclid"), "click-2");
    assert.deepEqual(visit("/?utm_source=bing&gclid=unrelated&keyword=no"), blank);
    assert.equal(storage.getItem("rk_gclid"), "click-2");
    assert.deepEqual(visit("/?gbraid=braid-1&utm_term=service&utm_campaign=Label&campaignid=999"), {
      ...blank, keyword: "service", campaign: "Label", campaignId: "999",
    });
    assert.deepEqual(visit("/?gclid=click-3&keyword={keyword}&campaignid={campaignid}"), { ...blank, gclid: "click-3" });
    assert.deepEqual(visit("/?campaignid=23874769195"), { ...blank, campaign: campaignName, campaignId: "23874769195" });
    assert.deepEqual(visit("/?gclid=click-num&utm_campaign=23874769195"), { ...blank, campaign: campaignName, campaignId: "23874769195", gclid: "click-num" });
    visit("/?gclid=click-old&gad_campaignid=23874769195&keyword=old");
    storage.setItem("rk_gclid_ts", String(Date.now() - 91 * 86400000));
    assert.deepEqual(visit("/kontakt"), blank);
    assert.deepEqual(visit("/?gclid=click-fresh&campaignid=999&keyword=frisch"), {
      ...blank, keyword: "frisch", campaignId: "999", gclid: "click-fresh",
    });
    const firstTab = new Map(), secondTab = new Map();
    const openTab = (tab) => {
      window.sessionStorage = { setItem: (k, v) => tab.set(k, v), getItem: (k) => tab.get(k) ?? null };
    };
    openTab(firstTab);
    const first = visit("/?gclid=first&campaignid=23874769195&keyword=eins");
    openTab(secondTab);
    visit("/?gclid=second&campaignid=999&keyword=zwei");
    openTab(firstTab);
    assert.deepEqual(visit("/kontakt"), first);
  } finally {
    for (const [key, descriptor] of Object.entries(previous)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
