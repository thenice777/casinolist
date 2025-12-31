import { sql, toCamelCase } from "./db";
import { LandBasedCasino, OnlineCasino, CasinoMapMarker, ExperienceTier, Destination } from "@/types/casino";

// Land-based casino queries
export async function getLandBasedCasinos(options?: {
  featured?: boolean;
  limit?: number;
  country?: string;
}) {
  const { featured, limit = 50, country } = options || {};

  const results = await sql`
    SELECT
      id, name, slug, city, state, country, country_code,
      description, short_description, website,
      ST_Y(coordinates::geometry) as latitude,
      ST_X(coordinates::geometry) as longitude,
      is_24_hours, games, amenities,
      has_hotel, has_restaurant, has_parking,
      rating_overall, rating_games, rating_service,
      rating_atmosphere, rating_value, rating_trust,
      review_count, experience_tiers, verified_badges,
      logo_url, hero_image_url, images,
      is_featured, is_verified
    FROM land_based_casinos
    WHERE is_active = true
      AND (${featured} = false OR is_featured = true)
      AND (${country || ''} = '' OR country = ${country || ''})
    ORDER BY rating_overall DESC NULLS LAST
    LIMIT ${limit}
  `;

  return results.map((row: Record<string, unknown>) => toCamelCase<LandBasedCasino>(row));
}

export async function getLandBasedCasinoBySlug(slug: string) {
  const results = await sql`
    SELECT
      id, name, slug, address, city, state, country, country_code, postal_code,
      description, short_description, website, phone, email,
      ST_Y(coordinates::geometry) as latitude,
      ST_X(coordinates::geometry) as longitude,
      opening_hours, is_24_hours, dress_code, entry_fee, minimum_age,
      games, table_count, slot_count, poker_room_tables,
      min_table_bet, max_table_bet,
      has_high_limit_room, has_poker_room, has_sportsbook,
      amenities, has_hotel, has_restaurant, has_parking,
      rating_overall, rating_games, rating_service,
      rating_atmosphere, rating_value, rating_trust,
      review_count, experience_tiers, verified_badges,
      logo_url, hero_image_url, images,
      is_featured, is_verified, last_verified_at,
      created_at, updated_at
    FROM land_based_casinos
    WHERE slug = ${slug} AND is_active = true
  `;

  if (results.length === 0) return null;
  return toCamelCase<LandBasedCasino>(results[0] as Record<string, unknown>);
}

// Online casino queries
export async function getOnlineCasinos(options?: {
  featured?: boolean;
  limit?: number;
}) {
  const { featured, limit = 50 } = options || {};

  const results = await sql`
    SELECT
      id, name, slug, description, short_description, website, affiliate_link,
      licenses, license_countries, restricted_countries,
      welcome_bonus_description, welcome_bonus_amount, welcome_bonus_wagering,
      game_providers, games, has_live_casino, has_sportsbook,
      payment_methods, currencies,
      rating_overall, rating_games, rating_service,
      rating_ux as rating_atmosphere, rating_value, rating_trust,
      review_count, experience_tiers, verified_badges,
      logo_url, hero_image_url,
      is_featured, is_verified, founded_year
    FROM online_casinos
    WHERE is_active = true
      AND (${featured ?? false} = false OR is_featured = true)
    ORDER BY rating_overall DESC NULLS LAST
    LIMIT ${limit}
  `;

  return results.map((row: Record<string, unknown>) => toCamelCase<OnlineCasino>(row));
}

export async function getOnlineCasinoBySlug(slug: string) {
  const results = await sql`
    SELECT
      id, name, slug, description, short_description, website, affiliate_link,
      licenses, license_countries, restricted_countries,
      welcome_bonus_description, welcome_bonus_amount, welcome_bonus_wagering,
      game_providers, games, has_live_casino, has_sportsbook,
      payment_methods, currencies, min_deposit, max_withdrawal,
      withdrawal_time, support_channels,
      rating_overall, rating_games, rating_service,
      rating_ux as rating_atmosphere, rating_value, rating_trust,
      review_count, experience_tiers, verified_badges,
      logo_url, hero_image_url,
      is_featured, is_verified, last_verified_at,
      founded_year, headquarters,
      created_at, updated_at
    FROM online_casinos
    WHERE slug = ${slug} AND is_active = true
  `;

  if (results.length === 0) return null;
  return toCamelCase<OnlineCasino>(results[0] as Record<string, unknown>);
}

