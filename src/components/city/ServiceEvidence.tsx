import Link from "next/link";
import { company } from "@/data/company";

/** Company evidence is regional; never imply a branch or completed job in every town. */
export default function ServiceEvidence() {
  return (
    <section className="border-y border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950" aria-labelledby="service-evidence">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2">
        <div>
          <h2 id="service-evidence" className="text-xl font-bold">Wer kommt zu Ihnen?</h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{company.name} · {company.address.fullAddress}. Wir arbeiten von Nürnberg aus. Die Einsatzgebiete auf dieser Website sind keine zusätzlichen Niederlassungen.</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-sky-800 dark:text-sky-300">
            <a href={company.address.googleMapsUrl} className="underline underline-offset-4">Unternehmensprofil und Bewertungen</a>
            <Link href="/arbeiten" className="underline underline-offset-4">Einblicke in unsere Arbeit</Link>
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Die gezeigten Arbeitsaufnahmen geben regionale Einblicke; sie belegen keinen Einsatz in jedem genannten Ort.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Was wird vor der Arbeit geklärt?</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-slate-600 dark:text-slate-300">
            <li>Genaue Adresse, Zugänglichkeit und aktueller Umfang des Problems.</li>
            <li>Verfügbarkeit, voraussichtliche Ankunft sowie mögliche Anfahrt und Zuschläge.</li>
            <li>Vereinbarte Leistung und Preis vor Arbeitsbeginn; zusätzliche Untersuchung oder Reparatur gesondert.</li>
          </ul>
          <Link href="/preise" className="mt-4 inline-block text-sm font-semibold text-sky-800 underline underline-offset-4 dark:text-sky-300">Preisübersicht und Bedingungen</Link>
        </div>
      </div>
    </section>
  );
}
