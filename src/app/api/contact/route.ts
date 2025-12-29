import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

const validSubjects = ["general", "listing", "partnership", "feedback", "correction", "other"];

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!subject || !validSubjects.includes(subject)) {
      return NextResponse.json(
        { error: "Invalid subject selected" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a message (at least 10 characters)" },
        { status: 400 }
      );
    }

    // Store contact submission
    await sql`
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (${name.trim()}, ${email.toLowerCase()}, ${subject}, ${message.trim()})
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
