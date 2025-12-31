# Components Reference

This document covers the key reusable components in CasinoList.

## Layout Components

### Header

```typescript
// src/components/layout/Header.tsx
<Header />
```

Site-wide navigation header with:
- Logo link to homepage
- Navigation links
- Mobile menu toggle

### Footer

```typescript
// src/components/layout/Footer.tsx
<Footer />
```

Site-wide footer with:
- Navigation links
- Legal pages
- Responsible gambling notice
- Copyright

## Casino Components

### CasinoCard

```typescript
// src/components/casino/CasinoCard.tsx
<CasinoCard casino={landBasedCasino} />
```

Card display for land-based casinos:
- Hero image
- Name and location
- Rating badge
- Experience tier tags
- Quick stats (games, tables, slots)

### OnlineCasinoCard

```typescript
// src/components/casino/OnlineCasinoCard.tsx
<OnlineCasinoCard casino={onlineCasino} />
```

Card display for online casinos:
- Logo
- Name and licenses
- Rating badge
- Welcome bonus
- Key features

### CasinoFilters

```typescript
// src/components/casino/CasinoFilters.tsx
<CasinoFilters
  filters={currentFilters}
  onChange={handleFilterChange}
/>
```

Filter panel for land-based casino listings:
- Country filter
- Games filter
- Amenities filter
- Experience tier filter

### OnlineCasinoFilters

```typescript
// src/components/casino/OnlineCasinoFilters.tsx
<OnlineCasinoFilters
  filters={currentFilters}
  onChange={handleFilterChange}
/>
```

Filter panel for online casino listings:
- License filter
- Game provider filter
- Payment method filter
- Bonus type filter

### TrackedLink

```typescript
// src/components/casino/TrackedLink.tsx
<TrackedLink
  href={casino.affiliateLink}
  casinoId={casino.id}
  casinoType="online"
  subid="homepage_featured"
  className="btn-primary"
>
  Visit Casino
</TrackedLink>
```

Affiliate link wrapper that:
- Tracks click events to `/api/clicks`
- Appends subid parameter for attribution
- Opens in new tab with security attributes

Props:
| Prop | Type | Description |
|------|------|-------------|
| href | string | Destination URL |
| casinoId | string | Casino identifier for tracking |
| casinoType | "land_based" \| "online" | Casino type |
| subid | string | Attribution identifier |
| children | ReactNode | Link content |
| className | string | CSS classes |

### LicenseVerification

```typescript
// src/components/casino/LicenseVerification.tsx
<LicenseVerification licenses={casino.licenses} />
```

Displays license badges with verification status and trust levels.

## Map Components

### CasinoMap

```typescript
// src/components/map/CasinoMap.tsx
<CasinoMap
  markers={casinoMarkers}
  onMarkerClick={handleMarkerClick}
/>
```

Interactive Mapbox map with:
- Custom dark styling
- Supercluster for marker clustering
- Click-through to casino profiles
- Popup previews

### MapContainer

```typescript
// src/components/map/MapContainer.tsx
<MapContainer>
  <CasinoMap markers={markers} />
</MapContainer>
```

Client-side wrapper for the map (handles dynamic import).

### ClusterMarker

```typescript
// src/components/map/ClusterMarker.tsx
<ClusterMarker
  count={cluster.point_count}
  onClick={() => handleClusterClick(cluster)}
/>
```

Cluster marker showing count of casinos in area.

### CasinoPin

```typescript
// src/components/map/CasinoPin.tsx
<CasinoPin
  casino={marker}
  isSelected={selected === marker.id}
  onClick={() => handlePinClick(marker)}
/>
```

Individual casino marker on the map.

### CasinoPopup

```typescript
// src/components/map/CasinoPopup.tsx
<CasinoPopup
  casino={selectedCasino}
  onClose={() => setSelected(null)}
/>
```

Popup shown when clicking a casino marker.

## Compare Components

### CompareContext

```typescript
// src/components/compare/CompareContext.tsx
<CompareProvider>
  <App />
</CompareProvider>
```

Context provider for comparison feature. Manages up to 3 casinos.

### CompareButton

```typescript
// src/components/compare/CompareButton.tsx
<CompareButton casino={casino} />
```

Add/remove casino from comparison. Shows checkmark when added.

### CompareBar

```typescript
// src/components/compare/CompareBar.tsx
<CompareBar />
```

Floating bar showing selected casinos with:
- Casino chips (removable)
- "Compare" button
- Count indicator

## Geo Components

### GeoGate

```typescript
// src/components/geo/GeoGate.tsx
<GeoGate restrictedCountries={['US', 'AU']}>
  <CasinoContent />
</GeoGate>
```

