import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import { MapPin, Globe, Star, Users, Building2, ArrowRight } from "lucide-react";
import { getCasinoStats, getLandBasedCasinos, getOnlineCasinos, getDestinations } from "@/lib/casinos";

export default async function Home() {
  const [stats, featuredCasinos, featuredOnline, destinations] = await Promise.all([
    getCasinoStats(),
    getLandBasedCasinos({ featured: true, limit: 3 }),
    getOnlineCasinos({ featured: true, limit: 3 }),
    getDestinations({ featured: true, limit: 4 }),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <StructuredData type="organization" />
      <Header />

      {/* Hero */}
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-emerald-400 text-sm font-medium">
              Know the House
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover the World&apos;s
            <br />
            <span className="text-emerald-400">Finest Casinos</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            Explore online and land-based casinos worldwide on our interactive
            map. Curated ratings, honest reviews, and insider intelligence for
            discerning players.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Explore the Map
            </Link>
            <Link
              href="/online-casinos"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-slate-500 text-white font-semibold hover:border-emerald-400 hover:text-emerald-400 transition-colors"
            >
              Browse Online Casinos
            </Link>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
            <Building2 className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {stats.physicalCount}
            </div>
            <div className="text-sm text-slate-400">Physical Casinos</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
            <Globe className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {stats.onlineCount}
            </div>
            <div className="text-sm text-slate-400">Online Casinos</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
            <Users className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {stats.countries}
            </div>
            <div className="text-sm text-slate-400">Countries</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center">
            <Star className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {destinations.length}
            </div>
            <div className="text-sm text-slate-400">Destinations</div>
          </div>
        </div>

        {/* Featured Casinos */}
        {featuredCasinos.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Featured Casinos</h2>
              <Link
                href="/land-based-casinos"
                className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredCasinos.map((casino) => (
                <Link
                  key={casino.id}
                  href={`/casino/${casino.slug}`}
                  className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all group"
                >
                  <div className="h-40 bg-slate-700 relative">
                    {casino.heroImageUrl ? (
                      <img
                        src={casino.heroImageUrl}
                        alt={casino.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-slate-800" />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-amber-500/90 text-white text-xs px-2 py-0.5 rounded font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {casino.name}
                    </h3>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {casino.city}, {casino.country}
                    </p>
                    {Number(casino.ratingOverall) > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-white font-medium">
                          {Number(casino.ratingOverall).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Online */}
        {featuredOnline.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Top Online Casinos</h2>
              <Link
                href="/online-casinos"
                className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredOnline.map((casino) => (
                <Link
                  key={casino.id}
                  href={`/online/${casino.slug}`}
                  className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {casino.logoUrl ? (
                        <img src={casino.logoUrl} alt={casino.name} className="w-12 h-12 rounded-lg object-contain bg-white p-1" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                          <Globe className="w-6 h-6 text-white/80" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {casino.name}
                        </h3>
                        {casino.welcomeBonusDescription && (
                          <p className="text-emerald-400 text-sm">
                            {casino.welcomeBonusDescription}
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
                  </div>
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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Interactive World Map
            </h3>
            <p className="text-slate-400">
              Explore casinos visually. Zoom from global view to street level,
              filter by type, and discover hidden gems.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Excellence Ratings
            </h3>
            <p className="text-slate-400">
              Our multi-dimensional rating system evaluates games, service,
              atmosphere, value, and trust - not just bonuses.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Online & Physical
            </h3>
            <p className="text-slate-400">
              The only platform covering both worlds. Find online casinos and
              land-based venues in one place.
            </p>
          </div>
        </div>

        {/* Destinations Preview */}
        {destinations.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Popular Destinations</h2>
              <Link
                href="/destinations"
                className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {destinations.map((destination) => (
                <Link
                  key={destination.id}
                  href={`/destinations/${destination.slug}`}
                  className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-emerald-500/50 transition-all group"
                >
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{destination.country}</p>
                  <p className="text-emerald-400 text-sm mt-1">
                    {destination.casinoCount} casinos
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="mt-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay in the Know
            </h2>
            <p className="text-slate-300 mb-4">
              Get exclusive casino insights, new openings, and expert tips delivered to your inbox. Join thousands of discerning players.
            </p>
            <ul className="text-slate-400 text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                New casino reviews and ratings
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Destination guides and travel tips
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Exclusive VIP program insights
              </li>
            </ul>
          </div>
          <NewsletterSignup />
        </section>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-emerald-900/50 to-slate-800/50 rounded-2xl p-12 border border-emerald-700/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover Your Next Casino?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Start exploring the world&apos;s casinos on our interactive map.
            Vegas, Macau, Monaco - all at your fingertips.
          </p>
          <Link
            href="/map"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Open the Map
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
