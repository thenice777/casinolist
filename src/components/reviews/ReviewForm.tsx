"use client";

import { useState } from "react";
import { Star, Plus, X, Loader2 } from "lucide-react";

interface ReviewFormProps {
  casinoId: string;
  casinoType: "land_based" | "online";
  casinoName: string;
  onSuccess?: () => void;
}

export default function ReviewForm({
  casinoId,
  casinoType,
  casinoName,
  onSuccess,
}: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [newPro, setNewPro] = useState("");
  const [newCon, setNewCon] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [playerLevel, setPlayerLevel] = useState("");

  const addPro = () => {
    if (newPro.trim() && pros.length < 5) {
      setPros([...pros, newPro.trim()]);
      setNewPro("");
    }
  };

  const addCon = () => {
    if (newCon.trim() && cons.length < 5) {
      setCons([...cons, newCon.trim()]);
      setNewCon("");
    }
  };

  const removePro = (index: number) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const removeCon = (index: number) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (content.trim().length < 50) {
      setError("Review must be at least 50 characters");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          casinoType,
          landBasedCasinoId: casinoType === "land_based" ? casinoId : undefined,
          onlineCasinoId: casinoType === "online" ? casinoId : undefined,
          displayName: isAnonymous ? undefined : displayName,
          isAnonymous,
          ratingOverall: rating,
          title: title.trim() || undefined,
          content: content.trim(),
          pros: pros.length > 0 ? pros : undefined,
          cons: cons.length > 0 ? cons : undefined,
          visitPurpose: visitPurpose || undefined,
          playerLevel: playerLevel || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccess(true);
      onSuccess?.();

      // Reset form
      setRating(0);
      setTitle("");
      setContent("");
      setDisplayName("");
      setIsAnonymous(false);
      setPros([]);
      setCons([]);
      setVisitPurpose("");
      setPlayerLevel("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 text-center">
        <h3 className="text-emerald-400 font-semibold mb-2">
          Thank you for your review!
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Your review has been submitted and is now visible on the page.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-emerald-400 hover:text-emerald-300 text-sm"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-white font-semibold mb-4">
          Write a Review for {casinoName}
        </h3>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Your Rating *
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoverRating || rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-600"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-slate-400 text-sm">
            {rating > 0 && ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
          </span>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Review Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          maxLength={100}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Your Review *
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience... What did you like? What could be improved? (minimum 50 characters)"
          rows={5}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
        />
        <p className="text-slate-500 text-xs mt-1">
          {content.length}/50 minimum characters
        </p>
      </div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Pros */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            Pros (optional)
          </label>
          <div className="space-y-2">
            {pros.map((pro, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded px-3 py-1.5"
              >
                <span className="text-emerald-400">+</span>
                <span className="text-sm text-slate-300 flex-1">{pro}</span>
                <button
                  type="button"
                  onClick={() => removePro(index)}
                  className="text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {pros.length < 5 && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPro}
                  onChange={(e) => setNewPro(e.target.value)}
                  placeholder="Add a pro"
                  maxLength={100}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPro())}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={addPro}
                  className="bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cons */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            Cons (optional)
          </label>
          <div className="space-y-2">
            {cons.map((con, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded px-3 py-1.5"
              >
                <span className="text-red-400">-</span>
                <span className="text-sm text-slate-300 flex-1">{con}</span>
                <button
                  type="button"
                  onClick={() => removeCon(index)}
                  className="text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {cons.length < 5 && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCon}
                  onChange={(e) => setNewCon(e.target.value)}
                  placeholder="Add a con"
                  maxLength={100}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCon())}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  onClick={addCon}
                  className="bg-slate-700 hover:bg-slate-600 text-white p-1.5 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Context */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            Visit Purpose
          </label>
          <select
            value={visitPurpose}
            onChange={(e) => setVisitPurpose(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">Select...</option>
            <option value="tourism">Tourism</option>
            <option value="business">Business</option>
            <option value="local">Local / Regular</option>
            <option value="special_event">Special Event</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">
            Player Level
          </label>
          <select
            value={playerLevel}
            onChange={(e) => setPlayerLevel(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">Select...</option>
            <option value="casual">Casual</option>
            <option value="regular">Regular</option>
            <option value="high_roller">High Roller</option>
          </select>
        </div>
      </div>

      {/* Display Name */}
      <div>
        <label className="block text-slate-300 text-sm font-medium mb-2">
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name (shown publicly)"
          maxLength={50}
          disabled={isAnonymous}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
        />
        <label className="flex items-center gap-2 mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
          />
          <span className="text-slate-400 text-sm">Post anonymously</span>
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}
