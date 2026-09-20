import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { localServices } from "@/data/local-services";
import { reviewedCitySlugs } from "@/data/city-service-notes";
import { siteUrl } from "@/lib/page-seo";
import { serviceArea } from "@/data/service-area";

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
    lastModified: serviceArea.updated,
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
