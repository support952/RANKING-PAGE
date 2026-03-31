"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
}

export function RatingModal({ isOpen, onClose, providerName }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const displayRating = hoveredStar || rating;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    // Reset state after the exit animation completes
    setTimeout(() => {
      setRating(0);
      setHoveredStar(0);
      setReview("");
      setSubmitted(false);
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Rate ${providerName}`}
        >
          <motion.div
            className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-elevated"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close rating modal"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              /* ---- Thank-you state ---- */
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <CheckCircle className="h-12 w-12 text-emerald-500" />
                <p className="text-lg font-semibold text-slate-800">
                  Thank you for your rating!
                </p>
                <p className="text-sm text-slate-500">
                  Our editors will review it shortly.
                </p>
              </div>
            ) : (
              /* ---- Form state ---- */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-xl font-semibold text-slate-800">
                  Rate {providerName}
                </h2>

                {/* Star rating */}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-slate-600">
                    Your Rating
                  </legend>
                  <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="rounded-md p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        role="radio"
                        aria-checked={rating === star}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={cn(
                            "h-8 w-8 transition-colors",
                            star <= displayRating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Review text area */}
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-600">
                    Your Review
                  </span>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    placeholder="Share your experience with this provider..."
                    className="resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-200"
                    aria-label="Your review"
                  />
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={rating === 0}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2",
                    rating === 0
                      ? "cursor-not-allowed bg-slate-300"
                      : "bg-navy-900 hover:bg-navy-800"
                  )}
                >
                  Submit Rating
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
