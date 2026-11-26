import test from "node:test";
import assert from "node:assert/strict";
import { getRrkReport, validReportDates } from "../src/lib/rrk-ads-reports";
import { searchGoogleAds } from "../src/lib/google-ads";

const config = { developerToken: "test", clientId: "test", clientSecret: "test", refreshToken: "test", customerId: "789-424-2096" };
const dates = { startDate: "2026-11-10", endDate: "2026-11-25" };

test("checks real calendar dates, order and the report account before querying", async () => {
  assert.equal(validReportDates(dates), true);
  assert.equal(validReportDates({ ...dates, startDate: "2026-02-30" }), false);
  assert.equal(validReportDates({ ...dates, endDate: dates.startDate + "'" }), false);
  assert.equal(validReportDates({ ...dates, endDate: "2026-01-01" }), false);
  await assert.rejects(getRrkReport({ ...config, customerId: "999" }, "rrk_terms", dates), /account mismatch/);
});

test("v24 search follows server page tokens without specifying a page size", async () => {
  const original = globalThis.fetch;
  const requests: Record<string, unknown>[] = [];
  try {
    globalThis.fetch = (async (url, options) => {
      if (String(url).includes("oauth2.googleapis.com")) return Response.json({ access_token: "test" });
      requests.push(JSON.parse(String(options?.body)));
      return requests.length === 1
        ? Response.json({ results: [1, 2], nextPageToken: "second" })
        : Response.json({ results: [3] });
    }) as typeof fetch;
    assert.deepEqual(await searchGoogleAds(config, "SELECT customer.id FROM customer"), [1,2,3]);
    assert.deepEqual(requests, [
      { query: "SELECT customer.id FROM customer" },
      { query: "SELECT customer.id FROM customer", pageToken: "second" },
    ]);
  } finally { globalThis.fetch = original; }
});
