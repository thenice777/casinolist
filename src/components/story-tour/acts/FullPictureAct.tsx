"use client";

import { useTour } from "../StoryTourProvider";
import { ZoneContent } from "../ActContainer";
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
} from "lucide-react";
import { generateBestForTags, generateNotForTags } from "@/lib/tour-eligibility";

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

  return (
    <ZoneContent subtitle="Act 3 • Zone 1" title="Beyond Gaming">
      <div className="space-y-6">
        {/* Intro */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <p className="text-lg text-slate-200 leading-relaxed">
            {isLandBased
              ? `${casino.name} is more than a casino floor. Here's what else you'll find.`
              : `${casino.name} offers more than just games. Here's the complete picture.`}
          </p>
        </div>

        {/* Key facilities */}
        {isLandBased && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FacilityCard
              icon={<Hotel className="w-5 h-5" />}
              label="Hotel"
              available={landBased.hasHotel}
            />
            <FacilityCard
              icon={<UtensilsCrossed className="w-5 h-5" />}
              label="Restaurant"
              available={landBased.hasRestaurant}
            />
            <FacilityCard
              icon={<Car className="w-5 h-5" />}
              label="Parking"
              available={landBased.hasParking}
            />
          </div>
        )}

        {/* Amenities list */}
        {casino.amenities && casino.amenities.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {casino.amenities.map((amenity) => (
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
          <div className="grid grid-cols-2 gap-4">
            {online.hasLiveCasino && (
              <FeatureCard
                icon={<Users className="w-5 h-5" />}
                label="Live Casino"
                description="Real dealers streaming 24/7"
              />
            )}
            {online.paymentMethods && online.paymentMethods.length > 0 && (
              <FeatureCard
                icon={<Wifi className="w-5 h-5" />}
                label="Payments"
                description={`${online.paymentMethods.length}+ payment methods`}
              />
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

  // Filter dining-related amenities
  const diningAmenities = casino.amenities?.filter((a) =>
    /restaurant|dining|bar|cafe|buffet|steakhouse|lounge|food/i.test(a)
  ) || [];

  if (!isLandBased) {
    return (
      <ZoneContent subtitle="Act 3 • Zone 2" title="Dining & Extras">
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
          <UtensilsCrossed className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Online Casino</h3>
          <p className="text-slate-400">
            As an online casino, {casino.name} lets you play from anywhere—including
            your favorite restaurant or the comfort of home.
          </p>
        </div>
      </ZoneContent>
    );
  }

  return (
    <ZoneContent subtitle="Act 3 • Zone 2" title="Dining">
      <div className="space-y-6">
        {landBased.hasRestaurant ? (
          <>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">On-Site Dining</h3>
                  <p className="text-slate-400">Restaurant options available</p>
                </div>
              </div>

              {diningAmenities.length > 0 ? (
                <div className="space-y-2">
                  {diningAmenities.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">
                  Check with {casino.name} for current dining options and hours.
                </p>
              )}
            </div>

            {casino.experienceTiers?.includes("destination") && (
              <div className="bg-gradient-to-r from-amber-900/30 to-slate-800 rounded-xl p-4 border border-amber-700/30">
                <p className="text-slate-300 text-sm">
                  <strong className="text-amber-400">Tip:</strong> As a destination casino,
                  {casino.name} may have multiple dining venues. Consider making reservations
                  for fine dining options.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
            <UtensilsCrossed className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Limited Dining</h3>
            <p className="text-slate-400">
              {casino.name} may have limited or no on-site dining. Check nearby options
              before your visit.
            </p>
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

  const bestFor = generateBestForTags(casino);
  const notFor = generateNotForTags(casino);

  return (
    <ZoneContent subtitle="Act 3 • Zone 3" title="Who It's For">
      <div className="space-y-6">
        {/* Best for */}
        {bestFor.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              Best For
            </h3>
            <div className="space-y-3">
              {bestFor.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-3 bg-emerald-500/10 text-emerald-300 px-4 py-2 rounded-lg"
                >
                  <Check className="w-4 h-4" />
                  <span className="capitalize">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not for */}
        {notFor.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-amber-400" />
              Might Not Be For
            </h3>
            <div className="space-y-3">
              {notFor.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-3 bg-amber-500/10 text-amber-300 px-4 py-2 rounded-lg"
                >
                  <X className="w-4 h-4" />
                  <span className="capitalize">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practical info */}
        {isLandBased && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Good to Know</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Minimum Age</p>
                <p className="text-white font-medium">{landBased.minimumAge}+</p>
              </div>
              {landBased.dressCode && (
                <div>
                  <p className="text-slate-400 text-sm">Dress Code</p>
                  <p className="text-white font-medium">{landBased.dressCode}</p>
                </div>
              )}
              <div>
                <p className="text-slate-400 text-sm">Hours</p>
                <p className="text-white font-medium">
                  {landBased.is24Hours ? "24/7" : "See schedule"}
                </p>
              </div>
              {landBased.entryFee && (
                <div>
                  <p className="text-slate-400 text-sm">Entry Fee</p>
                  <p className="text-white font-medium">${landBased.entryFee}</p>
                </div>
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
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-2 text-emerald-400">
        {icon}
      </div>
      <h4 className="text-white font-medium">{label}</h4>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
