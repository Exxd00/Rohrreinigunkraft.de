import test from "node:test";
import assert from "node:assert/strict";
import { getServicePrice } from "../src/lib/service-pricing";
import { services } from "../src/data/services";

test("unpriced repair and specialist services never inherit a cleaning price", () => {
  for (const slug of ["inliner-sanierung", "rissreparatur", "partielle-reparatur", "kanalsanierung", "not-a-service"]) {
    assert.equal(getServicePrice(slug), undefined, slug);
  }
  assert.equal(getServicePrice("rohrreinigung"), 89);
  assert.equal(getServicePrice("kanalreinigung"), 149);
  assert.equal(getServicePrice("kamera-inspektion"), 129);
});

test("only the nine explicitly priced catalogue services expose a numeric offer", () => {
  const priced = services.filter(service => getServicePrice(service.slug) !== undefined);
  assert.equal(priced.length, 9);
  for (const service of priced) assert.ok(getServicePrice(service.slug)! > 0);
});
