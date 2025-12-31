"use client";

import {
  useRef,
  useEffect,
  ReactNode,
  TouchEvent as ReactTouchEvent,
  useState,
} from "react";
import { useTour } from "./StoryTourProvider";
import { ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";

interface ActContainerProps {
  children: ReactNode;
}

// Edge detection constants
const EDGE_THRESHOLD = 20; // pixels from edge to ignore (iOS gesture conflict)
const SWIPE_THRESHOLD = 50; // minimum distance for a swipe
const SWIPE_VELOCITY_THRESHOLD = 0.3; // minimum velocity for a swipe
const TRANSITION_DURATION = 300; // ms

// Transition direction type
type TransitionDirection = "left" | "right" | "up" | "down" | "fade";

export default function ActContainer({ children }: ActContainerProps) {
  const {
    state,
    currentActConfig,
    totalZonesInAct,
    isFirstZone,
    isLastZone,
    isLastAct,
    nextZone,
    prevZone,
    nextAct,
    prevAct,
  } = useTour();

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>("fade");
  const [transitionPhase, setTransitionPhase] = useState<"exit" | "enter" | null>(null);

  // Handle touch events for zone navigation
  const handleTouchStart = (e: ReactTouchEvent) => {
    const touch = e.touches[0];

    // Ignore touches near edges (iOS gesture conflict)
    if (
      touch.clientX < EDGE_THRESHOLD ||
      touch.clientX > window.innerWidth - EDGE_THRESHOLD
    ) {
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: ReactTouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    const velocity = Math.abs(deltaX) / deltaTime;

    // Only register horizontal swipes
    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > SWIPE_THRESHOLD &&
      velocity > SWIPE_VELOCITY_THRESHOLD
    ) {
      if (deltaX > 0) {
        // Swipe right - go to previous zone
        if (!isFirstZone) {
          handleTransition(() => prevZone(), "right");
        }
      } else {
        // Swipe left - go to next zone
        if (!isLastZone) {
          handleTransition(() => nextZone(), "left");
        }
      }
    }

    touchStartRef.current = null;
  };

  const handleTransition = (action: () => void, direction: TransitionDirection = "fade") => {
    if (isTransitioning) return; // Prevent double transitions

    setTransitionDirection(direction);
    setTransitionPhase("exit");
    setIsTransitioning(true);

    // Exit phase
    setTimeout(() => {
      action();
      setTransitionPhase("enter");

      // Enter phase completes
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionPhase(null);
      }, TRANSITION_DURATION);
    }, TRANSITION_DURATION / 2);
  };

  // Get transition class based on direction and phase
  const getTransitionClasses = (): string => {
    if (!isTransitioning || !transitionPhase) {
      return "opacity-100 translate-x-0 translate-y-0";
    }

    const baseClasses = "transition-all ease-out";

    if (transitionDirection === "left") {
      return transitionPhase === "exit"
        ? `${baseClasses} opacity-0 -translate-x-8`
        : `${baseClasses} opacity-0 translate-x-8`;
    }

    if (transitionDirection === "right") {
      return transitionPhase === "exit"
        ? `${baseClasses} opacity-0 translate-x-8`
        : `${baseClasses} opacity-0 -translate-x-8`;
    }

    if (transitionDirection === "up") {
      return transitionPhase === "exit"
        ? `${baseClasses} opacity-0 -translate-y-8`
        : `${baseClasses} opacity-0 translate-y-8`;
    }

    if (transitionDirection === "down") {
      return transitionPhase === "exit"
        ? `${baseClasses} opacity-0 translate-y-8`
        : `${baseClasses} opacity-0 -translate-y-8`;
    }

    // Default fade
    return `${baseClasses} opacity-0`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return; // Don't navigate during transition

      if (e.key === "ArrowLeft" && !isFirstZone) {
        handleTransition(() => prevZone(), "right");
      } else if (e.key === "ArrowRight" && !isLastZone) {
        handleTransition(() => nextZone(), "left");
      } else if (e.key === "ArrowUp" && !state.session.actsViewed.includes(state.currentAct)) {
        handleTransition(() => prevAct(), "down");
      } else if (e.key === "ArrowDown" && !isLastAct) {
        handleTransition(() => nextAct(), "up");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFirstZone, isLastZone, isLastAct, prevZone, nextZone, prevAct, nextAct, state.currentAct, state.session.actsViewed, isTransitioning]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[calc(100vh-200px)] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Content with transition */}
      <div
        className={`duration-150 ${getTransitionClasses()}`}
        style={{ transitionDuration: `${TRANSITION_DURATION / 2}ms` }}
      >
        {children}
      </div>

      {/* Zone navigation indicators */}
      {totalZonesInAct > 1 && (
        <>
          {/* Previous zone indicator */}
          {!isFirstZone && (
            <button
              onClick={() => handleTransition(() => prevZone(), "right")}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all opacity-50 hover:opacity-100 z-10 active:scale-95"
              aria-label="Previous zone"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next zone indicator */}
          {!isLastZone && (
            <button
              onClick={() => handleTransition(() => nextZone(), "left")}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800/80 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all opacity-50 hover:opacity-100 z-10 active:scale-95"
              aria-label="Next zone"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Zone dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {Array.from({ length: totalZonesInAct }).map((_, index) => {
              const diff = index - state.currentZoneIndex;
              const direction: TransitionDirection = diff > 0 ? "left" : "right";

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (diff === 0 || isTransitioning) return;
                    handleTransition(() => {
                      // Navigate to specific zone
                      if (diff > 0) {
                        for (let i = 0; i < diff; i++) nextZone();
                      } else if (diff < 0) {
                        for (let i = 0; i < Math.abs(diff); i++) prevZone();
                      }
                    }, direction);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === state.currentZoneIndex
                      ? "w-4 bg-emerald-500"
                      : index < state.currentZoneIndex
                      ? "bg-emerald-500/50 hover:bg-emerald-400/70"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to zone ${index + 1}`}
                  disabled={isTransitioning || index === state.currentZoneIndex}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Next Act button (shown when at last zone) */}
      {isLastZone && !isLastAct && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
          <button
            onClick={() => handleTransition(() => nextAct(), "up")}
            disabled={isTransitioning}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            Next: {getNextActName(state.currentAct)}
            <ArrowUp className="w-4 h-4 rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
}

// Helper to get next act name
function getNextActName(currentAct: string): string {
  const actOrder = [
    "first-impressions",
    "heart-of-house",
    "full-picture",
    "your-move",
  ];
  const actNames: Record<string, string> = {
    "first-impressions": "First Impressions",
    "heart-of-house": "The House",
    "full-picture": "Full Picture",
    "your-move": "Your Move",
  };

  const currentIndex = actOrder.indexOf(currentAct);
  if (currentIndex < actOrder.length - 1) {
    return actNames[actOrder[currentIndex + 1]];
  }
  return "";
}

// Zone content wrapper
interface ZoneContentProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function ZoneContent({ children, title, subtitle }: ZoneContentProps) {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      {(title || subtitle) && (
        <div className="mb-6">
          {subtitle && (
            <p className="text-emerald-400 text-sm font-medium uppercase tracking-wide mb-1">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
