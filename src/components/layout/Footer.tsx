"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MapPin, Mail, Clock, ExternalLink, ChevronRight, Shield, FileText, Scale } from "lucide-react";
import { company } from "@/data/company";
import AnimatedLogo from "./AnimatedLogo";
import CallConfirmModal from "./CallConfirmModal";

const footerLinks = {
  services: [
    { name: "Rohrreinigung", href: "/service/rohrreinigung" },
    { name: "Kanalreinigung", href: "/service/kanalreinigung" },
    { name: "Abflussreinigung", href: "/service/abflussreinigung" },
    { name: "Notdienst 24/7", href: "/service/rohrreinigung-notdienst" },
    { name: "TV-Inspektion", href: "/service/kamera-inspektion" },
  ],
  info: [
    { name: "Preise", href: "/preise" },
    { name: "Häufige Fragen", href: "/faq" },
    { name: "Für Gewerbe", href: "/hausverwaltung" },
    { name: "Unsere Arbeiten", href: "/arbeiten" },
  ],
  cities: [
    { name: "Nürnberg", href: "/nuernberg" },
    { name: "Fürth", href: "/fuerth" },
    { name: "Erlangen", href: "/erlangen" },
    { name: "Alle Städte", href: "/staedte" },
  ],
  legal: [
    { name: "Impressum", href: "/impressum", icon: <Scale className="w-4 h-4" /> },
    { name: "Datenschutz", href: "/datenschutz", icon: <Shield className="w-4 h-4" /> },
    { name: "Kontakt", href: "/kontakt", icon: <Mail className="w-4 h-4" /> },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  return (
    <>
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="footer"
      />

      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        {/* Map Section */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Map Preview - Clickable */}
              <a
                href={company.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-primary transition-colors"
              >
                {/* Static Map Image */}
                <div className="relative h-48 md:h-56 bg-gray-800 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=Rohrreinigung+Kraft,+Ehemannstra%C3%9Fe+9,+90478+N%C3%BCrnberg&output=embed"
                    title="Standort Rohrreinigung Kraft, Ehemannstraße 9 in Nürnberg"
                    className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500 pointer-events-none"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent group-hover:from-gray-900/60 transition-all" />
                  {/* Click indicator */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      <span className="text-white text-sm font-medium">Unser Standort</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>In Google Maps öffnen</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Contact Info Card */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Kontakt & Standort</h3>

                {/* Address */}
                <a
                  href={company.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-primary transition-colors">
                      {company.address.street}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {company.address.zip} {company.address.city}-{company.address.district}
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <button
                  onClick={() => setIsCallModalOpen(true)}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors group w-full text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {company.contact.phoneDisplay}
                    </p>
                    <p className="text-gray-400 text-sm">Kostenlose Beratung</p>
                  </div>
                </button>

                {/* Hours */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/50">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{company.hours.regular}</p>
                    <p className="text-gray-400 text-sm">{company.hours.emergencyText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <AnimatedLogo size="md" />
                <div>
                  <span className="text-lg font-bold">Rohrreinigung</span>
                  <span className="text-primary font-semibold ml-1">Kraft</span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Ihr Partner für Rohrreinigung in Nürnberg und 30 km Umgebung.
                Schnell, fair und zuverlässig seit über 10 Jahren.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 font-medium">Jetzt erreichbar</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                Leistungen
              </h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                Einsatzgebiete
              </h4>
              <ul className="space-y-2">
                {footerLinks.cities.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal - Better Styled */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                Rechtliches
              </h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-gray-500 group-hover:text-primary transition-colors">
                        {link.icon}
                      </span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Legal Info */}
              <div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
                <p className="text-xs text-gray-500">
                  <span className="text-gray-400">Registergericht:</span> Amtsgericht Nürnberg
                </p>
                <p className="text-xs text-gray-500">
                  <span className="text-gray-400">USt-IdNr.:</span> DE362340841
                </p>
              </div>

              {/* Trust badges */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    SSL gesichert
                  </div>
                  <div className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-primary" />
                    DSGVO konform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 text-center md:text-left">
                © {currentYear} {company.name}. Alle Rechte vorbehalten.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href={company.socialLinks.gelbeSeiten}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Gelbe Seiten
                </a>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary font-medium">24/7 Erreichbar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
