# Story Tour Feature

The Story Tour is an immersive, optional deep-dive experience for users planning casino visits. It presents casino information through a 4-act narrative structure with responsible gambling features built-in.

## Overview

**Purpose**: Transform dry casino data into an engaging story that helps users make informed decisions.

**Key Principle**: The tour is ADDITIVE to the profile page, not a replacement. Users get the quick-scan profile by default; the Story Tour is opt-in.

## URL Structure

```
/casino/[slug]/tour     # Land-based casino tour
/online/[slug]/tour     # Online casino tour
```

## 4-Act Structure

The tour follows an emotional journey:

| Act | Name | Purpose | Zones |
|-----|------|---------|-------|
| 1 | First Impressions | Hook the user, build trust | Arrival, Trust Signals |
| 2 | Heart of the House | Show what makes it unique | Gaming Overview, Table Games, Poker, Sportsbook |
| 3 | Full Picture | Complete the picture | Amenities, Dining, Who It's For |
| 4 | Your Move | Help them decide | Verdict, Best For |

### Act Components

Each act has a dedicated component:

- `src/components/story-tour/acts/FirstImpressionsAct.tsx`
- `src/components/story-tour/acts/HeartOfHouseAct.tsx`
- `src/components/story-tour/acts/FullPictureAct.tsx`
- `src/components/story-tour/acts/YourMoveAct.tsx`

## Component Architecture

```
StoryTourProvider (Context)
└── TourContent
    ├── ResponsibleGamblingGate (pre-tour)
    ├── RealityCheck (timed overlays)
    ├── InterestFilters (modal)
    ├── SessionTracker (invisible)
    ├── Header
    │   ├── ProgressIndicator
    │   └── FilterTriggerButton
    ├── ActContainer
    │   └── [CurrentAct]
    │       ├── NarrativeBlock(s)
    │       ├── PlayerDetailsPanel(s)
    │       └── Zone-specific content
    └── Footer
```

## State Management

The tour uses React Context with useReducer:

```typescript
// src/components/story-tour/StoryTourProvider.tsx

interface TourState {
  casinoId: string;
  casinoType: "land_based" | "online";
  casino: LandBasedCasino | OnlineCasino | null;
  currentAct: TourAct;
  currentZoneIndex: number;
  filters: InterestFilters;
  session: TourSession;
  isGateAccepted: boolean;
  isLoading: boolean;
  showRealityCheck: boolean;
  realityCheckType: "subtle" | "prominent" | "interstitial" | null;
}
```

### Available Actions

```typescript
type TourAction =
  | { type: "INIT_TOUR"; payload: { casino } }
  | { type: "ACCEPT_GATE" }
  | { type: "SET_ACT"; payload: TourAct }
  | { type: "SET_ZONE"; payload: number }
  | { type: "NEXT_ZONE" }
  | { type: "PREV_ZONE" }
  | { type: "NEXT_ACT" }
  | { type: "PREV_ACT" }
  | { type: "UPDATE_FILTERS"; payload: Partial<InterestFilters> }
  | { type: "RECORD_CTA_CLICK"; payload: TourCTAClick }
  | { type: "SHOW_REALITY_CHECK"; payload: RealityCheckType }
  | { type: "DISMISS_REALITY_CHECK" }
  | { type: "END_TOUR" };
```

### Using the Context

```typescript
import { useTour } from "@/components/story-tour/StoryTourProvider";

function MyComponent() {
  const {
    state,
    nextAct,
    prevAct,
    skipToVerdict,
    recordCTAClick,
    sessionDurationMinutes,
  } = useTour();
}
```

## Key Components

### NarrativeBlock

Displays narrative content with different visual styles:

```typescript
<NarrativeBlock
  variant="hero"     // "default" | "highlight" | "compact" | "hero"
  icon={<Trophy />}
  headline="The Verdict"
  content="This casino excels at..."
  className="mb-4"
/>
```

### PlayerDetailsPanel

Expandable data tables for serious players:

```typescript
<PlayerDetailsPanel
  title="Table Limits"
  items={[
    { label: "Blackjack", value: "$10 - $10,000" },
    { label: "Roulette", value: "$5 - $5,000" },
  ]}
  expandedByDefault={false}
/>
```

### ProgressIndicator

Shows progress through the 4 acts:

```typescript
<ProgressIndicator variant="full" />   // Desktop: full labels
<ProgressIndicator variant="compact" /> // Mobile: dots only
```

### ResponsibleGamblingGate

Required acknowledgment before tour starts:

```typescript
<ResponsibleGamblingGate
  casinoName="Bellagio"
  countryCode="US"
  isOnline={false}  // Shows different text for online casinos
/>
```

### RealityCheck

Timed overlays at 15, 30, 45 minutes:

