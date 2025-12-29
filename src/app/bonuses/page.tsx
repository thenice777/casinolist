import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BonusCard from "@/components/bonus/BonusCard";
import BonusFilters from "@/components/bonus/BonusFilters";
import { getOnlineCasinosWithBonuses, BonusFilters as BonusFiltersType } from "@/lib/casinos";
import { sql } from "@/lib/db";
import { Gift, TrendingUp, Shield, Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Casino Bonuses | Compare Welcome Offers & Free Spins",
  description:
    "Compare the best casino bonuses, welcome offers, and free spins. Find low wagering bonuses from trusted, licensed casinos.",
  openGraph: {
    title: "Casino Bonuses | CasinoList.io",
    description: "Compare casino bonuses from 100+ licensed operators. Find the best welcome offers with low wagering requirements.",
    url: "https://casinolist.io/bonuses",
  },
};

interface Props {
  searchParams: Promise<{
    wagering?: string;
    rating?: string;
    license?: string;
    live?: string;
  }>;
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

export default async function BonusesPage({ searchParams }: Props) {
  const params = await searchParams;

  const filters: BonusFiltersType = {
    maxWagering: params.wagering ? parseInt(params.wagering) : undefined,
    minRating: params.rating ? parseInt(params.rating) : undefined,
    hasLiveCasino: params.live === "true" ? true : undefined,
    license: params.license || undefined,
  };

  const [casinos, licenses] = await Promise.all([
    getOnlineCasinosWithBonuses(filters),
    getLicenses(),
  ]);

  const hasFilters = Object.values(filters).some(v => v !== undefined);

  // Count low wagering bonuses
  const lowWageringCount = casinos.filter(c =>
    c.welcomeBonusWagering && Number(c.welcomeBonusWagering) <= 35
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Casino Bonuses
              </h1>
              <p className="text-slate-400">
                Compare welcome offers from licensed casinos
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <Gift className="w-4 h-4" />
              Total Bonuses
            </div>
            <div className="text-2xl font-bold text-white">{casinos.length}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <Percent className="w-4 h-4" />
              Low Wagering
            </div>
            <div className="text-2xl font-bold text-emerald-400">{lowWageringCount}</div>
            <div className="text-xs text-slate-500">35x or less</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <TrendingUp className="w-4 h-4" />
              Featured
            </div>
            <div className="text-2xl font-bold text-amber-400">
              {casinos.filter(c => c.isFeatured).length}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <Shield className="w-4 h-4" />
              Verified
            </div>
            <div className="text-2xl font-bold text-white">
              {casinos.filter(c => c.isVerified).length}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-slate-800 rounded-xl p-4 border border-emerald-700/30 mb-6">
          <p className="text-slate-300 text-sm">
            <strong className="text-emerald-400">Tip:</strong> Look for bonuses with lower wagering requirements (35x or less) for better value.
            All casinos listed are licensed and regulated. Always read the full terms and conditions before claiming any bonus.
          </p>
        </div>

        {/* Filters */}
        <BonusFilters licenses={licenses} />

        {/* Results */}
        <div className="mb-4">
          <p className="text-slate-400 text-sm">
            {hasFilters
              ? `Showing ${casinos.length} bonus${casinos.length !== 1 ? "es" : ""} matching your criteria`
              : `Showing ${casinos.length} bonus${casinos.length !== 1 ? "es" : ""}`}
          </p>
        </div>

        {casinos.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
            <Gift className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 mb-2">No bonuses match your filters.</p>
            <p className="text-slate-500 text-sm">Try adjusting your criteria or browse all bonuses.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {casinos.map((casino, index) => (
              <BonusCard
                key={casino.id}
                casino={casino}
                rank={!hasFilters ? index + 1 : undefined}
              />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
          <p className="text-slate-500 text-xs leading-relaxed">
            <strong className="text-slate-400">Disclaimer:</strong> Bonus terms and conditions are subject to change.
            Wagering requirements, maximum bet limits, game restrictions, and expiration dates apply.
            Please read the full terms on the casino's website before claiming any bonus.
            Gambling involves risk. Only gamble with money you can afford to lose. 18+ only.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
