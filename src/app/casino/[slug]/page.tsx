import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { getLandBasedCasinoBySlug } from "@/lib/casinos";
import { getLandBasedCasinoReviews, getReviewStats } from "@/lib/reviews";
import { MapPin, Globe, Phone, Clock, Star, Check, Users } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const casino = await getLandBasedCasinoBySlug(slug);

  if (!casino) {
    return { title: "Casino Not Found" };
  }

  const description = casino.shortDescription || casino.description?.slice(0, 160) || `Discover ${casino.name} in ${casino.city}, ${casino.country}. Expert ratings, games, amenities, and insider details.`;
  const rating = Number(casino.ratingOverall);

  return {
    title: `${casino.name} - ${casino.city}, ${casino.country}`,
    description,
    openGraph: {
      title: `${casino.name} | CasinoList.io`,
      description,
      url: `https://casinolist.io/casino/${casino.slug}`,
      siteName: "CasinoList.io",
      type: "website",
      images: casino.heroImageUrl ? [
        {
          url: casino.heroImageUrl,
          width: 1200,
          height: 630,
          alt: casino.name,
        },
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${casino.name} | CasinoList.io`,
      description: rating > 0 ? `${description} Rating: ${rating.toFixed(1)}/10` : description,
      images: casino.heroImageUrl ? [casino.heroImageUrl] : undefined,
    },
  };
}

export default async function CasinoProfilePage({ params }: Props) {
  const { slug } = await params;
  const casino = await getLandBasedCasinoBySlug(slug);

  if (!casino) {
    notFound();
  }

  // Fetch reviews data
  const [reviews, reviewStats] = await Promise.all([
    getLandBasedCasinoReviews(casino.id),
    getReviewStats(casino.id, "land_based"),
  ]);

  const ratingDisplay = (rating: number | string | undefined, label: string) => {
    const numRating = Number(rating);
    if (!numRating || numRating <= 0) return null;
    return (
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm">{label}</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${(numRating / 10) * 100}%` }}
            />
          </div>
          <span className="text-white text-sm w-8">{numRating.toFixed(1)}</span>
        </div>
      </div>
    );
  };

  // Parse rating values
  const overallRating = Number(casino.ratingOverall) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <StructuredData type="casino" casino={casino} />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://casinolist.io" },
          { name: "Land-Based Casinos", url: "https://casinolist.io/land-based-casinos" },
          { name: casino.name, url: `https://casinolist.io/casino/${casino.slug}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <div className="relative h-64 md:h-80 bg-slate-800">
        {casino.heroImageUrl ? (
          <img
            src={casino.heroImageUrl}
            alt={casino.name}
            className="w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-4">
              {casino.logoUrl && (
                <img
                  src={casino.logoUrl}
                  alt={`${casino.name} logo`}
                  className="w-16 h-16 rounded-lg bg-white p-2"
                />
              )}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {casino.isFeatured && (
                    <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                  {casino.isVerified && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {casino.name}
                </h1>
                <p className="text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {casino.city}, {casino.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Rating Card */}
            {overallRating > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    CasinoList Rating
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">
                      {overallRating.toFixed(1)}
                    </span>
                    <div className="text-amber-400">
                      {"★".repeat(Math.round(overallRating / 2))}
                      {"☆".repeat(5 - Math.round(overallRating / 2))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {ratingDisplay(casino.ratingGames, "Games & Selection")}
                  {ratingDisplay(casino.ratingService, "Service")}
                  {ratingDisplay(casino.ratingAtmosphere, "Atmosphere")}
                  {ratingDisplay(casino.ratingValue, "Value")}
                  {ratingDisplay(casino.ratingTrust, "Trust & Safety")}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-4">About</h2>
              <p className="text-slate-300 leading-relaxed">
                {casino.description || casino.shortDescription}
              </p>
            </div>

            {/* Games */}
            {casino.games && casino.games.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Games Available
                </h2>
                <div className="flex flex-wrap gap-2">
                  {casino.games.map((game) => (
                    <span
                      key={game}
                      className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {game.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {casino.amenities && casino.amenities.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {casino.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="capitalize">
                        {amenity.replace(/_/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Info
              </h3>
              <div className="space-y-4">
                {casino.is24Hours && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <span>Open 24 Hours</span>
                  </div>
                )}
                {casino.minimumAge && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <span>Age {casino.minimumAge}+</span>
                  </div>
                )}
                {casino.website && (
                  <a
                    href={casino.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Visit Website</span>
                  </a>
                )}
                {casino.phone && (
                  <a
                    href={`tel:${casino.phone}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-white"
                  >
                    <Phone className="w-5 h-5 text-emerald-400" />
                    <span>{casino.phone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Badges */}
            {casino.verifiedBadges && casino.verifiedBadges.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Verified Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  {casino.verifiedBadges.map((badge) => (
                    <span
                      key={badge}
                      className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      {badge.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Tiers */}
            {casino.experienceTiers && casino.experienceTiers.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Experience Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {casino.experienceTiers.map((tier) => (
                    <span
                      key={tier}
                      className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {tier.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {casino.coordinates && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Location
                </h3>
                <p className="text-slate-300 text-sm mb-3">
                  {casino.address && `${casino.address}, `}
                  {casino.city}
                  {casino.state && `, ${casino.state}`}, {casino.country}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${casino.coordinates.latitude},${casino.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  Open in Google Maps →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <ReviewsSection
            reviews={reviews}
            stats={reviewStats}
            casinoId={casino.id}
            casinoType="land_based"
            casinoName={casino.name}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
