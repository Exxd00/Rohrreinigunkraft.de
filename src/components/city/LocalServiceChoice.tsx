import Link from "next/link";
import { getCityServiceBrief } from "@/data/city-service-notes";

const choices = [
  { slug: "abflussreinigung", title: "Ein einzelner Ablauf ist verstopft", text: "Küche, Waschbecken oder Dusche: Anschluss und Geruchsverschluss zuerst eingrenzen." },
  { slug: "rohrreinigung", title: "Mehrere Anschlüsse sind betroffen", text: "Den gemeinsam genutzten Leitungsabschnitt prüfen, bevor einzelne Abläufe erneut behandelt werden." },
  { slug: "rohrreinigung-notdienst", title: "Abwasser tritt aus", text: "Wassernutzung unterbrechen und die Dringlichkeit telefonisch schildern. Überflutete Bereiche nicht betreten." },
  { slug: "kamera-inspektion", title: "Das Problem kommt wieder", text: "Eine gezielte Untersuchung besprechen. Wiederholte Reinigung allein klärt einen möglichen Schaden nicht." },
];

export default function LocalServiceChoice({ citySlug, cityName }: { citySlug: string; cityName: string }) {
  return (
    <section className="bg-slate-50 py-10 dark:bg-slate-900" aria-labelledby="local-service-choice">
      <div className="container mx-auto px-4">
        <h2 id="local-service-choice" className="text-2xl font-bold">Welche Hilfe brauchen Sie in {cityName}?</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">Wählen Sie nach Ihrer Beobachtung. Die genaue Ursache und das passende Verfahren klären wir am Objekt.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {choices.map(choice => (
            <Link key={choice.slug} href={getCityServiceBrief(citySlug, choice.slug) ? `/${citySlug}/${choice.slug}` : `/service/${choice.slug}`} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600 dark:border-slate-700 dark:bg-slate-950">
              <h3 className="font-bold text-sky-800 dark:text-sky-300">{choice.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{choice.text}</p>
              <span className="mt-4 block text-sm font-semibold underline underline-offset-4">Passende Leistung ansehen</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
