import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CasinoCard from "@/components/casino/CasinoCard";
import CasinoFilters from "@/components/casino/CasinoFilters";
import { sql, toCamelCase } from "@/lib/db";
import { LandBasedCasino } from "@/types/casino";

export const metadata: Metadata = {
  title: "Land-Based Casinos | Know the House",
  description:
    "Discover and explore physical casinos worldwide. Expert ratings, verified information, and insider details.",
};

interface Props {
  searchParams: Promise<{
    country?: string;
    rating?: string;
    tier?: string;
    amenities?: string;
  }>;
}

async function getFilteredCasinos(filters: {
  country?: string;
  rating?: number;
  tier?: string;
  amenities?: string[];
}) {
  const { country, rating = 0, tier, amenities = [] } = filters;

  const results = await sql`
    SELECT
      id, name, slug, city, state, country, country_code,
      description, short_description, website,
      ST_Y(coordinates::geometry) as latitude,
      ST_X(coordinates::geometry) as longitude,
      is_24_hours, games, amenities,
      has_hotel, has_restaurant, has_parking,
      has_poker_room, has_sportsbook,
      rating_overall, rating_games, rating_service,
      rating_atmosphere, rating_value, rating_trust,
      review_count, experience_tiers, verified_badges,
      logo_url, hero_image_url, images,
      is_featured, is_verified
    FROM land_based_casinos
    WHERE is_active = true
      AND (${country || ''} = '' OR country = ${country || ''})
      AND (${rating} = 0 OR COALESCE(rating_overall, 0) >= ${rating})
      AND (${tier || ''} = '' OR ${tier || ''} = ANY(experience_tiers))
      AND (${amenities.length === 0} OR (
        (${!amenities.includes('hotel')} OR has_hotel = true)
        AND (${!amenities.includes('restaurant')} OR has_restaurant = true)
        AND (${!amenities.includes('parking')} OR has_parking = true)
        AND (${!amenities.includes('poker')} OR has_poker_room = true)
        AND (${!amenities.includes('sportsbook')} OR has_sportsbook = true)
      ))
    ORDER BY is_featured DESC, rating_overall DESC NULLS LAST
    LIMIT 100
  `;

  return results.map((row: Record<string, unknown>) => toCamelCase<LandBasedCasino>(row));
}

async function getCountries() {
  const results = await sql`
    SELECT DISTINCT country
    FROM land_based_casinos
    WHERE is_active = true AND country IS NOT NULL
    ORDER BY country
  `;

  return results.map((row) => ({
    value: row.country as string,
    label: row.country as string,
  }));
}

export default async function LandBasedCasinosPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = {
    country: params.country,
    rating: Number(params.rating) || 0,
    tier: params.tier,
    amenities: params.amenities?.split(",").filter(Boolean) || [],
  };

  const [casinos, countries] = await Promise.all([
    getFilteredCasinos(filters),
    getCountries(),
  ]);

  const hasFilters = filters.country || filters.rating > 0 || filters.tier || filters.amenities.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Land-Based Casinos
          </h1>
          <p className="text-slate-400 text-lg">
            Discover world-class casino destinations with verified ratings and insider details.
          </p>
        </div>

        <CasinoFilters countries={countries} basePath="/land-based-casinos" />

        {/* Results count */}
        <div className="mb-6">
          <p className="text-slate-400 text-sm">
            {casinos.length === 0 ? (
              "No casinos match your filters"
            ) : hasFilters ? (
              `Showing ${casinos.length} casino${casinos.length !== 1 ? "s" : ""} matching your criteria`
            ) : (
              `Showing ${casinos.length} casino${casinos.length !== 1 ? "s" : ""}`
            )}
          </p>
        </div>

        {casinos.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
            <p className="text-slate-400 mb-4">
              No casinos found matching your criteria.
            </p>
            <p className="text-slate-500 text-sm">
              Try adjusting your filters or browse all casinos.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casinos.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} type="land_based" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
