"use client";

import { cn } from "@/lib/utils";

interface ClusterMarkerProps {
  pointCount: number;
  onClick?: () => void;
  isHovered?: boolean;
}

export default function ClusterMarker({
  pointCount,
  onClick,
  isHovered = false,
}: ClusterMarkerProps) {
  // Size scales with point count
  const getSize = () => {
    if (pointCount < 10) return 40;
    if (pointCount < 50) return 48;
    if (pointCount < 100) return 56;
    return 64;
  };

  const size = getSize();

  // Format large numbers
  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    if (count >= 100) return `${count}`;
    return count.toString();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent map click from firing
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded-full cursor-pointer",
        "bg-indigo-600 border-2 border-indigo-400",
        "shadow-lg shadow-indigo-600/50",
        "transition-transform duration-200",
        isHovered && "scale-110"
      )}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold text-sm">
        {formatCount(pointCount)}
      </span>
    </button>
  );
}
