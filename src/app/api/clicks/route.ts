import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import crypto from "crypto";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Lenient rate limiting - don't block legitimate conversions
  const rateLimit = checkRateLimit(request, RATE_LIMITS.tracking);
  if (!rateLimit.success) {
    // Still return success to not break user flow, just skip tracking
    return NextResponse.json(
      { success: true, message: "Rate limited but proceeding" },
      { status: 200 }
    );
  }

  try {
    const { casinoId, casinoType, affiliateLink, subid } = await request.json();

    // Validate required fields
    if (!casinoId || !casinoType) {
      return NextResponse.json(
        { error: "casinoId and casinoType are required" },
        { status: 400 }
      );
    }

    if (!["online", "land_based"].includes(casinoType)) {
      return NextResponse.json(
        { error: "casinoType must be 'online' or 'land_based'" },
        { status: 400 }
      );
    }

    // Get request metadata
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "";

    // Hash IP for privacy (we don't store raw IPs)
    const ipHash = ip ? crypto.createHash("sha256").update(ip).digest("hex").slice(0, 64) : null;

    // Get country from Vercel's geo headers
    const countryCode = request.headers.get("x-vercel-ip-country") || null;

    // Log the click
    await sql`
      INSERT INTO affiliate_clicks (
        casino_id, casino_type, affiliate_link, ip_hash,
        user_agent, referrer, country_code, subid
      )
      VALUES (
        ${casinoId}, ${casinoType}, ${affiliateLink || null}, ${ipHash},
        ${userAgent.slice(0, 500)}, ${referrer.slice(0, 500)}, ${countryCode}, ${subid || null}
      )
    `;

    return NextResponse.json(
      { success: true, message: "Click tracked" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Click tracking error:", error);
    // Don't fail the redirect if tracking fails
    return NextResponse.json(
      { success: false, error: "Tracking failed but continuing" },
      { status: 200 }
    );
  }
}

// GET endpoint for analytics (could be used by admin dashboard later)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const casinoId = searchParams.get("casinoId");
  const casinoType = searchParams.get("casinoType");
  const days = parseInt(searchParams.get("days") || "30");

  try {
    let query;

    if (casinoId && casinoType) {
      query = await sql`
        SELECT
          DATE(clicked_at) as date,
          COUNT(*) as clicks,
          COUNT(DISTINCT ip_hash) as unique_visitors
        FROM affiliate_clicks
        WHERE casino_id = ${casinoId}
          AND casino_type = ${casinoType}
          AND clicked_at >= NOW() - INTERVAL '${days} days'
        GROUP BY DATE(clicked_at)
        ORDER BY date DESC
      `;
    } else {
      query = await sql`
        SELECT
          casino_id,
          casino_type,
          COUNT(*) as total_clicks,
          COUNT(DISTINCT ip_hash) as unique_visitors
        FROM affiliate_clicks
        WHERE clicked_at >= NOW() - INTERVAL '${days} days'
        GROUP BY casino_id, casino_type
        ORDER BY total_clicks DESC
        LIMIT 50
      `;
    }

    return NextResponse.json({ data: query }, { status: 200 });
  } catch (error) {
    console.error("Click analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
