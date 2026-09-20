/** Eight distinct jobs, rather than multiplying synonymous symptom pages. */
export const localServices = [
  {
    slug: "rohrreinigung",
    name: "Rohrreinigung",
    label: "Leitung wieder frei bekommen",
    intro:
      "Wenn mehrere Entwässerungsstellen träge ablaufen oder die Verstopfung wiederkommt, reicht eine Behandlung des sichtbaren Abflusses oft nicht. Wir grenzen zuerst ein, welcher Leitungsabschnitt betroffen ist.",
    question:
      "Ist nur eine Wohnung betroffen oder staut es sich auch in anderen Etagen?",
    preparation:
      "Notieren Sie, an welchen Stellen Wasser stehen bleibt und ob andere Bewohner dasselbe beobachten. Ein zugänglicher Revisionsverschluss hilft, den Eingriff auf den betroffenen Abschnitt zu begrenzen.",
    method:
      "Spirale oder Spültechnik werden nach Zugänglichkeit, Rohrmaterial und Befund gewählt. Eine Reinigung soll den freien Querschnitt herstellen; ein Rohrschaden wird dadurch nicht repariert.",
    result:
      "Gemeinsam prüfen wir den Ablauf mit Wasser. Bleibt die Ursache unklar oder tritt die Störung erneut auf, besprechen wir eine Kameraprüfung als eigenen Arbeitsschritt.",
    stop: "Bei steigendem Wasserstand keine weiteren Abflüsse benutzen. Bereits verwendete Reinigungsmittel unbedingt vor Arbeitsbeginn nennen.",
    scope:
      "Abwasserleitungen innerhalb des Gebäudes und zugängliche Anschlussabschnitte",
    related: [
      "toilette-verstopft",
      "fallrohr-verstopft",
      "grundleitung-verstopft",
    ],
  },
  {
    slug: "kanalreinigung",
    name: "Kanalreinigung",
    label: "Grund- und Sammelleitungen reinigen",
    intro:
      "Rückstau über mehrere Abläufe kann auf einen tiefer liegenden Abschnitt hinweisen. Für die Kanalreinigung sind der Zugang zur Leitung und der Verlauf auf dem Grundstück entscheidend.",
    question:
      "Wo liegen Revisionsschacht und Übergang zur öffentlichen Entwässerung?",
    preparation:
      "Halten Sie vorhandene Entwässerungspläne bereit und zeigen Sie Schachtdeckel sowie Zufahrt. Öffnen oder betreten Sie Schächte nicht selbst. Bei gemeinsamer Grundstücksentwässerung brauchen wir einen Ansprechpartner für den Zugang.",
    method:
      "Wir klären den betroffenen Abschnitt und wählen die Reinigung passend zu Durchmesser und Zustand. Ein vorhandener Wurzeleinwuchs erfordert eine gesonderte Bewertung; allein das Entfernen der Wurzeln beseitigt keine undichte Verbindung.",
    result:
      "Der gereinigte Abschnitt wird auf freien Durchfluss kontrolliert. Bei wiederkehrenden Ablagerungen kann eine dokumentierte Kamerabefahrung helfen, Reinigung und Reparatur voneinander abzugrenzen.",
    stop: "Abwasser aus dem Straßenraum oder mehreren Grundstücken bitte mit Standort melden. Arbeiten am öffentlichen Netz müssen mit dem zuständigen Betreiber abgestimmt werden.",
    scope: "Private Grundleitungen, Sammelleitungen und zugängliche Schächte",
    related: ["kanalspuelung", "wurzelentfernung", "schachtreinigung"],
  },
  {
    slug: "abflussreinigung",
    name: "Abflussreinigung",
    label: "Küche, Bad und Dusche entlasten",
    intro:
      "Ein einzelner langsamer Ablauf braucht eine andere Fehlersuche als Rückstau im ganzen Haus. Wir beginnen an der betroffenen Entwässerungsstelle und verfolgen die Störung nur so weit wie nötig.",
    question:
      "Welcher Ablauf ist betroffen und läuft Wasser an anderer Stelle zurück?",
    preparation:
      "Benennen Sie Waschbecken, Dusche, WC oder Küche möglichst genau. Räumen Sie den Bereich vor dem Anschluss frei und teilen Sie mit, ob ein Siphon schon demontiert oder ein Mittel eingefüllt wurde.",
    method:
      "Nach Sichtprüfung unterscheiden wir zwischen einer Störung am Geruchsverschluss, in der Anschlussleitung und weiter hinten im Rohr. Das Verfahren richtet sich nach dem Bauteil; zusätzliche Demontage wird vorher besprochen.",
    result:
      "Zum Abschluss prüfen wir Ablauf und zugängliche Verbindungen. Tritt Geruch trotz freiem Abfluss weiter auf, kann die Ursache am Geruchsverschluss oder an der Belüftung liegen und braucht eine andere Maßnahme.",
    stop: "Steigt das Wasser nach, stoppen Sie die Nutzung. Mischen Sie keine Reinigungsmittel und weisen Sie den Techniker auf vorhandene Chemikalien hin.",
    scope: "Einzelne Entwässerungsstellen und ihre Anschlussleitungen",
    related: [
      "kueche-abfluss-verstopft",
      "dusche-verstopft",
      "waschbecken-verstopft",
    ],
  },
  {
    slug: "rohrreinigung-notdienst",
    name: "Rohrreinigung Notdienst",
    label: "Akuten Rückstau einschätzen",
    intro:
      "Bei austretendem Abwasser zählt zuerst die richtige Einschätzung: Kommt weiterhin Wasser nach, welche Räume sind betroffen und lässt sich die Nutzung unterbrechen? Diese Angaben helfen uns, den Einsatz zu priorisieren.",
    question:
      "Tritt gerade Abwasser aus oder ist der Ablauf lediglich langsam?",
    preparation:
      "Nennen Sie den aktuellen Wasserstand, betroffene Etagen und eine erreichbare Person am Objekt. Informieren Sie andere Nutzer, wenn deren Wasser in den gestörten Abschnitt fließen kann.",
    method:
      "Am Telefon besprechen wir die Dringlichkeit, die tatsächliche Verfügbarkeit und die voraussichtliche Ankunft. Vor Ort wird der Umfang eingegrenzt und der Preis vor Arbeitsbeginn abgestimmt.",
    result:
      "Ziel ist zunächst, den akuten Rückstau zu beseitigen. Falls ein Schaden bleibt, erklären wir die nächsten Schritte getrennt vom Notdiensteinsatz. Eine pauschale Ankunftsgarantie aus einer Kilometerangabe gibt es nicht.",
    stop: "Bei Gefahr durch Strom, stark eindringendes Wasser oder eine gefährdete Person Abstand halten und 112 verständigen. Einen überfluteten Keller nicht betreten.",
    scope:
      "Akute Verstopfung und Abwasserrückstau; telefonische Aufnahme rund um die Uhr",
    related: [
      "rueckstau-notdienst",
      "toilette-laeuft-ueber",
      "abwasser-tritt-aus",
    ],
  },
  {
    slug: "kamera-inspektion",
    name: "Kamera-Inspektion",
    label: "Ursache und Leitungszustand ansehen",
    intro:
      "Wiederkehrende Verstopfungen sollten nicht jedes Mal ohne Ursachenklärung behandelt werden. Eine Kamerabefahrung kann sichtbare Hindernisse und Schäden lokalisieren, sofern die Leitung zugänglich und ausreichend frei ist.",
    question:
      "Soll eine konkrete Schadstelle gefunden oder ein ganzer Leitungsabschnitt dokumentiert werden?",
    preparation:
      "Bringen Sie alte Befahrungsberichte oder Pläne mit. Sagen Sie, ob es um einen wiederkehrenden Rückstau, eine Kaufentscheidung oder die Vorbereitung einer Reparatur geht.",
    method:
      "Wir vereinbaren Startpunkt, Umfang und gewünschte Dokumentation. Ist das Rohr verschmutzt oder voll Wasser, kann vor der Aufnahme eine Reinigung erforderlich sein; dieser Aufwand wird gesondert besprochen.",
    result:
      "Die sichtbaren Befunde werden erläutert. Eine Kameraaufnahme ersetzt weder automatisch eine Dichtheitsprüfung noch den Nachweis, dass verdeckte Bereiche mängelfrei sind.",
    stop: "Für einen verwertbaren Befund den Zugang nicht verdecken und bekannte Rohrverläufe mitteilen. Eine gewünschte Ortung oder Aufzeichnung bitte bereits bei der Terminvereinbarung nennen.",
    scope:
      "Zugängliche Abwasserleitungen; Befund, Strecke und Dokumentationsumfang nach Vereinbarung",
    related: ["kanalbefahrung", "rohrortung", "schadensanalyse"],
  },
  {
    slug: "dichtheitspruefung",
    name: "Dichtheitsprüfung",
    label: "Prüfumfang und Nachweis abstimmen",
    intro:
      "Eine Dichtheitsprüfung beginnt mit der Frage, welcher Nachweis tatsächlich benötigt wird. Die Anforderungen unterscheiden sich nach Anlage, Anlass und zuständiger Stelle; ein allgemeiner Prüftext ersetzt diese Klärung nicht.",
    question:
      "Wer fordert den Nachweis an und welche Leitung soll geprüft werden?",
    preparation:
      "Halten Sie die konkrete schriftliche Anforderung, den Entwässerungsplan und vorhandene Prüfprotokolle bereit. So lässt sich klären, ob Verfahren, Zugang und Dokumentation zum Auftrag passen.",
    method:
      "Prüfabschnitt, Verfahren und Voraussetzungen werden vorab abgestimmt. Eine erforderliche Reinigung oder Kamerabefahrung ist ein eigener Bestandteil des Angebots und wird nicht stillschweigend vorausgesetzt.",
    result:
      "Vereinbart werden ein nachvollziehbarer Befund und der passende Dokumentationsumfang. Eine behördliche Anerkennung versprechen wir erst nach Klärung der konkreten Anforderung.",
    stop: "Aus dem Wohnort allein lässt sich keine allgemeine Prüfpflicht oder Frist ableiten. Maßgeblich sind die für Ihre Anlage geltenden Vorgaben und die zuständige Stelle.",
    scope:
      "Private Grundstücksentwässerung nach Prüfung des geforderten Nachweises",
    related: [
      "dichtigkeitspruefung-abwasser",
      "zustandserfassung",
      "kanalinspektion",
    ],
  },
  {
    slug: "rohrsanierung",
    name: "Rohrsanierung",
    label: "Reparatur nach dokumentiertem Befund",
    intro:
      "Eine beschädigte Leitung braucht einen passenden Reparaturplan. Ob eine punktuelle Reparatur, eine Sanierung von innen oder ein Austausch sinnvoll ist, lässt sich erst aus dem Befund und den Zugängen ableiten.",
    question: "Gibt es bereits eine Aufnahme mit Lage und Art des Schadens?",
    preparation:
      "Senden oder zeigen Sie vorhandene Berichte, Leitungspläne und frühere Reparaturunterlagen. Bei mehreren Eigentümern klären Sie vorab, wer Entscheidungen und Zugang koordinieren kann.",
    method:
      "Wir besprechen geeignete Optionen sowie deren Grenzen. Eine grabenlose Lösung ist nicht für jeden Schaden geeignet. Ein Angebot sollte den Abschnitt, Vorarbeiten, Ausfallzeiten und Abschlusskontrollen benennen.",
    result:
      "Reinigung und Sanierung werden klar getrennt. Nach der vereinbarten Maßnahme erfolgt die passende Kontrolle; mögliche weitere Schäden außerhalb des beauftragten Abschnitts bleiben ausdrücklich benannt.",
    stop: "Eine Sanierung wird nicht allein wegen des Alters eines Hauses empfohlen. Erst der festgestellte Zustand rechtfertigt die konkrete Maßnahme.",
    scope:
      "Befundabhängige Reparatur und Sanierungsplanung für Abwasserleitungen",
    related: ["kanalsanierung", "inliner-sanierung", "partielle-reparatur"],
  },
  {
    slug: "rohrreinigung-wartung",
    name: "Rohrreinigung & Wartung",
    label: "Wiederholte Störungen systematisch vermeiden",
    intro:
      "Eine Wartung sollte sich an der Nutzung und den bisherigen Befunden orientieren. Ein starres Reinigungsintervall ohne Kenntnis der Anlage kann unnötige Arbeiten verursachen und die eigentliche Ursache übersehen.",
    question:
      "Welche Leitungen machen wiederholt Probleme und wann wurden sie zuletzt geprüft?",
    preparation:
      "Sammeln Sie bisherige Einsatzberichte und notieren Sie Nutzung, wiederkehrende Störungen sowie gewünschte Betriebszeiten. Bei Mietobjekten hilft eine verantwortliche Kontaktperson für Termin und Zugang.",
    method:
      "Gemeinsam werden die relevanten Abschnitte, ein begründetes Intervall und der Dokumentationsumfang festgelegt. Technische Einrichtungen wie Hebeanlagen oder Rückstausicherungen benötigen einen eigenen Leistungsumfang.",
    result:
      "Die Wartung erhält einen nachvollziehbaren Bericht und einen nächsten Prüftermin. Zeigt sich eine Beschädigung, wird sie separat bewertet, statt immer häufiger zu reinigen.",
    stop: "Akuter Rückstau wird als Störung behandelt und nicht bis zum Wartungstermin aufgeschoben. Ein Wartungsvertrag ist keine Zusage für unbegrenzte Notdiensteinsätze.",
    scope:
      "Planbare Reinigung und dokumentierte Betreuung für private und gewerbliche Objekte",
    related: ["wartungsvertrag", "kanalwartung", "rueckstauklappe-wartung"],
  },
] as const;

export type LocalService = (typeof localServices)[number];
export type LocalServiceSlug = LocalService["slug"];
export function getLocalService(slug: string) {
  return localServices.find((service) => service.slug === slug);
}
