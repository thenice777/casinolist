"use client";

import { useTour } from "./StoryTourProvider";
import { TourAct, DEFAULT_ACTS } from "@/types/tour";
import { Check, ChevronRight } from "lucide-react";

const ACT_ORDER: TourAct[] = [
  "first-impressions",
  "heart-of-house",
  "full-picture",
  "your-move",
];

const ACT_LABELS: Record<TourAct, string> = {
  "first-impressions": "First Impressions",
  "heart-of-house": "The House",
  "full-picture": "Full Picture",
  "your-move": "Your Move",
};

const ACT_SHORT_LABELS: Record<TourAct, string> = {
  "first-impressions": "1",
  "heart-of-house": "2",
  "full-picture": "3",
  "your-move": "4",
};

interface ProgressIndicatorProps {
  variant?: "full" | "compact" | "minimal";
  showZones?: boolean;
}

export default function ProgressIndicator({
  variant = "full",
  showZones = true,
}: ProgressIndicatorProps) {
  const {
    state,
    currentActConfig,
    totalZonesInAct,
    goToAct,
    skipToVerdict,
  } = useTour();

  const currentActIndex = ACT_ORDER.indexOf(state.currentAct);

  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-1">
        {ACT_ORDER.map((act, index) => {
          const isCompleted = state.session.actsViewed.includes(act) && act !== state.currentAct;
          const isCurrent = act === state.currentAct;

          return (
            <button
              key={act}
              onClick={() => goToAct(act)}
              className={`w-2 h-2 rounded-full transition-all ${
                isCurrent
                  ? "w-4 bg-emerald-500"
                  : isCompleted
                  ? "bg-emerald-500/50"
                  : "bg-slate-600"
              }`}
              aria-label={ACT_LABELS[act]}
            />
          );
        })}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {ACT_ORDER.map((act, index) => {
            const isCompleted = state.session.actsViewed.includes(act) && act !== state.currentAct;
            const isCurrent = act === state.currentAct;

            return (
              <button
                key={act}
                onClick={() => goToAct(act)}
                className={`w-7 h-7 rounded-full text-xs font-medium transition-all flex items-center justify-center ${
                  isCurrent
                    ? "bg-emerald-500 text-white"
                    : isCompleted
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                }`}
                aria-label={ACT_LABELS[act]}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3" />
                ) : (
                  ACT_SHORT_LABELS[act]
                )}
              </button>
            );
          })}
        </div>

        {/* Zone progress within current act */}
        {showZones && totalZonesInAct > 1 && (
          <>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalZonesInAct }).map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index <= state.currentZoneIndex
                      ? "bg-emerald-400"
                      : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <div className="space-y-3">
      {/* Act progress */}
      <div className="flex items-center justify-between">
        {ACT_ORDER.map((act, index) => {
          const isCompleted = state.session.actsViewed.includes(act) && act !== state.currentAct;
          const isCurrent = act === state.currentAct;
          const isLast = index === ACT_ORDER.length - 1;

          return (
            <div key={act} className="flex items-center flex-1">
              <button
                onClick={() => goToAct(act)}
                className={`flex items-center gap-2 group ${
                  isCurrent ? "" : "opacity-60 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isCurrent
                      ? "bg-emerald-500 text-white ring-2 ring-emerald-500/30"
                      : isCompleted
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-slate-700 text-slate-400 group-hover:bg-slate-600"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-sm hidden md:block ${
                    isCurrent
                      ? "text-white font-medium"
                      : "text-slate-400 group-hover:text-slate-300"
                  }`}
                >
                  {ACT_LABELS[act]}
                </span>
              </button>

              {!isLast && (
                <div className="flex-1 mx-2">
                  <div
                    className={`h-0.5 rounded-full transition-all ${
                      index < currentActIndex
                        ? "bg-emerald-500/50"
                        : "bg-slate-700"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Zone progress within current act */}
      {showZones && currentActConfig && totalZonesInAct > 1 && (
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs text-slate-500">
            {currentActConfig.zones[state.currentZoneIndex]?.name}
          </span>
          <div className="flex-1 flex items-center gap-1">
            {currentActConfig.zones.map((zone, index) => (
              <div
                key={zone.id}
                className={`h-1 rounded-full flex-1 transition-all ${
                  index <= state.currentZoneIndex
                    ? "bg-emerald-400"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">
            {state.currentZoneIndex + 1}/{totalZonesInAct}
          </span>
        </div>
      )}

      {/* Skip to verdict option */}
      {state.currentAct !== "your-move" && (
        <div className="flex justify-end">
          <button
            onClick={skipToVerdict}
            className="text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            Skip to verdict <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

// Floating progress indicator for sticky footer
export function FloatingProgress() {
  const { state, sessionDurationMinutes } = useTour();

  return (
    <div className="flex items-center justify-between">
      <ProgressIndicator variant="minimal" showZones={false} />
      <div className="text-xs text-slate-500">
        {sessionDurationMinutes}m
      </div>
    </div>
  );
}
