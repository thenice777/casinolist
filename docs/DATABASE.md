# Database Schema

CasinoList uses Neon PostgreSQL (serverless) with PostGIS for geospatial data.

## Connection

```typescript
// src/lib/db.ts
import { neon } from "@neondatabase/serverless";
export const sql = neon(process.env.DATABASE_URL!);
```

The `DATABASE_URL` environment variable contains the Neon connection string.

## Tables

### land_based_casinos

Physical casino properties with location and gaming data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Casino name |
| slug | text | URL-friendly identifier |
| address | text | Street address |
| city | text | City name |
| state | text | State/province (nullable) |
| country | text | Country name |
| country_code | text | ISO 2-letter code |
| postal_code | text | Postal/ZIP code |
| coordinates | geography(Point) | PostGIS point for mapping |
| description | text | Long description |
| short_description | text | Brief summary |
| website | text | Official website URL |
| phone | text | Contact phone |
| email | text | Contact email |
| opening_hours | jsonb | Hours by day of week |
| is_24_hours | boolean | Open 24/7 |
| dress_code | text | Dress requirements |
| entry_fee | numeric | Entry cost (if any) |
| minimum_age | integer | Age requirement (default 21) |
| games | text[] | Array of game types |
| table_count | integer | Number of table games |
| slot_count | integer | Number of slot machines |
| poker_room_tables | integer | Poker tables |
| min_table_bet | numeric | Minimum table bet |
| max_table_bet | numeric | Maximum table bet |
| has_high_limit_room | boolean | VIP gaming area |
| has_poker_room | boolean | Dedicated poker room |
| has_sportsbook | boolean | Sports betting |
| amenities | text[] | Array of amenities |
| has_hotel | boolean | On-site hotel |
| has_restaurant | boolean | On-site dining |
| has_parking | boolean | Parking available |
| rating_overall | numeric | Overall rating (0-10) |
| rating_games | numeric | Games rating |
| rating_service | numeric | Service rating |
| rating_atmosphere | numeric | Atmosphere rating |
| rating_value | numeric | Value rating |
| rating_trust | numeric | Trust/safety rating |
| review_count | integer | Number of reviews |
| experience_tiers | text[] | Classification tags |
| verified_badges | text[] | Achievement badges |
| logo_url | text | Logo image URL |
| hero_image_url | text | Main image URL |
| images | text[] | Gallery images |
| is_active | boolean | Published status |
| is_featured | boolean | Featured listing |
| is_verified | boolean | Verified by team |
| data_sources | text[] | Data origin |
| last_verified_at | timestamp | Last verification |
| created_at | timestamp | Created date |
| updated_at | timestamp | Last updated |

#### Experience Tiers

```
destination, local_gem, high_roller_haven, poker_paradise,
slots_palace, historic_icon, rising_star, budget_friendly
```

#### Verified Badges

```
fast_comps, player_verified, high_limit, 24_7_operation,
hotel_integrated, fine_dining
```

### online_casinos

Online gambling operators with licensing and bonus data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Casino name |
| slug | text | URL-friendly identifier |
| description | text | Long description |
| short_description | text | Brief summary |
| website | text | Main website URL |
| affiliate_link | text | Tracked affiliate URL |
| licenses | text[] | License identifiers |
| license_countries | text[] | Jurisdictions |
| restricted_countries | text[] | Blocked countries |
| welcome_bonus_description | text | Bonus details |
| welcome_bonus_amount | text | Bonus value |
| welcome_bonus_wagering | integer | Wagering requirement (x) |
| free_spins_offer | integer | Free spins count |
| no_deposit_bonus | text | No-deposit offer |
| game_providers | text[] | Software providers |
| games | text[] | Game categories |
| has_live_casino | boolean | Live dealer games |
| has_sportsbook | boolean | Sports betting |
| slot_count | integer | Number of slots |
| table_game_count | integer | Number of table games |
| payment_methods | text[] | Deposit/withdrawal methods |
| min_deposit | numeric | Minimum deposit |
| max_withdrawal | numeric | Maximum withdrawal |
| withdrawal_time | text | Payout speed |
| support_channels | text[] | Support options |
| currencies | text[] | Accepted currencies |
| rating_overall | numeric | Overall rating (0-10) |
| rating_games | numeric | Games rating |
| rating_service | numeric | Service rating |
| rating_ux | numeric | User experience rating |
| rating_value | numeric | Value rating |
| rating_trust | numeric | Trust/safety rating |
| review_count | integer | Number of reviews |
| avg_payout_percentage | numeric | RTP percentage |
| verified_payout_speed | text | Verified payout time |
| experience_tiers | text[] | Classification tags |
| verified_badges | text[] | Achievement badges |
| logo_url | text | Logo image URL |
| hero_image_url | text | Main image URL |
| screenshots | text[] | Site screenshots |
| is_active | boolean | Published status |
| is_featured | boolean | Featured listing |
| is_verified | boolean | Verified by team |
| founded_year | integer | Year established |
| headquarters | text | Company location |
| owner_company | text | Parent company |
| last_verified_at | timestamp | Last verification |
| created_at | timestamp | Created date |
| updated_at | timestamp | Last updated |

#### Online Verified Badges

```
fast_payouts, vip_excellence, live_dealer_pro,
crypto_accepted, mobile_optimized, fair_games
```

