"use client";

import { useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

interface TrackedLinkProps {
  casinoId: string;
  casinoType: "online" | "land_based";
  affiliateLink?: string;
  websiteUrl?: string;
  casinoName: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "cta";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  subid?: string;
}

export default function TrackedLink({
  casinoId,
  casinoType,
  affiliateLink,
  websiteUrl,
  casinoName,
  className = "",
  variant = "primary",
  size = "md",
  children,
  subid,
}: TrackedLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Determine the destination URL (affiliate link takes priority)
  const destinationUrl = affiliateLink || websiteUrl;

  if (!destinationUrl) {
    return null;
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Track the click asynchronously
      await fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          casinoId,
          casinoType,
          affiliateLink: destinationUrl,
          subid,
        }),
      });
    } catch {
      // If tracking fails, still redirect the user
      console.error("Click tracking failed");
    }

    // Open in new tab
    window.open(destinationUrl, "_blank", "noopener,noreferrer");
    setIsLoading(false);
  };

  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/30",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    outline: "border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10",
    cta: "bg-white hover:bg-slate-50 text-emerald-700 font-semibold shadow-lg hover:shadow-xl border-2 border-white/20",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={`Visit ${casinoName}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Opening...
        </>
      ) : (
        <>
          {children || "Visit Casino"}
          <ExternalLink className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
