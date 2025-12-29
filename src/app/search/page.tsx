import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import { searchCasinos } from "@/lib/casinos";
import { MapPin, Globe, Star, Check, Building2, Search, Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Casinos | Know the House",
  description: "Search for casinos, online gaming sites, and destinations worldwide.",
};

interface Props {
  searchParams: Promise<{ q?: string; type?: string; rating?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";
  const typeFilter = params.type || "all";
  const ratingFilter = Number(params.rating) || 0;

  const results = query ? await searchCasinos(query) : { landBased: [], online: [], destinations: [] };

  // Apply filters
  const filteredLandBased = results.landBased.filter((casino) => {
    if (typeFilter !== "all" && typeFilter !== "land_based") return false;
    if (ratingFilter > 0 && Number(casino.ratingOverall) < ratingFilter) return false;
    return true;
  });

  const filteredOnline = results.online.filter((casino) => {
    if (typeFilter !== "all" && typeFilter !== "online") return false;
    if (ratingFilter > 0 && Number(casino.ratingOverall) < ratingFilter) return false;
    return true;
  });

  const filteredDestinations = results.destinations.filter((destination) => {
    if (typeFilter !== "all" && typeFilter !== "destinations") return false;
    return true;
  });

  const totalResults = filteredLandBased.length + filteredOnline.length + filteredDestinations.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Search</h1>

          {/* Search Form */}
          <form action="/search" method="GET" className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search casinos, destinations..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Filters */}
        {query && <SearchFilters />}

        {/* Results */}
        {query && (
          <div className="mb-6">
            <p className="text-slate-400">
              {totalResults === 0 ? (
                <>No results found for &quot;{query}&quot;</>
              ) : (
                <>Found {totalResults} result{totalResults !== 1 ? "s" : ""} for &quot;{query}&quot;</>
              )}
            </p>
          </div>
        )}

        {totalResults > 0 && (
          <div className="space-y-12">
            {/* Destinations */}
            {filteredDestinations.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                  Destinations ({filteredDestinations.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDestinations.map((destination) => (
                    <Link
                      key={destination.id}
                      href={`/destinations/${destination.slug}`}
                      className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all group"
                    >
                      {destination.heroImageUrl && (
                        <div className="h-32 bg-slate-700">
                          <img
                            src={destination.heroImageUrl}
                            alt={destination.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {destination.name}
                        </h3>
                        <p className="text-slate-400 text-sm mb-2">
                          {destination.country}
                        </p>
                        <div className="flex items-center gap-2 text-emerald-400 text-sm">
                          <Building2 className="w-4 h-4" />
                          <span>{destination.casinoCount} casinos</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Land-Based Casinos */}
            {filteredLandBased.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                  Land-Based Casinos ({filteredLandBased.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLandBased.map((casino) => (
                    <Link
                      key={casino.id}
                      href={`/casino/${casino.slug}`}
                      className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all group"
                    >
                      {casino.heroImageUrl && (
                        <div className="h-32 bg-slate-700">
                          <img
                            src={casino.heroImageUrl}
                            alt={casino.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                            {casino.name}
                          </h3>
                          {casino.isVerified && (
                            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded flex items-center gap-1 flex-shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm flex items-center gap-1 mb-2">
                          <MapPin className="w-3.5 h-3.5" />
                          {casino.city}, {casino.country}
                        </p>
                        <div className="flex items-center justify-between">
                          {Number(casino.ratingOverall) > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-white text-sm font-medium">
                                {Number(casino.ratingOverall).toFixed(1)}
                              </span>
                            </div>
                          )}
                          {casino.experienceTiers && casino.experienceTiers.length > 0 && (
                            <span className="text-xs text-amber-400/80 capitalize">
                              {casino.experienceTiers[0].replace(/_/g, " ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Online Casinos */}
            {filteredOnline.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  Online Casinos ({filteredOnline.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredOnline.map((casino) => (
                    <Link
                      key={casino.id}
                      href={`/online/${casino.slug}`}
                      className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-emerald-500/50 transition-all group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        {casino.logoUrl ? (
                          <img
                            src={casino.logoUrl}
                            alt={casino.name}
                            className="w-12 h-12 rounded-lg bg-white p-1"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-emerald-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                              {casino.name}
                            </h3>
                            {casino.isVerified && (
                              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded flex items-center gap-1 flex-shrink-0">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          {Number(casino.ratingOverall) > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-white text-sm font-medium">
                                {Number(casino.ratingOverall).toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {casino.welcomeBonusDescription && (
                        <div className="flex items-center gap-1.5 text-emerald-400 text-sm mb-2">
                          <Gift className="w-4 h-4" />
                          <span className="truncate">{casino.welcomeBonusDescription}</span>
                        </div>
                      )}
                      {casino.shortDescription && (
                        <p className="text-slate-400 text-sm line-clamp-2">
                          {casino.shortDescription}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Empty state */}
        {!query && (
          <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Find Your Perfect Casino
            </h2>
            <p className="text-slate-400 mb-6">
              Search for casinos by name, location, or features
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/land-based-casinos"
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Building2 className="w-4 h-4" />
                Browse Land-Based
              </Link>
              <Link
                href="/online-casinos"
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                Browse Online
              </Link>
              <Link
                href="/destinations"
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Browse Destinations
              </Link>
            </div>
          </div>
        )}

        {/* No results with filters */}
        {query && totalResults === 0 && (
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">
              No matches found
            </h2>
            <p className="text-slate-400 mb-4">
              Try adjusting your filters or search for something else
            </p>
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="text-emerald-400 hover:text-emerald-300 text-sm"
            >
              Clear all filters
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
