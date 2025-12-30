// Tour Eligibility Logic
// Determines if a casino has enough data to support a story tour

import { LandBasedCasino, OnlineCasino, ExperienceTier } from "@/types/casino";
import {
  TourEligibility,
  NarrativeTemplate,
  CulturalRegion,
} from "@/types/tour";

// Tier groups that qualify for full story tour
const STORY_ELIGIBLE_TIERS: ExperienceTier[] = [
  "destination",
  "historic_icon",
  "high_roller_haven",
  "poker_paradise",
];

// Country code to cultural region mapping
const COUNTRY_TO_REGION: Record<string, CulturalRegion> = {
  // North America
  US: "north_america",
  CA: "north_america",
  MX: "latin_america",

  // UK
  GB: "uk",
  UK: "uk",

  // Western Europe
  FR: "europe_west",
  DE: "europe_west",
  IT: "europe_west",
  ES: "europe_west",
  PT: "europe_west",
  NL: "europe_west",
  BE: "europe_west",
  AT: "europe_west",
  CH: "europe_west",
  MC: "europe_west", // Monaco

  // Eastern Europe
  PL: "europe_east",
  CZ: "europe_east",
  HU: "europe_east",
  RO: "europe_east",

  // East Asia
  CN: "east_asia",
  HK: "east_asia",
  MO: "east_asia", // Macau
  JP: "east_asia",
  KR: "east_asia",
  TW: "east_asia",

  // Southeast Asia
  SG: "southeast_asia",
  MY: "southeast_asia",
  TH: "southeast_asia",
  PH: "southeast_asia",
  VN: "southeast_asia",
  ID: "southeast_asia",

  // Oceania
  AU: "oceania",
  NZ: "oceania",

  // Latin America
  BR: "latin_america",
  AR: "latin_america",
  CL: "latin_america",
  CO: "latin_america",
  PE: "latin_america",

  // Middle East
  AE: "middle_east",
  LB: "middle_east",
  TR: "middle_east",
};

// Region to narrative template mapping
const REGION_TO_TEMPLATE: Record<CulturalRegion, NarrativeTemplate> = {
  north_america: "journey",
  latin_america: "journey",
  europe_west: "ritual", // Monaco, Baden-Baden style
  europe_east: "guide",
  uk: "guide", // Practical, understated
  east_asia: "atmosphere", // Macau VIP style
  southeast_asia: "atmosphere",
  oceania: "guide", // Australian style
  middle_east: "atmosphere",
};

// Special cases for narrative templates based on tier
function getTemplateOverride(
  tiers: ExperienceTier[],
  region: CulturalRegion
): NarrativeTemplate | null {
  // Historic icons always get ritual template
  if (tiers.includes("historic_icon")) {
    return "ritual";
  }

  // Local gems and budget friendly get functional template regardless of region
  if (tiers.includes("local_gem") || tiers.includes("budget_friendly")) {
    return "functional";
  }

  return null;
}

/**
 * Check if a land-based casino has enough data for a story tour
 */
export function checkLandBasedTourEligibility(
  casino: LandBasedCasino
): TourEligibility {
  // Must be active
  if (!casino.isActive) {
    return {
      isEligible: false,
      reason: "inactive",
    };
  }

  // Check for destination/premium tier (MVP focuses on these)
  const hasEligibleTier = casino.experienceTiers?.some((tier) =>
    STORY_ELIGIBLE_TIERS.includes(tier)
  );

  if (!hasEligibleTier) {
    return {
      isEligible: false,
      reason: "not_destination_tier",
    };
  }

  // Check for minimum data requirements
  const hasEnoughData = checkMinimumDataRequirements(casino);

  if (!hasEnoughData) {
    return {
      isEligible: false,
      reason: "insufficient_data",
    };
  }

  // Determine cultural region and narrative template
  const culturalRegion = getCulturalRegion(casino.countryCode || casino.country);
  const templateOverride = getTemplateOverride(
    casino.experienceTiers || [],
    culturalRegion
  );
  const narrativeTemplate =
    templateOverride || REGION_TO_TEMPLATE[culturalRegion];

  return {
    isEligible: true,
    narrativeTemplate,
    culturalRegion,
  };
}

/**
 * Check if an online casino has enough data for a story tour
 */
export function checkOnlineTourEligibility(
  casino: OnlineCasino
): TourEligibility {
  // Must be active
  if (!casino.isActive) {
    return {
      isEligible: false,
      reason: "inactive",
    };
  }

  // Online casinos always use "journey" template
  // Check minimum data requirements
  const hasDescription = Boolean(casino.description || casino.shortDescription);
  const hasGames = casino.games && casino.games.length >= 3;
  const hasRating = casino.ratingOverall > 0 || casino.reviewCount > 0;
  const hasBonus = Boolean(casino.welcomeBonusDescription);

  const hasEnoughData = hasDescription && hasGames && (hasRating || hasBonus);

  if (!hasEnoughData) {
    return {
      isEligible: false,
      reason: "insufficient_data",
    };
  }

  return {
    isEligible: true,
    narrativeTemplate: "journey",
    culturalRegion: "north_america", // Online casinos are global
  };
}

/**
 * Check minimum data requirements for a land-based casino
 * Threshold: description + 3+ games + (rating OR reviews) + 2+ amenities
 */
