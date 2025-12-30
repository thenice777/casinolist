"use client";

import { useState } from "react";
import { useTour } from "../StoryTourProvider";
import { ZoneContent } from "../ActContainer";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import {
  Dices,
  Spade,
  CircleDot,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Gamepad2,
} from "lucide-react";
import TrackedLink from "@/components/casino/TrackedLink";

interface HeartOfHouseActProps {
  casino: LandBasedCasino | OnlineCasino;
}

export default function HeartOfHouseAct({ casino }: HeartOfHouseActProps) {
  const { state, recordCTAClick } = useTour();
  const isLandBased = "address" in casino;

  const zones = ["gaming-overview", "table-games", "poker", "sportsbook"];
  const currentZone = zones[state.currentZoneIndex] || zones[0];

  switch (currentZone) {
    case "gaming-overview":
      return <GamingOverviewZone casino={casino} isLandBased={isLandBased} />;
    case "table-games":
      return <TableGamesZone casino={casino} isLandBased={isLandBased} onCTAClick={recordCTAClick} />;
    case "poker":
      return <PokerZone casino={casino} isLandBased={isLandBased} />;
    case "sportsbook":
      return <SportsbookZone casino={casino} isLandBased={isLandBased} />;
    default:
      return <GamingOverviewZone casino={casino} isLandBased={isLandBased} />;
  }
}

