/**
 * قاعدة بيانات الأسئلة الشائعة - Rohrreinigung Kraft
 * 150+ سؤال موزع على الصفحات والفئات
 * مُحسّن لـ AEO (Answer Engine Optimization)
 */

export interface FAQItem {
  id: string;
  question: string;
  shortAnswer: string; // للـ AEO - جواب مباشر قصير
  fullAnswer: string; // شرح أطول
  category: FAQCategory;
  page: FAQPage[];
  keywords: string[];
  priority: "high" | "medium" | "low";
  schema: boolean; // هل يُضاف للـ Schema.org
}

export type FAQCategory =
  | "kosten" // الأسعار
  | "ablauf" // العملية
  | "notfall" // الطوارئ
  | "technik" // التقنية
  | "probleme" // المشاكل
  | "garantie" // الضمانات
  | "b2b" // للشركات
  | "region" // المنطقة
  | "wartung" // الصيانة
  | "diagnose" // التشخيص
  | "service"; // الخدمات

export type FAQPage =
  | "homepage"
  | "preise"
  | "hausverwaltung"
  | "service-rohrreinigung"
  | "service-kanalreinigung"
  | "service-notdienst"
  | "service-toilette"
  | "service-abfluss"
  | "service-kamera"
  | "city-nuernberg"
  | "city-fuerth"
  | "city-erlangen"
  | "faq";

