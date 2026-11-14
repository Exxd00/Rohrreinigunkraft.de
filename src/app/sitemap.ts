import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { localServices } from "@/data/local-services";
import { reviewedCitySlugs } from "@/data/city-service-notes";
import { siteUrl } from "@/lib/page-seo";
// Last shared public-content release, not the service-area data revision.
const publicContentUpdated = "2026-09-29";
// Actual dates of reviewed page edits, not the current build/request date.
const pageContentUpdated: Partial<Record<string, string>> = {
  "": "2026-11-14",
  "/fuerth": "2026-11-14",
  "/erlangen": "2026-11-14",
  "/service/abflussreinigung": "2026-11-14",
  "/service/kanalreinigung": "2026-11-14",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/preise",
    "/leistungen",
    "/hausverwaltung",
    "/faq",
    "/staedte",
    "/arbeiten",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ];
  const paths = [
    ...staticPaths,
    ...cities.map((city) => `/${city.slug}`),
    ...services.map((service) => `/service/${service.slug}`),
    ...reviewedCitySlugs.flatMap((city) =>
      localServices.map((service) => `/${city}/${service.slug}`),
    ),
  ];
  // A content revision date, not the date of every request/crawl.
  return paths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: pageContentUpdated[path] ?? publicContentUpdated,
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
