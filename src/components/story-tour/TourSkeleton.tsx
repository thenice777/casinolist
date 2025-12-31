"use client";

/**
 * TourSkeleton Component
 *
 * Loading skeletons for Story Tour content.
 * Provides visual placeholders while content is loading.
 */

// Reusable skeleton primitives
function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-slate-700/50 rounded ${className}`}
    />
  );
}

function SkeletonText({
  width = "w-full",
  height = "h-4",
}: {
  width?: string;
  height?: string;
}) {
  return <SkeletonPulse className={`${width} ${height}`} />;
}

function SkeletonCircle({ size = "w-10 h-10" }: { size?: string }) {
  return <SkeletonPulse className={`${size} rounded-full`} />;
}

// Header skeleton (shows while page is initializing)
export function TourHeaderSkeleton() {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SkeletonCircle size="w-5 h-5" />
          <div className="space-y-2">
            <SkeletonText width="w-32" height="h-5" />
            <SkeletonText width="w-20" height="h-3" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SkeletonCircle size="w-8 h-8" />
          <SkeletonCircle size="w-8 h-8" />
        </div>
      </div>

      {/* Progress skeleton */}
      <div className="hidden md:block max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <SkeletonCircle size="w-8 h-8" />
              <SkeletonText width="w-24" height="h-3" />
              {i < 4 && <SkeletonPulse className="w-12 h-0.5" />}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

// Narrative block skeleton
export function NarrativeBlockSkeleton({ variant = "default" }: { variant?: "default" | "hero" | "highlight" }) {
  const baseClasses = "rounded-xl p-6 border";

  if (variant === "hero") {
    return (
      <div className={`${baseClasses} border-emerald-700/30 bg-gradient-to-br from-emerald-900/30 to-slate-800/50`}>
        <div className="flex items-start gap-4">
          <SkeletonCircle size="w-12 h-12" />
          <div className="flex-1 space-y-3">
            <SkeletonText width="w-3/4" height="h-6" />
            <SkeletonText width="w-full" />
            <SkeletonText width="w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} border-slate-700 bg-slate-800/50`}>
      <div className="space-y-3">
        <SkeletonText width="w-1/2" height="h-5" />
        <SkeletonText width="w-full" />
        <SkeletonText width="w-4/5" />
      </div>
    </div>
  );
}

// Zone content skeleton
export function ZoneContentSkeleton() {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
      {/* Title area */}
      <div className="space-y-2">
        <SkeletonText width="w-32" height="h-3" />
        <SkeletonText width="w-48" height="h-7" />
      </div>

      {/* Hero narrative block */}
      <NarrativeBlockSkeleton variant="hero" />

      {/* Content cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 space-y-3"
          >
            <SkeletonCircle size="w-10 h-10" />
            <SkeletonText width="w-3/4" height="h-4" />
            <SkeletonText width="w-full" height="h-3" />
          </div>
        ))}
      </div>

      {/* Additional content block */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 space-y-4">
        <SkeletonText width="w-1/3" height="h-5" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <SkeletonCircle size="w-5 h-5" />
              <SkeletonText width="w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Rating breakdown skeleton
export function RatingBreakdownSkeleton() {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 space-y-5">
      <div className="flex items-center gap-2">
        <SkeletonCircle size="w-5 h-5" />
        <SkeletonText width="w-32" height="h-5" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => {
        // Use deterministic widths for each bar
        const widths = ["w-4/5", "w-3/4", "w-5/6", "w-2/3", "w-4/5"];
        return (
          <div key={i} className="flex items-center gap-4">
            <SkeletonText width="w-24" />
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <SkeletonPulse className={`h-full rounded-full ${widths[i - 1]}`} />
            </div>
            <SkeletonText width="w-8" />
          </div>
        );
      })}
    </div>
  );
}

// Verdict skeleton (for YourMoveAct)
export function VerdictSkeleton() {
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <SkeletonText width="w-32" height="h-3" />
        <SkeletonText width="w-36" height="h-7" />
      </div>

      {/* Hero */}
      <NarrativeBlockSkeleton variant="hero" />

      {/* Rating card */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700 text-center space-y-4">
        <SkeletonPulse className="w-24 h-8 mx-auto rounded-full" />
        <div className="flex items-center justify-center gap-3">
          <SkeletonCircle size="w-8 h-8" />
          <SkeletonText width="w-20" height="h-14" />
        </div>
        <SkeletonText width="w-24 mx-auto" height="h-6" />
      </div>

      {/* Rating breakdown */}
      <RatingBreakdownSkeleton />

      {/* CTA */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center space-y-4">
        <SkeletonPulse className="w-48 h-12 mx-auto rounded-xl" />
        <div className="flex items-center justify-center gap-4">
          <SkeletonText width="w-24" height="h-4" />
          <SkeletonText width="w-16" height="h-4" />
        </div>
      </div>
    </div>
  );
}

// Full page loading skeleton
export default function TourSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <TourHeaderSkeleton />
      <main className="pb-24">
        <ZoneContentSkeleton />
      </main>

      {/* Footer skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 py-2 z-30">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <SkeletonText width="w-48" height="h-3" />
          <SkeletonText width="w-24" height="h-3" />
        </div>
      </div>
    </div>
  );
}

// Export individual skeletons for granular usage
export {
  SkeletonPulse,
  SkeletonText,
  SkeletonCircle,
};
