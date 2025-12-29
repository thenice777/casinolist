// Geo-detection utilities for compliance
// Uses Vercel's geo headers for country/region detection

export interface GeoInfo {
  country: string | null;
  region: string | null;
  city: string | null;
  isRestricted: boolean;
  restrictionReason: string | null;
  minAge: number;
  helplineUrl: string | null;
  helplinePhone: string | null;
}

// US states where online gambling is restricted or prohibited
// Note: This is a simplified list - actual regulations vary by gambling type
export const RESTRICTED_US_STATES = [
  "UT", // Utah - No gambling
  "HI", // Hawaii - No gambling
  // Many other states restrict specific types of gambling
];

// Countries with strict online gambling restrictions
export const RESTRICTED_COUNTRIES = [
  "CN", // China
  "KP", // North Korea
  "IR", // Iran
  "SY", // Syria
  "CU", // Cuba
  "AF", // Afghanistan
  "IQ", // Iraq
  "SD", // Sudan
  "YE", // Yemen
];

// Countries that require prominent warnings but allow gambling
export const WARNING_COUNTRIES = [
  "AU", // Australia - strict advertising rules
  "BE", // Belgium - licensed operators only
  "FR", // France - licensed operators only
  "IT", // Italy - licensed operators only
  "ES", // Spain - licensed operators only
  "DE", // Germany - state-by-state licensing
  "NL", // Netherlands - licensed operators only
  "SE", // Sweden - licensed operators only
  "DK", // Denmark - licensed operators only
  "PT", // Portugal - licensed operators only
];

// Regional responsible gambling resources
export const REGIONAL_HELPLINES: Record<string, { url: string; phone?: string; name: string }> = {
  US: {
    name: "National Council on Problem Gambling",
    url: "https://www.ncpgambling.org",
    phone: "1-800-522-4700",
  },
  GB: {
    name: "GamCare",
    url: "https://www.gamcare.org.uk",
    phone: "0808 8020 133",
  },
  CA: {
    name: "Responsible Gambling Council",
    url: "https://www.responsiblegambling.org",
    phone: "1-866-531-2600",
  },
  AU: {
    name: "Gambling Help Online",
    url: "https://www.gamblinghelponline.org.au",
    phone: "1800 858 858",
  },
  DE: {
    name: "Bundeszentrale für gesundheitliche Aufklärung",
    url: "https://www.bzga.de",
    phone: "0800 1 37 27 00",
  },
  FR: {
    name: "Joueurs Info Service",
    url: "https://www.joueurs-info-service.fr",
    phone: "09 74 75 13 13",
  },
  IT: {
    name: "AAMS",
    url: "https://www.adm.gov.it",
  },
  ES: {
    name: "DGOJ",
    url: "https://www.ordenacionjuego.es",
    phone: "900 200 225",
  },
  NL: {
    name: "AGOG",
    url: "https://www.agog.nl",
    phone: "0900 217 27 21",
  },
  SE: {
    name: "Stödlinjen",
    url: "https://www.stodlinjen.se",
    phone: "020-819 100",
  },
  NZ: {
    name: "Gambling Helpline NZ",
    url: "https://www.gamblinghelpline.co.nz",
    phone: "0800 654 655",
  },
  IE: {
    name: "Gamblers Anonymous Ireland",
    url: "https://www.gamblersanonymous.ie",
    phone: "01 872 1133",
  },
  // Default/international
  DEFAULT: {
    name: "Gambling Therapy",
    url: "https://www.gamblingtherapy.org",
  },
};

// Minimum gambling age by country
export const MIN_GAMBLING_AGE: Record<string, number> = {
  US: 21, // Varies by state, 21 is safest
  GB: 18,
  CA: 19, // Varies by province
  AU: 18,
  DE: 18,
  FR: 18,
  IT: 18,
  ES: 18,
  NL: 18,
  SE: 18,
  PT: 18,
  GR: 21,
  DEFAULT: 18,
};

export function getGeoInfo(
  country: string | null,
  region: string | null = null,
  city: string | null = null
): GeoInfo {
  const countryCode = country?.toUpperCase() || null;
  const regionCode = region?.toUpperCase() || null;

  // Check if country is completely restricted
  if (countryCode && RESTRICTED_COUNTRIES.includes(countryCode)) {
    return {
      country: countryCode,
      region: regionCode,
      city,
      isRestricted: true,
      restrictionReason: "Online gambling is not available in your region due to local regulations.",
      minAge: MIN_GAMBLING_AGE[countryCode] || MIN_GAMBLING_AGE.DEFAULT,
      helplineUrl: REGIONAL_HELPLINES.DEFAULT.url,
      helplinePhone: null,
    };
  }

  // Check US state restrictions
  if (countryCode === "US" && regionCode && RESTRICTED_US_STATES.includes(regionCode)) {
    return {
      country: countryCode,
      region: regionCode,
      city,
      isRestricted: true,
      restrictionReason: `Online gambling is not available in ${regionCode} due to state regulations.`,
      minAge: 21,
      helplineUrl: REGIONAL_HELPLINES.US.url,
      helplinePhone: REGIONAL_HELPLINES.US.phone || null,
    };
  }

  // Get regional helpline info
  const helpline = countryCode
    ? REGIONAL_HELPLINES[countryCode] || REGIONAL_HELPLINES.DEFAULT
    : REGIONAL_HELPLINES.DEFAULT;

  return {
    country: countryCode,
    region: regionCode,
    city,
    isRestricted: false,
    restrictionReason: null,
    minAge: countryCode ? MIN_GAMBLING_AGE[countryCode] || MIN_GAMBLING_AGE.DEFAULT : MIN_GAMBLING_AGE.DEFAULT,
    helplineUrl: helpline.url,
    helplinePhone: helpline.phone || null,
  };
}

export function isWarningCountry(country: string | null): boolean {
  if (!country) return false;
  return WARNING_COUNTRIES.includes(country.toUpperCase());
}

export function getHelplineForCountry(country: string | null): { name: string; url: string; phone?: string } {
  if (!country) return REGIONAL_HELPLINES.DEFAULT;
  const countryCode = country.toUpperCase();
  return REGIONAL_HELPLINES[countryCode] || REGIONAL_HELPLINES.DEFAULT;
}
