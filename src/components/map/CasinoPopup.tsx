"use client";

import Link from "next/link";
import { CasinoMapMarker } from "@/types/casino";
import { Star, MapPin, ExternalLink, X, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface CasinoPopupProps {
  marker: CasinoMapMarker;
  onClose: () => void;
}

export default function CasinoPopup({ marker, onClose }: CasinoPopupProps) {
  const isOnline = marker.type === "online";
  const detailUrl = isOnline ? `/online/${marker.slug}` : `/casino/${marker.slug}`;

  // Trust level colors for online casinos
  const trustLevelStyles = {
    high: "bg-blue-500/20 text-blue-400",
    medium: "bg-amber-500/20 text-amber-400",
    low: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 min-w-[280px] max-w-[320px] shadow-2xl">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header badges */}
      <div className="flex items-center gap-2 mb-2">
        {marker.isFeatured && (
          <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded">
            Featured
          </span>
        )}
        {isOnline && (
          <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Online
          </span>
        )}
      </div>

      {/* Casino name */}
      <Link href={detailUrl} className="block">
        <h3 className="font-bold text-white text-lg mb-1 pr-6 hover:text-emerald-400 transition-colors">
          {marker.name}
        </h3>
      </Link>

      {/* Location / Jurisdiction */}
      {isOnline ? (
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Shield className="w-4 h-4" />
          <span>{marker.jurisdictionName || "Licensed Casino"}</span>
          {marker.trustLevel && (
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                trustLevelStyles[marker.trustLevel]
              )}
            >
              {marker.trustLevel}
            </span>
          )}
        </div>
      ) : (
        <p className="text-slate-400 text-sm flex items-center gap-1 mb-3">
          <MapPin className="w-4 h-4" />
          {marker.city}, {marker.country}
        </p>
      )}

      {/* Rating */}
      {marker.ratingOverall > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-4 h-4",
                  star <= Math.round(marker.ratingOverall / 2)
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-600"
                )}
              />
            ))}
          </div>
          <span className="text-white font-medium">
            {marker.ratingOverall.toFixed(1)}
          </span>
          <span className="text-slate-500 text-sm">/ 10</span>
        </div>
      )}

      {/* Experience tiers */}
      {marker.experienceTiers && marker.experienceTiers.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {marker.experienceTiers.slice(0, 3).map((tier) => (
            <span
              key={tier}
              className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded capitalize"
            >
              {tier.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <Link
        href={detailUrl}
        className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-lg transition-colors font-medium"
      >
        View Details
        <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  );
}
