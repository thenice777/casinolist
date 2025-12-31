"use client";

import { useTour } from "../StoryTourProvider";
import { ZoneContent } from "../ActContainer";
import NarrativeBlock, { SectionDivider } from "../NarrativeBlock";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import {
  UtensilsCrossed,
  Hotel,
  Wifi,
  Car,
  Music,
  Shirt,
  Users,
  Check,
  X,
  CreditCard,
  Smartphone,
  Globe,
  Clock,
  Shield,
  Sparkles,
  Coffee,
  Wine,
  MapPin,
} from "lucide-react";
import { generateBestForTags, generateNotForTags } from "@/lib/tour-eligibility";
import { generateActNarrative } from "@/lib/tour-narrative";

interface FullPictureActProps {
  casino: LandBasedCasino | OnlineCasino;
}

export default function FullPictureAct({ casino }: FullPictureActProps) {
  const { state } = useTour();
  const isLandBased = "address" in casino;

  const zones = ["amenities", "dining", "who-its-for"];
  const currentZone = zones[state.currentZoneIndex] || zones[0];

  switch (currentZone) {
    case "amenities":
      return <AmenitiesZone casino={casino} isLandBased={isLandBased} />;
    case "dining":
      return <DiningZone casino={casino} isLandBased={isLandBased} />;
    case "who-its-for":
      return <WhoItsForZone casino={casino} isLandBased={isLandBased} />;
    default:
      return <AmenitiesZone casino={casino} isLandBased={isLandBased} />;
  }
}

