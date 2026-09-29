import type { Metadata } from "next";
import { getServiceHeroCopy } from "@/data/hero-copy";
import VideoShowcase from "@/components/home/VideoShowcase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ClipboardCheck, Search, CheckCircle2 } from "lucide-react";
import { getCityBySlug } from "@/data/cities";
import { localServices, getLocalService } from "@/data/local-services";
import {
  getCityServiceBrief,
  reviewedCitySlugs,
} from "@/data/city-service-notes";
import { getServiceBySlug } from "@/data/services";
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

type Props = { params: Promise<{ city: string; service: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return reviewedCitySlugs.flatMap((city) =>
    localServices.map((service) => ({ city, service: service.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await params;
  const city = getCityBySlug(route.city),
    service = getLocalService(route.service);
  const brief = getCityServiceBrief(route.city, route.service);
  if (!city || !service || !brief)
    return {
      title: "Leistung am Einsatzort nicht gefunden",
      robots: { index: false, follow: true },
    };
  return pageMetadata(
    `/${city.slug}/${service.slug}`,
    `${service.name} ${city.name} | Rohrreinigung Kraft`,
    `${service.label} in ${city.name}: ${service.question} Ablauf, Vorbereitung und persönliche Einsatzaufnahme im 30-km-Gebiet Nürnberg.`,
  );
}

export default async function CityServicePage({ params }: Props) {
  const route = await params;
  const city = getCityBySlug(route.city),
    service = getLocalService(route.service);
  const brief = getCityServiceBrief(route.city, route.service);
  if (!city || !service || !brief) notFound();
  const path = `/${city.slug}/${service.slug}`;
  const faq = [
    {
      question: `Was ist bei ${service.name} in ${city.name} vorab wichtig?`,
      answer: brief,
    },
    { question: service.question, answer: service.preparation },
    {
      question: "Was wird vor Arbeitsbeginn vereinbart?",
      answer: `Wir klären die genaue Objektadresse in ${city.name}, den Zugang und die Dringlichkeit. Anfahrt und mögliche Zuschläge besprechen wir vorab. Die konkrete Arbeit und ihr Preis werden vor dem Beginn abgestimmt; zusätzliche Untersuchung oder Reparatur sind eigene Entscheidungen.`,
    },
  ];
  const schema = [
    breadcrumbSchema([
      { name: "Startseite", path: "/" },
      { name: "Einsatzgebiet", path: "/staedte" },
      { name: city.name, path: `/${city.slug}` },
      { name: service.name, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}${path}#service`,
      name: `${service.name} in ${city.name}`,
      url: `${siteUrl}${path}`,
      serviceType: service.name,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: serviceAreaSchema,
      description: brief,
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
        serviceName={service.name}
        title={`${service.name} in ${city.name}`}
        intro={getServiceHeroCopy(service).intro}
        benefit={getServiceHeroCopy(service).benefit}
      />
      <VideoShowcase />
      <section className="bg-white py-12 dark:bg-slate-950 md:py-16">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
              {service.label}
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Die passende Hilfe für Ihr Problem
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {service.intro}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>Leistungsbereich:</strong> {service.scope}.
            </p>
            <div className="mt-6 rounded-xl border-l-4 border-sky-500 bg-sky-50 p-5 dark:bg-sky-950/40">
              <h3 className="font-bold">Ihr Einsatz in {city.name}</h3>
              <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">
                {city.guide.access}
              </p>
            </div>
          </div>
          <AreaNote city={city} />
        </div>
      </section>
      <section className="bg-slate-50 py-12 dark:bg-slate-900 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">
            So läuft Ihr Auftrag ab
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: ClipboardCheck,
                title: "1 · Ihr Anliegen verstehen",
                text: service.preparation,
              },
              {
                icon: Search,
                title: "2 · Lösung und Preis besprechen",
                text: service.method,
              },
              {
                icon: CheckCircle2,
                title: "3 · Ergebnis gemeinsam prüfen",
                text: service.result,
              },
            ].map((step) => (
              <article
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950"
              >
                <step.icon className="h-7 w-7 text-sky-700 dark:text-sky-300" />
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
            {service.stop}
          </p>
        </div>
      </section>
      <section className="bg-white py-12 dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold">
            Fragen zu Ihrem Termin in {city.name}
          </h2>
          <LocalFaq items={faq} />
          <Link
            href={`/service/${service.slug}`}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
          >
            {service.name}: allgemeine Leistungsdetails
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-slate-50 py-10 dark:border-slate-800 dark:bg-slate-900">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold">
              Andere Anliegen in {city.name}
            </h2>
            <ul className="mt-4 space-y-2">
              {localServices
                .filter((other) => other.slug !== service.slug)
                .map((other) => (
                  <li key={other.slug}>
                    <Link
                      className="inline-flex min-h-11 items-center gap-2 font-medium text-sky-800 hover:underline dark:text-sky-300"
                      href={`/${city.slug}/${other.slug}`}
                    >
                      {other.name}
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">
              Passende Problemfälle und Vertiefungen
            </h2>
            <ul className="mt-4 space-y-2">
              {service.related.map((slug) => {
                const detail = getServiceBySlug(slug);
                return detail ? (
                  <li key={slug}>
                    <Link
                      href={`/service/${slug}`}
                      className="inline-flex min-h-11 items-center gap-2 font-medium text-sky-800 hover:underline dark:text-sky-300"
                    >
                      {detail.name}
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {city.guide.planning}
            </p>
          </div>
        </div>
      </section>
      <LocalCta
        city={city}
        source={`local-${city.slug}-${service.slug}-footer`}
      />
    </>
  );
}
