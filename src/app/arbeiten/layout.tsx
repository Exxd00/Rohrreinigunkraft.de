import { pageMetadata } from "@/lib/page-seo";
export const metadata = pageMetadata(
  "/arbeiten",
  "Unsere Arbeiten | Rohrreinigung Kraft",
  "Einblicke in die Arbeiten von Rohrreinigung Kraft. Rohr- und Kanalservice für Nürnberg und das nahe Umland.",
);
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
