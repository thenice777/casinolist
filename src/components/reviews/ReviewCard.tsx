"use client";

import { useState } from "react";
import { Star, ThumbsUp, Check, User } from "lucide-react";
import { Review } from "@/lib/reviews";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpful = async () => {
    if (hasVoted) return;

    try {
      const res = await fetch("/api/reviews/helpful", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: review.id }),
      });

      if (res.ok) {
        setHelpfulCount((prev) => prev + 1);
        setHasVoted(true);
      }
    } catch (error) {
      console.error("Failed to mark as helpful:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const displayName = review.isAnonymous
    ? "Anonymous"
    : review.displayName || "Casino Visitor";

  return (
    <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{displayName}</span>
              {review.isVerifiedVisit && (
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded flex items-center gap-1">
                  <Check className="w-3 h-3" /> Verified Visit
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm">
              {formatDate(review.createdAt)}
              {review.visitDate && ` | Visited ${formatDate(review.visitDate)}`}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 bg-slate-700/50 px-3 py-1.5 rounded-lg">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= review.ratingOverall
                  ? "text-amber-400 fill-amber-400"
                  : "text-slate-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      {review.title && (
        <h4 className="text-white font-medium mb-2">{review.title}</h4>
      )}

      {/* Content */}
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        {review.content}
      </p>

      {/* Pros and Cons */}
      {((review.pros && review.pros.length > 0) ||
        (review.cons && review.cons.length > 0)) && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {review.pros && review.pros.length > 0 && (
            <div>
              <p className="text-emerald-400 text-xs font-medium mb-2">PROS</p>
              <ul className="space-y-1">
                {review.pros.map((pro, index) => (
                  <li
                    key={index}
                    className="text-slate-300 text-sm flex items-start gap-2"
                  >
                    <span className="text-emerald-400 mt-0.5">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {review.cons && review.cons.length > 0 && (
            <div>
              <p className="text-red-400 text-xs font-medium mb-2">CONS</p>
              <ul className="space-y-1">
                {review.cons.map((con, index) => (
                  <li
                    key={index}
                    className="text-slate-300 text-sm flex items-start gap-2"
                  >
                    <span className="text-red-400 mt-0.5">-</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Context Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {review.playerLevel && (
          <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded capitalize">
            {review.playerLevel.replace(/_/g, " ")} Player
          </span>
        )}
        {review.visitPurpose && (
          <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded capitalize">
            {review.visitPurpose.replace(/_/g, " ")}
          </span>
        )}
        {review.gamesPlayed && review.gamesPlayed.length > 0 && (
          <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
            Played: {review.gamesPlayed.slice(0, 3).join(", ")}
            {review.gamesPlayed.length > 3 && ` +${review.gamesPlayed.length - 3}`}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
        <button
          onClick={handleHelpful}
          disabled={hasVoted}
          className={`flex items-center gap-2 text-sm transition-colors ${
            hasVoted
              ? "text-emerald-400"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-emerald-400" : ""}`} />
          Helpful ({helpfulCount})
        </button>
      </div>
    </div>
  );
}
