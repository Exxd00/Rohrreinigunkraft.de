import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function ServiceAreaSummary() {
  return (
    <section className="border-y border-sky-100 bg-sky-50 py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="container mx-auto grid items-center gap-6 px-4 md:grid-cols-[1fr_auto]">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
            <MapPin className="h-4 w-4" /> Unser Einsatzgebiet
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Nürnberg und 30 km Umgebung
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Von Fürth und Erlangen bis Schwabach und zum nahen Umland: Finden
            Sie Ihren Ort und die passende Leistung. Für Adressen an der Grenze
            klären wir die Abdeckung vor der Zusage.
          </p>
        </div>
        <Link
          href="/staedte"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
        >
          Einsatzgebiet ansehen
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
