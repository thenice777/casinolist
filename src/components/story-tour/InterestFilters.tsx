"use client";

import { useState } from "react";
import { useTour } from "./StoryTourProvider";
import { InterestFilters as FilterType } from "@/types/tour";
import {
  Dices,
  Gift,
  MapPin,
  Zap,
  CircleDot,
  Spade,
  TrendingUp,
  Grid3X3,
  Clock,
  Moon,
  Calendar,
  X,
  Filter,
  Check,
} from "lucide-react";

interface InterestFiltersProps {
  variant?: "inline" | "modal" | "drawer";
  onClose?: () => void;
}

export default function InterestFilters({
  variant = "inline",
  onClose,
}: InterestFiltersProps) {
  const { state, dispatch } = useTour();
  const [localFilters, setLocalFilters] = useState<FilterType>(state.filters);

  const handleFilterChange = (key: keyof FilterType, value: string | undefined) => {
    const newFilters = {
      ...localFilters,
      [key]: localFilters[key] === value ? undefined : value,
    };
    setLocalFilters(newFilters);
    dispatch({ type: "UPDATE_FILTERS", payload: { [key]: newFilters[key] } });
  };

  const clearFilters = () => {
    setLocalFilters({});
    dispatch({ type: "UPDATE_FILTERS", payload: {} });
  };

  const hasActiveFilters =
    localFilters.lookingFor || localFilters.usuallyPlay || localFilters.sessionStyle;

  if (variant === "modal" || variant === "drawer") {
    return (
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Content */}
        <div
          className={`relative bg-slate-800 w-full ${
            variant === "drawer"
              ? "rounded-t-2xl max-h-[85vh]"
              : "md:max-w-lg md:rounded-2xl md:m-4"
          } overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Personalize Your Tour
                </h2>
                <p className="text-slate-400 text-sm">
                  Tell us what you're looking for
                </p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="p-6 space-y-8 overflow-y-auto max-h-[60vh]">
            <FilterSection
              title="I'm looking for..."
              options={LOOKING_FOR_OPTIONS}
              value={localFilters.lookingFor}
              onChange={(v) => handleFilterChange("lookingFor", v)}
            />

            <FilterSection
              title="I usually play..."
              options={USUALLY_PLAY_OPTIONS}
              value={localFilters.usuallyPlay}
              onChange={(v) => handleFilterChange("usuallyPlay", v)}
            />

            <FilterSection
              title="My session style..."
              options={SESSION_STYLE_OPTIONS}
              value={localFilters.sessionStyle}
              onChange={(v) => handleFilterChange("sessionStyle", v)}
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-700 flex items-center justify-between">
            <button
              onClick={clearFilters}
              className="text-slate-400 hover:text-white text-sm transition-colors"
              disabled={!hasActiveFilters}
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span className="text-white text-sm font-medium">
            Personalize Tour
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-slate-400 hover:text-white text-xs transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        <InlineFilterRow
          label="Looking for"
          options={LOOKING_FOR_OPTIONS}
          value={localFilters.lookingFor}
          onChange={(v) => handleFilterChange("lookingFor", v)}
        />
        <InlineFilterRow
          label="Usually play"
          options={USUALLY_PLAY_OPTIONS}
          value={localFilters.usuallyPlay}
          onChange={(v) => handleFilterChange("usuallyPlay", v)}
        />
        <InlineFilterRow
          label="Session style"
          options={SESSION_STYLE_OPTIONS}
          value={localFilters.sessionStyle}
          onChange={(v) => handleFilterChange("sessionStyle", v)}
        />
      </div>
    </div>
  );
}

// Filter section for modal/drawer
function FilterSection({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: FilterOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="text-white font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              value === option.value
                ? "bg-emerald-500/20 border-emerald-500 text-white"
                : "bg-slate-700/30 border-slate-700 text-slate-300 hover:border-slate-600"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                value === option.value
                  ? "bg-emerald-500/30 text-emerald-400"
                  : "bg-slate-700 text-slate-400"
              }`}
            >
              {option.icon}
            </div>
            <div className="text-left">
              <p className="font-medium">{option.label}</p>
              <p className="text-xs text-slate-400">{option.description}</p>
            </div>
            {value === option.value && (
              <Check className="w-4 h-4 text-emerald-400 ml-auto" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Compact inline filter row
function InlineFilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-slate-400 text-xs mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
              value === option.value
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                : "bg-slate-700/50 text-slate-400 border border-transparent hover:text-white"
            }`}
          >
            <span className="w-4 h-4">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Filter trigger button for mobile
export function FilterTriggerButton({
  onClick,
  hasFilters,
}: {
  onClick: () => void;
  hasFilters: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        hasFilters
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
          : "bg-slate-700/50 text-slate-400 hover:text-white"
      }`}
    >
      <Filter className="w-4 h-4" />
      <span className="text-sm font-medium">
        {hasFilters ? "Filters Active" : "Personalize"}
      </span>
    </button>
  );
}

