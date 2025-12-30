"use client";

import { useState, useEffect } from "react";
import { Shield, Phone, ExternalLink, Clock, AlertCircle } from "lucide-react";
import { useTour } from "./StoryTourProvider";
import { getHelplineForCountry } from "@/lib/geo";

interface ResponsibleGamblingGateProps {
  casinoName: string;
  countryCode?: string;
}

export default function ResponsibleGamblingGate({
  casinoName,
  countryCode,
}: ResponsibleGamblingGateProps) {
  const { state, acceptGate } = useTour();
  const [isAnimating, setIsAnimating] = useState(false);
  const [helpline, setHelpline] = useState(getHelplineForCountry(null));

  useEffect(() => {
    // Get regional helpline based on user's country
    const userHelpline = getHelplineForCountry(countryCode || null);
    setHelpline(userHelpline);
  }, [countryCode]);

  const handleAccept = () => {
    setIsAnimating(true);
    setTimeout(() => {
      acceptGate();
    }, 300);
  };

  if (state.isGateAccepted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="max-w-lg mx-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900/50 to-slate-800 px-6 py-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Before You Explore</h2>
              <p className="text-slate-400 text-sm">{casinoName}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-5">
          {/* Key reminders */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-400 text-sm font-bold">1</span>
              </div>
              <p className="text-slate-300 text-sm">
                Gambling is <strong className="text-white">entertainment</strong>, not a way to make money.
                The house always has an edge.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-400 text-sm font-bold">2</span>
              </div>
              <p className="text-slate-300 text-sm">
                <strong className="text-white">Set limits</strong> before you play.
                Only gamble with money you can afford to lose.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-emerald-400 text-sm font-bold">3</span>
              </div>
              <p className="text-slate-300 text-sm">
                If gambling stops being fun, <strong className="text-white">take a break</strong>.
                Help is available 24/7.
              </p>
            </div>
          </div>

          {/* Helpline info */}
          <div className="bg-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">{helpline.name}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {helpline.phone && (
                <a
                  href={`tel:${helpline.phone.replace(/\s/g, "")}`}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  {helpline.phone}
                </a>
              )}
              <a
                href={helpline.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                Visit website <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Session notice */}
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              We'll gently remind you to take breaks if you've been exploring for a while.
              This tour is for information purposes only.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700">
          <button
            onClick={handleAccept}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            I understand - Start exploring
          </button>
          <p className="text-center text-slate-500 text-xs mt-3">
            18+ only. Gamble responsibly.
          </p>
        </div>
      </div>
    </div>
  );
}

// Reality check component (shown during tour)
interface RealityCheckProps {
  type: "subtle" | "prominent" | "interstitial";
  sessionMinutes: number;
  onContinue: () => void;
  onTakeBreak: () => void;
  helpline: { name: string; url: string; phone?: string };
}

export function RealityCheck({
  type,
  sessionMinutes,
  onContinue,
  onTakeBreak,
  helpline,
}: RealityCheckProps) {
  if (type === "subtle") {
    return (
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
        <div className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 shadow-lg flex items-center gap-3">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-300">
            You've been exploring for {sessionMinutes} minutes
          </span>
          <div className="flex gap-2">
            <button
              onClick={onContinue}
              className="text-xs text-emerald-400 hover:text-emerald-300"
            >
              Continue
            </button>
            <button
              onClick={onTakeBreak}
              className="text-xs text-slate-400 hover:text-white"
            >
              Take a break
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === "prominent") {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-40 animate-slide-up">
        <div className="max-w-lg mx-auto bg-slate-800 border border-amber-500/30 rounded-xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">
                You've been exploring for {sessionMinutes} minutes
              </p>
              <p className="text-sm text-slate-400 mb-3">
                Before visiting any casino, remember to set a budget. How much can you afford to lose for entertainment?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onContinue}
                  className="text-sm bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Continue exploring
                </button>
                <button
                  onClick={onTakeBreak}
                  className="text-sm text-amber-400 hover:text-amber-300 px-4 py-2"
                >
                  Set budget reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interstitial (45+ minutes)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm">
      <div className="max-w-md mx-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-900/50 to-slate-800 px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Time for a break?</h3>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <p className="text-slate-300">
            You've been exploring for <strong className="text-white">{sessionMinutes} minutes</strong>.
            That's a significant amount of time.
          </p>

          <p className="text-slate-400 text-sm">
            Gambling should be entertainment, not an escape. If you're concerned about gambling,
            help is available.
          </p>

          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-sm text-slate-300 mb-1">{helpline.name}</p>
            {helpline.phone && (
              <a
                href={`tel:${helpline.phone.replace(/\s/g, "")}`}
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                {helpline.phone}
              </a>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-700 flex gap-3">
          <button
            onClick={onTakeBreak}
            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Take a break
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
