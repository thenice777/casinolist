import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import { getDestinationBySlug, getCasinosByDestination } from "@/lib/casinos";
import { MapPin, Building2, Star, Check, Info } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination Not Found" };
  }

  return {
    title: destination.metaTitle || `${destination.name} Casinos | Know the House`,
    description: destination.metaDescription || destination.shortDescription || destination.description?.slice(0, 160),
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const casinos = await getCasinosByDestination(destination);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <StructuredData type="destination" destination={destination} />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://casinolist.io" },
          { name: "Destinations", url: "https://casinolist.io/destinations" },
          { name: destination.name, url: `https://casinolist.io/destinations/${destination.slug}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <div className="relative h-72 md:h-96 bg-slate-800">
        {destination.heroImageUrl ? (
          <img
            src={destination.heroImageUrl}
            alt={destination.name}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-slate-800/80 text-slate-300 text-sm px-3 py-1 rounded-full capitalize">
                {destination.type}
              </span>
              {destination.isFeatured && (
                <span className="bg-amber-500/20 text-amber-400 text-sm px-3 py-1 rounded-full">
                  Featured Destination
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <p className="text-slate-300 flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5" />
              {destination.country}
              {destination.state && `, ${destination.state}`}
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats bar */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-8 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-semibold">{destination.casinoCount}</span>
            <span className="text-slate-400">Casino{destination.casinoCount !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            {(destination.description || destination.shortDescription) && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  About {destination.name}
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {destination.description || destination.shortDescription}
                </p>
              </div>
            )}

            {/* Casino Overview */}
            {destination.casinoOverview && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Casino Scene
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {destination.casinoOverview}
                </p>
              </div>
            )}

            {/* Casinos in this destination */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Casinos in {destination.name}
              </h2>

              {casinos.length === 0 ? (
                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                  <p className="text-slate-400">
                    No casinos listed yet for this destination.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {casinos.map((casino) => (
                    <Link
                      key={casino.id}
                      href={`/casino/${casino.slug}`}
                      className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 group flex"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-slate-700">
                        {casino.heroImageUrl ? (
                          <img
                            src={casino.heroImageUrl}
                            alt={casino.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-slate-800" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-3 flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                            {casino.name}
                          </h3>
                          {casino.isVerified && (
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          )}
                        </div>

                        <p className="text-slate-400 text-sm mb-2">
                          {casino.city}
                        </p>

                        {Number(casino.ratingOverall) > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-white text-sm font-medium">
                              {Number(casino.ratingOverall).toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Practical Info */}
            {destination.practicalInfo && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Practical Info
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {destination.practicalInfo}
                </p>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Explore More
              </h3>
              <div className="space-y-3">
                <Link
                  href="/destinations"
                  className="block text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  View All Destinations
                </Link>
                <Link
                  href="/explore"
                  className="block text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  Explore World Map
                </Link>
                <Link
                  href="/land-based-casinos"
                  className="block text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  All Land-Based Casinos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