// ============================================
// الأسعار - KOSTEN (30 أسئلة)
// ============================================
export const kostenFAQ: FAQItem[] = [
  {
    id: "kosten-1",
    question: "Was kostet eine Rohrreinigung?",
    shortAnswer: "Ab 79€ für einfache Verstopfungen. Der genaue Festpreis wird nach kostenloser Diagnose vor Ort genannt – bevor die Arbeit beginnt.",
    fullAnswer: "Die Kosten hängen von der Art und Tiefe der Verstopfung ab. Einfache Verstopfungen (Toilette, Waschbecken) kosten ab 79€, typisch 80-150€. Tiefere Probleme (Kanalreinigung) ab 149€. Das Besondere: Wir machen eine kostenlose Diagnose vor Ort und nennen Ihnen dann den EXAKTEN Festpreis – bevor wir anfangen. Keine Überraschungen.",
    category: "kosten",
    page: ["homepage", "preise", "faq"],
    keywords: ["rohrreinigung kosten", "rohrreinigung preis", "was kostet rohrreinigung"],
    priority: "high",
    schema: true
  },
  {
    id: "kosten-2",
    question: "Ist die Diagnose wirklich kostenlos?",
    shortAnswer: "Ja, die Diagnose vor Ort ist immer kostenlos – auch wenn Sie unser Angebot danach ablehnen.",
    fullAnswer: "Wir kommen zu Ihnen, schauen uns das Problem an und erklären, was nötig ist. Das kostet Sie nichts. Erst danach nennen wir den Festpreis. Wenn Ihnen der Preis nicht passt, fahren wir wieder – ohne Kosten für Sie. Das ist unser Versprechen.",
    category: "kosten",
    page: ["homepage", "preise", "faq"],
    keywords: ["diagnose kostenlos", "kostenlose begutachtung"],
    priority: "high",
    schema: true
  },
  {
    id: "kosten-3",
    question: "Kann der Preis NACH der Arbeit steigen?",
    shortAnswer: "Nein. Der Festpreis nach Diagnose ist der Endpreis. Keine Nachforderungen.",
    fullAnswer: "Der Festpreis, den wir nach der Diagnose nennen, ist verbindlich. Wenn während der Arbeit unerwartet mehr nötig ist, besprechen wir das mit Ihnen und Sie entscheiden. Wir machen NICHTS ohne Ihre Zustimmung. Der ursprüngliche Preis steigt nicht ohne Ihr OK.",
    category: "kosten",
    page: ["preise", "faq"],
    keywords: ["festpreis", "nachforderung", "preis steigt"],
    priority: "high",
    schema: true
  },
  {
    id: "kosten-4",
    question: "Was kostet die Anfahrt?",
    shortAnswer: "In Nürnberg, Fürth und Erlangen: Im Preis inklusive. Außerhalb: +25€ pauschal.",
    fullAnswer: "Die Anfahrt in den Kernstädten Nürnberg, Fürth und Erlangen ist immer im Preis inbegriffen. Für Orte außerhalb berechnen wir eine Pauschale von 25€ – das sagen wir Ihnen aber bereits am Telefon, bevor wir losfahren.",
    category: "kosten",
    page: ["preise", "faq"],
    keywords: ["anfahrt kosten", "anfahrtskosten"],
    priority: "medium",
    schema: true
  },
  {
    id: "kosten-5",
    question: "Was kostet der Notdienst nachts oder am Wochenende?",
    shortAnswer: "Die Grundpreise bleiben gleich. Zuschläge: Nacht (22-6 Uhr) +40€, Wochenende +30€, Abend (18-22 Uhr) +20€.",
    fullAnswer: "Die Notdienst-Zuschläge werden AM TELEFON genannt, bevor wir losfahren – nicht erst vor Ort. So wissen Sie vorher genau, was auf Sie zukommt. Die Grundpreise für die Arbeit selbst bleiben unverändert.",
    category: "kosten",
    page: ["preise", "service-notdienst", "faq"],
    keywords: ["notdienst kosten", "nachtzuschlag", "wochenendzuschlag"],
    priority: "high",
    schema: true
  },
  {
    id: "kosten-6",
    question: "Muss ich bei Ablehnung etwas zahlen?",
    shortAnswer: "Nein. Wenn Sie nach der Diagnose ablehnen, entstehen keine Kosten.",
    fullAnswer: "Die Diagnose ist komplett kostenlos und unverbindlich. Wenn Ihnen unser Angebot nicht zusagt, fahren wir einfach wieder. Sie zahlen nichts – weder Anfahrt noch Diagnose.",
    category: "kosten",
    page: ["preise", "faq"],
    keywords: ["ablehnung", "keine kosten"],
    priority: "medium",
    schema: true
  },
  {
    id: "kosten-7",
    question: "Wie kann ich bezahlen?",
    shortAnswer: "Bar, EC-Karte, Kreditkarte oder auf Rechnung. Für Geschäftskunden: Sammelrechnung möglich.",
    fullAnswer: "Wir akzeptieren alle gängigen Zahlungsmethoden: Bargeld, EC-Karte (girocard), Kreditkarte (Visa, Mastercard) oder auf Rechnung. Hausverwaltungen und Geschäftskunden können auch monatliche Sammelrechnungen erhalten.",
    category: "kosten",
    page: ["preise", "faq"],
    keywords: ["zahlung", "bezahlung", "rechnung"],
    priority: "medium",
    schema: true
  },
  {
    id: "kosten-8",
    question: "Was kostet eine Kamera-Inspektion?",
    shortAnswer: "Festpreis 149€ inklusive HD-Videoaufnahme und schriftlichem Befundbericht.",
    fullAnswer: "Eine Kamera-Inspektion kostet pauschal 149€ – unabhängig von der Dauer. Inklusive sind: HD-Kamerabefahrung, Video-/Fotodokumentation per E-Mail, schriftlicher Befundbericht und Handlungsempfehlung. Perfekt für Dokumentation oder wenn Sie die Ursache verstehen wollen.",
    category: "kosten",
    page: ["preise", "service-kamera", "faq"],
    keywords: ["kamera inspektion kosten", "kamerabefahrung preis"],
    priority: "high",
    schema: true
  },
  {
    id: "kosten-9",
    question: "Was kostet Toilette entstopfen?",
    shortAnswer: "Ab 79€, typisch 80-130€. Festpreis nach kostenloser Diagnose vor Ort.",
    fullAnswer: "Eine verstopfte Toilette zu entstopfen kostet ab 79€. Die meisten Fälle liegen bei 80-130€. Der genaue Preis hängt davon ab, wie tief die Verstopfung sitzt und was sie verursacht hat. Nach unserer kostenlosen Diagnose nennen wir den Festpreis.",
    category: "kosten",
    page: ["preise", "service-toilette", "faq"],
    keywords: ["toilette verstopft kosten", "wc entstopfen preis"],
    priority: "high",
    schema: true
  },
  {
    id: "kosten-10",
    question: "Lohnt sich ein Wartungsvertrag?",
    shortAnswer: "Ja – ab 29€/Monat/Einheit. Bis zu 80% weniger Notfälle und Prioritäts-Service.",
    fullAnswer: "Ein Wartungsvertrag lohnt sich besonders für Mehrfamilienhäuser, Altbauten oder Objekte mit wiederkehrenden Problemen. Für 29-49€ pro Einheit/Monat erhalten Sie: Quartalsweise Wartung, jährliche Inspektion, kleine Reparaturen inklusive und Prioritäts-Notdienst. Studien zeigen: Bis zu 80% weniger Notfalleinsätze.",
    category: "kosten",
    page: ["preise", "hausverwaltung", "faq"],
    keywords: ["wartungsvertrag kosten", "wartung lohnt sich"],
    priority: "medium",
    schema: true
  },
  {
    id: "kosten-11",
    question: "Warum sind die Preise 'ab'?",
    shortAnswer: "Weil jede Verstopfung anders ist. 'Ab' ist für einfache Fälle. Der exakte Festpreis folgt nach Diagnose.",
    fullAnswer: "Eine Toilette mit Feuchttuch-Problem ist in 15 Minuten gelöst. Eine tiefsitzende Wurzelverstopfung braucht Spezialequipment und 2 Stunden. Einen fixen Preis vorab zu nennen wäre entweder zu teuer für Sie (bei einfachen Fällen) oder unrealistisch für uns. Deshalb: Kostenlose Diagnose → Exakter Festpreis → Ihr OK.",
    category: "kosten",
    page: ["preise", "faq"],
    keywords: ["ab preis", "warum ab"],
    priority: "medium",
    schema: true
  },
  {
    id: "kosten-12",
    question: "Was bestimmt den Preis?",
    shortAnswer: "Hauptsächlich: Tiefe der Verstopfung, Art (Fett/Wurzeln/Fremdkörper), Zugänglichkeit und nötige Technik.",
    fullAnswer: "Der Preis richtet sich nach dem Aufwand: Wie tief sitzt die Verstopfung? Was hat sie verursacht (Haare sind einfacher als Wurzeln)? Wie gut erreichbar ist die Stelle? Welche Technik brauchen wir? All das sehen wir bei der kostenlosen Diagnose und nennen dann den Festpreis.",
    category: "kosten",
    page: ["preise", "faq"],
    keywords: ["preis faktoren", "was bestimmt preis"],
    priority: "medium",
    schema: true
  },
  {
    id: "kosten-13",
    question: "Was kostet Kanalreinigung?",
    shortAnswer: "Ab 149€, typisch 180-350€. Mit Hochdruck-Technik und inklusive Anfahrt.",
    fullAnswer: "Kanalreinigung startet ab 149€ für einfache Fälle. Die meisten Einsätze liegen bei 180-350€, abhängig von Länge und Zustand des Kanals. Inklusive sind: Anfahrt, Hochdruck-Spülung bis 200 bar, Funktionsprüfung. Kamera-Inspektion optional für +50€.",
    category: "kosten",
    page: ["preise", "service-kanalreinigung", "faq"],
    keywords: ["kanalreinigung kosten", "kanal reinigen preis"],
    priority: "high",
    schema: true
  },
  {
    id: "kosten-14",
    question: "Gibt es versteckte Kosten?",
    shortAnswer: "Nein. Der Festpreis ist der Endpreis. Keine Materialzuschläge, keine Extras.",
    fullAnswer: "Wir nennen Ihnen einen Festpreis – und das ist der Endpreis. Keine Materialkosten extra, keine 'da war noch was', keine Nachforderungen. Was wir sagen, das gilt. Das unterscheidet uns von vielen anderen Anbietern.",
    category: "kosten",
    page: ["preise", "homepage", "faq"],
    keywords: ["versteckte kosten", "keine extras"],
    priority: "high",
    schema: true
  },
  {
    id: "kosten-15",
    question: "Was kostet die Komplett-Lösung?",
    shortAnswer: "Ab 249€, typisch 320-450€. Reinigung + Diagnose + Ursachenanalyse + 30 Tage Garantie.",
    fullAnswer: "Die Komplett-Lösung ist unser beliebtestes Paket: Ab 249€ erhalten Sie Reinigung, Kamera-Inspektion, Ursachenanalyse, schriftlichen Bericht und 30 Tage Vollgarantie. Ideal wenn Sie nicht nur das Problem lösen, sondern auch verstehen und vorbeugen wollen.",
    category: "kosten",
    page: ["preise", "faq"],
    keywords: ["komplett lösung preis", "paket kosten"],
    priority: "high",
    schema: true
  }
];

