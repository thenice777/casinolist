import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getLandBasedCasinos } from "@/lib/casinos";
import { MapPin, Star, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Land-Based Casinos | Know the House",
  description:
    "Discover and explore physical casinos worldwide. Expert ratings, verified information, and insider details.",
};

export default async function LandBasedCasinosPage() {
  const casinos = await getLandBasedCasinos({ limit: 50 });

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

        {casinos.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
            <p className="text-slate-400">
              No casinos found. Check back soon for new listings.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casinos.map((casino) => (
              <Link
                key={casino.id}
                href={`/casino/${casino.slug}`}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 group"
              >
                {/* Image */}
                <div className="h-40 bg-slate-700 relative">
                  {casino.heroImageUrl ? (
                    <img
                      src={casino.heroImageUrl}
                      alt={casino.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-slate-800" />
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {casino.isFeatured && (
                      <span className="bg-amber-500/90 text-white text-xs px-2 py-0.5 rounded font-medium">
                        Featured
                      </span>
                    )}
                    {casino.isVerified && (
                      <span className="bg-emerald-500/90 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {casino.name}
                  </h2>

                  <p className="text-slate-400 text-sm flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {casino.city}, {casino.country}
                  </p>

                  {casino.shortDescription && (
                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                      {casino.shortDescription}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {Number(casino.ratingOverall) > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-white font-medium">
                          {Number(casino.ratingOverall).toFixed(1)}
                        </span>
                        {Number(casino.reviewCount) > 0 && (
                          <span className="text-slate-500 text-sm">
                            ({casino.reviewCount})
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-500 text-sm">Not rated yet</span>
                    )}

                    {casino.experienceTiers && casino.experienceTiers.length > 0 && (
                      <span className="text-xs text-amber-400/80 capitalize">
                        {casino.experienceTiers[0].replace(/_/g, " ")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
