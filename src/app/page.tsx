import type { Metadata } from "next";
import { serviceAreaSchema } from "@/data/service-area";
import ServiceAreaSummary from "@/components/home/ServiceAreaSummary";
import HeroSection from "@/components/home/HeroSection";
import ProblemProcess from "@/components/home/ProblemProcess";
import PricingPreview from "@/components/home/PricingPreview";
import TrustSection from "@/components/home/TrustSection";
import ContactForm from "@/components/home/ContactForm";
import HowItWorks from "@/components/home/HowItWorks";
import WhyUs from "@/components/home/WhyUs";
import AboutUs from "@/components/home/AboutUs";
import Testimonials from "@/components/home/Testimonials";
import VideoShowcase from "@/components/home/VideoShowcase";
import Gallery from "@/components/home/Gallery";
import CTASection from "@/components/home/CTASection";
import EmergencyGuide from "@/components/home/EmergencyGuide";
import { company, testimonials } from "@/data/company";

export const metadata: Metadata = { alternates: { canonical: "https://rohrreinigung-kraft.de/" } };

// JSON-LD Schema for Local SEO - Optimized for Mittelfranken
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": "https://rohrreinigung-kraft.de/#organization",
  name: company.name,
  alternateName: "Rohrreinigung Kraft Nürnberg",
  description: company.seo.defaultDescription,
  url: "https://rohrreinigung-kraft.de",
  logo: "https://rohrreinigung-kraft.de/logo.png",
  image: [
    "https://rohrreinigung-kraft.de/og-image.jpg",
    "https://rohrreinigung-kraft.de/logo.png"
  ],
  telephone: company.contact.phone,
  email: company.contact.email,

  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    postalCode: company.address.zip,
    addressRegion: company.address.region,
    addressCountry: "DE",
  },

  areaServed: serviceAreaSchema,

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    }
  ],

  // ⭐ Bewertungen - EINZIGE aggregateRating für diese Entität
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: String(company.rating.reviewCount),
    reviewCount: String(company.rating.reviewCount)
  },

  // Einzelne Reviews - OHNE itemReviewed (da bereits in LocalBusiness)
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Thomas M."
      },
      datePublished: "2024-11-15",
      reviewBody: "Schnelle Hilfe am Sonntagmorgen! Die Toilette war komplett verstopft und innerhalb von 45 Minuten war das Team vor Ort. Sehr professionell und faire Preise.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1"
      }
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Sandra K."
      },
      datePublished: "2024-10-22",
      reviewBody: "Nach einem Rohrbruch im Keller waren sie blitzschnell da. Die Mitarbeiter waren freundlich, kompetent und haben alles sauber hinterlassen. Klare Empfehlung!",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1"
      }
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Michael B."
      },
      datePublished: "2024-09-18",
      reviewBody: "Unser Küchenabfluss war seit Wochen problematisch. Die Rohrreinigung Kraft hat das Problem schnell gefunden und nachhaltig beseitigt. Top Service!",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1"
      }
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Anna W."
      },
      datePublished: "2024-08-05",
      reviewBody: "Super Service! Abfluss in der Dusche war komplett zu. Techniker kam nach 35 Minuten und hatte das Problem in 20 Minuten gelöst. Sehr zu empfehlen!",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1"
      }
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Peter H."
      },
      datePublished: "2024-07-12",
      reviewBody: "Als Hausverwalter arbeite ich seit 2 Jahren mit Rohrreinigung Kraft zusammen. Immer zuverlässig, faire Preise und die Dokumentation ist top. Klare Empfehlung für Hausverwaltungen!",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1"
      }
    }
  ],

  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card, EC-Karte, Rechnung",

  knowsLanguage: ["de", "en"],

  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: company.contact.phone,
      contactType: "customer service",
      areaServed: "DE",
      availableLanguage: ["German", "English"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
      }
    },
    {
      "@type": "ContactPoint",
      telephone: company.contact.phone,
      contactType: "emergency",
      areaServed: "DE",
      availableLanguage: ["German", "English"]
    }
  ],

  sameAs: [
    "https://g.page/rohrreinigung-kraft",
    "https://www.gelbeseiten.de/gsbiz/57c4739e-9c15-49d8-9a90-eca1cb4fdc82"
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Rohrreinigung Dienstleistungen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rohrreinigung",
          description: "Professionelle Beseitigung von Rohrverstopfungen aller Art",
          url: "https://rohrreinigung-kraft.de/service/rohrreinigung"
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          minPrice: "89"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kanalreinigung",
          description: "Komplette Reinigung von Kanalsystemen mit Hochdruck-Spültechnik",
          url: "https://rohrreinigung-kraft.de/service/kanalreinigung"
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          minPrice: "149"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Toilette verstopft",
          description: "Schnelle Soforthilfe bei verstopfter Toilette",
          url: "https://rohrreinigung-kraft.de/service/toilette-verstopft"
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          minPrice: "79"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Notdienst 24/7",
          description: "Rund um die Uhr erreichbar für Notfälle - auch nachts und am Wochenende",
          url: "https://rohrreinigung-kraft.de/service/rohrreinigung-notdienst"
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          minPrice: "99"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "TV-Kamerainspektion",
          description: "Professionelle Rohrinspektion mit HD-Kamera",
          url: "https://rohrreinigung-kraft.de/service/kamera-inspektion"
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          minPrice: "129"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Abflussreinigung",
          description: "Reinigung von Abflüssen in Küche, Bad und Dusche",
          url: "https://rohrreinigung-kraft.de/service/abflussreinigung"
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          minPrice: "69"
        }
      }
    ],
  },

  slogan: "Rohrreinigung für Nürnberg und 30 km Umgebung - 24/7 Notdienstaufnahme",

  foundingDate: "2014",

  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: "2",
    maxValue: "5"
  },

  isPartOf: {
    "@type": "AdministrativeArea",
    name: "Mittelfranken",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Bayern",
      containedInPlace: {
        "@type": "Country",
        name: "Deutschland"
      }
    }
  }
};

