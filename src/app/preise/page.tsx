import VideoShowcase from "@/components/home/VideoShowcase";
import { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  CheckCircle,
  HelpCircle,
  Shield,
  Clock,
  Euro,
  ArrowRight,
  AlertCircle,
  Wrench,
  Camera,
  Droplets,
  Zap,
  Building2,
  Calendar,
  Star,
  Info,
  RefreshCw,
  Store,
  Eye,
  FileText,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { packages, getPrivatePackages, getB2BPackages } from "@/data/packages";
import { guaranteesBefore, guaranteesDuring, guaranteesAfter, guaranteeSummary } from "@/data/guarantees";
import { getFAQForPage } from "@/data/faq-database";

export const metadata: Metadata = {
  alternates: { canonical: "https://rohrreinigung-kraft.de/preise" },
  title: "Rohrreinigung Preise | Festpreis BEVOR wir anfangen | Keine Überraschungen",
  description: "Was kostet Rohrreinigung? Ab 79€. Der EXAKTE Preis nach kostenloser Diagnose – BEVOR die Arbeit beginnt. Lehnen Sie ab? Kostet nichts. Jetzt informieren!",
};

// Icon mapping for packages
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap: Zap,
  Camera: Camera,
  Droplets: Droplets,
  Shield: Shield,
  RefreshCw: RefreshCw,
  Building2: Building2,
  Store: Store,
  Calendar: Calendar,
};

// Color mapping for packages
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  red: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600", border: "border-red-500" },
  amber: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600", border: "border-amber-500" },
  blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600", border: "border-blue-500" },
  emerald: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600", border: "border-emerald-500" },
  purple: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600", border: "border-purple-500" },
  slate: { bg: "bg-slate-100 dark:bg-slate-900/30", text: "text-slate-600", border: "border-slate-500" },
  cyan: { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600", border: "border-cyan-500" },
  orange: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600", border: "border-orange-500" },
};

const emergencyPricing = {
  evening: { time: "18-22 Uhr", surcharge: 20 },
  night: { time: "22-6 Uhr", surcharge: 40 },
  weekend: { time: "Wochenende/Feiertag", surcharge: 30 }
};

// Get FAQs for this page
const pageFAQ = getFAQForPage("preise").slice(0, 8);

