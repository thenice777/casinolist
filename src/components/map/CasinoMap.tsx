"use client";

import { useState, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
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
  initialViewState = {
    latitude: 20,
    longitude: 0,
    zoom: 2,
  },
  onMarkerClick,
}: CasinoMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<CasinoMapMarker | null>(
    null
  );

  const handleMarkerClick = useCallback(
    (marker: CasinoMapMarker) => {
      setSelectedMarker(marker);
      onMarkerClick?.(marker);
    },
    [onMarkerClick]
  );

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
        <div className="text-center p-8">
          <p className="text-lg mb-2">Map requires Mapbox token</p>
          <p className="text-sm">
            Add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file
          </p>
        </div>
      </div>
    );
  }

  return (
    <Map
      initialViewState={initialViewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={mapboxToken}
    >
      <NavigationControl position="top-right" />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          latitude={marker.latitude}
          longitude={marker.longitude}
          anchor="center"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleMarkerClick(marker);
          }}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full cursor-pointer transition-all duration-200",
              "hover:scale-150 hover:z-10",
              marker.isFeatured
                ? "bg-amber-400 shadow-lg shadow-amber-400/50"
                : "bg-emerald-400 shadow-lg shadow-emerald-400/50",
              selectedMarker?.id === marker.id && "scale-150 ring-2 ring-white"
            )}
          />
        </Marker>
      ))}

      {selectedMarker && (
        <Popup
          latitude={selectedMarker.latitude}
          longitude={selectedMarker.longitude}
          anchor="bottom"
          onClose={() => setSelectedMarker(null)}
          closeButton={true}
          closeOnClick={false}
          className="casino-popup"
        >
          <div className="p-2 min-w-[200px]">
            <h3 className="font-semibold text-slate-900 text-sm">
              {selectedMarker.name}
            </h3>
            <p className="text-xs text-slate-600">
              {selectedMarker.city}, {selectedMarker.country}
            </p>
            {selectedMarker.ratingOverall > 0 && (
              <p className="text-xs text-amber-600 mt-1">
                {"★".repeat(Math.round(selectedMarker.ratingOverall))}
                {"☆".repeat(5 - Math.round(selectedMarker.ratingOverall))}
                <span className="ml-1 text-slate-500">
                  ({selectedMarker.ratingOverall.toFixed(1)})
                </span>
              </p>
            )}
            <a
              href={`/casino/${selectedMarker.slug}`}
              className="mt-2 inline-block text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View Details →
            </a>
          </div>
        </Popup>
      )}
    </Map>
  );
}
