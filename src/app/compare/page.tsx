import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getLandBasedCasinoBySlug, getOnlineCasinoBySlug } from "@/lib/casinos";
import { LandBasedCasino, OnlineCasino } from "@/types/casino";
import { MapPin, Globe, Star, Check, X, Clock, Users, Gift, Shield, Gamepad2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare Casinos | CasinoList.io",
  description: "Compare casinos side by side to find the best match for your gaming style.",
};

interface Props {
  searchParams: Promise<{ casinos?: string; type?: string }>;
}

function RatingBar({ rating, label }: { rating: number | undefined; label: string }) {
  const numRating = Number(rating) || 0;
  if (numRating <= 0) return <span className="text-slate-500">-</span>;

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full"
          style={{ width: `${(numRating / 10) * 100}%` }}
        />
      </div>
      <span className="text-white text-sm">{numRating.toFixed(1)}</span>
    </div>
  );
}

function CompareValue({ value, type = "text" }: { value: unknown; type?: "text" | "boolean" | "list" | "rating" }) {
  if (value === undefined || value === null) {
    return <span className="text-slate-500">-</span>;
  }

  if (type === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-emerald-400" />
    ) : (
      <X className="w-5 h-5 text-slate-500" />
    );
  }

  if (type === "list" && Array.isArray(value)) {
    if (value.length === 0) return <span className="text-slate-500">-</span>;
    return (
      <div className="flex flex-wrap gap-1">
        {value.slice(0, 5).map((item) => (
          <span key={item} className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs capitalize">
            {String(item).replace(/_/g, " ")}
          </span>
        ))}
        {value.length > 5 && (
          <span className="text-slate-400 text-xs">+{value.length - 5} more</span>
        )}
      </div>
    );
  }

  if (type === "rating") {
    return <RatingBar rating={value as number} label="" />;
  }

  return <span className="text-slate-300 text-sm">{String(value)}</span>;
}

export default async function ComparePage({ searchParams }: Props) {
  const { casinos: casinoSlugs, type = "land_based" } = await searchParams;

  if (!casinoSlugs) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Compare Casinos</h1>
            <p className="text-slate-400 mb-8">
              Select casinos to compare from our listings.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/land-based-casinos"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Browse Land-Based Casinos
              </Link>
              <Link
                href="/online-casinos"
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Browse Online Casinos
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const slugList = casinoSlugs.split(",").slice(0, 4);

  let casinosToCompare: (LandBasedCasino | OnlineCasino | null)[] = [];

  if (type === "online") {
    casinosToCompare = await Promise.all(
      slugList.map((slug) => getOnlineCasinoBySlug(slug.trim()))
    );
  } else {
    casinosToCompare = await Promise.all(
      slugList.map((slug) => getLandBasedCasinoBySlug(slug.trim()))
    );
  }

  const validCasinos = casinosToCompare.filter((c): c is LandBasedCasino | OnlineCasino => c !== null);

  if (validCasinos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">No Casinos Found</h1>
            <p className="text-slate-400 mb-8">
              The requested casinos could not be found.
            </p>
            <Link
              href={type === "online" ? "/online-casinos" : "/land-based-casinos"}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Browse Casinos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOnline = type === "online";

  const comparisonRows = isOnline ? [
    { label: "Overall Rating", key: "ratingOverall", type: "rating" as const },
    { label: "Games Rating", key: "ratingGames", type: "rating" as const },
    { label: "Service Rating", key: "ratingService", type: "rating" as const },
    { label: "UX Rating", key: "ratingAtmosphere", type: "rating" as const },
    { label: "Value Rating", key: "ratingValue", type: "rating" as const },
    { label: "Trust Rating", key: "ratingTrust", type: "rating" as const },
    { label: "Welcome Bonus", key: "welcomeBonusDescription", type: "text" as const },
    { label: "Wagering Req.", key: "welcomeBonusWagering", type: "text" as const },
    { label: "Live Casino", key: "hasLiveCasino", type: "boolean" as const },
    { label: "Sportsbook", key: "hasSportsbook", type: "boolean" as const },
    { label: "Games", key: "games", type: "list" as const },
    { label: "Payment Methods", key: "paymentMethods", type: "list" as const },
    { label: "Currencies", key: "currencies", type: "list" as const },
    { label: "Licenses", key: "licenses", type: "list" as const },
  ] : [
    { label: "Overall Rating", key: "ratingOverall", type: "rating" as const },
    { label: "Games Rating", key: "ratingGames", type: "rating" as const },
    { label: "Service Rating", key: "ratingService", type: "rating" as const },
    { label: "Atmosphere Rating", key: "ratingAtmosphere", type: "rating" as const },
    { label: "Value Rating", key: "ratingValue", type: "rating" as const },
    { label: "Trust Rating", key: "ratingTrust", type: "rating" as const },
    { label: "Location", key: "location", type: "text" as const },
    { label: "24 Hours", key: "is24Hours", type: "boolean" as const },
    { label: "Minimum Age", key: "minimumAge", type: "text" as const },
    { label: "Poker Room", key: "hasPokerRoom", type: "boolean" as const },
    { label: "Sportsbook", key: "hasSportsbook", type: "boolean" as const },
    { label: "Hotel", key: "hasHotel", type: "boolean" as const },
    { label: "Games", key: "games", type: "list" as const },
    { label: "Amenities", key: "amenities", type: "list" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Compare {isOnline ? "Online" : "Land-Based"} Casinos
          </h1>
          <p className="text-slate-400">
            Side-by-side comparison of {validCasinos.length} casinos
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Casino Headers */}
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-4 min-w-[160px]">
                    <span className="text-slate-400 text-sm font-normal">Feature</span>
                  </th>
                  {validCasinos.map((casino) => (
                    <th key={casino.id} className="p-4 min-w-[200px]">
                      <Link
                        href={isOnline ? `/online/${casino.slug}` : `/casino/${casino.slug}`}
                        className="block group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {casino.logoUrl ? (
                            <img
                              src={casino.logoUrl}
                              alt={casino.name}
                              className="w-10 h-10 rounded-lg bg-white p-1"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                              {isOnline ? (
                                <Globe className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <MapPin className="w-5 h-5 text-emerald-400" />
                              )}
                            </div>
                          )}
                          <div className="text-left">
                            <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                              {casino.name}
                            </h3>
                            {!isOnline && "city" in casino && (
                              <p className="text-slate-400 text-xs">
                                {casino.city}, {casino.country}
                              </p>
                            )}
                          </div>
                        </div>
                        {Number(casino.ratingOverall) > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-white font-medium">
                              {Number(casino.ratingOverall).toFixed(1)}
                            </span>
                          </div>
                        )}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Comparison Rows */}
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.key}
                    className={index % 2 === 0 ? "bg-slate-800/30" : ""}
                  >
                    <td className="p-4 text-slate-400 text-sm font-medium">
                      {row.label}
                    </td>
                    {validCasinos.map((casino) => {
                      let value: unknown;

                      if (row.key === "location" && "city" in casino) {
                        value = `${casino.city}, ${casino.country}`;
                      } else {
                        value = (casino as unknown as Record<string, unknown>)[row.key];
                      }

                      // Handle wagering requirement display
                      if (row.key === "welcomeBonusWagering" && value) {
                        value = `${value}x`;
                      }

                      return (
                        <td key={casino.id} className="p-4">
                          <CompareValue value={value} type={row.type} />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={isOnline ? "/online-casinos" : "/land-based-casinos"}
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Browse More Casinos
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
