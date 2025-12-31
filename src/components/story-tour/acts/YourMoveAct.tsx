"use client";

import { useTour } from "../StoryTourProvider";
import { ZoneContent } from "../ActContainer";
import NarrativeBlock, { SectionDivider } from "../NarrativeBlock";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import {
  Star,
  Check,
  X,
  ExternalLink,
  MapPin,
  Clock,
  Gift,
  Shield,
  Trophy,
  Target,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Award,
  Users,
  Calendar,
} from "lucide-react";
import TrackedLink from "@/components/casino/TrackedLink";
import { generateBestForTags, generateNotForTags } from "@/lib/tour-eligibility";
import { generateActNarrative } from "@/lib/tour-narrative";
import Link from "next/link";

interface YourMoveActProps {
  casino: LandBasedCasino | OnlineCasino;
}

export default function YourMoveAct({ casino }: YourMoveActProps) {
  const { state, recordCTAClick } = useTour();
  const isLandBased = "address" in casino;

  const zones = ["verdict", "best-for"];
  const currentZone = zones[state.currentZoneIndex] || zones[0];

  switch (currentZone) {
    case "verdict":
      return <VerdictZone casino={casino} isLandBased={isLandBased} onCTAClick={recordCTAClick} />;
    case "best-for":
      return <BestForZone casino={casino} isLandBased={isLandBased} onCTAClick={recordCTAClick} />;
    default:
      return <VerdictZone casino={casino} isLandBased={isLandBased} onCTAClick={recordCTAClick} />;
  }
}

