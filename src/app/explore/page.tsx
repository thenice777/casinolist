import { Metadata } from "next";
import Link from "next/link";
import MapContainer from "@/components/map/MapContainer";
import { getCasinoMapMarkers } from "@/lib/casinos";

export const metadata: Metadata = {
  title: "Explore Casinos Worldwide | Know the House",
  description:
    "Discover casinos around the world on our interactive map. Find land-based casinos near you.",
};

export default async function ExplorePage() {
  const markers = await getCasinoMapMarkers();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700 flex-shrink-0 bg-slate-900/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-white">
            Casino<span className="text-emerald-400">List</span>.io
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/explore"
              className="text-emerald-400 font-medium"
            >
              Explore Map
            </Link>
            <Link
              href="/online-casinos"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Online Casinos
            </Link>
            <Link
              href="/land-based-casinos"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Land-Based Casinos
            </Link>
          </div>
        </nav>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer markers={markers} />

        {/* Overlay UI */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700 max-w-xs">
          <h1 className="text-lg font-semibold text-white mb-2">
            Explore Casinos Worldwide
          </h1>
          <p className="text-sm text-slate-400 mb-3">
            Click on any pin to discover casino details. Use filters to narrow your search.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Casinos
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Featured
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
          <span className="text-sm text-slate-400">
            <span className="text-white font-medium">{markers.length}</span> casino{markers.length !== 1 ? 's' : ''} in database
          </span>
        </div>
      </div>
    </div>
  );
}
