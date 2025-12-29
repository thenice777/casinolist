"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Star, Shield, Gamepad2, X, Filter, ChevronDown, CreditCard, Video } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface OnlineCasinoFiltersProps {
  licenses: FilterOption[];
  basePath: string;
}

const ratingOptions: FilterOption[] = [
  { value: "0", label: "Any Rating" },
  { value: "7", label: "7.0+" },
  { value: "8", label: "8.0+" },
  { value: "9", label: "9.0+" },
];

const featureOptions: FilterOption[] = [
  { value: "live_casino", label: "Live Casino" },
  { value: "sportsbook", label: "Sportsbook" },
];

const paymentOptions: FilterOption[] = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "paypal", label: "PayPal" },
  { value: "bitcoin", label: "Bitcoin" },
  { value: "skrill", label: "Skrill" },
  { value: "neteller", label: "Neteller" },
];

export default function OnlineCasinoFilters({ licenses, basePath }: OnlineCasinoFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const currentLicense = searchParams.get("license") || "";
  const currentRating = searchParams.get("rating") || "0";
  const currentFeatures = searchParams.get("features")?.split(",").filter(Boolean) || [];
  const currentPayments = searchParams.get("payments")?.split(",").filter(Boolean) || [];

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "0" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${basePath}?${params.toString()}`);
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f) => f !== feature)
      : [...currentFeatures, feature];

    const params = new URLSearchParams(searchParams.toString());
    if (newFeatures.length === 0) {
      params.delete("features");
    } else {
      params.set("features", newFeatures.join(","));
    }
    router.push(`${basePath}?${params.toString()}`);
  };

  const togglePayment = (payment: string) => {
    const newPayments = currentPayments.includes(payment)
      ? currentPayments.filter((p) => p !== payment)
      : [...currentPayments, payment];

    const params = new URLSearchParams(searchParams.toString());
    if (newPayments.length === 0) {
      params.delete("payments");
    } else {
      params.set("payments", newPayments.join(","));
    }
    router.push(`${basePath}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(basePath);
  };

  const hasActiveFilters = currentLicense || currentRating !== "0" || currentFeatures.length > 0 || currentPayments.length > 0;
  const activeFilterCount = [
    currentLicense,
    currentRating !== "0" ? currentRating : null,
    ...currentFeatures,
    ...currentPayments,
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
          {/* License Filter */}
          {licenses.length > 0 && (
            <div className="flex-1 min-w-[150px]">
              <label className="block text-slate-400 text-xs font-medium mb-2">
                <Shield className="w-3 h-3 inline mr-1" />
                License
              </label>
              <select
                value={currentLicense}
                onChange={(e) => updateFilter("license", e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Licenses</option>
                {licenses.map((license) => (
                  <option key={license.value} value={license.value}>
                    {license.label}
                  </option>
                ))}
              </select>
            </div>
          )}

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

        {/* Features Filter */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <label className="block text-slate-400 text-xs font-medium mb-2">
            <Gamepad2 className="w-3 h-3 inline mr-1" />
            Features
          </label>
          <div className="flex flex-wrap gap-2">
            {featureOptions.map((feature) => (
              <button
                key={feature.value}
                onClick={() => toggleFeature(feature.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  currentFeatures.includes(feature.value)
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {feature.value === "live_casino" ? <Video className="w-3.5 h-3.5" /> : <Gamepad2 className="w-3.5 h-3.5" />}
                {feature.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods Filter */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <label className="block text-slate-400 text-xs font-medium mb-2">
            <CreditCard className="w-3 h-3 inline mr-1" />
            Payment Methods
          </label>
          <div className="flex flex-wrap gap-2">
            {paymentOptions.map((payment) => (
              <button
                key={payment.value}
                onClick={() => togglePayment(payment.value)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  currentPayments.includes(payment.value)
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {payment.label}
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
