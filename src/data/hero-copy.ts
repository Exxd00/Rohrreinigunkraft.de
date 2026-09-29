/** Customer-facing introductions. Technical preparation stays in the page body. */
const localCopy: Record<string, { benefit: string; intro: string }> = {
  rohrreinigung: { benefit: "Damit Ihr Alltag wieder läuft.", intro: "Das Wasser steht oder die Verstopfung kommt immer wieder? Wir prüfen die Ursache, besprechen die passende Reinigung und nennen den Preis, bevor die Arbeit beginnt." },
  kanalreinigung: { benefit: "Rückstau angehen. Durchfluss wiederherstellen.", intro: "Abwasser drückt zurück oder mehrere Abläufe sind betroffen? Wir kümmern uns um die Reinigung Ihrer privaten Kanal- und Grundleitungen – mit einem Verfahren, das zum Befund passt." },
  abflussreinigung: { benefit: "Wasser soll ablaufen. Nicht Ihren Tag aufhalten.", intro: "Küche, Dusche oder Waschbecken verstopft? Beschreiben Sie uns das Problem. Wir besprechen die Hilfe vor Ort und reinigen den betroffenen Ablauf nach Prüfung der Ursache." },
  "rohrreinigung-notdienst": { benefit: "Bei Rückstau zählt der nächste richtige Schritt.", intro: "Wasser steigt oder Abwasser tritt aus? Rufen Sie uns an. Wir nehmen Ihr Anliegen rund um die Uhr auf und klären mit Ihnen die aktuelle Verfügbarkeit und voraussichtliche Ankunft." },
  "kamera-inspektion": { benefit: "Sehen, was in Ihrer Leitung los ist.", intro: "Die Verstopfung kommt zurück und die Ursache bleibt unklar? Eine Kamerainspektion macht den zugänglichen Leitungsabschnitt sichtbar und schafft eine Grundlage für die nächsten Schritte." },
  dichtheitspruefung: { benefit: "Klarheit über den Zustand Ihrer Leitung.", intro: "Sie benötigen eine Prüfung Ihrer Abwasserleitung? Wir besprechen Anlass, Prüfverfahren und Dokumentation, damit der Auftrag zu Ihrem Objekt und dem benötigten Nachweis passt." },
  rohrsanierung: { benefit: "Den Schaden kennen. Die passende Lösung wählen.", intro: "Eine beschädigte Leitung muss gezielt beurteilt werden. Wir besprechen den Befund und geeignete Reparaturmöglichkeiten, bevor Sie sich für eine Maßnahme entscheiden." },
  "rohrreinigung-wartung": { benefit: "Leitungen im Blick. Wartung mit Plan.", intro: "Wiederkehrende Störungen kosten Zeit und Nerven. Wir planen Reinigung und Kontrolle passend zu Ihrem Objekt – mit abgestimmtem Umfang und nachvollziehbarer Dokumentation." },
};

export function getServiceHeroCopy(service: { slug: string; name: string; category?: string; shortDescription?: string }) {
  const exact = localCopy[service.slug];
  if (exact) return exact;
  const categorySlug: Record<string, string> = { Rohrreinigung: "rohrreinigung", Kanalreinigung: "kanalreinigung", Abflussreinigung: "abflussreinigung", Notdienst: "rohrreinigung-notdienst", Inspektion: "kamera-inspektion", Sanierung: "rohrsanierung", Wartung: "rohrreinigung-wartung" };
  const category = localCopy[categorySlug[service.category ?? ""] ?? ""];
  return {
    benefit: category?.benefit ?? "Ihr Anliegen. Ein klarer nächster Schritt.",
    intro: `${service.shortDescription?.replace(/[.!?]+$/, "") ?? service.name}. Schildern Sie uns Ihr Anliegen. Wir klären, welche Leistung für Ihr Objekt sinnvoll ist, und stimmen Umfang und Preis vor Arbeitsbeginn mit Ihnen ab.`,
  };
}

export function getCityHeroIntro(cityName: string) {
  return `Abfluss verstopft, Rohr dicht oder Rückstau im Haus? Rohrreinigung Kraft hilft Ihnen in ${cityName}. Am Telefon klären wir die aktuelle Verfügbarkeit; vor Arbeitsbeginn besprechen wir die Lösung und den Preis.`;
}
