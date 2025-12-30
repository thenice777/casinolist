"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info, AlertCircle, Lightbulb } from "lucide-react";
import { PlayerDetails, GameRuleInfo, PokerRoomInfo } from "@/types/tour";

interface PlayerDetailsPanelProps {
  title?: string;
  subtitle?: string;
  details: PlayerDetails;
  variant?: "default" | "compact" | "highlight";
}

export default function PlayerDetailsPanel({
  title = "Player Details",
  subtitle = "Game rules, odds, and tips",
  details,
  variant = "default",
}: PlayerDetailsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasContent =
    details.tableMinMax ||
    details.gameRules?.length ||
    details.pokerInfo ||
    details.compInfo ||
    details.tips?.length;

  if (!hasContent) return null;

  if (variant === "compact") {
    return (
      <details className="group bg-slate-800/30 rounded-lg border border-slate-700/50">
        <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
          <span className="text-slate-300 text-sm font-medium">{title}</span>
          <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
        </summary>
        <div className="px-4 pb-4 pt-2 border-t border-slate-700/50">
          <PlayerDetailsContent details={details} />
        </div>
      </details>
    );
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${
      variant === "highlight"
        ? "bg-emerald-900/20 border-emerald-700/30"
        : "bg-slate-800/50 border-slate-700"
    }`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
      >
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-slate-400 text-sm">{subtitle}</p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 py-4 border-t border-slate-700 space-y-6">
          <PlayerDetailsContent details={details} />
        </div>
      )}
    </div>
  );
}

function PlayerDetailsContent({ details }: { details: PlayerDetails }) {
  return (
    <>
      {/* Table Min/Max */}
      {details.tableMinMax && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400" />
            Table Limits
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-slate-400 text-xs uppercase tracking-wide">Minimum</p>
              <p className="text-xl font-bold text-emerald-400">
                ${details.tableMinMax.min.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-slate-400 text-xs uppercase tracking-wide">Maximum</p>
              <p className="text-xl font-bold text-white">
                ${details.tableMinMax.max.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Game Rules */}
      {details.gameRules && details.gameRules.length > 0 && (
        <GameRulesSection rules={details.gameRules} />
      )}

      {/* Poker Info */}
      {details.pokerInfo && (
        <PokerInfoSection info={details.pokerInfo} />
      )}

      {/* Comp Info */}
      {details.compInfo && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400" />
            Comps & Rewards
          </h4>
          <p className="text-slate-400 text-sm">{details.compInfo}</p>
        </div>
      )}

      {/* Tips */}
      {details.tips && details.tips.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Pro Tips
          </h4>
          <ul className="space-y-2">
            {details.tips.map((tip, i) => (
              <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 flex items-start gap-2">
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          Rules and limits may vary. Always verify at the table before playing.
        </p>
      </div>
    </>
  );
}

function GameRulesSection({ rules }: { rules: GameRuleInfo[] }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
        <Info className="w-4 h-4 text-emerald-400" />
        House Rules & Odds
      </h4>
      <div className="space-y-4">
        {rules.map((game, i) => (
          <div key={i} className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-white font-medium">{game.game}</h5>
              {game.houseEdge && (
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  House Edge: {game.houseEdge}
                </span>
              )}
            </div>
            <ul className="space-y-1">
              {game.rules.map((rule, j) => (
                <li key={j} className="text-slate-400 text-sm flex items-start gap-2">
                  <span className="text-slate-500">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PokerInfoSection({ info }: { info: PokerRoomInfo }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
        <Info className="w-4 h-4 text-emerald-400" />
        Poker Room Details
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {info.tables && (
          <div className="bg-slate-700/30 rounded-lg p-3">
            <p className="text-slate-400 text-xs">Tables</p>
            <p className="text-white font-medium">{info.tables}</p>
          </div>
        )}
        {info.stakes && (
          <div className="bg-slate-700/30 rounded-lg p-3">
            <p className="text-slate-400 text-xs">Stakes</p>
            <p className="text-white font-medium">{info.stakes}</p>
          </div>
        )}
        {info.rake && (
          <div className="bg-slate-700/30 rounded-lg p-3">
            <p className="text-slate-400 text-xs">Rake</p>
            <p className="text-white font-medium">{info.rake}</p>
          </div>
        )}
        {info.tournaments !== undefined && (
          <div className="bg-slate-700/30 rounded-lg p-3">
            <p className="text-slate-400 text-xs">Tournaments</p>
            <p className="text-white font-medium">
              {info.tournaments ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Preset house edge data for common games
export const COMMON_HOUSE_EDGES: GameRuleInfo[] = [
  {
    game: "Blackjack",
    houseEdge: "0.5%",
    rules: [
      "Basic strategy reduces house edge significantly",
      "Stand on soft 17 (S17) is more player-friendly than H17",
      "3:2 blackjack payout is standard (avoid 6:5 tables)",
    ],
  },
  {
    game: "Baccarat",
    houseEdge: "1.06%",
    rules: [
      "Banker bet has the lowest house edge",
      "Player bet has 1.24% edge",
      "Avoid the Tie bet (14.4% house edge)",
    ],
  },
  {
    game: "Craps",
    houseEdge: "1.41%",
    rules: [
      "Pass/Don't Pass have the best odds",
      "Place bets on 6 and 8 are reasonable (1.52%)",
      "Avoid proposition bets (high house edge)",
    ],
  },
  {
    game: "Roulette (Single Zero)",
    houseEdge: "2.7%",
    rules: [
      "Single zero (European) has better odds than double zero",
      "Outside bets have same edge but lower variance",
      "La Partage rule reduces edge to 1.35% on even-money bets",
    ],
  },
  {
    game: "Roulette (Double Zero)",
    houseEdge: "5.26%",
    rules: [
      "American roulette has higher house edge",
      "Avoid the five-number bet (7.89% edge)",
      "Consider single-zero tables if available",
    ],
  },
];

// Helper to get game rules for a casino
export function getGameRulesForCasino(games: string[]): GameRuleInfo[] {
  const gameSet = new Set(games.map(g => g.toLowerCase()));
  const relevantRules: GameRuleInfo[] = [];

  if (gameSet.has("blackjack") || gameSet.has("21")) {
    relevantRules.push(COMMON_HOUSE_EDGES[0]);
  }
  if (gameSet.has("baccarat")) {
    relevantRules.push(COMMON_HOUSE_EDGES[1]);
  }
  if (gameSet.has("craps")) {
    relevantRules.push(COMMON_HOUSE_EDGES[2]);
  }
  if (gameSet.has("roulette")) {
    // Default to single zero, but could be enhanced with casino-specific data
    relevantRules.push(COMMON_HOUSE_EDGES[3]);
  }

  return relevantRules;
}