// Map markers - Land-based casinos
export async function getCasinoMapMarkers(): Promise<CasinoMapMarker[]> {
  const results = await sql`
    SELECT
      id, name, slug, 'land_based' as type,
      ST_Y(coordinates::geometry) as latitude,
      ST_X(coordinates::geometry) as longitude,
      rating_overall, is_featured, experience_tiers,
      city, country
    FROM land_based_casinos
    WHERE is_active = true AND coordinates IS NOT NULL
    ORDER BY is_featured DESC, rating_overall DESC
  `;

  return results.map((row: Record<string, unknown>) => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    type: "land_based" as const,
    latitude: parseFloat(row.latitude as string),
    longitude: parseFloat(row.longitude as string),
    ratingOverall: parseFloat(row.rating_overall as string) || 0,
    isFeatured: row.is_featured as boolean,
    experienceTiers: (row.experience_tiers as ExperienceTier[]) || [],
    city: row.city as string,
    country: row.country as string,
  }));
}

// Map markers - Online casinos (positioned at license jurisdiction)
export async function getOnlineCasinoMapMarkers(): Promise<CasinoMapMarker[]> {
  const results = await sql`
    SELECT
      oc.id, oc.name, oc.slug, 'online' as type,
      ST_Y(lj.coordinates::geometry) as latitude,
      ST_X(lj.coordinates::geometry) as longitude,
      oc.rating_overall, oc.is_featured, oc.experience_tiers,
      lj.name as jurisdiction_name,
      lj.short_name as jurisdiction_short_name,
      lj.id as jurisdiction_id,
      lj.country,
      lj.trust_level,
      oc.licenses
    FROM online_casinos oc
    JOIN license_jurisdictions lj
      ON oc.primary_license_jurisdiction_id = lj.id
    WHERE oc.is_active = true
      AND lj.is_active = true
    ORDER BY oc.is_featured DESC, oc.rating_overall DESC
  `;

  return results.map((row: Record<string, unknown>) => ({
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    type: "online" as const,
    latitude: parseFloat(row.latitude as string),
    longitude: parseFloat(row.longitude as string),
    ratingOverall: parseFloat(row.rating_overall as string) || 0,
    isFeatured: row.is_featured as boolean,
    experienceTiers: (row.experience_tiers as ExperienceTier[]) || [],
    city: row.jurisdiction_name as string,
    country: row.country as string,
    jurisdictionId: row.jurisdiction_id as string,
    jurisdictionName: row.jurisdiction_name as string,
    jurisdictionShortName: row.jurisdiction_short_name as string,
    trustLevel: row.trust_level as "high" | "medium" | "low",
    licenses: row.licenses as string[],
  }));
}

// Combined map markers (both land-based and online)
export async function getAllCasinoMapMarkers(): Promise<CasinoMapMarker[]> {
  const [landBased, online] = await Promise.all([
    getCasinoMapMarkers(),
    getOnlineCasinoMapMarkers(),
  ]);
  return [...landBased, ...online];
}

// Stats
export async function getCasinoStats() {
  const results = await sql`
    SELECT
      (SELECT COUNT(*) FROM land_based_casinos WHERE is_active = true) as physical_count,
      (SELECT COUNT(*) FROM online_casinos WHERE is_active = true) as online_count,
      (SELECT COUNT(DISTINCT country) FROM land_based_casinos WHERE is_active = true) as countries
  `;

  return {
    physicalCount: parseInt(results[0].physical_count as string),
    onlineCount: parseInt(results[0].online_count as string),
    countries: parseInt(results[0].countries as string),
  };
}

// Destination queries
export async function getDestinations(options?: {
  featured?: boolean;
  limit?: number;
  type?: 'city' | 'region' | 'country';
}) {
  const { featured, limit = 50, type } = options || {};

  const results = await sql`
    SELECT
      id, name, slug, type, city, state, country, country_code,
      description, short_description, casino_overview, practical_info,
      ST_Y(coordinates::geometry) as latitude,
      ST_X(coordinates::geometry) as longitude,
      casino_count, hero_image_url, images,
      is_featured, meta_title, meta_description
    FROM destinations
    WHERE is_active = true
      AND (${featured ?? false} = false OR is_featured = true)
      AND (${type || ''} = '' OR type = ${type || ''})
    ORDER BY is_featured DESC, casino_count DESC
    LIMIT ${limit}
  `;

  return results.map((row: Record<string, unknown>) => toCamelCase<Destination>(row));
}

