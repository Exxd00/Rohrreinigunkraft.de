import { NextRequest, NextResponse } from "next/server";
import { postCustomerEventToSheet } from "@/lib/customer-events-sheet";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

interface PhoneEventData {
  eventType: "direct_call_click" | "call_confirmed";
  eventId?: string;
  source?: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  keyword?: string | null;
  campaignId?: string | null;
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
  landingPage?: string | null;
  currentPage?: string | null;
  referrer?: string | null;
}

const clean = (value: unknown, maxLength = 240) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PhoneEventData;

    if (
      body.eventType !== "direct_call_click" &&
      body.eventType !== "call_confirmed"
    ) {
      return NextResponse.json(
        { success: false, recorded: false, reason: "unsupported_event" },
        { status: 400 },
      );
    }

    const eventId = clean(body.eventId, 100);
    if (!eventId) {
      return NextResponse.json(
        { success: false, recorded: false, reason: "event_id_missing" },
        { status: 400 },
      );
    }

    const source = clean(body.source, 120) || "floating_call_modal";
    const trafficSource = clean(body.utmSource, 80) || "Website";
    const trafficMedium = clean(body.utmMedium, 80);
    const attribution = trafficMedium
      ? trafficSource + " / " + trafficMedium
      : trafficSource;

    const confirmedIntent = body.eventType === "call_confirmed";
    const payload = {
      timestamp: new Date().toISOString(),
      name: confirmedIntent
        ? "📞 Anrufabsicht bestätigt"
        : "📞 Website-Telefonklick",
      phone: "Direkter Anruf",
      email: "",
      city: "Nürnberg",
      service: "Telefonischer Kontakt",
      message: confirmedIntent
        ? "Anrufabsicht im letzten Dialogschritt bestätigt (" +
          source +
          "). Gespräch nicht bestätigt."
        : "Klick auf einen Telefonlink (" + source + ").",
      images: 0,
      source: attribution,
      referrer: clean(body.referrer, 500) || "direct",
      gclid: clean(body.gclid, 200) || null,
      gbraid: clean(body.gbraid, 200) || null,
      wbraid: clean(body.wbraid, 200) || null,
      medium: trafficMedium || null,
      campaign: clean(body.utmCampaign, 160) || null,
      keyword: clean(body.keyword, 160) || null,
      campaignId: typeof body.campaignId === "string" && /^\d{1,20}$/.test(body.campaignId) ? body.campaignId : null,
      landingPage: clean(body.landingPage, 500) || null,
      currentPage: clean(body.currentPage, 500) || null,
      eventId,
      eventName: body.eventType,
      eventType: "call",
      callStatus: "not_confirmed",
      sourceSite: "rohrreinigung-kraft.de",
    };

    const result = await postCustomerEventToSheet(
      GOOGLE_SHEETS_WEBHOOK_URL,
      payload,
    );

    if (!result.success) {
      console.error(
        "[Direct call event] Google Sheets webhook failed:",
        result.error,
      );
      return NextResponse.json(
        { success: false, recorded: false, reason: result.error },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      recorded: true,
      eventId,
      sheetName: result.sheetName,
      row: result.row,
      duplicate: result.duplicate === true,
    });
  } catch (error) {
    console.error("[Direct call event] Error:", error);
    return NextResponse.json(
      { success: false, recorded: false },
      { status: 400 },
    );
  }
}
