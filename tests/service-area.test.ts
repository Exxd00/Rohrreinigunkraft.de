import test from "node:test";
import assert from "node:assert/strict";
import { cities, getCityBySlug, nearestCities } from "../src/data/cities";
import { distanceKm, serviceArea } from "../src/data/service-area";
import { localServices } from "../src/data/local-services";
import { reviewedCitySlugs, getCityServiceBrief } from "../src/data/city-service-notes";
import { pageMetadata } from "../src/lib/page-seo";
import sitemap from "../src/app/sitemap";

test("coverage follows coordinates, not the former approximate distance labels", () => {
  assert.equal(distanceKm(serviceArea.center.latitude, serviceArea.center.longitude), 0);
  assert.equal(cities.length, 97);
  for (const city of cities) {
    assert.ok(distanceKm(city.latitude, city.longitude) <= 30);
    assert.ok(city.description.length > 150);
  }
  assert.ok(getCityBySlug("postbauer-heng"));
  assert.equal(getCityBySlug("ansbach"), undefined);
  assert.equal(getCityBySlug("forchheim"), undefined);
  assert.equal(getCityBySlug("zerzabelshofer-forst"), undefined);
});

test("every city has exactly eight individually authored service briefs", () => {
  const citySlugs = cities.filter(city => city.isCity).map(city => city.slug).sort();
  assert.deepEqual([...reviewedCitySlugs].sort(), citySlugs);
  const normalized = new Set<string>();
  for (const city of reviewedCitySlugs) {
    for (const service of localServices) {
      const brief = getCityServiceBrief(city, service.slug);
      assert.ok(brief && brief.length > 170);
      const withoutPlaceNames = cities.reduce((text, place) => text.replaceAll(place.name, "ORT"), brief!);
      assert.equal(normalized.has(withoutPlaceNames), false);
      normalized.add(withoutPlaceNames);
    }
  }
  assert.equal(normalized.size, 160);
  assert.equal(getCityServiceBrief("ansbach", "rohrreinigung"), undefined);
  assert.equal(getCityServiceBrief("nuernberg", "invented-service"), undefined);
});

test("sitemap contains unique, self-canonical public pages and no retired area", () => {
  const entries = sitemap();
  assert.equal(entries.length, 355);
  assert.equal(new Set(entries.map(entry => entry.url)).size, entries.length);
  assert.ok(entries.some(entry => entry.url.endsWith("/nuernberg/rohrreinigung")));
  assert.equal(entries.some(entry => /\/(ansbach|forchheim|thank-you|admin)(\/|$)/.test(entry.url)), false);
  for (const entry of entries) {
    const path = new URL(entry.url).pathname;
    assert.equal(pageMetadata(path, "Title", "Description").alternates?.canonical, entry.url);
    assert.equal(entry.lastModified, "2026-09-29");
  }
});

test("nearby navigation is local to the selected municipality", () => {
  const city = getCityBySlug("roethenbach-an-der-pegnitz")!;
  const nearby = nearestCities(city);
  assert.ok(nearby.some(other => other.slug === "rueckersdorf"));
  assert.equal(nearby.some(other => other.slug === city.slug), false);
  assert.equal(new Set(nearby.map(other => other.slug)).size, 4);
});
