"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTour } from "./StoryTourProvider";

interface SessionTrackerProps {
  casinoName: string;
}

/**
 * SessionTracker Component
 *
 * Invisible component that tracks user session analytics for the Story Tour.
 * Sends analytics data when:
 * - User leaves the page (beforeunload)
 * - User navigates away (component unmount)
 * - Tour is completed (last act, last zone)
 *
 * Analytics tracked:
 * - Session duration
 * - Acts and zones viewed
 * - CTA clicks with locations
 * - Whether tour was completed
 * - Reality checks shown
 * - Filters used
 */
export default function SessionTracker({ casinoName }: SessionTrackerProps) {
  const { state, isLastAct, isLastZone } = useTour();
  const hasSentAnalytics = useRef(false);
  const lastActZoneRef = useRef({ act: "", zone: -1 });

  // Send analytics to API
  const sendAnalytics = useCallback(
    async (completed: boolean = false) => {
      // Prevent duplicate sends
      if (hasSentAnalytics.current) return;
      if (!state.casinoId || !state.isGateAccepted) return;

      hasSentAnalytics.current = true;

      const sessionDurationMs = Date.now() - state.session.startTime;

      const payload = {
        casinoId: state.casinoId,
        casinoType: state.casinoType,
        casinoName,
        sessionDurationMs,
        actsViewed: state.session.actsViewed,
        zonesViewed: state.session.zonesViewed,
        ctaClicks: state.session.ctaClicks.map((c) => ({
          location: c.location,
          actId: c.actId,
        })),
        completedTour: completed,
        realityChecksShown: state.session.realityChecksShown,
        filters: state.filters,
      };

      try {
        // Use sendBeacon for reliable delivery on page unload
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            "/api/tour-analytics",
            JSON.stringify(payload)
          );
        } else {
          // Fallback to fetch
          await fetch("/api/tour-analytics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true,
          });
        }
      } catch (error) {
        // Silently fail - analytics should not impact user experience
        console.debug("Tour analytics send failed:", error);
      }
    },
    [state, casinoName]
  );

  // Track if tour is completed (reached last zone of last act)
  useEffect(() => {
    const isNewPosition =
      lastActZoneRef.current.act !== state.currentAct ||
      lastActZoneRef.current.zone !== state.currentZoneIndex;

    if (isNewPosition) {
      lastActZoneRef.current = {
        act: state.currentAct,
        zone: state.currentZoneIndex,
      };

      // Check if tour is completed
      if (isLastAct && isLastZone && state.isGateAccepted) {
        sendAnalytics(true);
      }
    }
  }, [state.currentAct, state.currentZoneIndex, isLastAct, isLastZone, state.isGateAccepted, sendAnalytics]);

  // Send analytics on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!hasSentAnalytics.current) {
        sendAnalytics(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !hasSentAnalytics.current) {
        sendAnalytics(false);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Send analytics on unmount if not already sent
      if (!hasSentAnalytics.current && state.isGateAccepted) {
        sendAnalytics(false);
      }
    };
  }, [sendAnalytics, state.isGateAccepted]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Hook to get formatted session statistics
 */
export function useSessionStats() {
  const { state, sessionDurationMinutes } = useTour();

  const totalActs = 4; // Fixed number of acts
  const actsViewedCount = state.session.actsViewed.length;
  const zonesViewedCount = state.session.zonesViewed.length;
  const ctaClicksCount = state.session.ctaClicks.length;
  const progressPercent = Math.round((actsViewedCount / totalActs) * 100);

  // Format duration as mm:ss or h:mm:ss
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      const mins = Math.floor(minutes);
      const secs = Math.round((minutes - mins) * 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}:${mins.toString().padStart(2, "0")}:00`;
  };

  return {
    duration: formatDuration(sessionDurationMinutes),
    durationMinutes: sessionDurationMinutes,
    actsViewed: actsViewedCount,
    totalActs,
    zonesViewed: zonesViewedCount,
    ctaClicks: ctaClicksCount,
    progressPercent,
    realityChecksShown: state.session.realityChecksShown,
    isComplete: state.session.actsViewed.includes("your-move"),
  };
}
