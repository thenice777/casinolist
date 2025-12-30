"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import {
  TourState,
  TourAction,
  TourAct,
  TourSession,
  TourCTAClick,
  InterestFilters,
  REALITY_CHECK_INTERVALS,
  DEFAULT_ACTS,
} from "@/types/tour";

// Initial session state
const createInitialSession = (): TourSession => ({
  startTime: Date.now(),
  actsViewed: [],
  zonesViewed: [],
  totalTimeMs: 0,
  realityChecksShown: 0,
  ctaClicks: [],
  responsibleGamblingGateAccepted: false,
});

// Initial tour state
const initialState: TourState = {
  casinoId: "",
  casinoType: "land_based",
  casino: null,
  currentAct: "first-impressions",
  currentZoneIndex: 0,
  isActLocked: true,
  filters: {},
  session: createInitialSession(),
  isGateAccepted: false,
  isLoading: true,
  showRealityCheck: false,
  realityCheckType: null,
};

// Tour reducer
function tourReducer(state: TourState, action: TourAction): TourState {
  switch (action.type) {
    case "INIT_TOUR": {
      const casino = action.payload.casino;
      const casinoType = "address" in casino ? "land_based" : "online";
      return {
        ...state,
        casinoId: casino.id,
        casinoType,
        casino,
        isLoading: false,
        session: {
          ...createInitialSession(),
          actsViewed: ["first-impressions"],
        },
      };
    }

    case "ACCEPT_GATE":
      return {
        ...state,
        isGateAccepted: true,
        session: {
          ...state.session,
          responsibleGamblingGateAccepted: true,
        },
      };

    case "SET_ACT": {
      const newAct = action.payload;
      const actConfig = DEFAULT_ACTS.find((a) => a.id === newAct);
      return {
        ...state,
        currentAct: newAct,
        currentZoneIndex: 0,
        session: {
          ...state.session,
          actsViewed: state.session.actsViewed.includes(newAct)
            ? state.session.actsViewed
            : [...state.session.actsViewed, newAct],
          zonesViewed: actConfig
            ? [
                ...state.session.zonesViewed,
                ...actConfig.zones
                  .map((z) => z.id)
                  .filter((id) => !state.session.zonesViewed.includes(id)),
              ]
            : state.session.zonesViewed,
        },
      };
    }

    case "SET_ZONE": {
      const actConfig = DEFAULT_ACTS.find((a) => a.id === state.currentAct);
      const zoneId = actConfig?.zones[action.payload]?.id;
      return {
        ...state,
        currentZoneIndex: action.payload,
        session: zoneId
          ? {
              ...state.session,
              zonesViewed: state.session.zonesViewed.includes(zoneId)
                ? state.session.zonesViewed
                : [...state.session.zonesViewed, zoneId],
            }
          : state.session,
      };
    }

    case "NEXT_ZONE": {
      const actConfig = DEFAULT_ACTS.find((a) => a.id === state.currentAct);
      const maxZones = actConfig?.zones.length || 1;
      const newIndex = Math.min(state.currentZoneIndex + 1, maxZones - 1);
      const zoneId = actConfig?.zones[newIndex]?.id;
      return {
        ...state,
        currentZoneIndex: newIndex,
        session: zoneId
          ? {
              ...state.session,
              zonesViewed: state.session.zonesViewed.includes(zoneId)
                ? state.session.zonesViewed
                : [...state.session.zonesViewed, zoneId],
            }
          : state.session,
      };
    }

    case "PREV_ZONE": {
      const newIndex = Math.max(state.currentZoneIndex - 1, 0);
      return {
        ...state,
        currentZoneIndex: newIndex,
      };
    }

    case "NEXT_ACT": {
      const actOrder: TourAct[] = [
        "first-impressions",
        "heart-of-house",
        "full-picture",
        "your-move",
      ];
      const currentIndex = actOrder.indexOf(state.currentAct);
      const nextAct = actOrder[Math.min(currentIndex + 1, actOrder.length - 1)];
      const actConfig = DEFAULT_ACTS.find((a) => a.id === nextAct);
      return {
        ...state,
        currentAct: nextAct,
        currentZoneIndex: 0,
        session: {
          ...state.session,
          actsViewed: state.session.actsViewed.includes(nextAct)
            ? state.session.actsViewed
            : [...state.session.actsViewed, nextAct],
          zonesViewed: actConfig
            ? [...state.session.zonesViewed, actConfig.zones[0]?.id].filter(
                Boolean
              )
            : state.session.zonesViewed,
        },
      };
    }

    case "PREV_ACT": {
      const actOrder: TourAct[] = [
        "first-impressions",
        "heart-of-house",
        "full-picture",
        "your-move",
      ];
      const currentIndex = actOrder.indexOf(state.currentAct);
      const prevAct = actOrder[Math.max(currentIndex - 1, 0)];
      return {
        ...state,
        currentAct: prevAct,
        currentZoneIndex: 0,
      };
    }

    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "RECORD_CTA_CLICK":
      return {
        ...state,
        session: {
          ...state.session,
          ctaClicks: [...state.session.ctaClicks, action.payload],
        },
      };

    case "SHOW_REALITY_CHECK":
      return {
        ...state,
        showRealityCheck: true,
        realityCheckType: action.payload,
        session: {
          ...state.session,
          realityChecksShown: state.session.realityChecksShown + 1,
        },
      };

    case "DISMISS_REALITY_CHECK":
      return {
        ...state,
        showRealityCheck: false,
        realityCheckType: null,
      };

    case "END_TOUR":
      return {
        ...state,
        session: {
          ...state.session,
          totalTimeMs: Date.now() - state.session.startTime,
        },
      };

    default:
      return state;
  }
}