export default function PreisePage() {
  const privatePackages = getPrivatePackages();
  const b2bPackages = getB2BPackages();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 md:pt-28 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-white/50 mb-4">
              <Link href="/" className="hover:text-primary">Startseite</Link>
              <span>/</span>
              <span className="text-white/70">Preise</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Was kostet Rohrreinigung?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Erst den Preis kennen. Dann entscheiden.
              </span>
            </h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Die Preise unten geben Ihnen eine erste Orientierung. Nach Prüfung der Ursache
              nennen wir den <strong className="text-white">Preis für die vereinbarte Arbeit</strong>.
              Anfahrt und mögliche Zuschläge besprechen wir vorab.
            </p>

            {/* The Promise */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-xl mx-auto">
              <p className="text-sm text-white/60 mb-3">Unser Versprechen:</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">0€</div>
                  <p className="text-xs text-white/70">Diagnose kostet</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">100%</div>
                  <p className="text-xs text-white/70">Festpreis vorab</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">0</div>
                  <p className="text-xs text-white/70">Versteckte Kosten</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium">Lehnen Sie ab? Kostet nichts.</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Euro className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Ab 79€ für einfache Fälle</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <VideoShowcase />

      {/* How It Works - Simple */}
      <section className="py-8 bg-emerald-50 dark:bg-emerald-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-2">1</div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Sie rufen an</p>
                <p className="text-xs text-gray-500">Schildern das Problem</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-2">2</div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Wir kommen</p>
                <p className="text-xs text-gray-500">In 30-60 Min</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-2">3</div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Festpreis</p>
                <p className="text-xs text-gray-500">BEVOR wir starten</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-2">4</div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Sie entscheiden</p>
                <p className="text-xs text-gray-500">OK = Wir arbeiten</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Packages */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Welches Paket passt zu Ihrer Situation?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Wählen Sie nach Ihrem Bedarf. Der finale Festpreis wird nach der kostenlosen Diagnose genannt.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {privatePackages.map((pkg) => {
                const Icon = iconMap[pkg.icon] || Shield;
                const colors = colorMap[pkg.color];
                return (
                  <div
                    key={pkg.id}
                    className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${
                      pkg.popular
                        ? `${colors.border} shadow-lg`
                        : 'border-gray-100 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    {pkg.popular && (
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1`}>
                        <Star className="w-3 h-3 fill-white" />
                        {pkg.badge}
                      </div>
                    )}

                    {pkg.badge && !pkg.popular && (
                      <div className={`absolute -top-3 left-4 px-3 py-1 ${colors.bg} ${colors.text} text-xs font-bold rounded-full`}>
                        {pkg.badge}
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {pkg.subtitle}
                    </p>

                    {/* When to use */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 italic">
                      "{pkg.whenToUse}"
                    </p>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-gray-500">ab</span>
                        <span className="text-3xl font-black text-gray-900 dark:text-white">{pkg.priceFrom}€</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Typisch: {pkg.priceTypical}€
                      </p>
                    </div>

                    <div className="space-y-2 mb-4">
                      {pkg.includes.slice(0, 4).map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Guarantee */}
                    <div className={`flex items-center gap-2 text-xs p-2 rounded-lg mb-4 ${colors.bg}`}>
                      <Shield className={`w-3 h-3 ${colors.text}`} />
                      <span className={`font-medium ${colors.text}`}>
                        {pkg.guarantee.duration} Garantie
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <Clock className="w-3 h-3" />
                      <span>Dauer: {pkg.duration}</span>
                    </div>

                    <Link href={`tel:${company.contact.phone}`}>
                      <Button className={`w-full ${
                        pkg.popular
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'gradient-primary'
                      } text-white`}>
                        <Phone className="w-4 h-4 mr-2" />
                        {pkg.cta.text}
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-gray-500 mt-2">{pkg.cta.urgency}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Pricing */}
      <section className="py-8 bg-amber-50 dark:bg-amber-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Notdienst-Zuschläge – AM TELEFON genannt
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Nachts oder am Wochenende? Der Zuschlag wird VOR der Anfahrt am Telefon genannt – keine Überraschung vor Ort.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Abend</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{emergencyPricing.evening.time}</p>
                    <p className="text-lg font-bold text-amber-600">+{emergencyPricing.evening.surcharge}€</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nacht</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{emergencyPricing.night.time}</p>
                    <p className="text-lg font-bold text-amber-600">+{emergencyPricing.night.surcharge}€</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Wochenende</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{emergencyPricing.weekend.time}</p>
                    <p className="text-lg font-bold text-amber-600">+{emergencyPricing.weekend.surcharge}€</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees - Three Phases */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Unsere Garantien – in jeder Phase
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Wir geben Ihnen Sicherheit: Vor, während und nach der Arbeit.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Before */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {guaranteeSummary.before.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{guaranteeSummary.before.subtitle}</p>
                <div className="space-y-3">
                  {guaranteesBefore.slice(0, 4).map((g) => (
                    <div key={g.id} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{g.name}</p>
                        <p className="text-xs text-gray-500">{g.shortDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* During */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {guaranteeSummary.during.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{guaranteeSummary.during.subtitle}</p>
                <div className="space-y-3">
                  {guaranteesDuring.map((g) => (
                    <div key={g.id} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{g.name}</p>
                        <p className="text-xs text-gray-500">{g.shortDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {guaranteeSummary.after.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{guaranteeSummary.after.subtitle}</p>
                <div className="space-y-3">
                  {guaranteesAfter.slice(0, 4).map((g) => (
                    <div key={g.id} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{g.name}</p>
                        <p className="text-xs text-gray-500">{g.shortDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why No Fixed Price - Explanation */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Warum kein fixer Preis auf der Website?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Weil jede Verstopfung anders ist – und wir Sie nicht belügen wollen.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Beispiel 1:</strong> Eine Toilette mit Feuchttuch-Problem ist in <strong>15 Minuten</strong> gelöst. Kosten: ca. 85€.
                </p>
                <p>
                  <strong>Beispiel 2:</strong> Eine tiefsitzende Wurzelverstopfung braucht Spezialequipment und <strong>2 Stunden</strong>. Kosten: ca. 380€.
                </p>
                <p>
                  Einen fixen Preis zu nennen wäre entweder <strong>zu teuer für Sie</strong> (bei einfachen Fällen)
                  oder <strong>unrealistisch für uns</strong> (bei komplexen).
                </p>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 mt-6">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                    Unser Weg – fair für beide Seiten:
                  </h4>
                  <ol className="space-y-2 text-emerald-700 dark:text-emerald-400">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">1.</span>
                      <span>Wir kommen und schauen uns das Problem an <strong>(kostet Sie: 0€)</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">2.</span>
                      <span>Wir erklären, was wir tun müssen <strong>(Sie verstehen es)</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">3.</span>
                      <span>Wir nennen den <strong>EXAKTEN Festpreis</strong> (nicht "ab" oder "ca.")</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">4.</span>
                      <span>Sie entscheiden <strong>(Nein = wir gehen, kostet nichts)</strong></span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Teaser */}
      <section className="py-8 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Hausverwaltung, WEG oder Gewerbe?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rahmenverträge mit 10% Rabatt, Prioritäts-Notdienst, Sammelrechnung.
                  Wartung ab 29€/Einheit/Monat → bis zu 80% weniger Notfälle.
                </p>
              </div>
              <Link href="/hausverwaltung">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  B2B-Konditionen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Häufige Fragen zu Preisen
              </h2>
            </div>

            <div className="space-y-4">
              {pageFAQ.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {item.question}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-2 ml-7">
                    {item.shortAnswer}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                    {item.fullAnswer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/faq">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Alle Fragen ansehen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-gradient-to-r from-primary to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Bereit für Klarheit?
          </h2>
          <p className="mb-6 opacity-90 max-w-xl mx-auto">
            Rufen Sie an. Wir kommen, prüfen <strong>kostenlos</strong> und nennen den <strong>Festpreis</strong> – bevor wir starten.
            Lehnen Sie ab? Kostet nichts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`tel:${company.contact.phone}`}>
              <Button className="bg-white text-primary hover:bg-gray-100 h-12 px-8 font-semibold shadow-lg">
                <Phone className="w-5 h-5 mr-2" />
                {company.contact.phoneDisplay}
              </Button>
            </Link>
            <Link href="/kontakt">
              <button className="h-12 px-8 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center font-semibold">
                Rückruf anfordern
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": pageFAQ.filter(faq => faq.schema).map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.fullAnswer
              }
            }))
          })
        }}
      />
    </>
  );
}
