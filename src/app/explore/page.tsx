import { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CasinoMapMarker } from "@/types/casino";

// Import map client-side only (uses window)
const CasinoMap = dynamic(() => import("@/components/map/CasinoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center">
      <span className="text-slate-400">Loading map...</span>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Explore Casinos Worldwide",
  description:
    "Discover casinos around the world on our interactive map. Find land-based and online casinos near you.",
};

// Sample data for development - will be replaced with database fetch
const sampleMarkers: CasinoMapMarker[] = [
  {
    id: "1",
    name: "Bellagio",
    slug: "bellagio-las-vegas",
    type: "land_based",
    latitude: 36.1126,
    longitude: -115.1767,
    ratingOverall: 4.8,
    isFeatured: true,
    experienceTiers: ["destination", "high_roller_haven"],
    city: "Las Vegas",
    country: "United States",
  },
  {
    id: "2",
    name: "Casino de Monte-Carlo",
    slug: "casino-de-monte-carlo",
    type: "land_based",
    latitude: 43.7396,
    longitude: 7.4269,
    ratingOverall: 4.9,
    isFeatured: true,
    experienceTiers: ["destination", "historic_icon"],
    city: "Monte Carlo",
    country: "Monaco",
  },
  {
    id: "3",
    name: "The Venetian Macao",
    slug: "venetian-macao",
    type: "land_based",
    latitude: 22.1469,
    longitude: 113.5587,
    ratingOverall: 4.7,
    isFeatured: true,
    experienceTiers: ["destination", "high_roller_haven"],
    city: "Macau",
    country: "China",
  },
  {
    id: "4",
    name: "Crown Melbourne",
    slug: "crown-melbourne",
    type: "land_based",
    latitude: -37.8226,
    longitude: 144.9576,
    ratingOverall: 4.5,
    isFeatured: false,
    experienceTiers: ["destination"],
    city: "Melbourne",
    country: "Australia",
  },
  {
    id: "5",
    name: "Marina Bay Sands",
    slug: "marina-bay-sands",
    type: "land_based",
    latitude: 1.2847,
    longitude: 103.8608,
    ratingOverall: 4.8,
    isFeatured: true,
    experienceTiers: ["destination", "high_roller_haven"],
    city: "Singapore",
    country: "Singapore",
  },
  {
    id: "6",
    name: "Casino Baden-Baden",
    slug: "casino-baden-baden",
    type: "land_based",
    latitude: 48.7629,
    longitude: 8.2402,
    ratingOverall: 4.6,
    isFeatured: false,
    experienceTiers: ["historic_icon", "destination"],
    city: "Baden-Baden",
    country: "Germany",
  },
  {
    id: "7",
    name: "Wynn Las Vegas",
    slug: "wynn-las-vegas",
    type: "land_based",
    latitude: 36.1267,
    longitude: -115.1662,
    ratingOverall: 4.9,
    isFeatured: true,
    experienceTiers: ["destination", "high_roller_haven"],
    city: "Las Vegas",
    country: "United States",
  },
  {
    id: "8",
    name: "Sun City Resort",
    slug: "sun-city-resort",
    type: "land_based",
    latitude: -25.3439,
    longitude: 27.0928,
    ratingOverall: 4.3,
    isFeatured: false,
    experienceTiers: ["destination"],
    city: "Rustenburg",
    country: "South Africa",
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700 flex-shrink-0">
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
        <CasinoMap markers={sampleMarkers} />

        {/* Overlay UI */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700 max-w-xs">
          <h1 className="text-lg font-semibold text-white mb-2">
            Explore Casinos Worldwide
          </h1>
          <p className="text-sm text-slate-400 mb-3">
            Click on any pin to discover casino details. Gold pins are featured
            destinations.
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
            Showing <span className="text-white font-medium">{sampleMarkers.length}</span> casinos
          </span>
        </div>
      </div>
    </div>
  );
}
