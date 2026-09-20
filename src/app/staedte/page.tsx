import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getCitiesSortedByName, cities } from "@/data/cities";
import { serviceArea } from "@/data/service-area";
import { pageMetadata } from "@/lib/page-seo";
import { company } from "@/data/company";
import AreaMap from "@/components/city/AreaMap";
import CityDirectory from "@/components/city/CityDirectory";
import PhoneCallButton from "@/components/ui/phone-call-button";

export const metadata = pageMetadata(
  "/staedte",
  "Einsatzgebiet: Nürnberg & 30 km Umkreis | Rohrreinigung Kraft",
  "Unser Einsatzgebiet rund um Nürnberg: Städte und Gemeinden im 30-km-Radius, klare Abdeckung und lokale Hinweise. Finden Sie Ihren Ort und die passende Leistung.",
);

export default function StaedtePage() {
  const entries = getCitiesSortedByName().map(
    ({ name, slug, distance, isCity, region }) => ({
      name,
      slug,
      distance,
      isCity,
      region,
    }),
  );
  return (
    <>
      <section
        id="radius"
        className="bg-gradient-to-br from-sky-50 via-white to-slate-50 pt-28 pb-12 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 md:pt-36 md:pb-16"
      >
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
              <MapPin className="h-4 w-4" /> Unser Einsatzgebiet
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
              Nürnberg.
              <br />
              <span className="text-sky-700 dark:text-sky-300">
                Und 30 km drumherum.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Rohrreinigung, Kanalservice und Notdienstaufnahme für Nürnberg und
              das nahe Umland. Finden Sie Ihren Ort und erfahren Sie, welche
              Angaben für Ihren Einsatz wichtig sind.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  30 km
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Radius ab Nürnberg Hbf
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {cities.length}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Städte und Gemeinden
                </p>
              </div>
            </div>
            <a
              href="#orte"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
            >
              Meinen Ort finden
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <AreaMap />
        </div>
      </section>
      <section className="border-y border-sky-100 bg-sky-50 py-8 dark:border-slate-700 dark:bg-sky-950/30">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            So ist die Abdeckung definiert
          </h2>
          <p className="mt-3 max-w-5xl leading-relaxed text-slate-700 dark:text-slate-300">
            Der Radius beträgt 30 km Luftlinie ab {serviceArea.center.name}. Die
            Liste verwendet amtliche Ortsmittelpunkte als Orientierung. Sie ist
            keine pauschale Zusage für jeden Ortsteil einer Gemeinde. An der
            Grenze prüfen wir die genaue Objektadresse vor der
            Einsatzbestätigung. Fahrstrecke und Ankunftszeit können von der
            Luftlinie abweichen.
          </p>
          <p className="mt-3 max-w-5xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Unser Betriebssitz ist Nürnberg. Die Ortsseiten beschreiben
            Einsatzgebiete, keine weiteren Filialen.
          </p>
        </div>
      </section>
      <section
        id="orte"
        className="scroll-mt-24 bg-slate-50 py-12 dark:bg-slate-950 md:py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
            Ihr Ort. Ihre passende Hilfe.
          </h2>
          <CityDirectory entries={entries} />
          <p className="mt-7 max-w-4xl text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Geografische Grundlage:{" "}
            <a
              className="underline underline-offset-4"
              href={serviceArea.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Gemeindeverzeichnis des Statistischen Bundesamts
            </a>
            , Gebietsstand 31.12.2025, Koordinatenstand 31.12.2024. Entfernungen
            berechnet als Luftlinie; redaktioneller Stand 21.09.2026.
            Gemeindefreie Gebiete sind nicht als Orte aufgeführt.
          </p>
        </div>
      </section>
      <section className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto grid items-center gap-6 px-4 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-bold">
              Adresse am Rand oder Ort nicht gefunden?
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
              Nennen Sie uns die genaue Lage und Ihr Anliegen. Wir prüfen die
              Abdeckung und besprechen Verfügbarkeit und Leistungsumfang vor
              einer Zusage.
            </p>
            <Link
              href="/leistungen"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-sky-300 underline underline-offset-4"
            >
              Alle Leistungen ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <PhoneCallButton
            source="service-area-directory"
            size="lg"
            className="h-auto min-h-12 whitespace-normal px-6 py-4"
          >
            {company.contact.phoneDisplay}
          </PhoneCallButton>
        </div>
      </section>
    </>
  );
}