// FAQ Schema - للظهور في Google مع الأسئلة والأجوبة
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet eine Rohrreinigung in Nürnberg?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Kosten hängen vom Umfang der Verstopfung ab. Wir bieten eine kostenlose Diagnose vor Ort und nennen Ihnen dann einen Festpreis – ohne versteckte Kosten. Einfache Verstopfungen starten ab 79€, Rohrreinigung ab 89€, Kanalreinigung ab 149€."
      }
    },
    {
      "@type": "Question",
      name: "Wie schnell können Sie bei einer Rohrverstopfung da sein?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Nürnberg, Fürth und Erlangen sind wir meist innerhalb von 30-60 Minuten bei Ihnen. In Nürnberg selbst oft noch schneller. Unser 24/7 Notdienst ist rund um die Uhr verfügbar."
      }
    },
    {
      "@type": "Question",
      name: "Arbeiten Sie auch am Wochenende und nachts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, unser 24/7 Notdienst ist rund um die Uhr verfügbar – auch nachts, am Wochenende und an Feiertagen. Bei Notfällen sind wir immer für Sie da."
      }
    },
    {
      "@type": "Question",
      name: "Muss ich im Voraus bezahlen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Wir stellen erst nach erfolgreicher Arbeit eine Rechnung. Sie können bar, mit Karte oder auf Rechnung bezahlen. Wir nennen Ihnen immer einen Festpreis vor Arbeitsbeginn."
      }
    },
    {
      "@type": "Question",
      name: "Was soll ich tun, bis Sie bei mir ankommen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drehen Sie wenn möglich den Hauptwasserhahn ab und vermeiden Sie weitere Wassernutzung. Legen Sie Handtücher aus, um Wasserschäden zu minimieren. Wir sind meist in 30-60 Minuten bei Ihnen."
      }
    },
    {
      "@type": "Question",
      name: "Bieten Sie Wartungsverträge für Hausverwaltungen an?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, besonders für Hausverwaltungen und Gewerbebetriebe bieten wir regelmäßige Wartungsverträge mit Prioritäts-Service an. Inklusive Dokumentation, Sammelrechnung und persönlichem Ansprechpartner."
      }
    },
    {
      "@type": "Question",
      name: "In welchen Städten bieten Sie Rohrreinigung an?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unser Einsatzgebiet umfasst Nürnberg und Umgebung im Radius von 30 km Luftlinie ab Nürnberg Hauptbahnhof. Für Ortsteile und Adressen am Rand bestätigen wir die Abdeckung vor dem Einsatz."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      {/* Main Business Schema with Reviews - Single unified schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* FAQ Schema - For Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero Section (the hero only) */}
      <HeroSection />

      {/* 2. Video Showcase - directly after the hero */}
      <VideoShowcase />

      {/* 3. Problem Selection + How We Work (moved out of the hero) */}
      <ProblemProcess />

      {/* 4. Pricing Preview - Important for Google Ads */}
      <PricingPreview />

      {/* 4. Trust Section */}
      <TrustSection />

      {/* 5. Contact Form */}
      <ContactForm />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Why Us */}
      <WhyUs />

      {/* 8. Emergency Guide - Educational Content */}
      <EmergencyGuide />

      {/* 9. About Us */}
      <AboutUs />

      {/* 10. Testimonials */}
      <Testimonials />

      {/* 11. Gallery */}
      <Gallery />

      {/* 12. CTA Section */}
      <ServiceAreaSummary />
      <CTASection />
    </>
  );
}
