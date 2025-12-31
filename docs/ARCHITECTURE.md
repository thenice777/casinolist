# Architecture Overview

This document describes the high-level architecture of CasinoList.io.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vercel Edge                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Visitor   │  │  Middleware │  │   Next.js App Router    │ │
│  │   Browser   │──│ (Geo Check) │──│   Server Components     │ │
│  └─────────────┘  └─────────────┘  └───────────┬─────────────┘ │
└────────────────────────────────────────────────┼───────────────┘
                                                 │
         ┌───────────────────────────────────────┴────────────────┐
         │                                                         │
         ▼                                                         ▼
┌─────────────────┐                                    ┌──────────────────┐
│ Neon PostgreSQL │                                    │     Mapbox       │
│   (Serverless)  │                                    │   (Map Tiles)    │
└─────────────────┘                                    └──────────────────┘
```

## Core Technologies

### Next.js 16 App Router

The application uses Next.js 16 with the App Router architecture:

- **Server Components**: Default for all pages, data fetching at the edge
- **Client Components**: Interactive features marked with `"use client"`
- **API Routes**: `/app/api/*` for server-side logic
- **Middleware**: Geolocation checks and redirects

### Data Flow

```
1. Request hits Vercel Edge
   ↓
2. Middleware checks geo-restrictions
   ↓
3. Server Component fetches data from Neon
   ↓
4. Page renders (SSR for SEO)
   ↓
5. Client hydration for interactivity
```

## Key Architectural Patterns

### 1. Server-First Data Fetching

Data is fetched in Server Components to minimize client JavaScript:

```typescript
// src/app/casino/[slug]/page.tsx
export default async function CasinoPage({ params }: Props) {
  const casino = await getCasinoBySlug(params.slug);
  return <CasinoProfile casino={casino} />;
}
```

### 2. Neon Serverless Connection

The database uses Neon's serverless driver for edge-compatible queries:

```typescript
// src/lib/db.ts
import { neon } from "@neondatabase/serverless";
export const sql = neon(process.env.DATABASE_URL!);
```

### 3. Type-Safe Database Queries

All database queries return typed results:

```typescript
// src/lib/casinos.ts
export async function getCasinoBySlug(slug: string): Promise<LandBasedCasino | null> {
  const result = await sql`SELECT * FROM land_based_casinos WHERE slug = ${slug}`;
  return result.length > 0 ? toCamelCase<LandBasedCasino>(result[0]) : null;
}
```

### 4. Context Providers for Complex State

Interactive features use React Context:

```typescript
// Story Tour state management
<StoryTourProvider>
  <TourContent casino={casino} />
</StoryTourProvider>
```

### 5. Component Composition

Pages compose smaller components for reusability:

```
CasinoPage
├── Header
├── HeroSection
│   └── CasinoImage
├── RatingCard
│   └── RatingBar (x5)
├── GamesSection
│   └── GameCard (xN)
├── AmenitiesSection
└── Footer
```

## Rendering Strategy

| Page Type | Strategy | Why |
|-----------|----------|-----|
| Homepage | Static + ISR | SEO, fast loads |
| Casino Profile | SSR | Dynamic data, SEO |
| Explore (Map) | CSR | Heavy client interaction |
| Story Tour | CSR | Complex client state |
| API Routes | Edge Runtime | Fast responses |

## Caching Strategy

### Static Pages
- Built at deploy time
- Revalidated via ISR or on-demand

### Dynamic Data
- Fetched at request time
- No client-side caching (fresh data)

### Map Tiles
- Cached by Mapbox CDN
- Browser caches tiles locally

## Security Considerations

### Environment Variables
- `DATABASE_URL`: Never exposed to client
- `NEXT_PUBLIC_*`: Safe for client exposure

### Geo-Restrictions
Middleware blocks restricted jurisdictions:

```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const country = request.geo?.country;
  if (RESTRICTED_COUNTRIES.includes(country)) {
    return NextResponse.redirect('/restricted');
  }
}
```

### Input Validation
- API routes validate all inputs
- SQL uses parameterized queries (no injection)

## Scalability

The architecture scales automatically:

1. **Vercel Edge**: Globally distributed, auto-scaling
2. **Neon Serverless**: Connection pooling, auto-scaling compute
3. **Mapbox**: CDN-cached tiles, handles any load

## Error Handling

### Server Errors
- Caught at page level
- Displayed via `error.tsx` boundary

### Client Errors
- React Error Boundaries
- Graceful fallbacks

### API Errors
- Structured error responses
- Logging for debugging

## Monitoring

### Vercel Analytics
- Page views, performance metrics
- Built-in, no extra setup

### Custom Analytics
- `/api/tour-analytics`: Tour session data
- `/api/clicks`: CTA click tracking

## Directory Structure Rationale

```
src/
├── app/          # Route-based pages (Next.js convention)
├── components/   # Reusable UI components
├── lib/          # Business logic, utilities
└── types/        # TypeScript type definitions
```

### Why This Structure?

1. **Clear separation**: Pages vs Components vs Logic
2. **Colocation**: Related files together
3. **Reusability**: Components shared across pages
4. **Type safety**: Centralized type definitions

## Future Considerations

### Potential Improvements
- **Edge Config**: For feature flags
- **Redis Cache**: For hot data (if needed)
- **WebSockets**: For real-time features
- **Image CDN**: For casino images

### Technical Debt
- Consider adding unit tests
- Add E2E tests for critical paths
- Consider a CMS for content management
