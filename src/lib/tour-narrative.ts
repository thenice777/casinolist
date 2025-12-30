// Tour Narrative Generation Utilities
// Creates dynamic, engaging narratives based on casino data

import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import { NarrativeTemplate, TourAct, PlayerDetails } from "@/types/tour";

// ============================================
// SIGNATURE MOMENTS - Unique opening hooks
// ============================================

export function generateSignatureMoment(
  casino: LandBasedCasino | OnlineCasino,
  template: NarrativeTemplate = "journey"
): string {
  const isLandBased = "address" in casino;
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  // Template-based variations
  const templates: Record<NarrativeTemplate, () => string> = {
    journey: () => generateJourneyHook(casino, isLandBased),
    ritual: () => generateRitualHook(casino, isLandBased),
    guide: () => generateGuideHook(casino, isLandBased),
    atmosphere: () => generateAtmosphereHook(casino, isLandBased),
    functional: () => generateFunctionalHook(casino, isLandBased),
  };

  return templates[template]();
}

function generateJourneyHook(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean
): string {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  if (isLandBased) {
    // Historic icons
    if (casino.experienceTiers?.includes("historic_icon")) {
      return `Some casinos are built. ${casino.name} was destined. Step into a legacy that's been writing stories since day one.`;
    }

    // Destination casinos
    if (casino.experienceTiers?.includes("destination")) {
      return `${casino.name} isn't a stop along the way—it's the destination. From the moment you arrive, everything changes.`;
    }

    // High roller havens
    if (casino.experienceTiers?.includes("high_roller_haven")) {
      return `Where serious players come to play seriously. ${casino.name} doesn't just welcome high stakes—it expects them.`;
    }

    // Poker paradise
    if (casino.experienceTiers?.includes("poker_paradise")) {
      return `The felt here has seen fortunes won and lost. ${casino.name}'s poker room is where players prove themselves.`;
    }

    // 24-hour operations
    if (landBased.is24Hours) {
      return `The lights at ${casino.name} never dim. Whether it's 3 PM or 3 AM, the floor is alive and waiting.`;
    }

    // Default
    return `Welcome to ${casino.name}. Every casino has a story—this is ours to tell.`;
  } else {
    // Online - featured
    if (casino.isFeatured) {
      return `Some online casinos exist. ${casino.name} leads. Discover why players make it their home.`;
    }

    // Has live casino
    if (online.hasLiveCasino) {
      return `Real dealers, real action, real time. ${casino.name} brings the floor to your screen.`;
    }

    // Strong game library
    if ((online.slotCount || 0) > 1000) {
      return `With ${online.slotCount?.toLocaleString()}+ games, ${casino.name} doesn't just offer choice—it offers everything.`;
    }

    return `${casino.name} opens its doors. Here's what's waiting on the other side.`;
  }
}

function generateRitualHook(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean
): string {
  const landBased = casino as LandBasedCasino;

  if (isLandBased) {
    if (landBased.dressCode) {
      return `At ${casino.name}, the entrance isn't just a doorway—it's a threshold. ${landBased.dressCode} attire sets the tone for what awaits.`;
    }
    if (casino.experienceTiers?.includes("historic_icon")) {
      return `Tradition isn't just observed at ${casino.name}—it's honored. Every visit is a continuation of legacy.`;
    }
    return `${casino.name} maintains the art of the casino experience. Here, the ritual matters as much as the result.`;
  }

  return `${casino.name} brings continental elegance to your screen. Experience the refinement of European gaming.`;
}

function generateGuideHook(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean
): string {
  const landBased = casino as LandBasedCasino;

  if (isLandBased) {
    const tableInfo = landBased.tableCount
      ? `${landBased.tableCount} tables`
      : "table games";
    const slotInfo = landBased.slotCount
      ? `${landBased.slotCount} machines`
      : "slots";
    return `${casino.name}: ${tableInfo}, ${slotInfo}, ${landBased.is24Hours ? "24/7" : "regular hours"}. Here's what you need to know.`;
  }

  const online = casino as OnlineCasino;
  return `${casino.name} is licensed in ${online.licenses?.join(", ") || "multiple jurisdictions"}. Let's review what they offer.`;
}

