import municipalities from "./municipalities.json";
import { cityGuides, type CityGuide } from "./city-guides";
import { municipalityNotes } from "./municipality-notes";
import { distanceKm, serviceArea } from "./service-area";

export interface City {
  name: string;
  slug: string;
  region: string;
  distance: number;
  latitude: number;
  longitude: number;
  isCity: boolean;
  ags: string;
  description: string;
  postalCodes: string[];
  guide: CityGuide;
  population?: number;
}

export const cities: City[] = municipalities
  .filter(
    (city) => distanceKm(city.latitude, city.longitude) <= serviceArea.radiusKm,
  )
  .map((city) => {
    const description =
      cityGuides[city.slug]?.context ?? municipalityNotes[city.slug];
    if (!description)
      throw new Error(`Missing editorial content for ${city.slug}`);
    return {
      ...city,
      distance: Math.round(distanceKm(city.latitude, city.longitude) * 10) / 10,
      description,
      // Administrative postcode, not an exhaustive service boundary.
      postalCodes: [city.postalCode],
      guide: cityGuides[city.slug] ?? {
        heading: `Einen Termin in ${city.name} vorbereiten`,
        context: description,
        access:
          "Für die fachliche Vorbereitung nennen Sie den betroffenen Ablauf, die Etage und einen bekannten Revisionszugang. Klären Sie, wer das Objekt öffnen kann. Eine Aussage über Rohrmaterial oder Zustand treffen wir erst nach dem Befund.",
        planning:
          "Halten Sie vorhandene Leitungspläne und frühere Berichte bereit. Am Telefon besprechen wir den Umfang, die aktuelle Verfügbarkeit und mögliche Anfahrtskosten. Vor Arbeitsbeginn wird der Preis für die vereinbarte Leistung abgestimmt.",
      },
    };
  });

export const regions = [...new Set(cities.map((city) => city.region))];
export const totalCities = cities.length;
export const getCityBySlug = (slug: string) =>
  cities.find((city) => city.slug === slug);
export const getCitiesByRegion = (region: string) =>
  cities.filter((city) => city.region === region);
export const getAllCitySlugs = () => cities.map((city) => city.slug);
export const getNearbyCities = (distance: number = serviceArea.radiusKm) =>
  cities.filter((city) => city.distance <= distance);
export const getCitiesSortedByDistance = () =>
  [...cities].sort((a, b) => a.distance - b.distance);
export const getCitiesSortedByName = () =>
  [...cities].sort((a, b) => a.name.localeCompare(b.name, "de"));
export const searchCities = (query: string) =>
  cities.filter((city) =>
    `${city.name} ${city.slug} ${city.region}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

export function nearestCities(city: City, count = 4): City[] {
  const latitudeScale = Math.cos((city.latitude * Math.PI) / 180);
  const squared = (candidate: City) =>
    (candidate.latitude - city.latitude) ** 2 +
    ((candidate.longitude - city.longitude) * latitudeScale) ** 2;
  return cities
    .filter((other) => other.slug !== city.slug)
    .sort((a, b) => squared(a) - squared(b))
    .slice(0, count);
}
