"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Star, ExternalLink, Shield, CheckCircle, Award, Users } from "lucide-react";
import { company } from "@/data/company";

const trustPoints = [
  {
    icon: Star,
    title: `${company.rating.displayText} auf Google`,
    subtitle: `${company.rating.reviewCount} Google-Bewertungen`,
    description: `Stand: ${company.rating.asOf}`,
    link: company.googleReviewsUrl,
    linkText: "Bewertungen lesen",
    color: "amber"
  },
  {
    icon: Shield,
    title: "Festpreis-Garantie",
    subtitle: "Keine Überraschungen",
    description: "Der genannte Preis ist der Endpreis. Punkt.",
    color: "emerald"
  },
  {
    icon: Award,
    title: `${company.stats.yearsExperience} Jahre lokal`,
    subtitle: "Nürnberg-Glockenhof",
    description: "Kein Call-Center. Ihr Nachbar seit 2014.",
    color: "primary"
  },
  {
    icon: Users,
    title: `${company.stats.projectsCompleted} Einsätze`,
    subtitle: "Erfahrung, die zählt",
    description: "Ihr Problem? Haben wir schon 100x gelöst.",
    color: "blue"
  },
];

const colorClasses = {
  amber: {
    icon: "bg-amber-100 dark:bg-amber-900/40 text-amber-600",
    ring: "ring-amber-200 dark:ring-amber-800"
  },
  emerald: {
    icon: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600",
    ring: "ring-emerald-200 dark:ring-emerald-800"
  },
  primary: {
    icon: "bg-primary/20 text-primary",
    ring: "ring-primary/30"
  },
  blue: {
    icon: "bg-blue-100 dark:bg-blue-900/40 text-blue-600",
    ring: "ring-blue-200 dark:ring-blue-800"
  },
};

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-semibold text-sm rounded-full mb-4">
            Vertrauen, das man prüfen kann
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Zahlen statt Versprechen
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Jeder kann behaupten, gut zu sein. Wir lassen unsere Kunden sprechen – und Sie können es nachprüfen.
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            const colors = colorClasses[point.color as keyof typeof colorClasses];
            return (
              <div
                key={point.title}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl ${colors.icon} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {point.title}
                </h3>
                <p className="text-sm font-medium text-primary mb-2">
                  {point.subtitle}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {point.description}
                </p>

                {point.link && (
                  <Link
                    href={point.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    {point.linkText}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Google Reviews Highlight */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-8 h-8 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {company.rating.displayText} auf Google
                </h3>
                <p className="text-gray-300 mb-4 max-w-md">
                  Durchschnitt aus {company.rating.reviewCount} Bewertungen (Stand: {company.rating.asOf}).
                </p>
                <Link
                  href={company.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google Bewertungen lesen
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              {/* Sample reviews */}
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 max-w-xs">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/90 mb-2">
                    "Ehrlich, pünktlich, fair. Preis wurde vorher genannt und eingehalten. Top!"
                  </p>
                  <p className="text-xs text-white/60">— M. Schmidt, Nürnberg</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 max-w-xs">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/90 mb-2">
                    "Endlich ein Handwerker, der erklärt was er tut. Klare Empfehlung!"
                  </p>
                  <p className="text-xs text-white/60">— K. Weber, Fürth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />
        </div>

        {/* Trust badges row */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kostenlose Ersteinschätzung</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Keine versteckten Kosten</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">24/7 Notdienst</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lokaler Familienbetrieb</span>
          </div>
        </div>
      </div>
    </section>
  );
}