function generateAtmosphereHook(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean
): string {
  if (isLandBased) {
    return `At ${casino.name}, hospitality comes first. Before you place a single bet, you'll understand why guests return again and again.`;
  }
  return `${casino.name} treats every player as a valued guest. From the first login, the experience feels personal.`;
}

function generateFunctionalHook(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean
): string {
  const landBased = casino as LandBasedCasino;
  if (isLandBased) {
    return `${casino.name} in ${landBased.city}. No frills, just facts. Here's what's on offer.`;
  }
  return `${casino.name}: Licensed, verified, ready to play. The essentials at a glance.`;
}

// ============================================
// ACT NARRATIVES - Per-act content generation
// ============================================

export interface ActNarrative {
  headline: string;
  body: string;
  callout?: string;
  facts: string[];
}

export function generateActNarrative(
  casino: LandBasedCasino | OnlineCasino,
  act: TourAct,
  template: NarrativeTemplate = "journey"
): ActNarrative {
  const isLandBased = "address" in casino;

  switch (act) {
    case "first-impressions":
      return generateFirstImpressionsNarrative(casino, isLandBased, template);
    case "heart-of-house":
      return generateHeartOfHouseNarrative(casino, isLandBased, template);
    case "full-picture":
      return generateFullPictureNarrative(casino, isLandBased, template);
    case "your-move":
      return generateYourMoveNarrative(casino, isLandBased, template);
    default:
      return {
        headline: casino.name,
        body: casino.description || "",
        facts: [],
      };
  }
}

function generateFirstImpressionsNarrative(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean,
  template: NarrativeTemplate
): ActNarrative {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;
  const facts: string[] = [];

  if (isLandBased) {
    facts.push(`Location: ${landBased.city}, ${landBased.country}`);
    if (landBased.is24Hours) facts.push("Open 24 hours");
    if (casino.isVerified) facts.push("Verified by CasinoList");
    if (casino.isFeatured) facts.push("Featured destination");
  } else {
    if (online.licenses?.length) facts.push(`Licensed by ${online.licenses[0]}`);
    if (online.foundedYear) facts.push(`Established ${online.foundedYear}`);
    if (casino.isVerified) facts.push("Verified operator");
  }

  const rating = Number(casino.ratingOverall) || 0;
  if (rating > 0) {
    facts.push(`Rated ${rating.toFixed(1)}/10`);
  }

  return {
    headline: generateSignatureMoment(casino, template),
    body: casino.description || casino.shortDescription || `Discover ${casino.name}.`,
    callout: isLandBased
      ? landBased.experienceTiers?.[0]?.replace(/_/g, " ").toUpperCase()
      : undefined,
    facts,
  };
}

function generateHeartOfHouseNarrative(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean,
  template: NarrativeTemplate
): ActNarrative {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;
  const facts: string[] = [];

  if (isLandBased) {
    if (landBased.tableCount) facts.push(`${landBased.tableCount} table games`);
    if (landBased.slotCount) facts.push(`${landBased.slotCount.toLocaleString()} slot machines`);
    if (landBased.hasPokerRoom) facts.push("Dedicated poker room");
    if (landBased.hasSportsbook) facts.push("Full sportsbook");
    if (landBased.hasHighLimitRoom) facts.push("High limit room available");
  } else {
    if (online.slotCount) facts.push(`${online.slotCount.toLocaleString()}+ slots`);
    if (online.tableGameCount) facts.push(`${online.tableGameCount}+ table games`);
    if (online.hasLiveCasino) facts.push("Live dealer casino");
    if (online.hasSportsbook) facts.push("Integrated sportsbook");
    if (online.gameProviders?.length) {
      facts.push(`${online.gameProviders.length}+ game providers`);
    }
  }

  let body: string;
  if (isLandBased) {
    body = generateGamingFloorDescription(landBased);
  } else {
    body = generateGameLibraryDescription(online);
  }

  return {
    headline: "The Heart of the House",
    body,
    callout: isLandBased && landBased.hasHighLimitRoom ? "HIGH LIMIT AVAILABLE" : undefined,
    facts,
  };
}

