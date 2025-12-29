"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Star, MapPin, Crown, Hotel, X, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface CasinoFiltersProps {
  countries: FilterOption[];
  basePath: string;
}

const experienceTiers: FilterOption[] = [
  { value: "destination", label: "Destination" },
  { value: "high_roller_haven", label: "High Roller Haven" },
  { value: "historic_icon", label: "Historic Icon" },
  { value: "poker_paradise", label: "Poker Paradise" },
  { value: "slots_palace", label: "Slots Palace" },
  { value: "local_gem", label: "Local Gem" },
];

const ratingOptions: FilterOption[] = [
  { value: "0", label: "Any Rating" },
  { value: "7", label: "7.0+" },
  { value: "8", label: "8.0+" },
  { value: "9", label: "9.0+" },
];

const amenityOptions: FilterOption[] = [
  { value: "hotel", label: "Has Hotel" },
  { value: "restaurant", label: "Has Restaurant" },
  { value: "parking", label: "Has Parking" },
  { value: "poker", label: "Poker Room" },
  { value: "sportsbook", label: "Sportsbook" },
];

export default function CasinoFilters({ countries, basePath }: CasinoFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const currentCountry = searchParams.get("country") || "";
  const currentRating = searchParams.get("rating") || "0";
  const currentTier = searchParams.get("tier") || "";
  const currentAmenities = searchParams.get("amenities")?.split(",").filter(Boolean) || [];

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "0" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${basePath}?${params.toString()}`);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];

    const params = new URLSearchParams(searchParams.toString());
    if (newAmenities.length === 0) {
      params.delete("amenities");
    } else {
      params.set("amenities", newAmenities.join(","));
    }
    router.push(`${basePath}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(basePath);
  };

  const hasActiveFilters = currentCountry || currentRating !== "0" || currentTier || currentAmenities.length > 0;
  const activeFilterCount = [
    currentCountry,
    currentRating !== "0" ? currentRating : null,
    currentTier,
    ...currentAmenities,
  ].filter(Boolean).length;

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full flex items-center justify-between bg-slate-800/50 rounded-lg border border-slate-700 px-4 py-3 text-white mb-4"
      >
        <span className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
      </button>

      <div className={`${showFilters ? "block" : "hidden"} md:block bg-slate-800/50 rounded-xl border border-slate-700 p-4`}>
        <div className="flex flex-wrap items-end gap-4">
          {/* Country Filter */}
          {countries.length > 0 && (
            <div className="flex-1 min-w-[150px]">
              <label className="block text-slate-400 text-xs font-medium mb-2">
                <MapPin className="w-3 h-3 inline mr-1" />
                Country
              </label>
              <select
                value={currentCountry}
                onChange={(e) => updateFilter("country", e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Experience Tier Filter */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-slate-400 text-xs font-medium mb-2">
              <Crown className="w-3 h-3 inline mr-1" />
              Experience
            </label>
            <select
              value={currentTier}
              onChange={(e) => updateFilter("tier", e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Types</option>
              {experienceTiers.map((tier) => (
                <option key={tier.value} value={tier.value}>
                  {tier.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="min-w-[120px]">
            <label className="block text-slate-400 text-xs font-medium mb-2">
              <Star className="w-3 h-3 inline mr-1" />
              Min Rating
            </label>
            <div className="flex gap-1">
              {ratingOptions.map((rating) => (
                <button
                  key={rating.value}
                  onClick={() => updateFilter("rating", rating.value)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentRating === rating.value
                      ? "bg-amber-500 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {rating.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Amenities Filter */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <label className="block text-slate-400 text-xs font-medium mb-2">
            <Hotel className="w-3 h-3 inline mr-1" />
            Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map((amenity) => (
              <button
                key={amenity.value}
                onClick={() => toggleAmenity(amenity.value)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  currentAmenities.includes(amenity.value)
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {amenity.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
