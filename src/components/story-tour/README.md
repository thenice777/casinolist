# Story Tour Feature - Developer Documentation

## Overview

The Story Tour is an immersive, narrative-driven experience that allows users to virtually walk through casinos. It serves users in the **planning phase** of their casino decision journey, providing deeper engagement than the standard profile page.

**Key Design Decisions:**
- Tour is **ADDITIVE** to the profile page, not a replacement
- 4-act emotional arc structure (not 5-act linear)
- **Act-locked navigation** (no simultaneous vertical + horizontal scroll)
- **Behavior-based filters** (not persona-based lenses)
- Responsible gambling integration with session tracking

## Architecture

```
src/
├── app/casino/[slug]/tour/
│   ├── page.tsx              # Server component with eligibility check
│   └── StoryTourClient.tsx   # Client wrapper with state management
│
├── app/online/[slug]/tour/
│   ├── page.tsx              # Online casino tour page
│   └── OnlineTourClient.tsx  # Online tour client wrapper
│
├── components/story-tour/
│   ├── StoryTourProvider.tsx      # Context + state management
│   ├── ResponsibleGamblingGate.tsx # Pre-tour acknowledgment + reality checks
│   ├── ActContainer.tsx           # Act-locked navigation container
│   ├── ProgressIndicator.tsx      # 4-act + zone progress UI
│   ├── PlayerDetailsPanel.tsx     # Expandable data tables (odds, rules)
│   ├── InterestFilters.tsx        # Behavior-based personalization
│   ├── index.ts                   # Re-exports for cleaner imports
│   │
│   └── acts/
│       ├── FirstImpressionsAct.tsx # Act 1: Arrival, trust signals
│       ├── HeartOfHouseAct.tsx     # Act 2: Gaming floor, tables, poker
│       ├── FullPictureAct.tsx      # Act 3: Amenities, dining, who it's for
│       └── YourMoveAct.tsx         # Act 4: Verdict, ratings, CTA
│
├── lib/
│   ├── tour-eligibility.ts   # Eligibility logic + cultural region mapping
│   └── tour-narrative.ts     # Dynamic narrative generation utilities
│
└── types/
    └── tour.ts               # All tour-related TypeScript types
```

## State Management

The tour uses React Context with a reducer pattern. Key state:

```typescript
interface TourState {
  casinoId: string;
  casinoType: "land_based" | "online";
  casino: LandBasedCasino | OnlineCasino | null;

  currentAct: TourAct;      // "first-impressions" | "heart-of-house" | etc.
  currentZoneIndex: number; // Zone within current act
  isActLocked: boolean;     // Vertical scroll disabled

  filters: InterestFilters;
  session: TourSession;     // Time tracking for RG

  isGateAccepted: boolean;  // RG gate passed
  showRealityCheck: boolean;
  realityCheckType: "subtle" | "prominent" | "interstitial" | null;
}
```

### Key Actions

```typescript
// Navigation
dispatch({ type: "SET_ACT", payload: "heart-of-house" });
dispatch({ type: "NEXT_ZONE" });
dispatch({ type: "PREV_ZONE" });
dispatch({ type: "NEXT_ACT" });

// Responsible Gambling
dispatch({ type: "ACCEPT_GATE" });
dispatch({ type: "SHOW_REALITY_CHECK", payload: "prominent" });
dispatch({ type: "DISMISS_REALITY_CHECK" });

// Analytics
dispatch({ type: "RECORD_CTA_CLICK", payload: { location: "tour_act2_gaming", ... } });
```

## The 4-Act Structure

| Act | ID | Emotional Beat | Zones |
|-----|----|----|-------|
| 1 | `first-impressions` | Anticipation, curiosity | arrival, trust |
| 2 | `heart-of-house` | Engagement, discovery | gaming-overview, table-games, poker, sportsbook |
| 3 | `full-picture` | Depth, consideration | amenities, dining, who-its-for |
| 4 | `your-move` | Decision, confidence | verdict, best-for |

## Navigation Model: Act-Locked

**Problem solved:** Vertical + horizontal simultaneous scroll creates gesture collision (15-75° diagonal ambiguity).

**Solution:**
- Vertical scroll is **disabled** within an act
- Horizontal swipe browses zones within the act
- Explicit "Next Act" button advances to next act
- Matches mental model from Instagram Stories / TikTok

**Gesture safety:**
- 20px edge ignore zones (iOS back gesture)
- 34px bottom safe area (home indicator)
- No pull-down (OS refresh conflict)

## Tour Eligibility

A casino must meet these criteria to be tour-eligible:

```typescript
// From tour-eligibility.ts

// Must be active
if (!casino.isActive) return false;

// Must have destination-tier experience
const STORY_ELIGIBLE_TIERS = [
  "destination",
  "historic_icon",
  "high_roller_haven",
  "poker_paradise"
];

// Must have minimum data
const hasEnoughData =
  hasDescription &&
  hasGames >= 3 &&
  (hasRating || hasReviews) &&
  (hasAmenities >= 2 || hasExperienceTiers);
```

## Regional Narrative Templates

Different casino regions get different narrative styles:

| Template | Regions | Style |
|----------|---------|-------|
| `journey` | North America, Latin America | Full 4-act story, entertainment focus |
| `ritual` | Monaco, Baden-Baden | Tradition emphasis, entrance IS the experience |
| `guide` | UK, Australia | Practical, understated, functional |
| `atmosphere` | Macau, Singapore | Relationship-focus, hospitality-first |
| `functional` | Local casinos | Quick facts, no narrative pretense |

