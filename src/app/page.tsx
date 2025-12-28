import Link from "next/link";
import Header from "@/components/layout/Header";
import { MapPin, Globe, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
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
              href="/explore"
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { value: "500+", label: "Physical Casinos", icon: MapPin },
            { value: "100+", label: "Online Casinos", icon: Globe },
            { value: "50+", label: "Countries", icon: Users },
            { value: "4.5★", label: "Avg Rating", icon: Star },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 text-center"
            >
              <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

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
            href="/explore"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Open the Map
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
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