// Zone 1: Beyond Gaming / Amenities
function AmenitiesZone({
  casino,
  isLandBased,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
}) {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  // Get narrative content
  const narrative = generateActNarrative(casino, "full-picture", "journey");

  // Calculate amenity score for land-based
  const amenityScore = isLandBased
    ? (landBased.hasHotel ? 1 : 0) +
      (landBased.hasRestaurant ? 1 : 0) +
      (landBased.hasParking ? 1 : 0) +
      (landBased.amenities?.length || 0)
    : 0;

  const getAmenityVerdict = () => {
    if (amenityScore >= 6) return "Full resort experience";
    if (amenityScore >= 3) return "Well-equipped property";
    return "Gaming-focused venue";
  };

  return (
    <ZoneContent subtitle="Act 3 • Zone 1" title="Beyond Gaming">
      <div className="space-y-6">
        {/* Intro narrative */}
        <NarrativeBlock
          content={{
            headline: isLandBased
              ? `${casino.name} is more than a casino floor`
              : `${casino.name} offers more than just games`,
            body: narrative?.body || (isLandBased
              ? "A casino experience is about more than what happens at the tables. Here's the full picture of what this property offers."
              : "Modern online casinos compete on features, security, and player experience. Here's what sets this one apart."),
            icon: <Sparkles className="w-6 h-6" />,
          }}
          variant="hero"
        />

        {/* Key facilities for land-based */}
        {isLandBased && (
          <>
            <div className="grid grid-cols-3 gap-3">
              <FacilityCard
                icon={<Hotel className="w-5 h-5" />}
                label="Hotel"
                available={landBased.hasHotel}
              />
              <FacilityCard
                icon={<UtensilsCrossed className="w-5 h-5" />}
                label="Dining"
                available={landBased.hasRestaurant}
              />
              <FacilityCard
                icon={<Car className="w-5 h-5" />}
                label="Parking"
                available={landBased.hasParking}
              />
            </div>

            {/* Amenity verdict */}
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 flex items-center justify-between">
              <span className="text-slate-400 text-sm">Property Type</span>
              <span className="text-white font-medium">{getAmenityVerdict()}</span>
            </div>
          </>
        )}

        {/* Amenities list */}
        {isLandBased && landBased.amenities && landBased.amenities.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Full Amenities ({landBased.amenities.length})
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {landBased.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Online-specific features */}
        {!isLandBased && (
          <div className="space-y-4">
            {/* Core features grid */}
            <div className="grid grid-cols-2 gap-4">
              {online.hasLiveCasino && (
                <FeatureCard
                  icon={<Users className="w-5 h-5" />}
                  label="Live Casino"
                  description="Real dealers streaming 24/7"
                  highlight
                />
              )}
              <FeatureCard
                icon={<Smartphone className="w-5 h-5" />}
                label="Mobile Ready"
                description={online.verifiedBadges?.includes("mobile_optimized") ? "Fully mobile-optimized" : "Mobile-friendly site"}
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5" />}
                label="Security"
                description="SSL encrypted, licensed operation"
              />
              <FeatureCard
                icon={<Clock className="w-5 h-5" />}
                label="Availability"
                description="24/7 gaming access"
              />
            </div>

            {/* Payment methods */}
            {online.paymentMethods && online.paymentMethods.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Payment Methods</h4>
                    <p className="text-slate-400 text-sm">
                      {online.paymentMethods.length} options available
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {online.paymentMethods.slice(0, 8).map((method) => (
                    <span
                      key={method}
                      className="bg-slate-700/50 text-slate-300 text-xs px-3 py-1 rounded-full"
                    >
                      {method}
                    </span>
                  ))}
                  {online.paymentMethods.length > 8 && (
                    <span className="bg-slate-700/50 text-slate-400 text-xs px-3 py-1 rounded-full">
                      +{online.paymentMethods.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Licenses */}
            {online.licenses && online.licenses.length > 0 && (
              <div className="bg-emerald-900/20 rounded-xl p-4 border border-emerald-700/30">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium text-sm">Licensed & Regulated</span>
                </div>
                <p className="text-slate-400 text-sm">
                  {online.licenses.join(", ")}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </ZoneContent>
  );
}

// Zone 2: Dining
function DiningZone({
  casino,
  isLandBased,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
}) {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  // Filter dining-related amenities (only for land-based casinos)
  const diningAmenities = isLandBased
    ? landBased.amenities?.filter((a) =>
        /restaurant|dining|bar|cafe|buffet|steakhouse|lounge|food/i.test(a)
      ) || []
    : [];

  // Categorize dining options
  const fineDining = diningAmenities.filter((a) =>
    /steakhouse|fine dining|gourmet|signature/i.test(a)
  );
  const casualDining = diningAmenities.filter((a) =>
    /cafe|buffet|deli|grill|bistro/i.test(a)
  );
  const bars = diningAmenities.filter((a) =>
    /bar|lounge|club|pub/i.test(a)
  );

  if (!isLandBased) {
    return (
      <ZoneContent subtitle="Act 3 • Zone 2" title="Player Experience">
        <div className="space-y-6">
          <NarrativeBlock
            content={{
              headline: "Play on your terms",
              body: `As an online casino, ${casino.name} lets you play from anywhere—your favorite coffee shop, your couch, or anywhere with an internet connection.`,
              icon: <Coffee className="w-6 h-6" />,
            }}
            variant="hero"
          />

          {/* Online bonuses & rewards */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Player Perks</h3>
            <div className="space-y-3">
              {(online.welcomeBonusDescription || online.welcomeBonusAmount) && (
                <div className="flex items-start gap-3 bg-emerald-500/10 rounded-lg p-3">
                  <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-emerald-300 font-medium">Welcome Bonus</p>
                    <p className="text-slate-400 text-sm">
                      {online.welcomeBonusDescription || online.welcomeBonusAmount}
                    </p>
                  </div>
                </div>
              )}
              {online.verifiedBadges?.includes("vip_excellence") && (
                <div className="flex items-start gap-3 bg-slate-700/30 rounded-lg p-3">
                  <Shield className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">VIP Program</p>
                    <p className="text-slate-400 text-sm">Exclusive perks for loyal players</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 bg-slate-700/30 rounded-lg p-3">
                <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">24/7 Access</p>
                  <p className="text-slate-400 text-sm">Play anytime, anywhere</p>
                </div>
              </div>
            </div>
          </div>

          {/* Withdrawal info */}
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Withdrawal Speed</span>
              <span className="text-white font-medium">
                {online.verifiedBadges?.includes("fast_payouts") ? "Fast Payouts" : online.withdrawalTime || "Standard"}
              </span>
            </div>
          </div>
        </div>
      </ZoneContent>
    );
  }

  return (
    <ZoneContent subtitle="Act 3 • Zone 2" title="Dining">
      <div className="space-y-6">
        {landBased.hasRestaurant ? (
          <>
            <NarrativeBlock
              content={{
                headline: "Fuel your experience",
                body: casino.experienceTiers?.includes("destination")
                  ? `As a destination casino, ${casino.name} offers multiple dining venues to suit any mood or occasion.`
                  : `${casino.name} has on-site dining to keep you fueled during your visit.`,
                icon: <UtensilsCrossed className="w-6 h-6" />,
              }}
              variant="highlight"
            />

            {/* Dining categories */}
            {(fineDining.length > 0 || casualDining.length > 0 || bars.length > 0) && (
              <div className="grid gap-4">
                {fineDining.length > 0 && (
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Wine className="w-5 h-5 text-amber-400" />
                      <h4 className="text-white font-medium">Fine Dining</h4>
                    </div>
                    <div className="space-y-2">
                      {fineDining.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-slate-300">
                          <Check className="w-4 h-4 text-amber-400" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {casualDining.length > 0 && (
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Coffee className="w-5 h-5 text-emerald-400" />
                      <h4 className="text-white font-medium">Casual Dining</h4>
                    </div>
                    <div className="space-y-2">
                      {casualDining.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {bars.length > 0 && (
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Wine className="w-5 h-5 text-purple-400" />
                      <h4 className="text-white font-medium">Bars & Lounges</h4>
                    </div>
                    <div className="space-y-2">
                      {bars.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-slate-300">
                          <Check className="w-4 h-4 text-purple-400" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Fallback if no categorized amenities */}
            {fineDining.length === 0 && casualDining.length === 0 && bars.length === 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-400">
                  {diningAmenities.length > 0
                    ? diningAmenities.join(", ")
                    : `Check with ${casino.name} for current dining options and hours.`}
                </p>
              </div>
            )}

            {/* Tip for destination casinos */}
            {casino.experienceTiers?.includes("destination") && (
              <div className="bg-gradient-to-r from-amber-900/30 to-slate-800 rounded-xl p-4 border border-amber-700/30">
                <p className="text-slate-300 text-sm">
                  <strong className="text-amber-400">Pro tip:</strong> Consider making reservations
                  for fine dining options, especially on weekends.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <NarrativeBlock
              content={{
                headline: "Gaming-focused venue",
                body: `${casino.name} focuses on the gaming experience. On-site dining may be limited, but there are likely options nearby.`,
                icon: <MapPin className="w-6 h-6" />,
              }}
              variant="default"
            />

            <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-700/30">
              <p className="text-amber-200/90 text-sm">
                Plan ahead: Consider eating before your visit or check nearby restaurant options.
              </p>
            </div>
          </div>
        )}
      </div>
    </ZoneContent>
  );
}

// Zone 3: Who It's For
function WhoItsForZone({
  casino,
  isLandBased,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
}) {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  const bestFor = generateBestForTags(casino);
  const notFor = generateNotForTags(casino);

  // Get a headline based on who the casino is best for
  const getHeadline = () => {
    if (bestFor.includes("poker players")) return "A poker player's paradise";
    if (bestFor.includes("high rollers")) return "Where high stakes meet high standards";
    if (bestFor.includes("slot enthusiasts")) return "A slot lover's dream";
    if (bestFor.includes("couples")) return "Perfect for a night out together";
    if (bestFor.includes("casual players")) return "Relaxed gaming, no pressure";
    return `Finding your fit at ${casino.name}`;
  };

  return (
    <ZoneContent subtitle="Act 3 • Zone 3" title="Who It's For">
      <div className="space-y-6">
        {/* Intro */}
        <NarrativeBlock
          content={{
            headline: getHeadline(),
            body: "Every casino has its personality. Here's an honest assessment of who will love this place—and who might want to look elsewhere.",
            icon: <Users className="w-6 h-6" />,
          }}
          variant="hero"
        />

        {/* Best for - enhanced design */}
        {bestFor.length > 0 && (
          <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 rounded-xl p-6 border border-emerald-700/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <span>Best For</span>
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
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
        )}

        {/* Not for - honest assessment */}
        {notFor.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <X className="w-5 h-5 text-amber-400" />
              </div>
              <span>Might Not Be For</span>
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Being honest helps you find the right fit
            </p>
            <div className="grid gap-2">
              {notFor.map((tag) => (
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

        <SectionDivider label="Good to Know" />

        {/* Practical info - enhanced grid */}
        {isLandBased ? (
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              label="Minimum Age"
              value={`${landBased.minimumAge}+`}
              icon={<Shield className="w-4 h-4" />}
            />
            <InfoCard
              label="Hours"
              value={landBased.is24Hours ? "24/7 Open" : "Check Schedule"}
              icon={<Clock className="w-4 h-4" />}
            />
            {landBased.dressCode && (
              <InfoCard
                label="Dress Code"
                value={landBased.dressCode}
                icon={<Shirt className="w-4 h-4" />}
              />
            )}
            {landBased.entryFee ? (
              <InfoCard
                label="Entry Fee"
                value={`$${landBased.entryFee}`}
                icon={<CreditCard className="w-4 h-4" />}
              />
            ) : (
              <InfoCard
                label="Entry"
                value="Free"
                icon={<Check className="w-4 h-4" />}
                highlight
              />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              label="Minimum Age"
              value="18+ (21+ some regions)"
              icon={<Shield className="w-4 h-4" />}
            />
            <InfoCard
              label="Availability"
              value="24/7 Access"
              icon={<Clock className="w-4 h-4" />}
            />
            <InfoCard
              label="Devices"
              value="Desktop & Mobile"
              icon={<Smartphone className="w-4 h-4" />}
            />
            <InfoCard
              label="Registration"
              value="Free to join"
              icon={<Check className="w-4 h-4" />}
              highlight
            />
          </div>
        )}

        {/* Location reminder for land-based */}
        {isLandBased && (
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <div>
              <p className="text-white text-sm font-medium">
                {landBased.city}, {landBased.country}
              </p>
              {landBased.address && (
                <p className="text-slate-400 text-xs">{landBased.address}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </ZoneContent>
  );
}

// Helper components
function FacilityCard({
  icon,
  label,
  available,
}: {
  icon: React.ReactNode;
  label: string;
  available: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border text-center ${
        available
          ? "bg-emerald-500/10 border-emerald-700/30"
          : "bg-slate-800/50 border-slate-700"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${
          available ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-500"
        }`}
      >
        {icon}
      </div>
      <p className={available ? "text-emerald-300" : "text-slate-500"}>{label}</p>
      <p className={`text-xs ${available ? "text-emerald-400" : "text-slate-600"}`}>
        {available ? "Available" : "Not available"}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  label,
  description,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? "bg-emerald-500/10 border-emerald-700/30"
          : "bg-slate-800/50 border-slate-700"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
          highlight ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-emerald-400"
        }`}
      >
        {icon}
      </div>
      <h4 className={highlight ? "text-emerald-200 font-medium" : "text-white font-medium"}>
        {label}
      </h4>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? "bg-emerald-500/10 border-emerald-700/30"
          : "bg-slate-800/50 border-slate-700"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={highlight ? "text-emerald-400" : "text-slate-400"}>{icon}</span>
        <span className="text-slate-400 text-xs uppercase tracking-wide">{label}</span>
      </div>
      <p className={`font-medium ${highlight ? "text-emerald-300" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
