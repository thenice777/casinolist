import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, MapPin, Globe, Building2, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <div className="text-8xl font-bold text-slate-700 mb-4">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Looks like this page took an unexpected trip to Vegas.
            Let us help you find what you're looking for.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-400" />
            Search for a Casino
          </h2>
          <form action="/search" method="GET" className="flex gap-3">
            <input
              type="text"
              name="q"
              placeholder="Search casinos, destinations..."
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Link
            href="/land-based-casinos"
            className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              Land-Based Casinos
            </h3>
            <p className="text-slate-400 text-sm mb-3">
              Browse world-class casino resorts and gaming destinations.
            </p>
            <span className="text-emerald-400 text-sm flex items-center gap-1">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <Link
            href="/online-casinos"
            className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              Online Casinos
            </h3>
            <p className="text-slate-400 text-sm mb-3">
              Discover trusted online casinos with exclusive bonuses.
            </p>
            <span className="text-emerald-400 text-sm flex items-center gap-1">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <Link
            href="/destinations"
            className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              Destinations
            </h3>
            <p className="text-slate-400 text-sm mb-3">
              Explore casino hotspots around the world.
            </p>
            <span className="text-emerald-400 text-sm flex items-center gap-1">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Popular Destinations */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Popular Casino Destinations
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Las Vegas", slug: "las-vegas" },
              { name: "Macau", slug: "macau" },
              { name: "Monte Carlo", slug: "monte-carlo" },
              { name: "Atlantic City", slug: "atlantic-city" },
              { name: "Singapore", slug: "singapore" },
              { name: "London", slug: "london" },
            ].map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinations/${destination.slug}`}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {destination.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Back Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-emerald-400 hover:text-emerald-300 font-medium"
          >
            ← Back to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