function generateFullPictureNarrative(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean,
  template: NarrativeTemplate
): ActNarrative {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;
  const facts: string[] = [];

  if (isLandBased) {
    if (landBased.hasHotel) facts.push("On-site hotel");
    if (landBased.hasRestaurant) facts.push("Restaurant dining");
    if (landBased.hasParking) facts.push("Parking available");
    if (landBased.amenities?.length) {
      facts.push(`${landBased.amenities.length} amenities`);
    }
  } else {
    if (online.paymentMethods?.length) {
      facts.push(`${online.paymentMethods.length}+ payment methods`);
    }
    if (online.withdrawalTime) facts.push(`Withdrawal: ${online.withdrawalTime}`);
    if (online.currencies?.length) {
      facts.push(`${online.currencies.length} currencies accepted`);
    }
  }

  let body: string;
  if (isLandBased) {
    body = generateAmenitiesDescription(landBased);
  } else {
    body = generateOnlineFeaturesDescription(online);
  }

  return {
    headline: "The Full Picture",
    body,
    facts,
  };
}

function generateYourMoveNarrative(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean,
  template: NarrativeTemplate
): ActNarrative {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;
  const facts: string[] = [];
  const rating = Number(casino.ratingOverall) || 0;

  if (rating > 0) {
    facts.push(`Overall: ${rating.toFixed(1)}/10`);
  }
  if (casino.ratingGames) facts.push(`Games: ${Number(casino.ratingGames).toFixed(1)}`);
  if (casino.ratingService) facts.push(`Service: ${Number(casino.ratingService).toFixed(1)}`);
  if (casino.ratingTrust) facts.push(`Trust: ${Number(casino.ratingTrust).toFixed(1)}`);

  return {
    headline: "Your Move",
    body: generateVerdictDescription(casino, isLandBased),
    callout: !isLandBased && online.welcomeBonusDescription
      ? online.welcomeBonusDescription
      : undefined,
    facts,
  };
}

// ============================================
// HELPER DESCRIPTION GENERATORS
// ============================================

function generateGamingFloorDescription(casino: LandBasedCasino): string {
  const parts: string[] = [];

  if (casino.tableCount && casino.slotCount) {
    parts.push(
      `The gaming floor at ${casino.name} spans ${casino.tableCount} table games and ${casino.slotCount.toLocaleString()} slot machines.`
    );
  } else if (casino.tableCount) {
    parts.push(`${casino.name} offers ${casino.tableCount} table games.`);
  } else if (casino.slotCount) {
    parts.push(`With ${casino.slotCount.toLocaleString()} machines, ${casino.name} has one of the largest slot selections in the area.`);
  } else {
    parts.push(`${casino.name} offers a diverse gaming selection.`);
  }

  if (casino.minTableBet && casino.maxTableBet) {
    parts.push(
      `Table limits range from $${casino.minTableBet} to $${casino.maxTableBet.toLocaleString()}, accommodating players at every level.`
    );
  }

  if (casino.hasHighLimitRoom) {
    parts.push("A dedicated high limit room caters to serious players.");
  }

  if (casino.hasPokerRoom) {
    const tables = casino.pokerRoomTables
      ? `with ${casino.pokerRoomTables} tables`
      : "";
    parts.push(`The poker room ${tables} runs daily action.`);
  }

  return parts.join(" ");
}

function generateGameLibraryDescription(casino: OnlineCasino): string {
  const parts: string[] = [];

  if (casino.slotCount && casino.tableGameCount) {
    parts.push(
      `${casino.name}'s library includes ${casino.slotCount.toLocaleString()}+ slots and ${casino.tableGameCount}+ table games.`
    );
  } else if (casino.slotCount) {
    parts.push(`Explore ${casino.slotCount.toLocaleString()}+ slot titles at ${casino.name}.`);
  } else {
    parts.push(`${casino.name} offers a comprehensive game library.`);
  }

  if (casino.gameProviders?.length) {
    const topProviders = casino.gameProviders.slice(0, 3).join(", ");
    parts.push(`Powered by top providers including ${topProviders}.`);
  }

  if (casino.hasLiveCasino) {
    parts.push("The live casino streams real dealers around the clock.");
  }

  return parts.join(" ");
}

