"use client";

import { useTour } from "../StoryTourProvider";
import { ZoneContent } from "../ActContainer";
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
} from "lucide-react";
import TrackedLink from "@/components/casino/TrackedLink";
import { generateBestForTags } from "@/lib/tour-eligibility";
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
  const getRatingLabel = (r: number): string => {
    if (r >= 9) return "Exceptional";
    if (r >= 8) return "Excellent";
    if (r >= 7) return "Very Good";
    if (r >= 6) return "Good";
    if (r >= 5) return "Fair";
    return "Needs Improvement";
  };

  return (
    <ZoneContent subtitle="Act 4 • Your Move" title="The Verdict">
      <div className="space-y-6">
        {/* Overall rating */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-emerald-400 font-medium">Our Verdict</span>
          </div>

          {rating > 0 ? (
            <>
              <div className="text-6xl font-bold text-white mb-2">{rating.toFixed(1)}</div>
              <div className="text-xl text-slate-300">{getRatingLabel(rating)}</div>
              {casino.reviewCount > 0 && (
                <p className="text-slate-500 text-sm mt-2">
                  Based on our analysis and {casino.reviewCount} reviews
                </p>
              )}
            </>
          ) : (
            <div className="text-2xl text-slate-400">Not yet rated</div>
          )}
        </div>

        {/* Rating breakdown */}
        {rating > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Rating Breakdown</h3>
            <div className="space-y-4">
              {casino.ratingGames && (
                <RatingRow label="Games" value={Number(casino.ratingGames)} />
              )}
              {casino.ratingService && (
                <RatingRow label="Service" value={Number(casino.ratingService)} />
              )}
              {casino.ratingAtmosphere && (
                <RatingRow
                  label={isLandBased ? "Atmosphere" : "User Experience"}
                  value={Number(casino.ratingAtmosphere)}
                />
              )}
              {casino.ratingValue && (
                <RatingRow label="Value" value={Number(casino.ratingValue)} />
              )}
              {casino.ratingTrust && (
                <RatingRow label="Trust" value={Number(casino.ratingTrust)} />
              )}
            </div>
          </div>
        )}

        {/* Quick summary */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-slate-800 rounded-xl p-6 border border-emerald-700/30">
          <h3 className="text-lg font-semibold text-white mb-3">In Summary</h3>
          <p className="text-slate-300 leading-relaxed">
            {generateSummary(casino, isLandBased)}
          </p>
        </div>

        {/* Primary CTA */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="text-center">
            {!isLandBased && online.welcomeBonusDescription && (
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                  <Gift className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Welcome Bonus
                  </span>
                </div>
                <p className="text-xl font-bold text-white">
                  {online.welcomeBonusDescription}
                </p>
                {online.welcomeBonusWagering && (
                  <p className="text-slate-400 text-sm mt-1">
                    {online.welcomeBonusWagering}x wagering requirement
                  </p>
                )}
              </div>
            )}

            {isLandBased ? (
              <div className="space-y-3">
                {landBased.website && (
                  <a
                    href={landBased.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-medium transition-colors"
                    onClick={() => onCTAClick("tour_verdict_primary")}
                  >
                    Visit {casino.name}'s Website
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
                onClick={() => onCTAClick("tour_verdict_primary")}
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
            className="text-slate-400 hover:text-white text-sm transition-colors"
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
  const bestFor = generateBestForTags(casino);

  return (
    <ZoneContent subtitle="Act 4 • Your Move" title="Best For">
      <div className="space-y-6">
        {/* Best for tags */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            {casino.name} is ideal for:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bestFor.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-3 bg-emerald-500/10 text-emerald-300 px-4 py-3 rounded-lg"
              >
                <Check className="w-5 h-5" />
                <span className="capitalize font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience tiers */}
        {casino.experienceTiers && casino.experienceTiers.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Casino Type</h3>
            <div className="flex flex-wrap gap-2">
              {casino.experienceTiers.map((tier) => (
                <span
                  key={tier}
                  className="bg-slate-700 text-slate-300 px-4 py-2 rounded-full capitalize"
                >
                  {tier.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Verified status */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
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
              <h4 className="text-white font-medium">
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

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Ready to experience {casino.name}?</h3>

          {isLandBased ? (
            <Link
              href={`/casino/${casino.slug}`}
              className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 rounded-xl font-medium hover:bg-slate-100 transition-colors"
            >
              View Full Profile
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
              onClick={() => onCTAClick("tour_verdict_final")}
            >
              Visit {casino.name} Now
            </TrackedLink>
          )}
        </div>
      </div>
    </ZoneContent>
  );
}

// Helper components
function RatingRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-slate-400 w-32">{label}</span>
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-white font-medium w-8">{value.toFixed(1)}</span>
    </div>
  );
}

function generateSummary(casino: LandBasedCasino | OnlineCasino, isLandBased: boolean): string {
  const parts: string[] = [];
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  // Add tier-based opener
  if (casino.experienceTiers?.includes("destination")) {
    parts.push(`${casino.name} is a true destination casino.`);
  } else if (casino.experienceTiers?.includes("historic_icon")) {
    parts.push(`${casino.name} carries the weight of history and tradition.`);
  } else if (casino.experienceTiers?.includes("local_gem")) {
    parts.push(`${casino.name} is a solid local option.`);
  } else {
    parts.push(`${casino.name} offers a focused gaming experience.`);
  }

  // Add key features
  if (isLandBased) {
    if (landBased.hasPokerRoom && landBased.hasSportsbook) {
      parts.push("With both a poker room and sportsbook, it caters to diverse gaming interests.");
    } else if (landBased.hasPokerRoom) {
      parts.push("The dedicated poker room is a standout feature.");
    }
    if (landBased.hasHotel) {
      parts.push("On-site accommodation makes it convenient for extended visits.");
    }
  } else {
    if (online.welcomeBonusDescription) {
      parts.push("The welcome bonus provides good value for new players.");
    }
    if (online.hasLiveCasino) {
      parts.push("The live casino brings the floor experience to your screen.");
    }
  }

  // Add rating context
  const rating = Number(casino.ratingOverall) || 0;
  if (rating >= 8) {
    parts.push("Overall, a top-tier choice.");
  } else if (rating >= 6) {
    parts.push("A reliable option worth considering.");
  }

  return parts.join(" ");
}