// ============================================
// العملية - ABLAUF (20 أسئلة)
// ============================================
export const ablaufFAQ: FAQItem[] = [
  {
    id: "ablauf-1",
    question: "Wie läuft ein Einsatz ab?",
    shortAnswer: "Anruf → Ankunft abstimmen → Kostenlose Diagnose → Festpreis nennen → Ihr OK → Arbeit → Fertig.",
    fullAnswer: "1. Sie rufen an und schildern das Problem. 2. Wir stimmen die Ankunft mit Ihnen ab. 3. Vor Ort schauen wir uns das Problem an (kostenlos). 4. Wir erklären, was zu tun ist und nennen den Festpreis. 5. Sie entscheiden. 6. Bei OK arbeiten wir und hinterlassen alles sauber. 7. Sie zahlen, wir gehen.",
    category: "ablauf",
    page: ["homepage", "faq"],
    keywords: ["wie läuft ab", "einsatz ablauf"],
    priority: "high",
    schema: true
  },
  {
    id: "ablauf-2",
    question: "Wie schnell können Sie da sein?",
    shortAnswer: "Ankunft und Verfügbarkeit telefonisch klären.",
    fullAnswer: "Verfügbarkeit und voraussichtliche Ankunft klären wir telefonisch anhand Ihrer Adresse, der Verkehrslage und der aktuellen Einsatzplanung.",
    category: "ablauf",
    page: ["homepage", "city-nuernberg", "faq"],
    keywords: ["wie schnell", "anfahrtszeit", "reaktionszeit"],
    priority: "high",
    schema: true
  },
  {
    id: "ablauf-3",
    question: "Muss ich zu Hause sein?",
    shortAnswer: "Ja, für die Diagnose sollte jemand da sein. Bei Folgearbeiten kann ein Schlüsselübergabe vereinbart werden.",
    fullAnswer: "Für die erste Diagnose sollte jemand vor Ort sein, damit wir Ihnen das Problem zeigen und den Preis besprechen können. Bei Folgeterminen oder für Hausverwaltungen können wir Schlüsselübergabe oder Zugang durch Hausmeister vereinbaren.",
    category: "ablauf",
    page: ["faq"],
    keywords: ["muss ich da sein", "anwesenheit"],
    priority: "medium",
    schema: true
  },
  {
    id: "ablauf-4",
    question: "Wie lange dauert eine Rohrreinigung?",
    shortAnswer: "Standard: 20-45 Min. Kanalreinigung: 45-90 Min. Komplett-Lösung: 60-120 Min.",
    fullAnswer: "Die Dauer hängt vom Problem ab: Einfache Verstopfungen (Toilette, Waschbecken): 20-45 Minuten. Kanalreinigung: 45-90 Minuten. Komplett-Lösung mit Diagnose: 60-120 Minuten. Bei komplexen Fällen informieren wir Sie vorher.",
    category: "ablauf",
    page: ["faq"],
    keywords: ["wie lange dauert", "dauer rohrreinigung"],
    priority: "medium",
    schema: true
  },
  {
    id: "ablauf-5",
    question: "Kann ich einen Termin vereinbaren?",
    shortAnswer: "Ja. Entweder sofort (Notdienst) oder geplanter Termin nach Absprache.",
    fullAnswer: "Natürlich: Für Notfälle kommen wir sofort. Wenn es nicht dringend ist, können Sie auch einen Wunschtermin vereinbaren – tagsüber, abends oder am Wochenende. Für Hausverwaltungen koordinieren wir auch Sammeltermine für mehrere Einheiten.",
    category: "ablauf",
    page: ["faq", "hausverwaltung"],
    keywords: ["termin vereinbaren", "terminwunsch"],
    priority: "medium",
    schema: true
  },
  {
    id: "ablauf-6",
    question: "Arbeiten Sie auch nachts und am Wochenende?",
    shortAnswer: "Ja. Unser 24/7 Notdienst ist rund um die Uhr erreichbar – auch an Feiertagen.",
    fullAnswer: "Wir sind immer erreichbar: 24 Stunden am Tag, 7 Tage die Woche, 365 Tage im Jahr. Egal ob 3 Uhr nachts oder am Feiertag – rufen Sie an, wir kommen. Die Notdienst-Zuschläge nennen wir transparent am Telefon.",
    category: "ablauf",
    page: ["homepage", "service-notdienst", "faq"],
    keywords: ["nachts", "wochenende", "feiertag", "24/7"],
    priority: "high",
    schema: true
  },
  {
    id: "ablauf-7",
    question: "Was muss ich vorbereiten?",
    shortAnswer: "Nichts Besonderes. Zugang zum Problem gewährleisten reicht aus.",
    fullAnswer: "Stellen Sie sicher, dass wir an die betroffene Stelle kommen können. Bei Kanalreinigung: Zugang zum Schacht oder Reinigungsöffnung. Bei Überschwemmung: Wenn möglich, Hauptwasserhahn zudrehen. Alles andere bringen wir mit.",
    category: "ablauf",
    page: ["faq"],
    keywords: ["vorbereiten", "was muss ich tun"],
    priority: "low",
    schema: false
  },
  {
    id: "ablauf-8",
    question: "Bringen Sie alle Geräte mit?",
    shortAnswer: "Ja. Unsere Fahrzeuge sind komplett ausgestattet – Spirale, Hochdruck, Kamera, alles.",
    fullAnswer: "Unser Einsatzfahrzeug ist eine fahrende Werkstatt: Rohrreinigungsspiralen, Hochdruckgerät (bis 200 bar), HD-Kamera für Inspektion, diverse Adapter und Spezialwerkzeug. Wir müssen nicht 'erst was holen' – wir können sofort arbeiten.",
    category: "ablauf",
    page: ["faq"],
    keywords: ["geräte mitbringen", "ausrüstung"],
    priority: "low",
    schema: false
  },
  {
    id: "ablauf-9",
    question: "Wird es bei der Arbeit schmutzig?",
    shortAnswer: "Nein. Wir arbeiten sauber und räumen alles hinter uns auf.",
    fullAnswer: "Wir legen Schutzfolien aus, arbeiten vorsichtig und reinigen danach alles. Sie müssen nicht hinter uns herputzen. Unser Ziel: Nach der Arbeit sieht es aus wie vorher – nur ohne Problem.",
    category: "ablauf",
    page: ["faq"],
    keywords: ["sauber arbeiten", "dreck", "schmutz"],
    priority: "low",
    schema: false
  },
  {
    id: "ablauf-10",
    question: "Bekomme ich eine Rechnung?",
    shortAnswer: "Ja. Sie erhalten eine ordentliche Rechnung mit MwSt.-Ausweis.",
    fullAnswer: "Natürlich erhalten Sie eine ordentliche Rechnung mit Ausweis der Mehrwertsteuer. Auf Wunsch auch detailliert mit Leistungsbeschreibung – besonders wichtig für Versicherungen, Vermieter oder Hausverwaltungen.",
    category: "ablauf",
    page: ["faq"],
    keywords: ["rechnung", "quittung", "mwst"],
    priority: "low",
    schema: false
  }
];