function generateAmenitiesDescription(casino: LandBasedCasino): string {
  const parts: string[] = [];

  parts.push(`${casino.name} offers more than gaming.`);

  if (casino.hasHotel && casino.hasRestaurant) {
    parts.push("With on-site accommodation and dining, it's designed for extended stays.");
  } else if (casino.hasRestaurant) {
    parts.push("On-site dining keeps you fueled for the action.");
  } else if (casino.hasHotel) {
    parts.push("The attached hotel makes overnight trips convenient.");
  }

  if (casino.amenities?.length > 3) {
    parts.push(`Plus ${casino.amenities.length} additional amenities to explore.`);
  }

  return parts.join(" ");
}

function generateOnlineFeaturesDescription(casino: OnlineCasino): string {
  const parts: string[] = [];

  if (casino.paymentMethods?.length) {
    parts.push(`${casino.name} supports ${casino.paymentMethods.length}+ payment methods for deposits and withdrawals.`);
  }

  if (casino.withdrawalTime) {
    parts.push(`Typical withdrawal time: ${casino.withdrawalTime}.`);
  }

  if (casino.minDeposit) {
    parts.push(`Start playing with as little as ${casino.currencies?.[0] || "$"}${casino.minDeposit}.`);
  }

  if (parts.length === 0) {
    parts.push(`${casino.name} provides flexible banking options and responsive support.`);
  }

  return parts.join(" ");
}

function generateVerdictDescription(
  casino: LandBasedCasino | OnlineCasino,
  isLandBased: boolean
): string {
  const parts: string[] = [];
  const rating = Number(casino.ratingOverall) || 0;

  // Rating-based opener
  if (rating >= 9) {
    parts.push(`${casino.name} sets the standard.`);
  } else if (rating >= 8) {
    parts.push(`${casino.name} delivers excellence.`);
  } else if (rating >= 7) {
    parts.push(`${casino.name} offers a quality experience.`);
  } else if (rating >= 6) {
    parts.push(`${casino.name} is a solid choice.`);
  } else if (rating > 0) {
    parts.push(`${casino.name} has room to grow.`);
  } else {
    parts.push(`${casino.name} awaits your verdict.`);
  }

  // Tier-based context
  if (casino.experienceTiers?.includes("destination")) {
    parts.push("As a destination casino, it's worth building a trip around.");
  } else if (casino.experienceTiers?.includes("local_gem")) {
    parts.push("A reliable local option for regular play.");
  }

  // Final recommendation
  if (rating >= 7) {
    parts.push("We recommend it.");
  }

  return parts.join(" ");
}

// ============================================
// PLAYER DETAILS GENERATION
// ============================================

export function generatePlayerDetails(
  casino: LandBasedCasino | OnlineCasino
): PlayerDetails {
  const isLandBased = "address" in casino;
  const landBased = casino as LandBasedCasino;

  const details: PlayerDetails = {
    tips: [],
  };

  if (isLandBased) {
    // Table limits
    if (landBased.minTableBet && landBased.maxTableBet) {
      details.tableMinMax = {
        min: landBased.minTableBet,
        max: landBased.maxTableBet,
      };
    }

    // Poker info
    if (landBased.hasPokerRoom) {
      details.pokerInfo = {
        tables: landBased.pokerRoomTables,
        tournaments: true, // Assume if they have a room
      };
    }

    // Tips
    if (landBased.is24Hours) {
      details.tips?.push("The casino is open 24/7 - late night sessions tend to have lower minimums.");
    }
    if (landBased.hasHighLimitRoom) {
      details.tips?.push("Ask about high limit room access - requirements vary by visit.");
    }
    if (landBased.hasHotel) {
      details.tips?.push("Hotel guests may receive comps and priority seating.");
    }
    if (landBased.dressCode) {
      details.tips?.push(`Dress code is ${landBased.dressCode} - check before your visit.`);
    }
  }

  // Add comp info for destination casinos
  if (casino.experienceTiers?.includes("destination")) {
    details.compInfo =
      "As a destination casino, expect a comp program for rated play. Sign up for the player's club before your first session.";
  }

  return details;
}
