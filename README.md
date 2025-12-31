# CasinoList.io

A comprehensive casino directory platform featuring land-based and online casinos worldwide. Built with Next.js 16, TypeScript, Tailwind CSS, and Neon PostgreSQL.

**Live Site**: https://casinolist.io

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Neon PostgreSQL (serverless)
- **Maps**: Mapbox GL JS with Supercluster for clustering
- **Icons**: Lucide React
- **Hosting**: Vercel

## Quick Start

```bash
# Clone the repository
git clone https://github.com/[org]/casinolist.git
cd casinolist

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file with:

```env
# Neon PostgreSQL connection string
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Mapbox token for interactive map
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token

# Site URL for SEO
NEXT_PUBLIC_SITE_URL=https://casinolist.io
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── clicks/               # CTA click tracking
│   │   ├── contact/              # Contact form
│   │   ├── newsletter/           # Newsletter signup
│   │   ├── reviews/              # User reviews
│   │   └── tour-analytics/       # Story Tour session tracking
│   ├── casino/[slug]/            # Land-based casino profile
│   │   └── tour/                 # Story Tour experience
│   ├── online/[slug]/            # Online casino profile
│   │   └── tour/                 # Online casino tour
│   ├── destinations/[slug]/      # Destination pages
│   ├── explore/                  # Interactive map
│   ├── compare/                  # Casino comparison
│   └── ...                       # Other pages
│
├── components/
│   ├── casino/                   # Casino cards, filters, links
│   ├── compare/                  # Comparison feature
│   ├── geo/                      # Geo-restriction, helplines
│   ├── layout/                   # Header, Footer
│   ├── map/                      # Mapbox components
│   ├── reviews/                  # Review system
│   ├── seo/                      # Structured data
│   ├── story-tour/               # Immersive tour feature
│   │   ├── acts/                 # 4-act tour structure
│   │   └── ...                   # Tour components
│   └── ui/                       # Shared UI components
│
├── lib/
│   ├── casinos.ts                # Casino data queries
│   ├── db.ts                     # Database connection
│   ├── geo.ts                    # Geolocation utilities
│   ├── licenses.ts               # License verification
│   ├── mapbox-config.ts          # Map configuration
│   ├── reviews.ts                # Review queries
│   ├── tour-eligibility.ts       # Tour eligibility logic
│   ├── tour-narrative.ts         # Dynamic narrative generation
│   └── utils.ts                  # Shared utilities
│
└── types/
    ├── casino.ts                 # Casino, Review, Destination types
    └── tour.ts                   # Story Tour types
```

## Key Features

### 1. Casino Directory
- **Land-based casinos**: 100+ casinos with location, games, amenities
- **Online casinos**: Licensed operators with bonuses, payment methods
- **Destinations**: City/region pages with casino listings
- **Search & Filter**: By games, amenities, ratings, experience tier

### 2. Interactive World Map
- Mapbox GL JS with custom styling
- Supercluster for efficient marker clustering
- Click-through to casino profiles

### 3. Story Tour (Immersive Experience)
An optional deep-dive for users planning casino visits. See [docs/STORY-TOUR.md](docs/STORY-TOUR.md) for full documentation.

**4-Act Structure:**
1. First Impressions - Atmosphere, trust signals
2. Heart of the House - Gaming focus
3. Full Picture - Amenities, who it's for
4. Your Move - Verdict, ratings, CTA

**Features:**
- Responsible gambling gates and reality checks
- Interest filters (behavior-based personalization)
- Session analytics tracking
- Works for both land-based and online casinos

### 4. Responsible Gambling
- Regional helpline display based on visitor location
- Geo-restrictions for blocked jurisdictions
- Reality checks during extended sessions
- Pre-tour acknowledgment gate

### 5. Affiliate Integration
- `TrackedLink` component with subid tracking
- Click tracking API (`/api/clicks`)
- CTA attribution through tour analytics

## Scripts

```bash
npm run dev       # Development server (Turbopack)
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint check
```

## Database Schema

The project uses Neon PostgreSQL. Key tables:

- `land_based_casinos` - Physical casino properties
- `online_casinos` - Online gambling operators
- `destinations` - City/region groupings
- `reviews` - User reviews
- `tour_analytics` - Story Tour session data

See [docs/DATABASE.md](docs/DATABASE.md) for full schema.

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Story Tour Feature](docs/STORY-TOUR.md)
- [Database Schema](docs/DATABASE.md)
- [Components Reference](docs/COMPONENTS.md)

## Deployment

The site is deployed on Vercel with automatic deployments from the `main` branch.

```bash
# Link to Vercel project
vercel link

# Deploy preview
vercel

# Deploy production
vercel --prod
```

## License

Proprietary - All rights reserved.
