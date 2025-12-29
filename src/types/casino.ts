// Casino Types based on CasinoList Rating System

export interface RatingDimensions {
  games: number; // 1-10
  service: number; // 1-10
  atmosphere: number; // 1-10 (or "ux" for online)
  value: number; // 1-10
  trust: number; // 1-10
}

export type ExperienceTier =
  | "destination"
  | "local_gem"
  | "high_roller_haven"
  | "poker_paradise"
  | "slots_palace"
  | "historic_icon"
  | "rising_star"
  | "budget_friendly";

export type LandBasedBadge =
  | "fast_comps"
  | "player_verified"
  | "high_limit"
  | "24_7_operation"
  | "hotel_integrated"
  | "fine_dining";

export type OnlineBadge =
  | "fast_payouts"
  | "vip_excellence"
  | "live_dealer_pro"
  | "crypto_accepted"
  | "mobile_optimized"
  | "fair_games";

export interface LandBasedCasino {
  id: string;
  name: string;
  slug: string;

  // Location
  address?: string;
  city: string;
  state?: string;
  country: string;
  countryCode?: string;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };

  // Basic Info
  description?: string;
  shortDescription?: string;
  website?: string;
  phone?: string;
  email?: string;

  // Operations
  openingHours?: Record<string, string>;
  is24Hours: boolean;
  dressCode?: string;
  entryFee?: number;
  minimumAge: number;

  // Gaming
  games: string[];
  tableCount?: number;
  slotCount?: number;
  pokerRoomTables?: number;
  minTableBet?: number;
  maxTableBet?: number;
  hasHighLimitRoom: boolean;
  hasPokerRoom: boolean;
  hasSportsbook: boolean;

  // Amenities
  amenities: string[];
  hasHotel: boolean;
  hasRestaurant: boolean;
  hasParking: boolean;

  // Ratings
  ratingOverall: number;
  ratingGames?: number;
  ratingService?: number;
  ratingAtmosphere?: number;
  ratingValue?: number;
  ratingTrust?: number;
  reviewCount: number;

  // Classification
  experienceTiers: ExperienceTier[];
  verifiedBadges: string[];

  // Media
  logoUrl?: string;
  heroImageUrl?: string;
  images: string[];

  // Status
  isActive: boolean;
  isFeatured: boolean;
  isVerified: boolean;

  // Metadata
  dataSources: string[];
  lastVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnlineCasino {
  id: string;
  name: string;
  slug: string;

  // Basic Info
  description?: string;
  shortDescription?: string;
  website: string;
  affiliateLink?: string;

  // Licensing
  licenses: string[];
  licenseCountries: string[];
  restrictedCountries: string[];

  // Bonuses
  welcomeBonusDescription?: string;
  welcomeBonusAmount?: string;
  welcomeBonusWagering?: number;
  freeSpinsOffer?: number;
  noDepositBonus?: string;

  // Gaming
  gameProviders: string[];
  games: string[];
  hasLiveCasino: boolean;
  hasSportsbook: boolean;
  slotCount?: number;
  tableGameCount?: number;

  // Payments
  paymentMethods: string[];
  minDeposit?: number;
  minWithdrawal?: number;
  withdrawalTime?: string;
  currencies: string[];

  // Ratings
  ratingOverall: number;
  ratingGames?: number;
  ratingService?: number;
  ratingAtmosphere?: number;
  ratingValue?: number;
  ratingTrust?: number;
  reviewCount: number;

  // Payout Data
  avgPayoutPercentage?: number;
  verifiedPayoutSpeed?: string;

  // Classification
  experienceTiers: ExperienceTier[];
  verifiedBadges: string[];

  // Media
  logoUrl?: string;
  heroImageUrl?: string;
  screenshots: string[];

  // Status
  isActive: boolean;
  isFeatured: boolean;
  isVerified: boolean;

  // Metadata
  foundedYear?: number;
  ownerCompany?: string;
  lastVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  type: "city" | "region" | "country";

  // Location
  city?: string;
  state?: string;
  country: string;
  countryCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };

  // Content
  description?: string;
  shortDescription?: string;
  casinoOverview?: string;
  practicalInfo?: string;

  // Stats
  casinoCount: number;

  // Media
  heroImageUrl?: string;
  images: string[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Status
  isActive: boolean;
  isFeatured: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  casinoType: "land_based" | "online";
  landBasedCasinoId?: string;
  onlineCasinoId?: string;

  // Reviewer
  userId?: string;
  displayName?: string;
  isAnonymous: boolean;
  isVerifiedVisit: boolean;

  // Rating
  ratingOverall: number;
  ratingGames?: number;
  ratingService?: number;
  ratingAtmosphere?: number;
  ratingValue?: number;

  // Content
  title?: string;
  content: string;
  pros: string[];
  cons: string[];

  // Context
  visitDate?: Date;
  visitPurpose?: "tourism" | "business" | "local" | "special_event";
  playerLevel?: "casual" | "regular" | "high_roller";
  gamesPlayed: string[];

  // Status
  status: "pending" | "approved" | "rejected";
  helpfulCount: number;

  createdAt: Date;
  updatedAt: Date;
}

// Map-specific types
export interface CasinoMapMarker {
  id: string;
  name: string;
  slug: string;
  type: "land_based" | "online";
  latitude: number;
  longitude: number;
  ratingOverall: number;
  isFeatured: boolean;
  experienceTiers: ExperienceTier[];
  city: string;
  country: string;
}