// Option types
interface FilterOption {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const LOOKING_FOR_OPTIONS: FilterOption[] = [
  {
    value: "games",
    label: "Games",
    description: "Focus on gaming options",
    icon: <Dices className="w-5 h-5" />,
  },
  {
    value: "bonus",
    label: "Bonus/Value",
    description: "Deals and promotions",
    icon: <Gift className="w-5 h-5" />,
  },
  {
    value: "destination",
    label: "Experience",
    description: "Full destination visit",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    value: "quick_visit",
    label: "Quick Visit",
    description: "In and out, no frills",
    icon: <Zap className="w-5 h-5" />,
  },
];

const USUALLY_PLAY_OPTIONS: FilterOption[] = [
  {
    value: "slots",
    label: "Slots",
    description: "Slot machines",
    icon: <CircleDot className="w-5 h-5" />,
  },
  {
    value: "tables",
    label: "Tables",
    description: "Table games",
    icon: <Grid3X3 className="w-5 h-5" />,
  },
  {
    value: "poker",
    label: "Poker",
    description: "Poker room",
    icon: <Spade className="w-5 h-5" />,
  },
  {
    value: "sports",
    label: "Sports",
    description: "Sportsbook",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const SESSION_STYLE_OPTIONS: FilterOption[] = [
  {
    value: "quick",
    label: "Quick",
    description: "Under 2 hours",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    value: "evening",
    label: "Evening",
    description: "Night out",
    icon: <Moon className="w-5 h-5" />,
  },
  {
    value: "multi_day",
    label: "Multi-Day",
    description: "Extended trip",
    icon: <Calendar className="w-5 h-5" />,
  },
];

// Helper to get filter-based content emphasis
export function getContentEmphasis(filters: FilterType): {
  prioritySections: string[];
  highlightGames: string[];
  showBonusDetails: boolean;
  showAmenities: boolean;
} {
  const prioritySections: string[] = [];
  const highlightGames: string[] = [];
  let showBonusDetails = false;
  let showAmenities = false;

  // Looking for
  switch (filters.lookingFor) {
    case "games":
      prioritySections.push("gaming-overview", "table-games", "poker");
      break;
    case "bonus":
      prioritySections.push("verdict");
      showBonusDetails = true;
      break;
    case "destination":
      prioritySections.push("amenities", "dining");
      showAmenities = true;
      break;
    case "quick_visit":
      prioritySections.push("verdict", "gaming-overview");
      break;
  }

  // Usually play
  switch (filters.usuallyPlay) {
    case "slots":
      highlightGames.push("slots", "video poker");
      break;
    case "tables":
      highlightGames.push("blackjack", "roulette", "baccarat", "craps");
      prioritySections.push("table-games");
      break;
    case "poker":
      highlightGames.push("poker");
      prioritySections.push("poker");
      break;
    case "sports":
      prioritySections.push("sportsbook");
      break;
  }

  // Session style
  if (filters.sessionStyle === "multi_day") {
    showAmenities = true;
    prioritySections.push("amenities", "dining");
  }

  return {
    prioritySections: [...new Set(prioritySections)],
    highlightGames,
    showBonusDetails,
    showAmenities,
  };
}
