"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Info, Sparkles } from "lucide-react";

// Narrative structure from tour-narrative.ts
export interface NarrativeContent {
  headline: string;
  body?: string;
  callout?: string;
  facts?: string[];
  icon?: React.ReactNode;
}

interface NarrativeBlockProps {
  content: NarrativeContent;
  variant?: "default" | "highlight" | "compact" | "hero";
  expandable?: boolean;
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * NarrativeBlock - Consistent storytelling component for tour content
 *
 * Variants:
 * - default: Standard narrative block with optional expandable body
 * - highlight: Emphasized block with accent border for key moments
 * - compact: Smaller text, inline layout for space-constrained areas
 * - hero: Large headline with prominent styling for act intros
 */
export default function NarrativeBlock({
  content,
  variant = "default",
  expandable = false,
  defaultExpanded = true,
  className = "",
}: NarrativeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const { headline, body, callout, facts, icon } = content;

  // Hero variant - for act introductions
  if (variant === "hero") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="bg-gradient-to-r from-emerald-900/30 to-slate-800/50 rounded-xl p-6 md:p-8 border border-emerald-500/20">
          {icon && (
            <div className="mb-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                {icon}
              </div>
            </div>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
            {headline}
          </h2>
          {body && (
            <p className="text-slate-300 text-lg leading-relaxed">
              {body}
            </p>
          )}
        </div>

        {callout && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-200/90 text-sm">{callout}</p>
          </div>
        )}

        {facts && facts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {facts.map((fact, index) => (
              <span
                key={index}
                className="bg-slate-700/50 text-slate-300 text-xs px-3 py-1 rounded-full"
              >
                {fact}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Highlight variant - for key moments
  if (variant === "highlight") {
    return (
      <div
        className={`bg-gradient-to-r from-emerald-900/20 to-slate-800/40 rounded-xl p-5 border-l-4 border-emerald-500 ${className}`}
      >
        <div className="flex items-start gap-3">
          {icon ? (
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 flex-shrink-0">
              {icon}
            </div>
          ) : (
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1">{headline}</h3>
            {body && <p className="text-slate-400 text-sm">{body}</p>}
            {callout && (
              <p className="text-emerald-400/80 text-sm mt-2 italic">
                {callout}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Compact variant - for inline narratives
  if (variant === "compact") {
    return (
      <div className={`text-sm ${className}`}>
        <p className="text-slate-200 font-medium">{headline}</p>
        {body && <p className="text-slate-400 mt-1">{body}</p>}
      </div>
    );
  }

  // Default variant - standard narrative block
  return (
    <div
      className={`bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden ${className}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {icon && (
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium leading-tight">{headline}</h3>

              {/* Expandable body content */}
              {body && (
                <>
                  {expandable && !isExpanded ? (
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                      {body}
                    </p>
                  ) : (
                    <p className="text-slate-400 text-sm mt-1">{body}</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Expand/collapse toggle */}
          {expandable && body && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-500 hover:text-slate-300 transition-colors p-1"
              aria-label={isExpanded ? "Show less" : "Show more"}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Callout - always visible */}
        {callout && (
          <div className="mt-4 bg-slate-700/30 rounded-lg p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-400 text-sm">{callout}</p>
          </div>
        )}
      </div>

      {/* Facts - expandable section */}
      {facts && facts.length > 0 && (isExpanded || !expandable) && (
        <div className="px-5 pb-4">
          <div className="pt-3 border-t border-slate-700/50">
            <div className="flex flex-wrap gap-2">
              {facts.map((fact, index) => (
                <span
                  key={index}
                  className="bg-slate-700/50 text-slate-300 text-xs px-3 py-1 rounded-full"
                >
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * QuoteBlock - For testimonials or notable quotes
 */
export function QuoteBlock({
  quote,
  attribution,
  className = "",
}: {
  quote: string;
  attribution?: string;
  className?: string;
}) {
  return (
    <blockquote
      className={`bg-slate-800/30 border-l-2 border-emerald-500/50 rounded-r-lg pl-4 pr-5 py-4 ${className}`}
    >
      <p className="text-slate-200 italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
      {attribution && (
        <footer className="text-slate-500 text-sm mt-2">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}

/**
 * FactGrid - Display key facts in a grid layout
 */
export function FactGrid({
  facts,
  columns = 2,
  className = "",
}: {
  facts: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
  }>;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3 ${className}`}>
      {facts.map((fact, index) => (
        <div
          key={index}
          className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
        >
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            {fact.icon}
            {fact.label}
          </div>
          <div className="text-white font-medium">{fact.value}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * SectionDivider - Visual separator between narrative sections
 */
export function SectionDivider({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  if (label) {
    return (
      <div className={`flex items-center gap-4 my-6 ${className}`}>
        <div className="flex-1 h-px bg-slate-700" />
        <span className="text-xs text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-1 h-px bg-slate-700" />
      </div>
    );
  }

  return <div className={`h-px bg-slate-700 my-6 ${className}`} />;
}
