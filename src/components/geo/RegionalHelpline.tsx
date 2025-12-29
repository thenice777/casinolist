"use client";

import { useState, useEffect } from "react";
import { Phone, ExternalLink } from "lucide-react";
import { getHelplineForCountry, MIN_GAMBLING_AGE } from "@/lib/geo";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function RegionalHelpline() {
  const [helpline, setHelpline] = useState<{ name: string; url: string; phone?: string } | null>(null);
  const [minAge, setMinAge] = useState(18);

  useEffect(() => {
    const country = getCookie("geo_country");
    const age = getCookie("geo_min_age");

    const helplineInfo = getHelplineForCountry(country);
    setHelpline(helplineInfo);
    setMinAge(parseInt(age || "18", 10));
  }, []);

  // Show default content during SSR
  if (!helpline) {
    return (
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <span className="font-medium text-slate-300">{minAge}+ Only</span>
        <span>•</span>
        <span>Gamble Responsibly</span>
        <span>•</span>
        <a
          href="https://www.gamblingtherapy.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
        >
          Get Help
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
      <span className="font-medium text-slate-300">{minAge}+ Only</span>
      <span>•</span>
      <span>Gamble Responsibly</span>
      <span>•</span>
      {helpline.phone && (
        <>
          <a
            href={`tel:${helpline.phone.replace(/[^0-9+]/g, "")}`}
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            {helpline.phone}
          </a>
          <span>•</span>
        </>
      )}
      <a
        href={helpline.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
      >
        {helpline.name}
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
