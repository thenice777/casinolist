"use client";

import dynamic from "next/dynamic";
import { CasinoMapMarker } from "@/types/casino";

const CasinoMap = dynamic(() => import("./CasinoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center">
      <span className="text-slate-400">Loading map...</span>
    </div>
  ),
});

interface MapContainerProps {
  markers: CasinoMapMarker[];
}

export default function MapContainer({ markers }: MapContainerProps) {
  return <CasinoMap markers={markers} />;
}