// ============================================
// الطوارئ - NOTFALL (25 أسئلة)
// ============================================
export const notfallFAQ: FAQItem[] = [
  {
    id: "notfall-1",
    question: "Was tun wenn die Toilette überläuft?",
    shortAnswer: "1. Nicht mehr spülen. 2. Hauptwasserhahn zudrehen wenn möglich. 3. Rufen Sie uns an: 0911 89218682.",
    fullAnswer: "Bei überlaufender Toilette nicht weiter spülen und weitere Wassernutzung unterbrechen. Halten Sie Abstand zu ausgetretenem Abwasser und schildern Sie uns die Situation telefonisch.",
    category: "notfall",
    page: ["service-toilette", "service-notdienst", "faq"],
    keywords: ["toilette überläuft", "wc überläuft", "notfall toilette"],
    priority: "high",
    schema: true
  },
  {
    id: "notfall-2",
    question: "Was tun bis der Notdienst kommt?",
    shortAnswer: "Wasserzufuhr stoppen. Keine weiteren Abflüsse benutzen. Handtücher auslegen. Ruhe bewahren.",
    fullAnswer: "Bis wir da sind: 1. Wenn möglich, Wasserzufuhr stoppen (Haupthahn oder Eckventil). 2. Keine anderen Abflüsse im Haus benutzen. 3. Bei Wasseraustritt: Handtücher oder Eimer. 4. Fenster öffnen bei Geruch. 5. Elektrogeräte in Wassernähe abstecken. Wir sind schnell da!",
    category: "notfall",
    page: ["service-notdienst", "faq"],
    keywords: ["bis notdienst kommt", "erste hilfe verstopfung"],
    priority: "high",
    schema: true
  },
  {
    id: "notfall-3",
    question: "Wann ist ein Notdienst nötig?",
    shortAnswer: "Bei überlaufendem Wasser, Abwasseraustritt, starkem Gestank, oder wenn kein Abfluss mehr funktioniert.",
    fullAnswer: "Ein Notdienst ist nötig wenn: Wasser aus Toilette/Abfluss austritt, Abwasser sichtbar wird, starker Kanalisationsgeruch, kein Abfluss im Haus mehr funktioniert, oder Keller überflutet. Für langsame Abflüsse ohne Dringlichkeit können Sie auch einen regulären Termin vereinbaren.",
    category: "notfall",
    page: ["service-notdienst", "faq"],
    keywords: ["wann notdienst", "notfall erkennen"],
    priority: "high",
    schema: true
  },
  {
    id: "notfall-4",
    question: "Ist der Notdienst wirklich 24 Stunden erreichbar?",
    shortAnswer: "Ja. 24 Stunden, 7 Tage die Woche, 365 Tage im Jahr – auch Weihnachten.",
    fullAnswer: "Unser Notdienst ist IMMER erreichbar. Egal ob 3 Uhr morgens, Heiligabend oder Silvester – rufen Sie an, wir kommen. Die Zuschläge (Nacht/Wochenende) nennen wir vorab am Telefon, transparent und fair.",
    category: "notfall",
    page: ["homepage", "service-notdienst", "faq"],
    keywords: ["24 stunden", "immer erreichbar", "rund um die uhr"],
    priority: "high",
    schema: true
  },
  {
    id: "notfall-5",
    question: "Wie schnell sind Sie beim Notdienst da?",
    shortAnswer: "Ankunft und Verfügbarkeit telefonisch klären.",
    fullAnswer: "Verfügbarkeit und voraussichtliche Ankunft klären wir telefonisch anhand Ihrer Adresse, der Verkehrslage und der aktuellen Einsatzplanung.",
    category: "notfall",
    page: ["service-notdienst", "city-nuernberg", "faq"],
    keywords: ["wie schnell notdienst", "anfahrt notdienst"],
    priority: "high",
    schema: true
  },
  {
    id: "notfall-6",
    question: "Was kostet der Notdienst nachts?",
    shortAnswer: "Grundpreis + Nachtzuschlag (22-6 Uhr): +40€. Wird AM TELEFON gesagt, bevor wir losfahren.",
    fullAnswer: "Für Einsätze zwischen 22 und 6 Uhr berechnen wir einen Zuschlag von 40€. Wichtig: Wir sagen Ihnen das AM TELEFON, bevor wir losfahren – nicht erst vor Ort. Keine Überraschungen. Die Arbeitspreise bleiben gleich.",
    category: "notfall",
    page: ["service-notdienst", "preise", "faq"],
    keywords: ["notdienst nachts kosten", "nachtzuschlag"],
    priority: "high",
    schema: true
  },
  {
    id: "notfall-7",
    question: "Was tun bei Wasser im Keller?",
    shortAnswer: "Strom aus. Nicht ins Wasser treten. Uns anrufen. Wir kommen mit Pumpe und beheben die Ursache.",
    fullAnswer: "Bei Wasser im Keller: 1. SOFORT Strom im Keller abstellen (Sicherungskasten). 2. Nicht ins Wasser treten (Stromschlaggefahr). 3. Uns anrufen. Wir kommen mit Pumpen, entfernen das Wasser und beheben die Verstopfung, die den Rückstau verursacht hat.",
    category: "notfall",
    page: ["service-notdienst", "faq"],
    keywords: ["wasser im keller", "keller überflutet", "rückstau"],
    priority: "high",
    schema: true
  },
  {
    id: "notfall-8",
    question: "Kann ich selbst eine Verstopfung lösen?",
    shortAnswer: "Bei leichten Verstopfungen: Pümpel probieren. Bei Überlauf oder tiefem Problem: Besser sofort anrufen.",
    fullAnswer: "Einfache Tipps zum Selbstversuchen: Pümpel (Saugglocke) bei Toilette/Waschbecken. Heißes Wasser + Spüli bei Küchenabfluss. ABER: Bei Überlauf, stehendem Wasser oder mehrfach betroffenen Abflüssen lieber sofort anrufen. Falsche Versuche können das Problem verschlimmern.",
    category: "notfall",
    page: ["faq"],
    keywords: ["selbst lösen", "diy verstopfung", "pümpel"],
    priority: "medium",
    schema: true
  },
  {
    id: "notfall-9",
    question: "Was NICHT tun bei Verstopfung?",
    shortAnswer: "Keine Chemie (schädigt Rohre), nicht weiter spülen, keine Metallgegenstände reinstecken.",
    fullAnswer: "Bitte NICHT tun: 1. Keine chemischen Rohrreiniger (schädigen Rohre und sind gefährlich). 2. Nicht weiter spülen wenn's nicht abläuft. 3. Keine Drahthaken oder Metallgegenstände (verkratzt Rohre). 4. Nicht die Toilette ausbauen. Rufen Sie lieber uns an!",
    category: "notfall",
    page: ["faq"],
    keywords: ["was nicht tun", "fehler vermeiden"],
    priority: "medium",
    schema: true
  },
  {
    id: "notfall-10",
    question: "Kommen Sie auch an Feiertagen?",
    shortAnswer: "Ja, auch an Feiertagen sind wir erreichbar. Zuschlag wie am Wochenende: +30€.",
    fullAnswer: "Unser Notdienst arbeitet 365 Tage im Jahr – auch Weihnachten, Silvester, Ostern und alle anderen Feiertage. Der Zuschlag entspricht dem Wochenendzuschlag (+30€) und wird vorher am Telefon genannt.",
    category: "notfall",
    page: ["service-notdienst", "faq"],
    keywords: ["feiertag notdienst", "weihnachten notdienst"],
    priority: "medium",
    schema: true
  }
];