Currently, only the `journey` template is fully implemented. Others default to journey.

## Responsible Gambling Integration

### Pre-Tour Gate
Required acknowledgment before tour starts. Shows:
- 3 key reminders about responsible gambling
- Regional helpline (detected via geo headers)
- Session time tracking notice

### Reality Checks
Triggered at 15, 30, and 45 minutes:
- **15 min (subtle):** Floating pill notification
- **30 min (prominent):** Sticky banner with budget reminder
- **45 min (interstitial):** Full-screen modal with helpline

## CTA Tracking

All CTAs use `subid` parameter for attribution:

| Location | subid |
|----------|-------|
| Act 1 soft CTA | `tour_act1_soft` |
| Act 2 gaming CTA | `tour_act2_gaming` |
| Act 4 verdict CTA | `tour_verdict_primary` |
| Act 4 final CTA | `tour_verdict_final` |
| Sticky footer | `tour_sticky` |

## Adding a New Act

1. Create component in `acts/` folder following pattern:
```typescript
export default function NewAct({ casino }: { casino: LandBasedCasino | OnlineCasino }) {
  const { state } = useTour();
  // Render based on state.currentZoneIndex
}
```

2. Add to `DEFAULT_ACTS` in `types/tour.ts`
3. Add to switch statement in `StoryTourClient.tsx`
4. Update `ACT_ORDER` in `ProgressIndicator.tsx`

## Adding a New Zone

1. Add to the appropriate act's zones array in `DEFAULT_ACTS`
2. Add conditional render in the act component
3. Zone data comes from casino object fields

## Testing

No automated tests yet. Manual testing checklist:
- [ ] Tour loads for eligible casino
- [ ] Tour shows "not available" for ineligible casino
- [ ] RG gate appears before tour content
- [ ] Navigation works (swipe, buttons, keyboard)
- [ ] Zone transitions animate correctly
- [ ] Reality checks appear at 15/30/45 minutes
- [ ] CTAs track with correct subid
- [ ] Mobile gestures work correctly
- [ ] Edge swipes don't conflict with OS gestures

## Performance Considerations

- Acts are not lazy-loaded (all 4 mount immediately)
- Casino data fetched server-side (no client fetch)
- No heavy animations or 3D
- Device tier detection not yet implemented

## Future Enhancements (Phase 2+)

- [x] Interest filters (behavior-based personalization) - `InterestFilters.tsx`
- [x] Online casino tour (`/online/[slug]/tour`) - Implemented
- [x] Player details panels (odds, rules) - `PlayerDetailsPanel.tsx`
- [x] Dynamic narrative generation - `tour-narrative.ts`
- [ ] Full session tracking with analytics
- [ ] Regional narrative template variations (currently all use "journey")
- [ ] Device-tier performance adaptation
- [ ] `prefers-reduced-motion` Linear Mode
- [ ] Audio ambiance (optional)

## Key Files Quick Reference

| Purpose | File |
|---------|------|
| Types | `/src/types/tour.ts` |
| Eligibility | `/src/lib/tour-eligibility.ts` |
| Narratives | `/src/lib/tour-narrative.ts` |
| State management | `/src/components/story-tour/StoryTourProvider.tsx` |
| RG Gate | `/src/components/story-tour/ResponsibleGamblingGate.tsx` |
| Navigation | `/src/components/story-tour/ActContainer.tsx` |
| Progress UI | `/src/components/story-tour/ProgressIndicator.tsx` |
| Player Details | `/src/components/story-tour/PlayerDetailsPanel.tsx` |
| Interest Filters | `/src/components/story-tour/InterestFilters.tsx` |
| Land-based tour | `/src/app/casino/[slug]/tour/page.tsx` |
| Online tour | `/src/app/online/[slug]/tour/page.tsx` |

## Using PlayerDetailsPanel

Expandable panel for game rules, odds, and player tips:

```typescript
import { PlayerDetailsPanel, getGameRulesForCasino } from "@/components/story-tour";

// Get relevant game rules based on casino's games
const gameRules = getGameRulesForCasino(casino.games);

<PlayerDetailsPanel
  title="Player Details"
  subtitle="Game rules, odds, and tips"
  details={{
    tableMinMax: { min: casino.minTableBet, max: casino.maxTableBet },
    gameRules,
    tips: ["Sign up for player's club before first session"],
  }}
/>
```

## Using InterestFilters

Behavior-based personalization component:

```typescript
import { InterestFilters, getContentEmphasis } from "@/components/story-tour";

// Modal/drawer mode
<InterestFilters variant="modal" onClose={() => setShowFilters(false)} />

// Inline mode
<InterestFilters variant="inline" />

// Use filters to adjust content
const emphasis = getContentEmphasis(state.filters);
// Returns: { prioritySections, highlightGames, showBonusDetails, showAmenities }
```

## Generating Dynamic Narratives

Use tour-narrative.ts for engaging, data-driven content:

```typescript
import { generateSignatureMoment, generateActNarrative, generatePlayerDetails } from "@/lib/tour-narrative";

// Get signature opening hook
const hook = generateSignatureMoment(casino, "journey");

// Get full act narrative
const narrative = generateActNarrative(casino, "heart-of-house", "journey");
// Returns: { headline, body, callout?, facts[] }

// Get player-specific details
const details = generatePlayerDetails(casino);
// Returns: PlayerDetails with tableMinMax, gameRules, tips, etc.
```

## Contact

Feature designed based on expert panel review (7 domain experts). See plan file at:
`/.claude/plans/lively-twirling-stroustrup.md`
