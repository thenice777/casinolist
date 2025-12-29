import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { getDestinations } from "@/lib/casinos";
import { MapPin, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Casino Destinations | Know the House",
  description:
    "Explore the world's premier casino destinations. From Las Vegas to Macau, discover where to play.",
};

export default async function DestinationsPage() {
  const destinations = await getDestinations({ limit: 50 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Casino Destinations
          </h1>
          <p className="text-slate-400 text-lg">
            Explore the world's premier casino destinations and plan your next gaming adventure.
          </p>
        </div>

        {destinations.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
            <p className="text-slate-400">
              No destinations found. Check back soon for new locations.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 group"
              >
                {/* Image */}
                <div className="h-48 bg-slate-700 relative">
                  {destination.heroImageUrl ? (
                    <img
                      src={destination.heroImageUrl}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-slate-800 flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-emerald-500/30" />
                    </div>
                  )}

                  {/* Featured badge */}
                  {destination.isFeatured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-amber-500/90 text-white text-xs px-2 py-0.5 rounded font-medium">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Type badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-slate-900/80 text-slate-300 text-xs px-2 py-0.5 rounded capitalize">
                      {destination.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {destination.name}
                  </h2>

                  <p className="text-slate-400 text-sm mb-3">
                    {destination.country}
                    {destination.state && `, ${destination.state}`}
                  </p>

                  {destination.shortDescription && (
                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                      {destination.shortDescription}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-emerald-400">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {destination.casinoCount} Casino{destination.casinoCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
