"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Star, Check, Gift, Shield } from "lucide-react";
import CompareButton from "@/components/compare/CompareButton";
import TrackedLink from "@/components/casino/TrackedLink";
import { OnlineCasino } from "@/types/casino";

interface OnlineCasinoCardProps {
  casino: OnlineCasino;
}

export default function OnlineCasinoCard({ casino }: OnlineCasinoCardProps) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 group relative">
      {/* Compare Button */}
      <div className="absolute top-4 right-4 z-10">
        <CompareButton slug={casino.slug} name={casino.name} type="online" />
      </div>

      <div className="flex flex-col md:flex-row">
        <Link href={`/online/${casino.slug}`} className="flex flex-col md:flex-row flex-1">
          {/* Logo Section */}
          <div className="md:w-48 p-6 flex items-center justify-center bg-slate-800/80">
            {casino.logoUrl ? (
              <Image
                src={casino.logoUrl}
                alt={`${casino.name} logo`}
                width={96}
                height={96}
                className="object-contain"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                <Globe className="w-10 h-10 text-white/80" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {casino.name}
                  </h2>
                  {casino.isFeatured && (
                    <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                  {casino.isVerified && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                {casino.shortDescription && (
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {casino.shortDescription}
                  </p>
                )}
              </div>

              {/* Rating */}
              {Number(casino.ratingOverall) > 0 && (
                <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-xl font-bold text-white">
                    {Number(casino.ratingOverall).toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4 text-sm">
              {casino.welcomeBonusDescription && (
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Gift className="w-4 h-4" />
                  <span>{casino.welcomeBonusDescription}</span>
                </div>
              )}

              {casino.licenses && casino.licenses.length > 0 && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Shield className="w-4 h-4" />
                  <span>{casino.licenses.slice(0, 2).join(", ")}</span>
                </div>
              )}

              {casino.hasLiveCasino && (
                <span className="text-slate-400">Live Casino</span>
              )}

              {casino.hasSportsbook && (
                <span className="text-slate-400">Sportsbook</span>
              )}
            </div>

            {/* Games Preview */}
            {casino.games && casino.games.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {casino.games.slice(0, 5).map((game) => (
                  <span
                    key={game}
                    className="bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded text-xs capitalize"
                  >
                    {game.replace(/_/g, " ")}
                  </span>
                ))}
                {casino.games.length > 5 && (
                  <span className="text-slate-500 text-xs">
                    +{casino.games.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>

        {/* Visit Casino CTA */}
        {(casino.affiliateLink || casino.website) && (
          <div className="hidden md:flex p-4 items-center border-l border-slate-700 bg-slate-800/30">
            <TrackedLink
              casinoId={casino.id}
              casinoType="online"
              affiliateLink={casino.affiliateLink}
              websiteUrl={casino.website}
              casinoName={casino.name}
              variant="primary"
              size="md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
