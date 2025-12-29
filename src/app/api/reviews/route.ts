import { NextRequest, NextResponse } from "next/server";
import { submitReview, NewReview } from "@/lib/reviews";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.casinoType || !["land_based", "online"].includes(body.casinoType)) {
      return NextResponse.json(
        { error: "Invalid casino type" },
        { status: 400 }
      );
    }

    if (body.casinoType === "land_based" && !body.landBasedCasinoId) {
      return NextResponse.json(
        { error: "Casino ID is required" },
        { status: 400 }
      );
    }

    if (body.casinoType === "online" && !body.onlineCasinoId) {
      return NextResponse.json(
        { error: "Casino ID is required" },
        { status: 400 }
      );
    }

    if (!body.ratingOverall || body.ratingOverall < 1 || body.ratingOverall > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!body.content || body.content.trim().length < 50) {
      return NextResponse.json(
        { error: "Review must be at least 50 characters" },
        { status: 400 }
      );
    }

    // Sanitize and prepare the review
    const review: NewReview = {
      casinoType: body.casinoType,
      landBasedCasinoId: body.landBasedCasinoId,
      onlineCasinoId: body.onlineCasinoId,
      displayName: body.displayName?.slice(0, 50),
      isAnonymous: body.isAnonymous ?? false,
      ratingOverall: Math.min(5, Math.max(1, Math.round(body.ratingOverall))),
      ratingGames: body.ratingGames ? Math.min(10, Math.max(1, Math.round(body.ratingGames))) : undefined,
      ratingService: body.ratingService ? Math.min(10, Math.max(1, Math.round(body.ratingService))) : undefined,
      ratingAtmosphere: body.ratingAtmosphere ? Math.min(10, Math.max(1, Math.round(body.ratingAtmosphere))) : undefined,
      ratingValue: body.ratingValue ? Math.min(10, Math.max(1, Math.round(body.ratingValue))) : undefined,
      title: body.title?.slice(0, 100),
      content: body.content.slice(0, 5000),
      pros: Array.isArray(body.pros) ? body.pros.slice(0, 5).map((p: string) => p.slice(0, 100)) : undefined,
      cons: Array.isArray(body.cons) ? body.cons.slice(0, 5).map((c: string) => c.slice(0, 100)) : undefined,
      visitDate: body.visitDate,
      visitPurpose: ["tourism", "business", "local", "special_event"].includes(body.visitPurpose) ? body.visitPurpose : undefined,
      playerLevel: ["casual", "regular", "high_roller"].includes(body.playerLevel) ? body.playerLevel : undefined,
      gamesPlayed: Array.isArray(body.gamesPlayed) ? body.gamesPlayed.slice(0, 10) : undefined,
    };

    const reviewId = await submitReview(review);

    return NextResponse.json({ success: true, reviewId });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
