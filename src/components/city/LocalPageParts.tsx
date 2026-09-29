import Link from "next/link";
import { ArrowRight, MapPin, Phone, CheckCircle2 } from "lucide-react";
import PhoneCallButton from "@/components/ui/phone-call-button";
import { company } from "@/data/company";
import type { City } from "@/data/cities";

export function LocalHero({
  title,
  intro,
  benefit,
  city,
  serviceName,
}: { title: string; intro: string; benefit: string; city: City; serviceName?: string }) {
  return (
    <section className="relative overflow-hidden bg-slate-900 pt-28 pb-12 text-white md:pt-36 md:pb-16">
      <div
        className="pointer-events-none absolute -right-24 -top-20 h-96 w-96 rounded-full border-[48px] border-primary/10"
        aria-hidden="true"
      />
      <div className="container relative mx-auto px-4">
        <nav
          aria-label="Brotkrümelnavigation"
          className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-300"
        >
          <Link
            href="/"
            className="hover:text-white underline-offset-4 hover:underline"
          >
            Startseite
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/staedte"
            className="hover:text-white underline-offset-4 hover:underline"
          >
            Einsatzgebiet
          </Link>
          <span aria-hidden="true">/</span>
          {serviceName ? (
            <>
              <Link
                href={`/${city.slug}`}
                className="hover:text-white hover:underline"
              >
                {city.name}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{serviceName}</span>
            </>
          ) : (
            <span aria-current="page">{city.name}</span>
          )}
        </nav>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div className="min-w-0">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-sky-300">
              <MapPin className="h-4 w-4 shrink-0" /> Nürnberg und Umgebung
            </p>
            <h1 className="max-w-4xl break-words text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-2xl font-semibold leading-snug text-sky-300 sm:text-3xl">{benefit}</p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
              {intro}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PhoneCallButton
                source={`local-${city.slug}${serviceName ? "-service" : ""}`}
                size="lg"
                className="h-auto min-h-12 whitespace-normal px-6 py-3 font-semibold"
              >
                {company.contact.phoneDisplay}
              </PhoneCallButton>
              <Link
                href="/kontakt"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-medium hover:bg-white/10"
              >
                Rückruf anfordern
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <aside
            className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
            aria-label="Einsatzaufnahme"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
              Ihr direkter Kontakt
            </p>
            <p className="mt-3 text-xl font-bold">Ein Anruf. Ein klarer Plan.</p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-slate-200">
              {[
                "Sie schildern das Problem – wir hören zu",
                "Wir klären, wann Hilfe möglich ist",
                "Sie kennen den Preis vor Arbeitsbeginn",
              ].map((text) => (
                <li key={text} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-slate-300">
              Telefonische Notdienstaufnahme rund um die Uhr. Die Ankunftszeit
              hängt von Adresse, Verkehr und Verfügbarkeit ab.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function AreaNote({ city }: { city: City }) {
  return (
    <aside className="rounded-2xl border border-sky-200 bg-sky-50 p-6 dark:border-sky-900 dark:bg-sky-950/40">
      <div className="flex items-center gap-2 font-semibold text-sky-900 dark:text-sky-200">
        <MapPin className="h-5 w-5 shrink-0" />
        Für Sie in {city.name} unterwegs
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Wir sind in Nürnberg und Umgebung für Sie da. Für Ortsteile und
        Adressen am Rand bestätigen wir die Abdeckung vorab. Wir arbeiten von
        Nürnberg aus; diese Seite bezeichnet ein Einsatzgebiet und keine
        zusätzliche Niederlassung.
      </p>
      <Link
        href="/staedte#radius"
        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky-800 underline underline-offset-4 dark:text-sky-300"
      >
        Weitere Einsatzorte ansehen
        <ArrowRight className="h-4 w-4" />
      </Link>
    </aside>
  );
}

export function LocalCta({ city, source }: { city: City; source: string }) {
  return (
    <section className="bg-slate-900 py-12 text-white">
      <div className="container mx-auto grid items-center gap-6 px-4 md:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-2 text-sm font-semibold text-sky-300">
            Rohrreinigung Kraft · Nürnberg und Umgebung
          </p>
          <h2 className="text-2xl font-bold">
            Verstopfung in {city.name}? Sprechen Sie mit uns.
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
            Schildern Sie uns Ihr Problem. Wir besprechen, wie wir Ihnen helfen
            können und wann ein Einsatz an Ihrer Adresse möglich ist.
          </p>
        </div>
        <PhoneCallButton
          source={source}
          size="lg"
          className="h-auto min-h-12 whitespace-normal px-6 py-4 text-base"
        >
          {company.contact.phoneDisplay}
        </PhoneCallButton>
      </div>
    </section>
  );
}

export function LocalFaq({
  items,
}: { items: { question: string; answer: string }[] }) {
  return (
    <div className="mt-6 space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
        >
          <summary className="cursor-pointer p-5 font-semibold leading-relaxed marker:text-sky-600">
            {item.question}
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-slate-600 dark:text-slate-300">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
