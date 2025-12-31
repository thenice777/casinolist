import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import crypto from "crypto";

interface TourAnalyticsPayload {
  casinoId: string;
  casinoType: "online" | "land_based";
  casinoName: string;
  sessionDurationMs: number;
  actsViewed: string[];
  zonesViewed: string[];
  ctaClicks: Array<{ location: string; actId: string }>;
  completedTour: boolean;
  realityChecksShown: number;
  filters: Record<string, string[]>;
}

export async function POST(request: NextRequest) {
  try {
    const data: TourAnalyticsPayload = await request.json();

    // Validate required fields
    if (!data.casinoId || !data.casinoType) {
      return NextResponse.json(
        { error: "casinoId and casinoType are required" },
        { status: 400 }
      );
    }

    // Get request metadata
    const userAgent = request.headers.get("user-agent") || "";
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "";

    // Hash IP for privacy
    const ipHash = ip
      ? crypto.createHash("sha256").update(ip).digest("hex").slice(0, 64)
      : null;

    // Get country from Vercel's geo headers
    const countryCode = request.headers.get("x-vercel-ip-country") || null;

    // Store tour analytics
    await sql`
      INSERT INTO tour_analytics (
        casino_id,
        casino_type,
        casino_name,
        session_duration_ms,
        acts_viewed,
        zones_viewed,
        cta_clicks,
        completed_tour,
        reality_checks_shown,
        filters,
        ip_hash,
        user_agent,
        country_code
      )
      VALUES (
        ${data.casinoId},
        ${data.casinoType},
        ${data.casinoName || null},
        ${data.sessionDurationMs || 0},
        ${JSON.stringify(data.actsViewed || [])},
        ${JSON.stringify(data.zonesViewed || [])},
        ${JSON.stringify(data.ctaClicks || [])},
        ${data.completedTour || false},
        ${data.realityChecksShown || 0},
        ${JSON.stringify(data.filters || {})},
        ${ipHash},
        ${userAgent.slice(0, 500)},
        ${countryCode}
      )
    `;

    return NextResponse.json(
      { success: true, message: "Tour analytics tracked" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Tour analytics error:", error);
    // Don't fail if analytics tracking fails
    return NextResponse.json(
      { success: false, error: "Analytics tracking failed" },
      { status: 200 }
    );
  }
}

// GET endpoint for tour analytics dashboard
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const casinoId = searchParams.get("casinoId");
  const days = parseInt(searchParams.get("days") || "30");

  try {
    if (casinoId) {
      // Get analytics for a specific casino
      const result = await sql`
        SELECT
          COUNT(*) as total_tours,
          AVG(session_duration_ms) as avg_duration_ms,
          COUNT(*) FILTER (WHERE completed_tour = true) as completed_tours,
          COUNT(*) FILTER (WHERE array_length(cta_clicks::jsonb, 1) > 0) as tours_with_clicks
        FROM tour_analytics
        WHERE casino_id = ${casinoId}
          AND created_at >= NOW() - INTERVAL '1 day' * ${days}
      `;
      return NextResponse.json({ data: result[0] || {} }, { status: 200 });
    }

    // Get overall tour analytics
    const result = await sql`
      SELECT
        casino_id,
        casino_type,
        casino_name,
        COUNT(*) as total_tours,
        AVG(session_duration_ms) as avg_duration_ms,
        COUNT(*) FILTER (WHERE completed_tour = true) as completed_tours
      FROM tour_analytics
      WHERE created_at >= NOW() - INTERVAL '1 day' * ${days}
      GROUP BY casino_id, casino_type, casino_name
      ORDER BY total_tours DESC
      LIMIT 50
    `;

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    console.error("Tour analytics fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tour analytics" },
      { status: 500 }
    );
  }
}
