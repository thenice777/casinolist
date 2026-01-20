import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import TrackedLink from "@/components/casino/TrackedLink";
import StickyMobileCTA from "@/components/casino/StickyMobileCTA";
import LicenseVerification from "@/components/casino/LicenseVerification";
import { getOnlineCasinoBySlug } from "@/lib/casinos";
import { getOnlineCasinoReviews, getReviewStats } from "@/lib/reviews";
import { checkOnlineTourEligibility } from "@/lib/tour-eligibility";
import { Globe, Star, Check, Gift, CreditCard, Gamepad2, Play } from "lucide-react";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const casino = await getOnlineCasinoBySlug(slug);

  if (!casino) {
    return { title: "Casino Not Found" };
  }

  const description = casino.shortDescription || casino.description?.slice(0, 160) || `${casino.name} online casino review. Expert ratings, bonuses, games, and trusted information.`;
  const rating = Number(casino.ratingOverall);

  return {
    title: `${casino.name} Review - Online Casino`,
    description,
    openGraph: {
      title: `${casino.name} Review | CasinoList.io`,
      description: casino.welcomeBonusDescription ? `${description} Welcome Bonus: ${casino.welcomeBonusDescription}` : description,
      url: `https://casinolist.io/online/${casino.slug}`,
      siteName: "CasinoList.io",
      type: "website",
      images: casino.heroImageUrl ? [
        {
          url: casino.heroImageUrl,
          width: 1200,
          height: 630,
          alt: casino.name,
        },
      ] : casino.logoUrl ? [
        {
          url: casino.logoUrl,
          width: 200,
          height: 200,
          alt: casino.name,
        },
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${casino.name} Review | CasinoList.io`,
      description: rating > 0 ? `${description} Rating: ${rating.toFixed(1)}/10` : description,
      images: casino.heroImageUrl ? [casino.heroImageUrl] : undefined,
    },
  };
}

export default async function OnlineCasinoProfilePage({ params }: Props) {
  const { slug } = await params;
  const casino = await getOnlineCasinoBySlug(slug);

  if (!casino) {
    notFound();
  }

  // Fetch reviews data
  const [reviews, reviewStats] = await Promise.all([
    getOnlineCasinoReviews(casino.id),
    getReviewStats(casino.id, "online"),
  ]);

  // Check tour eligibility
  const tourEligibility = checkOnlineTourEligibility(casino);

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
      <StructuredData type="online-casino" casino={casino} />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://casinolist.io" },
          { name: "Online Casinos", url: "https://casinolist.io/online-casinos" },
          { name: casino.name, url: `https://casinolist.io/online/${casino.slug}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <div className="relative h-64 md:h-72 bg-slate-800">
        {casino.heroImageUrl ? (
          <Image
            src={casino.heroImageUrl}
            alt={`${casino.name} online casino`}
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-4">
              {casino.logoUrl ? (
                <Image
                  src={casino.logoUrl}
                  alt={`${casino.name} logo`}
                  width={64}
                  height={64}
                  className="rounded-lg bg-white p-2"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white/80" />
                </div>
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
                {casino.foundedYear && (
                  <p className="text-slate-400 text-sm">
                    Established {casino.foundedYear}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Welcome Bonus */}
            {casino.welcomeBonusDescription && (
              <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800 rounded-xl p-6 border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Welcome Bonus
                  </h2>
                </div>
                <p className="text-2xl font-bold text-emerald-400 mb-2">
                  {casino.welcomeBonusDescription}
                </p>
                {casino.welcomeBonusWagering && (
                  <p className="text-slate-400 text-sm">
                    Wagering requirement: {casino.welcomeBonusWagering}x
                  </p>
                )}
              </div>
            )}

            {/* Rating Card */}
            {overallRating > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    CasinoList Rating
                  </h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                    <span className="text-3xl font-bold text-white">
                      {overallRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {ratingDisplay(casino.ratingGames, "Games & Selection")}
                  {ratingDisplay(casino.ratingService, "Customer Service")}
                  {ratingDisplay(casino.ratingAtmosphere, "User Experience")}
                  {ratingDisplay(casino.ratingValue, "Value & Bonuses")}
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
                <div className="flex items-center gap-3 mb-4">
                  <Gamepad2 className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Games Available
                  </h2>
                </div>
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

            {/* Game Providers */}
            {casino.gameProviders && casino.gameProviders.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Game Providers
                </h2>
                <div className="flex flex-wrap gap-2">
                  {casino.gameProviders.map((provider) => (
                    <span
                      key={provider}
                      className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm"
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {casino.paymentMethods && casino.paymentMethods.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Payment Methods
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {casino.paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {method.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Take the Tour CTA */}
            {tourEligibility.isEligible && (
              <Link
                href={`/online/${casino.slug}/tour`}
                className="block bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-xl p-6 border border-emerald-500/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Take the Tour
                    </h3>
                    <p className="text-emerald-200 text-sm">
                      Virtual walk-through
                    </p>
                  </div>
                </div>
                <p className="text-emerald-100 text-sm mb-4">
                  Explore {casino.name}'s games, bonuses, and features in an immersive experience.
                </p>
                <span className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all">
                  Start Tour
                  <span className="text-emerald-200">→</span>
                </span>
              </Link>
            )}

            {/* CTA */}
            {(casino.affiliateLink || casino.website) && (
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 border border-emerald-500/30">
                <TrackedLink
                  casinoId={casino.id}
                  casinoType="online"
                  affiliateLink={casino.affiliateLink}
                  websiteUrl={casino.website}
                  casinoName={casino.name}
                  variant="cta"
                  size="lg"
                  className="w-full"
                />
                <p className="text-emerald-200/80 text-xs text-center mt-3">
                  18+ | T&Cs Apply | Gamble Responsibly
                </p>
              </div>
            )}

            {/* Quick Info */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Info
              </h3>
              <div className="space-y-4">
                {casino.hasLiveCasino && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Live Casino Available</span>
                  </div>
                )}
                {casino.hasSportsbook && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Sportsbook Available</span>
                  </div>
                )}
                {casino.currencies && casino.currencies.length > 0 && (
                  <div className="text-slate-300">
                    <span className="text-slate-400 text-sm block mb-1">Currencies</span>
                    <span>{casino.currencies.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Licenses with Verification */}
            {casino.licenses && casino.licenses.length > 0 && (
              <LicenseVerification licenses={casino.licenses} />
            )}

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

            {/* Restricted Countries */}
            {casino.restrictedCountries && casino.restrictedCountries.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Restricted Countries
                </h3>
                <p className="text-slate-400 text-sm">
                  {casino.restrictedCountries.join(", ")}
                </p>
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
            casinoType="online"
            casinoName={casino.name}
          />
        </div>
      </main>

      <Footer />

      {/* Sticky Mobile CTA */}
      {(casino.affiliateLink || casino.website) && (
        <StickyMobileCTA
          casinoId={casino.id}
          casinoType="online"
          affiliateLink={casino.affiliateLink}
          websiteUrl={casino.website}
          casinoName={casino.name}
          bonusText={casino.welcomeBonusDescription}
        />
      )}
    </div>
  );
}
