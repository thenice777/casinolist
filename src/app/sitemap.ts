import { MetadataRoute } from "next";
import { sql } from "@/lib/db";

const BASE_URL = "https://casinolist.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all active slugs from the database
  const [landBasedCasinos, onlineCasinos, destinations] = await Promise.all([
    sql`
      SELECT slug, updated_at
      FROM land_based_casinos
      WHERE is_active = true
      ORDER BY updated_at DESC
    `,
    sql`
      SELECT slug, updated_at
      FROM online_casinos
      WHERE is_active = true
      ORDER BY updated_at DESC
    `,
    sql`
      SELECT slug, updated_at
      FROM destinations
      WHERE is_active = true
      ORDER BY updated_at DESC
    `,
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/land-based-casinos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/online-casinos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/destinations`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/map`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/best-of`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/how-we-rate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/responsible-gambling`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Land-based casino pages
  const casinoPages: MetadataRoute.Sitemap = landBasedCasinos.map(
    (casino) => ({
      url: `${BASE_URL}/casino/${casino.slug as string}`,
      lastModified: (casino.updated_at as Date) || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Online casino pages
  const onlinePages: MetadataRoute.Sitemap = onlineCasinos.map(
    (casino) => ({
      url: `${BASE_URL}/online/${casino.slug as string}`,
      lastModified: (casino.updated_at as Date) || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Destination pages
  const destinationPages: MetadataRoute.Sitemap = destinations.map(
    (destination) => ({
      url: `${BASE_URL}/destinations/${destination.slug as string}`,
      lastModified: (destination.updated_at as Date) || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticPages, ...casinoPages, ...onlinePages, ...destinationPages];
}
