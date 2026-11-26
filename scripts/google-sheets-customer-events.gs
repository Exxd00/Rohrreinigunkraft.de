/**
 * Bound Apps Script webhook for rohrreinigung-kraft.de customer events.
 * Deploy as a Web App and use its URL as GOOGLE_SHEETS_WEBHOOK_URL.
 */
const TARGET_SHEET_NAME = "📞 Alle Anfragen";
const EXPECTED_SOURCE_SITE = "rohrreinigung-kraft.de";
const SCHEMA_VERSION = "rrk-customer-event-v1";
const EVENT_ID_COLUMN = 18;
const REQUIRED_HEADERS = [
  "Datum",
  "Status",
  "Typ",
  "Name",
  "Telefon",
  "E-Mail",
  "Ort",
  "Dienstleistung",
  "Dringlichkeit",
  "Nachricht",
  "Bilder",
  "Anrufdauer",
  "Anrufstatus",
  "Quelle",
  "Kampagne",
  "GCLID",
  "Bewertung",
  "Datensatz-ID",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    validatePayload_(payload);

    const sheet = customerEventSheet();

    const existingRow = findEventRow_(sheet, payload.eventId);
    if (existingRow) {
      return jsonResponse_({
        success: true,
        sheetName: TARGET_SHEET_NAME,
        eventId: payload.eventId,
        row: existingRow,
        duplicate: true,
      });
    }

    const isCall = payload.eventType === "call";
    const requestType = payload.requestType || "contact";
    const type = isCall
      ? "📞 Anruf (Website)"
      : requestType === "callback"
        ? "📞 Rückrufwunsch"
        : "📝 Formular";

    const ads = adsAttribution_(payload);
    sheet.appendRow([
      new Date(payload.timestamp),
      "🆕 Neu",
      type,
      safeCell_(
        payload.name ||
          (isCall ? "📞 Website-Telefonklick" : "Website-Anfrage"),
      ),
      safeCell_(payload.phone),
      safeCell_(payload.email),
      safeCell_(payload.city),
      safeCell_(payload.service),
      isCall ? "🔴 NOTFALL" : requestType === "callback" ? "🟡 Hoch" : "🟢 Normal",
      safeCell_(payload.message),
      Number(payload.images || 0),
      "",
      isCall ? "⚠️ Gespräch nicht bestätigt" : "",
      safeCell_(payload.source || "Website"),
      safeCell_(ads.campaign),
      safeCell_(clickId_(payload)),
      "",
      safeCell_(payload.eventId),
      "", // S: existing operational column
      "", // T: internal notes
      "", // U: historical revenue
      safeCell_(ads.keyword),
      ads.campaignId ? "'" + ads.campaignId : "", // keep long Ads IDs as text
    ]);

    return jsonResponse_({
      success: true,
      sheetName: TARGET_SHEET_NAME,
      eventId: payload.eventId,
      row: sheet.getLastRow(),
      duplicate: false,
    });
  } catch (error) {
    return jsonResponse_({ success: false, error: String(error) });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

// Configure CUSTOMER_EVENTS_SPREADSHEET_ID in the bound project's Script
// Properties. This resolver can also be run in the editor as a read-only check.
function customerEventSheet() {
  const id = PropertiesService.getScriptProperties().getProperty("CUSTOMER_EVENTS_SPREADSHEET_ID");
  if (!id) throw new Error("Customer event spreadsheet is not configured");
  const sheet = SpreadsheetApp.openById(id).getSheetByName(TARGET_SHEET_NAME);
  if (!sheet) throw new Error("Required sheet is missing: " + TARGET_SHEET_NAME);
  validateHeaders_(sheet);
  return sheet;
}

function validatePayload_(payload) {
  const isLegacyProductionPayload =
    payload.schemaVersion == null && payload.targetSheet == null;
  if (!isLegacyProductionPayload && payload.schemaVersion !== SCHEMA_VERSION) {
    throw new Error("Invalid schema");
  }
  if (
    !isLegacyProductionPayload &&
    payload.targetSheet !== TARGET_SHEET_NAME
  ) {
    throw new Error("Invalid target sheet");
  }
  if (payload.sourceSite !== EXPECTED_SOURCE_SITE) throw new Error("Invalid source site");
  if (
    typeof payload.eventId !== "string" ||
    !/^[A-Za-z0-9._:-]{1,100}$/.test(payload.eventId)
  ) {
    throw new Error("Invalid eventId");
  }
  if (!payload.timestamp || isNaN(new Date(payload.timestamp).getTime())) throw new Error("Invalid timestamp");
}

// Current clients send an attribution snapshot for a single ad touch. During
// rollout, older clients can supply the original tagged landing URL instead.
function adsAttribution_(payload) {
  const explicit = {
    campaign: payload.campaign || "",
    keyword: payload.keyword || "",
    campaignId: /^\d{1,20}$/.test(payload.campaignId || "") ? payload.campaignId : "",
  };
  if (explicit.keyword || explicit.campaignId) return explicit;

  const landing = /^https:\/\/(?:www\.)?rohrreinigung-?kraft\.de(?:\/[^?#]*)?\?([^#]*)/i
    .exec(String(payload.landingPage || ""));
  if (!landing) return explicit;
  const tags = Object.create(null);
  try {
    for (const part of landing[1].split("&")) {
      const separator = part.indexOf("=");
      if (separator < 1) continue;
      const key = part.slice(0, separator);
      if (!(key in tags)) {
        tags[key] = decodeURIComponent(part.slice(separator + 1).replace(/\+/g, " ")).trim();
      }
    }
  } catch (_) {
    return explicit;
  }
  // Legacy clients can carry old campaign fields; match the landing click
  // to the still-valid GCLID on this submission before taking its metadata.
  if (!payload.gclid || tags.gclid !== payload.gclid) return explicit;
  if (tags.utm_source && !/^google(?:ads)?$/i.test(tags.utm_source)) return explicit;
  const id = [tags.campaignid, tags.gad_campaignid, tags.campaign_id, tags.utm_id, tags.utm_campaign]
    .find(value => /^\d{1,20}$/.test(value || ""));
  const name = tags.utm_campaign;
  const keyword = tags.keyword || tags.utm_term;
  return {
    campaign: name && !/[{}]/.test(name) && !/^\d+$/.test(name) ? name :
      id === "23874769195" ? "RK | Search | Mittelfranken | High Intent" : explicit.campaign,
    campaignId: id || "",
    keyword: keyword && !/[{}]/.test(keyword) ? keyword.slice(0, 200) : "",
  };
}

function clickId_(payload) {
  if (payload.gclid) return payload.gclid;
  return [
    payload.gbraid ? "GBRAID=" + payload.gbraid : "",
    payload.wbraid ? "WBRAID=" + payload.wbraid : "",
  ]
    .filter(String)
    .join(" | ");
}

function safeCell_(value) {
  const text = value == null ? "" : String(value);
  return /^\s*[=+\-@]/.test(text) ? "'" + text : text;
}

function validateHeaders_(sheet) {
  const headers = sheet
    .getRange(1, 1, 1, REQUIRED_HEADERS.length)
    .getDisplayValues()[0];
  for (let index = 0; index < REQUIRED_HEADERS.length; index += 1) {
    if (headers[index] !== REQUIRED_HEADERS[index]) {
      throw new Error(
        "Unexpected lead-sheet header at column " + (index + 1),
      );
    }
  }
}

function findEventRow_(sheet, eventId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 3) return 0;
  const finder = sheet
    .getRange(3, EVENT_ID_COLUMN, lastRow - 2, 1)
    .createTextFinder(eventId)
    .matchEntireCell(true)
    .findNext();
  return finder ? finder.getRow() : 0;
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
