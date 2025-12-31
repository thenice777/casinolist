"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  MapRef,
} from "react-map-gl/mapbox";
import Supercluster from "supercluster";
import { CasinoMapMarker } from "@/types/casino";
import { cn } from "@/lib/utils";
import CasinoPin from "./CasinoPin";
import ClusterMarker from "./ClusterMarker";
import CasinoPopup from "./CasinoPopup";
import {
  DEFAULT_VIEW_STATE,
  MAPBOX_STYLES,
  CLUSTER_CONFIG,
  FOG_CONFIG,
  ANIMATION,
} from "@/lib/mapbox-config";

interface CasinoMapProps {
  markers: CasinoMapMarker[];
  initialViewState?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  onMarkerClick?: (marker: CasinoMapMarker) => void;
}

// GeoJSON feature type for Supercluster
type PointFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: CasinoMapMarker;
};

type ClusterFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: {
    cluster: boolean;
    cluster_id: number;
    point_count: number;
  };
};

type MapFeature = PointFeature | ClusterFeature;

export default function CasinoMap({
  markers,
  initialViewState = DEFAULT_VIEW_STATE,
  onMarkerClick,
}: CasinoMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState(initialViewState);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<CasinoMapMarker | null>(
    null
  );
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Debug: log token status
  useEffect(() => {
    console.log('[CasinoMap] Token exists:', !!mapboxToken);
    console.log('[CasinoMap] Token prefix:', mapboxToken?.substring(0, 10));
    console.log('[CasinoMap] Markers count:', markers.length);
  }, [mapboxToken, markers.length]);

  // Convert markers to GeoJSON points
  const points: PointFeature[] = useMemo(
    () =>
      markers.map((marker) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [marker.longitude, marker.latitude] as [number, number],
        },
        properties: marker,
      })),
    [markers]
  );

  // Initialize Supercluster
  const supercluster = useMemo(() => {
    const cluster = new Supercluster<CasinoMapMarker>({
      radius: CLUSTER_CONFIG.radius,
      maxZoom: CLUSTER_CONFIG.maxZoom,
      minPoints: CLUSTER_CONFIG.minPoints,
    });
    cluster.load(points);
    return cluster;
  }, [points]);

  // Get clusters for current viewport
  const clusters = useMemo(() => {
    if (!mapLoaded) return points;

    const bounds = mapRef.current?.getMap().getBounds();
    if (!bounds) return points;

    const bbox: [number, number, number, number] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];

    try {
      return supercluster.getClusters(bbox, Math.floor(viewState.zoom)) as MapFeature[];
    } catch {
      return points;
    }
  }, [supercluster, viewState.zoom, points, mapLoaded]);

  // Handle cluster expansion
  const handleClusterClick = useCallback(
    (clusterId: number, longitude: number, latitude: number) => {
      try {
        const expansionZoom = Math.min(
          supercluster.getClusterExpansionZoom(clusterId),
          18
        );

        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: expansionZoom,
          duration: ANIMATION.clusterExpandDuration,
        });
      } catch (e) {
        // Fallback: just zoom in
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: viewState.zoom + 2,
          duration: ANIMATION.clusterExpandDuration,
        });
      }
    },
    [supercluster, viewState.zoom]
  );

  // Handle marker click
  const handleMarkerClick = useCallback(
    (marker: CasinoMapMarker) => {
      setSelectedMarker(marker);
      onMarkerClick?.(marker);

      // Center on marker with smooth animation
      mapRef.current?.flyTo({
        center: [marker.longitude, marker.latitude],
        zoom: Math.max(viewState.zoom, 12),
        duration: ANIMATION.flyToDuration,
      });
    },
    [onMarkerClick, viewState.zoom]
  );

  // Close popup when clicking elsewhere
  const handleMapClick = useCallback(() => {
    if (selectedMarker) {
      setSelectedMarker(null);
    }
  }, [selectedMarker]);

  // Placeholder fallback when no Mapbox token
  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-slate-900 relative overflow-hidden">
        {/* Background world map SVG */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 1000 500" className="w-full h-full max-w-4xl">
            <ellipse
              cx="500"
              cy="250"
              rx="450"
              ry="200"
              fill="none"
              stroke="#10B981"
              strokeWidth="1"
            />
            <ellipse
              cx="500"
              cy="250"
              rx="300"
              ry="133"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.5"
            />
            <ellipse
              cx="500"
              cy="250"
              rx="150"
              ry="67"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.5"
            />
            <line
              x1="50"
              y1="250"
              x2="950"
              y2="250"
              stroke="#10B981"
              strokeWidth="0.5"
            />
            <line
              x1="500"
              y1="50"
              x2="500"
              y2="450"
              stroke="#10B981"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Casino markers preview */}
        <div className="absolute inset-0">
          {markers.map((marker) => {
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
                  marker.type === "online"
                    ? "bg-blue-400 ring-2 ring-white/30"
                    : marker.isFeatured
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
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
            <CasinoPopup
              marker={selectedMarker}
              onClose={() => setSelectedMarker(null)}
            />
          </div>
        )}

        {/* Setup notice */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-slate-500 text-sm mb-2">Interactive Map Preview</p>
          <p className="text-slate-600 text-xs">
            Add NEXT_PUBLIC_MAPBOX_TOKEN for full experience
          </p>
        </div>
      </div>
    );
  }

  // Full Mapbox GL implementation
  return (
    <Map
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      onLoad={() => {
        console.log('[CasinoMap] Map loaded successfully');
        setMapLoaded(true);
      }}
      onError={(e) => console.error('[CasinoMap] Map error:', e)}
      onClick={handleMapClick}
      mapStyle={MAPBOX_STYLES.dark}
      mapboxAccessToken={mapboxToken}
      projection={{ name: "globe" }}
      fog={FOG_CONFIG}
      style={{ width: "100%", height: "100%" }}
      attributionControl={false}
      reuseMaps
      minZoom={1}
      maxZoom={18}
    >
      {/* Navigation Controls */}
      <NavigationControl position="bottom-right" showCompass showZoom />
      <GeolocateControl
        position="bottom-right"
        trackUserLocation
        showUserHeading
      />

      {/* Render clusters and markers */}
      {clusters.map((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;

        // Check if it's a cluster
        if ("cluster" in feature.properties && feature.properties.cluster) {
          const { cluster_id, point_count } = feature.properties;

          return (
            <Marker
              key={`cluster-${cluster_id}`}
              longitude={longitude}
              latitude={latitude}
              anchor="center"
            >
              <ClusterMarker
                pointCount={point_count}
                onClick={() => handleClusterClick(cluster_id, longitude, latitude)}
              />
            </Marker>
          );
        }

        // Individual marker
        const marker = feature.properties as CasinoMapMarker;
        const isOnline = marker.type === "online";

        return (
          <Marker
            key={marker.id}
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
          >
            <div
              onMouseEnter={() => setHoveredMarkerId(marker.id)}
              onMouseLeave={() => setHoveredMarkerId(null)}
            >
              <CasinoPin
                isFeatured={marker.isFeatured}
                isOnline={isOnline}
                experienceTiers={marker.experienceTiers}
                trustLevel={marker.trustLevel}
                isSelected={selectedMarker?.id === marker.id}
                isHovered={hoveredMarkerId === marker.id}
                onClick={() => handleMarkerClick(marker)}
              />
            </div>
          </Marker>
        );
      })}

      {/* Selected Casino Popup */}
      {selectedMarker && (
        <Popup
          longitude={selectedMarker.longitude}
          latitude={selectedMarker.latitude}
          anchor="bottom"
          offset={[0, -35]}
          closeButton={false}
          closeOnClick={false}
          onClose={() => setSelectedMarker(null)}
          className="casino-popup"
        >
          <CasinoPopup
            marker={selectedMarker}
            onClose={() => setSelectedMarker(null)}
          />
        </Popup>
      )}
    </Map>
  );
}
