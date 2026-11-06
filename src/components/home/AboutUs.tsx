"use client";

import { MapPin, Calendar, Users, Heart, Wrench, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";

export default function AboutUs() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Story */}
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
                Über uns
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Aus Nürnberg-Glockenhof.
                <br />
                <span className="text-primary">Ihr Nachbar seit 2014.</span>
              </h2>

              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p className="text-lg">
                  Wir sind kein anonymes Call-Center. Keine Franchise-Kette.
                  Wir sind ein <strong className="text-gray-900 dark:text-white">lokaler Familienbetrieb</strong> aus
                  der Ehemannstraße in Nürnberg-Glockenhof.
                </p>
                <p>
                  Wenn Sie uns anrufen, sprechen Sie mit Menschen, die die Region kennen.
                  Die wissen, dass Altbauten in der Südstadt andere Rohrsysteme haben als
                  Neubauten in Langwasser. Die seit über 10 Jahren jeden Tag unterwegs sind –
                  in Nürnberg, Fürth, Erlangen und Umgebung.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-white">{company.stats.projectsCompleted}</strong> Einsätze
                  haben wir erfolgreich abgeschlossen. Auf Google liegt unser Durchschnitt bei {company.rating.fullText}.
                </p>
              </div>

              {/* Key Points */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Standort</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Ehemannstr. 9, 90478 Nürnberg
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Seit 2014</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Über 10 Jahre lokale Erfahrung
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Familienbetrieb</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Persönlicher Service, keine Hotline
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{company.stats.satisfactionRate}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Kundenzufriedenheit
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/work/mitarbeiter.jpg"
                  alt="Rohrreinigung Kraft Mitarbeiter bei der Arbeit"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Unser Versprechen</p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          Klarheit vor dem ersten Handgriff.
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl border border-gray-100 dark:border-gray-700 hidden md:block">
                <p className="text-4xl font-black text-primary mb-1">{company.stats.projectsCompleted}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">erfolgreiche Einsätze</p>
              </div>

              {/* Service area badge */}
              <div className="absolute -bottom-4 -left-4 bg-gray-900 dark:bg-gray-700 text-white rounded-xl px-4 py-3 shadow-lg hidden md:flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Nürnberg • Fürth • Erlangen</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-center sm:text-left">
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  Haben Sie Fragen? Rufen Sie uns an.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Kostenlose Beratung – ohne Verpflichtung.
                </p>
              </div>
              <Link href={`tel:${company.contact.phone}`}>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                  <Phone className="w-5 h-5" />
                  {company.contact.phoneDisplay}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
