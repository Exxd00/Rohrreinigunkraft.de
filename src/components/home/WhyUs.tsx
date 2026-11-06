"use client";

import {
  Eye,
  Euro,
  Shield,
  FileCheck,
  ThumbsUp,
  Camera,
  CheckCircle
} from "lucide-react";

const differentiators = [
  {
    icon: Euro,
    title: "Preis VOR dem Handgriff",
    description: "Wir nennen den Festpreis bevor wir anfangen. Nicht erst auf der Rechnung.",
    proof: "Andere sagen 'ab 79€'. Wir sagen genau, was SIE zahlen.",
    color: "emerald"
  },
  {
    icon: Eye,
    title: "Wir zeigen, statt zu erzählen",
    description: "Mit der Kamera sehen SIE das Problem. Keine Vermutungen, keine Geheimnisse.",
    proof: "Sie verstehen, was wir tun – und warum.",
    color: "primary"
  },
  {
    icon: FileCheck,
    title: "Kostenlose Ersteinschätzung vor Ort",
    description: "Wir sehen uns die Verstopfung an und besprechen mit Ihnen die nächsten Schritte.",
    proof: "Kein OK von Ihnen = Keine Kosten für Sie.",
    color: "amber"
  },
  {
    icon: Shield,
    title: "Kein Druck. Ihre Entscheidung.",
    description: "Wir empfehlen, was nötig ist. Nicht mehr. Sie entscheiden in Ruhe.",
    proof: "Wir verdienen mit Vertrauen, nicht mit Tricks.",
    color: "blue"
  },
  {
    icon: Camera,
    title: "Dokumentation inklusive",
    description: "Vorher-Nachher-Fotos, Befundbericht – alles, was Sie für Versicherung oder Vermieter brauchen.",
    proof: "Bei anderen? Aufpreis. Bei uns? Standard.",
    color: "purple"
  },
  {
    icon: ThumbsUp,
    title: "24h Nachbetreuung",
    description: "Problem nach der Arbeit? Anruf genügt. Wir schauen nochmal nach – kostenlos.",
    proof: "Weil wir für unsere Arbeit einstehen.",
    color: "rose"
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    proof: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
  },
  primary: {
    bg: "bg-primary/5 dark:bg-primary/10",
    icon: "bg-primary/20 dark:bg-primary/30",
    iconColor: "text-primary",
    proof: "text-primary bg-primary/10 dark:bg-primary/20"
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    icon: "bg-amber-100 dark:bg-amber-900/40",
    iconColor: "text-amber-600 dark:text-amber-400",
    proof: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30"
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "bg-blue-100 dark:bg-blue-900/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    proof: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    icon: "bg-purple-100 dark:bg-purple-900/40",
    iconColor: "text-purple-600 dark:text-purple-400",
    proof: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30"
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-900/20",
    icon: "bg-rose-100 dark:bg-rose-900/40",
    iconColor: "text-rose-600 dark:text-rose-400",
    proof: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30"
  },
};

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold text-sm rounded-full mb-4">
            Der Unterschied
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Warum Kunden <span className="text-primary">uns</span> wählen
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Jeder sagt "schnell" und "günstig". Wir sagen: <strong className="text-gray-900 dark:text-white">Klarheit vor dem ersten Handgriff.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            const colors = colorClasses[item.color as keyof typeof colorClasses];
            return (
              <div
                key={item.title}
                className={`group relative ${colors.bg} rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {item.description}
                </p>

                {/* Proof statement */}
                <div className={`flex items-start gap-2 ${colors.proof} rounded-lg px-3 py-2 text-xs font-medium`}>
                  <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{item.proof}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom message */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Das nennen wir <span className="text-primary font-bold">Klarheit</span>. Keine Tricks. Kein Kleingedrucktes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
