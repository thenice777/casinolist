"use client";

import { useTour } from "../StoryTourProvider";
import { ZoneContent } from "../ActContainer";
import PlayerDetailsPanel, { getGameRulesForCasino } from "../PlayerDetailsPanel";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import { generatePlayerDetails } from "@/lib/tour-narrative";
import {
  Dices,
  Spade,
  CircleDot,
  TrendingUp,
  Gamepad2,
  Users,
  Zap,
  Trophy,
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
  const landBased = casino as LandBasedCasino;
  const online = casino as OnlineCasino;

  // Generate player details from casino data
  const playerDetails = generatePlayerDetails(casino);
  const gameRules = getGameRulesForCasino(casino.games || []);

  // Merge generated details with game rules
  const fullDetails = {
    ...playerDetails,
    gameRules: gameRules.length > 0 ? gameRules : undefined,
  };

  // Get table game specific games
  const tableGames = (casino.games || []).filter((g) =>
    /blackjack|roulette|baccarat|craps|poker|21/i.test(g)
  );

  return (
    <ZoneContent subtitle="Act 2 • Zone 2" title="Table Games">
      <div className="space-y-6">
        {/* Narrative intro */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <p className="text-lg text-slate-200 leading-relaxed">
            {isLandBased
              ? `The felt awaits. ${casino.name}'s table games offer everything from classic blackjack to high-stakes baccarat.`
              : `From your screen to the felt. ${casino.name} brings authentic table action with professional dealers and real-time play.`}
          </p>
        </div>

        {/* Stakes info */}
        {isLandBased && (landBased.minTableBet || landBased.maxTableBet) && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Table Limits</h3>
            <div className="grid grid-cols-2 gap-4">
              {landBased.minTableBet && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Minimum Bet</p>
                  <p className="text-3xl font-bold text-emerald-400">
                    ${landBased.minTableBet}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Starting point</p>
                </div>
              )}
              {landBased.maxTableBet && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-1">Maximum Bet</p>
                  <p className="text-3xl font-bold text-white">
                    ${landBased.maxTableBet.toLocaleString()}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Table maximum</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* High limit room callout */}
        {isLandBased && landBased.hasHighLimitRoom && (
          <div className="bg-gradient-to-r from-amber-900/30 to-slate-800 rounded-xl p-6 border border-amber-700/30">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">High Limit Room</h3>
                <p className="text-slate-400 text-sm">
                  Dedicated space for serious players with elevated minimums and personalized service.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Table games available */}
        {tableGames.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Available Table Games</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tableGames.slice(0, 6).map((game) => (
                <div
                  key={game}
                  className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg"
                >
                  <Dices className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 text-sm capitalize">{game}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Player Details Panel - using the component */}
        <PlayerDetailsPanel
          title="Player Details"
          subtitle="Game rules, odds, and strategic tips"
          details={fullDetails}
          variant="default"
        />

        {/* Online CTA */}
        {!isLandBased && online.affiliateLink && (
          <div className="bg-gradient-to-r from-emerald-900/50 to-slate-800 rounded-xl p-6 border border-emerald-700/30">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Ready to Play?</h3>
                <p className="text-slate-400 text-sm">
                  Experience live dealers and real-time action
                </p>
              </div>
              <TrackedLink
                casinoId={casino.id}
                casinoType="online"
                affiliateLink={online.affiliateLink}
                websiteUrl={online.website}
                casinoName={casino.name}
                variant="primary"
                size="md"
                subid="tour_act2_gaming"
              >
                Play Now at {casino.name}
              </TrackedLink>
            </div>
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
  const online = casino as OnlineCasino;

  const hasPoker = isLandBased ? landBased.hasPokerRoom : casino.games?.some(g =>
    g.toLowerCase().includes("poker")
  );

  // Get poker variants from games
  const pokerVariants = (casino.games || []).filter((g) =>
    /poker|holdem|omaha|stud/i.test(g)
  );

  if (!hasPoker) {
    return (
      <ZoneContent subtitle="Act 2 • Zone 3" title="Poker Room">
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
          <Spade className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-3">No Dedicated Poker Room</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            {casino.name} doesn't have a dedicated poker room.
            {isLandBased
              ? " Look for table poker games on the main floor, or check with staff for special tournament events."
              : " Video poker and casino poker variants are available in the game library."}
          </p>
        </div>
      </ZoneContent>
    );
  }

  return (
    <ZoneContent subtitle="Act 2 • Zone 3" title="Poker Room">
      <div className="space-y-6">
        {/* Hero card */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-800 rounded-xl p-6 border border-emerald-700/30">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Spade className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isLandBased ? "Dedicated Poker Room" : "Poker Games Available"}
              </h3>
              <p className="text-slate-300">
                {isLandBased
                  ? `${casino.name}'s poker room is where the serious players gather. From cash games to tournaments, the action never stops.`
                  : `${casino.name} brings the poker room to you with live dealers and real-time multi-table action.`}
              </p>
            </div>
          </div>
        </div>

        {/* Poker room stats */}
        {isLandBased && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {landBased.pokerRoomTables && (
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
                <p className="text-3xl font-bold text-white">{landBased.pokerRoomTables}</p>
                <p className="text-slate-400 text-sm">Tables</p>
              </div>
            )}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
              <p className="text-3xl font-bold text-emerald-400">24/7</p>
              <p className="text-slate-400 text-sm">Action</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-5 h-5 text-amber-400" />
                <p className="text-lg font-bold text-white">Daily</p>
              </div>
              <p className="text-slate-400 text-sm">Tournaments</p>
            </div>
          </div>
        )}

        {/* Poker variants */}
        {pokerVariants.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h4 className="text-lg font-semibold text-white mb-4">Poker Games</h4>
            <div className="flex flex-wrap gap-2">
              {pokerVariants.map((variant) => (
                <span
                  key={variant}
                  className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm capitalize"
                >
                  {variant}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Poker tips */}
        <PlayerDetailsPanel
          title="Poker Room Intel"
          subtitle="What you need to know before sitting down"
          variant="highlight"
          details={{
            pokerInfo: isLandBased && landBased.pokerRoomTables
              ? {
                  tables: landBased.pokerRoomTables,
                  tournaments: true,
                }
              : undefined,
            tips: [
              "Sign up for the room's waiting list as soon as you arrive",
              "Buy-in requirements vary by table - ask the floor before sitting",
              isLandBased
                ? "Bad beat jackpots often available at this room"
                : "Look for tournament freerolls and satellite events",
              "Tip the dealer when you win a significant pot",
            ],
          }}
        />
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
          <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-3">No Sportsbook</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            {casino.name} focuses on casino gaming and doesn't offer sports betting.
            {isLandBased
              ? " Check with local sports betting apps for options in the area."
              : " Look for dedicated sportsbook sites if sports betting is your focus."}
          </p>
        </div>
      </ZoneContent>
    );
  }

  return (
    <ZoneContent subtitle="Act 2 • Zone 4" title="Sportsbook">
      <div className="space-y-6">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-blue-900/40 to-slate-800 rounded-xl p-6 border border-blue-700/30">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isLandBased ? "Full Sportsbook" : "Integrated Sportsbook"}
              </h3>
              <p className="text-slate-300">
                {isLandBased
                  ? `${casino.name}'s sportsbook brings the action of every major sporting event right to the casino floor. Big screens, comfortable seating, and real-time odds.`
                  : `${casino.name} offers comprehensive sports betting with competitive odds, live betting, and same-game parlays across all major sports.`}
              </p>
            </div>
          </div>
        </div>

        {/* Sports offered */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-white mb-4">Sports Coverage</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Football", "Basketball", "Baseball", "Hockey", "Soccer", "Tennis", "Golf", "MMA"].map(
              (sport) => (
                <div
                  key={sport}
                  className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg"
                >
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 text-sm">{sport}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Betting features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-amber-400" />
              <h4 className="text-white font-medium">Live Betting</h4>
            </div>
            <p className="text-slate-400 text-sm">
              Bet on games in progress with real-time odds updates.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-emerald-400" />
              <h4 className="text-white font-medium">Parlays</h4>
            </div>
            <p className="text-slate-400 text-sm">
              Combine multiple bets for bigger potential payouts.
            </p>
          </div>
        </div>

        {/* Tips for sportsbook */}
        <PlayerDetailsPanel
          title="Sports Betting Tips"
          subtitle="Before you place your bets"
          variant="compact"
          details={{
            tips: [
              "Compare lines - odds can vary across different books",
              "Set a bankroll specifically for sports betting",
              "Don't chase losses with bigger bets",
              isLandBased
                ? "Self-service kiosks often have shorter wait times than windows"
                : "Mobile app may offer exclusive betting promos",
            ],
          }}
        />
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
