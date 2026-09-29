import { company } from "../data/company";

/** Only an explicitly configured starting price may be displayed or marked up. */
export function getServicePrice(slug: string): number | undefined {
  const prices: Record<string, number> = {
    rohrreinigung: company.pricing.services.rohrreinigung.from,
    kanalreinigung: company.pricing.services.kanalreinigung.from,
    abflussreinigung: company.pricing.services.abflussreinigung.from,
    "toilette-verstopft": company.pricing.services.toiletteVerstopft.from,
    "rohrreinigung-notdienst": company.pricing.services.notdienst.from,
    "kamera-inspektion": company.pricing.services.kameraInspektion.from,
    dichtheitspruefung: company.pricing.services.dichtheitspruefung.from,
    rohrsanierung: company.pricing.services.rohrsanierung.from,
    "rohrreinigung-wartung": company.pricing.services.wartungsvertrag.from,
  };
  return prices[slug];
}
