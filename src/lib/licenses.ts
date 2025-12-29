// License authority information for verification links

export interface LicenseAuthority {
  name: string;
  shortName: string;
  country: string;
  verifyUrl?: string;
  websiteUrl: string;
  description: string;
  trustLevel: "high" | "medium" | "low";
}

// Map of license names to their authority information
export const LICENSE_AUTHORITIES: Record<string, LicenseAuthority> = {
  // Tier 1 - Highly Trusted
  "UK Gambling Commission": {
    name: "UK Gambling Commission",
    shortName: "UKGC",
    country: "United Kingdom",
    verifyUrl: "https://www.gamblingcommission.gov.uk/public-register/business/search",
    websiteUrl: "https://www.gamblingcommission.gov.uk",
    description: "One of the most stringent gambling regulators worldwide",
    trustLevel: "high",
  },
  "Malta Gaming Authority": {
    name: "Malta Gaming Authority",
    shortName: "MGA",
    country: "Malta",
    verifyUrl: "https://www.mga.org.mt/licensee-register/",
    websiteUrl: "https://www.mga.org.mt",
    description: "Leading EU gambling regulator with comprehensive player protections",
    trustLevel: "high",
  },
  "MGA": {
    name: "Malta Gaming Authority",
    shortName: "MGA",
    country: "Malta",
    verifyUrl: "https://www.mga.org.mt/licensee-register/",
    websiteUrl: "https://www.mga.org.mt",
    description: "Leading EU gambling regulator with comprehensive player protections",
    trustLevel: "high",
  },
  "Gibraltar Regulatory Authority": {
    name: "Gibraltar Regulatory Authority",
    shortName: "GRA",
    country: "Gibraltar",
    verifyUrl: "https://www.gra.gi/gambling/remote-gambling/register-of-licensees",
    websiteUrl: "https://www.gra.gi",
    description: "Reputable British overseas territory regulator",
    trustLevel: "high",
  },
  "Isle of Man Gambling Supervision Commission": {
    name: "Isle of Man Gambling Supervision Commission",
    shortName: "GSC",
    country: "Isle of Man",
    verifyUrl: "https://www.gov.im/gambling/",
    websiteUrl: "https://www.gov.im/gambling/",
    description: "British Crown dependency with strict regulatory standards",
    trustLevel: "high",
  },
  "Alderney Gambling Control Commission": {
    name: "Alderney Gambling Control Commission",
    shortName: "AGCC",
    country: "Alderney",
    verifyUrl: "https://www.gamblingcontrol.org/licensees/",
    websiteUrl: "https://www.gamblingcontrol.org",
    description: "Channel Islands regulator with high standards",
    trustLevel: "high",
  },

  // Tier 2 - Trusted EU/Regulated Markets
  "Swedish Gambling Authority": {
    name: "Swedish Gambling Authority",
    shortName: "Spelinspektionen",
    country: "Sweden",
    verifyUrl: "https://www.spelinspektionen.se/en/licence-register/",
    websiteUrl: "https://www.spelinspektionen.se",
    description: "Swedish national gambling regulator",
    trustLevel: "high",
  },
  "Spelinspektionen": {
    name: "Swedish Gambling Authority",
    shortName: "Spelinspektionen",
    country: "Sweden",
    verifyUrl: "https://www.spelinspektionen.se/en/licence-register/",
    websiteUrl: "https://www.spelinspektionen.se",
    description: "Swedish national gambling regulator",
    trustLevel: "high",
  },
  "Danish Gambling Authority": {
    name: "Danish Gambling Authority",
    shortName: "Spillemyndigheden",
    country: "Denmark",
    verifyUrl: "https://spillemyndigheden.dk/en/licensees",
    websiteUrl: "https://spillemyndigheden.dk",
    description: "Danish national gambling regulator",
    trustLevel: "high",
  },
  "Spillemyndigheden": {
    name: "Danish Gambling Authority",
    shortName: "Spillemyndigheden",
    country: "Denmark",
    verifyUrl: "https://spillemyndigheden.dk/en/licensees",
    websiteUrl: "https://spillemyndigheden.dk",
    description: "Danish national gambling regulator",
    trustLevel: "high",
  },
  "Kansspelautoriteit": {
    name: "Netherlands Gambling Authority",
    shortName: "KSA",
    country: "Netherlands",
    verifyUrl: "https://www.kansspelautoriteit.nl/vergunninghouders/",
    websiteUrl: "https://www.kansspelautoriteit.nl",
    description: "Dutch gambling authority",
    trustLevel: "high",
  },
  "AAMS": {
    name: "Agenzia delle Dogane e dei Monopoli",
    shortName: "ADM/AAMS",
    country: "Italy",
    websiteUrl: "https://www.adm.gov.it",
    description: "Italian customs and monopolies agency",
    trustLevel: "high",
  },
  "DGOJ": {
    name: "Dirección General de Ordenación del Juego",
    shortName: "DGOJ",
    country: "Spain",
    verifyUrl: "https://www.ordenacionjuego.es/en/registro-general-licencias",
    websiteUrl: "https://www.ordenacionjuego.es",
    description: "Spanish gambling regulator",
    trustLevel: "high",
  },
  "Gemeinsame Glücksspielbehörde der Länder": {
    name: "Gemeinsame Glücksspielbehörde der Länder",
    shortName: "GGL",
    country: "Germany",
    verifyUrl: "https://ggl.de/gluecksspiel/whitelist/",
    websiteUrl: "https://ggl.de",
    description: "German federal gambling authority",
    trustLevel: "high",
  },

  // Tier 2 - Other Regulated Markets
  "Kahnawake Gaming Commission": {
    name: "Kahnawake Gaming Commission",
    shortName: "KGC",
    country: "Canada (Kahnawake)",
    verifyUrl: "https://www.gamingcommission.ca/Licensees.aspx",
    websiteUrl: "https://www.gamingcommission.ca",
    description: "First Nations gaming commission, Canada",
    trustLevel: "medium",
  },
  "Curaçao eGaming": {
    name: "Curaçao eGaming",
    shortName: "CEG",
    country: "Curaçao",
    websiteUrl: "https://www.curacao-egaming.com",
    description: "Caribbean gaming license",
    trustLevel: "medium",
  },
  "Curacao": {
    name: "Curaçao eGaming",
    shortName: "CEG",
    country: "Curaçao",
    websiteUrl: "https://www.curacao-egaming.com",
    description: "Caribbean gaming license",
    trustLevel: "medium",
  },
  "Curaçao": {
    name: "Curaçao eGaming",
    shortName: "CEG",
    country: "Curaçao",
    websiteUrl: "https://www.curacao-egaming.com",
    description: "Caribbean gaming license",
    trustLevel: "medium",
  },

  // US State Regulators
  "New Jersey DGE": {
    name: "New Jersey Division of Gaming Enforcement",
    shortName: "NJ DGE",
    country: "USA (New Jersey)",
    verifyUrl: "https://www.nj.gov/oag/ge/igaming.html",
    websiteUrl: "https://www.nj.gov/oag/ge/",
    description: "New Jersey state gambling regulator",
    trustLevel: "high",
  },
  "Pennsylvania Gaming Control Board": {
    name: "Pennsylvania Gaming Control Board",
    shortName: "PGCB",
    country: "USA (Pennsylvania)",
    verifyUrl: "https://gamingcontrolboard.pa.gov/",
    websiteUrl: "https://gamingcontrolboard.pa.gov/",
    description: "Pennsylvania state gambling regulator",
    trustLevel: "high",
  },
  "Michigan Gaming Control Board": {
    name: "Michigan Gaming Control Board",
    shortName: "MGCB",
    country: "USA (Michigan)",
    verifyUrl: "https://www.michigan.gov/mgcb/",
    websiteUrl: "https://www.michigan.gov/mgcb/",
    description: "Michigan state gambling regulator",
    trustLevel: "high",
  },
};

export function getLicenseAuthority(licenseName: string): LicenseAuthority | null {
  // Try exact match first
  if (LICENSE_AUTHORITIES[licenseName]) {
    return LICENSE_AUTHORITIES[licenseName];
  }

  // Try case-insensitive partial match
  const normalizedName = licenseName.toLowerCase();
  for (const [key, value] of Object.entries(LICENSE_AUTHORITIES)) {
    if (
      key.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(key.toLowerCase()) ||
      value.shortName.toLowerCase() === normalizedName
    ) {
      return value;
    }
  }

  return null;
}

export function getTrustLevelColor(level: "high" | "medium" | "low"): string {
  switch (level) {
    case "high":
      return "text-emerald-400";
    case "medium":
      return "text-amber-400";
    case "low":
      return "text-red-400";
  }
}

export function getTrustLevelBgColor(level: "high" | "medium" | "low"): string {
  switch (level) {
    case "high":
      return "bg-emerald-500/20";
    case "medium":
      return "bg-amber-500/20";
    case "low":
      return "bg-red-500/20";
  }
}
