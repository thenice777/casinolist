import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBestOfLists } from "@/lib/casinos";
import { Star, MapPin, Trophy, Crown, History, Sparkles, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Of Casino Lists | Know the House",
  description:
    "Discover our curated lists of the world's best casinos. From high roller havens to historic icons, find your perfect gaming destination.",
};

const categoryIcons: Record<string, React.ReactNode> = {
  destination: <Trophy className="w-6 h-6" />,
  high_roller_haven: <Crown className="w-6 h-6" />,
  historic_icon: <History className="w-6 h-6" />,
  poker_paradise: <Sparkles className="w-6 h-6" />,
  slots_palace: <Sparkles className="w-6 h-6" />,
  rising_star: <Sparkles className="w-6 h-6" />,
  local_gem: <MapPin className="w-6 h-6" />,
};

const categoryDescriptions: Record<string, string> = {
  destination: "World-renowned casinos that define the ultimate gaming experience.",
  high_roller_haven: "Exclusive venues catering to VIP players with high limits and premium service.",
  historic_icon: "Legendary establishments with rich history and timeless elegance.",
  poker_paradise: "Top destinations for serious poker players.",
  slots_palace: "The best casinos for slot enthusiasts with vast machine selections.",
  rising_star: "Exciting new casinos making waves in the industry.",
  local_gem: "Hidden treasures beloved by locals and savvy travelers.",
};

export default async function BestOfPage() {
  const lists = await getBestOfLists();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Best Of Casino Lists
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Curated collections of the world's finest casinos, organized by what matters most to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {lists.map((list) => (
            <div
              key={list.category}
              className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-900/50 to-slate-800 p-6 border-b border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                    {categoryIcons[list.category] || <Globe className="w-6 h-6" />}
                  </div>
                  <h2 className="text-xl font-bold text-white capitalize">
                    Best {list.category.replace(/_/g, " ")} Casinos
                  </h2>
                </div>
                <p className="text-slate-400 text-sm">
                  {categoryDescriptions[list.category] || "Top-rated casinos in this category."}
                </p>
              </div>

              {/* Casino List */}
              <div className="p-4">
                {list.casinos.length === 0 ? (
                  <p className="text-slate-500 text-center py-4">
                    No casinos in this category yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {list.casinos.slice(0, 5).map((casino, index) => (
                      <Link
                        key={casino.id}
                        href={`/casino/${casino.slug}`}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-colors group"
                      >
                        {/* Rank */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? "bg-amber-500/20 text-amber-400" :
                          index === 1 ? "bg-slate-400/20 text-slate-300" :
                          index === 2 ? "bg-amber-700/20 text-amber-600" :
                          "bg-slate-700 text-slate-400"
                        }`}>
                          {index + 1}
                        </div>

                        {/* Casino Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors truncate">
                            {casino.name}
                          </h3>
                          <p className="text-slate-400 text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {casino.city}, {casino.country}
                          </p>
                        </div>

                        {/* Rating */}
                        {Number(casino.ratingOverall) > 0 && (
                          <div className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-white font-medium text-sm">
                              {Number(casino.ratingOverall).toFixed(1)}
                            </span>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}

                {list.casinos.length > 5 && (
                  <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                    <Link
                      href={`/land-based-casinos?tier=${list.category}`}
                      className="text-emerald-400 hover:text-emerald-300 text-sm"
                    >
                      View all {list.casinos.length} casinos →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Online Casinos CTA */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900/30 to-slate-800 rounded-xl p-8 border border-emerald-700/30 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Looking for Online Casinos?
          </h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            Explore our curated selection of the best online casinos with verified ratings and exclusive bonuses.
          </p>
          <Link
            href="/online-casinos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            <Globe className="w-5 h-5" />
            Browse Online Casinos
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
