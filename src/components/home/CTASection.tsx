"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import CallConfirmModal from "@/components/layout/CallConfirmModal";

export default function CTASection() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  return (
    <>
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="cta_section"
      />

      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-300">
                  24/7 telefonisch erreichbar
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Verstopfung? <span className="text-primary">Rufen Sie jetzt an.</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto">
                Kostenlose Beratung. Kostenlose Diagnose vor Ort.
                Sie zahlen erst, wenn Sie JA sagen.
              </p>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">Festpreis vor Arbeit</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Ankunft telefonisch klären</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">Kein Start ohne OK</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button
                size="lg"
                onClick={() => setIsCallModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white h-14 px-8 text-lg font-bold shadow-lg shadow-primary/30 flex-1"
              >
                <Phone className="w-6 h-6 mr-3" />
                {company.contact.phoneDisplay}
              </Button>

              <Link href="/kontakt" className="flex-1">
                <button
                  className="border-2 border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg font-semibold w-full rounded-xl transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Rückruf anfordern
                </button>
              </Link>
            </div>

            {/* Reassurance */}
            <p className="text-center text-sm text-gray-400 mt-6">
              24/7 erreichbar • Auch nachts & am Wochenende • Keine versteckten Kosten
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </section>
    </>
  );
}
