import { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { Shield, Lock, Eye, Server, FileText, Mail, Scale, Database, UserCheck, Cookie, Phone, Building2 } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://rohrreinigung-kraft.de/datenschutz" },
  title: "Datenschutz | Rohrreinigung Kraft",
  description: "Datenschutzerklärung von Rohrreinigung Kraft. Erfahren Sie, wie wir Ihre Daten schützen.",
};

interface PrivacySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  content: React.ReactNode;
}

export default function DatenschutzPage() {
  const sections: PrivacySection[] = [
    {
      id: "overview",
      title: "Datenschutz auf einen Blick",
      icon: <Eye className="w-5 h-5" />,
      iconBg: "bg-primary/10 text-primary",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
              Wer ist verantwortlich?
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
              Kontaktdaten finden Sie im Impressum.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
              Wie erfassen wir Ihre Daten?
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ihre Daten werden erhoben, wenn Sie uns diese mitteilen (z.B. Kontaktformular)
              oder automatisch durch technische Systeme beim Websitebesuch.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "hosting",
      title: "Hosting",
      icon: <Server className="w-5 h-5" />,
      iconBg: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
      content: (
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Diese Website wird bei Netlify gehostet.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              <strong className="text-gray-900 dark:text-white">Netlify Inc.</strong><br />
              44 Montgomery Street, Suite 300<br />
              San Francisco, California 94104, USA
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "responsible",
      title: "Verantwortliche Stelle",
      icon: <Building2 className="w-5 h-5" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
      content: (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            <strong className="text-gray-900 dark:text-white">{company.name}</strong><br />
            Inhaber: {company.legal.inhaber}<br />
            {company.address.street}<br />
            {company.address.zip} {company.address.city}<br />
            {company.address.region}, {company.address.country}<br /><br />
            <span className="inline-flex items-center gap-1">
              <Phone className="w-3 h-3" /> {company.contact.phoneDisplay}
            </span><br />
            <span className="inline-flex items-center gap-1">
              <Mail className="w-3 h-3" /> {company.contact.email}
            </span>
          </p>
        </div>
      ),
    },
    {
      id: "data-collection",
      title: "Datenerfassung auf dieser Website",
      icon: <Database className="w-5 h-5" />,
      iconBg: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
              Kontaktformular
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
              inklusive der Kontaktdaten zwecks Bearbeitung bei uns gespeichert.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
              Anfrage per E-Mail oder Telefon
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Bei Kontakt per E-Mail oder Telefon wird Ihre Anfrage inklusive aller
              personenbezogenen Daten zum Zwecke der Bearbeitung gespeichert und verarbeitet.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "rights",
      title: "Ihre Rechte",
      icon: <UserCheck className="w-5 h-5" />,
      iconBg: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
      content: (
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Sie haben jederzeit folgende Rechte bezüglich Ihrer personenbezogenen Daten:
          </p>
          <ul className="space-y-2">
            {[
              "Auskunft über Herkunft, Empfänger und Zweck Ihrer Daten",
              "Berichtigung unrichtiger Daten",
              "Löschung Ihrer Daten",
              "Widerruf erteilter Einwilligungen",
              "Einschränkung der Verarbeitung",
              "Datenübertragbarkeit",
            ].map((right, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {right}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "ssl",
      title: "SSL/TLS-Verschlüsselung",
      icon: <Lock className="w-5 h-5" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
      content: (
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
            Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
            von „http://" auf „https://" wechselt.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Diese Website ist SSL-verschlüsselt
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "analytics",
      title: "Analyse-Tools und Tracking",
      icon: <Cookie className="w-5 h-5" />,
      iconBg: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      content: (
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Diese Website kann Analyse-Tools verwenden, um das Nutzerverhalten zu analysieren.
            Details zu den verwendeten Tools und Ihren Opt-out-Möglichkeiten werden bei Bedarf ergänzt.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Wir nutzen möglicherweise Google Analytics zur Websiteanalyse.
            Sie können die Erfassung durch Google Analytics verhindern, indem Sie
            das Browser-Add-on zur Deaktivierung installieren.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              DSGVO-konform
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Informationen zum Schutz Ihrer personenbezogenen Daten
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">SSL-gesichert</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-700 dark:text-gray-300">DSGVO-konform</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <FileText className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Transparent</span>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${section.iconBg} flex items-center justify-center flex-shrink-0`}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="text-xs font-normal text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                          §{index + 1}
                        </span>
                        {section.title}
                      </h2>
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stand: April 2026
            </p>
          </div>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/impressum"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors text-sm font-medium shadow-sm"
            >
              <Scale className="w-4 h-4" />
              Impressum
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
  );
}
