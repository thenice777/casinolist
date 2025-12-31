"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { CasinoMapMarker, ExperienceTier } from "@/types/casino";
import { Filter, Star, X, Building2, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CasinoTypeFilter = "all" | "land_based" | "online";

const CasinoMap = dynamic(() => import("./CasinoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center">
      <span className="text-slate-400">Loading map...</span>
    </div>
  ),
});

interface MapContainerProps {
  markers: CasinoMapMarker[];
}

const experienceTierOptions: { value: ExperienceTier; label: string }[] = [
  { value: "destination", label: "Destination Casino" },
  { value: "high_roller_haven", label: "High Roller Haven" },
  { value: "poker_paradise", label: "Poker Paradise" },
  { value: "slots_palace", label: "Slots Palace" },
  { value: "historic_icon", label: "Historic Icon" },
  { value: "local_gem", label: "Local Gem" },
  { value: "rising_star", label: "Rising Star" },
  { value: "budget_friendly", label: "Budget Friendly" },
];

export default function MapContainer({ markers }: MapContainerProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState<CasinoTypeFilter>("all");
  const [minRating, setMinRating] = useState(0);
  const [selectedTiers, setSelectedTiers] = useState<ExperienceTier[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredMarkers = useMemo(() => {
    return markers.filter((marker) => {
      // Type filter
      if (typeFilter !== "all" && marker.type !== typeFilter) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && marker.ratingOverall < minRating) {
        return false;
      }

      // Featured filter
      if (showFeaturedOnly && !marker.isFeatured) {
        return false;
      }

      // Experience tier filter (only applies to land-based)
      if (selectedTiers.length > 0 && marker.type === "land_based") {
        const hasMatchingTier = marker.experienceTiers.some((tier) =>
          selectedTiers.includes(tier)
        );
        if (!hasMatchingTier) {
          return false;
        }
      }

      return true;
    });
  }, [markers, typeFilter, minRating, selectedTiers, showFeaturedOnly]);

  const toggleTier = (tier: ExperienceTier) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const clearFilters = () => {
    setTypeFilter("all");
    setMinRating(0);
    setSelectedTiers([]);
    setShowFeaturedOnly(false);
  };

  const hasActiveFilters = typeFilter !== "all" || minRating > 0 || selectedTiers.length > 0 || showFeaturedOnly;

  // Count markers by type
  const landBasedCount = markers.filter((m) => m.type === "land_based").length;
  const onlineCount = markers.filter((m) => m.type === "online").length;

  return (
    <div className="w-full h-full relative">
      <CasinoMap markers={filteredMarkers} />

      {/* Quick Type Toggle - Always visible */}
      <div className="absolute top-20 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-1 border border-slate-700 z-20 flex gap-1">
        <button
          onClick={() => setTypeFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded text-xs font-medium transition-colors",
            typeFilter === "all"
              ? "bg-slate-700 text-white"
              : "text-slate-400 hover:text-white"
          )}
        >
          All ({markers.length})
        </button>
        <button
          onClick={() => setTypeFilter("land_based")}
          className={cn(
            "px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1",
            typeFilter === "land_based"
              ? "bg-emerald-600 text-white"
              : "text-slate-400 hover:text-white"
          )}
        >
          <Building2 className="w-3 h-3" />
          Land ({landBasedCount})
        </button>
        <button
          onClick={() => setTypeFilter("online")}
          className={cn(
            "px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1",
            typeFilter === "online"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white"
          )}
        >
          <Globe2 className="w-3 h-3" />
          Online ({onlineCount})
        </button>
      </div>

      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={cn(
          "absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 border transition-colors z-20",
          showFilters ? "border-emerald-500 text-emerald-400" : "border-slate-700 text-slate-300 hover:text-white"
        )}
      >
        <Filter className="w-5 h-5" />
        {hasActiveFilters && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full" />
        )}
      </button>

      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute top-4 right-16 bg-slate-900/95 backdrop-blur-sm rounded-lg p-4 border border-slate-700 w-72 z-20 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Casino Type Toggle */}
          <div className="mb-4">
            <label className="text-slate-400 text-sm block mb-2">
              Casino Type
            </label>
            <div className="flex rounded-lg bg-slate-800 p-1">
              <button
                onClick={() => setTypeFilter("all")}
                className={cn(
                  "flex-1 px-3 py-1.5 rounded text-sm transition-colors flex items-center justify-center gap-1.5",
                  typeFilter === "all"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                All
              </button>
              <button
                onClick={() => setTypeFilter("land_based")}
                className={cn(
                  "flex-1 px-3 py-1.5 rounded text-sm transition-colors flex items-center justify-center gap-1.5",
                  typeFilter === "land_based"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Building2 className="w-3.5 h-3.5" />
                Land
              </button>
              <button
                onClick={() => setTypeFilter("online")}
                className={cn(
                  "flex-1 px-3 py-1.5 rounded text-sm transition-colors flex items-center justify-center gap-1.5",
                  typeFilter === "online"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Globe2 className="w-3.5 h-3.5" />
                Online
              </button>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
              />
              <span className="text-slate-300 text-sm">Featured only</span>
            </label>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <label className="text-slate-400 text-sm block mb-2">
              Minimum Rating
            </label>
            <div className="flex items-center gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={cn(
                    "px-3 py-1 rounded text-sm transition-colors",
                    minRating === rating
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  )}
                >
                  {rating === 0 ? (
                    "Any"
                  ) : (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {rating}+
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Tier Filter - only for land-based */}
          {typeFilter !== "online" && (
            <div>
              <label className="text-slate-400 text-sm block mb-2">
                Experience Type
              </label>
              <div className="flex flex-wrap gap-2">
                {experienceTierOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleTier(option.value)}
                    className={cn(
                      "px-2 py-1 rounded text-xs transition-colors",
                      selectedTiers.includes(option.value)
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Online Trust Level hint */}
          {typeFilter === "online" && (
            <div className="text-xs text-slate-500 border-t border-slate-700 pt-3 mt-2">
              <p className="mb-1">Online casinos are mapped by license jurisdiction.</p>
              <div className="flex gap-3 mt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  High Trust
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Medium
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  Lower
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Results Count */}
      {hasActiveFilters && (
        <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700 z-20">
          <span className="text-sm text-slate-400">
            Showing <span className="text-white font-medium">{filteredMarkers.length}</span> of {markers.length}
          </span>
        </div>
      )}
    </div>
  );
}
