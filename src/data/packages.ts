/**
 * نظام الباقات الشامل - Rohrreinigung Kraft
 * 8 باقات مصممة حسب نية العميل ومشكلته
 */

export interface Package {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  icon: string;
  color: "red" | "amber" | "blue" | "emerald" | "purple" | "slate" | "cyan" | "orange";

  // متى تستخدم هذه الباقة؟
  intent: "notfall" | "diagnose" | "standard" | "komplett" | "wiederkehrend" | "hausverwaltung" | "gewerbe" | "wartung";
  whenToUse: string;
  idealFor: string[];

  // التسعير
  priceFrom: number;
  priceTypical: string;
  pricingNote: string;

  // ماذا تشمل؟
  includes: string[];
  notIncluded: string[];

  // الضمان
  guarantee: {
    type: "standard" | "premium" | "business";
    duration: string;
    description: string;
  };

  // الوقت
  duration: string;
  responseTime?: string;

  // للعرض
  popular: boolean;
  badge?: string;
  cta: {
    text: string;
    urgency: string;
  };

  // الربط
  linkedServices: string[];
  linkedGuarantees: string[];
}

export const packages: Package[] = [
  // 1. Notfall-Soforthilfe - للطوارئ
  {
    id: "notfall",
    slug: "notfall-soforthilfe",
    name: "Notfall-Soforthilfe",
    subtitle: "Wenn es jetzt sein muss",
    icon: "Zap",
    color: "red",

    intent: "notfall",
    whenToUse: "Wasser steht, Toilette überläuft, Abwasser tritt aus – Sie brauchen JETZT Hilfe.",
    idealFor: [
      "Toilette überläuft",
      "Wasser steht im Keller",
      "Abwasser tritt aus",
      "Starke Geruchsbelästigung",
      "Kein Abfluss mehr möglich"
    ],

    priceFrom: 99,
    priceTypical: "120-180",
    pricingNote: "Nachts +40€, Wochenende +30€ – wird AM TELEFON gesagt",

    includes: [
      "Ankunft telefonisch abstimmen",
      "Sofortige Problemlösung",
      "Alle nötigen Werkzeuge dabei",
      "Saubere Arbeitsweise",
      "24h telefonische Nachbetreuung"
    ],
    notIncluded: [
      "Kamera-Inspektion (optional +50€)",
      "Ursachenanalyse (optional +80€)",
      "Präventionsberatung"
    ],

    guarantee: {
      type: "standard",
      duration: "24 Stunden",
      description: "Kommt das Problem in 24h wieder, kommen wir kostenlos zurück"
    },

    duration: "20-60 Min",
    responseTime: "Nach Vereinbarung",

    popular: false,
    badge: "24/7",
    cta: {
      text: "Jetzt Notdienst rufen",
      urgency: "Verfügbarkeit telefonisch klären"
    },

    linkedServices: ["rohrreinigung-notdienst", "toilette-verstopft", "toilette-laeuft-ueber", "keller-ueberflutet"],
    linkedGuarantees: ["diagnose-kostenlos", "festpreis-vorab", "nachbetreuung-24h"]
  },

  // 2. Diagnose-Paket - للتشخيص
  {
    id: "diagnose",
    slug: "diagnose-paket",
    name: "Diagnose-Paket",
    subtitle: "Erst verstehen, dann entscheiden",
    icon: "Camera",
    color: "amber",

    intent: "diagnose",
    whenToUse: "Sie wollen WISSEN, was los ist – bevor Sie Geld ausgeben.",
    idealFor: [
      "Wiederkehrende Verstopfungen",
      "Unklare Ursache",
      "Vor einem Hauskauf",
      "Verdacht auf Rohrschaden",
      "Dokumentation für Versicherung/Vermieter"
    ],

    priceFrom: 149,
    priceTypical: "149",
    pricingNote: "Festpreis – egal wie lange es dauert",

    includes: [
      "HD-Kamerabefahrung",
      "Sie sehen das Problem SELBST auf dem Bildschirm",
      "Foto-/Video-Dokumentation (per E-Mail)",
      "Schriftlicher Befundbericht",
      "Klare Handlungsempfehlung",
      "Kostenvoranschlag für weitere Schritte"
    ],
    notIncluded: [
      "Reinigung (kann sofort dazu gebucht werden)",
      "Reparatur/Sanierung"
    ],

    guarantee: {
      type: "standard",
      duration: "Dauerhaft",
      description: "Die Dokumentation gehört Ihnen – für Versicherung, Vermieter, Eigentümerversammlung"
    },

    duration: "30-60 Min",

    popular: false,
    badge: "Mit Video",
    cta: {
      text: "Diagnose-Termin buchen",
      urgency: "Klarheit in 24h"
    },

    linkedServices: ["kamera-inspektion", "kanalinspektion", "dichtheitspruefung", "leckortung"],
    linkedGuarantees: ["diagnose-kostenlos", "dokumentation-inklusive", "keine-versteckten-kosten"]
  },

  // 3. Standard-Reinigung - للمشاكل البسيطة
  {
    id: "standard",
    slug: "standard-reinigung",
    name: "Standard-Reinigung",
    subtitle: "Das Problem lösen",
    icon: "Droplets",
    color: "blue",

    intent: "standard",
    whenToUse: "Abfluss läuft langsam oder gar nicht – Sie wollen es einfach gelöst haben.",
    idealFor: [
      "Verstopftes Waschbecken",
      "Langsamer Duschablauf",
      "Verstopfte Badewanne",
      "Küchenabfluss Problem",
      "Geruchsprobleme"
    ],

    priceFrom: 79,
    priceTypical: "80-150",
    pricingNote: "Festpreis nach Diagnose vor Ort",

    includes: [
      "Kostenlose Diagnose vor Ort",
      "Mechanische oder Hochdruck-Reinigung",
      "Funktionsprüfung",
      "Sauberes Arbeiten",
      "Kurze Tipps zur Vorbeugung"
    ],
    notIncluded: [
      "Kamera-Inspektion (+50€)",
      "Schriftliche Dokumentation (+20€)",
      "Längere Garantie"
    ],

    guarantee: {
      type: "standard",
      duration: "7 Tage",
      description: "Kommt das gleiche Problem in 7 Tagen wieder, kommen wir kostenlos zurück"
    },

    duration: "20-45 Min",

    popular: false,
    cta: {
      text: "Termin vereinbaren",
      urgency: "Meist noch heute möglich"
    },

    linkedServices: ["abflussreinigung", "waschbecken-verstopft", "dusche-verstopft", "badewanne-verstopft"],
    linkedGuarantees: ["diagnose-kostenlos", "festpreis-vorab", "garantie-7-tage"]
  },

  // 4. Komplett-Lösung - الأكثر شعبية
  {
    id: "komplett",
    slug: "komplett-loesung",
    name: "Komplett-Lösung",
    subtitle: "Einmal richtig machen",
    icon: "Shield",
    color: "emerald",

    intent: "komplett",
    whenToUse: "Sie wollen nicht nur das Problem lösen, sondern VERSTEHEN und VORBEUGEN.",
    idealFor: [
      "Tiefe oder hartnäckige Verstopfungen",
      "Unbekannte Ursache",
      "Sie wollen Ruhe haben",
      "Hausverkauf/-kauf",
      "Dokumentation erwünscht"
    ],

    priceFrom: 249,
    priceTypical: "320-450",
    pricingNote: "Alles inklusive – keine Überraschungen",

    includes: [
      "Alles aus Standard-Reinigung",
      "HD-Kamera-Inspektion",
      "Sie sehen das Problem SELBST",
      "Ursachenanalyse: WARUM ist es passiert?",
      "Schriftlicher Bericht mit Fotos",
      "Präventions-Empfehlung: Wie verhindern?",
      "30 Tage Nachbetreuung bei Fragen"
    ],
    notIncluded: [
      "Sanierung/Reparatur (separates Angebot mit 10% Rabatt)"
    ],

    guarantee: {
      type: "premium",
      duration: "30 Tage",
      description: "Volle 30-Tage-Garantie: Kommt das Problem wieder, ist der nächste Einsatz kostenlos"
    },

    duration: "60-120 Min",

    popular: true,
    badge: "Meistgewählt",
    cta: {
      text: "Komplett-Lösung buchen",
      urgency: "Einmal richtig – dann ist Ruhe"
    },

    linkedServices: ["rohrreinigung", "kanalreinigung", "toilette-verstopft", "grundleitung-verstopft"],
    linkedGuarantees: ["diagnose-kostenlos", "festpreis-vorab", "garantie-30-tage", "nachbetreuung-30-tage"]
  },

  // 5. Wiederkehrend-Schutz - للمشاكل المتكررة
  {
    id: "wiederkehrend",
    slug: "wiederkehrend-schutz",
    name: "Wiederkehrend-Schutz",
    subtitle: "Schluss mit 'schon wieder'",
    icon: "RefreshCw",
    color: "purple",

    intent: "wiederkehrend",
    whenToUse: "Sie hatten das Problem schon MEHRMALS. Es nervt. Sie wollen eine DAUERHAFTE Lösung.",
    idealFor: [
      "Problem kommt immer wieder",
      "Alte Rohre/Altbau",
      "Wurzelprobleme",
      "Strukturelle Schäden vermutet",
      "Frustration mit vorherigen Firmen"
    ],

    priceFrom: 349,
    priceTypical: "400-600",
    pricingNote: "Inklusive Ursachenbeseitigung",

    includes: [
      "Alles aus Komplett-Lösung",
      "Tiefendiagnose: Wo genau ist die Ursache?",
      "Ursachenbeseitigung (Wurzeln, Ablagerungen, etc.)",
      "Hochdruck-Spülung der gesamten Leitung",
      "Sanierungsempfehlung falls nötig",
      "Nachkontrolle nach 3 Monaten (kostenlos)",
      "90 Tage Vollgarantie"
    ],
    notIncluded: [
      "Komplettsanierung (separates Angebot)"
    ],

    guarantee: {
      type: "premium",
      duration: "90 Tage",
      description: "90 Tage Vollgarantie: Kommt es wieder, zahlen Sie NICHTS für den nächsten Einsatz + kostenlose Nachkontrolle"
    },

    duration: "90-180 Min",

    popular: false,
    badge: "90-Tage-Garantie",
    cta: {
      text: "Endlich Ruhe haben",
      urgency: "Schluss mit 'schon wieder'"
    },

    linkedServices: ["wurzelentfernung", "kanalreinigung", "rohrsanierung", "grundleitung-verstopft"],
    linkedGuarantees: ["garantie-90-tage", "nachkontrolle-kostenlos", "ursachen-beseitigung"]
  },

  // 6. Hausverwaltung-Paket
  {
    id: "hausverwaltung",
    slug: "hausverwaltung-paket",
    name: "Hausverwaltung-Paket",
    subtitle: "Für Verwalter & WEG",
    icon: "Building2",
    color: "slate",

    intent: "hausverwaltung",
    whenToUse: "Sie verwalten Immobilien und brauchen einen zuverlässigen Partner mit Dokumentation.",
    idealFor: [
      "Hausverwaltungen",
      "WEG-Verwaltungen",
      "Eigentümergemeinschaften",
      "Immobilienverwalter",
      "Facility Management"
    ],

    priceFrom: 0, // Rahmenvertrag
    priceTypical: "-10% auf alles",
    pricingNote: "Rahmenvertrag mit Festkonditionen",

    includes: [
      "Prioritäts-Notdienst nach Vereinbarung",
      "10% Rabatt auf alle Einsätze",
      "Persönlicher Ansprechpartner",
      "Dokumentation für WEG-Versammlungen",
      "Monatliche Sammelrechnung",
      "Direkte Techniker-Hotline",
      "Kostenlose jährliche Inspektion pro Objekt"
    ],
    notIncluded: [
      "Wartungsverträge (separat ab 29€/Einheit)"
    ],

    guarantee: {
      type: "business",
      duration: "Dauerhaft",
      description: "Ein Ansprechpartner, dokumentierte Arbeit, Priorität bei Notfällen"
    },

    duration: "Je nach Einsatz",
    responseTime: "Nach Vereinbarung",

    popular: false,
    badge: "B2B",
    cta: {
      text: "Rahmenvertrag anfragen",
      urgency: "Angebot in 24h"
    },

    linkedServices: ["wohnanlage-rohrreinigung", "kanalreinigung-gewerbe", "wartungsvertrag"],
    linkedGuarantees: ["dokumentation-inklusive", "prioritaet-notdienst", "fester-ansprechpartner"]
  },

  // 7. Gewerbe-Paket
  {
    id: "gewerbe",
    slug: "gewerbe-paket",
    name: "Gewerbe-Paket",
    subtitle: "Für Restaurants, Hotels & Co",
    icon: "Store",
    color: "cyan",

    intent: "gewerbe",
    whenToUse: "Ihr Geschäftsbetrieb braucht schnelle, diskrete Hilfe – am besten außerhalb der Öffnungszeiten.",
    idealFor: [
      "Restaurants & Gastronomie",
      "Hotels",
      "Supermärkte",
      "Krankenhäuser",
      "Schulen & Kitas"
    ],

    priceFrom: 0, // Nach Anfrage
    priceTypical: "Nach Anfrage",
    pricingNote: "Individuelle Festkonditionen",

    includes: [
      "Einsätze außerhalb der Öffnungszeiten",
      "Minimale Betriebsunterbrechung",
      "Fettabscheider-Wartung (gesetzeskonform)",
      "Diskrete Durchführung",
      "Regelmäßige Präventiv-Reinigung",
      "Notfall-Priorität 24/7"
    ],
    notIncluded: [
      "Standardpreise (individuelles Angebot)"
    ],

    guarantee: {
      type: "business",
      duration: "Vertraglich",
      description: "Garantierte Reaktionszeit, dokumentierte Arbeit, gesetzeskonforme Wartung"
    },

    duration: "Je nach Anforderung",

    popular: false,
    badge: "B2B",
    cta: {
      text: "Angebot anfragen",
      urgency: "Individuelle Lösung in 24h"
    },

    linkedServices: ["gastronomie-reinigung", "hotel-rohrreinigung", "fettabscheider-reinigung", "industriereinigung"],
    linkedGuarantees: ["dokumentation-inklusive", "gesetzeskonform", "diskret"]
  },

  // 8. Wartungs-Vertrag
  {
    id: "wartung",
    slug: "wartungs-vertrag",
    name: "Wartungs-Vertrag",
    subtitle: "Probleme verhindern",
    icon: "Calendar",
    color: "orange",

    intent: "wartung",
    whenToUse: "Sie wollen KEINE Überraschungen. Regelmäßige Wartung = weniger Notfälle.",
    idealFor: [
      "Mehrfamilienhäuser",
      "Gewerbeimmobilien",
      "Alte Gebäude/Altbau",
      "Nach wiederkehrenden Problemen",
      "Hausverwaltungen (Kostensicherheit)"
    ],

    priceFrom: 29,
    priceTypical: "29-49",
    pricingNote: "pro Einheit/Monat",

    includes: [
      "Regelmäßige Wartungstermine (quartalsweise)",
      "Präventiv-Reinigung kritischer Stellen",
      "Jährliche Kamera-Inspektion",
      "Kleine Reparaturen inklusive",
      "Prioritäts-Notdienst 24/7",
      "Keine Extra-Kosten bei Standardeinsätzen",
      "Bis zu 80% weniger Notfälle"
    ],
    notIncluded: [
      "Größere Sanierungen (aber 15% Rabatt)"
    ],

    guarantee: {
      type: "business",
      duration: "Vertragsdauer",
      description: "Planbare Kosten, weniger Notfälle, Priorität bei Problemen"
    },

    duration: "Quartalsweise Termine",

    popular: false,
    badge: "Sparplan",
    cta: {
      text: "Wartungsvertrag anfragen",
      urgency: "Bis zu 80% weniger Notfälle"
    },

    linkedServices: ["rohrreinigung-wartung", "kanalwartung", "hebeanlage-wartung", "fettabscheider-wartung"],
    linkedGuarantees: ["planbare-kosten", "prioritaet-notdienst", "weniger-notfaelle"]
  }
];