// Zone 1: The Verdict
function VerdictZone({
  casino,
  isLandBased,
  onCTAClick,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
  onCTAClick: (location: string) => void;
}) {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  const rating = Number(casino.ratingOverall) || 0;

  // Generate dynamic narrative
  const narrative = generateActNarrative(casino, "your-move", "journey");

  const getRatingLabel = (r: number): { label: string; color: string } => {
    if (r >= 9) return { label: "Exceptional", color: "text-emerald-400" };
    if (r >= 8) return { label: "Excellent", color: "text-emerald-400" };
    if (r >= 7) return { label: "Very Good", color: "text-blue-400" };
    if (r >= 6) return { label: "Good", color: "text-blue-400" };
    if (r >= 5) return { label: "Fair", color: "text-amber-400" };
    return { label: "Needs Improvement", color: "text-amber-400" };
  };

  const getRatingIcon = (r: number) => {
    if (r >= 8) return <Trophy className="w-6 h-6" />;
    if (r >= 6) return <Award className="w-6 h-6" />;
    return <Star className="w-6 h-6" />;
  };

  const ratingInfo = getRatingLabel(rating);

  return (
    <ZoneContent subtitle="Act 4 • Your Move" title="The Verdict">
      <div className="space-y-6">
        {/* Hero verdict intro */}
        <NarrativeBlock
          content={{
            headline: narrative?.headline || `Our verdict on ${casino.name}`,
            body: narrative?.body || "After reviewing all aspects of this casino, here's what you need to know to make your decision.",
            icon: <Target className="w-6 h-6" />,
          }}
          variant="hero"
        />

        {/* Overall rating - enhanced design */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full mb-6">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-emerald-400 font-medium">CasinoList Rating</span>
            </div>

            {rating > 0 ? (
              <>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className={`${ratingInfo.color}`}>
                    {getRatingIcon(rating)}
                  </div>
                  <div className="text-6xl font-bold text-white">{rating.toFixed(1)}</div>
                </div>
                <div className={`text-xl font-medium ${ratingInfo.color}`}>
                  {ratingInfo.label}
                </div>
                {casino.reviewCount > 0 && (
                  <p className="text-slate-500 text-sm mt-3 flex items-center justify-center gap-1">
                    <Users className="w-4 h-4" />
                    Based on our analysis and {casino.reviewCount} reviews
                  </p>
                )}
              </>
            ) : (
              <div className="text-2xl text-slate-400">Not yet rated</div>
            )}
          </div>
        </div>

        {/* Rating breakdown - visual bars */}
        {rating > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Rating Breakdown
            </h3>
            <div className="space-y-4">
              {casino.ratingGames && (
                <RatingRow
                  label="Games"
                  value={Number(casino.ratingGames)}
                  icon={<Sparkles className="w-4 h-4" />}
                />
              )}
              {casino.ratingService && (
                <RatingRow
                  label="Service"
                  value={Number(casino.ratingService)}
                  icon={<Users className="w-4 h-4" />}
                />
              )}
              {casino.ratingAtmosphere && (
                <RatingRow
                  label={isLandBased ? "Atmosphere" : "UX"}
                  value={Number(casino.ratingAtmosphere)}
                  icon={<Star className="w-4 h-4" />}
                />
              )}
              {casino.ratingValue && (
                <RatingRow
                  label="Value"
                  value={Number(casino.ratingValue)}
                  icon={<Gift className="w-4 h-4" />}
                />
              )}
              {casino.ratingTrust && (
                <RatingRow
                  label="Trust"
                  value={Number(casino.ratingTrust)}
                  icon={<Shield className="w-4 h-4" />}
                />
              )}
            </div>
          </div>
        )}

        <SectionDivider label="Summary" />

        {/* Quick summary - enhanced */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-slate-800 rounded-xl p-6 border border-emerald-700/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ThumbsUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">In Summary</h3>
              <p className="text-slate-300 leading-relaxed">
                {generateSummary(casino, isLandBased)}
              </p>
            </div>
          </div>
        </div>

        {/* Primary CTA - enhanced */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <div className="text-center">
            {!isLandBased && online.welcomeBonusDescription && (
              <div className="mb-6 pb-6 border-b border-slate-700">
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-3">
                  <Gift className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Welcome Bonus
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {online.welcomeBonusDescription}
                </p>
                {online.welcomeBonusWagering && (
                  <p className="text-slate-400 text-sm">
                    {online.welcomeBonusWagering}x wagering requirement
                  </p>
                )}
              </div>
            )}

            {isLandBased ? (
              <div className="space-y-4">
                {landBased.website && (
                  <a
                    href={landBased.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50"
                    onClick={() => onCTAClick("tour_verdict_primary")}
                  >
                    Visit {casino.name}&apos;s Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {landBased.city}, {landBased.country}
                  </span>
                  {landBased.is24Hours && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      24/7
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <TrackedLink
                casinoId={casino.id}
                casinoType="online"
                affiliateLink={online.affiliateLink}
                websiteUrl={online.website}
                casinoName={casino.name}
                variant="primary"
                size="lg"
                subid="tour_verdict_primary"
              >
                Visit {casino.name}
              </TrackedLink>
            )}
          </div>
        </div>

        {/* Back to profile link */}
        <div className="text-center">
          <Link
            href={isLandBased ? `/casino/${casino.slug}` : `/online/${casino.slug}`}
            className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1"
          >
            ← Back to full profile
          </Link>
        </div>
      </div>
    </ZoneContent>
  );
}

// Zone 2: Best For Summary
function BestForZone({
  casino,
  isLandBased,
  onCTAClick,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
  onCTAClick: (location: string) => void;
}) {
  const online = casino as OnlineCasino;
  const landBased = casino as LandBasedCasino;
  const bestFor = generateBestForTags(casino);
  const notFor = generateNotForTags(casino);

  // Get a headline based on who the casino is best for
  const getHeadline = () => {
    if (bestFor.includes("poker players")) return "Built for poker enthusiasts";
    if (bestFor.includes("high rollers")) return "A premium player's destination";
    if (bestFor.includes("slot enthusiasts")) return "Slot heaven awaits";
    if (bestFor.includes("couples")) return "Your perfect gaming date spot";
    if (bestFor.includes("casual players")) return "Gaming without the pressure";
    return "Finding your perfect match";
  };

  return (
    <ZoneContent subtitle="Act 4 • Your Move" title="Best For">
      <div className="space-y-6">
        {/* Hero intro */}
        <NarrativeBlock
          content={{
            headline: getHeadline(),
            body: `Not every casino is for everyone—and that's okay. Here's who will get the most out of ${casino.name}.`,
            icon: <Users className="w-6 h-6" />,
          }}
          variant="hero"
        />

        {/* Best for tags - enhanced */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 rounded-xl p-6 border border-emerald-700/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <ThumbsUp className="w-4 h-4 text-emerald-400" />
            </div>
            Ideal For
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bestFor.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-3 bg-emerald-500/10 text-emerald-200 px-4 py-3 rounded-lg border border-emerald-700/30"
              >
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="capitalize font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Not for - honest assessment */}
        {notFor.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <ThumbsDown className="w-4 h-4 text-amber-400" />
              </div>
              Might Not Suit
            </h3>
            <div className="grid gap-2">
              {notFor.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-3 bg-slate-700/30 text-slate-300 px-4 py-2 rounded-lg"
                >
                  <X className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="capitalize text-sm">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <SectionDivider label="Casino Profile" />

        {/* Experience tiers - enhanced */}
        {casino.experienceTiers && casino.experienceTiers.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Casino Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {casino.experienceTiers.map((tier) => {
                const tierColors: Record<string, string> = {
                  destination: "bg-purple-500/20 text-purple-300 border-purple-700/30",
                  historic_icon: "bg-amber-500/20 text-amber-300 border-amber-700/30",
                  local_gem: "bg-blue-500/20 text-blue-300 border-blue-700/30",
                  high_roller_haven: "bg-emerald-500/20 text-emerald-300 border-emerald-700/30",
                  poker_paradise: "bg-red-500/20 text-red-300 border-red-700/30",
                };
                const colorClass = tierColors[tier] || "bg-slate-700 text-slate-300 border-slate-600";

                return (
                  <span
                    key={tier}
                    className={`px-4 py-2 rounded-full capitalize border ${colorClass}`}
                  >
                    {tier.replace(/_/g, " ")}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Verified status - enhanced */}
        <div
          className={`rounded-xl p-6 border ${
            casino.isVerified
              ? "bg-emerald-900/20 border-emerald-700/30"
              : "bg-slate-800/50 border-slate-700"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                casino.isVerified ? "bg-emerald-500/20" : "bg-slate-700"
              }`}
            >
              <Shield
                className={`w-6 h-6 ${
                  casino.isVerified ? "text-emerald-400" : "text-slate-500"
                }`}
              />
            </div>
            <div>
              <h4 className={`font-medium ${casino.isVerified ? "text-emerald-300" : "text-white"}`}>
                {casino.isVerified ? "Verified by CasinoList" : "Listed Casino"}
              </h4>
              <p className="text-slate-400 text-sm">
                {casino.isVerified
                  ? "Our team has verified the information on this profile"
                  : "Information sourced from public data"}
              </p>
            </div>
          </div>
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-2 gap-3">
          {isLandBased ? (
            <>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <MapPin className="w-3 h-3" />
                  Location
                </div>
                <p className="text-white text-sm font-medium truncate">
                  {landBased.city}, {landBased.country}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Clock className="w-3 h-3" />
                  Hours
                </div>
                <p className="text-white text-sm font-medium">
                  {landBased.is24Hours ? "Open 24/7" : "Check Schedule"}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Calendar className="w-3 h-3" />
                  Founded
                </div>
                <p className="text-white text-sm font-medium">
                  {online.foundedYear || "Established"}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Clock className="w-3 h-3" />
                  Availability
                </div>
                <p className="text-white text-sm font-medium">24/7 Access</p>
              </div>
            </>
          )}
        </div>

        {/* Final CTA - enhanced */}
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-8 text-center relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to experience {casino.name}?
            </h3>
            <p className="text-emerald-200/80 mb-6">
              {isLandBased
                ? "Plan your visit and see what awaits"
                : "Start playing with exclusive bonuses"}
            </p>

            {isLandBased ? (
              <Link
                href={`/casino/${casino.slug}`}
                className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-xl font-medium hover:bg-slate-100 transition-all shadow-lg"
              >
                View Full Profile
                <ExternalLink className="w-4 h-4" />
              </Link>
            ) : (
              <TrackedLink
                casinoId={casino.id}
                casinoType="online"
                affiliateLink={online.affiliateLink}
                websiteUrl={online.website}
                casinoName={casino.name}
                variant="primary"
                size="lg"
                subid="tour_verdict_final"
              >
                Visit {casino.name} Now
              </TrackedLink>
            )}
          </div>
        </div>
      </div>
    </ZoneContent>
  );
}

// Helper components
function RatingRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
}) {
  // Color based on rating value
  const getBarColor = (v: number) => {
    if (v >= 8) return "bg-emerald-500";
    if (v >= 6) return "bg-blue-500";
    if (v >= 4) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 w-28 md:w-32">
        {icon && <span className="text-slate-500">{icon}</span>}
        <span className="text-slate-400 text-sm">{label}</span>
      </div>
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(value)} rounded-full transition-all duration-500`}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-white font-medium w-10 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

function generateSummary(casino: LandBasedCasino | OnlineCasino, isLandBased: boolean): string {
  const parts: string[] = [];
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;
  const rating = Number(casino.ratingOverall) || 0;

  // Add tier-based opener with more personality
  if (casino.experienceTiers?.includes("destination")) {
    parts.push(`${casino.name} is a true destination casino—the kind of place worth planning a trip around.`);
  } else if (casino.experienceTiers?.includes("historic_icon")) {
    parts.push(`${casino.name} carries the weight of history, offering an experience steeped in gaming tradition.`);
  } else if (casino.experienceTiers?.includes("high_roller_haven")) {
    parts.push(`${casino.name} caters to serious players who appreciate premium gaming environments.`);
  } else if (casino.experienceTiers?.includes("poker_paradise")) {
    parts.push(`${casino.name} is built around the poker room—a must-visit for card players.`);
  } else if (casino.experienceTiers?.includes("local_gem")) {
    parts.push(`${casino.name} is the kind of local spot that regulars swear by.`);
  } else {
    parts.push(`${casino.name} offers a focused gaming experience without unnecessary frills.`);
  }

  // Add key features - more specific
  if (isLandBased) {
    const features: string[] = [];
    if (landBased.hasPokerRoom) features.push("a dedicated poker room");
    if (landBased.hasSportsbook) features.push("a sportsbook");
    if (landBased.hasHighLimitRoom) features.push("high-limit gaming");
    if (landBased.hasHotel) features.push("on-site accommodation");

    if (features.length > 0) {
      if (features.length === 1) {
        parts.push(`The ${features[0]} is a standout feature.`);
      } else if (features.length === 2) {
        parts.push(`With ${features.join(" and ")}, it caters to serious players.`);
      } else {
        parts.push(`Key amenities include ${features.slice(0, -1).join(", ")}, and ${features[features.length - 1]}.`);
      }
    }

    // Location context
    if (landBased.is24Hours) {
      parts.push("The doors are always open—24/7 gaming means your schedule sets the pace.");
    }
  } else {
    // Online-specific insights
    if (online.welcomeBonusDescription || online.welcomeBonusAmount) {
      parts.push("New players can take advantage of the welcome bonus to extend their bankroll.");
    }
    if (online.hasLiveCasino) {
      parts.push("The live casino brings real dealer interaction to your screen.");
    }
    if (online.verifiedBadges?.includes("fast_payouts")) {
      parts.push("Fast withdrawals mean you get your winnings without the wait.");
    }
    if (online.licenses && online.licenses.length > 0) {
      parts.push("Proper licensing ensures fair play and player protection.");
    }
  }

  // Rating-based conclusion with nuance
  if (rating >= 9) {
    parts.push("This is as good as it gets—a genuine top-tier choice.");
  } else if (rating >= 8) {
    parts.push("Overall, an excellent option that delivers on its promises.");
  } else if (rating >= 7) {
    parts.push("A very good choice for most players.");
  } else if (rating >= 6) {
    parts.push("A solid, reliable option worth considering.");
  } else if (rating > 0) {
    parts.push("Has its strengths, but weigh them against your priorities.");
  }

  return parts.join(" ");
}
