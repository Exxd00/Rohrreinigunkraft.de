import { pageMetadata } from "@/lib/page-seo";
export const metadata = pageMetadata(
  "/leistungen",
  "Leistungen | Rohrreinigung Kraft Nürnberg und Umgebung",
  "Rohrreinigung, Kanalservice, Inspektion und Sanierung: Finden Sie die passende Leistung für Ihr Objekt in Nürnberg und Umgebung.",
);
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
