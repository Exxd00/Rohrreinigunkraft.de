import { assessmentPricingText, declinedCleaningText } from "./assessment-pricing";

/**
 * نظام الضمانات الثلاثي - Rohrreinigung Kraft
 * قبل العمل | أثناء العمل | بعد العمل
 */

export interface Guarantee {
  id: string;
  phase: "before" | "during" | "after";
  name: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;

  // للعرض
  badge?: string;
  color: "emerald" | "blue" | "amber" | "primary";

  // الربط
  linkedPackages: string[];
  linkedServices: string[];
  linkedPages: string[];

  // للإعلانات
  adCopy: {
    short: string; // للعناوين
    medium: string; // للوصف
  };
}

// ============================================
// الضمانات قبل العمل - BEVOR wir anfangen
// ============================================
export const guaranteesBefore: Guarantee[] = [
  {
    id: "diagnose-kostenlos",
    phase: "before",
    name: "Kostenlose Ersteinschätzung",
    headline: "Kostenlose Ersteinschätzung vor Ort",
    shortDescription: "Die Ersteinschätzung selbst ist kostenlos.",
    fullDescription: assessmentPricingText,
    icon: "Search",
    badge: "Garantiert",
    color: "emerald",
    linkedPackages: ["notfall", "standard", "komplett", "wiederkehrend", "diagnose"],
    linkedServices: ["rohrreinigung", "kanalreinigung", "abflussreinigung", "toilette-verstopft"],
    linkedPages: ["/preise", "/", "/kontakt"],
    adCopy: {
      short: "Kostenlose Ersteinschätzung",
      medium: "Die erste Einschätzung vor Ort ist kostenlos"
    }
  },
  {
    id: "festpreis-vorab",
    phase: "before",
    name: "Festpreis vor Arbeitsbeginn",
    headline: "Festpreis BEVOR wir anfangen",
    shortDescription: "Sie wissen den Preis, bevor wir mit der Arbeit beginnen.",
    fullDescription: "Nach der Diagnose nennen wir Ihnen einen konkreten Festpreis. Nicht 'ab' oder 'ca.' – sondern den EXAKTEN Preis. Erst wenn Sie zustimmen, fangen wir an.",
    icon: "Euro",
    badge: "Schwarz auf Weiß",
    color: "primary",
    linkedPackages: ["notfall", "standard", "komplett", "wiederkehrend", "diagnose"],
    linkedServices: ["rohrreinigung", "kanalreinigung", "abflussreinigung", "toilette-verstopft"],
    linkedPages: ["/preise", "/", "/kontakt"],
    adCopy: {
      short: "Festpreis vorab",
      medium: "Preis vor Arbeitsbeginn – keine Überraschungen"
    }
  },
  {
    id: "keine-versteckten-kosten",
    phase: "before",
    name: "Keine versteckten Kosten",
    headline: "Keine versteckten Kosten",
    shortDescription: "Der Festpreis ist der Endpreis. Punkt.",
    fullDescription: "Keine Materialzuschläge, keine 'das war nicht im Angebot', keine Nachforderungen. Der Preis, den wir nennen, ist der Preis, den Sie zahlen.",
    icon: "Shield",
    color: "emerald",
    linkedPackages: ["notfall", "standard", "komplett", "wiederkehrend"],
    linkedServices: ["rohrreinigung", "kanalreinigung", "abflussreinigung"],
    linkedPages: ["/preise", "/"],
    adCopy: {
      short: "Keine versteckten Kosten",
      medium: "Festpreis = Endpreis. Keine Nachforderungen."
    }
  },
  {
    id: "kein-start-ohne-ok",
    phase: "before",
    name: "Kein Start ohne Ihr OK",
    headline: "Wir starten erst mit Ihrer Zustimmung",
    shortDescription: "Sie entscheiden – nicht wir.",
    fullDescription: `Wir beginnen mit der Reinigung, wenn Sie dem Preis zugestimmt haben. ${declinedCleaningText}`,
    icon: "CheckCircle",
    color: "blue",
    linkedPackages: ["notfall", "standard", "komplett", "wiederkehrend", "diagnose"],
    linkedServices: ["rohrreinigung", "kanalreinigung", "abflussreinigung"],
    linkedPages: ["/preise", "/"],
    adCopy: {
      short: "Ihr OK zählt",
      medium: "Kein Start ohne Ihre Zustimmung zum Preis"
    }
  },
  {
    id: "notdienst-zuschlag-vorab",
    phase: "before",
    name: "Notdienst-Zuschlag vorab",
    headline: "Notdienst-Zuschlag? Sagen wir AM TELEFON",
    shortDescription: "Nachts oder am Wochenende? Der Zuschlag wird VOR der Anfahrt genannt.",
    fullDescription: "Wenn Sie nachts (22-6 Uhr) oder am Wochenende anrufen, nennen wir Ihnen den Zuschlag BEVOR wir losfahren. Nicht erst vor Ort. Abend (18-22 Uhr): +20€, Nacht: +40€, Wochenende: +30€.",
    icon: "Moon",
    color: "amber",
    linkedPackages: ["notfall"],
    linkedServices: ["rohrreinigung-notdienst", "notdienst-nacht", "notdienst-wochenende"],
    linkedPages: ["/preise", "/service/rohrreinigung-notdienst"],
    adCopy: {
      short: "Zuschlag? Vorab gesagt",
      medium: "Notdienst-Zuschlag wird AM TELEFON genannt"
    }
  }
];

