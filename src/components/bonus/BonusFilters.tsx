"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw } from "lucide-react";

interface BonusFiltersProps {
  licenses: { value: string; label: string }[];
}

export default function BonusFilters({ licenses }: BonusFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentWagering = searchParams.get("wagering") || "";
  const currentRating = searchParams.get("rating") || "";
  const currentLicense = searchParams.get("license") || "";
  const currentLiveCasino = searchParams.get("live") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/bonuses?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/bonuses");
  };

  const hasFilters = currentWagering || currentRating || currentLicense || currentLiveCasino;

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-emerald-400" />
        <span className="text-white font-medium">Filter Bonuses</span>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Wagering Filter */}
        <div>
          <label className="block text-slate-400 text-xs mb-1.5">Max Wagering</label>
          <select
            value={currentWagering}
            onChange={(e) => updateFilter("wagering", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">Any</option>
            <option value="20">20x or less</option>
            <option value="30">30x or less</option>
            <option value="35">35x or less</option>
            <option value="40">40x or less</option>
            <option value="50">50x or less</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-slate-400 text-xs mb-1.5">Min Rating</label>
          <select
            value={currentRating}
            onChange={(e) => updateFilter("rating", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">Any</option>
            <option value="9">9+ Excellent</option>
            <option value="8">8+ Great</option>
            <option value="7">7+ Good</option>
            <option value="6">6+ Fair</option>
          </select>
        </div>

        {/* License Filter */}
        <div>
          <label className="block text-slate-400 text-xs mb-1.5">License</label>
          <select
            value={currentLicense}
            onChange={(e) => updateFilter("license", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">Any License</option>
            {licenses.map((license) => (
              <option key={license.value} value={license.value}>
                {license.label}
              </option>
            ))}
          </select>
        </div>

        {/* Live Casino Filter */}
        <div>
          <label className="block text-slate-400 text-xs mb-1.5">Features</label>
          <select
            value={currentLiveCasino}
            onChange={(e) => updateFilter("live", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Casinos</option>
            <option value="true">Live Casino Only</option>
          </select>
        </div>
      </div>
    </div>
  );
}
