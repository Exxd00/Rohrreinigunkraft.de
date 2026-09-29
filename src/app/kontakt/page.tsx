import VideoShowcase from "@/components/home/VideoShowcase";
import { Metadata } from "next";
import ContactForm from "@/components/home/ContactForm";
import { company } from "@/data/company";

export const metadata: Metadata = {
  alternates: { canonical: "https://rohrreinigung-kraft.de/kontakt" },
  title: "Kontakt | Rohrreinigung Kraft - 24/7 Notdienst",
  description: `Kontaktieren Sie Rohrreinigung Kraft für professionelle Rohrreinigung in Nürnberg. 24/7 Notdienst: ${company.contact.phoneDisplay}`,
};

export default function KontaktPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-[#F8FBFF] via-white to-[#E8F4FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-gradient">Ihr direkter Kontakt zur Rohrreinigung Kraft</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Akute Verstopfung oder geplanter Termin? Schildern Sie uns Ihr Anliegen.
              Telefonisch erreichen Sie uns rund um die Uhr; per Formular können Sie einen Rückruf anfragen.
            </p>
            <a href="#kontakt" className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white">Direkt zur Anfrage</a>
          </div>
        </div>
      </section>
      <VideoShowcase />

      {/* Contact Form Component */}
      <ContactForm />

      {/* Map Placeholder */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Unser Einsatzgebiet
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Großraum Nürnberg & Umgebung
                </p>
                <p className="text-sm text-gray-400">
                  Nürnberg und Umgebung
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