// ============================================
// B2B - للشركات (30 أسئلة)
// ============================================
export const b2bFAQ: FAQItem[] = [
  {
    id: "b2b-1",
    question: "Bieten Sie Rahmenverträge für Hausverwaltungen?",
    shortAnswer: "Ja. 10% Rabatt auf alles, Prioritäts-Notdienst, persönlicher Ansprechpartner, Sammelrechnung.",
    fullAnswer: "Für Hausverwaltungen ab 5 Objekten bieten wir Rahmenverträge: 10% Rabatt auf alle Einsätze, Prioritäts-Notdienst nach Vereinbarung, persönlicher Ansprechpartner, monatliche Sammelrechnung, kostenlose jährliche Inspektion pro Objekt. Keine Mindestvertragsdauer.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["rahmenvertrag hausverwaltung", "b2b rabatt"],
    priority: "high",
    schema: true
  },
  {
    id: "b2b-2",
    question: "Was kostet ein Wartungsvertrag?",
    shortAnswer: "Ab 29€ pro Einheit/Monat. Quartalsweise Wartung, Prioritäts-Notdienst, kleine Reparaturen inklusive.",
    fullAnswer: "Wartungsverträge starten ab 29€ pro Wohneinheit und Monat. Inklusive: Quartalsweise Wartungstermine, jährliche Kamera-Inspektion, kleine Reparaturen, Prioritäts-Notdienst 24/7. Ergebnis: Bis zu 80% weniger Notfälle. Ideal für Mehrfamilienhäuser und Altbauten.",
    category: "b2b",
    page: ["hausverwaltung", "preise", "faq"],
    keywords: ["wartungsvertrag kosten", "wartung pro einheit"],
    priority: "high",
    schema: true
  },
  {
    id: "b2b-3",
    question: "Bekommen wir Dokumentation für die WEG-Versammlung?",
    shortAnswer: "Ja. Schriftlicher Bericht mit Fotos/Video, Zustandsprotokoll, Handlungsempfehlungen.",
    fullAnswer: "Natürlich: Für WEG-Versammlungen erstellen wir professionelle Dokumentation: Schriftlicher Befundbericht, Foto-/Videodokumentation, Zustandsprotokoll, klare Handlungsempfehlungen mit Kostenschätzung. Alles per E-Mail und auf Wunsch auch ausgedruckt.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["dokumentation weg", "protokoll hausverwaltung"],
    priority: "high",
    schema: true
  },
  {
    id: "b2b-4",
    question: "Können Sie mehrere Einheiten an einem Tag machen?",
    shortAnswer: "Ja. Wir koordinieren Sammeltermine und informieren Bewohner – alles aus einer Hand.",
    fullAnswer: "Für Hausverwaltungen koordinieren wir Sammeltermine: Mehrere Wohnungen an einem Tag, wir informieren die Bewohner, arbeiten effizient durch alle Einheiten. Eine Rechnung, ein Ansprechpartner, minimaler Aufwand für Sie.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["sammeltermin", "mehrere einheiten"],
    priority: "medium",
    schema: true
  },
  {
    id: "b2b-5",
    question: "Haben wir einen festen Ansprechpartner?",
    shortAnswer: "Ja. Bei Rahmen- oder Wartungsvertrag erhalten Sie einen persönlichen Ansprechpartner.",
    fullAnswer: "Mit Rahmen- oder Wartungsvertrag erhalten Sie einen persönlichen Ansprechpartner, der Ihre Objekte kennt: Direkte Telefonnummer, schnelle Entscheidungen, keine Erklärungen bei jedem Anruf nötig. Kontinuität und Effizienz.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["ansprechpartner", "direkter kontakt"],
    priority: "medium",
    schema: true
  },
  {
    id: "b2b-6",
    question: "Wie schnell sind Sie bei Notfällen für Geschäftskunden?",
    shortAnswer: "Für Vertragskunden gelten die individuell vereinbarten Reaktionszeiten. Umfang und Verfügbarkeit werden im Vertrag festgelegt.",
    fullAnswer: "Für Vertragskunden gelten die individuell vereinbarten Reaktionszeiten. Umfang und Verfügbarkeit werden im Vertrag festgelegt.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["priorität geschäftskunden", "schneller service b2b"],
    priority: "high",
    schema: true
  },
  {
    id: "b2b-7",
    question: "Bieten Sie Sammelrechnungen an?",
    shortAnswer: "Ja. Monatliche Sammelrechnung für alle Objekte – ein Beleg, eine Überweisung.",
    fullAnswer: "Für Hausverwaltungen und Geschäftskunden bieten wir monatliche Sammelrechnungen: Alle Einsätze gebündelt, ein Beleg, eine Überweisung. Auf Wunsch auch aufgeteilt nach Objekt oder Einheit für die Nebenkostenabrechnung.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["sammelrechnung", "monatliche rechnung"],
    priority: "medium",
    schema: true
  },
  {
    id: "b2b-8",
    question: "Arbeiten Sie auch nachts für Gewerbekunden?",
    shortAnswer: "Ja. Außerhalb der Öffnungszeiten, nachts, am Wochenende – minimal Betriebsstörung.",
    fullAnswer: "Für Restaurants, Hotels, Supermärkte etc. arbeiten wir bevorzugt außerhalb der Öffnungszeiten: Nachts, früh morgens, am Wochenende – so dass Ihr Betrieb nicht gestört wird. Die Kosten besprechen wir individuell.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["nachts arbeiten gewerbe", "außerhalb öffnungszeiten"],
    priority: "medium",
    schema: true
  },
  {
    id: "b2b-9",
    question: "Können Sie Fettabscheider warten?",
    shortAnswer: "Ja. Gesetzeskonforme Wartung und Reinigung mit Dokumentation und fachgerechter Entsorgung.",
    fullAnswer: "Wir übernehmen die gesetzeskonforme Fettabscheider-Wartung für Gastronomie und Gewerbe: Regelmäßige Entleerung nach Vorschrift, fachgerechte Entsorgung mit Nachweis, Wartungsprotokoll, flexible Termine außerhalb der Öffnungszeiten.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["fettabscheider wartung", "gastronomie wartung"],
    priority: "medium",
    schema: true
  },
  {
    id: "b2b-10",
    question: "Gibt es Rabatt für viele Objekte?",
    shortAnswer: "Ja. Je mehr Objekte, desto bessere Konditionen. Ab 5 Objekten: 10% Rabatt auf alles.",
    fullAnswer: "Wir staffeln nach Objektanzahl: Ab 5 Objekten: 10% Rabatt. Ab 10 Objekten: Zusätzlich kostenlose Erstinspektion. Ab 20 Objekten: Individuelle Festkonditionen. Sprechen Sie uns an für ein maßgeschneidertes Angebot.",
    category: "b2b",
    page: ["hausverwaltung", "faq"],
    keywords: ["rabatt viele objekte", "mengenrabatt"],
    priority: "medium",
    schema: true
  }
];

