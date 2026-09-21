import test from "node:test";
import assert from "node:assert/strict";
import { localServices } from "../src/data/local-services.ts";
import {
  reviewedCitySlugs,
  getCityServiceBrief,
} from "../src/data/city-service-notes.ts";
import {
  filterCities,
  matchesSearch,
  serviceHref,
} from "../src/lib/directory.ts";
const defaults = { q: "", radius: "30", type: "all", sort: "name" };
const places = [
  {
    name: "Nürnberg",
    slug: "nuernberg",
    distance: 1,
    isCity: true,
    region: "Nürnberg",
    postalCodes: ["90403"],
  },
  {
    name: "Zirndorf",
    slug: "zirndorf",
    distance: 9,
    isCity: true,
    region: "Fürth",
    postalCodes: ["90513"],
  },
  {
    name: "Testgemeinde",
    slug: "testgemeinde",
    distance: 24,
    isCity: false,
    region: "Umland",
    postalCodes: ["90000"],
  },
];
test("German keyboard spellings and whitespace find the same town", () => {
  for (const q of ["Nürnberg", "nuernberg", "nurnberg", "  Nürnberg  "])
    assert.ok(
      filterCities(places, { ...defaults, q }).some(
        (city) => city.slug === "nuernberg",
      ),
    );
  assert.ok(matchesSearch("fuerth", "Fürth"));
  assert.ok(matchesSearch("strasse", "Straße"));
});
test("postal code, radius and type compose without mutating the source", () => {
  const before = places.map((city) => city.slug);
  const results = filterCities(places, {
    ...defaults,
    q: "90513",
    radius: "20",
    type: "city",
    sort: "distance",
  });
  assert.deepEqual(
    results.map((city) => city.slug),
    ["zirndorf"],
  );
  assert.deepEqual(
    places.map((city) => city.slug),
    before,
  );
  assert.equal(
    filterCities(places, { ...defaults, q: "no-such-place-zzzz" }).length,
    0,
  );
  assert.equal(
    filterCities(places, { ...defaults, radius: "20", type: "municipality" })
      .length,
    0,
  );
  assert.equal(
    filterCities(places, { ...defaults, type: "municipality" }).length,
    1,
  );
});
test("local destinations require reviewed content; unsupported pairs fall back", () => {
  const slugs = localServices.map((service) => service.slug);
  for (const city of reviewedCitySlugs)
    for (const slug of slugs) {
      assert.ok(getCityServiceBrief(city, slug));
      assert.equal(
        serviceHref(slug, city, slugs, reviewedCitySlugs),
        `/${city}/${slug}`,
      );
    }
  assert.equal(
    serviceHref("toilette-verstopft", "nuernberg", slugs, reviewedCitySlugs),
    "/service/toilette-verstopft",
  );
  assert.equal(
    serviceHref("rohrreinigung", "not-a-town", slugs, reviewedCitySlugs),
    "/service/rohrreinigung",
  );
});
