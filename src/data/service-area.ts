/** One source of truth for the website's coverage; independent of Google Ads. */
export const serviceArea = {
  radiusKm: 30,
  center: {
    name: "Nürnberg Hauptbahnhof",
    latitude: 49.446389,
    longitude: 11.081944,
  },
  updated: "2026-09-21",
  source:
    "https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/_inhalt.html",
  sourceDate: "2025-12-31",
  coordinateDate: "2024-12-31",
  description: "Nürnberg und Umgebung",
} as const;

export function distanceKm(latitude: number, longitude: number): number {
  const rad = (degrees: number) => (degrees * Math.PI) / 180;
  const { latitude: lat, longitude: lon } = serviceArea.center;
  const h =
    Math.sin(rad(latitude - lat) / 2) ** 2 +
    Math.cos(rad(lat)) *
      Math.cos(rad(latitude)) *
      Math.sin(rad(longitude - lon) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export const serviceAreaSchema = {
  "@type": "GeoCircle",
  geoMidpoint: {
    "@type": "GeoCoordinates",
    latitude: serviceArea.center.latitude,
    longitude: serviceArea.center.longitude,
  },
  geoRadius: serviceArea.radiusKm * 1000,
};