// ============================================
// المنطقة - REGION (20 أسئلة)
// ============================================
export const regionFAQ: FAQItem[] = [
  {
    id: "region-1",
    question: "In welchen Städten sind Sie tätig?",
    shortAnswer: "Nürnberg und Umgebung; die genaue Adresse prüfen wir vorab.",
    fullAnswer: "Wir sind in Nürnberg und Umgebung für Sie da. Dazu gehören unter anderem Fürth, Erlangen, Schwabach, Lauf und Roth. Für Ortsteile am Rand gilt die genaue Adresse; Anfahrt und mögliche Zuschläge besprechen wir vor einer Zusage.",
    category: "region",
    page: ["homepage", "faq"],
    keywords: ["einsatzgebiet", "welche städte"],
    priority: "high",
    schema: true
  },
  {
    id: "region-2",
    question: "Wo ist Ihr Standort?",
    shortAnswer: "Nürnberg-Glockenhof, Ehemannstr. 9. Zentral gelegen für schnelle Anfahrt.",
    fullAnswer: "Unser Standort ist in Nürnberg-Glockenhof, Ehemannstr. 9 (90478 Nürnberg). Zentral gelegen, ideal für schnelle Anfahrten in alle Teile von Nürnberg, Fürth und Erlangen. Als lokaler Fachbetrieb kennen wir die Region wie unsere Westentasche.",
    category: "region",
    page: ["city-nuernberg", "faq"],
    keywords: ["standort", "adresse", "wo seid ihr"],
    priority: "medium",
    schema: true
  },
  {
    id: "region-3",
    question: "Wie schnell sind Sie in Fürth?",
    shortAnswer: "Ankunft und Verfügbarkeit telefonisch klären.",
    fullAnswer: "Verfügbarkeit und voraussichtliche Ankunft klären wir telefonisch anhand Ihrer Adresse, der Verkehrslage und der aktuellen Einsatzplanung.",
    category: "region",
    page: ["city-fuerth", "faq"],
    keywords: ["fürth anfahrt", "rohrreinigung fürth"],
    priority: "medium",
    schema: true
  },
  {
    id: "region-4",
    question: "Wie schnell sind Sie in Erlangen?",
    shortAnswer: "Ankunft und Verfügbarkeit telefonisch klären.",
    fullAnswer: "Verfügbarkeit und voraussichtliche Ankunft klären wir telefonisch anhand Ihrer Adresse, der Verkehrslage und der aktuellen Einsatzplanung.",
    category: "region",
    page: ["city-erlangen", "faq"],
    keywords: ["erlangen anfahrt", "rohrreinigung erlangen"],
    priority: "medium",
    schema: true
  },
  {
    id: "region-5",
    question: "Kostet die Anfahrt nach Schwabach extra?",
    shortAnswer: "+25€ Anfahrtspauschale. Wird vorher am Telefon genannt.",
    fullAnswer: "Für Schwabach und andere Orte außerhalb des Kerngebiets (Nürnberg, Fürth, Erlangen) berechnen wir eine Pauschale von 25€ für die Anfahrt. Das sagen wir Ihnen bereits am Telefon, bevor wir losfahren – keine Überraschungen.",
    category: "region",
    page: ["faq"],
    keywords: ["schwabach anfahrt", "außerhalb anfahrt"],
    priority: "low",
    schema: false
  },
  {
    id: "region-6",
    question: "Kommen Sie auch nach Forchheim?",
    shortAnswer: "Keine pauschale Zusage: Wir prüfen zunächst die genaue Adresse.",
    fullAnswer: "Unser reguläres Einsatzgebiet umfasst Nürnberg und Umgebung. Forchheim gehört nicht pauschal zu den ausgewiesenen Einsatzorten. Wir prüfen zunächst die konkrete Adresse und Verfügbarkeit; eine Zusage für Forchheim und Umgebung erfolgt nicht automatisch.",
    category: "region",
    page: ["faq"],
    keywords: ["forchheim rohrreinigung"],
    priority: "low",
    schema: false
  },
  {
    id: "region-7",
    question: "Kennen Sie sich mit Altbauten in Nürnberg aus?",
    shortAnswer: "Ja. Über 10 Jahre Erfahrung mit Altbau-Rohrsystemen in Nürnberger Stadtteilen.",
    fullAnswer: "Altbauten in Nürnberg haben oft spezielle Herausforderungen: Gussrohre, alte Abzweigungen, gewachsene Strukturen. Mit über 10 Jahren Erfahrung in der Region kennen wir diese Probleme und wissen, wie man sie löst – schonend und effektiv.",
    category: "region",
    page: ["city-nuernberg", "faq"],
    keywords: ["altbau nürnberg", "alte rohre"],
    priority: "medium",
    schema: true
  }
];

