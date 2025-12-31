"use client";

import { cn } from "@/lib/utils";
import { ExperienceTier } from "@/types/casino";
import {
  Crown,
  Gem,
  Spade,
  Landmark,
  Star,
  Coins,
  Sparkles,
  Building2,
  Globe,
  ShieldCheck,
  ShieldAlert,
  Shield,
} from "lucide-react";

interface CasinoPinProps {
  isFeatured: boolean;
  isOnline?: boolean;
  experienceTiers?: ExperienceTier[];
  trustLevel?: "high" | "medium" | "low";
  size?: "sm" | "md" | "lg";
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
}

// Map experience tiers to icons
const tierIcons: Record<ExperienceTier, typeof Crown> = {
  destination: Crown,
  high_roller_haven: Gem,
  poker_paradise: Spade,
  slots_palace: Sparkles,
  historic_icon: Landmark,
  local_gem: Star,
  rising_star: Star,
  budget_friendly: Coins,
};

export default function CasinoPin({
  isFeatured,
  isOnline = false,
  experienceTiers = [],
  trustLevel = "medium",
  size = "md",
  isSelected = false,
  isHovered = false,
  onClick,
}: CasinoPinProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  // Get primary tier for icon
  const primaryTier = experienceTiers[0];
  const TierIcon = primaryTier ? tierIcons[primaryTier] : Building2;

  // Online casino colors based on trust level
  const onlineColors = {
    high: "bg-emerald-500 shadow-emerald-500/50",
    medium: "bg-amber-500 shadow-amber-500/50",
    low: "bg-red-500 shadow-red-500/50",
  };

  // Trust level icons for online casinos
  const trustIcons = {
    high: ShieldCheck,
    medium: Shield,
    low: ShieldAlert,
  };

  const TrustIcon = trustIcons[trustLevel];

  // Land-based casino colors
  const landBasedColor = isFeatured
    ? "bg-amber-500 shadow-amber-500/50"
    : "bg-emerald-500 shadow-emerald-500/50";

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer",
        sizeClasses[size],
        isOnline ? onlineColors[trustLevel] : landBasedColor,
        "shadow-lg",
        isSelected && "ring-2 ring-white scale-125 z-20",
        isHovered && !isSelected && "scale-110 z-10",
        isOnline && "ring-2 ring-white/30"
      )}
    >
      {/* Icon - Globe for online, Tier icon for land-based */}
      {isOnline ? (
        <Globe className={cn(iconSizes[size], "text-white")} />
      ) : (
        <TierIcon className={cn(iconSizes[size], "text-white")} />
      )}

      {/* Pin tail for land-based casinos */}
      {!isOnline && (
        <div
          className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0",
            "border-l-[5px] border-r-[5px] border-t-[6px] border-transparent",
            isFeatured ? "border-t-amber-500" : "border-t-emerald-500"
          )}
        />
      )}

      {/* Featured indicator dot for land-based */}
      {isFeatured && !isOnline && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
      )}

      {/* Trust level badge for online casinos */}
      {isOnline && (
        <span
          className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center",
            trustLevel === "high" && "bg-emerald-600",
            trustLevel === "medium" && "bg-amber-600",
            trustLevel === "low" && "bg-red-600"
          )}
        >
          <TrustIcon className="w-2.5 h-2.5 text-white" />
        </span>
      )}
    </button>
  );
}
