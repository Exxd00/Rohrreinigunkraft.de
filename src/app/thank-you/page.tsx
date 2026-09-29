"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Phone,
  Home,
  Clock,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { trackThankYouPage, trackPhoneClick } from "@/lib/tracking";

export default function ThankYouPage() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check if user came from form submission
    const formSubmitted = sessionStorage.getItem("form_submitted");

    if (formSubmitted === "true") {
      setIsValid(true);
      const eventId =
        sessionStorage.getItem("kraft_form_event_id") || undefined;
      if (sessionStorage.getItem("kraft_thank_you_tracked") !== eventId) {
        trackThankYouPage(eventId);
        sessionStorage.setItem("kraft_thank_you_tracked", eventId || "tracked");
      }
      // Clear the flag after successful access
      sessionStorage.removeItem("form_submitted");
      sessionStorage.removeItem("kraft_form_event_id");
    } else {
      // Redirect to home if accessed directly
      router.replace("/");
    }
  }, [router]);

  const handlePhoneClick = () => {
    trackPhoneClick("thank_you_page");
  };

  // Don't render anything while checking or if invalid
  if (!isValid) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F4FF] to-[#F8FBFF] dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F4FF] to-[#F8FBFF] dark:from-gray-900 dark:to-gray-800 px-4 py-8 md:py-16">
      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="gradient-primary p-6 text-center text-white">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center animate-bounce-once">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Anfrage erfolgreich!
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              Wir haben Ihre Nachricht erhalten
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* What happens next */}
            <div className="mb-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Was passiert jetzt?
              </h2>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      Wir melden uns zu Ihrer Anfrage
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Unser Team meldet sich schnellstmöglich bei Ihnen
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      Kostenlose Beratung
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Wir besprechen Ihr Problem und die beste Lösung
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      Schnelle Hilfe vor Ort
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Ankunft telefonisch klären – Preis vor Arbeitsbeginn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgent Call Box */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    Dringender Notfall?
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Rufen Sie uns direkt an für sofortige Hilfe
                  </p>
                  <a
                    href={`tel:${company.contact.phone}`}
                    onClick={handlePhoneClick}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {company.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-gray-800 my-6" />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="flex-1">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Zur Startseite
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Link
                  href="/leistungen"
                  className="flex items-center justify-center gap-2"
                >
                  Unsere Leistungen
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          {company.name} &middot; 24/7 Notdienst in Mittelfranken
        </p>
      </div>
    </main>
  );
}
