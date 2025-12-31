import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "react-map-gl/mapbox": "react-map-gl/dist/mapbox.js",
      "mapbox-gl": "mapbox-gl/dist/mapbox-gl.js",
    },
  },
  transpilePackages: ["react-map-gl", "mapbox-gl"],
  webpack: (config) => {
    // Production build needs same resolve aliases as turbopack
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-map-gl/mapbox": "react-map-gl/dist/mapbox.js",
      "mapbox-gl": "mapbox-gl/dist/mapbox-gl.js",
    };
    return config;
  },
};

export default nextConfig;
