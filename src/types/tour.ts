// Story Tour Types for Immersive Casino Experience

import { LandBasedCasino, OnlineCasino } from "./casino";

// Narrative template styles based on cultural region
export type NarrativeTemplate =
  | "journey" // North America, Latin America - full 4-act story
  | "ritual" // Monaco, Baden-Baden - tradition emphasis
  | "guide" // UK, Australia - practical, understated
  | "atmosphere" // Macau VIP, Singapore IR - relationship-focus
  | "functional"; // Local casinos, RSL clubs - quick facts

// Cultural region for presentation context
export type CulturalRegion =
  | "north_america"
  | "europe_west"
  | "europe_east"
  | "east_asia"
  | "southeast_asia"
  | "oceania"
  | "latin_america"
  | "middle_east"
  | "uk";

// Tour configuration attached to casinos
export interface TourConfig {
  narrativeTemplate: NarrativeTemplate;
  culturalRegion: CulturalRegion;
  signatureMoment?: string; // Curated hook for premium casinos
  bestForTags?: string[]; // "poker players", "couples", etc.
  notForTags?: string[]; // Honest anti-recommendations
}

// The 4-act structure
export type TourAct =
  | "first-impressions" // Act 1: Signature moment, atmosphere
  | "heart-of-house" // Act 2: Gaming focus, uniqueness
  | "full-picture" // Act 3: Beyond gaming, honest assessment
  | "your-move"; // Act 4: Verdict, Best For, CTA

export interface ActConfig {
  id: TourAct;
  name: string;
  emotionalBeat: string;
  zones: TourZone[];
}

// Zones within each act (horizontal scroll)
export interface TourZone {
  id: string;
  name: string;
  type:
    | "atmosphere"
    | "gaming"
    | "amenities"
    | "vip"
    | "dining"
    | "entertainment"
    | "verdict"
    | "practical";
  dataFields: string[]; // Casino fields used for this zone
}

// Interest filters (behavior-based, not persona-based)
export interface InterestFilters {
  lookingFor?: "games" | "bonus" | "destination" | "quick_visit";
  usuallyPlay?: "slots" | "tables" | "poker" | "sports" | "everything";
  sessionStyle?: "quick" | "evening" | "multi_day";
}

// Session tracking for responsible gambling
export interface TourSession {
  startTime: number;
  actsViewed: TourAct[];
  zonesViewed: string[];
  totalTimeMs: number;
  realityChecksShown: number;
  ctaClicks: TourCTAClick[];
  responsibleGamblingGateAccepted: boolean;
}

export interface TourCTAClick {
  location: string; // tour_act1_soft, tour_act2_gaming, tour_verdict_primary, tour_sticky
  timestamp: number;
  actId: TourAct;
}

// Reality check intervals (in minutes)
export const REALITY_CHECK_INTERVALS = [15, 30, 45] as const;

// Tour state for the context provider
export interface TourState {
  // Casino being toured
  casinoId: string;
  casinoType: "land_based" | "online";
  casino: LandBasedCasino | OnlineCasino | null;

  // Navigation
  currentAct: TourAct;
  currentZoneIndex: number;
  isActLocked: boolean; // When true, vertical scroll disabled

  // Personalization
  filters: InterestFilters;

  // Session
  session: TourSession;

  // UI state
  isGateAccepted: boolean;
  isLoading: boolean;
  showRealityCheck: boolean;
  realityCheckType: "subtle" | "prominent" | "interstitial" | null;
}

// Tour actions for reducer
export type TourAction =
  | { type: "INIT_TOUR"; payload: { casino: LandBasedCasino | OnlineCasino } }
  | { type: "ACCEPT_GATE" }
  | { type: "SET_ACT"; payload: TourAct }
  | { type: "SET_ZONE"; payload: number }
  | { type: "NEXT_ZONE" }
  | { type: "PREV_ZONE" }
  | { type: "NEXT_ACT" }
  | { type: "PREV_ACT" }
  | { type: "UPDATE_FILTERS"; payload: Partial<InterestFilters> }
  | { type: "RECORD_CTA_CLICK"; payload: TourCTAClick }
  | { type: "SHOW_REALITY_CHECK"; payload: TourState["realityCheckType"] }
  | { type: "DISMISS_REALITY_CHECK" }
  | { type: "END_TOUR" };

