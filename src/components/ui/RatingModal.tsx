"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
}

type SubmitPhase = "idle" | "submitting" | "done";

export function RatingModal({ isOpen, onClose, providerName }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState("");
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>("idle");
  const [progress, setProgress] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const displayRating = hoveredStar || rating;

  // ── Focus trap ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    // Save previously focused element to restore later
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the modal container on open
    const timer = setTimeout(() => {
      modalRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Restore focus on close
  useEffect(() => {
    if (!isOpen && previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  // ── Escape key listener ─────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      // Focus trap: Tab / Shift+Tab cycling
      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;

        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Simulated submission with progress bar ──────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;

    // Log the data to console
    console.log("📋 Rating Submission:", {
      provider: providerName,
      rating,
      review,
      timestamp: new Date().toISOString(),
    });

    setSubmitPhase("submitting");
    setProgress(0);

    // Animate progress bar over 1.5 seconds
    const duration = 1500;
    const interval = 30;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        setSubmitPhase("done");
      }
    }, interval);
  }

  const handleClose = useCallback(() => {
    onClose();
    // Reset state after exit animation
    setTimeout(() => {
      setRating(0);
      setHoveredStar(0);
      setReview("");
      setSubmitPhase("idle");
      setProgress(0);
    }, 300);
  }, [onClose]);

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
            ref={modalRef}
            tabIndex={-1}
            className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-elevated focus:outline-none"
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

            {submitPhase === "done" ? (
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
            ) : submitPhase === "submitting" ? (
              /* ---- Submitting state with progress bar ---- */
              <div className="flex flex-col items-center gap-5 py-8 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-navy-700" />
                <p className="text-sm font-medium text-slate-700">
                  Simulating secure submission&hellip;
                </p>
                <div className="w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-navy-700 to-trust-gold transition-all duration-75"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Submission progress"
                  />
                </div>
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
