"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Building2, Globe, MapPin, Star, Filter, X } from "lucide-react";

const typeFilters = [
  { value: "all", label: "All Types", icon: Filter },
  { value: "land_based", label: "Land-Based", icon: Building2 },
  { value: "online", label: "Online", icon: Globe },
  { value: "destinations", label: "Destinations", icon: MapPin },
];

const ratingFilters = [
  { value: "0", label: "Any Rating" },
  { value: "7", label: "7.0+" },
  { value: "8", label: "8.0+" },
  { value: "9", label: "9.0+" },
];

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "all";
  const currentRating = searchParams.get("rating") || "0";
  const query = searchParams.get("q") || "";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "0") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters = currentType !== "all" || currentRating !== "0";

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 mb-8">
      <div className="flex flex-wrap items-center gap-6">
        {/* Type Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-slate-400 text-xs font-medium mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => updateFilters("type", filter.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  currentType === filter.value
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="min-w-[160px]">
          <label className="block text-slate-400 text-xs font-medium mb-2">
            Minimum Rating
          </label>
          <div className="flex gap-2">
            {ratingFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => updateFilters("rating", filter.value)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  currentRating === filter.value
                    ? "bg-amber-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {filter.value !== "0" && (
                  <Star className="w-3 h-3" />
                )}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
