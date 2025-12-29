"use client";

import Link from "next/link";
import { Globe, Star, Check, Gift, Shield, Sparkles } from "lucide-react";
import TrackedLink from "@/components/casino/TrackedLink";
import { OnlineCasino } from "@/types/casino";

interface BonusCardProps {
  casino: OnlineCasino;
  rank?: number;
}

export default function BonusCard({ casino, rank }: BonusCardProps) {
  const rating = Number(casino.ratingOverall) || 0;

  return (
    <div className={`bg-slate-800/50 rounded-xl border overflow-hidden transition-all hover:shadow-lg group relative ${
      casino.isFeatured
        ? "border-amber-500/50 hover:border-amber-400/70 hover:shadow-amber-500/10"
        : "border-slate-700 hover:border-emerald-500/50 hover:shadow-emerald-500/10"
    }`}>
      {/* Featured Badge */}
      {casino.isFeatured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          FEATURED
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Rank & Logo */}
        <div className="lg:w-44 p-4 flex items-center gap-4 bg-slate-800/80">
          {rank && (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
              rank === 1
                ? "bg-amber-500 text-slate-900"
                : rank === 2
                ? "bg-slate-400 text-slate-900"
                : rank === 3
                ? "bg-amber-700 text-white"
                : "bg-slate-700 text-slate-300"
            }`}>
              {rank}
            </div>
          )}
          <Link href={`/online/${casino.slug}`}>
            {casino.logoUrl ? (
              <img
                src={casino.logoUrl}
                alt={casino.name}
                className="w-16 h-16 object-contain rounded-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white/80" />
              </div>
            )}
          </Link>
        </div>

        {/* Casino Info */}
        <div className="flex-1 p-4 lg:border-l border-slate-700">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <Link href={`/online/${casino.slug}`}>
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {casino.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                {casino.isVerified && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified
                  </span>
                )}
                {casino.licenses && casino.licenses.length > 0 && (
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {casino.licenses[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center gap-1.5 bg-slate-700/50 px-2.5 py-1.5 rounded-lg">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-lg font-bold text-white">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {casino.shortDescription && (
            <p className="text-slate-400 text-sm line-clamp-1 mb-3">
              {casino.shortDescription}
            </p>
          )}

          {/* Quick Features */}
          <div className="flex flex-wrap gap-2 text-xs">
            {casino.hasLiveCasino && (
              <span className="bg-slate-700/50 text-slate-400 px-2 py-1 rounded">Live Casino</span>
            )}
            {casino.hasSportsbook && (
              <span className="bg-slate-700/50 text-slate-400 px-2 py-1 rounded">Sportsbook</span>
            )}
          </div>
        </div>

        {/* Bonus Info */}
        <div className="lg:w-64 p-4 bg-gradient-to-br from-emerald-900/20 to-slate-800 lg:border-l border-slate-700">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <Gift className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Welcome Bonus</span>
          </div>
          <p className="text-white font-bold text-lg leading-tight mb-2">
            {casino.welcomeBonusDescription}
          </p>
          {casino.welcomeBonusWagering && (
            <p className="text-slate-400 text-xs mb-3">
              {casino.welcomeBonusWagering}x wagering requirement
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="p-4 flex items-center justify-center bg-slate-800/50 lg:border-l border-slate-700">
          <TrackedLink
            casinoId={casino.id}
            casinoType="online"
            affiliateLink={casino.affiliateLink}
            websiteUrl={casino.website}
            casinoName={casino.name}
            variant="primary"
            size="md"
          >
            Get Bonus
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
