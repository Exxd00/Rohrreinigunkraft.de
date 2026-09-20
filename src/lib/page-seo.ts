import type { Metadata } from "next";

export const siteUrl = "https://rohrreinigung-kraft.de";

export function pageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, locale: "de_DE", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/** Safe for embedding authored content in a JSON-LD script. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