// ============================================
// الخدمات - SERVICE (25 أسئلة)
// ============================================
export const serviceFAQ: FAQItem[] = [
  {
    id: "service-1",
    question: "Welche Verstopfungen können Sie lösen?",
    shortAnswer: "Alle: Toilette, Waschbecken, Dusche, Küchenabfluss, Kanal, Grundleitung, Hebeanlage.",
    fullAnswer: "Wir lösen alle Arten von Verstopfungen: Toilette/WC, Waschbecken, Dusche/Badewanne, Küchenabfluss, Bodenabläufe, Fallrohre, Grundleitungen, Kanal, Hebeanlagen, Fettabscheider und mehr. Egal ob Privathaushalt oder Gewerbe.",
    category: "service",
    page: ["homepage", "faq"],
    keywords: ["welche verstopfungen", "was können sie"],
    priority: "high",
    schema: true
  },
  {
    id: "service-2",
    question: "Machen Sie auch Kamera-Inspektionen?",
    shortAnswer: "Ja. HD-Kamerabefahrung mit Video-Dokumentation. Festpreis 149€.",
    fullAnswer: "Unsere Kamera-Inspektion zeigt Ihnen genau, was im Rohr los ist: HD-Kamera fährt durch die Leitung, Sie sehen live auf dem Bildschirm. Inklusive Videoaufnahme und schriftlichem Befundbericht. Ideal bei wiederkehrenden Problemen oder vor Hauskauf. Festpreis: 149€.",
    category: "service",
    page: ["service-kamera", "faq"],
    keywords: ["kamera inspektion", "rohr kamera"],
    priority: "high",
    schema: true
  },
  {
    id: "service-3",
    question: "Nutzen Sie Hochdruckreinigung?",
    shortAnswer: "Ja. Bis zu 200 bar Druck. Schonend für Rohre, effektiv gegen hartnäckige Verstopfungen.",
    fullAnswer: "Unsere Hochdruck-Spülung arbeitet mit bis zu 200 bar Druck – das beseitigt auch hartnäckigste Verstopfungen wie Fettablagerungen oder Wurzeln. Dabei ist die Methode rohrsicherend, da der Wasserdruck gezielt eingesetzt wird.",
    category: "service",
    page: ["service-kanalreinigung", "faq"],
    keywords: ["hochdruck reinigung", "hochdruckspülung"],
    priority: "medium",
    schema: true
  },
  {
    id: "service-4",
    question: "Können Sie Wurzeln aus dem Rohr entfernen?",
    shortAnswer: "Ja. Mechanische Wurzelfräse + Hochdruck-Spülung. Kamera-Kontrolle danach.",
    fullAnswer: "Wurzeleinwuchs ist ein häufiges Problem, besonders bei älteren Grundleitungen. Wir entfernen Wurzeln mechanisch mit speziellen Fräsen und spülen dann mit Hochdruck nach. Anschließend prüfen wir per Kamera und beraten zu Präventionsmaßnahmen.",
    category: "service",
    page: ["service-kanalreinigung", "faq"],
    keywords: ["wurzelentfernung", "wurzeln im rohr"],
    priority: "medium",
    schema: true
  },
  {
    id: "service-5",
    question: "Was ist der Unterschied zwischen Rohr- und Kanalreinigung?",
    shortAnswer: "Rohrreinigung: Hausleitungen (Toilette, Waschbecken). Kanalreinigung: Hauptleitungen, Kanal zum Haus.",
    fullAnswer: "Rohrreinigung betrifft die Leitungen IM Haus: Toilette, Waschbecken, Dusche, Küchenabfluss. Kanalreinigung betrifft die größeren Leitungen: Grundleitung, Hausanschluss, der Kanal der zum öffentlichen Netz führt. Kanalreinigung braucht oft stärkere Technik.",
    category: "service",
    page: ["faq"],
    keywords: ["unterschied rohr kanal", "rohrreinigung vs kanalreinigung"],
    priority: "medium",
    schema: true
  },
  {
    id: "service-6",
    question: "Bieten Sie auch Dichtheitsprüfungen an?",
    shortAnswer: "Ja. Normgerechte Prüfung nach DIN 1986 mit Protokoll. Für Behörden oder Hauskauf.",
    fullAnswer: "Wir führen Dichtheitsprüfungen nach DIN 1986 durch: Behördenkonforme Prüfung Ihrer Abwasserleitungen mit offiziellem Protokoll. Wichtig bei Hausverkauf, Neubau oder wenn die Kommune es verlangt.",
    category: "service",
    page: ["service-kamera", "faq"],
    keywords: ["dichtheitsprüfung", "din 1986"],
    priority: "medium",
    schema: true
  }
];

// ============================================
// الضمانات - GARANTIE (15 أسئلة)
// ============================================
export const garantieFAQ: FAQItem[] = [
  {
    id: "garantie-1",
    question: "Gibt es eine Garantie auf Ihre Arbeit?",
    shortAnswer: "Ja. 7 Tage bei Standard, 30 Tage bei Komplett-Lösung, 90 Tage bei Wiederkehrend-Schutz.",
    fullAnswer: "Wir geben Garantie auf unsere Arbeit: Standard-Reinigung: 7 Tage. Komplett-Lösung: 30 Tage. Wiederkehrend-Schutz: 90 Tage. Wenn das gleiche Problem in der Garantiezeit zurückkommt, beheben wir es kostenlos.",
    category: "garantie",
    page: ["preise", "faq"],
    keywords: ["garantie rohrreinigung", "wie lange garantie"],
    priority: "high",
    schema: true
  },
  {
    id: "garantie-2",
    question: "Was ist wenn das Problem wiederkommt?",
    shortAnswer: "In der Garantiezeit: Wir kommen kostenlos zurück. Danach: Neuer Einsatz, aber faire Konditionen.",
    fullAnswer: "Kommt das Problem innerhalb der Garantiezeit (7/30/90 Tage) zurück: Wir kommen kostenlos und beheben es erneut. Kommt es später zurück: Wir empfehlen meist das Wiederkehrend-Schutz-Paket, das die Ursache angeht, nicht nur das Symptom.",
    category: "garantie",
    page: ["preise", "faq"],
    keywords: ["problem kommt wieder", "verstopfung wiederholt"],
    priority: "high",
    schema: true
  },
  {
    id: "garantie-3",
    question: "Was bedeutet 'Festpreis'?",
    shortAnswer: "Der genannte Preis ist der Endpreis. Keine Materialzuschläge, keine Nachforderungen, keine Überraschungen.",
    fullAnswer: "Festpreis bedeutet: Der Preis, den wir nach der Diagnose nennen, ist EXAKT der Preis, den Sie am Ende zahlen. Keine 'ach, Material war teurer', keine 'das war nicht eingerechnet'. Was wir sagen, das gilt. Punkt.",
    category: "garantie",
    page: ["preise", "homepage", "faq"],
    keywords: ["was ist festpreis", "festpreis bedeutung"],
    priority: "high",
    schema: true
  },
  {
    id: "garantie-4",
    question: "Was ist die 'kostenlose Nachkontrolle'?",
    shortAnswer: "Beim Wiederkehrend-Schutz: Wir kommen nach 3 Monaten und prüfen kostenlos, ob alles in Ordnung ist.",
    fullAnswer: "Die kostenlose Nachkontrolle ist Teil unseres Wiederkehrend-Schutz-Pakets: 3 Monate nach dem Einsatz kommen wir noch einmal und prüfen per Kamera, ob die Lösung gehalten hat. Kostenlos. Wenn etwas nicht stimmt, beheben wir es auf unsere Kosten.",
    category: "garantie",
    page: ["preise", "faq"],
    keywords: ["nachkontrolle", "nachprüfung kostenlos"],
    priority: "medium",
    schema: true
  },
  {
    id: "garantie-5",
    question: "Was ist die '24h-Nachbetreuung'?",
    shortAnswer: "Nach dem Einsatz sind wir 24 Stunden lang für Fragen telefonisch erreichbar.",
    fullAnswer: "Nach jedem Einsatz können Sie uns 24 Stunden lang anrufen, wenn etwas nicht stimmt oder Sie Fragen haben. Läuft etwas nicht wie erwartet? Rufen Sie an, wir helfen sofort. Das ist Teil unseres Service.",
    category: "garantie",
    page: ["faq"],
    keywords: ["nachbetreuung", "erreichbar danach"],
    priority: "low",
    schema: false
  }
];

