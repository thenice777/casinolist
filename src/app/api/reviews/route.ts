import { NextRequest, NextResponse } from "next/server";
import { submitReview, NewReview } from "@/lib/reviews";
import { checkRateLimit, RATE_LIMITS, rateLimitHeaders } from "@/lib/rate-limit";
import { reviewSchema, formatZodError } from "@/lib/validation";

export async function POST(request: NextRequest) {
  // Rate limiting - stricter for reviews to prevent spam
  const rateLimit = checkRateLimit(request, RATE_LIMITS.review);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many reviews submitted. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rateLimit) }
    );
  }

  try {
    const body = await request.json();

    // Validate with Zod
    const result = reviewSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: formatZodError(result.error) },
        { status: 400 }
      );
    }

    const data = result.data;

    // Prepare the review (Zod has already sanitized the input)
    const review: NewReview = {
      casinoType: data.casinoType,
      landBasedCasinoId: data.landBasedCasinoId,
      onlineCasinoId: data.onlineCasinoId,
      displayName: data.displayName,
      isAnonymous: data.isAnonymous,
      ratingOverall: data.ratingOverall,
      ratingGames: data.ratingGames,
      ratingService: data.ratingService,
      ratingAtmosphere: data.ratingAtmosphere,
      ratingValue: data.ratingValue,
      title: data.title,
      content: data.content,
      pros: data.pros,
      cons: data.cons,
      visitDate: data.visitDate,
      visitPurpose: data.visitPurpose,
      playerLevel: data.playerLevel,
      gamesPlayed: data.gamesPlayed,
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
