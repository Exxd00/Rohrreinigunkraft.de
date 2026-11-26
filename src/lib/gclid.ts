/**
 * GCLID Tracking Utility
 * Captures Google Click ID from URL and stores for conversion tracking
 */

const GCLID_KEY = "rk_gclid";
const GCLID_TIMESTAMP_KEY = "rk_gclid_ts";
const SESSION_DATA_KEY = "rk_session";
const CLICK_MAX_AGE = 90 * 24 * 60 * 60 * 1000;
const CAMPAIGN_NAMES: Readonly<Record<string, string>> = {
  "23874769195": "RK | Search | Mittelfranken | High Intent",
};

function tag(params: URLSearchParams, key: string, limit = 160): string {
  const value = params.get(key)?.trim() || "";
  return /[{}]/.test(value) ? "" : value.slice(0, limit);
}

function campaignIdFrom(params: URLSearchParams): string {
  for (const key of ["campaignid", "gad_campaignid", "campaign_id", "utm_id", "utm_campaign"]) {
    const value = tag(params, key);
    if (/^\d{1,20}$/.test(value)) return value;
  }
  return "";
}

function isRecent(timestamp: number | null): boolean {
  if (!timestamp || !Number.isFinite(timestamp)) return false;
  const age = Date.now() - timestamp;
  return age >= 0 && age <= CLICK_MAX_AGE;
}

function hasPaidGoogleTags(params: URLSearchParams): boolean {
  const source = tag(params, "utm_source");
  if (source && !/^google$/i.test(source)) return false;
  if (["gclid", "gbraid", "wbraid"].some((key) => !!tag(params, key))) return true;
  if (/^\d{1,20}$/.test(tag(params, "gad_campaignid"))) return true;
  if (source) {
    return /^google$/i.test(source) &&
      /^(cpc|ppc|paidsearch|paid_search)$/i.test(tag(params, "utm_medium"));
  }
  const id = campaignIdFrom(params);
  return !!id && (!!CAMPAIGN_NAMES[id] || params.has("keyword"));
}

export interface SessionData {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  gclidTimestamp: number | null;
  trackingVersion?: 2;
  firstPage: string;
  landingPage: string;
  referrer: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
}

/**
 * Initialize GCLID tracking - call on page load
 */
export function initGclidTracking(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const session = getSessionData();
  const gclid = tag(params, "gclid", 200);
  const paid = hasPaidGoogleTags(params);
  const hasNewTouch = paid || ["utm_source", "utm_medium", "utm_campaign"]
    .some((key) => !!tag(params, key));
  if (!hasNewTouch && session.firstPage) {
    rememberTab(session);
    return;
  }

  if (paid && gclid) saveGclid(gclid);
  // Replace a tagged touch as a unit. A new click must never
  // inherit a keyword or campaign from a previous advertisement.
  saveSessionData({
    trackingVersion: 2,
    gclid: hasNewTouch ? (paid && gclid) || null : session.gclid,
    firstPage: session.firstPage || window.location.pathname,
    landingPage: window.location.href,
    referrer: document.referrer || "direct",
    utmSource: tag(params, "utm_source") || (paid ? "google" : null),
    utmMedium: tag(params, "utm_medium") || (paid ? "cpc" : null),
    utmCampaign: tag(params, "utm_campaign") || null,
    utmContent: tag(params, "utm_content") || null,
    utmTerm: tag(params, "utm_term") || null,
    gbraid: paid ? tag(params, "gbraid", 200) || null : null,
    wbraid: paid ? tag(params, "wbraid", 200) || null : null,
    gclidTimestamp: paid ? Date.now() : null,
  });
}

/**
 * Save GCLID to localStorage
 */
export function saveGclid(gclid: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(GCLID_KEY, gclid);
    localStorage.setItem(GCLID_TIMESTAMP_KEY, Date.now().toString());
  } catch (e) {
    console.warn("Failed to save GCLID:", e);
  }
}

/**
 * Get stored GCLID (if not expired)
 */
export function getGclid(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const gclid = localStorage.getItem(GCLID_KEY);
    const timestamp = localStorage.getItem(GCLID_TIMESTAMP_KEY);

    if (!gclid || !timestamp) return null;

    // Check if expired
    if (!isRecent(Number(timestamp))) {
      clearGclid();
      return null;
    }

    return gclid;
  } catch (e) {
    return null;
  }
}

/**
 * Clear stored GCLID
 */
export function clearGclid(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(GCLID_KEY);
    localStorage.removeItem(GCLID_TIMESTAMP_KEY);
  } catch (e) {
    // Ignore
  }
}

// Internal navigation and another ad open in a second tab must not transfer
// one tab's matched keyword or click ID to the other tab's lead.
function rememberTab(session: SessionData): void {
  try {
    window.sessionStorage.setItem(SESSION_DATA_KEY, JSON.stringify(session));
  } catch {
    // Fall back to the existing persistent storage when unavailable.
  }
}