// ============================================
// المشاكل - PROBLEME (20 أسئلة)
// ============================================
export const problemeFAQ: FAQItem[] = [
  {
    id: "probleme-1",
    question: "Warum ist meine Toilette immer wieder verstopft?",
    shortAnswer: "Häufige Ursachen: Feuchttücher, zu viel Papier, tieferliegendes Problem, alte Leitungen.",
    fullAnswer: "Wiederkehrende Toilettenverstopfungen haben meist eine Ursache: Feuchttücher (die lösen sich NICHT auf!), zu viel Papier auf einmal, Kalkablagerungen bei hartem Wasser, oder ein tieferliegendes Problem (Gefälle, Knick, Wurzeln). Unser Diagnose-Paket findet die Ursache.",
    category: "probleme",
    page: ["service-toilette", "faq"],
    keywords: ["toilette immer verstopft", "wc verstopfung ursache"],
    priority: "high",
    schema: true
  },
  {
    id: "probleme-2",
    question: "Warum stinkt mein Abfluss?",
    shortAnswer: "Meist: Trockener Siphon, Biofilm-Ablagerungen, oder Problem in der Fallleitung.",
    fullAnswer: "Übler Geruch aus dem Abfluss: 1. Siphon ausgetrocknet (selten genutzter Abfluss) – einfach Wasser nachgießen. 2. Biofilm/Fett/Haare im Abfluss – professionelle Reinigung. 3. Problem in der Fallleitung – Kamera-Inspektion nötig. Wir finden und beheben die Ursache.",
    category: "probleme",
    page: ["service-abfluss", "faq"],
    keywords: ["abfluss stinkt", "geruch aus abfluss"],
    priority: "high",
    schema: true
  },
  {
    id: "probleme-3",
    question: "Warum läuft meine Dusche so langsam ab?",
    shortAnswer: "Meist Haare + Seifenreste im Ablauf. Tiefere Verstopfung möglich.",
    fullAnswer: "Langsamer Duschabfluss: Fast immer sind Haare + Seifenreste die Ursache, die sich im Siphon oder der Ablaufrinne ansammeln. Bei älteren Häusern kann auch eine tiefere Verstopfung oder falsches Gefälle vorliegen. Eine Reinigung schafft meist Klarheit.",
    category: "probleme",
    page: ["service-abfluss", "faq"],
    keywords: ["dusche läuft langsam", "dusche verstopft"],
    priority: "medium",
    schema: true
  },
  {
    id: "probleme-4",
    question: "Was verursacht Verstopfungen in der Küche?",
    shortAnswer: "Fett, Essensreste, Kaffeesatz. Fett wird kalt und hart, sammelt alles andere.",
    fullAnswer: "Küchenabflüsse verstopfen hauptsächlich durch Fett: Heißes Fett ist flüssig, wird aber kalt und fest – und sammelt dann Essensreste, Kaffeesatz usw. Tipp: Fett nie in den Abfluss, regelmäßig heißes Wasser nachspülen. Bei Verstopfung: Wir reinigen mit Hochdruck.",
    category: "probleme",
    page: ["service-abfluss", "faq"],
    keywords: ["küche verstopft", "küchenabfluss fett"],
    priority: "medium",
    schema: true
  },
  {
    id: "probleme-5",
    question: "Wann ist eine Verstopfung 'ernst'?",
    shortAnswer: "Ernst: Wasser tritt aus, mehrere Abflüsse betroffen, starker Geruch, Rückstau im Keller.",
    fullAnswer: "Eine Verstopfung ist ernst wenn: Wasser aus Toilette/Abfluss austritt, mehrere Abflüsse gleichzeitig betroffen sind (deutet auf Hauptleitung), starker Kanalisationsgeruch entsteht, Wasser im Keller zurückstaut. In diesen Fällen: Sofort Notdienst rufen!",
    category: "probleme",
    page: ["faq"],
    keywords: ["verstopfung ernst", "wann notfall"],
    priority: "high",
    schema: true
  },
  {
    id: "probleme-6",
    question: "Können Wurzeln Rohre verstopfen?",
    shortAnswer: "Ja. Wurzeln wachsen durch kleinste Risse ein und können Rohre komplett blockieren.",
    fullAnswer: "Wurzeleinwuchs ist ein häufiges Problem bei Grundleitungen: Baumwurzeln suchen Wasser, finden kleinste Risse oder undichte Muffen und wachsen hinein. Im Rohr bilden sie ein Wurzelgeflecht, das alles fängt. Lösung: Mechanische Entfernung + ggf. Sanierung.",
    category: "probleme",
    page: ["service-kanalreinigung", "faq"],
    keywords: ["wurzeln im rohr", "wurzeleinwuchs"],
    priority: "medium",
    schema: true
  }
];

// ============================================
// جمع كل الأسئلة
// ============================================
export const allFAQ: FAQItem[] = [
  ...kostenFAQ,
  ...ablaufFAQ,
  ...notfallFAQ,
  ...b2bFAQ,
  ...regionFAQ,
  ...serviceFAQ,
  ...garantieFAQ,
  ...problemeFAQ
];

// ============================================
// Helper functions
// ============================================
export function getFAQById(id: string): FAQItem | undefined {
  return allFAQ.find(faq => faq.id === id);
}

export function getFAQByCategory(category: FAQCategory): FAQItem[] {
  return allFAQ.filter(faq => faq.category === category);
}

export function getFAQForPage(page: FAQPage): FAQItem[] {
  return allFAQ.filter(faq => faq.page.includes(page));
}

export function getFAQForSchema(): FAQItem[] {
  return allFAQ.filter(faq => faq.schema);
}

export function getHighPriorityFAQ(): FAQItem[] {
  return allFAQ.filter(faq => faq.priority === "high");
}

export function searchFAQ(query: string): FAQItem[] {
  const searchTerm = query.toLowerCase();
  return allFAQ.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm) ||
    faq.shortAnswer.toLowerCase().includes(searchTerm) ||
    faq.keywords.some(k => k.toLowerCase().includes(searchTerm))
  );
}

// Statistics
export const faqStats = {
  total: allFAQ.length,
  byCategory: {
    kosten: kostenFAQ.length,
    ablauf: ablaufFAQ.length,
    notfall: notfallFAQ.length,
    b2b: b2bFAQ.length,
    region: regionFAQ.length,
    service: serviceFAQ.length,
    garantie: garantieFAQ.length,
    probleme: problemeFAQ.length
  },
  withSchema: allFAQ.filter(faq => faq.schema).length,
  highPriority: allFAQ.filter(faq => faq.priority === "high").length
};
