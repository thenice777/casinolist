"use client";

import { useTour } from "../StoryTourProvider";
import { ZoneContent } from "../ActContainer";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import { MapPin, Clock, Shield, Star, Check, Globe } from "lucide-react";
import TrackedLink from "@/components/casino/TrackedLink";

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

  // Generate signature moment based on data
  const getSignatureMoment = (): string => {
    if (isLandBased) {
      if (landBased.experienceTiers?.includes("historic_icon")) {
        return `Step into history at ${casino.name}. Where legends were made and traditions endure.`;
      }
      if (landBased.experienceTiers?.includes("destination")) {
        return `${casino.name} isn't just a casino—it's a destination. From the moment you arrive, you'll understand why.`;
      }
      if (landBased.is24Hours) {
        return `The doors at ${casino.name} never close. Day or night, the floor is alive.`;
      }
      return `Welcome to ${casino.name}. Here's what awaits you.`;
    } else {
      if (online.isFeatured) {
        return `${casino.name} has earned its reputation. Let's see why players keep coming back.`;
      }
      return `${casino.name} opens its virtual doors. Here's your first look inside.`;
    }
  };

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

      {/* Signature moment */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
        <p className="text-xl text-slate-200 leading-relaxed italic">
          "{getSignatureMoment()}"
        </p>
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
          </>
        )}
      </div>
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
              onClick={() => onCTAClick("tour_act1_soft")}
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