function checkMinimumDataRequirements(casino: LandBasedCasino): boolean {
  const hasDescription = Boolean(casino.description || casino.shortDescription);
  const hasGames = casino.games && casino.games.length >= 3;
  const hasRatingOrReviews =
    casino.ratingOverall > 0 || casino.reviewCount > 0;
  const hasAmenities = casino.amenities && casino.amenities.length >= 2;
  const hasExperienceTiers =
    casino.experienceTiers && casino.experienceTiers.length >= 1;

  // Must have description + games + (rating OR reviews) + (amenities OR tiers)
  return (
    hasDescription &&
    hasGames &&
    hasRatingOrReviews &&
    (hasAmenities || hasExperienceTiers)
  );
}

/**
 * Get cultural region from country code or name
 */
function getCulturalRegion(countryCodeOrName: string): CulturalRegion {
  // Try direct lookup by country code (uppercase)
  const code = countryCodeOrName.toUpperCase();
  if (COUNTRY_TO_REGION[code]) {
    return COUNTRY_TO_REGION[code];
  }

  // Try common country name mappings
  const nameToCode: Record<string, string> = {
    "united states": "US",
    usa: "US",
    "united kingdom": "GB",
    uk: "UK",
    england: "GB",
    australia: "AU",
    macau: "MO",
    "hong kong": "HK",
    singapore: "SG",
    monaco: "MC",
    germany: "DE",
    france: "FR",
    italy: "IT",
    spain: "ES",
    japan: "JP",
    china: "CN",
    brazil: "BR",
    argentina: "AR",
    canada: "CA",
    mexico: "MX",
  };

  const normalizedName = countryCodeOrName.toLowerCase();
  const mappedCode = nameToCode[normalizedName];

  if (mappedCode && COUNTRY_TO_REGION[mappedCode]) {
    return COUNTRY_TO_REGION[mappedCode];
  }

  // Default to north_america if unknown
  return "north_america";
}

/**
 * Get narrative template description for display
 */
export function getTemplateDescription(template: NarrativeTemplate): string {
  const descriptions: Record<NarrativeTemplate, string> = {
    journey:
      "A full story experience walking you through the casino from arrival to verdict.",
    ritual:
      "An elegant presentation focused on tradition, atmosphere, and the entrance experience.",
    guide:
      "A practical, straightforward guide with essential information and honest assessments.",
    atmosphere:
      "An experience focused on hospitality, relationships, and the overall ambiance.",
    functional:
      "Quick facts and essential details for casinos focused on local play.",
  };

  return descriptions[template];
}

/**
 * Get "Best For" tags based on casino data
 */
export function generateBestForTags(
  casino: LandBasedCasino | OnlineCasino
): string[] {
  const tags: string[] = [];

  // Experience tier based
  if (casino.experienceTiers?.includes("destination")) {
    tags.push("destination travelers");
  }
  if (casino.experienceTiers?.includes("poker_paradise")) {
    tags.push("poker players");
  }
  if (casino.experienceTiers?.includes("slots_palace")) {
    tags.push("slots enthusiasts");
  }
  if (casino.experienceTiers?.includes("high_roller_haven")) {
    tags.push("serious players");
  }
  if (casino.experienceTiers?.includes("budget_friendly")) {
    tags.push("value seekers");
  }

  // Feature based (land-based)
  if ("hasPokerRoom" in casino && casino.hasPokerRoom) {
    if (!tags.includes("poker players")) {
      tags.push("poker players");
    }
  }
  if ("hasSportsbook" in casino && casino.hasSportsbook) {
    tags.push("sports bettors");
  }
  if ("hasHotel" in casino && casino.hasHotel) {
    tags.push("overnight guests");
  }
  if ("is24Hours" in casino && casino.is24Hours) {
    tags.push("night owls");
  }

  // Online specific
  if ("hasLiveCasino" in casino && casino.hasLiveCasino) {
    tags.push("live dealer fans");
  }
  if ("welcomeBonusDescription" in casino && casino.welcomeBonusDescription) {
    tags.push("bonus hunters");
  }

  return tags.slice(0, 5); // Max 5 tags
}

/**
 * Get "Not For" tags based on casino data (honest anti-recommendations)
 */
export function generateNotForTags(
  casino: LandBasedCasino | OnlineCasino
): string[] {
  const tags: string[] = [];

  // Land-based specific
  if ("minTableBet" in casino && casino.minTableBet && casino.minTableBet >= 50) {
    tags.push("low-stakes players");
  }
  if ("dressCode" in casino && casino.dressCode?.toLowerCase().includes("formal")) {
    tags.push("casual visitors");
  }
  if ("is24Hours" in casino && !casino.is24Hours) {
    tags.push("late-night players");
  }

  // Missing features
  if ("hasPokerRoom" in casino && !casino.hasPokerRoom) {
    tags.push("poker-only players");
  }
  if ("hasSportsbook" in casino && !casino.hasSportsbook) {
    tags.push("sports bettors seeking action");
  }

  // Online specific
  if ("restrictedCountries" in casino && casino.restrictedCountries?.length > 10) {
    tags.push("players in restricted regions");
  }

  return tags.slice(0, 3); // Max 3 tags
}
