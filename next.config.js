/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      { protocol: "https", hostname: "source.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "ext.same-assets.com", pathname: "/**" },
      { protocol: "https", hostname: "ugc.same-assets.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "rohrreinigungkraft.de" }],
        destination: "https://rohrreinigung-kraft.de/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rohrreinigungkraft.de" }],
        destination: "https://rohrreinigung-kraft.de/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rohrreinigung-kraft.de" }],
        destination: "https://rohrreinigung-kraft.de/:path*",
        permanent: true,
      },
      ...require("./src/data/municipalities.json").filter(city => !city.isCity).flatMap(city =>
        ["rohrreinigung", "kanalreinigung", "abflussreinigung", "rohrreinigung-notdienst"].map(service => ({ source: `/${city.slug}/${service}`, destination: `/${city.slug}`, permanent: true }))
      ),
      { source: "/datenschutzerklaerung", destination: "/datenschutz", permanent: true },
      { source: "/privacy-policy", destination: "/datenschutz", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      { source: "/service", destination: "/leistungen", statusCode: 301 },
      { source: "/rohrreinigung", destination: "/service/rohrreinigung", permanent: true },
      { source: "/kanalreinigung", destination: "/service/kanalreinigung", permanent: true },
      { source: "/notdienst", destination: "/service/rohrreinigung-notdienst", permanent: true },
      { source: "/24-stunden-notdienst", destination: "/service/rohrreinigung-notdienst", permanent: true },
      { source: "/toilette-verstopft", destination: "/service/toilette-verstopft", permanent: true },
      { source: "/abflussreinigung", destination: "/service/abflussreinigung", permanent: true },
      { source: "/kamera-inspektion", destination: "/service/kamera-inspektion", permanent: true },
      { source: "/services", destination: "/leistungen", permanent: true },
      { source: "/pricing", destination: "/preise", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/ueber-uns", destination: "/#about", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/wp-includes/:path*", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