export async function getDestinationBySlug(slug: string) {
  const results = await sql`
    SELECT
      id, name, slug, type, city, state, country, country_code,
      description, short_description, casino_overview, practical_info,
      ST_Y(coordinates::geometry) as latitude,
      ST_X(coordinates::geometry) as longitude,
      casino_count, hero_image_url, images,
      is_featured, meta_title, meta_description,
      created_at, updated_at
    FROM destinations
    WHERE slug = ${slug} AND is_active = true
  `;

  if (results.length === 0) return null;
  return toCamelCase<Destination>(results[0] as Record<string, unknown>);
}

export async function getCasinosByDestination(destination: Destination) {
  // Get casinos in this destination based on type
  if (destination.type === 'country') {
    return getLandBasedCasinos({ country: destination.country });
  } else if (destination.type === 'city' && destination.city) {
    const results = await sql`
      SELECT
        id, name, slug, city, state, country, country_code,
        description, short_description, website,
        ST_Y(coordinates::geometry) as latitude,
        ST_X(coordinates::geometry) as longitude,
        is_24_hours, games, amenities,
        has_hotel, has_restaurant, has_parking,
        rating_overall, rating_games, rating_service,
        rating_atmosphere, rating_value, rating_trust,
        review_count, experience_tiers, verified_badges,
        logo_url, hero_image_url, images,
        is_featured, is_verified
      FROM land_based_casinos
      WHERE is_active = true AND city = ${destination.city}
      ORDER BY rating_overall DESC NULLS LAST
      LIMIT 50
    `;
    return results.map((row: Record<string, unknown>) => toCamelCase<LandBasedCasino>(row));
  }
  return [];
}

// Search
export interface SearchResults {
  landBased: LandBasedCasino[];
  online: OnlineCasino[];
  destinations: Destination[];
}

export async function searchCasinos(query: string): Promise<SearchResults> {
  if (!query || query.length < 2) {
    return { landBased: [], online: [], destinations: [] };
  }

  const searchPattern = `%${query}%`;

  const [landBasedResults, onlineResults, destinationResults] = await Promise.all([
    sql`
      SELECT
        id, name, slug, city, state, country, country_code,
        description, short_description, website,
        ST_Y(coordinates::geometry) as latitude,
        ST_X(coordinates::geometry) as longitude,
        is_24_hours, games, amenities,
        has_hotel, has_restaurant, has_parking,
        rating_overall, rating_games, rating_service,
        rating_atmosphere, rating_value, rating_trust,
        review_count, experience_tiers, verified_badges,
        logo_url, hero_image_url, images,
        is_featured, is_verified
      FROM land_based_casinos
      WHERE is_active = true
        AND (
          name ILIKE ${searchPattern}
          OR city ILIKE ${searchPattern}
          OR country ILIKE ${searchPattern}
          OR description ILIKE ${searchPattern}
        )
      ORDER BY rating_overall DESC NULLS LAST
      LIMIT 20
    `,
    sql`
      SELECT
        id, name, slug, description, short_description, website, affiliate_link,
        licenses, license_countries, restricted_countries,
        welcome_bonus_description, welcome_bonus_amount, welcome_bonus_wagering,
        game_providers, games, has_live_casino, has_sportsbook,
        payment_methods, currencies,
        rating_overall, rating_games, rating_service,
        rating_ux as rating_atmosphere, rating_value, rating_trust,
        review_count, experience_tiers, verified_badges,
        logo_url, hero_image_url,
        is_featured, is_verified, founded_year
      FROM online_casinos
      WHERE is_active = true
        AND (
          name ILIKE ${searchPattern}
          OR description ILIKE ${searchPattern}
        )
      ORDER BY rating_overall DESC NULLS LAST
      LIMIT 20
    `,
    sql`
      SELECT
        id, name, slug, type, city, state, country, country_code,
        description, short_description, casino_overview, practical_info,
        ST_Y(coordinates::geometry) as latitude,
        ST_X(coordinates::geometry) as longitude,
        casino_count, hero_image_url, images,
        is_featured, meta_title, meta_description
      FROM destinations
      WHERE is_active = true
        AND (
          name ILIKE ${searchPattern}
          OR country ILIKE ${searchPattern}
          OR description ILIKE ${searchPattern}
        )
      ORDER BY casino_count DESC
      LIMIT 10
    `
  ]);

  return {
    landBased: landBasedResults.map((row: Record<string, unknown>) => toCamelCase<LandBasedCasino>(row)),
    online: onlineResults.map((row: Record<string, unknown>) => toCamelCase<OnlineCasino>(row)),
    destinations: destinationResults.map((row: Record<string, unknown>) => toCamelCase<Destination>(row)),
  };
}

