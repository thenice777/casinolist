"use client";

import { useState } from "react";
import { CasinoMapMarker } from "@/types/casino";
import { cn } from "@/lib/utils";

interface CasinoMapProps {
  markers: CasinoMapMarker[];
  initialViewState?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  onMarkerClick?: (marker: CasinoMapMarker) => void;
}

export default function CasinoMap({
  markers,
  onMarkerClick,
}: CasinoMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<CasinoMapMarker | null>(
    null
  );

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Placeholder until Mapbox is configured
  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-slate-900 relative overflow-hidden">
        {/* Background world map SVG */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 1000 500" className="w-full h-full max-w-4xl">
            <ellipse cx="500" cy="250" rx="450" ry="200" fill="none" stroke="#10B981" strokeWidth="1" />
            <ellipse cx="500" cy="250" rx="300" ry="133" fill="none" stroke="#10B981" strokeWidth="0.5" />
            <ellipse cx="500" cy="250" rx="150" ry="67" fill="none" stroke="#10B981" strokeWidth="0.5" />
            <line x1="50" y1="250" x2="950" y2="250" stroke="#10B981" strokeWidth="0.5" />
            <line x1="500" y1="50" x2="500" y2="450" stroke="#10B981" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Casino markers preview */}
        <div className="absolute inset-0">
          {markers.map((marker, idx) => {
            // Simple positioning based on coordinates
            const x = ((marker.longitude + 180) / 360) * 100;
            const y = ((90 - marker.latitude) / 180) * 100;

            return (
              <button
                key={marker.id}
                onClick={() => {
                  setSelectedMarker(marker);
                  onMarkerClick?.(marker);
                }}
                className={cn(
                  "absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-150 z-10",
                  marker.isFeatured
                    ? "bg-amber-400 shadow-lg shadow-amber-400/50"
                    : "bg-emerald-400 shadow-lg shadow-emerald-400/50",
                  selectedMarker?.id === marker.id && "ring-2 ring-white scale-150"
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
                title={marker.name}
              />
            );
          })}
        </div>

        {/* Selected marker info */}
        {selectedMarker && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-700 rounded-lg p-4 min-w-[250px] z-20">
            <button
              onClick={() => setSelectedMarker(null)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              ×
            </button>
            <h3 className="font-semibold text-white">{selectedMarker.name}</h3>
            <p className="text-sm text-slate-400">
              {selectedMarker.city}, {selectedMarker.country}
            </p>
            {selectedMarker.ratingOverall > 0 && (
              <p className="text-sm text-amber-400 mt-1">
                {"★".repeat(Math.round(selectedMarker.ratingOverall))}
                {"☆".repeat(5 - Math.round(selectedMarker.ratingOverall))}
                <span className="ml-1 text-slate-500">
                  ({selectedMarker.ratingOverall.toFixed(1)})
                </span>
              </p>
            )}
            <a
              href={`/casino/${selectedMarker.slug}`}
              className="mt-2 inline-block text-sm text-emerald-400 hover:text-emerald-300"
            >
              View Details →
            </a>
          </div>
        )}

        {/* Setup notice */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-slate-500 text-sm mb-2">Interactive Map Preview</p>
          <p className="text-slate-600 text-xs">Add NEXT_PUBLIC_MAPBOX_TOKEN for full experience</p>
        </div>
      </div>
    );
  }

  // Full Mapbox implementation would go here when token is available
  // For now, return the placeholder
  return (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
      <p className="text-slate-400">Map loading...</p>
    </div>
  );
}
