"use client";

import { CasinoMapMarker } from "@/types/casino";
import { Star, MapPin, Shield, Globe } from "lucide-react";

interface MarkerTooltipProps {
  marker: CasinoMapMarker;
}

export default function MarkerTooltip({ marker }: MarkerTooltipProps) {
  const isOnline = marker.type === "online";

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 min-w-[200px] max-w-[280px] shadow-xl pointer-events-none">
      {/* Header with type indicator */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h4 className="font-semibold text-white text-sm leading-tight">
          {marker.name}
        </h4>
        {isOnline && (
          <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
        )}
      </div>

      {/* Location */}
      <p className="text-slate-400 text-xs flex items-center gap-1">
        {isOnline ? (
          <>
            <Shield className="w-3 h-3" />
            {marker.jurisdictionName || marker.city}
          </>
        ) : (
          <>
            <MapPin className="w-3 h-3" />
            {marker.city}, {marker.country}
          </>
        )}
      </p>

      {/* Rating */}
      {marker.ratingOverall > 0 && (
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-white text-xs font-medium">
            {marker.ratingOverall.toFixed(1)}
          </span>
          <span className="text-slate-500 text-xs">/ 10</span>
        </div>
      )}

      {/* Featured badge */}
      {marker.isFeatured && (
        <span className="inline-block mt-2 text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">
          Featured
        </span>
      )}

      {/* Click hint */}
      <p className="text-slate-500 text-xs mt-2 border-t border-slate-700 pt-2">
        Click for details
      </p>
    </div>
  );
}
