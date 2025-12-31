// Mapbox configuration for CasinoList.io world map

// Map style URLs (dark theme compatible)
export const MAPBOX_STYLES = {
  dark: "mapbox://styles/mapbox/dark-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  streets: "mapbox://styles/mapbox/streets-v12",
} as const;

// Initial view state for globe view
export const DEFAULT_VIEW_STATE = {
  latitude: 30,
  longitude: 0,
  zoom: 1.8,
  pitch: 0,
  bearing: 0,
};

// View bounds for famous casino destinations
export const CASINO_HOTSPOTS = {
  lasVegas: { latitude: 36.1147, longitude: -115.1728, zoom: 13 },
  lasVegasDowntown: { latitude: 36.1716, longitude: -115.1422, zoom: 15 },
  macau: { latitude: 22.1987, longitude: 113.5439, zoom: 13 },
  monaco: { latitude: 43.7384, longitude: 7.4246, zoom: 15 },
  atlanticCity: { latitude: 39.3643, longitude: -74.4229, zoom: 14 },
  singapore: { latitude: 1.2838, longitude: 103.8591, zoom: 14 },
  london: { latitude: 51.5114, longitude: -0.1204, zoom: 13 },
  melbourne: { latitude: -37.8226, longitude: 144.9578, zoom: 14 },
  sydney: { latitude: -33.8688, longitude: 151.2093, zoom: 14 },
} as const;

// Clustering configuration for Supercluster
export const CLUSTER_CONFIG = {
  radius: 50, // Cluster radius in pixels
  maxZoom: 14, // Max zoom to cluster points on
  minPoints: 2, // Minimum points to form a cluster
  extent: 512, // Tile extent (default 512)
  nodeSize: 64, // Size of the KD-tree leaf node
};

// Marker colors matching the design system
export const MARKER_COLORS = {
  // Land-based casinos
  regular: "#10B981", // emerald-500
  featured: "#F59E0B", // amber-500
  selected: "#FFFFFF", // white ring

  // Online casinos (by trust level)
  online: {
    high: "#3B82F6", // blue-500
    medium: "#F59E0B", // amber-500
    low: "#EF4444", // red-500
  },

  // Clusters
  cluster: "#6366F1", // indigo-500
  clusterText: "#FFFFFF",
};

// Fog configuration for globe view (matches slate-900 theme)
export const FOG_CONFIG = {
  color: "rgb(15, 23, 42)", // slate-900
  "high-color": "rgb(30, 41, 59)", // slate-800
  "horizon-blend": 0.02,
  "space-color": "rgb(15, 23, 42)", // slate-900
  "star-intensity": 0.6,
};

// Map bounds to prevent excessive panning
export const MAP_BOUNDS = {
  maxBounds: [
    [-180, -85], // Southwest
    [180, 85], // Northeast
  ] as [[number, number], [number, number]],
  minZoom: 1,
  maxZoom: 18,
};

// Animation durations (ms)
export const ANIMATION = {
  flyToDuration: 1500,
  clusterExpandDuration: 500,
  markerTransition: 200,
};

export type MapStyle = keyof typeof MAPBOX_STYLES;
export type CasinoHotspot = keyof typeof CASINO_HOTSPOTS;
