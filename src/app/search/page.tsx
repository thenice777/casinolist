import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { searchCasinos } from "@/lib/casinos";
import { MapPin, Globe, Star, Check, Building2, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Casinos | Know the House",
  description: "Search for casinos, online gaming sites, and destinations worldwide.",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";
  const results = query ? await searchCasinos(query) : { landBased: [], online: [], destinations: [] };
  const totalResults = results.landBased.length + results.online.length + results.destinations.length;

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

        {/* Results */}
        {query && (
          <div className="mb-6">
            <p className="text-slate-400">
              {totalResults === 0 ? (
                <>No results found for &quot;{query}&quot;</>
              ) : (
                <>Found {totalResults} result{totalResults !== 1 ? 's' : ''} for &quot;{query}&quot;</>
              )}
            </p>
          </div>
        )}

        {totalResults > 0 && (
          <div className="space-y-12">
            {/* Destinations */}
            {results.destinations.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                  Destinations
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.destinations.map((destination) => (
                    <Link
                      key={destination.id}
                      href={`/destinations/${destination.slug}`}
                      className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-emerald-500/50 transition-all group"
                    >
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
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Land-Based Casinos */}
            {results.landBased.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                  Land-Based Casinos
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.landBased.map((casino) => (
                    <Link
                      key={casino.id}
                      href={`/casino/${casino.slug}`}
                      className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-emerald-500/50 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {casino.name}
                        </h3>
                        {casino.isVerified && (
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-slate-400 text-sm flex items-center gap-1 mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        {casino.city}, {casino.country}
                      </p>
                      {Number(casino.ratingOverall) > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-white text-sm font-medium">
                            {Number(casino.ratingOverall).toFixed(1)}
                          </span>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Online Casinos */}
            {results.online.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  Online Casinos
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.online.map((casino) => (
                    <Link
                      key={casino.id}
                      href={`/online/${casino.slug}`}
                      className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-emerald-500/50 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {casino.name}
                        </h3>
                        {casino.isVerified && (
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                      </div>
                      {casino.shortDescription && (
                        <p className="text-slate-400 text-sm line-clamp-2 mb-2">
                          {casino.shortDescription}
                        </p>
                      )}
                      {Number(casino.ratingOverall) > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-white text-sm font-medium">
                            {Number(casino.ratingOverall).toFixed(1)}
                          </span>
                        </div>
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
            <p className="text-slate-400">
              Enter a search term to find casinos and destinations.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} CasinoList.io. Know the House.
            </p>
            <p className="text-slate-500 text-sm">
              Gamble responsibly. 18+ only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
