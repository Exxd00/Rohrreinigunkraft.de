/** Match German names with umlauts or their keyboard spelling. */
export function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("de")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/ae/g, "a")
    .replace(/oe/g, "o")
    .replace(/ue/g, "u")
    .replace(/[-_]/g, " ");
}
export function matchesSearch(query: string, ...fields: string[]) {
  const text = normalizeSearch(fields.join(" "));
  return normalizeSearch(query)
    .trim()
    .split(/\s+/)
    .every((word) => text.includes(word));
}
export type CityDirectoryEntry = {
  name: string;
  slug: string;
  distance: number;
  isCity: boolean;
  region: string;
  postalCodes: string[];
};
export function filterCities(
  entries: CityDirectoryEntry[],
  filters: { q: string; radius: string; type: string; sort: string },
) {
  return entries
    .filter(
      (city) =>
        city.distance <= Number(filters.radius) &&
        (filters.type !== "city" || city.isCity) &&
        (filters.type !== "municipality" || !city.isCity) &&
        matchesSearch(
          filters.q,
          city.name,
          city.slug,
          city.region,
          ...city.postalCodes,
        ),
    )
    .sort((a, b) =>
      filters.sort === "distance"
        ? a.distance - b.distance || a.name.localeCompare(b.name, "de")
        : a.name.localeCompare(b.name, "de"),
    );
}
export function serviceHref(
  slug: string,
  city: string,
  localSlugs: readonly string[],
  reviewedCities: readonly string[],
) {
  return city && localSlugs.includes(slug) && reviewedCities.includes(city)
    ? `/${city}/${slug}`
    : `/service/${slug}`;
}
