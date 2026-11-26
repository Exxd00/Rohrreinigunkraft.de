/**
 * Google Ads API Client
 * Handles all communication with Google Ads API
 */

export interface GoogleAdsConfig {
  developerToken: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  customerId: string; // The actual account to manage (789-424-2096)
  loginCustomerId?: string; // The MCC/Manager account (476-210-5656)
}

export interface ConversionAction {
  id: string;
  name: string;
  category: string;
  status: "ENABLED" | "DISABLED" | "REMOVED";
  type: string;
  countingType: string;
  attributionModelSettings?: {
    attributionModel: string;
  };
  valueSettings?: {
    defaultValue: number;
    alwaysUseDefaultValue: boolean;
  };
  phoneCallDurationSeconds?: number;
}

export interface OfflineConversion {
  conversionAction: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  conversionDateTime: string;
  conversionValue?: number;
  currencyCode?: string;
  orderId?: string;
}

export interface CampaignData {
  id: string;
  name: string;
  status: string;
  budget: {
    amountMicros: number;
    deliveryMethod: string;
  };
  startDate?: string;
  endDate?: string;
  targetSpend?: {
    cpcBidCeilingMicros: number;
  };
}

export interface ReportQuery {
  customerId: string;
  query: string;
  pageSize?: number;
  pageToken?: string;
}

export interface CallConversionData {
  callerId: string;
  callStartDateTime: string;
  conversionAction: string;
  conversionDateTime: string;
  conversionValue?: number;
  currencyCode?: string;
}

// API Base URL - Using v24 (current supported version as of May 2026)
const GOOGLE_ADS_API_VERSION = "v24";
const GOOGLE_ADS_API_URL = "https://googleads.googleapis.com";
const OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";

/**
 * Get access token from refresh token
 */
