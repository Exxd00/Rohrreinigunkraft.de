/**
 * Enhanced service content for AEO optimization
 * Adds depth to service pages with:
 * - Problem consequences ("Was passiert wenn...")
 * - Urgency indicators ("Wann ist es ernst?")
 * - Common causes
 * - DIY tips (when to try vs. when to call)
 * - FAQ for each service
 */

export interface EnhancedServiceContent {
  slug: string;
  heroHeadline: string;
  heroSubheadline: string;
  consequences: {
    title: string;
    items: string[];
    urgentWarning: string;
  };
  whenSerious: {
    title: string;
    signs: string[];
    callImmediately: string[];
  };
  causes: {
    title: string;
    common: { cause: string; solution: string }[];
  };
  diyTips: {
    title: string;
    canTry: string[];
    dontDo: string[];
    callWhen: string;
  };
  process: {
    title: string;
    steps: { step: number; title: string; description: string }[];
  };
  faq: { question: string; answer: string }[];
}

export const enhancedServiceContent: Record<string, EnhancedServiceContent> = {
  "toilette-verstopft": {
    slug: "toilette-verstopft",
    heroHeadline: "Toilette verstopft?",
    heroSubheadline: "Wir lösen das Problem – Sie wissen vorher, was es kostet.",
    consequences: {
      title: "Was passiert, wenn Sie warten?",
      items: [
        "Wasser kann überlaufen und Boden/Decke beschädigen",
        "Bakterien und Keime breiten sich aus",
        "Geruchsbelästigung wird stärker",
        "Verstopfung kann tiefer wandern und teurer werden",
        "Bei Mehrfamilienhaus: Nachbarn betroffen",
      ],
      urgentWarning: "Bei drohendem Überlauf: Sofort handeln! Wasserschäden kosten ein Vielfaches der Reinigung."
    },
    whenSerious: {
      title: "Wann ist es ernst?",
      signs: [
        "Wasser steigt nach dem Spülen und sinkt sehr langsam",
        "Gluckernde Geräusche aus anderen Abflüssen",
        "Unangenehmer Geruch trotz Lüften",
        "Wasser tritt an anderen Stellen aus",
      ],
      callImmediately: [
        "Wasser droht überzulaufen",
        "Braunes Wasser kommt aus der Toilette",
        "Mehrere Abflüsse gleichzeitig verstopft",
        "Abwasser drückt aus Bodenablauf",
      ]
    },
    causes: {
      title: "Typische Ursachen",
      common: [
        { cause: "Feuchttücher (auch 'spülbare'!)", solution: "Nie ins WC – immer in den Mülleimer" },
        { cause: "Zu viel Toilettenpapier", solution: "Weniger auf einmal, mehrmals spülen" },
        { cause: "Hygieneartikel/Binden", solution: "Gehören in den Restmüll" },
        { cause: "Kinderspielzeug/Fremdkörper", solution: "WC-Deckel immer schließen" },
        { cause: "Kalk- und Urinstein", solution: "Regelmäßige Reinigung, bei Bedarf Entkalkung" },
      ]
    },
    diyTips: {
      title: "Was können Sie selbst versuchen?",
      canTry: [
        "Pümpel (Saugglocke) mehrmals kräftig anwenden",
        "Heißes (nicht kochendes!) Wasser mit Spülmittel",
        "5-10 Minuten warten und nochmal spülen",
      ],
      dontDo: [
        "KEINE chemischen Rohrreiniger – schädigen Rohre und Umwelt",
        "NICHT mit Draht oder spitzen Gegenständen stochern",
        "NICHT weiter spülen wenn Wasser steigt",
      ],
      callWhen: "Wenn der Pümpel nach 3-4 Versuchen nicht hilft oder das Problem wiederkehrt – rufen Sie uns an."
    },
    process: {
      title: "So läuft unser Einsatz ab",
      steps: [
        { step: 1, title: "Anruf", description: "Sie schildern das Problem. Wir nennen die voraussichtliche Ankunftszeit." },
        { step: 2, title: "Diagnose", description: "Vor Ort prüfen wir die Situation – kostenlos." },
        { step: 3, title: "Festpreis", description: "Wir nennen den genauen Preis. Erst dann entscheiden Sie." },
        { step: 4, title: "Reinigung", description: "Mit Spirale oder Hochdruck beseitigen wir die Verstopfung." },
        { step: 5, title: "Prüfung", description: "Funktionstest – erst wenn alles läuft, sind wir fertig." },
      ]
    },
    faq: [
      {
        question: "Wie lange dauert die Entstopfung einer Toilette?",
        answer: "Eine normale Toilettenverstopfung ist in 15-30 Minuten behoben. Bei tiefsitzenden Problemen kann es bis zu einer Stunde dauern."
      },
      {
        question: "Kann die Verstopfung wiederkommen?",
        answer: "Wenn die Ursache beseitigt ist, nicht. Bei wiederkehrenden Verstopfungen empfehlen wir eine Kamera-Inspektion, um das tiefere Problem zu finden."
      },
      {
        question: "Machen Sie auch am Sonntag Toiletten frei?",
        answer: "Ja, unser 24/7 Notdienst ist auch sonntags und an Feiertagen erreichbar. Notdienst-Zuschläge werden vorher kommuniziert."
      },
    ]
  },

  "rohrreinigung-notdienst": {
    slug: "rohrreinigung-notdienst",
    heroHeadline: "Rohr-Notfall?",
    heroSubheadline: "24/7 telefonisch erreichbar – Ankunft nach Verfügbarkeit.",
    consequences: {
      title: "Warum jetzt handeln?",
      items: [
        "Wasserschäden werden mit jeder Minute teurer",
        "Durchnässte Böden und Wände können Schimmel bilden",
        "Abwasser enthält Bakterien – Gesundheitsrisiko",
        "Bei Mehrfamilienhäusern: Haftung gegenüber Nachbarn",
        "Versicherungen zahlen nur bei schnellem Handeln",
      ],
      urgentWarning: "Jede Minute zählt! Wasserschäden können 10x teurer sein als die Rohrreinigung."
    },
    whenSerious: {
      title: "Das ist ein Notfall:",
      signs: [
        "Wasser tritt aus Rohren oder Abflüssen aus",
        "Abwasser drückt zurück (Rückstau)",
        "Überschwemmung im Keller",
        "Die einzige Toilette ist unbenutzbar",
      ],
      callImmediately: [
        "Wasser läuft unkontrolliert",
        "Starker Abwassergeruch",
        "Geräusche aus den Rohren (Gluckern, Blubbern)",
        "Feuchte Stellen an Wänden erscheinen plötzlich",
      ]
    },
    causes: {
      title: "Häufige Notfall-Ursachen",
      common: [
        { cause: "Verstopfung im Hauptkanal", solution: "Hochdruck-Spülung" },
        { cause: "Wurzeleinwuchs", solution: "Wurzelfräse + Inspektion" },
        { cause: "Rohrbruch", solution: "Lokalisierung + Reparatur" },
        { cause: "Fremdkörper im System", solution: "Kamera + Bergung" },
        { cause: "Fettablagerungen (Gewerbe)", solution: "Fettlöser + Hochdruck" },
      ]
    },
    diyTips: {
      title: "Sofortmaßnahmen bis wir da sind",
      canTry: [
        "Hauptwasserhahn abdrehen",
        "Betroffene Abflüsse nicht mehr benutzen",
        "Handtücher/Lappen auslegen um Ausbreitung zu stoppen",
        "Fenster öffnen bei Geruch",
        "Fotos für Versicherung machen",
      ],
      dontDo: [
        "Nicht weiter spülen oder Wasser laufen lassen",
        "Keine elektrischen Geräte im Wasser betreiben",
        "Nicht selbst an Rohren herumschrauben",
      ],
      callWhen: "Bei jedem Anzeichen von Überlauf oder Rückstau – sofort anrufen!"
    },
    process: {
      title: "Unser Notdienst-Ablauf",
      steps: [
        { step: 1, title: "Sofort-Annahme", description: "24/7 persönlich erreichbar – kein Callcenter." },
        { step: 2, title: "Ankunft klären", description: "Adresse, Verkehr und aktuelle Verfügbarkeit bestimmen die Ankunftszeit." },
        { step: 3, title: "Schadenbegrenzung", description: "Erst das Wasser stoppen, dann Ursache finden." },
        { step: 4, title: "Festpreis", description: "Auch im Notfall: Preis vor Arbeitsbeginn." },
        { step: 5, title: "Dokumentation", description: "Fotos und Bericht für Ihre Versicherung." },
      ]
    },
    faq: [
      {
        question: "Ist der Notdienst nachts teurer?",
        answer: "Die Grundpreise bleiben gleich. Nachts (22-6 Uhr) +40€, Wochenende +30€, Abends +20€. Diese Zuschläge nennen wir VORHER am Telefon."
      },
      {
        question: "Wie schnell können Sie da sein?",
        answer: "Die voraussichtliche Ankunft klären wir telefonisch anhand Ihrer Adresse, der Verkehrslage und der aktuellen Verfügbarkeit."
      },
      {
        question: "Zahlt meine Versicherung?",
        answer: "Das hängt von Ihrer Police ab. Wir erstellen eine detaillierte Dokumentation, die Sie bei Ihrer Versicherung einreichen können."
      },
    ]
  },

  "kanalreinigung": {
    slug: "kanalreinigung",
    heroHeadline: "Kanal verstopft?",
    heroSubheadline: "Professionelle Kanalreinigung mit Hochdruck – Festpreis vor Arbeitsbeginn.",
    consequences: {
      title: "Was passiert bei verstopftem Kanal?",
      items: [
        "Rückstau: Abwasser drückt in Haus zurück",
        "Überschwemmung von Keller und Tiefgarage möglich",
        "Schäden an Bausubstanz durch stehendes Wasser",
        "Gesundheitsrisiko durch Bakterien und Keime",
        "Geruchsbelästigung in der gesamten Umgebung",
      ],
      urgentWarning: "Ein verstopfter Kanal betrifft oft das ganze Haus. Schnelles Handeln verhindert teure Folgeschäden."
    },
    whenSerious: {
      title: "Anzeichen für Kanalprobleme",
      signs: [
        "Mehrere Abflüsse gleichzeitig langsam",
        "Gluckern aus Toilette wenn Waschmaschine läuft",
        "Wasser im Bodenablauf steigt",
        "Unangenehmer Geruch im Keller",
      ],
      callImmediately: [
        "Abwasser tritt aus Bodenablauf aus",
        "Toilette im Erdgeschoss blubbert",
        "Wasser steht im Revisionsschacht",
        "Mehrere Wohnungen gleichzeitig betroffen",
      ]
    },
    causes: {
      title: "Typische Kanalverstopfungen",
      common: [
        { cause: "Wurzeleinwuchs", solution: "Wurzelfräse, danach Inspektion" },
        { cause: "Fett- und Seifenablagerungen", solution: "Hochdruck-Spülung" },
        { cause: "Fremdkörper", solution: "Kamera-Ortung und Bergung" },
        { cause: "Rohrversatz/Bruch", solution: "Inspektion, ggf. Sanierung" },
        { cause: "Sedimente und Schlamm", solution: "Regelmäßige Wartungsspülung" },
      ]
    },
    diyTips: {
      title: "Können Sie selbst etwas tun?",
      canTry: [
        "Revisionsschacht öffnen und Wasserstand prüfen",
        "Keine weiteren Abflüsse benutzen",
        "Dokumentieren Sie die Situation (Fotos)",
      ],
      dontDo: [
        "NICHT selbst in den Kanal einsteigen – Erstickungsgefahr!",
        "Keine chemischen Reiniger in den Kanal schütten",
        "Nicht mit Gartenschlauch versuchen zu spülen",
      ],
      callWhen: "Bei Kanalverstopfungen ist professionelles Equipment erforderlich. Rufen Sie uns an."
    },
    process: {
      title: "Ablauf der Kanalreinigung",
      steps: [
        { step: 1, title: "Bestandsaufnahme", description: "Wir prüfen Schächte und Zugänge." },
        { step: 2, title: "Kamera (optional)", description: "Bei Bedarf Inspektion zur Ursachenfindung." },
        { step: 3, title: "Festpreis", description: "Sie wissen den Preis, bevor wir starten." },
        { step: 4, title: "Hochdruck-Spülung", description: "Bis 200 bar – löst alle Ablagerungen." },
        { step: 5, title: "Kontrolle", description: "Abschließende Prüfung des Abflusses." },
      ]
    },
    faq: [
      {
        question: "Wie oft sollte der Kanal gereinigt werden?",
        answer: "Bei Wohnhäusern empfehlen wir alle 2-3 Jahre eine präventive Reinigung. Bei Gastronomie/Gewerbe: häufiger je nach Nutzung."
      },
      {
        question: "Kann Hochdruck meine Rohre beschädigen?",
        answer: "Nein, wenn professionell durchgeführt. Wir passen den Druck an den Rohrzustand an."
      },
      {
        question: "Reinigen Sie auch bei Wohnungseigentümergemeinschaften?",
        answer: "Ja, wir arbeiten regelmäßig mit WEGs und Hausverwaltungen. Wir bieten auch Wartungsverträge an."
      },
    ]
  },

  "kamera-inspektion": {
    slug: "kamera-inspektion",
    heroHeadline: "Rohrproblem? Sehen statt raten.",
    heroSubheadline: "TV-Kamera-Inspektion zeigt genau, was im Rohr los ist.",
    consequences: {
      title: "Warum eine Inspektion sinnvoll ist",
      items: [
        "Exakte Ursachenfindung statt Vermutungen",
        "Verhindert unnötige Reparaturen",
        "Dokumentation für Versicherung oder Vermieter",
        "Früherkennung von Schäden spart Kosten",
        "Wichtig vor Hauskauf oder Sanierung",
      ],
      urgentWarning: "Bei wiederkehrenden Verstopfungen ist eine Inspektion Pflicht – sonst behandeln Sie nur Symptome."
    },
    whenSerious: {
      title: "Wann eine Inspektion empfohlen wird",
      signs: [
        "Verstopfung kehrt immer wieder",
        "Unklare Ursache trotz Reinigung",
        "Verdacht auf Rohrschaden oder Wurzeln",
        "Vor Kauf oder Verkauf einer Immobilie",
      ],
      callImmediately: [
        "Plötzlicher Anstieg der Wasserschäden",
        "Verdacht auf Rohrbruch",
        "Unerklärlicher Wasserverlust",
        "Geruch ohne erkennbare Ursache",
      ]
    },
    causes: {
      title: "Was die Kamera findet",
      common: [
        { cause: "Wurzeleinwuchs", solution: "Sichtbar machen, dann gezielt entfernen" },
        { cause: "Rohrversatz", solution: "Exakte Position für Reparatur" },
        { cause: "Risse und Brüche", solution: "Dokumentation für Sanierungsplanung" },
        { cause: "Ablagerungen", solution: "Art und Umfang erkennen" },
        { cause: "Fremdkörper", solution: "Lokalisieren und bergen" },
      ]
    },
    diyTips: {
      title: "Kann ich das selbst prüfen?",
      canTry: [
        "Sichtprüfung an Revisionsschächten",
        "Dokumentation der Symptome (wann, wo, wie oft)",
        "Fotos von sichtbaren Problemen machen",
      ],
      dontDo: [
        "Keine Taschenlampen in Rohre stecken (Verlustgefahr)",
        "Nicht blind Chemie in Rohre schütten",
        "Nicht raten – eine Inspektion kostet weniger als eine falsche Reparatur",
      ],
      callWhen: "Für eine professionelle Inspektion mit HD-Kamera und Dokumentation."
    },
    process: {
      title: "Ablauf der Kamera-Inspektion",
      steps: [
        { step: 1, title: "Vorbereitung", description: "Wir verschaffen uns Zugang zum Rohrsystem." },
        { step: 2, title: "Kamerafahrt", description: "HD-Kamera zeigt live, was im Rohr ist." },
        { step: 3, title: "Dokumentation", description: "Fotos und Video der relevanten Stellen." },
        { step: 4, title: "Auswertung", description: "Wir erklären Ihnen, was wir gefunden haben." },
        { step: 5, title: "Empfehlung", description: "Schriftlicher Bericht mit Handlungsoptionen." },
      ]
    },
    faq: [
      {
        question: "Was kostet eine Kamera-Inspektion?",
        answer: "Die Inspektion kostet pauschal 149€ inklusive Dokumentation. Bei kombinierter Reinigung kann sie günstiger werden."
      },
      {
        question: "Bekomme ich die Aufnahmen?",
        answer: "Ja, Sie erhalten Fotos, Video und einen schriftlichen Befundbericht."
      },
      {
        question: "Wie weit kann die Kamera ins Rohr?",
        answer: "Unsere Kamerasysteme können bis zu 60 Meter ins Rohrsystem fahren."
      },
    ]
  },

  "abflussreinigung": {
    slug: "abflussreinigung",
    heroHeadline: "Abfluss verstopft?",
    heroSubheadline: "Schnelle Hilfe für Küche, Bad und Dusche – Festpreis nach Diagnose.",
    consequences: {
      title: "Was passiert bei verstopftem Abfluss?",
      items: [
        "Wasser staut sich und kann überlaufen",
        "Schlechte Gerüche breiten sich aus",
        "Bakterien und Schimmel können entstehen",
        "Bei Küche: Hygieneproblem mit Lebensmitteln",
        "Verstopfung wandert tiefer – wird teurer",
      ],
      urgentWarning: "Je länger Sie warten, desto weiter wandert die Verstopfung ins System."
    },
    whenSerious: {
      title: "Wann sollten Sie handeln?",
      signs: [
        "Wasser läuft nur noch langsam ab",
        "Gluckernde Geräusche beim Ablaufen",
        "Unangenehmer Geruch aus dem Abfluss",
        "Wasser staut sich beim Händewaschen",
      ],
      callImmediately: [
        "Wasser läuft gar nicht mehr ab",
        "Abfluss 'blubbert' zurück",
        "Übler Geruch trotz Reinigung",
        "Mehrere Abflüsse gleichzeitig betroffen",
      ]
    },
    causes: {
      title: "Typische Ursachen nach Ort",
      common: [
        { cause: "Bad: Haare und Seifenreste", solution: "Spirale oder Hochdruck" },
        { cause: "Küche: Fett und Speisereste", solution: "Fettlösung + Spülung" },
        { cause: "Dusche: Haare in der Ablaufrinne", solution: "Reinigung + Sieb empfohlen" },
        { cause: "Waschbecken: Zahnpasta-Ablagerungen", solution: "Siphonreinigung" },
        { cause: "Alle: Zu kleine Fallrohre (Altbau)", solution: "Regelmäßige Wartung" },
      ]
    },
    diyTips: {
      title: "Erste Hilfe für leichte Fälle",
      canTry: [
        "Heißes Wasser mit Spülmittel einwirken lassen",
        "Pümpel (Saugglocke) verwenden",
        "Siphon unter dem Waschbecken reinigen",
        "Haarsieb regelmäßig leeren",
      ],
      dontDo: [
        "KEINE Chemie-Reiniger – schädigen Rohre und Umwelt",
        "KEIN kochendes Wasser bei Kunststoffrohren",
        "NICHT mit Draht stochern – kann Rohre beschädigen",
      ],
      callWhen: "Wenn der Pümpel nicht hilft oder das Problem immer wiederkommt."
    },
    process: {
      title: "So reinigen wir Ihren Abfluss",
      steps: [
        { step: 1, title: "Diagnose", description: "Wir finden heraus, wo und was verstopft." },
        { step: 2, title: "Festpreis", description: "Sie erfahren den Preis vor der Arbeit." },
        { step: 3, title: "Reinigung", description: "Mit Spirale oder Hochdruck – je nach Bedarf." },
        { step: 4, title: "Test", description: "Wir prüfen, ob alles wieder frei abläuft." },
        { step: 5, title: "Tipps", description: "Wir zeigen, wie Sie vorbeugen können." },
      ]
    },
    faq: [
      {
        question: "Muss der ganze Abfluss freigelegt werden?",
        answer: "Nein, in den meisten Fällen reicht eine Reinigung über den bestehenden Zugang. Wir beschädigen nichts."
      },
      {
        question: "Hilft ein chemischer Rohrreiniger?",
        answer: "Kurzfristig vielleicht, langfristig schädigt er Ihre Rohre und die Umwelt. Wir raten davon ab."
      },
      {
        question: "Wie kann ich Verstopfungen vorbeugen?",
        answer: "Haarsiebe verwenden, kein Fett in den Abfluss, regelmäßig heißes Wasser durchlaufen lassen."
      },
    ]
  },

  "rohrreinigung": {
    slug: "rohrreinigung",
    heroHeadline: "Rohr verstopft?",
    heroSubheadline: "Professionelle Rohrreinigung – Sie wissen den Preis, bevor wir anfangen.",
    consequences: {
      title: "Was passiert bei verstopften Rohren?",
      items: [
        "Abwasser staut sich und kann überlaufen",
        "Unangenehme Gerüche im ganzen Haus",
        "Verstopfung wandert tiefer ins System",
        "Ohne Behandlung: Rohrschäden möglich",
        "Hygienische Probleme für die ganze Familie",
      ],
      urgentWarning: "Je länger Sie warten, desto komplizierter wird die Reinigung. Früh handeln spart Geld."
    },
    whenSerious: {
      title: "Wann ist professionelle Hilfe nötig?",
      signs: [
        "Wasser läuft langsamer ab als normal",
        "Gluckernde Geräusche aus Abflüssen",
        "Unangenehmer Geruch trotz Reinigung",
        "Das Problem kehrt immer wieder",
      ],
      callImmediately: [
        "Wasser tritt aus Rohren aus",
        "Mehrere Abflüsse gleichzeitig verstopft",
        "Rückstau aus Bodenabläufen",
        "Die einzige Toilette ist unbenutzbar",
      ]
    },
    causes: {
      title: "Häufige Ursachen für Verstopfungen",
      common: [
        { cause: "Haare und Seifenreste (Bad)", solution: "Spiralreinigung" },
        { cause: "Fett und Essensreste (Küche)", solution: "Hochdruck + Fettlöser" },
        { cause: "Feuchttücher und Hygieneartikel", solution: "Mechanische Entfernung" },
        { cause: "Kalk und Ablagerungen (Altbau)", solution: "Regelmäßige Wartung" },
        { cause: "Wurzeleinwuchs (Hauptleitung)", solution: "Wurzelfräse + Inspektion" },
      ]
    },
    diyTips: {
      title: "Was Sie selbst versuchen können",
      canTry: [
        "Pümpel bei einfachen Verstopfungen",
        "Heißes Wasser mit Spülmittel",
        "Haarsiebe regelmäßig leeren",
        "Siphon reinigen (unter Waschbecken)",
      ],
      dontDo: [
        "KEINE chemischen Rohrreiniger – schädlich für Rohre",
        "NICHT mit Draht oder spitzen Gegenständen stochern",
        "NICHT bei tiefen Verstopfungen selbst probieren",
      ],
      callWhen: "Wenn der Pümpel nicht hilft oder die Verstopfung tiefer sitzt."
    },
    process: {
      title: "So läuft die Rohrreinigung ab",
      steps: [
        { step: 1, title: "Anruf", description: "Sie schildern das Problem kurz." },
        { step: 2, title: "Diagnose", description: "Wir prüfen vor Ort – kostenlos." },
        { step: 3, title: "Festpreis", description: "Sie kennen den Preis, bevor wir starten." },
        { step: 4, title: "Reinigung", description: "Mit Spirale oder Hochdruck." },
        { step: 5, title: "Prüfung", description: "Alles muss frei ablaufen." },
      ]
    },
    faq: [
      {
        question: "Was kostet eine Rohrreinigung?",
        answer: "Einfache Verstopfungen ab 79€. Der genaue Preis wird nach kostenloser Diagnose vor Ort genannt."
      },
      {
        question: "Wie lange dauert eine Rohrreinigung?",
        answer: "Die meisten Verstopfungen sind in 15-45 Minuten behoben. Komplexe Fälle bis zu 2 Stunden."
      },
      {
        question: "Kann ich die Verstopfung selbst lösen?",
        answer: "Bei leichten Verstopfungen können Sie einen Pümpel versuchen. Bei tieferen Problemen lieber uns anrufen."
      },
    ]
  },

  "dusche-verstopft": {
    slug: "dusche-verstopft",
    heroHeadline: "Dusche verstopft?",
    heroSubheadline: "Schnelle Hilfe – das Wasser fließt wieder ab.",
    consequences: {
      title: "Was passiert bei verstopfter Dusche?",
      items: [
        "Wasser steht in der Duschwanne",
        "Schimmelbildung durch stehende Feuchtigkeit",
        "Unangenehme Gerüche im Badezimmer",
        "Dusche wird unbenutzbar",
        "Verstopfung kann sich verschlimmern",
      ],
      urgentWarning: "Stehende Feuchtigkeit fördert Schimmelbildung – das ist ein Gesundheitsrisiko."
    },
    whenSerious: {
      title: "Wann sollten Sie handeln?",
      signs: [
        "Wasser läuft nur langsam ab",
        "Wasser steht bis zu den Knöcheln",
        "Gluckernde Geräusche beim Ablaufen",
        "Geruch aus dem Abfluss",
      ],
      callImmediately: [
        "Wasser läuft gar nicht mehr ab",
        "Wasser drückt aus dem Abfluss zurück",
        "Verstopfung trotz Pümpel",
        "Problem kommt immer wieder",
      ]
    },
    causes: {
      title: "Warum ist die Dusche verstopft?",
      common: [
        { cause: "Haare – die #1 Ursache!", solution: "Spirale + Haarsieb empfohlen" },
        { cause: "Seifenreste und Shampoo", solution: "Hochdruck-Spülung" },
        { cause: "Kalkablagerungen", solution: "Mechanische Reinigung" },
        { cause: "Verstopfte Ablaufrinne", solution: "Rinne reinigen" },
        { cause: "Tiefere Verstopfung im Rohr", solution: "Professionelle Rohrreinigung" },
      ]
    },
    diyTips: {
      title: "Das können Sie versuchen",
      canTry: [
        "Haare sichtbar entfernen",
        "Pümpel bei leichten Verstopfungen",
        "Ablaufgitter abnehmen und reinigen",
        "Heißes Wasser einwirken lassen",
      ],
      dontDo: [
        "KEINE Chemie – schädigt Rohre und Fugen",
        "NICHT mit Draht stochern – kann Rohr beschädigen",
        "NICHT ignorieren – wird nur schlimmer",
      ],
      callWhen: "Wenn Haare entfernen und Pümpel nicht helfen."
    },
    process: {
      title: "So reinigen wir Ihre Dusche",
      steps: [
        { step: 1, title: "Diagnose", description: "Wir prüfen, wo die Verstopfung sitzt." },
        { step: 2, title: "Festpreis", description: "Sie wissen den Preis vor Arbeitsbeginn." },
        { step: 3, title: "Reinigung", description: "Mit Spirale oder Mini-Hochdruck." },
        { step: 4, title: "Test", description: "Wasser muss schnell ablaufen." },
        { step: 5, title: "Tipp", description: "Wir empfehlen ein Haarsieb." },
      ]
    },
    faq: [
      {
        question: "Wie oft sollte ich die Dusche reinigen lassen?",
        answer: "Bei normaler Nutzung reicht eine professionelle Reinigung bei Bedarf. Mit Haarsieb selten nötig."
      },
      {
        question: "Kann ich einen Abflussreiniger benutzen?",
        answer: "Wir raten davon ab. Chemie schädigt Rohre und Umwelt. Besser uns anrufen."
      },
      {
        question: "Was kostet die Duschreinigung?",
        answer: "Ab 79€. Der genaue Preis nach kostenloser Diagnose vor Ort."
      },
    ]
  },

  "bodenablauf-verstopft": {
    slug: "bodenablauf-verstopft",
    heroHeadline: "Bodenablauf verstopft?",
    heroSubheadline: "Keller, Garage, Bad – wir machen den Ablauf frei.",
    consequences: {
      title: "Was passiert bei verstopftem Bodenablauf?",
      items: [
        "Wasser sammelt sich auf dem Boden",
        "Bei Regen: Überschwemmungsgefahr im Keller",
        "Rückstau aus der Kanalisation möglich",
        "Schimmel durch stehende Feuchtigkeit",
        "Schäden an Bodenbelag und Wänden",
      ],
      urgentWarning: "Ein verstopfter Bodenablauf im Keller kann bei Starkregen zu Überschwemmung führen!"
    },
    whenSerious: {
      title: "Warnsignale erkennen",
      signs: [
        "Wasser steht um den Bodenablauf",
        "Abfluss gurgelt oder blubbert",
        "Unangenehmer Geruch im Raum",
        "Wasser läuft langsam ab",
      ],
      callImmediately: [
        "Wasser drückt aus dem Bodenablauf",
        "Abwassergeruch im Keller",
        "Mehrere Bodenabläufe betroffen",
        "Starkregen und kein Ablauf",
      ]
    },
    causes: {
      title: "Typische Ursachen",
      common: [
        { cause: "Laub und Schmutz", solution: "Reinigung + Gitter" },
        { cause: "Haare (im Bad)", solution: "Spiralreinigung" },
        { cause: "Sedimente und Sand", solution: "Hochdruck-Spülung" },
        { cause: "Fett (in Küchen)", solution: "Fettlöser + Spülung" },
        { cause: "Defekter Geruchsverschluss", solution: "Austausch des Siphons" },
      ]
    },
    diyTips: {
      title: "Erste Hilfe",
      canTry: [
        "Ablaufgitter entfernen und reinigen",
        "Sichtbaren Schmutz entfernen",
        "Mit viel Wasser durchspülen",
        "Siphon (falls zugänglich) prüfen",
      ],
      dontDo: [
        "NICHT in den Kanal einsteigen – Lebensgefahr!",
        "KEINE Chemie in den Bodenablauf",
        "NICHT ignorieren – kann schlimmer werden",
      ],
      callWhen: "Wenn Reinigen des Gitters nicht hilft oder Wasser zurückdrückt."
    },
    process: {
      title: "So reinigen wir Bodenabläufe",
      steps: [
        { step: 1, title: "Diagnose", description: "Wir prüfen Ablauf und Anbindung." },
        { step: 2, title: "Festpreis", description: "Sie erfahren den Preis vor der Arbeit." },
        { step: 3, title: "Reinigung", description: "Spirale oder Hochdruck je nach Bedarf." },
        { step: 4, title: "Siphon", description: "Geruchsverschluss prüfen und reinigen." },
        { step: 5, title: "Test", description: "Wassertest – muss schnell ablaufen." },
      ]
    },
    faq: [
      {
        question: "Warum stinkt der Bodenablauf?",
        answer: "Meist ist der Siphon ausgetrocknet oder verstopft. Regelmäßig Wasser nachgießen hilft."
      },
      {
        question: "Braucht der Keller einen Rückstauschutz?",
        answer: "In überschwemmungsgefährdeten Gebieten ja. Wir beraten Sie gerne."
      },
      {
        question: "Reinigen Sie auch in Tiefgaragen?",
        answer: "Ja, wir reinigen alle Arten von Bodenabläufen – Keller, Garage, Bad, Gewerbe."
      },
    ]
  },

  "waschbecken-verstopft": {
    slug: "waschbecken-verstopft",
    heroHeadline: "Waschbecken verstopft?",
    heroSubheadline: "Schnelle Hilfe – das Wasser fließt wieder.",
    consequences: {
      title: "Was passiert bei verstopftem Waschbecken?",
      items: [
        "Wasser staut sich beim Händewaschen",
        "Unangenehmer Geruch aus dem Abfluss",
        "Nutzung des Waschbeckens eingeschränkt",
        "Bakterien vermehren sich im stehenden Wasser",
        "Verstopfung kann tiefer wandern",
      ],
      urgentWarning: "Je länger Sie warten, desto weiter wandert die Verstopfung ins Rohrsystem."
    },
    whenSerious: {
      title: "Wann brauchen Sie Hilfe?",
      signs: [
        "Wasser läuft nur noch sehr langsam ab",
        "Blubbergeräusche beim Ablaufen",
        "Schlechter Geruch trotz Reinigung",
        "Wasser steigt beim Wasserlassen",
      ],
      callImmediately: [
        "Wasser läuft gar nicht mehr ab",
        "Siphon-Reinigung hat nicht geholfen",
        "Problem kommt nach kurzer Zeit wieder",
        "Mehrere Abflüsse betroffen",
      ]
    },
    causes: {
      title: "Häufige Ursachen",
      common: [
        { cause: "Haare – besonders im Bad", solution: "Spiralreinigung" },
        { cause: "Seife und Zahnpasta", solution: "Heißwasser-Spülung" },
        { cause: "Verstopfter Siphon", solution: "Siphon reinigen/austauschen" },
        { cause: "Ablagerungen im Rohr", solution: "Professionelle Reinigung" },
        { cause: "Zu kleines Fallrohr (Altbau)", solution: "Regelmäßige Wartung" },
      ]
    },
    diyTips: {
      title: "Das können Sie selbst versuchen",
      canTry: [
        "Siphon abschrauben und reinigen",
        "Pümpel bei leichten Verstopfungen",
        "Heißes Wasser einwirken lassen",
        "Haarsieb installieren",
      ],
      dontDo: [
        "KEINE chemischen Reiniger",
        "KEIN kochendes Wasser bei Kunststoffrohren",
        "NICHT mit Draht stochern",
      ],
      callWhen: "Wenn Siphon-Reinigung und Pümpel nicht helfen."
    },
    process: {
      title: "So reinigen wir Ihr Waschbecken",
      steps: [
        { step: 1, title: "Diagnose", description: "Siphon oder tiefere Verstopfung?" },
        { step: 2, title: "Festpreis", description: "Sie wissen den Preis vor der Arbeit." },
        { step: 3, title: "Reinigung", description: "Spirale oder Hochdruck je nach Lage." },
        { step: 4, title: "Siphon", description: "Bei Bedarf Siphon reinigen oder tauschen." },
        { step: 5, title: "Test", description: "Wasser muss schnell ablaufen." },
      ]
    },
    faq: [
      {
        question: "Kann ich den Siphon selbst reinigen?",
        answer: "Ja, mit einer Schüssel darunter abschrauben, reinigen und wieder anschrauben. Wenn das nicht hilft, rufen Sie uns."
      },
      {
        question: "Warum riecht es aus dem Waschbecken?",
        answer: "Meist Ablagerungen im Siphon oder Rohr. Regelmäßig heißes Wasser durchlaufen lassen hilft vorbeugen."
      },
      {
        question: "Was kostet die Reinigung?",
        answer: "Ab 79€. Der genaue Preis nach kostenloser Diagnose vor Ort."
      },
    ]
  },
};

// Helper function to get enhanced content
export function getEnhancedServiceContent(slug: string): EnhancedServiceContent | null {
  return enhancedServiceContent[slug] || null;
}

// Get all slugs that have enhanced content
export function getEnhancedServiceSlugs(): string[] {
  return Object.keys(enhancedServiceContent);
}
