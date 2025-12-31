"use client";

import { useTour } from "../StoryTourProvider";
import { ZoneContent } from "../ActContainer";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import { MapPin, Clock, Shield, Star, Check, Globe, Award, Sparkles } from "lucide-react";
import TrackedLink from "@/components/casino/TrackedLink";
import { generateSignatureMoment, generateActNarrative } from "@/lib/tour-narrative";

interface FirstImpressionsActProps {
  casino: LandBasedCasino | OnlineCasino;
}

export default function FirstImpressionsAct({ casino }: FirstImpressionsActProps) {
  const { state, recordCTAClick } = useTour();
  const isLandBased = "address" in casino;

  // Render based on current zone
  if (state.currentZoneIndex === 0) {
    return <ArrivalZone casino={casino} isLandBased={isLandBased} />;
  }

  return <TrustSignalsZone casino={casino} isLandBased={isLandBased} onCTAClick={recordCTAClick} />;
}

// Zone 1: Arrival / First Look
function ArrivalZone({
  casino,
  isLandBased,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
}) {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  // Get dynamic signature moment from narrative generator
  const signatureMoment = generateSignatureMoment(casino, "journey");

  // Get act narrative for additional context
  const narrative = generateActNarrative(casino, "first-impressions", "journey");

  // Determine experience tier badge
  const getExperienceBadge = () => {
    if (casino.experienceTiers?.includes("historic_icon")) {
      return { icon: <Award className="w-3 h-3" />, label: "Historic Icon" };
    }
    if (casino.experienceTiers?.includes("destination")) {
      return { icon: <Sparkles className="w-3 h-3" />, label: "Destination Casino" };
    }
    if (casino.experienceTiers?.includes("high_roller_haven")) {
      return { icon: <Star className="w-3 h-3" />, label: "High Roller Haven" };
    }
    if (casino.experienceTiers?.includes("poker_paradise")) {
      return { icon: <Award className="w-3 h-3" />, label: "Poker Paradise" };
    }
    if (casino.isFeatured) {
      return { icon: <Sparkles className="w-3 h-3" />, label: "Featured" };
    }
    return null;
  };

  const experienceBadge = getExperienceBadge();

  return (
    <ZoneContent subtitle="Act 1 • Zone 1" title="First Impressions">
      {/* Hero visual */}
      <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video bg-slate-800">
        {casino.heroImageUrl ? (
          <img
            src={casino.heroImageUrl}
            alt={casino.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-slate-900 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/20">{casino.name}</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* Experience tier badge */}
        {experienceBadge && (
          <div className="absolute top-4 left-4">
            <span className="bg-emerald-500/90 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              {experienceBadge.icon}
              {experienceBadge.label}
            </span>
          </div>
        )}

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {casino.name}
          </h1>
          {isLandBased && (
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4" />
              <span>{landBased.city}, {landBased.country}</span>
            </div>
          )}
          {!isLandBased && online.licenses?.length > 0 && (
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-4 h-4" />
              <span>Licensed by {online.licenses[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Signature moment - using dynamic narrative */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-slate-800/50 rounded-xl p-6 border border-emerald-500/20 mb-6">
        <p className="text-xl text-slate-100 leading-relaxed">
          {signatureMoment}
        </p>
        {narrative?.body && (
          <p className="text-slate-400 mt-3 text-sm">
            {narrative.body}
          </p>
        )}
      </div>

      {/* Quick facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLandBased && (
          <>
            <QuickFact
              icon={<Clock className="w-4 h-4" />}
              label="Hours"
              value={landBased.is24Hours ? "24/7" : "See schedule"}
            />
            <QuickFact
              icon={<Star className="w-4 h-4" />}
              label="Rating"
              value={casino.ratingOverall > 0 ? `${casino.ratingOverall.toFixed(1)}/10` : "New"}
            />
            {landBased.slotCount && landBased.slotCount > 0 && (
              <QuickFact
                icon={<Sparkles className="w-4 h-4" />}
                label="Slots"
                value={`${landBased.slotCount.toLocaleString()}+`}
              />
            )}
            {landBased.tableCount && landBased.tableCount > 0 && (
              <QuickFact
                icon={<Award className="w-4 h-4" />}
                label="Tables"
                value={landBased.tableCount.toString()}
              />
            )}
          </>
        )}
        {!isLandBased && (
          <>
            <QuickFact
              icon={<Shield className="w-4 h-4" />}
              label="License"
              value={online.licenses?.[0] || "Licensed"}
            />
            <QuickFact
              icon={<Star className="w-4 h-4" />}
              label="Rating"
              value={casino.ratingOverall > 0 ? `${casino.ratingOverall.toFixed(1)}/10` : "New"}
            />
            {online.slotCount && online.slotCount > 0 && (
              <QuickFact
                icon={<Sparkles className="w-4 h-4" />}
                label="Slots"
                value={`${online.slotCount.toLocaleString()}+`}
              />
            )}
            {online.hasLiveCasino && (
              <QuickFact
                icon={<Globe className="w-4 h-4" />}
                label="Live Casino"
                value="Available"
              />
            )}
          </>
        )}
      </div>

      {/* Key facts callout */}
      {narrative?.facts && narrative.facts.length > 0 && (
        <div className="mt-6 bg-slate-800/30 rounded-xl p-4 border border-slate-700">
          <h4 className="text-sm font-medium text-slate-400 mb-3">At a Glance</h4>
          <div className="flex flex-wrap gap-2">
            {narrative.facts.map((fact, index) => (
              <span
                key={index}
                className="bg-slate-700/50 text-slate-300 text-xs px-3 py-1 rounded-full"
              >
                {fact}
              </span>
            ))}
          </div>
        </div>
      )}
    </ZoneContent>
  );
}

// Zone 2: Trust Signals
function TrustSignalsZone({
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

  return (
    <ZoneContent subtitle="Act 1 • Zone 2" title="Trust Signals">
      <div className="space-y-6">
        {/* Verification status */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              casino.isVerified ? "bg-emerald-500/20" : "bg-slate-700"
            }`}>
              <Shield className={`w-5 h-5 ${casino.isVerified ? "text-emerald-400" : "text-slate-400"}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {casino.isVerified ? "Verified Casino" : "Listed Casino"}
              </h3>
              <p className="text-sm text-slate-400">
                {casino.isVerified
                  ? "Information verified by our team"
                  : "Information from public sources"}
              </p>
            </div>
          </div>

          {/* Badges */}
          {casino.verifiedBadges && casino.verifiedBadges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {casino.verifiedBadges.map((badge) => (
                <span
                  key={badge}
                  className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  {formatBadge(badge)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Ratings breakdown */}
        {casino.ratingOverall > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Our Ratings</h3>
            <div className="space-y-3">
              <RatingBar label="Overall" value={casino.ratingOverall} />
              {casino.ratingGames && <RatingBar label="Games" value={casino.ratingGames} />}
              {casino.ratingService && <RatingBar label="Service" value={casino.ratingService} />}
              {casino.ratingTrust && <RatingBar label="Trust" value={casino.ratingTrust} />}
            </div>
          </div>
        )}

        {/* Soft CTA */}
        {!isLandBased && online.affiliateLink && (
          <div className="text-center pt-4">
            <TrackedLink
              casinoId={casino.id}
              casinoType="online"
              affiliateLink={online.affiliateLink}
              websiteUrl={online.website}
              casinoName={casino.name}
              variant="secondary"
              size="sm"
              subid="tour_act1_soft"
            >
              Learn more at {casino.name}
            </TrackedLink>
          </div>
        )}
      </div>
    </ZoneContent>
  );
}

// Helper components
function QuickFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
      <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
        {icon}
        {label}
      </div>
      <div className="text-white font-medium">{value}</div>
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  const numValue = Number(value) || 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-400 text-sm w-20">{label}</span>
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all"
          style={{ width: `${(numValue / 10) * 100}%` }}
        />
      </div>
      <span className="text-white text-sm font-medium w-8">{numValue.toFixed(1)}</span>
    </div>
  );
}

function formatBadge(badge: string): string {
  return badge
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