/**
 * Get session data
 */
export function getSessionData(): SessionData {
  if (typeof window === "undefined") {
    return {
      gclid: null,
      gbraid: null,
      wbraid: null,
      gclidTimestamp: null,
      firstPage: "",
      landingPage: "",
      referrer: "",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
    };
  }

  try {
    const tab = window.sessionStorage.getItem(SESSION_DATA_KEY);
    if (tab) {
      const saved: SessionData = JSON.parse(tab);
      return { ...saved, gclid: isRecent(saved.gclidTimestamp) ? saved.gclid : null };
    }
  } catch {
    // Older and storage-restricted sessions use the existing local record.
  }

  try {
    const stored = localStorage.getItem(SESSION_DATA_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // A later non-Google touch has its own empty click ID. Preserve the
      // historical ID in its original slot without attaching it to that touch.
      const savedClick = getGclid();
      return {
        ...parsed,
        gclid: parsed.trackingVersion === 2 && parsed.gclid !== savedClick ? null : savedClick,
        gbraid: parsed.gbraid || null,
        wbraid: parsed.wbraid || null,
      };
    }
  } catch (e) {
    // Ignore
  }

  return {
    gclid: getGclid(),
    gbraid: null,
    wbraid: null,
    gclidTimestamp: null,
    firstPage: "",
    landingPage: "",
    referrer: "",
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
    utmTerm: null,
  };
}

/**
 * Save session data
 */
export function saveSessionData(data: Partial<SessionData>): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getSessionData();
    const currentGclid = getGclid();
    const updated = {
      ...existing,
      ...data,
      gclid: data.gclid === undefined ? currentGclid : data.gclid,
    };
    rememberTab(updated);
    localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to save session data:", e);
  }
}

/**
 * Get all tracking data for form submission
 */
export function getTrackingData(): {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  source: string;
  medium: string;
  campaign: string;
  campaignId: string;
  keyword: string;
  landingPage: string;
  currentPage: string;
  referrer: string;
} {
  const session = getSessionData();

  // Use only fields observed together on this landing. This also reads older
  // stored sessions without a migration or guessing the origin of a click.
  let landing = new URLSearchParams();
  try {
    landing = new URL(session.landingPage).searchParams;
  } catch {
    // Legacy sessions may have a missing or relative landing URL.
  }
  const taggedSource = tag(landing, "utm_source");
  const otherSource = !!taggedSource && !/^google$/i.test(taggedSource);
  const currentGclid = otherSource ? null : session.gclid;
  const taggedPaid = hasPaidGoogleTags(landing);
  const landingClick = tag(landing, "gclid", 200);
  const paid = taggedPaid && isRecent(session.gclidTimestamp) &&
    (!landingClick || landingClick === currentGclid);
  const campaignId = paid ? campaignIdFrom(landing) : "";
  const campaignTag = tag(landing, "utm_campaign");
  const campaignName = /^\d+$/.test(campaignTag) ? "" : campaignTag;
  const campaign = paid
    ? campaignName || CAMPAIGN_NAMES[campaignId] || ""
    : taggedPaid || currentGclid ? "" : session.utmCampaign || "";

  // Determine source - use UTM if available, otherwise check GCLID
  let source = "direct";
  let medium = "none";

  if (session.utmSource && (!taggedPaid || paid)) {
    source = session.utmSource;
    medium = session.utmMedium || "none";
  } else if (currentGclid) {
    source = "google";
    medium = "cpc";
  } else if (session.referrer && session.referrer !== "direct") {
    // Try to determine source from referrer
    try {
      const refUrl = new URL(session.referrer);
      if (refUrl.hostname.includes("google")) {
        source = "google";
        medium = "organic";
      } else if (
        refUrl.hostname.includes("facebook") ||
        refUrl.hostname.includes("fb.")
      ) {
        source = "facebook";
        medium = "social";
      } else if (refUrl.hostname.includes("instagram")) {
        source = "instagram";
        medium = "social";
      } else {
        source = refUrl.hostname;
        medium = "referral";
      }
    } catch (e) {
      source = "referral";
      medium = "referral";
    }
  }

  return {
    gclid: currentGclid,
    gbraid: !otherSource && isRecent(session.gclidTimestamp) ? session.gbraid : null,
    wbraid: !otherSource && isRecent(session.gclidTimestamp) ? session.wbraid : null,
    source,
    medium,
    campaign,
    campaignId,
    keyword: paid ? tag(landing, "keyword") || tag(landing, "utm_term") : "",
    landingPage: session.landingPage || "",
    currentPage: typeof window !== "undefined" ? window.location.href : "",
    referrer: session.referrer || "",
  };
}

/**
 * Check if user came from Google Ads
 */
export function isFromGoogleAds(): boolean {
  return !!getTrackingData().gclid;
}
