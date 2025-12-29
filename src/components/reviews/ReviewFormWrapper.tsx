"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, PenLine } from "lucide-react";
import ReviewForm from "./ReviewForm";

interface ReviewFormWrapperProps {
  casinoId: string;
  casinoType: "land_based" | "online";
  casinoName: string;
}

export default function ReviewFormWrapper({
  casinoId,
  casinoType,
  casinoName,
}: ReviewFormWrapperProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <PenLine className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
              Write a Review
            </h3>
            <p className="text-slate-400 text-sm">Share your experience</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-700">
          <ReviewForm
            casinoId={casinoId}
            casinoType={casinoType}
            casinoName={casinoName}
            onSuccess={() => {
              // Could refresh the page or update reviews list
              window.location.reload();
            }}
          />
        </div>
      )}
    </div>
  );
}
