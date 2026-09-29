import VideoShowcase from "@/components/home/VideoShowcase";
import Link from "next/link";
import ServiceDirectory from "@/components/directory/ServiceDirectory";
import PhoneCallButton from "@/components/ui/phone-call-button";
import { company } from "@/data/company";
import { getCitiesSortedByName } from "@/data/cities";
import { reviewedCitySlugs } from "@/data/city-service-notes";
import { localServices } from "@/data/local-services";
import { pageMetadata } from "@/lib/page-seo";
export const metadata = pageMetadata(
  "/leistungen",
  "Leistungen & Hilfe bei Verstopfung | Rohrreinigung Kraft",
  "Finden Sie Rohrreinigung, Kanalservice, Notdienst und Untersuchungen in Nürnberg und 30 km Umgebung. Nach Anliegen, Leistungsbereich und Stadt filtern.",
);
export default function LeistungenPage() {
  const towns = getCitiesSortedByName()
    .filter((town) => reviewedCitySlugs.includes(town.slug))
    .map(({ name, slug }) => ({ name, slug }));
  return (
    <>
      <section className="bg-gradient-to-br from-sky-50 via-white to-slate-50 pt-28 pb-10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 md:pt-36 md:pb-12">
        <div className="container mx-auto max-w-6xl px-4">
          <nav
            aria-label="Brotkrumen"
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
          >
            <Link
              href="/"
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              Startseite
            </Link>
            <span aria-hidden="true">/</span>
            <span>Leistungen</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            Nürnberg & 30 km Umgebung
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
            Was ist verstopft? Wir helfen Ihnen weiter.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Von der verstopften Dusche bis zur Kanalreinigung: Finden Sie die
            passende Hilfe für Ihr Problem – mit verständlichem Ablauf und einem Preis vor Arbeitsbeginn.
          </p>
        </div>
      </section>
      <VideoShowcase />
      <section className="bg-slate-50 py-8 dark:bg-slate-950 md:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <ServiceDirectory
            towns={towns}
            localSlugs={localServices.map((service) => service.slug)}
          />
        </div>
      </section>
      <section className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold">
            Sie sind unsicher, wo die Ursache liegt?
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
            Beschreiben Sie uns, was passiert und welche Abläufe betroffen sind.
            Wir klären den nächsten Schritt und die Verfügbarkeit für Ihre
            Adresse.
          </p>
          <PhoneCallButton
            source="service-directory"
            className="mt-6 h-auto min-h-12 whitespace-normal px-6 py-3"
          >
            {company.contact.phoneDisplay}
          </PhoneCallButton>
        </div>
      </section>
    </>
  );
}
