"use client";

import Link from "next/link";
import { MapPin, Star, Check, Globe } from "lucide-react";
import CompareButton from "@/components/compare/CompareButton";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";

interface CasinoCardProps {
  casino: LandBasedCasino | OnlineCasino;
  type: "land_based" | "online";
}

export default function CasinoCard({ casino, type }: CasinoCardProps) {
  const isLandBased = type === "land_based";
  const href = isLandBased ? `/casino/${casino.slug}` : `/online/${casino.slug}`;

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 group relative">
      {/* Compare Button - positioned in top right */}
      <div className="absolute top-3 right-3 z-10">
        <CompareButton slug={casino.slug} name={casino.name} type={type} />
      </div>

      <Link href={href}>
        {/* Image */}
        <div className="h-40 bg-slate-700 relative">
          {casino.heroImageUrl ? (
            <img
              src={casino.heroImageUrl}
              alt={casino.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-slate-800 flex items-center justify-center">
              {isLandBased ? (
                <MapPin className="w-8 h-8 text-slate-600" />
              ) : (
                <Globe className="w-8 h-8 text-slate-600" />
              )}
            </div>
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

          {isLandBased && "city" in casino && (
            <p className="text-slate-400 text-sm flex items-center gap-1 mb-3">
              <MapPin className="w-3.5 h-3.5" />
              {casino.city}, {casino.country}
            </p>
          )}

          {!isLandBased && "welcomeBonusDescription" in casino && casino.welcomeBonusDescription && (
            <p className="text-emerald-400 text-sm mb-3 line-clamp-1">
              {casino.welcomeBonusDescription}
            </p>
          )}

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
    </div>
  );
}
