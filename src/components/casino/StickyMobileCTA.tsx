"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Loader2, X } from "lucide-react";

interface StickyMobileCTAProps {
  casinoId: string;
  casinoType: "online" | "land_based";
  affiliateLink?: string;
  websiteUrl?: string;
  casinoName: string;
  bonusText?: string;
  subid?: string;
}

export default function StickyMobileCTA({
  casinoId,
  casinoType,
  affiliateLink,
  websiteUrl,
  casinoName,
  bonusText,
  subid = "sticky_mobile",
}: StickyMobileCTAProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const destinationUrl = affiliateLink || websiteUrl;

  // Show after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!destinationUrl || isDismissed) {
    return null;
  }

  const handleClick = async () => {
    setIsLoading(true);

    try {
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
      // Continue even if tracking fails
    }

    window.open(destinationUrl, "_blank", "noopener,noreferrer");
    setIsLoading(false);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transform transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          <button
            onClick={handleDismiss}
            className="p-1 text-emerald-200 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {casinoName}
            </p>
            {bonusText && (
              <p className="text-emerald-100 text-xs truncate">{bonusText}</p>
            )}
          </div>

          <button
            onClick={handleClick}
            disabled={isLoading}
            className="flex-shrink-0 bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Visit
                <ExternalLink className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        <p className="text-emerald-200/80 text-[10px] text-center mt-1">
          18+ | T&Cs Apply | Gamble Responsibly
        </p>
      </div>
    </div>
  );
}
