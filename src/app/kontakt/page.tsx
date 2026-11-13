import TrackedPhoneLink from "@/components/ui/tracked-phone-link";
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
              Unser Notdienst ist telefonisch rund um die Uhr erreichbar. Über das Formular können Sie einen Rückruf anfragen.
            </p>
            <a href="#kontakt" className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-primary px-6 py-3 font-semibold text-white">Direkt zur Anfrage</a>
          </div>
        </div>
      </section>
      <VideoShowcase />

      {/* Contact Form Component */}
      <ContactForm />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Besuchen Sie uns in Nürnberg</h2>
          <address className="not-italic text-gray-700 dark:text-gray-200">
            {company.name}<br />
            {company.address.street}, {company.address.zip} {company.address.city}
          </address>
          <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-300">
            Wir empfangen Kunden in Nürnberg-Glockenhof und kommen für Einsätze zu Ihnen.
            Für einen Besuch erreichen Sie uns zur Terminabsprache unter{" "}
            <TrackedPhoneLink source="kontakt_intro" className="underline" href={`tel:${company.contact.phone}`}>{company.contact.phoneDisplay}</TrackedPhoneLink>.
          </p>
          <a className="mt-4 inline-block font-semibold text-primary underline" href={company.googleReviewsUrl}>
            Standort auf Google Maps öffnen
          </a>
        </div>
      </section>
    </>
  );
}
