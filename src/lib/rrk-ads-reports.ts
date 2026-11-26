import { searchGoogleAds, type GoogleAdsConfig } from "./google-ads";

const CLIENT_ID = "7894242096";
const CAMPAIGN_ID = "23874769195";
export type RrkReport = "rrk_daily" | "rrk_keywords" | "rrk_terms" | "rrk_urls";
type DateRange = { startDate: string; endDate: string };

export function validReportDates(range: DateRange): boolean {
  const valid = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + "T00:00:00Z");
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  };
  return valid(range.startDate) && valid(range.endDate) && range.startDate <= range.endDate;
}

// Each row reports the settings configured at its own level. Google selects
// the serving combination for each click, including the applicable sitelink.
async function urlSettings(config: GoogleAdsConfig): Promise<unknown[]> {
  const campaign = `campaign.id = ${CAMPAIGN_ID}`;
  const queries = [
    ["account", "SELECT customer.id, customer.tracking_url_template, customer.final_url_suffix, customer.auto_tagging_enabled FROM customer"],
    ["campaign", `SELECT campaign.id, campaign.name, campaign.tracking_url_template, campaign.final_url_suffix, campaign.url_custom_parameters FROM campaign WHERE ${campaign}`],
    ["ad_group", `SELECT ad_group.id, ad_group.name, ad_group.tracking_url_template, ad_group.final_url_suffix, ad_group.url_custom_parameters FROM ad_group WHERE ${campaign} AND ad_group.status != 'REMOVED'`],
    ["ad", `SELECT ad_group.id, ad_group_ad.ad.id, ad_group_ad.ad.final_urls, ad_group_ad.ad.final_mobile_urls, ad_group_ad.ad.tracking_url_template, ad_group_ad.ad.final_url_suffix, ad_group_ad.ad.url_custom_parameters FROM ad_group_ad WHERE ${campaign} AND ad_group_ad.status != 'REMOVED'`],
    ["keyword", `SELECT ad_group.id, ad_group_criterion.criterion_id, ad_group_criterion.keyword.text, ad_group_criterion.final_urls, ad_group_criterion.final_mobile_urls, ad_group_criterion.tracking_url_template, ad_group_criterion.final_url_suffix, ad_group_criterion.url_custom_parameters FROM ad_group_criterion WHERE ${campaign} AND ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.negative = FALSE AND ad_group_criterion.status != 'REMOVED'`],
  ];
  for (const resource of ["customer_asset", "campaign_asset", "ad_group_asset"]) {
    const scope = resource === "customer_asset" ? "" : ` AND ${campaign}`;
    queries.push([resource, `SELECT ${resource}.resource_name, asset.id, asset.sitelink_asset.link_text, asset.final_urls, asset.final_mobile_urls, asset.tracking_url_template, asset.final_url_suffix, asset.url_custom_parameters FROM ${resource} WHERE ${resource}.field_type = 'SITELINK' AND ${resource}.status != 'REMOVED'${scope}`]);
  }
  const result = [];
  for (const [level, query] of queries) {
    for (const row of await searchGoogleAds(config, query)) {
      result.push({ level, ...row as object });
    }
  }
  return result;
}

export async function getRrkReport(config: GoogleAdsConfig, report: RrkReport, dates: DateRange) {
  if (config.customerId.replace(/-/g, "") !== CLIENT_ID) throw new Error("RRK Ads account mismatch");
  if (!validReportDates(dates)) throw new Error("Invalid report dates");
  if (report === "rrk_urls") return urlSettings(config);

  const metrics = "metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions";
  const fields = "customer.id, customer.currency_code, campaign.id, campaign.name, segments.date";
  const filter = `campaign.id = ${CAMPAIGN_ID} AND segments.date BETWEEN '${dates.startDate}' AND '${dates.endDate}'`;
  const queries = {
    rrk_daily: `SELECT ${fields}, ${metrics}, metrics.phone_calls, metrics.search_rank_lost_impression_share, metrics.search_budget_lost_impression_share FROM campaign WHERE ${filter} ORDER BY segments.date`,
    rrk_keywords: `SELECT ${fields}, ad_group.id, ad_group.name, ad_group_criterion.criterion_id, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.status, ad_group_criterion.cpc_bid_micros, ${metrics} FROM keyword_view WHERE ${filter} ORDER BY segments.date, metrics.cost_micros DESC`,
    rrk_terms: `SELECT ${fields}, ad_group.id, ad_group.name, search_term_view.search_term, segments.keyword.info.text, segments.keyword.info.match_type, ${metrics} FROM search_term_view WHERE ${filter} ORDER BY segments.date, metrics.cost_micros DESC`,
  };
  return searchGoogleAds(config, queries[report]);
}
