import { Review, ReviewStats } from "@/lib/reviews";
import ReviewCard from "./ReviewCard";
import ReviewFormWrapper from "./ReviewFormWrapper";
import { Star, MessageSquare } from "lucide-react";

interface ReviewsSectionProps {
  reviews: Review[];
  stats: ReviewStats;
  casinoId: string;
  casinoType: "land_based" | "online";
  casinoName: string;
}

export default function ReviewsSection({
  reviews,
  stats,
  casinoId,
  casinoType,
  casinoName,
}: ReviewsSectionProps) {
  const maxCount = Math.max(...Object.values(stats.ratingDistribution), 1);

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-semibold text-white">Player Reviews</h2>
        </div>

        {stats.totalReviews > 0 ? (
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-1">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(stats.averageRating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-400 text-sm">
                {stats.totalReviews} review{stats.totalReviews !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm w-6">{rating}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{
                        width: `${(stats.ratingDistribution[rating] / maxCount) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-slate-500 text-sm w-8">
                    {stats.ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-slate-400">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </div>

      {/* Write Review Form */}
      <div className="p-6 border-b border-slate-700 bg-slate-800/30">
        <ReviewFormWrapper
          casinoId={casinoId}
          casinoType={casinoType}
          casinoName={casinoName}
        />
      </div>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="p-6 space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