// ============================================
// الضمانات أثناء العمل - WÄHREND wir arbeiten
// ============================================
export const guaranteesDuring: Guarantee[] = [
  {
    id: "erklaerung-live",
    phase: "during",
    name: "Live-Erklärung",
    headline: "Sie sehen und verstehen, was wir tun",
    shortDescription: "Wir erklären jeden Schritt – kein Geheimnis, kein Fachjargon.",
    fullDescription: "Unser Techniker zeigt Ihnen, was er tut und warum. Bei Kamera-Inspektionen sehen Sie das Rohr selbst auf dem Bildschirm. Keine 'Vertrauens-Sache' – Sie sehen es mit eigenen Augen.",
    icon: "Eye",
    color: "blue",
    linkedPackages: ["komplett", "wiederkehrend", "diagnose"],
    linkedServices: ["kamera-inspektion", "kanalreinigung", "rohrreinigung"],
    linkedPages: ["/service/kamera-inspektion", "/preise"],
    adCopy: {
      short: "Sie sehen selbst",
      medium: "Kamera zeigt Ihnen das Problem – keine Vertrauenssache"
    }
  },
  {
    id: "zustimmung-bei-aenderung",
    phase: "during",
    name: "Zustimmung bei Änderung",
    headline: "Änderung? Nur mit Ihrer Zustimmung",
    shortDescription: "Wenn mehr nötig ist als gedacht, fragen wir VORHER.",
    fullDescription: "Manchmal ist ein Problem größer als erwartet. Wenn das passiert, stoppen wir und besprechen mit Ihnen die neue Situation und den neuen Preis. Wir machen NICHTS ohne Ihr OK.",
    icon: "MessageCircle",
    color: "amber",
    linkedPackages: ["notfall", "standard", "komplett", "wiederkehrend"],
    linkedServices: ["rohrreinigung", "kanalreinigung"],
    linkedPages: ["/preise"],
    adCopy: {
      short: "Immer mit Absprache",
      medium: "Mehr als geplant? Neue Zustimmung nötig."
    }
  },
  {
    id: "saubere-arbeit",
    phase: "during",
    name: "Saubere Arbeit",
    headline: "Wir hinterlassen keinen Dreck",
    shortDescription: "Nach der Arbeit sieht es aus wie vorher – nur ohne Problem.",
    fullDescription: "Wir bringen eigene Schutzmatten mit, arbeiten sauber und räumen alles auf. Sie müssen nicht hinter uns herputzen.",
    icon: "Sparkles",
    color: "emerald",
    linkedPackages: ["notfall", "standard", "komplett", "wiederkehrend"],
    linkedServices: ["rohrreinigung", "kanalreinigung", "abflussreinigung"],
    linkedPages: ["/"],
    adCopy: {
      short: "Sauber gearbeitet",
      medium: "Wir räumen auf – Sie putzen nicht hinter uns her"
    }
  }
];