// Context type
interface TourContextType {
  state: TourState;
  dispatch: React.Dispatch<TourAction>;
  // Convenience methods
  initTour: (casino: LandBasedCasino | OnlineCasino) => void;
  acceptGate: () => void;
  goToAct: (act: TourAct) => void;
  goToZone: (index: number) => void;
  nextZone: () => void;
  prevZone: () => void;
  nextAct: () => void;
  prevAct: () => void;
  skipToVerdict: () => void;
  updateFilters: (filters: Partial<InterestFilters>) => void;
  recordCTAClick: (location: string) => void;
  endTour: () => TourSession;
  // Computed values
  currentActConfig: (typeof DEFAULT_ACTS)[number] | undefined;
  totalZonesInAct: number;
  isFirstAct: boolean;
  isLastAct: boolean;
  isFirstZone: boolean;
  isLastZone: boolean;
  sessionDurationMinutes: number;
}

const TourContext = createContext<TourContextType | null>(null);

// Provider component
interface StoryTourProviderProps {
  children: ReactNode;
}

export function StoryTourProvider({ children }: StoryTourProviderProps) {
  const [state, dispatch] = useReducer(tourReducer, initialState);

  // Session timer for reality checks
  useEffect(() => {
    if (!state.isGateAccepted) return;

    const checkInterval = setInterval(() => {
      const elapsedMs = Date.now() - state.session.startTime;
      const elapsedMinutes = Math.floor(elapsedMs / 60000);

      // Check if we should show a reality check
      for (const interval of REALITY_CHECK_INTERVALS) {
        // Show if we've passed this interval and haven't shown it yet
        if (
          elapsedMinutes >= interval &&
          state.session.realityChecksShown < REALITY_CHECK_INTERVALS.indexOf(interval) + 1
        ) {
          let checkType: TourState["realityCheckType"] = "subtle";
          if (interval === 30) checkType = "prominent";
          if (interval === 45) checkType = "interstitial";

          dispatch({ type: "SHOW_REALITY_CHECK", payload: checkType });
          break;
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval);
  }, [state.isGateAccepted, state.session.startTime, state.session.realityChecksShown]);

  // Convenience methods
  const initTour = useCallback((casino: LandBasedCasino | OnlineCasino) => {
    dispatch({ type: "INIT_TOUR", payload: { casino } });
  }, []);

  const acceptGate = useCallback(() => {
    dispatch({ type: "ACCEPT_GATE" });
  }, []);

  const goToAct = useCallback((act: TourAct) => {
    dispatch({ type: "SET_ACT", payload: act });
  }, []);

  const goToZone = useCallback((index: number) => {
    dispatch({ type: "SET_ZONE", payload: index });
  }, []);

  const nextZone = useCallback(() => {
    dispatch({ type: "NEXT_ZONE" });
  }, []);

  const prevZone = useCallback(() => {
    dispatch({ type: "PREV_ZONE" });
  }, []);

  const nextAct = useCallback(() => {
    dispatch({ type: "NEXT_ACT" });
  }, []);

  const prevAct = useCallback(() => {
    dispatch({ type: "PREV_ACT" });
  }, []);

  const skipToVerdict = useCallback(() => {
    dispatch({ type: "SET_ACT", payload: "your-move" });
  }, []);

  const updateFilters = useCallback((filters: Partial<InterestFilters>) => {
    dispatch({ type: "UPDATE_FILTERS", payload: filters });
  }, []);

  const recordCTAClick = useCallback(
    (location: string) => {
      dispatch({
        type: "RECORD_CTA_CLICK",
        payload: {
          location,
          timestamp: Date.now(),
          actId: state.currentAct,
        },
      });
    },
    [state.currentAct]
  );

  const endTour = useCallback((): TourSession => {
    dispatch({ type: "END_TOUR" });
    return {
      ...state.session,
      totalTimeMs: Date.now() - state.session.startTime,
    };
  }, [state.session]);

  // Computed values
  const currentActConfig = DEFAULT_ACTS.find((a) => a.id === state.currentAct);
  const totalZonesInAct = currentActConfig?.zones.length || 0;
  const actOrder: TourAct[] = [
    "first-impressions",
    "heart-of-house",
    "full-picture",
    "your-move",
  ];
  const currentActIndex = actOrder.indexOf(state.currentAct);
  const isFirstAct = currentActIndex === 0;
  const isLastAct = currentActIndex === actOrder.length - 1;
  const isFirstZone = state.currentZoneIndex === 0;
  const isLastZone = state.currentZoneIndex === totalZonesInAct - 1;
  const sessionDurationMinutes = Math.floor(
    (Date.now() - state.session.startTime) / 60000
  );

  const value: TourContextType = {
    state,
    dispatch,
    initTour,
    acceptGate,
    goToAct,
    goToZone,
    nextZone,
    prevZone,
    nextAct,
    prevAct,
    skipToVerdict,
    updateFilters,
    recordCTAClick,
    endTour,
    currentActConfig,
    totalZonesInAct,
    isFirstAct,
    isLastAct,
    isFirstZone,
    isLastZone,
    sessionDurationMinutes,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

// Hook to use tour context
export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a StoryTourProvider");
  }
  return context;
}
