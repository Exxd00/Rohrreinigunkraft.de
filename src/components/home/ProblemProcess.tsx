"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  CheckCircle,
  Shield,
  Camera,
  AlertTriangle,
  Droplets,
  Home,
  Wrench,
  Building2,
  ArrowRight,
} from "lucide-react";
import { company } from "@/data/company";
import CallConfirmModal from "@/components/layout/CallConfirmModal";

const problemCards = [
  {
    icon: Droplets,
    title: "Toilette verstopft",
    href: "/service/toilette-verstopft",
    urgent: true
  },
  {
    icon: Droplets,
    title: "Dusche/Bad verstopft",
    href: "/service/dusche-verstopft",
    urgent: false
  },
  {
    icon: Wrench,
    title: "Küche verstopft",
    href: "/service/kueche-abfluss-verstopft",
    urgent: false
  },
  {
    icon: Home,
    title: "Keller/Bodenablauf",
    href: "/service/bodenablauf-verstopft",
    urgent: false
  },
  {
    icon: Camera,
    title: "Wiederkehrende Verstopfung",
    href: "/service/kamera-inspektion",
    urgent: false
  },
  {
    icon: AlertTriangle,
    title: "Notfall/Überlauf",
    href: "/service/rohrreinigung-notdienst",
    urgent: true
  },
  {
    icon: Building2,
    title: "Hausverwaltung/Gewerbe",
    href: "/hausverwaltung",
    urgent: false
  },
];

export default function ProblemProcess() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  return (
    <>
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="hero"
      />

      {/* PROBLEM SELECTION SECTION */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Was ist Ihr Problem?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {problemCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className={`relative group p-4 md:p-5 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-1 ${
                      card.urgent
                        ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 hover:border-red-400'
                        : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-primary'
                    }`}
                  >
                    {card.urgent && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        Dringend
                      </span>
                    )}
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 ${
                      card.urgent
                        ? 'bg-red-100 dark:bg-red-900/50'
                        : 'bg-primary/10 dark:bg-primary/20'
                    }`}>
                      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${
                        card.urgent ? 'text-red-500' : 'text-primary'
                      }`} />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK - TRANSPARENCY SECTION */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                So wissen Sie <span className="text-primary">VORHER</span>, was es kostet
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Kein Rätselraten. Keine Überraschungen. So läuft es bei uns.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 md:gap-6">
              {/* Step 1 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Anruf</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sie schildern das Problem. Wir schätzen grob ein und sagen, wann wir da sind.
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                  → Keine Verpflichtung
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Diagnose</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wir kommen, schauen uns alles an und erklären, was das Problem ist.
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                  → Kostenlos. Immer.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Festpreis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wir nennen den genauen Preis. Sie wissen was kommt, bevor wir anfangen.
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                  → Der Preis steht. Punkt.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  4
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Entscheidung</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sie entscheiden, ob wir reinigen. Wenn Sie ablehnen, zahlen Sie nur die vorher vereinbarte Anfahrtspauschale.
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                  → Sie haben die Kontrolle.
                </p>
              </div>
            </div>

            {/* CTA after process */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Das klingt gut? Dann rufen Sie jetzt an.
              </p>
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
              >
                <Phone className="w-5 h-5" />
                {company.contact.phoneDisplay}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
