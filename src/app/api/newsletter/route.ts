import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS, rateLimitHeaders } from "@/lib/rate-limit";
import { newsletterSchema, formatZodError } from "@/lib/validation";

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimit = checkRateLimit(request, RATE_LIMITS.form);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rateLimit) }
    );
  }

  try {
    const body = await request.json();

    // Validate with Zod
    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: formatZodError(result.error) },
        { status: 400 }
      );
    }

    const { email, source } = result.data;

    // Check if email already exists
    const existing = await sql`
      SELECT id, is_active FROM newsletter_subscribers
      WHERE email = ${email}
    `;

    if (existing.length > 0) {
      const subscriber = existing[0];
      if (subscriber.is_active) {
        return NextResponse.json(
          { message: "You're already subscribed!" },
          { status: 200 }
        );
      } else {
        // Reactivate subscription
        await sql`
          UPDATE newsletter_subscribers
          SET is_active = true, subscribed_at = NOW(), unsubscribed_at = NULL
          WHERE id = ${subscriber.id}
        `;
        return NextResponse.json(
          { message: "Welcome back! Your subscription has been reactivated." },
          { status: 200 }
        );
      }
    }

    // Insert new subscriber
    await sql`
      INSERT INTO newsletter_subscribers (email, source)
      VALUES (${email}, ${source})
    `;

    return NextResponse.json(
      { message: "Thanks for subscribing! Check your inbox soon." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE newsletter_subscribers
      SET is_active = false, unsubscribed_at = NOW()
      WHERE email = ${email.toLowerCase()}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "You have been unsubscribed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter unsubscription error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again." },
      { status: 500 }
    );
  }
}
