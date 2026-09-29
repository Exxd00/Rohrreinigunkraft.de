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

  slogan: "Rohrreinigung für Nürnberg und Umgebung - 24/7 Notdienstaufnahme",

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

export default function Home() {
  return (
    <>
      {/* Main Business Schema with Reviews - Single unified schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
