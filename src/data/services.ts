// جميع الخدمات والخدمات الفرعية - قائمة موسعة 100+ خدمة
export interface Service {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  icon: string;
  priceRange?: string;
  keywords?: string[];
}

export const serviceCategories = [
  "Rohrreinigung",
  "Kanalreinigung",
  "Abflussreinigung",
  "Notdienst",
  "Inspektion",
  "Sanierung",
  "Wartung",
  "Spezialreinigung",
];

// Generator function for services
const createService = (
  name: string,
  slug: string,
  category: string,
  shortDescription: string,
  features: string[],
  icon: string,
  longDescription?: string
): Service => ({
  name,
  slug,
  category,
  shortDescription,
  longDescription: longDescription || `${shortDescription} Professionelle Durchführung mit modernster Technik. Schnelle Anfahrt und faire Preise. 24/7 Notdienst verfügbar.`,
  features,
  icon,
});

export const services: Service[] = [
  // === ROHRREINIGUNG HAUPTKATEGORIE ===
  createService(
    "Rohrreinigung",
    "rohrreinigung",
    "Rohrreinigung",
    "Professionelle Beseitigung von Rohrverstopfungen",
    ["Schnelle Beseitigung aller Verstopfungen", "Moderne Hochdruckreinigung", "Schonende Methoden für alle Rohrtypen", "24/7 Notdienst verfügbar", "Festpreisgarantie nach Besichtigung"],
    "pipe"
  ),
  createService(
    "Toilette verstopft",
    "toilette-verstopft",
    "Rohrreinigung",
    "Schnelle Hilfe bei verstopfter Toilette",
    ["Verfügbarkeit und Ankunft telefonisch klären", "Hygienische Arbeitsweise", "Professionelle Ausrüstung", "Keine Folgeschäden", "Faire Preise"],
    "toilet"
  ),
  createService(
    "Waschbecken verstopft",
    "waschbecken-verstopft",
    "Rohrreinigung",
    "Professionelle Reinigung verstopfter Waschbecken",
    ["Effektive Beseitigung von Haaren und Ablagerungen", "Reinigung des Siphons", "Prüfung der Abflussleitungen", "Vorbeugende Tipps", "Kurze Anfahrtszeit"],
    "sink"
  ),
  createService(
    "Badewanne verstopft",
    "badewanne-verstopft",
    "Rohrreinigung",
    "Schnelle Entstopfung der Badewanne",
    ["Professionelle Haarentfernung", "Reinigung des Ablaufsystems", "Keine Chemikalien nötig", "Schnelle Durchführung", "Langfristige Lösung"],
    "bathtub"
  ),
  createService(
    "Dusche verstopft",
    "dusche-verstopft",
    "Rohrreinigung",
    "Duschablauf wieder frei machen",
    ["Schnelle Entstopfung", "Reinigung der Ablaufrinne", "Prüfung des Abflusssystems", "Vorbeugende Maßnahmen", "Saubere Arbeitsweise"],
    "shower"
  ),
  createService(
    "Küche Abfluss verstopft",
    "kueche-abfluss-verstopft",
    "Rohrreinigung",
    "Küchenabfluss schnell entstopfen",
    ["Entfernung von Fettablagerungen", "Reinigung des gesamten Abflusssystems", "Umweltfreundliche Methoden", "Geruchsbeseitigung", "Vorbeugende Beratung"],
    "kitchen"
  ),
  createService(
    "Urinal verstopft",
    "urinal-verstopft",
    "Rohrreinigung",
    "Urinalreinigung und Entstopfung",
    ["Schnelle gewerbliche Hilfe", "Entfernung von Urinstein", "Hygienische Arbeitsweise", "Diskrete Durchführung", "Wartungsverträge möglich"],
    "urinal"
  ),
  createService(
    "Fallrohr verstopft",
    "fallrohr-verstopft",
    "Rohrreinigung",
    "Fallrohrreinigung bei Verstopfung",
    ["Reinigung von Laub und Schmutz", "Hochdruckreinigung", "Prüfung des gesamten Systems", "Schadensvorbeugung", "Regelmäßige Wartung möglich"],
    "downpipe"
  ),
  createService(
    "Grundleitung verstopft",
    "grundleitung-verstopft",
    "Rohrreinigung",
    "Reinigung verstopfter Grundleitungen",
    ["Spezialausrüstung für Grundleitungen", "Hochdruck-Spülung", "Wurzelentfernung", "Kamerainspektion möglich", "Langfristige Lösungen"],
    "foundation"
  ),
  createService(
    "Spülmaschine Abfluss verstopft",
    "spuelmaschine-abfluss-verstopft",
    "Rohrreinigung",
    "Spülmaschinenabfluss entstopfen",
    ["Schnelle Hilfe", "Prüfung der Anschlüsse", "Fettentfernung", "Geruchsbeseitigung", "Professionelle Reinigung"],
    "dishwasher"
  ),
  createService(
    "Waschmaschine Abfluss verstopft",
    "waschmaschine-abfluss-verstopft",
    "Rohrreinigung",
    "Waschmaschinenabfluss reinigen",
    ["Flusenverstopfungen lösen", "Anschlüsse prüfen", "Siphon reinigen", "Geruchsbeseitigung", "Vorbeugende Maßnahmen"],
    "washing"
  ),
  createService(
    "Bidet verstopft",
    "bidet-verstopft",
    "Rohrreinigung",
    "Bidet Abfluss entstopfen",
    ["Schnelle Entstopfung", "Hygienische Arbeitsweise", "Siphonreinigung", "Professionelle Ausrüstung", "Sauberes Arbeiten"],
    "bidet"
  ),
  createService(
    "Bodenablauf verstopft",
    "bodenablauf-verstopft",
    "Rohrreinigung",
    "Bodenablauf im Keller oder Bad entstopfen",
    ["Reinigung aller Bodenabläufe", "Keller und Garagen", "Badezimmer", "Hochdruckreinigung", "Geruchsbeseitigung"],
    "floor"
  ),
  createService(
    "Hebeanlage verstopft",
    "hebeanlage-verstopft",
    "Rohrreinigung",
    "Hebeanlage reinigen und entstopfen",
    ["Spezialreinigung", "Pumpenprüfung", "Wartung inklusive", "24/7 Notdienst", "Professionelle Ausrüstung"],
    "pump"
  ),
  createService(
    "Regenwasserleitung verstopft",
    "regenwasserleitung-verstopft",
    "Rohrreinigung",
    "Regenwasserleitung reinigen",
    ["Laubentfernung", "Hochdruckspülung", "Komplette Reinigung", "Schadensvorbeugung", "Regelmäßige Wartung"],
    "rain"
  ),
  createService(
    "Siphon verstopft",
    "siphon-verstopft",
    "Rohrreinigung",
    "Siphon reinigen und entstopfen",
    ["Schnelle Hilfe", "Professionelle Reinigung", "Dichtungsprüfung", "Ersatz bei Bedarf", "Faire Preise"],
    "siphon"
  ),
  createService(
    "Standrohr verstopft",
    "standrohr-verstopft",
    "Rohrreinigung",
    "Standrohr entstopfen",
    ["Spezialreinigung", "Hochdruckreinigung", "Kamerainspektion", "Professionelle Ausrüstung", "Langfristige Lösung"],
    "standpipe"
  ),
  createService(
    "Kupferrohr verstopft",
    "kupferrohr-verstopft",
    "Rohrreinigung",
    "Kupferrohre schonend reinigen",
    ["Schonende Reinigung", "Kein Schaden am Material", "Spezialwerkzeug", "Professionelle Durchführung", "Langfristige Ergebnisse"],
    "copper"
  ),
  createService(
    "Kunststoffrohr verstopft",
    "kunststoffrohr-verstopft",
    "Rohrreinigung",
    "Kunststoffrohre reinigen",
    ["Für alle Kunststofftypen", "Schonende Methoden", "Hochdruckreinigung", "Keine Beschädigungen", "Effektive Reinigung"],
    "plastic"
  ),
  createService(
    "Gussrohr verstopft",
    "gussrohr-verstopft",
    "Rohrreinigung",
    "Gussrohre reinigen und entstopfen",
    ["Spezialreinigung für Gussrohre", "Rostentfernung", "Ablagerungsbeseitigung", "Kamerainspektion", "Sanierungsberatung"],
    "castiron"
  ),

  // === KANALREINIGUNG ===
  createService(
    "Kanalreinigung",
    "kanalreinigung",
    "Kanalreinigung",
    "Professionelle Reinigung von Kanalsystemen",
    ["Hochdruck-Spültechnik", "Kamerainspektion inklusive", "Entfernung aller Ablagerungen", "Dokumentation des Zustands", "Regelmäßige Wartungsverträge"],
    "canal"
  ),
  createService(
    "Kanalinspektion",
    "kanalinspektion",
    "Kanalreinigung",
    "TV-Inspektion des Kanalsystems",
    ["HD-Kameratechnik", "Detaillierte Dokumentation", "Schadenserkennung", "Beratung zu Sanierungsmaßnahmen", "Protokollerstellung"],
    "camera"
  ),
  createService(
    "Kanalreinigung Privat",
    "kanalreinigung-privat",
    "Kanalreinigung",
    "Kanalreinigung für Privathaushalte",
    ["Komplette Hausreinigung", "Faire Privatkundenpreise", "Schnelle Terminvergabe", "Saubere Arbeitsweise", "Beratung inklusive"],
    "home"
  ),
  createService(
    "Kanalreinigung Gewerbe",
    "kanalreinigung-gewerbe",
    "Kanalreinigung",
    "Kanalreinigung für Gewerbebetriebe",
    ["Flexible Terminplanung", "Nacht- und Wochenendarbeit möglich", "Wartungsverträge", "Schnelle Notfallhilfe", "Professionelle Dokumentation"],
    "business"
  ),
  createService(
    "Wurzelentfernung",
    "wurzelentfernung",
    "Kanalreinigung",
    "Entfernung von Wurzeleinwuchs",
    ["Mechanische Wurzelfräse", "Schonung der Rohre", "Prävention von Neueinwuchs", "Kameraprüfung danach", "Beratung zu Sanierung"],
    "tree"
  ),
  createService(
    "Fettabscheider Reinigung",
    "fettabscheider-reinigung",
    "Kanalreinigung",
    "Professionelle Fettabscheider-Wartung",
    ["Gesetzeskonforme Reinigung", "Fachgerechte Entsorgung", "Dokumentation", "Wartungsverträge", "Schnelle Notfallreinigung"],
    "grease"
  ),
  createService(
    "Kanalspülung",
    "kanalspuelung",
    "Kanalreinigung",
    "Professionelle Kanalspülung mit Hochdruck",
    ["Bis 200 bar Druck", "Für alle Rohrdurchmesser", "Gründliche Reinigung", "Dokumentation", "Regelmäßige Wartung"],
    "flush"
  ),
  createService(
    "Schachtinspektion",
    "schachtinspektion",
    "Kanalreinigung",
    "Inspektion von Kanalschächten",
    ["Visuelle Prüfung", "Zustandserfassung", "Fotodokumentation", "Schadensbericht", "Sanierungsempfehlungen"],
    "manhole"
  ),
  createService(
    "Schachtreinigung",
    "schachtreinigung",
    "Kanalreinigung",
    "Reinigung von Kanalschächten",
    ["Komplette Reinigung", "Schlammentsorgung", "Hochdruckreinigung", "Regelmäßige Wartung", "Professionelle Ausführung"],
    "shaft"
  ),
  createService(
    "Sinkkastenreinigung",
    "sinkkastenreinigung",
    "Kanalreinigung",
    "Reinigung von Sinkkästen und Gullis",
    ["Laubentfernung", "Schlammentsorgung", "Hochdruckspülung", "Regelmäßige Wartung", "Stadtweite Dienstleistung"],
    "gully"
  ),
  createService(
    "Drainagereinigung",
    "drainagereinigung",
    "Kanalreinigung",
    "Reinigung von Drainagesystemen",
    ["Hochdruckspülung", "Wurzelentfernung", "Verstopfungsbeseitigung", "Funktionsprüfung", "Regelmäßige Wartung"],
    "drainage"
  ),
  createService(
    "Hofablauf reinigen",
    "hofablauf-reinigen",
    "Kanalreinigung",
    "Reinigung von Hofabläufen",
    ["Laub und Schmutz entfernen", "Hochdruckspülung", "Regelmäßige Wartung", "Schnelle Anfahrt", "Faire Preise"],
    "yard"
  ),
  createService(
    "Sammelgrube leeren",
    "sammelgrube-leeren",
    "Kanalreinigung",
    "Entleerung von Sammelgruben",
    ["Fachgerechte Entsorgung", "Alle Grubengrößen", "Schnelle Durchführung", "Regelmäßige Wartung", "Dokumentation"],
    "tank"
  ),
  createService(
    "Klärgrube leeren",
    "klaergrube-leeren",
    "Kanalreinigung",
    "Professionelle Klärgrubenentleerung",
    ["Fachgerechte Entsorgung", "Alle Grubentypen", "Regelmäßige Wartung", "Schnelle Terminvergabe", "Dokumentation"],
    "septic"
  ),
  createService(
    "Zisterne reinigen",
    "zisterne-reinigen",
    "Kanalreinigung",
    "Reinigung von Zisternen",
    ["Komplette Reinigung", "Schlammentsorgung", "Desinfektion möglich", "Regelmäßige Wartung", "Professionelle Durchführung"],
    "cistern"
  ),

  // === ABFLUSSREINIGUNG ===
  createService(
    "Abflussreinigung",
    "abflussreinigung",
    "Abflussreinigung",
    "Schnelle und gründliche Abflussreinigung",
    ["Alle Abflusstypen", "Schnelle Durchführung", "Gründliche Reinigung", "Keine versteckten Kosten", "Zufriedenheitsgarantie"],
    "drain"
  ),
  createService(
    "Abfluss verstopft",
    "abfluss-verstopft",
    "Abflussreinigung",
    "Soforthilfe bei verstopftem Abfluss",
    ["Soforthilfe", "Alle Abflusstypen", "Professionelle Ausrüstung", "Saubere Arbeitsweise", "Faire Preise"],
    "blocked"
  ),
  createService(
    "Abfluss stinkt",
    "abfluss-stinkt",
    "Abflussreinigung",
    "Beseitigung von Geruchsproblemen",
    ["Ursachenforschung", "Gründliche Reinigung", "Geruchsbeseitigung", "Prüfung des Systems", "Langfristige Lösung"],
    "smell"
  ),
  createService(
    "Abflussreinigung Hochdruck",
    "abflussreinigung-hochdruck",
    "Abflussreinigung",
    "Hochdruck-Spülung für hartnäckige Verstopfungen",
    ["Bis 200 bar Druck", "Effektiv gegen alle Verstopfungen", "Rohre werden geschont", "Schnelle Durchführung", "Professionelle Ausrüstung"],
    "highpressure"
  ),
  createService(
    "Abflussreinigung mechanisch",
    "abflussreinigung-mechanisch",
    "Abflussreinigung",
    "Mechanische Rohrreinigung mit Spirale",
    ["Spiralreinigung", "Ideal für leichte bis mittlere Verstopfungen", "Kostengünstig", "Schnelle Durchführung", "Bewährte Methode"],
    "spiral"
  ),
  createService(
    "Abflussreinigung chemisch",
    "abflussreinigung-chemisch",
    "Abflussreinigung",
    "Chemische Abflussreinigung bei Bedarf",
    ["Für spezielle Fälle", "Umweltfreundliche Mittel", "Fachgerechte Anwendung", "Effektiv gegen Fett", "Professionelle Durchführung"],
    "chemical"
  ),
  createService(
    "Rohrreinigung mit Spirale",
    "rohrreinigung-spirale",
    "Abflussreinigung",
    "Mechanische Reinigung mit Rohrreinigungsspirale",
    ["Flexibel einsetzbar", "Für alle Rohrgrößen", "Effektive Entstopfung", "Schnelle Durchführung", "Faire Preise"],
    "coil"
  ),
  createService(
    "Elektromechanische Reinigung",
    "elektromechanische-reinigung",
    "Abflussreinigung",
    "Elektrisch betriebene Rohrreinigung",
    ["Für hartnäckige Verstopfungen", "Leistungsstarke Geräte", "Alle Rohrgrößen", "Professionelle Ausrüstung", "Schnelle Ergebnisse"],
    "electric"
  ),

  // === NOTDIENST ===
  createService(
    "Rohrreinigung Notdienst",
    "rohrreinigung-notdienst",
    "Notdienst",
    "24/7 Notdienst für alle Rohrverstopfungen",
    ["24 Stunden, 7 Tage", "Schnelle Anfahrt", "Sofortige Hilfe", "Alle Notfälle", "Kompetente Fachleute"],
    "emergency"
  ),
  createService(
    "Notdienst Nacht",
    "notdienst-nacht",
    "Notdienst",
    "Nächtlicher Notdienst verfügbar",
    ["Verfügbar von 22-6 Uhr", "Schnelle Reaktionszeit", "Vollständige Ausrüstung", "Erfahrene Techniker", "Faire Nachtpreise"],
    "night"
  ),
  createService(
    "Notdienst Wochenende",
    "notdienst-wochenende",
    "Notdienst",
    "Notdienst am Wochenende und Feiertagen",
    ["Samstag und Sonntag", "Alle Feiertage", "Keine Einschränkungen", "Volle Einsatzbereitschaft", "Schnelle Hilfe"],
    "weekend"
  ),
  createService(
    "Rohrbruch Notdienst",
    "rohrbruch-notdienst",
    "Notdienst",
    "Soforthilfe bei Rohrbruch",
    ["Sofortige Schadenslokalisierung", "Notreparaturen", "Schadensminimierung", "Koordination mit Versicherung", "Folgemaßnahmen"],
    "burst"
  ),
  createService(
    "Wasserrohrbruch",
    "wasserrohrbruch",
    "Notdienst",
    "Schnelle Hilfe bei Wasserrohrbruch",
    ["Sofortige Wasserstopp", "Professionelle Reparatur", "Schadensdokumentation", "Trocknungsberatung", "24/7 verfügbar"],
    "water"
  ),
  createService(
    "Überschwemmung Notdienst",
    "ueberschwemmung-notdienst",
    "Notdienst",
    "Soforthilfe bei Überschwemmung",
    ["Schnelle Reaktion", "Wasserabsaugung", "Ursachenbeseitigung", "Trocknungsmaßnahmen", "Schadensminimierung"],
    "flood"
  ),
  createService(
    "Keller überflutet",
    "keller-ueberflutet",
    "Notdienst",
    "Hilfe bei überfluteten Kellern",
    ["Sofortige Wasserbeseitigung", "Pumpeneinsatz", "Ursachensuche", "Trocknungsberatung", "24/7 Einsatzbereitschaft"],
    "basement"
  ),
  createService(
    "Rückstau Notdienst",
    "rueckstau-notdienst",
    "Notdienst",
    "Soforthilfe bei Kanalrückstau",
    ["Schnelle Beseitigung", "Ursachenforschung", "Rückstauklappe prüfen", "Präventionsberatung", "24/7 verfügbar"],
    "backflow"
  ),
  createService(
    "Toilette läuft über",
    "toilette-laeuft-ueber",
    "Notdienst",
    "Notdienst bei überlaufender Toilette",
    ["Sofortige Hilfe", "Hygienische Arbeitsweise", "Schnelle Anfahrt", "Professionelle Ausrüstung", "Faire Preise"],
    "overflow"
  ),
  createService(
    "Abwasser tritt aus",
    "abwasser-tritt-aus",
    "Notdienst",
    "Notdienst bei austretendem Abwasser",
    ["Schnelle Reaktion", "Hygienemaßnahmen", "Ursachenbeseitigung", "Reinigung", "24/7 Bereitschaft"],
    "sewage"
  ),

  // === INSPEKTION ===
  createService(
    "Kamera-Inspektion",
    "kamera-inspektion",
    "Inspektion",
    "TV-Kamerabefahrung der Rohrleitungen",
    ["HD-Kameratechnik", "Aufzeichnung möglich", "Detaillierte Analyse", "Zustandsbericht", "Handlungsempfehlungen"],
    "camera"
  ),
  createService(
    "Dichtheitsprüfung",
    "dichtheitspruefung",
    "Inspektion",
    "Prüfung der Rohrleitungen auf Dichtheit",
    ["Normgerechte Prüfung", "Offizielles Protokoll", "Schadensidentifikation", "Beratung bei Mängeln", "Behördenkonforme Dokumentation"],
    "leak"
  ),
  createService(
    "Leckortung",
    "leckortung",
    "Inspektion",
    "Präzise Ortung von Leckagen",
    ["Zerstörungsfreie Ortung", "Präzise Lokalisierung", "Verschiedene Verfahren", "Minimale Folgeschäden", "Schnelle Ergebnisse"],
    "location"
  ),
  createService(
    "Zustandserfassung",
    "zustandserfassung",
    "Inspektion",
    "Vollständige Erfassung des Rohrzustands",
    ["Komplette Systemerfassung", "Detaillierter Bericht", "Fotodokumentation", "Sanierungsplanung", "Kostenschätzung"],
    "report"
  ),
  createService(
    "Rohrortung",
    "rohrortung",
    "Inspektion",
    "Ortung unterirdischer Rohrleitungen",
    ["Präzise Ortung", "Verschiedene Techniken", "Dokumentation", "Schadensvermeidung", "Schnelle Ergebnisse"],
    "locate"
  ),
  createService(
    "Kanalbefahrung",
    "kanalbefahrung",
    "Inspektion",
    "TV-Befahrung des Kanalsystems",
    ["Modernste Kameratechnik", "Alle Rohrgrößen", "Detaillierte Dokumentation", "Video-Aufzeichnung", "Expertenanalyse"],
    "tvsurvey"
  ),
  createService(
    "Schadensanalyse",
    "schadensanalyse",
    "Inspektion",
    "Analyse von Rohrschäden",
    ["Detaillierte Untersuchung", "Ursachenermittlung", "Fotodokumentation", "Sanierungsempfehlung", "Kostenprognose"],
    "analysis"
  ),
  createService(
    "Dichtigkeitsprüfung Abwasser",
    "dichtigkeitspruefung-abwasser",
    "Inspektion",
    "Dichtheitsprüfung von Abwasserleitungen",
    ["Nach DIN 1986", "Protokollerstellung", "Behördenkonforme Prüfung", "Schadenserkennung", "Sanierungsberatung"],
    "sewertest"
  ),

  // === SANIERUNG ===
  createService(
    "Rohrsanierung",
    "rohrsanierung",
    "Sanierung",
    "Grabenlose Rohrsanierung",
    ["Grabenlose Sanierung", "Inliner-Verfahren", "Minimale Beeinträchtigung", "Lange Lebensdauer", "Kostenersparnis"],
    "repair"
  ),
  createService(
    "Kanalsanierung",
    "kanalsanierung",
    "Sanierung",
    "Professionelle Sanierung des Kanalsystems",
    ["Verschiedene Sanierungsverfahren", "Individuelle Lösungen", "Langzeitgarantie", "Fachgerechte Ausführung", "Dokumentation"],
    "construction"
  ),
  createService(
    "Inliner Sanierung",
    "inliner-sanierung",
    "Sanierung",
    "Schlauchrelining für Rohrleitungen",
    ["Rohr-im-Rohr-Verfahren", "Keine Grabungsarbeiten", "Schnelle Durchführung", "50+ Jahre Lebensdauer", "Für alle Rohrtypen"],
    "liner"
  ),
  createService(
    "Partielle Reparatur",
    "partielle-reparatur",
    "Sanierung",
    "Punktuelle Reparatur von Rohrschäden",
    ["Gezielte Reparatur", "Kostengünstig", "Schnelle Durchführung", "Verschiedene Verfahren", "Für alle Rohrtypen"],
    "partial"
  ),
  createService(
    "Kurzliner",
    "kurzliner",
    "Sanierung",
    "Punktuelle Sanierung mit Kurzliner",
    ["Für lokale Schäden", "Keine Grabung nötig", "Schnelle Aushärtung", "Kosteneffizient", "Langlebig"],
    "shortliner"
  ),
  createService(
    "Schlauchlining",
    "schlauchlining",
    "Sanierung",
    "Komplettsanierung mit Schlauchliner",
    ["Komplette Rohrerneuerung", "Grabenlos", "Für lange Strecken", "Hohe Belastbarkeit", "50+ Jahre Haltbarkeit"],
    "sliplining"
  ),
  createService(
    "Rohrauskleidung",
    "rohrauskleidung",
    "Sanierung",
    "Auskleidung beschädigter Rohre",
    ["Epoxidharz-Beschichtung", "Für alle Materialien", "Korrosionsschutz", "Lange Haltbarkeit", "Professionelle Ausführung"],
    "lining"
  ),
  createService(
    "Muffen­sanierung",
    "muffensanierung",
    "Sanierung",
    "Sanierung undichter Rohrverbindungen",
    ["Abdichtung von Muffen", "Ohne Grabung", "Dauerhafte Lösung", "Schnelle Durchführung", "Kosteneffizient"],
    "joint"
  ),
  createService(
    "Rissreparatur",
    "rissreparatur",
    "Sanierung",
    "Reparatur von Rohrrissen",
    ["Präzise Reparatur", "Grabenlos möglich", "Verschiedene Verfahren", "Langlebige Lösung", "Dokumentation"],
    "crack"
  ),
  createService(
    "Rohrbruch Sanierung",
    "rohrbruch-sanierung",
    "Sanierung",
    "Sanierung nach Rohrbruch",
    ["Komplette Instandsetzung", "Grabenlose Optionen", "Schnelle Durchführung", "Garantie", "Schadensdokumentation"],
    "burstsanierung"
  ),

  // === WARTUNG ===
  createService(
    "Rohrreinigung Wartung",
    "rohrreinigung-wartung",
    "Wartung",
    "Regelmäßige Wartung der Rohrleitungen",
    ["Vorbeugende Reinigung", "Wartungsverträge", "Regelmäßige Termine", "Kostenersparnis", "Dokumentation"],
    "maintenance"
  ),
  createService(
    "Kanalwartung",
    "kanalwartung",
    "Wartung",
    "Regelmäßige Wartung des Kanalsystems",
    ["Inspektion und Reinigung", "Früherkennung von Schäden", "Wartungsverträge", "Dokumentation", "Kostenoptimierung"],
    "canalmaint"
  ),
  createService(
    "Wartungsvertrag",
    "wartungsvertrag",
    "Wartung",
    "Individuelle Wartungsverträge",
    ["Flexible Intervalle", "Fixpreise", "Priorität bei Notfällen", "Dokumentation", "Kostenersparnis"],
    "contract"
  ),
  createService(
    "Abfluss Wartung",
    "abfluss-wartung",
    "Wartung",
    "Regelmäßige Abflusswartung",
    ["Vorbeugende Reinigung", "Geruchsvermeidung", "Verstopfungsprävention", "Flexible Termine", "Faire Preise"],
    "drainmaint"
  ),
  createService(
    "Hebeanlage Wartung",
    "hebeanlage-wartung",
    "Wartung",
    "Wartung von Hebeanlagen",
    ["Regelmäßige Prüfung", "Pumpencheck", "Schwimmerschalter Test", "Reinigung", "Dokumentation"],
    "pumpmaint"
  ),
  createService(
    "Fettabscheider Wartung",
    "fettabscheider-wartung",
    "Wartung",
    "Regelmäßige Fettabscheiderwartung",
    ["Gesetzeskonforme Wartung", "Dokumentation", "Entsorgung inklusive", "Flexible Intervalle", "Professionelle Ausführung"],
    "greasemaint"
  ),
  createService(
    "Rückstauklappe Wartung",
    "rueckstauklappe-wartung",
    "Wartung",
    "Wartung von Rückstauklappen",
    ["Funktionsprüfung", "Reinigung", "Dichtungsprüfung", "Regelmäßige Termine", "Dokumentation"],
    "backflopmaint"
  ),

  // === SPEZIALREINIGUNG ===
  createService(
    "Industriereinigung",
    "industriereinigung",
    "Spezialreinigung",
    "Rohrreinigung für Industriebetriebe",
    ["Große Rohrdurchmesser", "Spezialausrüstung", "Flexible Termine", "Minimale Produktionsunterbrechung", "Professionelle Dokumentation"],
    "industry"
  ),
  createService(
    "Gastronomie Reinigung",
    "gastronomie-reinigung",
    "Spezialreinigung",
    "Rohrreinigung für Gastronomie",
    ["Fettentfernung", "Hygienische Arbeitsweise", "Flexible Termine", "Wartungsverträge", "Schnelle Hilfe"],
    "restaurant"
  ),
  createService(
    "Hotel Rohrreinigung",
    "hotel-rohrreinigung",
    "Spezialreinigung",
    "Rohrreinigung für Hotels",
    ["Diskrete Durchführung", "Minimale Störung", "Schnelle Bearbeitung", "24/7 verfügbar", "Professioneller Service"],
    "hotel"
  ),
  createService(
    "Krankenhaus Rohrreinigung",
    "krankenhaus-rohrreinigung",
    "Spezialreinigung",
    "Rohrreinigung für Krankenhäuser",
    ["Höchste Hygienestandards", "Diskrete Durchführung", "Flexible Termine", "Schnelle Reaktionszeit", "Dokumentation"],
    "hospital"
  ),
  createService(
    "Schule Rohrreinigung",
    "schule-rohrreinigung",
    "Spezialreinigung",
    "Rohrreinigung für Schulen",
    ["Arbeiten in Ferienzeiten", "Schnelle Durchführung", "Faire Preise", "Wartungsverträge", "Professioneller Service"],
    "school"
  ),
  createService(
    "Wohnanlage Rohrreinigung",
    "wohnanlage-rohrreinigung",
    "Spezialreinigung",
    "Rohrreinigung für Wohnanlagen",
    ["Alle Wohneinheiten", "Koordinierte Durchführung", "Wartungsverträge", "Faire Preise", "Professioneller Service"],
    "apartment"
  ),
  createService(
    "Altenheim Rohrreinigung",
    "altenheim-rohrreinigung",
    "Spezialreinigung",
    "Rohrreinigung für Altenheime",
    ["Sensible Durchführung", "Minimale Störung", "Höchste Hygienestandards", "Flexible Termine", "Professioneller Service"],
    "elderly"
  ),
  createService(
    "Tankstelle Rohrreinigung",
    "tankstelle-rohrreinigung",
    "Spezialreinigung",
    "Rohrreinigung für Tankstellen",
    ["Ölabscheider Reinigung", "Schnelle Durchführung", "Außerhalb der Geschäftszeiten", "Dokumentation", "Professionelle Entsorgung"],
    "gasstation"
  ),
  createService(
    "Autowerkstatt Rohrreinigung",
    "autowerkstatt-rohrreinigung",
    "Spezialreinigung",
    "Rohrreinigung für Autowerkstätten",
    ["Ölabscheider Wartung", "Fettentfernung", "Flexible Termine", "Wartungsverträge", "Professioneller Service"],
    "workshop"
  ),
  createService(
    "Supermarkt Rohrreinigung",
    "supermarkt-rohrreinigung",
    "Spezialreinigung",
    "Rohrreinigung für Supermärkte",
    ["Außerhalb der Öffnungszeiten", "Schnelle Durchführung", "Alle Abflusssysteme", "Wartungsverträge", "Faire Preise"],
    "supermarket"
  ),
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter((service) => service.category === category);
}

export function getMainServices(): Service[] {
  return services.filter((service) =>
    ["rohrreinigung", "kanalreinigung", "abflussreinigung", "rohrreinigung-notdienst"].includes(service.slug)
  );
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

export function searchServices(query: string): Service[] {
  const searchTerm = query.toLowerCase();
  return services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm) ||
      service.slug.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm) ||
      service.shortDescription.toLowerCase().includes(searchTerm)
  );
}

export function getServicesSortedByCategory(): Service[] {
  return [...services].sort((a, b) => a.category.localeCompare(b.category, 'de'));
}

export function getServicesSortedByName(): Service[] {
  return [...services].sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

// إجمالي الخدمات
export const totalServices = services.length;
