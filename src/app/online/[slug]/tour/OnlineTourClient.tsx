"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnlineCasino } from "@/types/casino";
import { NarrativeTemplate, CulturalRegion } from "@/types/tour";
import { getHelplineForCountry } from "@/lib/geo";

// Story Tour Components
import { StoryTourProvider, useTour } from "@/components/story-tour/StoryTourProvider";
import ResponsibleGamblingGate, {
  RealityCheck,
} from "@/components/story-tour/ResponsibleGamblingGate";
import ActContainer from "@/components/story-tour/ActContainer";
import ProgressIndicator, {
  FloatingProgress,
} from "@/components/story-tour/ProgressIndicator";

// Act Components - Reuse from land-based (they support both types)
import FirstImpressionsAct from "@/components/story-tour/acts/FirstImpressionsAct";
import HeartOfHouseAct from "@/components/story-tour/acts/HeartOfHouseAct";
import FullPictureAct from "@/components/story-tour/acts/FullPictureAct";
import YourMoveAct from "@/components/story-tour/acts/YourMoveAct";

import { X, ArrowLeft, Clock, Globe } from "lucide-react";
import Link from "next/link";

interface OnlineTourClientProps {
  casino: OnlineCasino;
  countryCode: string | null;
  narrativeTemplate: NarrativeTemplate;
  culturalRegion: CulturalRegion;
}

export default function OnlineTourClient({
  casino,
  countryCode,
  narrativeTemplate,
  culturalRegion,
}: OnlineTourClientProps) {
  return (
    <StoryTourProvider>
      <TourContent
        casino={casino}
        countryCode={countryCode}
        narrativeTemplate={narrativeTemplate}
        culturalRegion={culturalRegion}
      />
    </StoryTourProvider>
  );
}

function TourContent({
  casino,
  countryCode,
  narrativeTemplate,
  culturalRegion,
}: OnlineTourClientProps) {
  const router = useRouter();
  const {
    state,
    initTour,
    dispatch,
    sessionDurationMinutes,
  } = useTour();
  const [helpline, setHelpline] = useState(getHelplineForCountry(null));

  // Initialize tour on mount
  useEffect(() => {
    initTour(casino);
    setHelpline(getHelplineForCountry(countryCode));
  }, [casino, countryCode, initTour]);

  // Handle reality check dismissal
  const handleContinue = () => {
    dispatch({ type: "DISMISS_REALITY_CHECK" });
  };

  const handleTakeBreak = () => {
    dispatch({ type: "DISMISS_REALITY_CHECK" });
    router.push(`/online/${casino.slug}`);
  };

  // Show loading state
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading tour...</div>
      </div>
    );
  }

  // Render current act
  const renderCurrentAct = () => {
    switch (state.currentAct) {
      case "first-impressions":
        return <FirstImpressionsAct casino={casino} />;
      case "heart-of-house":
        return <HeartOfHouseAct casino={casino} />;
      case "full-picture":
        return <FullPictureAct casino={casino} />;
      case "your-move":
        return <YourMoveAct casino={casino} />;
      default:
        return <FirstImpressionsAct casino={casino} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Responsible Gambling Gate */}
      {!state.isGateAccepted && (
        <ResponsibleGamblingGate
          casinoName={casino.name}
          countryCode={countryCode || undefined}
          isOnline
        />
      )}

      {/* Reality Check Overlays */}
      {state.showRealityCheck && state.realityCheckType && (
        <RealityCheck
          type={state.realityCheckType}
          sessionMinutes={sessionDurationMinutes}
          onContinue={handleContinue}
          onTakeBreak={handleTakeBreak}
          helpline={helpline}
        />
      )}

      {/* Main Tour Content */}
      {state.isGateAccepted && (
        <>
          {/* Header */}
          <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href={`/online/${casino.slug}`}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Exit tour"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-3">
                  {casino.logoUrl ? (
                    <img
                      src={casino.logoUrl}
                      alt={casino.name}
                      className="w-8 h-8 rounded bg-white p-1"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-emerald-600 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-white font-medium">{casino.name}</h1>
                    <p className="text-slate-500 text-xs">Online Casino Tour</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Session timer */}
                <div className="hidden md:flex items-center gap-1 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{sessionDurationMinutes}m</span>
                </div>

                {/* Exit button */}
                <Link
                  href={`/online/${casino.slug}`}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Close tour"
                >
                  <X className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Progress indicator (desktop) */}
            <div className="hidden md:block max-w-4xl mx-auto px-6 py-4">
              <ProgressIndicator variant="full" />
            </div>

            {/* Progress indicator (mobile) */}
            <div className="md:hidden px-4 pb-3">
              <ProgressIndicator variant="compact" />
            </div>
          </header>

          {/* Act Content */}
          <main className="pb-24">
            <ActContainer>{renderCurrentAct()}</ActContainer>
          </main>

          {/* Sticky Footer (mobile) */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 p-4 z-30 md:hidden">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <FloatingProgress />
              <span className="text-xs text-slate-500">
                18+ | Gamble Responsibly
              </span>
            </div>
          </div>

          {/* Responsible Gambling Footer (desktop) */}
          <div className="hidden md:block fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 py-2 z-30">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-slate-500">
              <span>18+ | Gamble Responsibly | {helpline.name}</span>
              <span>Session: {sessionDurationMinutes} minutes</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
