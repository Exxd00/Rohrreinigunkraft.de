/** Editorial planning examples, not claims about local defect rates or completed jobs. */
export interface CityGuide {
  heading: string;
  context: string;
  access: string;
  planning: string;
}

export const cityGuides: Record<string, CityGuide> = {
  nuernberg: {
    heading: "Vom einzelnen Ablauf bis zur gemeinsamen Hausleitung",
    context:
      "Unser Standort liegt in Nürnberg. Bei der Einsatzaufnahme unterscheiden wir zwischen einer Störung in einer Wohnung und Rückstau im gemeinsam genutzten Hausanschluss. Nennen Sie neben Straße und Hausnummer auch Stadtteil, Etage und die betroffene Entwässerungsstelle. Das ist aussagekräftiger als die Angabe „Rohr in Nürnberg verstopft“.",
    access:
      "Bei einem Hinterhaus oder Innenhof brauchen wir den richtigen Eingang und einen Ansprechpartner an der Tür. Wenn ein Revisionszugang im Keller liegt, klären Sie vorher, wer den Schlüssel hat. Das Fahrzeug muss nicht an der Wohnungstür stehen; entscheidend ist ein sicher nutzbarer Weg zum Arbeitsbereich.",
    planning:
      "Für ein Mehrparteienhaus hilft eine kurze Rückfrage bei den übrigen Bewohnern: Sind weitere Abläufe betroffen? So kann die Vorbereitung zwischen Anschlussleitung und gemeinsamem Strang unterscheiden, ohne allein aus dem Baujahr einen Schaden abzuleiten.",
  },
  fuerth: {
    heading: "Zugang und betroffenen Gebäudeteil vorab klären",
    context:
      "Fürth liegt westlich unseres Nürnberger Ausgangspunkts. Für einen Auftrag zählt die konkrete Adresse im Fürther Stadtgebiet; Fürth und der Landkreis Fürth sind keine austauschbaren Ortsangaben. Bei mehreren Hauseingängen nennen Sie bitte den tatsächlich betroffenen Gebäudeteil.",
    access:
      "Ein Ablauf im Vorderhaus kann über andere Zugänge erreichbar sein als eine Leitung im rückwärtigen Gebäudeteil. Beschreiben Sie deshalb Hofdurchgang, Kellerzugang und vorhandene Revisionsöffnungen. Halten Sie bei vermieteten Objekten die zuständige Person für Zugang und Freigabe erreichbar.",
    planning:
      "Wiederholt sich eine Störung nach einer Reinigung, sind Datum und Umfang des vorherigen Einsatzes hilfreich. Wir besprechen dann, ob eine weitergehende Untersuchung sinnvoller ist als dieselbe Arbeit nochmals ohne Befund zu beauftragen.",
  },
  erlangen: {
    heading: "Adresse, Nutzung und Terminfenster zusammen planen",
    context:
      "Erlangen gehört zum nördlichen Einsatzgebiet. Bei der Terminplanung benötigen wir die genaue Objektadresse und den Stadtteil. Die Entfernung zum Ortsmittelpunkt beschreibt die Lage, aber weder die Fahrstrecke noch eine garantierte Ankunftszeit.",
    access:
      "Für betreute Gebäude, Praxisräume oder gemeinsam genutzte Sanitäranlagen nennen Sie eine erreichbare Kontaktperson und mögliche Zugangszeiten. Bei einer einzelnen Wohnung helfen Etage und Lage des Anschlusses; für eine Grundstücksleitung sind Schacht und Plan wichtiger.",
    planning:
      "Eine planbare Untersuchung kann in ein abgestimmtes Nutzungsfenster gelegt werden. Akuter Abwasseraustritt wird separat nach Dringlichkeit bewertet. Teilen Sie bei der Anfrage deshalb mit, ob der Betrieb weiterläuft oder der Bereich bereits gesperrt ist.",
  },
  schwabach: {
    heading: "Wohnungsanschluss und Grundstücksleitung unterscheiden",
    context:
      "Schwabach liegt südlich von Nürnberg innerhalb des 30-km-Radius. Für die Vorbereitung ist entscheidend, ob Wasser nur an einer Entwässerungsstelle steht oder an mehreren Stellen im Gebäude zurückkommt. Eine Meldung mit diesen Beobachtungen hilft mehr als eine Vermutung über die Ursache.",
    access:
      "Zeigen Sie uns den Weg zum betroffenen Raum und – falls vorhanden – zur Revisionsöffnung auf dem Grundstück. Bei einem Kellerablauf halten Sie Abstand zu ausgetretenem Wasser und beschreiben Sie die Situation telefonisch, statt den Raum zur Besichtigung zu betreten.",
    planning:
      "Für die spätere Dokumentation können vorhandene Leitungspläne und frühere Rechnungen hilfreich sein. Sie zeigen, welcher Abschnitt bereits bearbeitet wurde, und erleichtern die Abgrenzung zwischen Reinigung, Untersuchung und Reparatur.",
  },
  stein: {
    heading: "Stein eindeutig zuordnen und den Anschluss beschreiben",
    context:
      "Gemeint ist Stein bei Nürnberg, südwestlich unseres Ausgangspunkts. Bitte geben Sie bei einer Anfrage den Ort vollständig mit Adresse an. Bei gleichnamigen Orten verhindert diese Zuordnung eine falsche Einsatzplanung.",
    access:
      "Wenn die Leitung vom Gebäude in einen Garten- oder Hofbereich führt, nennen Sie beide Zugangsmöglichkeiten. Ein von Möbeln verdeckter Anschluss kann vor der Ankunft freigeräumt werden; fest eingebaute Teile sollten Sie dafür nicht eigenständig demontieren.",
    planning:
      "Eine Verstopfung im Badezimmer ist zunächst eine andere Aufgabenstellung als wiederkehrender Rückstau am Hausanschluss. Wir klären den Umfang vor dem Einsatz und legen Zusatzarbeiten erst fest, wenn der Befund sie begründet.",
  },
  zirndorf: {
    heading: "Einsatz am Haus und Zugang über das Grundstück",
    context:
      "Zirndorf liegt westlich von Nürnberg. Nennen Sie bei der Anfrage auch den Ortsteil, falls die Adresse außerhalb des zentralen Stadtbereichs liegt. Die Liste der Einsatzorte ersetzt keine Prüfung des konkreten Anfahrtsziels.",
    access:
      "Bei einem Arbeitsbereich im Garten oder einer seitlichen Zufahrt hilft die Angabe, ob der Zugang über ein Tor, einen Hof oder das Gebäude führt. Die Lage eines vorhandenen Schachts sollte bekannt sein, bevor ein Termin zur Grundstücksentwässerung vereinbart wird.",
    planning:
      "Wenn mehrere Nutzer an dieselbe Leitung angeschlossen sind, bestimmen Sie eine gemeinsame Kontaktperson. Eine abgestimmte kurze Nutzungspause kann die Untersuchung erleichtern; ihre Dauer hängt vom tatsächlichen Auftrag ab.",
  },
  oberasbach: {
    heading: "Das richtige Objekt zwischen benachbarten Einsatzorten",
    context:
      "Oberasbach befindet sich im westlichen Umland, in der Nähe weiterer Einsatzorte wie Zirndorf und Stein. Für eine zuverlässige Zuordnung brauchen wir die vollständige Adresse in Oberasbach. Eine Nachbarstadt oder eine nahe Sehenswürdigkeit allein genügt dafür nicht.",
    access:
      "Bei Reihen- oder Doppelhäusern klären Sie bitte, welche Seite und welcher Eingang betroffen sind. Falls die Entwässerung gemeinsam genutzt wird, kann ein Zugang auf einem Nachbargrundstück relevant sein; diesen stimmen Sie vorab mit der berechtigten Person ab.",
    planning:
      "Beobachten Sie, ob die Störung nach Nutzung eines bestimmten Anschlusses auftritt. Diese Information hilft bei der Eingrenzung. Sie ist noch kein Nachweis dafür, dass ein gemeinsamer Anschluss oder ein bestimmtes Rohr beschädigt ist.",
  },
  "roethenbach-an-der-pegnitz": {
    heading: "Röthenbach an der Pegnitz vollständig angeben",
    context:
      "Unser östliches Einsatzgebiet umfasst Röthenbach an der Pegnitz. Die vollständige Ortsangabe ist wichtig, weil „Röthenbach“ auch für andere Orte und Stadtteile verwendet wird. Nennen Sie Straße, Hausnummer und den betroffenen Bereich im Objekt.",
    access:
      "Ist ein Ablauf außerhalb des Wohnbereichs betroffen, beschreiben Sie die Lage möglichst konkret: etwa Keller, Hof oder Garage. Für eine Prüfung der Grundstücksleitung benötigen wir einen nutzbaren Zugang; eine Ortsangabe an der Pegnitz sagt nichts über die technische Ursache aus.",
    planning:
      "Bei Rückstau nach Regen dokumentieren Sie den zeitlichen Zusammenhang, ohne daraus bereits einen Leitungsschaden abzuleiten. Reinigung, Rückstauschutz und die Ursache eindringenden Wassers sind getrennte Fragen.",
  },
  "lauf-an-der-pegnitz": {
    heading: "Private Leitung und öffentliche Entwässerung abgrenzen",
    context:
      "Lauf an der Pegnitz gehört zum nordöstlichen Einsatzgebiet. Für die Auftragserfassung verwenden wir die vollständige Ortsbezeichnung. Bei weiter außen liegenden Ortsteilen bestätigen wir die Lage anhand der genauen Adresse.",
    access:
      "Für einen Kanalauftrag sind vorhandene Schächte und der bekannte Anschlussverlauf hilfreicher als die Entfernung zur Stadtmitte. Teilen Sie mit, ob der Zugang auf privatem Grund liegt und wer ihn freigeben kann. Öffentliche Schächte werden nicht eigenständig geöffnet.",
    planning:
      "Sind mehrere Grundstücke oder der Straßenraum betroffen, muss die Zuständigkeit vor weitergehenden Arbeiten geklärt werden. Beschreiben Sie deshalb genau, wo Wasser austritt und ob Nachbarn dieselbe Beobachtung melden.",
  },
  herzogenaurach: {
    heading: "Planbare Arbeiten mit der Gebäudenutzung abstimmen",
    context:
      "Herzogenaurach liegt nordwestlich von Nürnberg. Eine Anfrage für eine Wohnung benötigt andere Vorinformationen als ein Auftrag für ein betrieblich genutztes Objekt. Nennen Sie deshalb Nutzung, betroffene Anschlüsse und das gewünschte Zeitfenster direkt bei der Aufnahme.",
    access:
      "Bei einem Betrieb sind eine Anmeldung am Empfang, Zufahrtsregeln oder eine Begleitung zum Technikraum gegebenenfalls vorab zu organisieren. In einem Wohnhaus ist meist der Zugang zur betroffenen Stelle und zum Keller entscheidend.",
    planning:
      "Wenn Reinigung oder Kameraaufnahme außerhalb bestimmter Nutzungszeiten stattfinden soll, planen wir den Umfang entsprechend. Eine dringende Störung kann dadurch nicht automatisch auf einen späteren Wartungstermin verschoben werden.",
  },
  "altdorf-bei-nuernberg": {
    heading: "Altdorf bei Nürnberg und den Ortsteil benennen",
    context:
      "Altdorf bei Nürnberg liegt östlich bis südöstlich des Ausgangspunkts. Die Ergänzung „bei Nürnberg“ ist für die eindeutige Zuordnung wichtig. Für Ortsteile am Rand des Einsatzbereichs prüfen wir die vollständige Adresse vor der Zusage.",
    access:
      "Bei einer Grundstücksentwässerung mit mehreren möglichen Zugängen nennen Sie den nächstliegenden Revisionspunkt und legen vorhandene Pläne bereit. Ein freier Weg zum Schacht spart Suchaufwand; den Deckel müssen Sie dafür nicht selbst öffnen.",
    planning:
      "Besteht der Auftrag aus Untersuchung und anschließender Reparaturplanung, sollten beide Schritte getrennt vereinbart werden. So steht der Umfang nicht schon fest, bevor Lage und Zustand der Leitung bekannt sind.",
  },
  langenzenn: {
    heading: "Anfahrt und Arbeitszugang getrennt betrachten",
    context:
      "Langenzenn ist ein Einsatzort westlich bis nordwestlich von Nürnberg. Die Luftlinie ordnet den Ort in den Radius ein; für die tatsächliche Anfahrt brauchen wir Straße, Hausnummer und gegebenenfalls den Ortsteil.",
    access:
      "Bei einem rückwärtigen Gebäudeteil kann der Arbeitszugang auf einer anderen Seite als der Haupteingang liegen. Beschreiben Sie Zufahrt, Tor und Weg zum betroffenen Anschluss, damit wir den Auftrag passend vorbereiten können.",
    planning:
      "Für wiederkehrende Störungen ist eine kurze zeitliche Übersicht hilfreich: wann sie auftraten, welche Stellen betroffen waren und welche Arbeiten bereits erfolgt sind. Daraus lässt sich eine gezieltere nächste Untersuchung ableiten.",
  },
  roth: {
    heading: "Roth mit genauer Adresse statt einer Landkreisangabe",
    context:
      "Die Stadt Roth liegt im südlichen 30-km-Einsatzgebiet. Ein Auftrag in der Stadt ist von einer Anfrage irgendwo im Landkreis Roth zu unterscheiden. Nennen Sie deshalb den tatsächlichen Ort und Ortsteil; die Landkreisbezeichnung allein begrenzt die Anfahrt nicht.",
    access:
      "Für eine Leitung zwischen Gebäude und Grundstücksgrenze sind Lage und Erreichbarkeit der Revisionspunkte wesentlich. Bei einem Zugang in Nebenräumen organisieren Sie die Schlüssel und einen Ansprechpartner am Objekt.",
    planning:
      "Beschreiben Sie, ob es um Schmutzwasser, einen einzelnen Ablauf oder eine Außenentwässerung geht. Diese Unterscheidung bestimmt die Vorbereitung und verhindert, dass eine Leistung allein nach der allgemeinen Bezeichnung „Kanal“ eingeplant wird.",
  },
  baiersdorf: {
    heading: "Randlagen vor der Zusage anhand der Adresse prüfen",
    context:
      "Baiersdorf liegt nördlich von Nürnberg. Der amtliche Ortsmittelpunkt befindet sich innerhalb unseres Radius; weiter entfernte Ortsteile und einzelne Adressen beurteilen wir separat. Eine Stadtseite ist keine unbegrenzte Zusage für alle angrenzenden Gemeinden.",
    access:
      "Wenn Wasser an einem tief liegenden Ablauf austritt, teilen Sie mit, ob der Raum sicher zugänglich ist. Bei einer planbaren Kameraaufnahme sind Leitungsplan, Schachtlage und ein erreichbarer Verantwortlicher die wichtigsten Vorbereitungen.",
    planning:
      "Die Nähe zu einem Gewässer oder eine Wetterlage allein beweist keine Ursache. Wir trennen den beobachteten Wasseraustritt von Vermutungen über die Leitung und stimmen die Untersuchung anhand der konkreten Situation ab.",
  },
  abenberg: {
    heading: "Ortsteil und private Zufahrt gemeinsam nennen",
    context:
      "Abenberg liegt südwestlich des Nürnberger Ausgangspunkts. Bei einem Objekt außerhalb des zentralen Ortsbereichs ist der Ortsteil für die Einsatzplanung besonders hilfreich. Die genaue Adresse wird vor der Anfahrt auf die vereinbarte 30-km-Abdeckung geprüft.",
    access:
      "Beschreiben Sie bei einer langen oder schmalen privaten Zufahrt die Zugangssituation. Für Arbeiten an einer Außenleitung sind vorhandene Revisionsöffnungen und der Weg dorthin wichtiger als eine pauschale Aussage über die Grundstücksgröße.",
    planning:
      "Liegt kein Leitungsplan vor, sammeln Sie bekannte Zugangspunkte und frühere Arbeitsberichte. Eine Ortung kann eine eigene Leistung sein und wird bei Bedarf vorab in den Umfang aufgenommen.",
  },
  heilsbronn: {
    heading: "Vorhandene Befunde für eine gezielte Untersuchung nutzen",
    context:
      "Heilsbronn gehört zum westlich bis südwestlich gelegenen Einsatzgebiet. Geben Sie den Stadtteil und die genaue Hausadresse an, damit der Einsatz dem richtigen Objekt zugeordnet wird. Die Fahrzeit besprechen wir nach aktueller Verfügbarkeit.",
    access:
      "Wenn ein früherer Techniker über einen bestimmten Revisionspunkt gearbeitet hat, teilen Sie dessen Lage mit. Ein vorhandenes Video oder Protokoll kann unnötiges Suchen vermeiden, ersetzt aber nicht die Prüfung der heutigen Situation.",
    planning:
      "Bei wiederholtem Rückstau lohnt es sich, die bisherigen Maßnahmen chronologisch zu betrachten. Ziel ist eine begründete Entscheidung zwischen erneuter Reinigung, Kameraaufnahme und Reparatur – nicht automatisch die umfangreichste Maßnahme.",
  },
  graefenberg: {
    heading: "Adresse am nordöstlichen Rand des Einsatzgebiets prüfen",
    context:
      "Gräfenberg liegt nordöstlich von Nürnberg und gehört geografisch zu Oberfranken. Unser Radius richtet sich nach der Entfernung und endet nicht an einer Bezirksgrenze. Für weiter entfernte Ortsteile bestätigen wir die Abdeckung anhand der Objektadresse.",
    access:
      "Nennen Sie bei einer Anfrage einen nutzbaren Eingang und die Lage des betroffenen Anschlusses. Bei Außenleitungen helfen Informationen zu Schächten und zum bekannten Rohrverlauf; die Ortslage erlaubt keine pauschale Aussage über das verbaute Material.",
    planning:
      "Für einen Untersuchungstermin können Reinigungszustand und Zugänglichkeit vorab besprochen werden. So wird klar, ob eine Kamerabefahrung unmittelbar möglich ist oder zunächst andere Arbeiten erforderlich sind.",
  },
  hersbruck: {
    heading: "Auftrag und Anfahrt im östlichen Einsatzgebiet vorbereiten",
    context:
      "Hersbruck liegt östlich von Nürnberg innerhalb des 30-km-Radius. Bei der Aufnahme erfassen wir die konkrete Adresse und die aktuelle Störung. Für Objekte in Randlagen klären wir die tatsächliche Abdeckung vor der Einsatzbestätigung.",
    access:
      "Wenn ein Revisionsschacht oder Arbeitsraum nur zu bestimmten Zeiten zugänglich ist, nennen Sie das bereits bei der Anfrage. Für einen Betrieb und ein privates Wohnobjekt können unterschiedliche Ansprechpartner und Freigaben erforderlich sein.",
    planning:
      "Beobachtungen vor und nach Regen oder nach Nutzung mehrerer Anschlüsse helfen, den Ablauf der Störung zu verstehen. Daraus wird noch keine Ferndiagnose; die Wahl des Verfahrens folgt dem überprüften Befund.",
  },
  windsbach: {
    heading: "Eine genaue Adresse ist hier besonders wichtig",
    context:
      "Windsbach liegt nahe dem südwestlichen Rand unseres Radius. Die Einordnung bezieht sich auf den amtlichen Ortsmittelpunkt. Vor einer Zusage prüfen wir daher Straße und Ortsteil; eine Luftlinie unter 30 km bedeutet nicht, dass jede Adresse im gesamten Gemeindegebiet abgedeckt ist.",
    access:
      "Bei Grundstücksleitungen klären Sie, über welchen Eingang oder welche Zufahrt der Arbeitsbereich erreichbar ist. Wenn mehrere Gebäude gemeinsam entwässern, brauchen wir den bekannten Leitungsbezug und eine zuständige Person für den Zugang.",
    planning:
      "Eine planbare Inspektion lässt sich am besten mit konkreter Fragestellung vereinbaren. Teilen Sie mit, ob Sie eine Verstopfung beheben, einen Befund dokumentieren oder einen Reparaturvorschlag erhalten möchten.",
  },
  hilpoltstein: {
    heading: "Hilpoltstein im Süden eindeutig zuordnen",
    context:
      "Hilpoltstein im Landkreis Roth liegt am südlichen Rand des 30-km-Gebiets. Es ist nicht mit Hiltpoltstein im Norden zu verwechseln. Die genaue Adresse und Postleitzahl sind hier deshalb für die Einsatzaufnahme besonders wichtig.",
    access:
      "Vor der Anfahrt bestätigen wir die Abdeckung des konkreten Objekts. Beschreiben Sie danach den Zugang zur betroffenen Leitung, mögliche Schachtlagen und eine erreichbare Kontaktperson, damit der Termin fachlich vorbereitet werden kann.",
    planning:
      "Für einen akuten Einsatz nennen wir eine realistische Einschätzung nach aktueller Lage. Für eine geplante Untersuchung vereinbaren wir ein Zeitfenster und den Umfang. Kilometerangaben werden dabei nicht in pauschale Ankunftsversprechen umgerechnet.",
  },
};
