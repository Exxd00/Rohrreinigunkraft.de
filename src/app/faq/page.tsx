import VideoShowcase from "@/components/home/VideoShowcase";
import { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  HelpCircle,
  Euro,
  Clock,
  Shield,
  AlertTriangle,
  Wrench,
  Camera,
  Building2,
  MapPin,
  ChevronDown,
  Search,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export const metadata: Metadata = {
  alternates: { canonical: "https://rohrreinigung-kraft.de/faq" },
  title: "FAQ Rohrreinigung | Häufige Fragen zu Preisen, Ablauf & Notdienst",
  description: "Alle Antworten zu Rohrreinigung: Was kostet es? Wie lange dauert es? Wann brauche ich einen Notdienst? ✓ Ehrliche Antworten ✓ Keine Verkaufsfloskeln",
};

// FAQ Categories with questions
const faqCategories = [
  {
    id: "kosten",
    title: "Kosten & Preise",
    icon: Euro,
    color: "emerald",
    questions: [
      {
        question: "Was kostet eine Rohrreinigung?",
        answer: "Eine einfache Rohrreinigung (z.B. Toilette verstopft) kostet ab 79€. Der genaue Preis hängt von der Tiefe und Art der Verstopfung ab. Wichtig: Wir nennen Ihnen den GENAUEN Festpreis nach der kostenlosen Diagnose vor Ort – BEVOR wir mit der Arbeit beginnen.",
        shortAnswer: "Ab 79€. Der genaue Festpreis wird nach kostenloser Diagnose vor Ort genannt, bevor die Arbeit beginnt."
      },
      {
        question: "Ist die Diagnose wirklich kostenlos?",
        answer: "Ja, die Diagnose ist immer kostenlos. Wir kommen zu Ihnen, untersuchen das Problem und erklären, was zu tun ist. Dann nennen wir den Festpreis. Erst wenn Sie JA sagen, beginnen wir. Wenn Sie ablehnen, entstehen keine Kosten.",
        shortAnswer: "Ja, 100% kostenlos. Auch wenn Sie das Angebot ablehnen, zahlen Sie nichts."
      },
      {
        question: "Gibt es versteckte Kosten?",
        answer: "Nein. Der Festpreis, den wir nach der Diagnose nennen, ist der Endpreis. Keine Materialzuschläge, keine Anfahrtskosten extra, keine Überraschungen auf der Rechnung. Was wir sagen, das gilt.",
        shortAnswer: "Nein. Der genannte Festpreis ist der Endpreis. Punkt."
      },
      {
        question: "Warum gibt es keine fixen Preise auf der Website?",
        answer: "Weil jede Verstopfung anders ist. Eine Toilette mit Feuchttuch-Problem ist in 15 Minuten gelöst. Eine Wurzelverstopfung im Hauptkanal braucht Spezialequipment und 2 Stunden. Einen pauschalen Preis zu nennen wäre entweder unfair für Sie (zu teuer bei einfachen Fällen) oder unrealistisch für uns.",
        shortAnswer: "Jede Verstopfung ist anders. Pauschale Preise wären entweder zu teuer oder unrealistisch."
      },
      {
        question: "Was kostet der Notdienst nachts?",
        answer: "Die Grundpreise bleiben gleich. Nachts (22-6 Uhr) kommt ein Zuschlag von 40€ dazu. Wochenende/Feiertag: +30€. Abends (18-22 Uhr): +20€. Diese Zuschläge werden VORHER am Telefon kommuniziert, bevor wir losfahren.",
        shortAnswer: "Nachts +40€, Wochenende +30€, Abend +20€. Wird immer vorher am Telefon genannt."
      },
      {
        question: "Kostet die Anfahrt extra?",
        answer: "In Nürnberg, Fürth und Erlangen ist die Anfahrt im Preis enthalten. Außerhalb unseres Kerngebiets berechnen wir pauschal 25€ Anfahrt – das sagen wir Ihnen am Telefon, bevor wir kommen.",
        shortAnswer: "In Nürnberg/Fürth/Erlangen inklusive. Außerhalb: +25€ pauschal (vorher kommuniziert)."
      },
      {
        question: "Wie kann ich bezahlen?",
        answer: "Bar, EC-Karte, Kreditkarte oder auf Rechnung. Für Geschäftskunden und Hausverwaltungen bieten wir auch Sammelrechnungen an.",
        shortAnswer: "Bar, EC, Kreditkarte oder Rechnung. Für B2B: Sammelrechnung möglich."
      },
      {
        question: "Was kostet eine Kamera-Inspektion?",
        answer: "Eine TV-Kamerainspektion mit HD-Dokumentation kostet ab 149€ pauschal. Inklusive Foto-/Videomaterial und schriftlichem Befundbericht.",
        shortAnswer: "Ab 149€ pauschal inklusive HD-Dokumentation und Befundbericht."
      },
    ]
  },
  {
    id: "ablauf",
    title: "Ablauf & Dauer",
    icon: Clock,
    color: "primary",
    questions: [
      {
        question: "Wie schnell können Sie da sein?",
        answer: "Verfügbarkeit und voraussichtliche Ankunft klären wir telefonisch anhand Ihrer Adresse, der Verkehrslage und der aktuellen Einsatzplanung.",
        shortAnswer: "Ankunft und Verfügbarkeit telefonisch klären."
      },
      {
        question: "Wie läuft ein Einsatz ab?",
        answer: "1) Sie rufen an und schildern das Problem. 2) Wir kommen zur kostenlosen Diagnose. 3) Wir erklären, was zu tun ist und nennen den Festpreis. 4) Sie entscheiden. Erst bei Ihrem JA beginnen wir. 5) Nach der Arbeit Funktionsprüfung und Rechnung.",
        shortAnswer: "Anruf → Diagnose (kostenlos) → Festpreis nennen → Ihre Entscheidung → Arbeit → Rechnung."
      },
      {
        question: "Wie lange dauert eine Rohrreinigung?",
        answer: "Eine einfache Verstopfung (Toilette, Waschbecken) ist meist in 15-30 Minuten erledigt. Komplexere Fälle (Hauptleitung, Wurzeleinwuchs) können 1-2 Stunden dauern. Wir sagen Ihnen vor Arbeitsbeginn, wie lange es ungefähr dauert.",
        shortAnswer: "Einfache Fälle: 15-30 Min. Komplex: 1-2 Stunden. Zeitschätzung vor Arbeitsbeginn."
      },
      {
        question: "Muss ich zu Hause sein?",
        answer: "Ja, normalerweise schon. Sie müssen uns Zugang gewähren und der Diagnose/Preisnennung zustimmen. Bei Hausverwaltungen können wir mit dem Hausmeister oder Mieter arbeiten.",
        shortAnswer: "Ja, für Zugang und Freigabe. Bei HV: Hausmeister oder Mieter möglich."
      },
      {
        question: "Was passiert, wenn das Problem komplizierter ist als gedacht?",
        answer: "Wir unterbrechen die Arbeit und erklären die neue Situation. Wenn sich der Aufwand erhöht, nennen wir einen neuen Festpreis. Sie entscheiden dann erneut. Wir machen nichts ohne Ihr OK.",
        shortAnswer: "Wir stoppen, erklären, nennen neuen Preis. Sie entscheiden. Keine eigenmächtigen Mehrkosten."
      },
    ]
  },
  {
    id: "notfall",
    title: "Notfälle & Dringlichkeit",
    icon: AlertTriangle,
    color: "red",
    questions: [
      {
        question: "Wann ist eine Verstopfung ein Notfall?",
        answer: "Ein Notfall liegt vor, wenn: 1) Wasser austritt und Schäden drohen, 2) Die einzige Toilette im Haushalt nicht nutzbar ist, 3) Abwasser zurückdrückt, 4) Geruch auf Kanalgase hindeutet. Bei diesen Situationen sollten Sie sofort anrufen.",
        shortAnswer: "Bei Wasseraustritt, unbenutzbar Toilette, Abwasser-Rückstau oder Gasgeruch: Sofort anrufen."
      },
      {
        question: "Was soll ich tun, bis der Techniker kommt?",
        answer: "1) Drehen Sie den Hauptwasserhahn ab (bei drohendem Überlauf). 2) Benutzen Sie den betroffenen Abfluss nicht weiter. 3) Legen Sie Handtücher aus, um Wasserschäden zu minimieren. 4) Öffnen Sie Fenster bei Geruch.",
        shortAnswer: "Wasser abstellen, Abfluss nicht benutzen, Handtücher auslegen, bei Geruch lüften."
      },
      {
        question: "Arbeiten Sie auch nachts und am Wochenende?",
        answer: "Ja, unser 24/7 Notdienst ist rund um die Uhr erreichbar – auch um 3 Uhr nachts und an Feiertagen. Die Zuschläge werden transparent am Telefon kommuniziert.",
        shortAnswer: "Ja, 24/7. Auch nachts, Wochenende, Feiertage. Zuschläge werden vorher genannt."
      },
      {
        question: "Kann ich morgen anrufen, wenn es nicht so dringend ist?",
        answer: "Natürlich. Wenn keine akute Gefahr besteht (kein Überlauf, Toilette noch nutzbar), können Sie auch tagsüber anrufen. Dann entfallen die Notdienst-Zuschläge.",
        shortAnswer: "Ja, wenn kein Überlauf droht. Tagsüber entfallen die Notdienst-Zuschläge."
      },
      {
        question: "Übernimmt die Versicherung die Kosten?",
        answer: "Das hängt von Ihrer Versicherung ab. Wir erstellen auf Wunsch eine detaillierte Dokumentation mit Fotos und Bericht, die Sie bei Ihrer Versicherung einreichen können.",
        shortAnswer: "Abhängig von Ihrer Police. Wir liefern Dokumentation für Versicherungsansprüche."
      },
    ]
  },
  {
    id: "technik",
    title: "Technik & Methoden",
    icon: Wrench,
    color: "blue",
    questions: [
      {
        question: "Welche Reinigungsmethoden verwenden Sie?",
        answer: "Wir nutzen: 1) Mechanische Reinigung (Spirale) für Standard-Verstopfungen, 2) Hochdruck-Spülung (bis 200 bar) für hartnäckige Ablagerungen, 3) TV-Kamera für Diagnose und Inspektion. Die Methode wählen wir je nach Problem.",
        shortAnswer: "Spirale, Hochdruck (bis 200 bar), TV-Kamera. Methode je nach Problem."
      },
      {
        question: "Was ist eine TV-Kamera-Inspektion?",
        answer: "Eine Kamera auf einem flexiblen Kabel wird ins Rohr eingeführt. So können wir das Problem sehen – Wurzeln, Risse, Ablagerungen, Fremdkörper. Sie bekommen ein Video und Fotos zur Dokumentation.",
        shortAnswer: "Kamera im Rohr zeigt das Problem. Sie erhalten Video + Fotos als Dokumentation."
      },
      {
        question: "Kann eine Hochdruckspülung meine Rohre beschädigen?",
        answer: "Nein, wenn sie professionell durchgeführt wird. Wir passen den Druck an den Rohrzustand an. Bei sehr alten oder beschädigten Rohren verwenden wir niedrigere Drücke oder alternative Methoden.",
        shortAnswer: "Nein, wir passen den Druck an. Bei alten Rohren: schonende Alternativen."
      },
      {
        question: "Funktioniert das bei allen Rohrtypen?",
        answer: "Ja, unsere Technik funktioniert bei Kunststoff, Gusseisen, Steinzeug und anderen Materialien. Der Techniker wählt die passende Methode für Ihr Rohrsystem.",
        shortAnswer: "Ja, bei allen Materialien: Kunststoff, Guss, Steinzeug etc."
      },
    ]
  },
  {
    id: "probleme",
    title: "Typische Probleme",
    icon: HelpCircle,
    color: "amber",
    questions: [
      {
        question: "Was verursacht eine verstopfte Toilette?",
        answer: "Die häufigsten Ursachen: 1) Zu viel Toilettenpapier, 2) Feuchttücher (auch 'spülbare' verstopfen!), 3) Hygieneartikel, 4) Fremdkörper (Kinderspielzeug). Tipp: Nur Toilettenpapier und menschliche Ausscheidungen gehören ins WC.",
        shortAnswer: "Zu viel Papier, Feuchttücher, Hygieneartikel, Fremdkörper. Nur Toilettenpapier ins WC!"
      },
      {
        question: "Warum stinkt es aus dem Abfluss?",
        answer: "Meist liegt es an: 1) Verstopfung mit organischen Ablagerungen, 2) Ausgetrocknetem Siphon (bei selten genutzten Abflüssen), 3) Defekter Dichtung, 4) Belüftungsproblem. Ein Techniker kann die genaue Ursache schnell feststellen.",
        shortAnswer: "Verstopfung, trockener Siphon, defekte Dichtung oder Belüftungsproblem."
      },
      {
        question: "Warum kommt die Verstopfung immer wieder?",
        answer: "Wiederkehrende Verstopfungen deuten auf ein tieferliegendes Problem hin: Wurzeleinwuchs, Rohrversatz, Ablagerungen im Hauptkanal. Eine Kamera-Inspektion zeigt die Ursache und ermöglicht eine dauerhafte Lösung.",
        shortAnswer: "Tieferes Problem (Wurzeln, Rohrversatz, Hauptkanal). Kamera-Inspektion empfohlen."
      },
      {
        question: "Kann ich eine Verstopfung selbst beheben?",
        answer: "Bei leichten Verstopfungen können Sie es versuchen: Pümpel, heißes Wasser mit Spülmittel. Aber: Keine chemischen Reiniger (schädigen Rohre). Wenn es nicht funktioniert oder das Problem wiederkehrt – rufen Sie an.",
        shortAnswer: "Leichte Fälle: Pümpel versuchen. Keine Chemie! Bei Misserfolg: uns anrufen."
      },
      {
        question: "Was ist ein Rückstau?",
        answer: "Rückstau entsteht, wenn Abwasser nicht abfließen kann und zurückdrückt – z.B. aus Bodenabläufen im Keller. Das ist ein Notfall, da Wasserschäden drohen. Ursache ist meist eine Verstopfung im Hauptkanal.",
        shortAnswer: "Abwasser drückt zurück (Keller). Notfall! Meist Verstopfung im Hauptkanal."
      },
    ]
  },
  {
    id: "b2b",
    title: "Für Geschäftskunden",
    icon: Building2,
    color: "purple",
    questions: [
      {
        question: "Bieten Sie Rahmenverträge für Hausverwaltungen an?",
        answer: "Ja. Mit einem Rahmenvertrag erhalten Sie 10% Rabatt auf alle Einsätze, Priorität bei Notfällen, einen persönlichen Ansprechpartner und monatliche Sammelrechnungen. Keine Mindestvertragsdauer.",
        shortAnswer: "Ja. 10% Rabatt, Priorität, persönlicher Ansprechpartner, Sammelrechnung."
      },
      {
        question: "Was kostet ein Wartungsvertrag?",
        answer: "Wartungsverträge starten ab 29€ pro Einheit und Monat. Enthalten sind regelmäßige Wartungstermine, Prioritäts-Notdienst und kleine Reparaturen. Wartung reduziert Notfälle um bis zu 80%.",
        shortAnswer: "Ab 29€/Einheit/Monat. Regelmäßige Wartung reduziert Notfälle um bis zu 80%."
      },
      {
        question: "Können Sie nachts in Gastronomiebetrieben arbeiten?",
        answer: "Ja, wir führen Einsätze außerhalb der Öffnungszeiten durch. Fettabscheider-Wartung, Kanalreinigung – diskret und ohne Betriebsunterbrechung.",
        shortAnswer: "Ja, außerhalb der Öffnungszeiten. Diskret, ohne Betriebsstörung."
      },
      {
        question: "Erstellen Sie Dokumentation für WEG-Versammlungen?",
        answer: "Ja. Wir liefern detaillierte Berichte mit Fotos, Videoaufnahmen und Handlungsempfehlungen – ideal für Eigentümerversammlungen oder Versicherungsansprüche.",
        shortAnswer: "Ja. Fotos, Video, Bericht für WEG-Versammlungen und Versicherung."
      },
    ]
  },
  {
    id: "service",
    title: "Service & Garantie",
    icon: Shield,
    color: "emerald",
    questions: [
      {
        question: "Geben Sie Garantie auf Ihre Arbeit?",
        answer: "Ja. Wenn das Problem innerhalb von 24 Stunden wiederkehrt, kommen wir kostenlos zurück und beheben es. Bei Komplett-Reinigungen mit Kamerainspektion: 30 Tage Nachbetreuung.",
        shortAnswer: "24h-Garantie auf alle Arbeiten. Bei Komplett-Paket: 30 Tage Nachbetreuung."
      },
      {
        question: "Was passiert, wenn ich mit der Arbeit nicht zufrieden bin?",
        answer: "Sagen Sie es uns direkt vor Ort. Wir lösen Probleme am liebsten sofort. Sollte nach der Arbeit etwas nicht stimmen, rufen Sie an – wir finden eine Lösung.",
        shortAnswer: "Direkt vor Ort ansprechen. Bei späteren Problemen: Anruf genügt."
      },
      {
        question: "Hinterlassen Sie Schmutz?",
        answer: "Nein. Wir legen Schutzfolien aus und reinigen nach der Arbeit. Sie sollen keinen Unterschied sehen – außer dass der Abfluss wieder funktioniert.",
        shortAnswer: "Nein. Schutzfolien + Reinigung danach. Keine Sauerei."
      },
      {
        question: "Sind Ihre Techniker ausgebildet?",
        answer: "Ja. Alle unsere Techniker sind ausgebildete Fachkräfte mit Erfahrung in der Rohr- und Kanalreinigung. Regelmäßige Schulungen halten sie auf dem neuesten Stand.",
        shortAnswer: "Ja, ausgebildete Fachkräfte mit regelmäßigen Schulungen."
      },
    ]
  },
  {
    id: "region",
    title: "Servicegebiet",
    icon: MapPin,
    color: "primary",
    questions: [
      {
        question: "In welchen Städten sind Sie aktiv?",
        answer: "Unser Einsatzgebiet umfasst Nürnberg und Orte innerhalb von 30 km Luftlinie ab Nürnberg Hauptbahnhof, darunter Fürth, Erlangen und Schwabach. An der Grenze bestätigen wir die Abdeckung anhand Ihrer genauen Adresse. Die Ortsliste finden Sie unter Einsatzgebiet.",
        shortAnswer: "Kerngebiet: Nürnberg, Fürth, Erlangen. Plus Umland im 60-km-Radius."
      },
      {
        question: "Wo ist Ihr Firmensitz?",
        answer: "Wir sitzen in der Ehemannstraße 9, 90478 Nürnberg-Glockenhof. Ein echter lokaler Familienbetrieb – kein Call-Center, keine Franchise.",
        shortAnswer: "Ehemannstr. 9, 90478 Nürnberg-Glockenhof. Lokaler Familienbetrieb."
      },
      {
        question: "Wie lange gibt es Rohrreinigung Kraft schon?",
        answer: "Seit 2014 sind wir in Mittelfranken aktiv. Über 10 Jahre Erfahrung, mehr als 2.000 erfolgreiche Einsätze.",
        shortAnswer: "Seit 2014. Über 10 Jahre Erfahrung, 2.000+ Einsätze."
      },
    ]
  },
];

export default function FAQPage() {
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
              <span className="text-white/70">Häufige Fragen</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Häufige Fragen zur{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                Rohrreinigung
              </span>
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Was kostet der Einsatz? Was können Sie bis zur Ankunft tun?
              Hier finden Sie Antworten zu Preisen, Ablauf und unseren Leistungen.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
                >
                  {category.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <VideoShowcase />

      {/* FAQ Content */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} id={category.id} className="mb-12 scroll-mt-24">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      category.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                      category.color === 'primary' ? 'bg-primary/20' :
                      category.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
                      category.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      category.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' :
                      category.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        category.color === 'emerald' ? 'text-emerald-600' :
                        category.color === 'primary' ? 'text-primary' :
                        category.color === 'red' ? 'text-red-600' :
                        category.color === 'blue' ? 'text-blue-600' :
                        category.color === 'amber' ? 'text-amber-600' :
                        category.color === 'purple' ? 'text-purple-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions */}
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <details
                        key={index}
                        className="group bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                      >
                        <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors list-none">
                          <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                        </summary>
                        <div className="px-5 pb-5 pt-2">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                          {/* Short answer for AEO */}
                          <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                            <p className="text-sm text-emerald-700 dark:text-emerald-400">
                              <strong>Kurz:</strong> {faq.shortAnswer}
                            </p>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ihre Frage nicht dabei?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Rufen Sie uns an. Wir beantworten Ihre Fragen gerne persönlich – kostenlos und unverbindlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`tel:${company.contact.phone}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 shadow-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  {company.contact.phoneDisplay}
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="h-14 px-8">
                  Nachricht schreiben
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org FAQ Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqCategories.flatMap(category =>
              category.questions.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.shortAnswer
                }
              }))
            )
          })
        }}
      />
    </>
  );
}