// Tour eligibility check result
export interface TourEligibility {
  isEligible: boolean;
  reason?: "insufficient_data" | "not_destination_tier" | "inactive";
  narrativeTemplate?: NarrativeTemplate;
  culturalRegion?: CulturalRegion;
}

// Progress indicator props
export interface TourProgress {
  currentAct: TourAct;
  currentZoneIndex: number;
  totalZones: number;
  completedActs: TourAct[];
}

// Narrative block content (for NarrativeBlock component)
export interface NarrativeContent {
  hook: string; // Opening line
  body: string; // Main narrative
  playerDetails?: PlayerDetails; // Expandable data
  bestFor?: string[];
  notFor?: string[];
}

// Player details panel content (expandable data tables)
export interface PlayerDetails {
  tableMinMax?: { min: number; max: number };
  gameRules?: GameRuleInfo[];
  pokerInfo?: PokerRoomInfo;
  compInfo?: string;
  tips?: string[];
}

export interface GameRuleInfo {
  game: string;
  rules: string[];
  houseEdge?: string;
}

export interface PokerRoomInfo {
  tables?: number;
  stakes?: string;
  rake?: string;
  tournaments?: boolean;
}

// Default act configuration
export const DEFAULT_ACTS: ActConfig[] = [
  {
    id: "first-impressions",
    name: "First Impressions",
    emotionalBeat: "Anticipation, curiosity",
    zones: [
      {
        id: "arrival",
        name: "Arrival",
        type: "atmosphere",
        dataFields: ["heroImageUrl", "description", "experienceTiers"],
      },
      {
        id: "trust",
        name: "Trust Signals",
        type: "practical",
        dataFields: ["isVerified", "verifiedBadges", "ratingTrust"],
      },
    ],
  },
  {
    id: "heart-of-house",
    name: "The Heart of the House",
    emotionalBeat: "Engagement, discovery",
    zones: [
      {
        id: "gaming-overview",
        name: "Gaming Overview",
        type: "gaming",
        dataFields: ["games", "tableCount", "slotCount"],
      },
      {
        id: "table-games",
        name: "Table Games",
        type: "gaming",
        dataFields: ["minTableBet", "maxTableBet", "hasHighLimitRoom"],
      },
      {
        id: "poker",
        name: "Poker Room",
        type: "gaming",
        dataFields: ["hasPokerRoom", "pokerRoomTables"],
      },
      {
        id: "sportsbook",
        name: "Sportsbook",
        type: "gaming",
        dataFields: ["hasSportsbook"],
      },
    ],
  },
  {
    id: "full-picture",
    name: "The Full Picture",
    emotionalBeat: "Depth, consideration",
    zones: [
      {
        id: "amenities",
        name: "Beyond Gaming",
        type: "amenities",
        dataFields: ["amenities", "hasHotel", "hasRestaurant"],
      },
      {
        id: "dining",
        name: "Dining",
        type: "dining",
        dataFields: ["hasRestaurant", "amenities"],
      },
      {
        id: "who-its-for",
        name: "Who It's For",
        type: "practical",
        dataFields: ["experienceTiers", "dressCode", "minimumAge"],
      },
    ],
  },
  {
    id: "your-move",
    name: "Your Move",
    emotionalBeat: "Decision, confidence",
    zones: [
      {
        id: "verdict",
        name: "The Verdict",
        type: "verdict",
        dataFields: [
          "ratingOverall",
          "ratingGames",
          "ratingService",
          "ratingAtmosphere",
          "ratingValue",
        ],
      },
      {
        id: "best-for",
        name: "Best For",
        type: "practical",
        dataFields: ["experienceTiers", "verifiedBadges"],
      },
    ],
  },
];

// Device tier for performance adaptation
export type DeviceTier = "high" | "mid" | "low" | "accessible";

export interface DeviceCapabilities {
  tier: DeviceTier;
  prefersReducedMotion: boolean;
  memoryGB?: number;
  cpuCores?: number;
}
