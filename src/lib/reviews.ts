import { sql, toCamelCase } from "./db";

export interface Review {
  id: string;
  casinoType: "land_based" | "online";
  landBasedCasinoId?: string;
  onlineCasinoId?: string;
  displayName?: string;
  isAnonymous: boolean;
  isVerifiedVisit: boolean;
  ratingOverall: number;
  ratingGames?: number;
  ratingService?: number;
  ratingAtmosphere?: number;
  ratingValue?: number;
  title?: string;
  content: string;
  pros?: string[];
  cons?: string[];
  visitDate?: string;
  visitPurpose?: string;
  playerLevel?: string;
  gamesPlayed?: string[];
  status: "pending" | "approved" | "rejected";
  helpfulCount: number;
  createdAt: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
}

// Get approved reviews for a land-based casino
export async function getLandBasedCasinoReviews(casinoId: string, limit = 20) {
  const results = await sql`
    SELECT
      id, casino_type, land_based_casino_id, display_name,
      is_anonymous, is_verified_visit,
      rating_overall, rating_games, rating_service,
      rating_atmosphere, rating_value,
      title, content, pros, cons,
      visit_date, visit_purpose, player_level, games_played,
      status, helpful_count, created_at
    FROM reviews
    WHERE land_based_casino_id = ${casinoId}
      AND status = 'approved'
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  return results.map((row: Record<string, unknown>) => toCamelCase<Review>(row));
}

// Get approved reviews for an online casino
export async function getOnlineCasinoReviews(casinoId: string, limit = 20) {
  const results = await sql`
    SELECT
      id, casino_type, online_casino_id, display_name,
      is_anonymous, is_verified_visit,
      rating_overall, rating_games, rating_service,
      rating_atmosphere, rating_value,
      title, content, pros, cons,
      visit_date, visit_purpose, player_level, games_played,
      status, helpful_count, created_at
    FROM reviews
    WHERE online_casino_id = ${casinoId}
      AND status = 'approved'
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  return results.map((row: Record<string, unknown>) => toCamelCase<Review>(row));
}

// Get review stats for a casino
export async function getReviewStats(casinoId: string, casinoType: "land_based" | "online"): Promise<ReviewStats> {
  const idColumn = casinoType === "land_based" ? "land_based_casino_id" : "online_casino_id";

  const statsResult = await sql`
    SELECT
      COUNT(*) as total_reviews,
      COALESCE(AVG(rating_overall), 0) as average_rating
    FROM reviews
    WHERE ${casinoType === "land_based" ? sql`land_based_casino_id = ${casinoId}` : sql`online_casino_id = ${casinoId}`}
      AND status = 'approved'
  `;

  const distributionResult = await sql`
    SELECT rating_overall, COUNT(*) as count
    FROM reviews
    WHERE ${casinoType === "land_based" ? sql`land_based_casino_id = ${casinoId}` : sql`online_casino_id = ${casinoId}`}
      AND status = 'approved'
    GROUP BY rating_overall
    ORDER BY rating_overall
  `;

  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  distributionResult.forEach((row: Record<string, unknown>) => {
    const rating = Number(row.rating_overall);
    distribution[rating] = Number(row.count);
  });

  return {
    totalReviews: Number(statsResult[0]?.total_reviews) || 0,
    averageRating: Number(statsResult[0]?.average_rating) || 0,
    ratingDistribution: distribution,
  };
}

// Submit a new review
export interface NewReview {
  casinoType: "land_based" | "online";
  landBasedCasinoId?: string;
  onlineCasinoId?: string;
  displayName?: string;
  isAnonymous?: boolean;
  ratingOverall: number;
  ratingGames?: number;
  ratingService?: number;
  ratingAtmosphere?: number;
  ratingValue?: number;
  title?: string;
  content: string;
  pros?: string[];
  cons?: string[];
  visitDate?: string;
  visitPurpose?: string;
  playerLevel?: string;
  gamesPlayed?: string[];
}

export async function submitReview(review: NewReview) {
  const result = await sql`
    INSERT INTO reviews (
      casino_type,
      land_based_casino_id,
      online_casino_id,
      display_name,
      is_anonymous,
      rating_overall,
      rating_games,
      rating_service,
      rating_atmosphere,
      rating_value,
      title,
      content,
      pros,
      cons,
      visit_date,
      visit_purpose,
      player_level,
      games_played,
      status
    ) VALUES (
      ${review.casinoType},
      ${review.landBasedCasinoId || null},
      ${review.onlineCasinoId || null},
      ${review.displayName || null},
      ${review.isAnonymous ?? false},
      ${review.ratingOverall},
      ${review.ratingGames || null},
      ${review.ratingService || null},
      ${review.ratingAtmosphere || null},
      ${review.ratingValue || null},
      ${review.title || null},
      ${review.content},
      ${review.pros || null},
      ${review.cons || null},
      ${review.visitDate || null},
      ${review.visitPurpose || null},
      ${review.playerLevel || null},
      ${review.gamesPlayed || null},
      'approved'
    )
    RETURNING id
  `;

  return result[0]?.id;
}

// Increment helpful count
export async function markReviewHelpful(reviewId: string) {
  await sql`
    UPDATE reviews
    SET helpful_count = helpful_count + 1
    WHERE id = ${reviewId}
  `;
}
