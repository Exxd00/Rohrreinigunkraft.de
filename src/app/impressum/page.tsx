import VideoShowcase from "@/components/home/VideoShowcase";
import { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { MapPin, Phone, Mail, Building2, FileText, Scale, Shield, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://rohrreinigung-kraft.de/impressum" },
  title: "Impressum | Rohrreinigung Kraft",
  description: "Impressum und rechtliche Informationen von Rohrreinigung Kraft - Ihr lokaler Rohrreinigungsservice in Mittelfranken.",
};

export default function ImpressumPage() {
  return (
    <>
    <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              <Scale className="w-4 h-4" />
              Rechtliches
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Impressum
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Rechtliche Pflichtangaben gemäß § 5 TMG
            </p>
          </div>

          <a href="#legal-content" className="mb-6 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Direkt zu den rechtlichen Informationen</a>
        </div>
      </div>
    </section>
    <VideoShowcase />
    <section id="legal-content" className="scroll-mt-24 py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Quick Contact Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {company.name}
                    </h3>
                    <p className="text-primary text-sm font-semibold mb-1">
                      Inhaber: {company.legal.inhaber}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {company.address.street}<br />
                      {company.address.zip} {company.address.city}-{company.address.district}<br />
                      {company.address.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <a
                  href={`tel:${company.contact.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Telefon</p>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {company.contact.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${company.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">E-Mail</p>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {company.contact.email}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Map Link */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <a
                href={company.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium"
              >
                <MapPin className="w-4 h-4" />
                Standort auf Google Maps anzeigen
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Legal Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 md:p-8 space-y-8">

              {/* Registergericht */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white mb-2">Registergericht</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">Amtsgericht Nürnberg</span>
                  </p>
                </div>
              </div>

              {/* USt-ID */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white mb-2">Umsatzsteuer-ID</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    <span className="font-semibold text-gray-900 dark:text-white">DE362340841</span>
                  </p>
                </div>
              </div>

              {/* Verantwortlich */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white mb-2">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">{company.legal.inhaber}</span><br />
                    {company.name}<br />
                    {company.address.street}<br />
                    {company.address.zip} {company.address.city}
                  </p>
                </div>
              </div>

              {/* Streitschlichtung */}
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  EU-Streitschlichtung
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                    <a
                      href="https://ec.europa.eu/consumers/odr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      ec.europa.eu/consumers/odr
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  <strong className="text-gray-900 dark:text-white">Verbraucherstreitbeilegung:</strong><br />
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              {/* Haftung */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">Haftungshinweise</h2>

                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Haftung für Inhalte</h3>
                    <p className="leading-relaxed">
                      Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                      nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                      Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                      Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                      Tätigkeit hinweisen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Haftung für Links</h3>
                    <p className="leading-relaxed">
                      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                      Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                      Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                      Seiten verantwortlich.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Urheberrecht</h3>
                    <p className="leading-relaxed">
                      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                      dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                      der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                      Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/datenschutz"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors text-sm font-medium shadow-sm"
            >
              <Shield className="w-4 h-4" />
              Datenschutzerklärung
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm"
            >
              <Mail className="w-4 h-4" />
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
