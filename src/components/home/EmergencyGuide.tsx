"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Phone,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Droplets,
  Wrench,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Ban,
  HandshakeIcon,
} from "lucide-react";
import { company } from "@/data/company";
import CallConfirmModal from "@/components/layout/CallConfirmModal";

interface GuideStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  description: string;
  dos: string[];
  donts: string[];
  tip?: string;
}

const guideSteps: GuideStep[] = [
  {
    id: "prevention",
    title: "Vorbeugung",
    icon: <ShieldCheck className="w-6 h-6" />,
    iconBg: "bg-emerald-500",
    description: "So vermeiden Sie Verstopfungen von vornherein",
    dos: [
      "Regelmäßig heißes Wasser durch Abflüsse laufen lassen",
      "Haarsiebe in Dusche und Badewanne verwenden",
      "Speisereste im Biomüll entsorgen, nicht im Abfluss",
      "Fettiges Wasser abkühlen lassen, dann im Müll entsorgen",
      "Toilette nur für WC-Papier und Körperausscheidungen nutzen",
    ],
    donts: [
      "Keine Öle oder Fette in den Abfluss gießen",
      "Keine Hygieneartikel, Feuchttücher oder Wattestäbchen in der Toilette entsorgen",
      "Keine Essensreste in der Spüle entsorgen",
      "Keine chemischen Reiniger übermäßig verwenden",
    ],
    tip: "Eine regelmäßige Wartung alle 1-2 Jahre kann teure Notfälle verhindern.",
  },
  {
    id: "during",
    title: "Bei einer Verstopfung",
    icon: <AlertTriangle className="w-6 h-6" />,
    iconBg: "bg-amber-500",
    description: "Erste Schritte wenn das Problem auftritt",
    dos: [
      "Ruhe bewahren – die meisten Verstopfungen sind lösbar",
      "Wasserzufuhr stoppen (Haupthahn abdrehen bei starkem Rückstau)",
      "Handtücher/Lappen unter dem betroffenen Bereich auslegen",
      "Bei leichten Verstopfungen: Saugglocke (Pümpel) versuchen",
      "Uns sofort anrufen bei: stehendem Wasser, üblen Gerüchen, Rückstau",
    ],
    donts: [
      "Keine aggressiven chemischen Reiniger verwenden – sie können Rohre beschädigen",
      "Nicht mit Draht oder spitzen Gegenständen in Rohre stechen",
      "Kein weiteres Wasser laufen lassen bei stehendem Wasser",
      "Verstopfung nicht ignorieren – sie wird nur schlimmer",
    ],
    tip: "Notieren Sie, wann das Problem begann und ob es sich verschlechtert – das hilft uns bei der Diagnose.",
  },
  {
    id: "after-call",
    title: "Nach Ihrem Anruf",
    icon: <Phone className="w-6 h-6" />,
    iconBg: "bg-primary",
    description: "Was passiert nachdem Sie uns kontaktiert haben",
    dos: [
      "Wir besprechen Verfügbarkeit und voraussichtliche Ankunft",
      "Bereiten Sie den Zugang zum betroffenen Bereich vor",
      "Räumen Sie den Bereich um den verstopften Abfluss frei",
      "Halten Sie ggf. Schlüssel für Keller oder Außenbereiche bereit",
      "Bei Mietwohnung: Informieren Sie Ihren Vermieter wenn nötig",
    ],
    donts: [
      "Nicht versuchen, die Verstopfung mit Gewalt zu lösen",
      "Keine weiteren Experimente mit Hausmitteln kurz vor unserer Ankunft",
      "Den Bereich nicht überschwemmen",
    ],
    tip: "Sie können uns Fotos per WhatsApp schicken – so können wir das richtige Werkzeug mitbringen.",
  },
  {
    id: "arrival",
    title: "Bei unserer Ankunft",
    icon: <Users className="w-6 h-6" />,
    iconBg: "bg-sky-500",
    description: "Was Sie bei unserem Einsatz erwarten können",
    dos: [
      "Unser Techniker analysiert zuerst das Problem – kostenlos",
      "Sie erhalten einen verbindlichen Festpreis VOR Arbeitsbeginn",
      "Erst nach Ihrer Zustimmung beginnen wir mit der Arbeit",
      "Wir schützen Ihre Böden mit Abdeckungen",
      "Nach der Arbeit reinigen wir den Arbeitsbereich",
    ],
    donts: [
      "Kein Arbeitsbeginn ohne Ihre ausdrückliche Zustimmung",
      "Keine versteckten Kosten oder Überraschungen",
      "Keine Anfahrtskosten bei Auftragserteilung",
    ],
    tip: "Fragen Sie nach Tipps zur Vorbeugung – unsere Techniker beraten Sie gerne kostenlos.",
  },
];

