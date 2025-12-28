import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "react-map-gl": "react-map-gl/dist/esm/index.js",
      "mapbox-gl": "mapbox-gl/dist/mapbox-gl.js",
    },
  },
  transpilePackages: ["react-map-gl", "mapbox-gl"],
};

export default nextConfig;
