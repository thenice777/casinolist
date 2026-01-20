import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { checkRateLimit, RATE_LIMITS, rateLimitHeaders } from "@/lib/rate-limit";
import { contactSchema, formatZodError } from "@/lib/validation";

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
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: formatZodError(result.error) },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Store contact submission
    await sql`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject}, ${message})
    `;

    return NextResponse.json(
      { message: "Thank you for your message. We'll get back to you soon!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
