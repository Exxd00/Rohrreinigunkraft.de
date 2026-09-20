import { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Building2,
  Users,
  Store,
  Home,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Star,
  ArrowRight,
  Calendar,
  MessageSquare,
  Zap,
  Euro,
  Download,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  alternates: { canonical: "https://rohrreinigung-kraft.de/hausverwaltung" },
  title: "Rohrreinigung für Hausverwaltungen & Gewerbe | Festpreise & Rahmenverträge",
  description: "B2B-Service für Hausverwaltungen, WEG & Gewerbe. Wartungsverträge ab 29€/Einheit ✓ Prioritäts-Notdienst ✓ Transparente Festpreise ✓ Sammelrechnung ✓",
};

const targetGroups = [
  {
    icon: Building2,
    title: "Hausverwaltungen",
    description: "Schnelle Reaktion, professionelle Dokumentation, direkte Kommunikation",
    benefits: [
      "Prioritäts-Notdienst 24/7 (30-60 Min)",
      "Dokumentation für WEG-Versammlungen",
      "Rahmenverträge mit Festkonditionen",
      "Direkte Techniker-Hotline",
    ],
  },
  {
    icon: Users,
    title: "WEG & Eigentümer­gemeinschaften",
    description: "Alle Einheiten aus einer Hand – koordiniert und transparent",
    benefits: [
      "Koordinierte Termine für alle Einheiten",
      "Sammelrechnung oder Einzelabrechnung",
      "Protokolle für die Eigentümerversammlung",
      "Regelmäßige Wartungsplanung",
    ],
  },
  {
    icon: Store,
    title: "Gewerbe & Gastronomie",
    description: "Diskret, schnell, außerhalb Ihrer Öffnungszeiten",
    benefits: [
      "Einsätze nachts & am Wochenende",
      "Fettabscheider-Wartung nach Vorschrift",
      "Minimale Betriebsunterbrechung",
      "Regelmäßige Präventiv-Reinigung",
    ],
  },
  {
    icon: Home,
    title: "Immobilien­betreuung",
    description: "Zuverlässiger Partner für Ihre Objekte in Nürnberg und 30 km Umgebung",
    benefits: [
      "Schnelle Reaktionszeit",
      "Transparente Abrechnung",
      "Ein Ansprechpartner für alle Objekte",
      "Flexible Terminvereinbarung",
    ],
  },
];

// Concrete B2B pricing packages
const b2bPackages = [
  {
    name: "Einzelauftrag",
    subtitle: "Bei Bedarf",
    icon: Zap,
    features: [
      "Keine Bindung",
      "Kostenlose Diagnose vor Ort",
      "Festpreis vor Arbeitsbeginn",
      "Dokumentation auf Wunsch",
      "Rechnung oder Sofortzahlung",
    ],
    pricing: "Reguläre Preise",
    pricingNote: "Ab 79€ je nach Aufwand",
    recommended: false
  },
  {
    name: "Rahmenvertrag",
    subtitle: "5+ Objekte",
    icon: FileText,
    features: [
      "10% Rabatt auf alle Einsätze",
      "Priorität bei Notfällen",
      "Persönlicher Ansprechpartner",
      "Monatliche Sammelrechnung",
      "Kostenlose jährliche Inspektion",
    ],
    pricing: "-10% auf alles",
    pricingNote: "Keine Mindestvertragsdauer",
    recommended: true
  },
  {
    name: "Wartungsvertrag",
    subtitle: "Präventiv",
    icon: Calendar,
    features: [
      "Regelmäßige Wartungstermine",
      "Bis zu 80% weniger Notfälle",
      "Festpreis pro Einheit/Monat",
      "Inklusive kleine Reparaturen",
      "Prioritäts-Notdienst 24/7",
    ],
    pricing: "Ab 29€",
    pricingNote: "pro Einheit / Monat",
    recommended: false
  },
];

// Real case study
const caseStudy = {
  company: "Hausverwaltung Müller GmbH",
  location: "Nürnberg",
  objects: 18,
  units: 142,
  challenge: "Wiederkehrende Verstopfungen in älteren Objekten, hohe Notdienst-Kosten",
  solution: "Rahmenvertrag + Wartungsvertrag für 5 Problem-Objekte",
  results: [
    { label: "Weniger Notfälle", value: "-73%", icon: TrendingDown },
    { label: "Kostenersparnis/Jahr", value: "4.200€", icon: Euro },
    { label: "Reaktionszeit", value: "25 Min", icon: Clock },
  ],
  quote: "Seit dem Wartungsvertrag haben wir kaum noch Notfälle. Die Bewohner beschweren sich nicht mehr, und wir sparen Geld. Win-win.",
  quotePerson: "Frau Müller, Geschäftsführerin"
};