// Helper functions
export function getPackageById(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find(pkg => pkg.slug === slug);
}

export function getPackagesByIntent(intent: Package["intent"]): Package[] {
  return packages.filter(pkg => pkg.intent === intent);
}

export function getPackagesForService(serviceSlug: string): Package[] {
  return packages.filter(pkg => pkg.linkedServices.includes(serviceSlug));
}

export function getPopularPackages(): Package[] {
  return packages.filter(pkg => pkg.popular);
}

export function getB2BPackages(): Package[] {
  return packages.filter(pkg => pkg.intent === "hausverwaltung" || pkg.intent === "gewerbe" || pkg.intent === "wartung");
}

export function getPrivatePackages(): Package[] {
  return packages.filter(pkg => !["hausverwaltung", "gewerbe", "wartung"].includes(pkg.intent));
}

// Package recommendation based on situation
export interface Situation {
  isUrgent: boolean;
  hasHappenedBefore: boolean;
  wantsDocumentation: boolean;
  isCommercial: boolean;
  wantsUnderstanding: boolean;
}

export function recommendPackage(situation: Situation): Package {
  if (situation.isCommercial) {
    return getPackageById("gewerbe")!;
  }
  if (situation.isUrgent) {
    return getPackageById("notfall")!;
  }
  if (situation.hasHappenedBefore) {
    return getPackageById("wiederkehrend")!;
  }
  if (situation.wantsDocumentation || situation.wantsUnderstanding) {
    return getPackageById("komplett")!;
  }
  return getPackageById("standard")!;
}