Blocks content for users in restricted countries. Shows message instead.

### RegionalHelpline

```typescript
// src/components/geo/RegionalHelpline.tsx
<RegionalHelpline countryCode="US" />
```

Displays appropriate gambling helpline based on user's country.

## Review Components

### ReviewsSection

```typescript
// src/components/reviews/ReviewsSection.tsx
<ReviewsSection
  casinoId={casino.id}
  casinoType="land_based"
  reviews={reviews}
/>
```

Review listing with:
- Review cards
- Helpful voting
- "Write Review" CTA

### ReviewCard

```typescript
// src/components/reviews/ReviewCard.tsx
<ReviewCard review={review} />
```

Individual review display:
- Reviewer name
- Rating breakdown
- Pros/cons
- Visit date
- Helpful count

### ReviewFormWrapper

```typescript
// src/components/reviews/ReviewFormWrapper.tsx
<ReviewFormWrapper
  casinoId={casino.id}
  casinoType="land_based"
  casinoName={casino.name}
/>
```

Review submission form (client component).

## SEO Components

### StructuredData

```typescript
// src/components/seo/StructuredData.tsx
<StructuredData
  type="LocalBusiness"
  data={{
    name: casino.name,
    address: casino.address,
    rating: casino.ratingOverall,
  }}
/>
```

JSON-LD structured data for SEO. Supports:
- LocalBusiness (casinos)
- Organization
- BreadcrumbList
- FAQPage

## UI Components

### NewsletterSignup

```typescript
// src/components/ui/NewsletterSignup.tsx
<NewsletterSignup />
```

Email signup form with validation and API submission.

## Story Tour Components

See [STORY-TOUR.md](STORY-TOUR.md) for detailed Story Tour component documentation.

Quick reference:

| Component | Purpose |
|-----------|---------|
| `StoryTourProvider` | Context provider for tour state |
| `ActContainer` | Wraps act content |
| `ProgressIndicator` | Shows tour progress |
| `NarrativeBlock` | Narrative content display |
| `PlayerDetailsPanel` | Expandable data tables |
| `InterestFilters` | User preference modal |
| `ResponsibleGamblingGate` | Pre-tour acknowledgment |
| `RealityCheck` | Timed reminder overlays |
| `SessionTracker` | Analytics tracking |
| `TourSkeleton` | Loading skeletons |
| `FirstImpressionsAct` | Act 1 content |
| `HeartOfHouseAct` | Act 2 content |
| `FullPictureAct` | Act 3 content |
| `YourMoveAct` | Act 4 content |

## Common Patterns

### Client Components

Interactive components must be marked as client:

```typescript
"use client";

import { useState } from "react";

export default function InteractiveComponent() {
  const [state, setState] = useState(false);
  // ...
}
```

### Conditional Rendering

```typescript
{casino.hasPokerRoom && (
  <PokerRoomSection tables={casino.pokerRoomTables} />
)}
```

### Loading States

```typescript
if (isLoading) {
  return <Skeleton />;
}

return <Content data={data} />;
```

### Error Boundaries

Wrap risky components:

```typescript
<ErrorBoundary fallback={<ErrorMessage />}>
  <RiskyComponent />
</ErrorBoundary>
```

## Styling

Components use Tailwind CSS. Common patterns:

```typescript
// Responsive
className="text-sm md:text-base lg:text-lg"

// Dark theme
className="bg-slate-800 text-white"

// Hover states
className="hover:bg-slate-700 transition-colors"

// Focus states
className="focus:outline-none focus:ring-2 focus:ring-emerald-500"
```

## Icons

Icons from Lucide React:

```typescript
import { Star, MapPin, Clock, Trophy } from "lucide-react";

<Star className="w-5 h-5 text-amber-400" />
```

Common icons:
- `Star` - Ratings
- `MapPin` - Location
- `Clock` - Hours/time
- `Trophy` - Awards/achievements
- `Shield` - Trust/security
- `Dice5` - Gaming
- `Hotel` - Accommodation
- `Utensils` - Dining
- `ExternalLink` - External links
- `ChevronRight` - Navigation

## Adding New Components

1. Create file in appropriate directory
2. Add TypeScript interface for props
3. Export from component file
4. Add to barrel export if exists (`index.ts`)
5. Document usage in this file

Example:

```typescript
// src/components/casino/NewComponent.tsx
interface NewComponentProps {
  casino: LandBasedCasino;
  variant?: "default" | "compact";
}

export default function NewComponent({
  casino,
  variant = "default",
}: NewComponentProps) {
  return (
    <div className={variant === "compact" ? "p-2" : "p-4"}>
      {casino.name}
    </div>
  );
}
```
