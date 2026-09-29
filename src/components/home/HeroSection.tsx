"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  CheckCircle,
  Star,
  MapPin,
  Shield,
  Clock,
  ArrowRight,
  Zap
} from "lucide-react";
import { company } from "@/data/company";
import CallConfirmModal from "@/components/layout/CallConfirmModal";

export default function HeroSection() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  return (
    <>
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="hero"
      />

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-28 pb-8 md:pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Emergency accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">

            {/* Availability Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-300">
                  24/7 telefonisch erreichbar
                </span>
              </div>
            </div>

            {/* MAIN HEADLINE - Differentiating */}
            <div className="text-center mb-6">
              {/* Location Badge - Prominent Nürnberg */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white/10 border border-white/20 rounded-full">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm md:text-base font-semibold text-white">
                  Rohrreinigung <span className="text-primary">Nürnberg</span> und Umgebung
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                <span className="text-white">Rohrreinigung in Nürnberg.</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Damit Ihr Alltag wieder läuft.</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/90 font-medium mb-2">
                Abfluss verstopft? Rohr dicht? Wir kümmern uns darum.
              </p>
              <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
                Schildern Sie uns Ihr Problem. Wir besprechen die passende Hilfe
                und nennen Ihnen den Preis <strong className="text-white">vor Arbeitsbeginn</strong>.
                Sie entscheiden, ob wir starten.
              </p>
            </div>

            {/* TRUST GUARANTEES BAR */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <span className="text-xs md:text-sm font-medium">Diagnose kostenlos</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-xs md:text-sm font-medium">Festpreis vor Arbeit</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <span className="text-xs md:text-sm font-medium">Kein Start ohne OK</span>
              </div>
            </div>

            {/* MAIN CTA */}
            <div className="max-w-md mx-auto mb-8">
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="w-full bg-gradient-to-r from-primary to-cyan-500 rounded-2xl px-6 py-5 flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 hover:shadow-primary/50 active:scale-[0.98] transition-all group"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/80 text-sm font-medium">Jetzt Hilfe anfragen</p>
                  <p className="text-white text-2xl md:text-3xl font-black tracking-tight">
                    {company.contact.phoneDisplay}
                  </p>
                </div>
              </button>

              {/* Secondary CTA */}
              <Link href="/kontakt" className="block mt-3">
                <div className="w-full h-12 bg-white/10 text-white border border-white/20 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-white/20 transition-colors">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Rückruf anfordern
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            {/* TRUST INDICATORS */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-white font-semibold text-sm md:text-base">
                  {company.rating.displayText}
                </span>
                <span className="text-white/60 text-xs md:text-sm">
                  ({company.rating.reviewCount} Bewertungen)
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">Nürnberg • Fürth • Erlangen • Umgebung</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-white/80 text-sm">Ankunft am Telefon klären</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 30L60 28C120 26 240 22 360 22C480 22 600 26 720 30C840 34 960 38 1080 36C1200 34 1320 26 1380 22L1440 18V60H0V30Z" fill="white" className="dark:fill-gray-900"/>
          </svg>
        </div>
      </section>
    </>
  );
}
