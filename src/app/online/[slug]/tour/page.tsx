import { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getOnlineCasinoBySlug } from "@/lib/casinos";
import { checkOnlineTourEligibility } from "@/lib/tour-eligibility";
import { getGeoInfo } from "@/lib/geo";
import OnlineTourClient from "./OnlineTourClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const casino = await getOnlineCasinoBySlug(slug);

  if (!casino) {
    return {
      title: "Casino Not Found | CasinoList.io",
    };
  }

  return {
    title: `${casino.name} Tour | Virtual Walk-Through | CasinoList.io`,
    description: `Take an immersive tour through ${casino.name}. Explore the games, bonuses, and features that make this online casino stand out.`,
    openGraph: {
      title: `Tour ${casino.name} | CasinoList.io`,
      description: `Virtual walk-through of ${casino.name}. Discover what awaits you.`,
      images: casino.heroImageUrl ? [casino.heroImageUrl] : casino.logoUrl ? [casino.logoUrl] : undefined,
    },
  };
}

export default async function OnlineCasinoTourPage({ params }: Props) {
  const { slug } = await params;
  const casino = await getOnlineCasinoBySlug(slug);

  if (!casino) {
    notFound();
  }

  // Check tour eligibility
  const eligibility = checkOnlineTourEligibility(casino);

  if (!eligibility.isEligible) {
    // Show "not available" message if not eligible
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Tour Not Available</h1>
          <p className="text-slate-400 mb-6">
            {eligibility.reason === "insufficient_data"
              ? `We don't have enough information about ${casino.name} to provide an immersive tour yet.`
              : eligibility.reason === "inactive"
              ? `${casino.name} is not currently active.`
              : `This casino's tour is not currently available.`}
          </p>
          <a
            href={`/online/${slug}`}
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            View Full Profile
          </a>
        </div>
      </div>
    );
  }

  // Get geo info for responsible gambling
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country") || null;
  const geoInfo = getGeoInfo(country);

  return (
    <OnlineTourClient
      casino={casino}
      countryCode={country}
      narrativeTemplate={eligibility.narrativeTemplate!}
      culturalRegion={eligibility.culturalRegion!}
    />
  );
}