### license_jurisdictions

Geographic coordinates for online casino license locations (for map display).

| Column | Type | Description |
|--------|------|-------------|
| id | text | License identifier (e.g., "MGA") |
| name | text | Full name |
| short_name | text | Abbreviation |
| coordinates | geography(Point) | Map location |
| trust_level | text | high/medium/low |

### destinations

City/region groupings for casino destinations.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Destination name |
| slug | text | URL-friendly identifier |
| type | text | city/region/country |
| city | text | City name |
| state | text | State/province |
| country | text | Country name |
| country_code | text | ISO 2-letter code |
| coordinates | geography(Point) | Center point |
| description | text | Long description |
| short_description | text | Brief summary |
| casino_overview | text | Gaming scene overview |
| practical_info | text | Visitor tips |
| casino_count | integer | Number of casinos |
| hero_image_url | text | Main image URL |
| images | text[] | Gallery images |
| meta_title | text | SEO title |
| meta_description | text | SEO description |
| is_active | boolean | Published status |
| is_featured | boolean | Featured destination |
| created_at | timestamp | Created date |
| updated_at | timestamp | Last updated |

### reviews

User reviews for casinos.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| casino_type | text | land_based/online |
| land_based_casino_id | uuid | FK to land_based_casinos |
| online_casino_id | uuid | FK to online_casinos |
| user_id | text | User identifier (optional) |
| display_name | text | Reviewer name |
| is_anonymous | boolean | Hide identity |
| is_verified_visit | boolean | Verified visitor |
| rating_overall | numeric | Overall rating (1-10) |
| rating_games | numeric | Games rating |
| rating_service | numeric | Service rating |
| rating_atmosphere | numeric | Atmosphere rating |
| rating_value | numeric | Value rating |
| title | text | Review headline |
| content | text | Review body |
| pros | text[] | Positive points |
| cons | text[] | Negative points |
| visit_date | date | When visited |
| visit_purpose | text | tourism/business/local/special_event |
| player_level | text | casual/regular/high_roller |
| games_played | text[] | Games tried |
| status | text | pending/approved/rejected |
| helpful_count | integer | Helpful votes |
| created_at | timestamp | Created date |
| updated_at | timestamp | Last updated |

### tour_analytics

Story Tour session tracking data.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| casino_id | text | Casino identifier |
| casino_type | text | land_based/online |
| casino_name | text | Casino name |
| session_duration_ms | bigint | Time in tour (ms) |
| acts_viewed | text[] | Acts visited |
| zones_viewed | text[] | Zones visited |
| cta_clicks | jsonb | CTA click data |
| completed_tour | boolean | Reached final act |
| reality_checks_shown | integer | RG popups shown |
| filters | jsonb | User filter selections |
| created_at | timestamp | Session timestamp |

## Indexes

Key indexes for performance:

```sql
-- Land-based casinos
CREATE INDEX idx_land_based_slug ON land_based_casinos(slug);
CREATE INDEX idx_land_based_active ON land_based_casinos(is_active);
CREATE INDEX idx_land_based_featured ON land_based_casinos(is_featured);
CREATE INDEX idx_land_based_country ON land_based_casinos(country);
CREATE INDEX idx_land_based_coords ON land_based_casinos USING GIST(coordinates);

-- Online casinos
CREATE INDEX idx_online_slug ON online_casinos(slug);
CREATE INDEX idx_online_active ON online_casinos(is_active);
CREATE INDEX idx_online_featured ON online_casinos(is_featured);

-- Reviews
CREATE INDEX idx_reviews_casino ON reviews(land_based_casino_id, online_casino_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- Tour analytics
CREATE INDEX idx_tour_analytics_casino ON tour_analytics(casino_id);
```

## Common Queries

### Get casino by slug

```typescript
const casino = await sql`
  SELECT * FROM land_based_casinos
  WHERE slug = ${slug} AND is_active = true
`;
```

### Get map markers

```typescript
const markers = await sql`
  SELECT
    id, name, slug,
    ST_Y(coordinates::geometry) as latitude,
    ST_X(coordinates::geometry) as longitude,
    rating_overall, is_featured
  FROM land_based_casinos
  WHERE is_active = true AND coordinates IS NOT NULL
`;
```

### Get casinos by destination

```typescript
const casinos = await sql`
  SELECT * FROM land_based_casinos
  WHERE city = ${city} AND country = ${country}
  AND is_active = true
  ORDER BY rating_overall DESC
`;
```

## Data Utilities

### Case Conversion

The database uses snake_case, TypeScript uses camelCase:

```typescript
// src/lib/db.ts
export function toCamelCase<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    result[camelKey] = obj[key];
  }
  return result as T;
}
```

### PostGIS Coordinates

Extract lat/lng from PostGIS geography:

```sql
ST_Y(coordinates::geometry) as latitude,
ST_X(coordinates::geometry) as longitude
```

## Migrations

Database migrations are managed manually. To add a new column:

1. Connect to Neon console
2. Run ALTER TABLE statement
3. Update type definitions in `src/types/casino.ts`
4. Update queries in `src/lib/casinos.ts`

## Backup

Neon provides automatic point-in-time recovery. For manual backups:

```bash
pg_dump $DATABASE_URL > backup.sql
```
