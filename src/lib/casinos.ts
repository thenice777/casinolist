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
      id, name, slug, description, short_description, website,
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
      id, name, slug, description, short_description, website,
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

// Map markers
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
        id, name, slug, description, short_description, website,
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