```typescript
<RealityCheck
  type="prominent"  // "subtle" | "prominent" | "interstitial"
  sessionMinutes={30}
  onContinue={handleContinue}
  onTakeBreak={handleTakeBreak}
  helpline={{ name: "1-800-GAMBLER", url: "..." }}
/>
```

### InterestFilters

Behavior-based personalization (not personas):

```typescript
<InterestFilters
  variant="modal"
  onClose={() => setShowFilters(false)}
/>
```

Filter categories:
- **Looking for**: Games, Bonus/Value, Destination, Quick visit
- **Usually play**: Slots, Table games, Poker, Sports, Everything
- **Session style**: Quick visit, Evening out, Multi-day trip

## Narrative Generation

Dynamic narratives are generated from casino data:

```typescript
// src/lib/tour-narrative.ts

import { generateActNarrative } from "@/lib/tour-narrative";

const narrative = generateActNarrative(
  casino,
  "first-impressions",
  "gaming-overview"
);
// Returns: { hook: "...", body: "...", bestFor: [...] }
```

## Session Analytics

The `SessionTracker` component tracks user engagement:

```typescript
// Tracked data:
{
  casinoId: string,
  casinoType: "land_based" | "online",
  sessionDurationMs: number,
  actsViewed: TourAct[],
  zonesViewed: string[],
  ctaClicks: { location: string, actId: string }[],
  completedTour: boolean,
  realityChecksShown: number,
  filters: InterestFilters
}
```

Data is sent via `navigator.sendBeacon` for reliable delivery on page unload.

### API Endpoint

```
POST /api/tour-analytics
GET /api/tour-analytics?casinoId=xxx
```

## CTA Tracking

CTAs use subid tracking for attribution:

```typescript
const { recordCTAClick } = useTour();

<TrackedLink
  href={casino.affiliateLink}
  casinoId={casino.id}
  onClick={() => recordCTAClick("tour_verdict_primary")}
>
  Visit Casino
</TrackedLink>
```

CTA locations:
- `tour_act1_soft` - Soft CTA in Act 1
- `tour_act2_gaming` - Gaming-focused CTA in Act 2
- `tour_verdict_primary` - Main CTA in Act 4
- `tour_sticky` - Sticky footer CTA

## Tour Eligibility

Not all casinos get a tour. Eligibility is checked:

```typescript
// src/lib/tour-eligibility.ts

import { checkTourEligibility } from "@/lib/tour-eligibility";

const { isEligible, narrativeTemplate, culturalRegion } = checkTourEligibility(casino);
```

Requirements:
- Has description OR 3+ games OR reviews
- Is active
- Has sufficient data for narrative generation

## Regional Templates

Different narrative styles by region:

| Template | Regions | Style |
|----------|---------|-------|
| `journey` | North America, Latin America | Full story, entertainment focus |
| `ritual` | Monaco, Baden-Baden | Tradition emphasis |
| `guide` | UK, Australia | Practical, understated |
| `atmosphere` | Macau, Singapore | Relationship-focused |
| `functional` | Local casinos | Quick facts only |

## Loading States

The tour shows skeletons while loading:

```typescript
import TourSkeleton from "@/components/story-tour/TourSkeleton";

if (state.isLoading) {
  return <TourSkeleton />;
}
```

Available skeleton components:
- `TourSkeleton` - Full page skeleton
- `TourHeaderSkeleton` - Header only
- `ZoneContentSkeleton` - Zone content area
- `VerdictSkeleton` - Final act skeleton
- `NarrativeBlockSkeleton` - Single block
- `RatingBreakdownSkeleton` - Rating bars

## Adding a New Act Zone

1. Add zone to `DEFAULT_ACTS` in `src/types/tour.ts`:

```typescript
{
  id: "new-zone",
  name: "New Zone",
  type: "practical",
  dataFields: ["field1", "field2"],
}
```

2. Add zone component in the relevant act file

3. Update `tour-narrative.ts` if generating narratives

## Testing the Tour

1. Navigate to a casino profile: `/casino/bellagio-las-vegas`
2. Click "Take the Tour" button
3. Accept the responsible gambling gate
4. Navigate through all 4 acts
5. Check analytics at `/api/tour-analytics`

## Mobile Considerations

- **Act-locked navigation**: Vertical scroll disabled within acts
- **Gesture safety**: 20px edge ignore zones
- **Thumb-friendly**: CTAs in bottom 40% of screen
- **Compact progress**: Dots instead of labels

## Responsible Gambling Features

1. **Pre-tour gate**: Required acknowledgment
2. **Reality checks**: At 15, 30, 45 minutes
3. **Helpline display**: Based on user's country
4. **Session tracking**: Time visible in header
5. **Take a break**: Easy exit at any point