// Best Of Lists
export interface BestOfList {
  category: ExperienceTier;
  casinos: LandBasedCasino[];
}

export async function getBestOfLists(): Promise<BestOfList[]> {
  const tiers: ExperienceTier[] = [
    "destination",
    "high_roller_haven",
    "historic_icon",
    "poker_paradise",
    "slots_palace",
    "local_gem",
  ];

  const lists = await Promise.all(
    tiers.map(async (tier) => {
      const results = await sql`
        SELECT
          id, name, slug, city, state, country, country_code,
          description, short_description, website,
          ST_Y(coordinates::geometry) as latitude,
          ST_X(coordinates::geometry) as longitude,
          is_24_hours, games, amenities,
          has_hotel, has_restaurant, has_parking,
          rating_overall, rating_games, rating_service,
          rating_atmosphere, rating_value, rating_trust,
          review_count, experience_tiers, verified_badges,
          logo_url, hero_image_url, images,
          is_featured, is_verified
        FROM land_based_casinos
        WHERE is_active = true
          AND ${tier} = ANY(experience_tiers)
        ORDER BY rating_overall DESC NULLS LAST
        LIMIT 10
      `;

      return {
        category: tier,
        casinos: results.map((row: Record<string, unknown>) => toCamelCase<LandBasedCasino>(row)),
      };
    })
  );

  return lists.filter((list) => list.casinos.length > 0);
}

// Bonus-related queries for bonus comparison page
export interface BonusFilters {
  bonusType?: "welcome" | "no_deposit" | "free_spins" | "all";
  maxWagering?: number;
  minRating?: number;
  hasLiveCasino?: boolean;
  license?: string;
}

export async function getOnlineCasinosWithBonuses(filters: BonusFilters = {}) {
  const {
    bonusType = "all",
    maxWagering,
    minRating = 0,
    hasLiveCasino,
    license,
  } = filters;

  const results = await sql`
    SELECT
      id, name, slug, short_description, website, affiliate_link,
      licenses, restricted_countries,
      welcome_bonus_description, welcome_bonus_amount, welcome_bonus_wagering,
      has_live_casino, has_sportsbook,
      payment_methods, currencies,
      rating_overall, rating_trust,
      logo_url,
      is_featured, is_verified
    FROM online_casinos
    WHERE is_active = true
      AND welcome_bonus_description IS NOT NULL
      AND welcome_bonus_description != ''
      AND (${minRating} = 0 OR COALESCE(rating_overall, 0) >= ${minRating})
      AND (${maxWagering ?? 999} = 999 OR COALESCE(welcome_bonus_wagering, 0) <= ${maxWagering ?? 999})
      AND (${hasLiveCasino ?? false} = false OR has_live_casino = true)
      AND (${license || ''} = '' OR ${license || ''} = ANY(licenses))
    ORDER BY
      is_featured DESC,
      rating_overall DESC NULLS LAST,
      welcome_bonus_wagering ASC NULLS LAST
    LIMIT 100
  `;

  return results.map((row: Record<string, unknown>) => toCamelCase<OnlineCasino>(row));
}

export async function getBonusStats() {
  const results = await sql`
    SELECT
      COUNT(*) FILTER (WHERE welcome_bonus_description IS NOT NULL AND welcome_bonus_description != '') as total_with_bonus,
      COUNT(*) FILTER (WHERE welcome_bonus_wagering <= 35) as low_wagering_count,
      AVG(welcome_bonus_wagering) FILTER (WHERE welcome_bonus_wagering IS NOT NULL) as avg_wagering,
      COUNT(DISTINCT unnest) as unique_licenses
    FROM online_casinos, LATERAL unnest(licenses)
    WHERE is_active = true
  `;

  return results[0] || { total_with_bonus: 0, low_wagering_count: 0, avg_wagering: 0 };
}
