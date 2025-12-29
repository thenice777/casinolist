import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OnlineCasinoCard from "@/components/casino/OnlineCasinoCard";
import OnlineCasinoFilters from "@/components/casino/OnlineCasinoFilters";
import { sql, toCamelCase } from "@/lib/db";
import { OnlineCasino } from "@/types/casino";

export const metadata: Metadata = {
  title: "Online Casinos | Know the House",
  description:
    "Compare the best online casinos with bonuses, game selections, and trusted reviews.",
};

interface Props {
  searchParams: Promise<{
    license?: string;
    rating?: string;
    features?: string;
    payments?: string;
  }>;
}

async function getFilteredOnlineCasinos(filters: {
  license?: string;
  rating?: number;
  features?: string[];
  payments?: string[];
}) {
  const { license, rating = 0, features = [], payments = [] } = filters;

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
      AND (${license || ''} = '' OR ${license || ''} = ANY(licenses))
      AND (${rating} = 0 OR COALESCE(rating_overall, 0) >= ${rating})
      AND (${features.length === 0} OR (
        (${!features.includes('live_casino')} OR has_live_casino = true)
        AND (${!features.includes('sportsbook')} OR has_sportsbook = true)
      ))
      AND (${payments.length === 0} OR payment_methods && ${payments}::text[])
    ORDER BY is_featured DESC, rating_overall DESC NULLS LAST
    LIMIT 100
  `;

  return results.map((row: Record<string, unknown>) => toCamelCase<OnlineCasino>(row));
}

async function getLicenses() {
  const results = await sql`
    SELECT DISTINCT unnest(licenses) as license
    FROM online_casinos
    WHERE is_active = true AND licenses IS NOT NULL
    ORDER BY license
  `;

  return results.map((row) => ({
    value: row.license as string,
    label: row.license as string,
  }));
}

export default async function OnlineCasinosPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = {
    license: params.license,
    rating: Number(params.rating) || 0,
    features: params.features?.split(",").filter(Boolean) || [],
    payments: params.payments?.split(",").filter(Boolean) || [],
  };

  const [casinos, licenses] = await Promise.all([
    getFilteredOnlineCasinos(filters),
    getLicenses(),
  ]);

  const hasFilters = filters.license || filters.rating > 0 || filters.features.length > 0 || filters.payments.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Online Casinos</h1>
          <p className="text-slate-400 text-lg">
            Discover and compare the best online casinos with verified ratings and exclusive insights.
          </p>
        </div>

        <OnlineCasinoFilters licenses={licenses} basePath="/online-casinos" />

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
              No online casinos found matching your criteria.
            </p>
            <p className="text-slate-500 text-sm">
              Try adjusting your filters or browse all casinos.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {casinos.map((casino) => (
              <OnlineCasinoCard key={casino.id} casino={casino} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
