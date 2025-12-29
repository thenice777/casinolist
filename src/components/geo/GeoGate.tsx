"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X, ExternalLink } from "lucide-react";
import { getHelplineForCountry, isWarningCountry, MIN_GAMBLING_AGE } from "@/lib/geo";

interface GeoGateProps {
  children: React.ReactNode;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function GeoGate({ children }: GeoGateProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [minAge, setMinAge] = useState(18);

  useEffect(() => {
    // Check if warning was already dismissed this session
    const dismissedSession = sessionStorage.getItem("geo_warning_dismissed");
    if (dismissedSession) {
      setDismissed(true);
      return;
    }

    // Get geo info from cookies
    const geoCountry = getCookie("geo_country");
    const geoMinAge = getCookie("geo_min_age");

    setCountry(geoCountry);
    setMinAge(parseInt(geoMinAge || "18", 10));

    // Show warning for countries with strict regulations
    if (geoCountry && isWarningCountry(geoCountry)) {
      setShowWarning(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("geo_warning_dismissed", "1");
  };

  const helpline = getHelplineForCountry(country);

  if (!showWarning || dismissed) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Warning Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-900/95 backdrop-blur border-b border-amber-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-amber-100 text-sm font-medium mb-1">
                Gambling Regulations Notice
              </p>
              <p className="text-amber-200/80 text-xs leading-relaxed">
                Online gambling is strictly regulated in your region. Only play at licensed operators.
                You must be {minAge}+ to gamble. If you need help:{" "}
                <a
                  href={helpline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 underline inline-flex items-center gap-1"
                >
                  {helpline.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
                {helpline.phone && (
                  <>
                    {" "}or call{" "}
                    <a href={`tel:${helpline.phone.replace(/[^0-9+]/g, "")}`} className="text-amber-300 hover:text-amber-200 underline">
                      {helpline.phone}
                    </a>
                  </>
                )}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-amber-400 hover:text-amber-200 p-1 -mr-1"
              aria-label="Dismiss warning"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add padding to account for fixed banner */}
      <div className="pt-20">
        {children}
      </div>
    </>
  );
}