// ============================================
// الضمانات بعد العمل - NACHDEM wir fertig sind
// ============================================
export const guaranteesAfter: Guarantee[] = [
  {
    id: "garantie-7-tage",
    phase: "after",
    name: "7-Tage-Garantie",
    headline: "7 Tage Garantie auf Standard-Arbeiten",
    shortDescription: "Kommt das Problem in 7 Tagen wieder? Wir kommen kostenlos zurück.",
    fullDescription: "Bei Standard-Reinigungen: Wenn das gleiche Problem innerhalb von 7 Tagen wieder auftritt, kommen wir kostenlos zurück und beheben es erneut.",
    icon: "Calendar",
    color: "blue",
    linkedPackages: ["standard"],
    linkedServices: ["abflussreinigung", "waschbecken-verstopft", "dusche-verstopft"],
    linkedPages: ["/preise"],
    adCopy: {
      short: "7-Tage-Garantie",
      medium: "Problem kommt wieder? Kostenlose Nacharbeit."
    }
  },
  {
    id: "garantie-30-tage",
    phase: "after",
    name: "30-Tage-Garantie",
    headline: "30 Tage Garantie bei Komplett-Lösung",
    shortDescription: "Volle 30 Tage: Kommt es wieder, zahlen Sie nichts.",
    fullDescription: "Bei unserer Komplett-Lösung: 30 Tage volle Garantie. Tritt das Problem erneut auf, ist der komplette Folgeeinsatz kostenlos – keine Fragen gestellt.",
    icon: "Shield",
    color: "emerald",
    linkedPackages: ["komplett"],
    linkedServices: ["rohrreinigung", "kanalreinigung", "toilette-verstopft"],
    linkedPages: ["/preise"],
    adCopy: {
      short: "30-Tage-Garantie",
      medium: "30 Tage sorgenfrei – Folgeeinsatz kostenlos"
    }
  },
  {
    id: "garantie-90-tage",
    phase: "after",
    name: "90-Tage-Garantie",
    headline: "90 Tage Garantie bei Wiederkehrend-Schutz",
    shortDescription: "Volle 90 Tage Ruhe + kostenlose Nachkontrolle.",
    fullDescription: "Beim Wiederkehrend-Schutz: 90 Tage Vollgarantie. Plus: Kostenlose Nachkontrolle nach 3 Monaten. Wenn etwas nicht stimmt, beheben wir es auf unsere Kosten.",
    icon: "Award",
    color: "primary",
    linkedPackages: ["wiederkehrend"],
    linkedServices: ["wurzelentfernung", "kanalreinigung"],
    linkedPages: ["/preise"],
    adCopy: {
      short: "90-Tage-Garantie",
      medium: "90 Tage Ruhe + kostenlose Nachkontrolle"
    }
  },
  {
    id: "nachbetreuung-24h",
    phase: "after",
    name: "24h Nachbetreuung",
    headline: "24 Stunden telefonische Nachbetreuung",
    shortDescription: "Fragen nach dem Einsatz? Rufen Sie an – 24 Stunden lang.",
    fullDescription: "Nach dem Einsatz sind wir 24 Stunden lang für Fragen erreichbar. Läuft etwas nicht wie erwartet? Rufen Sie an, wir helfen sofort.",
    icon: "Phone",
    color: "blue",
    linkedPackages: ["notfall", "standard"],
    linkedServices: ["rohrreinigung-notdienst"],
    linkedPages: ["/"],
    adCopy: {
      short: "24h erreichbar",
      medium: "Fragen danach? 24h telefonisch erreichbar"
    }
  },
  {
    id: "nachbetreuung-30-tage",
    phase: "after",
    name: "30-Tage-Nachbetreuung",
    headline: "30 Tage Nachbetreuung bei Fragen",
    shortDescription: "Fragen oder Unsicherheiten? 30 Tage lang jederzeit erreichbar.",
    fullDescription: "Bei Komplett-Lösung: 30 Tage lang sind wir für alle Fragen erreichbar. Beratung zu Vorbeugung, Nachfragen zum Bericht, alles inklusive.",
    icon: "MessageSquare",
    color: "emerald",
    linkedPackages: ["komplett", "wiederkehrend"],
    linkedServices: ["rohrreinigung", "kanalreinigung"],
    linkedPages: ["/preise"],
    adCopy: {
      short: "30 Tage Support",
      medium: "30 Tage Nachbetreuung inklusive"
    }
  },
  {
    id: "dokumentation-inklusive",
    phase: "after",
    name: "Dokumentation inklusive",
    headline: "Schriftlicher Bericht mit Fotos/Video",
    shortDescription: "Sie bekommen alles dokumentiert – per E-Mail oder ausgedruckt.",
    fullDescription: "Bei Diagnose und Komplett-Lösung: Sie erhalten einen schriftlichen Befundbericht mit Fotos oder Video-Aufnahmen. Perfekt für Versicherung, Vermieter oder Eigentümerversammlung.",
    icon: "FileText",
    color: "amber",
    linkedPackages: ["diagnose", "komplett", "wiederkehrend", "hausverwaltung"],
    linkedServices: ["kamera-inspektion", "kanalinspektion", "dichtheitspruefung"],
    linkedPages: ["/preise", "/hausverwaltung"],
    adCopy: {
      short: "Dokumentation inkl.",
      medium: "Schriftlicher Bericht mit Fotos – für Versicherung & Co"
    }
  },
  {
    id: "empfehlung-praevention",
    phase: "after",
    name: "Präventions-Empfehlung",
    headline: "Wir sagen Ihnen, wie Sie es verhindern",
    shortDescription: "Nach der Arbeit: Klare Tipps, damit es nicht wieder passiert.",
    fullDescription: "Wir reparieren nicht nur – wir erklären auch, WARUM es passiert ist und WIE Sie es verhindern können. Ehrliche Beratung, keine Verkaufstricks.",
    icon: "Lightbulb",
    color: "emerald",
    linkedPackages: ["komplett", "wiederkehrend"],
    linkedServices: ["rohrreinigung", "kanalreinigung", "abflussreinigung"],
    linkedPages: ["/preise"],
    adCopy: {
      short: "Tipps zur Vorbeugung",
      medium: "Wir erklären, wie Sie es verhindern"
    }
  },
  {
    id: "nachkontrolle-kostenlos",
    phase: "after",
    name: "Kostenlose Nachkontrolle",
    headline: "Nachkontrolle nach 3 Monaten – kostenlos",
    shortDescription: "Bei Wiederkehrend-Schutz: Wir kommen nach 3 Monaten und prüfen.",
    fullDescription: "Beim Wiederkehrend-Schutz ist eine kostenlose Nachkontrolle nach 3 Monaten inklusive. Wir prüfen, ob alles in Ordnung ist, und beheben eventuelle Probleme.",
    icon: "RotateCcw",
    color: "primary",
    linkedPackages: ["wiederkehrend"],
    linkedServices: ["kanalreinigung", "wurzelentfernung"],
    linkedPages: ["/preise"],
    adCopy: {
      short: "Nachkontrolle gratis",
      medium: "Nach 3 Monaten prüfen wir kostenlos"
    }
  }
];

