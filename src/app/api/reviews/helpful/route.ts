import { NextRequest, NextResponse } from "next/server";
import { markReviewHelpful } from "@/lib/reviews";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.reviewId) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    await markReviewHelpful(body.reviewId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking review as helpful:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}