const process = [
  {
    step: 1,
    title: "Erstgespräch (15 Min)",
    description: "Wir besprechen Ihre Objektstruktur und Anforderungen. Kostenlos und unverbindlich.",
  },
  {
    step: 2,
    title: "Individuelles Angebot",
    description: "Sie erhalten ein transparentes Angebot mit allen Konditionen. Keine versteckten Kosten.",
  },
  {
    step: 3,
    title: "Vertragsabschluss",
    description: "Bei Interesse schließen wir einen Rahmen- oder Wartungsvertrag ab. Flexibel kündbar.",
  },
  {
    step: 4,
    title: "Laufende Betreuung",
    description: "Ein persönlicher Ansprechpartner für alle Ihre Objekte. Direkte Hotline.",
  },
];

export default function HausverwaltungPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 md:pt-28 pb-12 md:pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-white/50 mb-4">
              <Link href="/" className="hover:text-primary">Startseite</Link>
              <span>/</span>
              <span className="text-white/70">Für Hausverwaltungen & Gewerbe</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">B2B-Service für Nürnberg & 30 km Umgebung</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Rohrreinigung für{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Geschäftskunden
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl mx-auto">
              Festpreise, die Sie VORHER kennen. Dokumentation, die Sie DIREKT bekommen.
              Reaktionszeit, auf die Sie sich VERLASSEN können.
            </p>
            <p className="text-white/60 mb-8">
              Über 50 Hausverwaltungen in Nürnberg, Fürth & Erlangen vertrauen uns bereits.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium">Rahmenverträge</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">30-60 Min Reaktionszeit</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Euro className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium">Wartung ab 29€/Einheit</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kontakt?type=b2b">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 shadow-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Angebot anfragen
                </Button>
              </Link>
              <Link href={`tel:${company.contact.phone}`}>
                <button className="h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center font-semibold">
                  <Phone className="w-5 h-5 mr-2" />
                  {company.contact.phoneDisplay}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Packages - Clear Pricing */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Klare Konditionen für Geschäftskunden
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Wählen Sie das Modell, das zu Ihnen passt. Alle Preise sind Festpreise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {b2bPackages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.name}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all hover:shadow-lg ${
                    pkg.recommended
                      ? 'border-primary shadow-lg shadow-primary/10'
                      : 'border-gray-100 dark:border-gray-700'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                      Meistgewählt
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    pkg.recommended ? 'bg-primary/20' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <Icon className={`w-6 h-6 ${pkg.recommended ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {pkg.subtitle}
                  </p>

                  <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-2xl font-bold text-primary">{pkg.pricing}</p>
                    <p className="text-xs text-gray-500">{pkg.pricingNote}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/kontakt?type=b2b">
                    <Button className={`w-full ${
                      pkg.recommended
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                    }`}>
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold text-sm rounded-full mb-4">
                Fallstudie
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                So sparen andere Hausverwaltungen
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {caseStudy.company}
                      </h3>
                      <p className="text-sm text-gray-500">{caseStudy.location} • {caseStudy.objects} Objekte • {caseStudy.units} Einheiten</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Herausforderung</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{caseStudy.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Lösung</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{caseStudy.solution}</p>
                    </div>
                  </div>

                  <blockquote className="italic text-gray-600 dark:text-gray-400 border-l-4 border-primary pl-4 mb-2">
                    "{caseStudy.quote}"
                  </blockquote>
                  <p className="text-sm text-gray-500">— {caseStudy.quotePerson}</p>
                </div>

                <div className="md:w-64 space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-center">Ergebnisse</h4>
                  {caseStudy.results.map((result) => {
                    const Icon = result.icon;
                    return (
                      <div key={result.label} className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
                        <Icon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{result.value}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{result.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Für wen wir arbeiten
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Maßgeschneiderte Lösungen für jeden Bedarf
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {targetGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {group.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {group.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              In 4 Schritten zum Rahmenvertrag
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-primary/20 hidden md:block" />

              <div className="space-y-6">
                {process.map((item) => (
                  <div key={item.step} className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 text-white font-bold relative z-10">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Row */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Das sagen unsere Geschäftskunden
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "Schnelle Reaktion, saubere Dokumentation für unsere WEG-Versammlungen.
                  Das ist genau, was wir als Hausverwaltung brauchen."
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">M. Schmidt</p>
                <p className="text-xs text-gray-500">Hausverwaltung, 12 Objekte, Nürnberg</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "Unsere Gastro-Küche braucht regelmäßige Fettabscheider-Wartung.
                  Die Jungs kommen nachts, stören niemanden, alles läuft."
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">T. Weber</p>
                <p className="text-xs text-gray-500">Restaurant, Fürth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Bereit für professionellen Service?
          </h2>
          <p className="mb-8 text-gray-300 max-w-xl mx-auto">
            Sprechen Sie mit uns über Ihre Anforderungen.
            Unverbindliches Angebot innerhalb von 24 Stunden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt?type=b2b">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 shadow-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Angebot anfragen
              </Button>
            </Link>
            <Link href={`tel:${company.contact.phone}`}>
              <button className="h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center font-semibold">
                <Phone className="w-5 h-5 mr-2" />
                Direkt anrufen: {company.contact.phoneDisplay}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