// ============================================
// Alle Garantien kombiniert
// ============================================
export const allGuarantees: Guarantee[] = [
  ...guaranteesBefore,
  ...guaranteesDuring,
  ...guaranteesAfter
];

// ============================================
// Helper functions
// ============================================
export function getGuaranteeById(id: string): Guarantee | undefined {
  return allGuarantees.find(g => g.id === id);
}

export function getGuaranteesByPhase(phase: Guarantee["phase"]): Guarantee[] {
  return allGuarantees.filter(g => g.phase === phase);
}

export function getGuaranteesForPackage(packageId: string): Guarantee[] {
  return allGuarantees.filter(g => g.linkedPackages.includes(packageId));
}

export function getGuaranteesForService(serviceSlug: string): Guarantee[] {
  return allGuarantees.filter(g => g.linkedServices.includes(serviceSlug));
}

export function getGuaranteesForPage(pagePath: string): Guarantee[] {
  return allGuarantees.filter(g => g.linkedPages.includes(pagePath));
}

// ============================================
// Summary for display
// ============================================
export const guaranteeSummary = {
  before: {
    title: "Bevor wir anfangen",
    subtitle: "Sie wissen, was kommt",
    icon: "ClipboardCheck",
    items: guaranteesBefore.map(g => ({ id: g.id, name: g.name, short: g.shortDescription }))
  },
  during: {
    title: "Während wir arbeiten",
    subtitle: "Sie sehen, was passiert",
    icon: "Eye",
    items: guaranteesDuring.map(g => ({ id: g.id, name: g.name, short: g.shortDescription }))
  },
  after: {
    title: "Nachdem wir fertig sind",
    subtitle: "Sie sind abgesichert",
    icon: "ShieldCheck",
    items: guaranteesAfter.map(g => ({ id: g.id, name: g.name, short: g.shortDescription }))
  }
};