export default function EmergencyGuide() {
  const [expandedStep, setExpandedStep] = useState<string | null>("during");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <>
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="emergency-guide"
      />

      <section className="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
              <Lightbulb className="w-4 h-4" />
              Ratgeber
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Was tun bei Rohrverstopfung?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Unser Expertenleitfaden: Von der Vorbeugung bis zur professionellen Lösung.
              So handeln Sie richtig in jeder Situation.
            </p>
          </div>

          {/* Timeline/Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 via-primary to-sky-500 hidden sm:block" />

              {guideSteps.map((step, index) => (
                <div key={step.id} className="relative mb-6">
                  {/* Step Card */}
                  <div
                    className={`
                      relative sm:ml-16 md:ml-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg
                      border-2 transition-all duration-300 overflow-hidden
                      ${expandedStep === step.id
                        ? "border-primary shadow-xl shadow-primary/10"
                        : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                      }
                    `}
                  >
                    {/* Icon Badge - Mobile/Desktop */}
                    <div
                      className={`
                        absolute -left-12 md:-left-16 top-6 w-10 h-10 md:w-12 md:h-12 rounded-full
                        ${step.iconBg} text-white flex items-center justify-center shadow-lg
                        hidden sm:flex
                      `}
                    >
                      {step.icon}
                    </div>

                    {/* Header - Clickable */}
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full p-5 md:p-6 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4">
                        {/* Mobile Icon */}
                        <div
                          className={`
                            w-10 h-10 rounded-full ${step.iconBg} text-white
                            flex items-center justify-center sm:hidden flex-shrink-0
                          `}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              Schritt {index + 1}
                            </span>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all
                        ${expandedStep === step.id
                          ? "bg-primary text-white rotate-180"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                        }
                      `}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {/* Expandable Content */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-300
                        ${expandedStep === step.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
                      `}
                    >
                      <div className="px-5 md:px-6 pb-6 border-t border-gray-100 dark:border-gray-700 pt-5">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Do's */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <h4 className="font-semibold text-emerald-700 dark:text-emerald-400">
                                Das sollten Sie tun
                              </h4>
                            </div>
                            <ul className="space-y-2">
                              {step.dos.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Don'ts */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <Ban className="w-4 h-4 text-red-600 dark:text-red-400" />
                              </div>
                              <h4 className="font-semibold text-red-700 dark:text-red-400">
                                Das sollten Sie vermeiden
                              </h4>
                            </div>
                            <ul className="space-y-2">
                              {step.donts.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Tip */}
                        {step.tip && (
                          <div className="mt-5 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
                            <div className="flex items-start gap-3">
                              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold text-primary">Profi-Tipp:</span> {step.tip}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">24/7 Notdienst verfügbar</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Problem jetzt? Wir helfen sofort!
              </h3>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                Kostenlose Diagnose vor Ort. Festpreis vor Arbeitsbeginn.
                Verfügbarkeit und Ankunft telefonisch klären.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setIsCallModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-5 h-5" />
                  {company.contact.phoneDisplay}
                </button>
                <a
                  href={company.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Wrench className="w-5 h-5" />
                  Standort ansehen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
