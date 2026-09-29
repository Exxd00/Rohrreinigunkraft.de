import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import TrackingInit from "@/components/layout/TrackingInit";
import ConsentBanner from "@/components/layout/ConsentBanner";
import { company } from "@/data/company";

const GA_MEASUREMENT_ID = "G-SFZFMCJXG2";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rohrreinigung-kraft.de"),
  title: company.seo.defaultTitle,
  description: company.seo.defaultDescription,
  keywords: company.seo.keywords.join(", "),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: company.seo.defaultTitle,
    description: company.seo.defaultDescription,
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Rb-1R7PT7LPYi2K7kWjNX0b-FQALvyLymxsy62dN1jk",
  },
};

// Script to prevent theme flash - DEFAULT TO LIGHT MODE
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        if (!theme) {
          localStorage.setItem('theme', 'light');
        }
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3AB0FF" />
        {/* Schema.org LocalBusiness Structured Data - Basic info only, detailed schema in page.tsx */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://rohrreinigung-kraft.de/#organization",
              name: "Rohrreinigung Kraft",
              description:
                "Rohrreinigung & Kanalreinigung in Nürnberg und Umgebung. 24/7 Notdienstaufnahme.",
              url: "https://rohrreinigung-kraft.de",
              logo: "https://rohrreinigung-kraft.de/logo.png",
              telephone: "+4991189218682",
              email: "Info@Rohrreinigung-kraft.de",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ehemannstr. 9",
                addressLocality: "Nürnberg",
                addressRegion: "Bayern",
                postalCode: "90478",
                addressCountry: "DE",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              taxID: "DE362340841",
              legalName: "Rohrreinigung Kraft",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {/* Consent Mode v2 defaults before Google tags load. */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            var consentChoice = null;
            try { consentChoice = localStorage.getItem('rk_nuernberg_consent'); } catch (e) {}
            var consentValue = consentChoice === 'accepted' ? 'granted' : 'denied';
            gtag('consent', 'default', {
              analytics_storage: consentValue,
              ad_storage: consentValue,
              ad_user_data: consentValue,
              ad_personalization: consentValue,
              wait_for_update: 500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {/* Initialize GCLID and UTM tracking */}
        <TrackingInit />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
        <ConsentBanner />
      </body>
    </html>
  );
}