export async function getAccessToken(config: GoogleAdsConfig): Promise<string> {
  const response = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Make authenticated request to Google Ads API
 */
export async function googleAdsRequest(
  config: GoogleAdsConfig,
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body?: unknown
): Promise<unknown> {
  const accessToken = await getAccessToken(config);

  // Use loginCustomerId (MCC account) for authentication if provided
  // Otherwise fall back to customerId
  const loginId = (config.loginCustomerId || config.customerId).replace(/-/g, "");

  const response = await fetch(`${GOOGLE_ADS_API_URL}${endpoint}`, {
    method,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "developer-token": config.developerToken,
      "Content-Type": "application/json",
      "login-customer-id": loginId,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google Ads API error: ${error}`);
  }

  return response.json();
}

/**
 * Search API (GAQL queries)
 */
export async function searchGoogleAds(
  config: GoogleAdsConfig,
  query: string
): Promise<unknown[]> {
  const customerId = config.customerId.replace(/-/g, "");
  const endpoint = `/${GOOGLE_ADS_API_VERSION}/customers/${customerId}/googleAds:search`;

  const rows: unknown[] = [];
  let pageToken: string | undefined;
  do {
    const page = await googleAdsRequest(config, endpoint, "POST", {
      query,
      ...(pageToken ? { pageToken } : {}),
    }) as { results?: unknown[]; nextPageToken?: string };
    for (const row of page.results || []) rows.push(row);
    pageToken = page.nextPageToken;
  } while (pageToken);
  return rows;
}

// ============================
// CONVERSION ACTIONS
// ============================

/**
 * Get all conversion actions
 */
export async function getConversionActions(config: GoogleAdsConfig): Promise<ConversionAction[]> {
  const query = `
    SELECT
      conversion_action.id,
      conversion_action.name,
      conversion_action.category,
      conversion_action.status,
      conversion_action.type,
      conversion_action.counting_type,
      conversion_action.attribution_model_settings.attribution_model,
      conversion_action.value_settings.default_value,
      conversion_action.phone_call_duration_seconds
    FROM conversion_action
    WHERE conversion_action.status != 'REMOVED'
  `;

  const results = await searchGoogleAds(config, query);

  return results.map((row: unknown) => {
    const r = row as { conversionAction: Record<string, unknown> };
    return {
      id: r.conversionAction.id as string,
      name: r.conversionAction.name as string,
      category: r.conversionAction.category as string,
      status: r.conversionAction.status as "ENABLED" | "DISABLED" | "REMOVED",
      type: r.conversionAction.type as string,
      countingType: r.conversionAction.countingType as string,
      attributionModelSettings: r.conversionAction.attributionModelSettings as { attributionModel: string } | undefined,
      valueSettings: r.conversionAction.valueSettings as { defaultValue: number; alwaysUseDefaultValue: boolean } | undefined,
      phoneCallDurationSeconds: r.conversionAction.phoneCallDurationSeconds as number | undefined,
    };
  });
}

/**
 * Get conversion action by name
 */
export async function getConversionActionByName(
  config: GoogleAdsConfig,
  name: string
): Promise<ConversionAction | null> {
  const actions = await getConversionActions(config);
  return actions.find(a => a.name === name) || null;
}

/**
 * Create a new conversion action for call tracking
 */
export async function createCallConversionAction(
  config: GoogleAdsConfig,
  name: string,
  defaultValue = 50
): Promise<string> {
  const customerId = config.customerId.replace(/-/g, "");
  const endpoint = `/${GOOGLE_ADS_API_VERSION}/customers/${customerId}/conversionActions:mutate`;

  const result = await googleAdsRequest(config, endpoint, "POST", {
    operations: [
      {
        create: {
          name,
          category: "PHONE_CALL_LEAD",
          type: "UPLOAD_CALLS",
          status: "ENABLED",
          countingType: "ONE_PER_CLICK",
          attributionModelSettings: {
            attributionModel: "GOOGLE_ADS_LAST_CLICK",
          },
          valueSettings: {
            defaultValue,
            alwaysUseDefaultValue: false,
            defaultCurrencyCode: "EUR",
          },
          phoneCallDurationSeconds: 60,
        },
      },
    ],
  });

  const response = result as { results: Array<{ resourceName: string }> };
  return response.results[0].resourceName;
}

// ============================
// OFFLINE CONVERSIONS
// ============================

/**
 * Upload offline call conversion
 */
export async function uploadCallConversion(
  config: GoogleAdsConfig,
  data: {
    gclid?: string;
    gbraid?: string;
    conversionActionName: string;
    conversionDateTime: string;
    conversionValue?: number;
    callerPhoneNumber?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const customerId = config.customerId.replace(/-/g, "");

  // First, get the conversion action resource name
  const conversionAction = await getConversionActionByName(config, data.conversionActionName);
  if (!conversionAction) {
    return { success: false, error: `Conversion action '${data.conversionActionName}' not found` };
  }

  const endpoint = `/${GOOGLE_ADS_API_VERSION}/customers/${customerId}/conversionUploads:uploadCallConversions`;

  try {
    const conversions: Array<Record<string, unknown>> = [{
      conversionAction: `customers/${customerId}/conversionActions/${conversionAction.id}`,
      conversionDateTime: data.conversionDateTime,
      conversionValue: data.conversionValue || 50,
      currencyCode: "EUR",
    }];

    // Add either gclid or caller phone number
    if (data.gclid) {
      conversions[0].gclid = data.gclid;
    } else if (data.callerPhoneNumber) {
      conversions[0].callerId = data.callerPhoneNumber;
    }

    await googleAdsRequest(config, endpoint, "POST", {
      conversions,
      partialFailure: true,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

/**
 * Upload offline click conversion (for website conversions with gclid)
 */
export async function uploadClickConversion(
  config: GoogleAdsConfig,
  data: {
    gclid: string;
    conversionActionName: string;
    conversionDateTime: string;
    conversionValue?: number;
    orderId?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const customerId = config.customerId.replace(/-/g, "");

  const conversionAction = await getConversionActionByName(config, data.conversionActionName);
  if (!conversionAction) {
    return { success: false, error: `Conversion action '${data.conversionActionName}' not found` };
  }

  const endpoint = `/${GOOGLE_ADS_API_VERSION}/customers/${customerId}/conversionUploads:uploadClickConversions`;

  try {
    await googleAdsRequest(config, endpoint, "POST", {
      conversions: [{
        gclid: data.gclid,
        conversionAction: `customers/${customerId}/conversionActions/${conversionAction.id}`,
        conversionDateTime: data.conversionDateTime,
        conversionValue: data.conversionValue || 50,
        currencyCode: "EUR",
        orderId: data.orderId,
      }],
      partialFailure: true,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// ============================
// CAMPAIGNS
// ============================

/**
 * Get all campaigns with performance data
 */
export async function getCampaigns(
  config: GoogleAdsConfig,
  dateRange: { startDate: string; endDate: string }
): Promise<CampaignData[]> {
  const query = `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.start_date_time,
      campaign.end_date_time,
      campaign_budget.amount_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value,
      metrics.average_cpc
    FROM campaign
    WHERE segments.date BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
      AND campaign.status != 'REMOVED'
    ORDER BY metrics.cost_micros DESC
  `;

  const results = await searchGoogleAds(config, query);
  return results as CampaignData[];
}

/**
 * Get campaign performance by city (using ad group naming convention)
 */
export async function getCampaignPerformanceByCity(
  config: GoogleAdsConfig,
  dateRange: { startDate: string; endDate: string }
): Promise<unknown[]> {
  const query = `
    SELECT
      campaign.name,
      ad_group.name,
      geographic_view.country_criterion_id,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM geographic_view
    WHERE segments.date BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
    ORDER BY metrics.conversions DESC
  `;

  return searchGoogleAds(config, query);
}

// ============================
// REPORTS
// ============================

/**
 * Get performance report
 */
export async function getPerformanceReport(
  config: GoogleAdsConfig,
  dateRange: { startDate: string; endDate: string }
): Promise<unknown[]> {
  const query = `
    SELECT
      segments.date,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value,
      metrics.average_cpc,
      metrics.ctr,
      metrics.cost_per_conversion
    FROM customer
    WHERE segments.date BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
    ORDER BY segments.date DESC
  `;

  return searchGoogleAds(config, query);
}

/**
 * Get keyword performance report
 */
export async function getKeywordReport(
  config: GoogleAdsConfig,
  dateRange: { startDate: string; endDate: string }
): Promise<unknown[]> {
  const query = `
    SELECT
      ad_group_criterion.keyword.text,
      ad_group_criterion.keyword.match_type,
      campaign.name,
      ad_group.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.average_cpc,
      metrics.ctr,
      metrics.cost_per_conversion
    FROM keyword_view
    WHERE segments.date BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
    ORDER BY metrics.conversions DESC
    LIMIT 100
  `;

  return searchGoogleAds(config, query);
}

/**
 * Get conversion report
 */
export async function getConversionReport(
  config: GoogleAdsConfig,
  dateRange: { startDate: string; endDate: string }
): Promise<unknown[]> {
  const query = `
    SELECT
      segments.date,
      segments.conversion_action,
      segments.conversion_action_name,
      metrics.conversions,
      metrics.conversions_value,
      metrics.all_conversions,
      metrics.cost_per_conversion
    FROM customer
    WHERE segments.date BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
      AND metrics.conversions > 0
    ORDER BY segments.date DESC
  `;

  return searchGoogleAds(config, query);
}

/**
 * Get call extension performance
 */
export async function getCallExtensionReport(
  config: GoogleAdsConfig,
  dateRange: { startDate: string; endDate: string }
): Promise<unknown[]> {
  const query = `
    SELECT
      campaign.name,
      asset.call_asset.phone_number,
      asset.call_asset.country_code,
      metrics.impressions,
      metrics.clicks,
      metrics.phone_calls,
      metrics.phone_impressions,
      metrics.phone_through_rate
    FROM asset
    WHERE asset.type = 'CALL'
      AND segments.date BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'
  `;

  return searchGoogleAds(config, query);
}

// ============================
// CAMPAIGN CREATION
// ============================

interface NewCampaignParams {
  name: string;
  dailyBudgetMicros: number;
  targetLocationIds: string[];
  keywords: string[];
  negativeKeywords?: string[];
  headlines: string[];
  descriptions: string[];
  finalUrl: string;
  phoneNumber: string;
}

/**
 * Create a complete campaign with ad groups, keywords, and ads
 * This is a simplified version - full implementation would be more complex
 */
export async function createCampaign(
  config: GoogleAdsConfig,
  params: NewCampaignParams
): Promise<{ success: boolean; campaignId?: string; error?: string }> {
  const customerId = config.customerId.replace(/-/g, "");

  try {
    // Step 1: Create budget
    const budgetEndpoint = `/customers/${customerId}/campaignBudgets:mutate`;
    const budgetResult = await googleAdsRequest(config, budgetEndpoint, "POST", {
      operations: [{
        create: {
          name: `Budget for ${params.name}`,
          amountMicros: params.dailyBudgetMicros,
          deliveryMethod: "STANDARD",
        },
      }],
    }) as { results: Array<{ resourceName: string }> };
    const budgetResourceName = budgetResult.results[0].resourceName;

    // Step 2: Create campaign
    const campaignEndpoint = `/customers/${customerId}/campaigns:mutate`;
    const campaignResult = await googleAdsRequest(config, campaignEndpoint, "POST", {
      operations: [{
        create: {
          name: params.name,
          advertisingChannelType: "SEARCH",
          status: "PAUSED", // Start paused for review
          campaignBudget: budgetResourceName,
          networkSettings: {
            targetGoogleSearch: true,
            targetSearchNetwork: true,
          },
          startDate: new Date().toISOString().split("T")[0].replace(/-/g, ""),
        },
      }],
    }) as { results: Array<{ resourceName: string }> };
    const campaignResourceName = campaignResult.results[0].resourceName;

    // Step 3: Add location targeting
    // ... (would add geo targeting operations)

    // Step 4: Create ad group
    // ... (would add ad group operations)

    // Step 5: Add keywords
    // ... (would add keyword operations)

    // Step 6: Create responsive search ad
    // ... (would add ad operations)

    // Step 7: Add call extension
    // ... (would add call extension operations)

    return {
      success: true,
      campaignId: campaignResourceName.split("/").pop(),
    };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

// ============================
// UTILITIES
// ============================

/**
 * Convert micros to currency
 */
export function microsToCurrency(micros: number): number {
  return micros / 1000000;
}

/**
 * Convert currency to micros
 */
export function currencyToMicros(amount: number): number {
  return Math.round(amount * 1000000);
}

/**
 * Format date for Google Ads API
 */
export function formatDateForAPI(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Test API connection
 */
export async function testConnection(config: GoogleAdsConfig): Promise<{ success: boolean; error?: string }> {
  try {
    await getAccessToken(config);
    // Try a simple query to verify access
    const query = "SELECT customer.id FROM customer LIMIT 1";
    await searchGoogleAds(config, query);
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