// Zone 1: Gaming Overview
function GamingOverviewZone({
  casino,
  isLandBased,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
}) {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  const getFloorDescription = (): string => {
    if (isLandBased) {
      const parts = [];
      if (landBased.slotCount) parts.push(`${landBased.slotCount.toLocaleString()} slot machines`);
      if (landBased.tableCount) parts.push(`${landBased.tableCount} table games`);
      if (parts.length === 0) return "A diverse gaming floor awaits.";
      return `The gaming floor features ${parts.join(" and ")}.`;
    } else {
      const parts = [];
      if (online.slotCount) parts.push(`${online.slotCount.toLocaleString()}+ slots`);
      if (online.tableGameCount) parts.push(`${online.tableGameCount}+ table games`);
      if (parts.length === 0) return "A comprehensive game library awaits.";
      return `The game library includes ${parts.join(" and ")}.`;
    }
  };

  return (
    <ZoneContent subtitle="Act 2 • Zone 1" title="The Gaming Floor">
      <div className="space-y-6">
        {/* Description */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <p className="text-lg text-slate-200 leading-relaxed">
            {getFloorDescription()}
          </p>
        </div>

        {/* Game counts grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLandBased && landBased.slotCount && (
            <GameStat
              icon={<CircleDot className="w-5 h-5" />}
              label="Slots"
              value={landBased.slotCount.toLocaleString()}
            />
          )}
          {isLandBased && landBased.tableCount && (
            <GameStat
              icon={<Dices className="w-5 h-5" />}
              label="Table Games"
              value={landBased.tableCount.toString()}
            />
          )}
          {!isLandBased && online.slotCount && (
            <GameStat
              icon={<CircleDot className="w-5 h-5" />}
              label="Slots"
              value={`${online.slotCount.toLocaleString()}+`}
            />
          )}
          {!isLandBased && online.hasLiveCasino && (
            <GameStat
              icon={<Gamepad2 className="w-5 h-5" />}
              label="Live Casino"
              value="Available"
            />
          )}
        </div>

        {/* Games list */}
        {casino.games && casino.games.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Available Games</h3>
            <div className="flex flex-wrap gap-2">
              {casino.games.slice(0, 12).map((game) => (
                <span
                  key={game}
                  className="bg-slate-700 text-slate-300 text-sm px-3 py-1 rounded-full"
                >
                  {game}
                </span>
              ))}
              {casino.games.length > 12 && (
                <span className="text-slate-500 text-sm px-3 py-1">
                  +{casino.games.length - 12} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </ZoneContent>
  );
}

// Zone 2: Table Games
function TableGamesZone({
  casino,
  isLandBased,
  onCTAClick,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
  onCTAClick: (location: string) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  return (
    <ZoneContent subtitle="Act 2 • Zone 2" title="Table Games">
      <div className="space-y-6">
        {/* Stakes info */}
        {isLandBased && (landBased.minTableBet || landBased.maxTableBet) && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Table Limits</h3>
            <div className="grid grid-cols-2 gap-4">
              {landBased.minTableBet && (
                <div>
                  <p className="text-slate-400 text-sm">Minimum Bet</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    ${landBased.minTableBet}
                  </p>
                </div>
              )}
              {landBased.maxTableBet && (
                <div>
                  <p className="text-slate-400 text-sm">Maximum Bet</p>
                  <p className="text-2xl font-bold text-white">
                    ${landBased.maxTableBet.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* High limit room */}
        {isLandBased && landBased.hasHighLimitRoom && (
          <div className="bg-gradient-to-r from-amber-900/30 to-slate-800 rounded-xl p-6 border border-amber-700/30">
            <div className="flex items-center gap-3">
              <Spade className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">High Limit Room</h3>
                <p className="text-slate-400 text-sm">
                  Dedicated space for serious players
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Player Details Panel (expandable) */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
          >
            <div>
              <h3 className="text-white font-medium">Player Details</h3>
              <p className="text-slate-400 text-sm">Game rules, odds, and tips</p>
            </div>
            {showDetails ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showDetails && (
            <div className="px-6 py-4 border-t border-slate-700 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">House Edge (Typical)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Blackjack (basic strategy)</span>
                    <span className="text-white">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Baccarat (banker)</span>
                    <span className="text-white">1.06%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Roulette (single zero)</span>
                    <span className="text-white">2.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Craps (pass line)</span>
                    <span className="text-white">1.41%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  Note: House edge varies by specific rules. Always check table-specific rules before playing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        {!isLandBased && online.affiliateLink && (
          <div className="text-center pt-4">
            <TrackedLink
              casinoId={casino.id}
              casinoType="online"
              affiliateLink={online.affiliateLink}
              websiteUrl={online.website}
              casinoName={casino.name}
              variant="primary"
              size="md"
              subid="tour_act2_gaming"
              onClick={() => onCTAClick("tour_act2_gaming")}
            >
              Explore {casino.name}'s Tables
            </TrackedLink>
          </div>
        )}
      </div>
    </ZoneContent>
  );
}

// Zone 3: Poker
function PokerZone({
  casino,
  isLandBased,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
}) {
  const landBased = casino as LandBasedCasino;

  const hasPoker = isLandBased ? landBased.hasPokerRoom : casino.games?.some(g =>
    g.toLowerCase().includes("poker")
  );

  if (!hasPoker) {
    return (
      <ZoneContent subtitle="Act 2 • Zone 3" title="Poker Room">
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
          <Spade className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No Dedicated Poker Room</h3>
          <p className="text-slate-400">
            {casino.name} doesn't have a dedicated poker room.
            {isLandBased ? " Look for table poker games on the main floor." : " Check out video poker in the game library."}
          </p>
        </div>
      </ZoneContent>
    );
  }

  return (
    <ZoneContent subtitle="Act 2 • Zone 3" title="Poker Room">
      <div className="space-y-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Spade className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Poker Room Available</h3>
              {isLandBased && landBased.pokerRoomTables && (
                <p className="text-slate-400">{landBased.pokerRoomTables} tables</p>
              )}
            </div>
          </div>

          <p className="text-slate-300">
            {isLandBased
              ? `${casino.name} offers a dedicated poker room for enthusiasts. Check with the casino for current games and stakes.`
              : `Find poker games in the ${casino.name} game library, including video poker and live dealer options.`}
          </p>
        </div>
      </div>
    </ZoneContent>
  );
}

// Zone 4: Sportsbook
function SportsbookZone({
  casino,
  isLandBased,
}: {
  casino: LandBasedCasino | OnlineCasino;
  isLandBased: boolean;
}) {
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  const hasSportsbook = isLandBased ? landBased.hasSportsbook : online.hasSportsbook;

  if (!hasSportsbook) {
    return (
      <ZoneContent subtitle="Act 2 • Zone 4" title="Sportsbook">
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
          <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No Sportsbook</h3>
          <p className="text-slate-400">
            {casino.name} focuses on casino gaming and doesn't offer sports betting.
          </p>
        </div>
      </ZoneContent>
    );
  }

  return (
    <ZoneContent subtitle="Act 2 • Zone 4" title="Sportsbook">
      <div className="space-y-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Sportsbook Available</h3>
              <p className="text-slate-400">Sports betting on-site</p>
            </div>
          </div>

          <p className="text-slate-300">
            {isLandBased
              ? `Place your sports bets at ${casino.name}'s sportsbook. Major sporting events and racing available.`
              : `${casino.name} offers a full sportsbook with pre-match and live betting options.`}
          </p>
        </div>
      </div>
    </ZoneContent>
  );
}

// Helper component
function GameStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-2 text-emerald-400">
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  );
}
