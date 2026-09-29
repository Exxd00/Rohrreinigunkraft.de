import type { Metadata } from "next";
import { getCityHeroIntro } from "@/data/hero-copy";
import VideoShowcase from "@/components/home/VideoShowcase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ClipboardList } from "lucide-react";
import { cities, getCityBySlug, nearestCities } from "@/data/cities";
import { localServices } from "@/data/local-services";
import { getCityServiceBrief } from "@/data/city-service-notes";
import { serviceAreaSchema } from "@/data/service-area";
import {
  pageMetadata,
  breadcrumbSchema,
  jsonLd,
  siteUrl,
} from "@/lib/page-seo";
import {
  LocalHero,
  AreaNote,
  LocalCta,
  LocalFaq,
} from "@/components/city/LocalPageParts";

export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}
export async function generateMetadata({
  params,
}: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const city = getCityBySlug((await params).city);
  if (!city)
    return {
      title: "Einsatzort nicht gefunden",
      robots: { index: false, follow: true },
    };
  return pageMetadata(
    `/${city.slug}`,
    `Rohrreinigung ${city.name} | Kraft · Nürnberg & 30 km`,
    `${city.name}: Rohr- und Abflussreinigung, Kanalservice und 24/7-Notdienstaufnahme. Hinweise zum Objekt, Ablauf und Einsatzgebiet. Preis vor Arbeitsbeginn.`,
  );
}

export default async function CityPage({
  params,
}: { params: Promise<{ city: string }> }) {
  const city = getCityBySlug((await params).city);
  if (!city) notFound();
  const nearby = nearestCities(city);
  const faq = [
    {
      question: `Gibt es eine Niederlassung in ${city.name}?`,
      answer: `Unser Standort ist Nürnberg. ${city.name} ist Teil unseres Einsatzgebiets im 30-km-Radius. Diese Seite stellt keine eigene Niederlassung vor. Die konkrete Adresse prüfen wir vor der Zusage.`,
    },
    {
      question: `Welche Angaben brauchen Sie für einen Termin in ${city.name}?`,
      answer: city.guide.context,
    },
    {
      question: "Wann kommen Sie und was kostet der Einsatz?",
      answer:
        "Wir besprechen die aktuelle Verfügbarkeit und voraussichtliche Ankunft am Telefon. Nennen Sie Adresse, betroffene Anschlüsse und die Dringlichkeit. Mögliche Anfahrtskosten und Zuschläge klären wir vorab; den Preis für die vereinbarte Arbeit stimmen wir vor Arbeitsbeginn ab.",
    },
  ];
  const schema = [
    breadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Einsatzgebiet", path: "/staedte" },
      { name: city.name, path: `/${city.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}/${city.slug}#service`,
      name: `Rohrreinigung in ${city.name}`,
      url: `${siteUrl}/${city.slug}`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: serviceAreaSchema,
      description: city.description,
    },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <LocalHero
        city={city}
        title={`Rohrreinigung in ${city.name}`}
        intro={getCityHeroIntro(city.name)}
        benefit="Damit Ihr Alltag wieder läuft."
      />
      <VideoShowcase />
      <section className="bg-white py-12 dark:bg-slate-950 md:py-16">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
              So helfen wir Ihnen vor Ort
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {city.guide.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
              {city.guide.access}
            </p>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
              {city.guide.planning}
            </p>
            <div className="mt-6 flex gap-3 rounded-xl bg-slate-50 p-5 dark:bg-slate-900">
              <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-300" />
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Sie müssen die Ursache nicht selbst kennen. Beschreiben Sie,
                was Sie beobachten – wir besprechen mit Ihnen den nächsten Schritt.
              </p>
            </div>
          </div>
          <AreaNote city={city} />
        </div>
      </section>
      <section
        className="bg-slate-50 py-12 dark:bg-slate-900 md:py-16"
        id="leistungen"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Die passende Leistung für {city.name}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">
            Wählen Sie nach Ihrem Anliegen. Reinigung, Untersuchung und
            Reparatur sind unterschiedliche Arbeitsschritte.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {localServices.map((service) => (
              <Link
                key={service.slug}
                href={
                  getCityServiceBrief(city.slug, service.slug)
                    ? `/${city.slug}/${service.slug}`
                    : `/service/${service.slug}`
                }
                className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
              >
                <h3 className="break-words text-lg font-bold group-hover:text-sky-700 dark:group-hover:text-sky-300">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {service.label}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
                  Leistung ansehen
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/leistungen"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
          >
            Alle Leistungen und Problemfälle
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="bg-white py-12 dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold">
            Fragen zum Einsatz in {city.name}
          </h2>
          <LocalFaq items={faq} />
        </div>
      </section>
      <section className="border-t border-slate-200 bg-slate-50 py-10 dark:border-slate-800 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold">Weitere Einsatzorte in der Nähe</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {nearby.map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium hover:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <LocalCta city={city} source={`city-${city.slug}-footer`} />
    </>
  );
}
