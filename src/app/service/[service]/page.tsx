import { getLocalService } from "@/data/local-services";
import WorkVideo from "@/components/city/WorkVideo";
import { getCityServiceBrief } from "@/data/city-service-notes";
import { serviceAreaSchema } from "@/data/service-area";
import { pageMetadata } from "@/lib/page-seo";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  AlertTriangle,
  XCircle,
  Lightbulb,
  HelpCircle,
  ChevronDown,
  Shield,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, getServiceBySlug, getAllServiceSlugs, getServicesByCategory } from "@/data/services";
import { cities, getNearbyCities } from "@/data/cities";
import { company } from "@/data/company";
import { getEnhancedServiceContent } from "@/data/serviceContent";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    service: slug,
  }));
}

function getServicePrice(slug: string): number {
  const priceMap: Record<string, number> = {
    "rohrreinigung": company.pricing.services.rohrreinigung.from,
    "kanalreinigung": company.pricing.services.kanalreinigung.from,
    "abflussreinigung": company.pricing.services.abflussreinigung.from,
    "toilette-verstopft": company.pricing.services.toiletteVerstopft.from,
    "rohrreinigung-notdienst": company.pricing.services.notdienst.from,
    "kamera-inspektion": company.pricing.services.kameraInspektion.from,
    "dichtheitspruefung": company.pricing.services.dichtheitspruefung.from,
    "rohrsanierung": company.pricing.services.rohrsanierung.from,
    "rohrreinigung-wartung": company.pricing.services.wartungsvertrag.from,
  };
  return priceMap[slug] || company.pricing.services.rohrreinigung.from;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const enhancedContent = getEnhancedServiceContent(serviceSlug);

  if (!service) {
    return {
      title: "Leistung nicht gefunden",
    };
  }

  const price = getServicePrice(serviceSlug);

  return pageMetadata(`/service/${service.slug}`, `${service.name} | Nürnberg & 30 km | Rohrreinigung Kraft`, `${service.shortDescription}. Ablauf und Vorbereitung für Nürnberg und das Umland im 30-km-Radius. Preis vor Arbeitsbeginn abstimmen.`);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const enhancedContent = getEnhancedServiceContent(serviceSlug);

  if (!service) {
    notFound();
  }

  const price = getServicePrice(serviceSlug);

  const relatedServices = getServicesByCategory(service.category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 4);

  const mainCities = cities.filter(city => city.isCity);
  const localDetail = getLocalService(serviceSlug);

  // Schema.org markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://rohrreinigung-kraft.de/service/${service.slug}`,
    name: service.name,
    description: service.longDescription,
    url: `https://rohrreinigung-kraft.de/service/${service.slug}`,
    provider: {
      "@type": "Plumber",
      "@id": "https://rohrreinigung-kraft.de/#organization",
      name: company.name,
      telephone: company.contact.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ehemannstr. 9",
        addressLocality: "Nürnberg",
        postalCode: "90478",
        addressRegion: "Bayern",
        addressCountry: "DE"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        worstRating: "1",
        ratingCount: String(company.rating.reviewCount)
      }
    },
    areaServed: serviceAreaSchema,
    serviceType: service.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        minPrice: price,
      },
    },
    termsOfService: "Festpreis nach kostenloser Diagnose vor Ort",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    }
  };

  // FAQ Schema if enhanced content exists
  const faqSchema = enhancedContent ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": enhancedContent.faq.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-white/50 mb-4">
              <Link href="/" className="hover:text-primary">Startseite</Link>
              <span>/</span>
              <Link href="/leistungen" className="hover:text-primary">Leistungen</Link>
              <span>/</span>
              <span className="text-white/70">{service.name}</span>
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-300">
                24/7 Notdienst verfügbar
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {enhancedContent?.heroHeadline || `${service.name}?`}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6 max-w-xl mx-auto">
              {enhancedContent?.heroSubheadline || "Nürnberg und 30 km Umgebung – Umfang und Anfahrt vorab klären"}
            </p>

            {/* Trust Points */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium">Diagnose kostenlos</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Festpreis vor Arbeit</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">Ankunft am Telefon klären</span>
              </div>
            </div>

            {/* Price badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl mb-8">
              <span className="text-white/70">Ab</span>
              <span className="text-3xl font-black text-white">{price}€</span>
              <span className="text-white/70">• Festpreis nach Diagnose</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Link href={`tel:${company.contact.phone}`} className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold shadow-lg shadow-primary/30"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {company.contact.phoneDisplay}
                </Button>
              </Link>
              <Link href="/kontakt" className="flex-1">
                <button
                  className="w-full h-14 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center"
                >
                  Rückruf anfordern
                </button>
              </Link>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white/90 font-medium">{company.rating.displayText}</span>
              <span className="text-white/60">({company.rating.reviewCount} Bewertungen)</span>
            </div>
          </div>
        </div>
      </section>

      {localDetail && <section className="bg-white py-12 dark:bg-slate-950"><div className="container mx-auto max-w-5xl px-4"><p className="text-sm font-semibold text-sky-700 dark:text-sky-300">{localDetail.label}</p><h2 className="mt-3 text-2xl font-bold">Was umfasst {service.name}?</h2><p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{localDetail.intro}</p><div className="mt-7 grid gap-5 md:grid-cols-3">{[{ title: "Vorbereitung", text: localDetail.preparation }, { title: "Verfahren nach Befund", text: localDetail.method }, { title: "Ergebnis und nächste Schritte", text: localDetail.result }].map(item => <article key={item.title} className="rounded-xl bg-slate-50 p-6 dark:bg-slate-900"><h3 className="font-bold">{item.title}</h3><p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{item.text}</p></article>)}</div><p className="mt-5 rounded-xl bg-sky-50 p-5 text-sm leading-relaxed text-slate-700 dark:bg-sky-950/30 dark:text-slate-300">{localDetail.stop}</p></div></section>}

      {/* Enhanced Content Sections - Only if available */}
      {enhancedContent && (
        <>
          {/* Consequences Section */}
          <section className="py-12 bg-red-50 dark:bg-red-950/20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {enhancedContent.consequences.title}
                  </h2>
                </div>

                <ul className="space-y-3 mb-6">
                  {enhancedContent.consequences.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-red-100 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-800">
                  <p className="font-semibold text-red-800 dark:text-red-300">
                    {enhancedContent.consequences.urgentWarning}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* When Serious Section */}
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {enhancedContent.whenSerious.title}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Warnsignale
                    </h3>
                    <ul className="space-y-2">
                      {enhancedContent.whenSerious.signs.map((sign, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-amber-500">•</span>
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                    <h3 className="font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Sofort anrufen bei:
                    </h3>
                    <ul className="space-y-2">
                      {enhancedContent.whenSerious.callImmediately.map((item, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-red-500 font-bold">!</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Causes Section */}
          <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {enhancedContent.causes.title}
                </h2>

                <div className="space-y-4">
                  {enhancedContent.causes.common.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{item.cause}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span className="text-primary font-medium">Lösung:</span> {item.solution}
                          </p>
                        </div>
                        <Wrench className="w-5 h-5 text-gray-400 shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* DIY Tips Section */}
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {enhancedContent.diyTips.title}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6">
                    <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-4">
                      Das können Sie versuchen:
                    </h3>
                    <ul className="space-y-2">
                      {enhancedContent.diyTips.canTry.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                    <h3 className="font-semibold text-red-800 dark:text-red-300 mb-4">
                      Das sollten Sie NICHT tun:
                    </h3>
                    <ul className="space-y-2">
                      {enhancedContent.diyTips.dontDo.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-xl p-4 text-center">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="text-primary">{enhancedContent.diyTips.callWhen}</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  {enhancedContent.process.title}
                </h2>

                <div className="relative">
                  {/* Connection line */}
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-primary/20 hidden md:block" />

                  <div className="space-y-6">
                    {enhancedContent.process.steps.map((step) => (
                      <div key={step.step} className="flex gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 text-white font-bold relative z-10">
                          {step.step}
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Häufige Fragen zu {service.name}
                  </h2>
                </div>

                <div className="space-y-4">
                  {enhancedContent.faq.map((faq, index) => (
                    <details
                      key={index}
                      className="group bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors list-none">
                        <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h3>
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                      </summary>
                      <div className="px-5 pb-5 pt-2">
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Service Info - For services without enhanced content */}
      {!enhancedContent && (
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {service.name} – Unser Service
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {service.longDescription}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {service.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cities */}
      <WorkVideo serviceSlug={service.slug} />
      <section className="py-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 text-center mb-4">{service.name} in Ihrer Stadt</p>
            <div className="flex flex-wrap justify-center gap-2">
              {mainCities.map((city) => (
                <Link
                  key={city.slug}
                  href={getCityServiceBrief(city.slug, service.slug) ? `/${city.slug}/${service.slug}` : `/${city.slug}`}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:border-primary border border-gray-200 dark:border-gray-700 transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <p className="text-sm text-gray-500 text-center mb-4">Weitere Leistungen</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/service/${s.slug}`}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all text-center"
                >
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{s.name}</p>
                  <p className="text-primary font-bold text-sm">ab {getServicePrice(s.slug)}€</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {enhancedContent?.heroHeadline || `${service.name}?`}
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Kostenlose Diagnose • Festpreis vor Arbeit • Kein Start ohne Ihr OK
          </p>
          <Link href={`tel:${company.contact.phone}`}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 shadow-lg shadow-primary/30">
              <Phone className="w-5 h-5 mr-2" />
              Jetzt anrufen: {company.contact.phoneDisplay}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
