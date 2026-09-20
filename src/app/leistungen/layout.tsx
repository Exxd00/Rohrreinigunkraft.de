import { pageMetadata } from "@/lib/page-seo";
export const metadata = pageMetadata(
  "/leistungen",
  "Leistungen | Rohrreinigung Kraft Nürnberg & 30 km",
  "Rohrreinigung, Kanalservice, Inspektion und Sanierung: Finden Sie die passende Leistung für Ihr Objekt in Nürnberg und 30 km Umgebung.",
);
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
