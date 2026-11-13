import { getGclid, getTrackingData } from "./gclid";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingEvent = "thank_you_page";
const CALL_CLICK_DEDUPLICATION_MS = 1200;
let lastCallClickAt = 0;

const trackEvent = (
  eventName: TrackingEvent,
  eventParams: Record<string, unknown>,
) => {
  if (typeof window === "undefined") return;

  const tracking = getTrackingData();
  const params = {
    event_category: "lead",
    currency: "EUR",
    gclid: tracking.gclid || undefined,
    gbraid: tracking.gbraid || undefined,
    wbraid: tracking.wbraid || undefined,
    traffic_source: tracking.source,
    traffic_medium: tracking.medium,
    traffic_campaign: tracking.campaign || undefined,
    ...eventParams,
  };

  window.gtag?.("event", eventName, params);

  if (process.env.NODE_ENV === "development") {
    console.log(`[GA4] ${eventName}`, params);
  }
};

const beginCallClick = () => {
  const now = Date.now();
  if (now - lastCallClickAt < CALL_CLICK_DEDUPLICATION_MS) return null;
  lastCallClickAt = now;
  return crypto.randomUUID();
};

const postDirectCallClickToSheets = (source: string, eventId: string) => {
  if (typeof window === "undefined") return;

  const tracking = getTrackingData();
  const body = JSON.stringify({
    eventType: "direct_call_click",
    eventId,
    source,
    utmSource: tracking.source,
    utmMedium: tracking.medium,
    utmCampaign: tracking.campaign,
    gclid: tracking.gclid,
    gbraid: tracking.gbraid,
    wbraid: tracking.wbraid,
    landingPage: tracking.landingPage,
    currentPage: tracking.currentPage,
    referrer: tracking.referrer,
  });

  void fetch("/api/call-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  })
    .then((response) => {
      if (!response.ok && typeof navigator.sendBeacon === "function") {
        navigator.sendBeacon(
          "/api/call-event",
          new Blob([body], { type: "application/json" }),
        );
      }
    })
    .catch((error) => {
      if (typeof navigator.sendBeacon === "function") {
        navigator.sendBeacon(
          "/api/call-event",
          new Blob([body], { type: "application/json" }),
        );
      }
      if (process.env.NODE_ENV === "development") {
        console.error("[Sheets] direct_call_click", error);
      }
    });
};

// Basic engagement event for telephone links. It stays outside the Google Ads
// conversion helper, but is recorded in GA4 and Alle Anfragen.
export const trackDirectCallClick = (source: string) => {
  if (typeof window === "undefined") return;

  // Match the existing consent banner. A telephone link must still work when
  // consent is absent, rejected, or browser storage is unavailable.
  try {
    if (window.localStorage.getItem("rk_nuernberg_consent") !== "accepted") {
      return;
    }
  } catch {
    return;
  }

  const eventId = beginCallClick();
  if (!eventId) return;

  window.gtag?.("event", "direct_call_click", {
    send_to: "G-SFZFMCJXG2",
    event_category: "engagement",
    event_label: source,
    interaction_type: "direct_call",
    interaction_location: "telephone_link",
    contact_method: "phone",
    site: "nuernberg",
    event_id: eventId,
  });

  postDirectCallClickToSheets(source, eventId);
};

// Compatibility for existing imports. The shared click guard keeps each
// physical telephone-link click to one GA4 and one Sheets event.
export const trackPhoneClick = trackDirectCallClick;

// Emitted only after /api/contact succeeds and the guarded thank-you page is
// reached. This is the reliable website-form lead event.
export const trackThankYouPage = (eventId?: string) => {
  const tracking = getTrackingData();
  trackEvent("thank_you_page", {
    event_label: "contact_form_success",
    lead_type: "contact_form",
    contact_method: "form",
    event_id: eventId,
    landing_page: tracking.landingPage,
  });
};

// Compatibility exports for existing UI imports. They intentionally do not
// create additional GA4 conversions, preventing duplicate or false leads.
export const trackCallConfirmed = trackDirectCallClick;
export const trackCallIntent = (_source: string) => {};
export const trackEmailIntent = (_source: string) => {};
export const trackEmailConfirmed = (_source: string) => {};
export const trackFormConfirmed = (_data?: Record<string, unknown>) => {};
export const trackGenerateLead = (_source: string, _location?: string) => {};
export const trackCityView = (_name: string, _slug: string) => {};
export const trackServiceView = (_name: string, _slug: string) => {};
export const trackWhatsAppClick = (_source: string) => {};
export const trackCTAClick = (_name: string, _location?: string) => {};
export const trackFormSubmit = trackFormConfirmed;
export const trackLead = (_data?: Record<string, unknown>) => {};

export const getCompleteTrackingData = () => getTrackingData();
