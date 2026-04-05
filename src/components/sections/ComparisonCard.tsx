"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Star,
  Trophy,
} from "lucide-react";
import { Provider } from "@/data/types";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { Button } from "@/components/ui/Button";
import { RatingModal } from "@/components/ui/RatingModal";
import { cn } from "@/lib/utils";

interface ComparisonCardProps {
  provider: Provider;
  index: number;
}

function getRankLabel(rank: number) {
  if (rank === 1) return "Overall Winner";
  if (rank === 2) return "Highly Recommended";
  if (rank === 3) return "Top Rated";
  return null;
}

function getRankColor(rank: number) {
  if (rank === 1) return "bg-amber-100 text-amber-800 border-amber-200";
  if (rank === 2) return "bg-slate-100 text-slate-700 border-slate-200";
  if (rank === 3) return "bg-orange-100 text-orange-800 border-orange-200";
  return "";
}

export function ComparisonCard({ provider, index }: ComparisonCardProps) {
  const isTopThree = provider.rank <= 3;
  const [expanded, setExpanded] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const rankLabel = getRankLabel(provider.rank);

  return (
    <>
      <article
        className={cn("card-premium", isTopThree && "editors-pick")}
        aria-label={`Rank ${provider.rank}: ${provider.name}`}
      >
        {/* Top accent for top 3 */}
        {isTopThree && (
          <div className="h-0.5 bg-gradient-to-r from-trust-gold-dark via-trust-gold to-trust-gold-dark" />
        )}

        <div className="p-5 md:p-6">
          {/* ROW 1: Rank, Name, Score, CTA */}
          <div className="flex items-start gap-4">
            {/* Rank badge */}
            <div
              className={cn(
                "shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-lg",
                isTopThree
                  ? "bg-navy-900 text-white"
                  : "bg-slate-100 text-slate-600 text-base"
              )}
            >
              {provider.rank}
            </div>

            {/* Name + tagline */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-navy-900 text-base md:text-lg leading-tight">
                  {provider.name}
                </h3>
                {rankLabel && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.65rem] font-semibold border",
                      getRankColor(provider.rank)
                    )}
                  >
                    <Trophy className="w-2.5 h-2.5" />
                    {rankLabel}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{provider.tagline}</p>
            </div>

            {/* Score */}
            <ScoreGauge score={provider.score} size={44} />

            {/* CTA - desktop */}
            <Button
              variant={isTopThree ? "gold" : "primary"}
              href={provider.ctaUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hidden md:inline-flex shrink-0"
            >
              {provider.ctaLabel}
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>

            {/* Expand toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              aria-expanded={expanded}
              aria-label={expanded ? "Show less" : "Show more"}
            >
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* ROW 2: Specs - always visible */}
          <div className="flex flex-wrap gap-2 mt-4 ml-14">
            {provider.specs.map((spec) => (
              <div
                key={spec.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100"
              >
                <span className="text-[0.65rem] text-slate-400 uppercase tracking-wide font-medium">
                  {spec.label}:
                </span>
                <span className="text-xs font-bold text-navy-900">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA - mobile */}
          <div className="md:hidden mt-3 ml-14">
            <Button
              variant={isTopThree ? "gold" : "primary"}
              href={provider.ctaUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full justify-center"
            >
              {provider.ctaLabel}
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* EXPANDABLE DETAILS */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-4 border-t border-slate-100 space-y-4">
                {/* Expert Verdict */}
                <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-navy-900">Expert Verdict: </span>
                    {provider.expertVerdict}
                  </p>
                </div>

                {/* Pros & Cons - side by side */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                      Strengths
                    </p>
                    <ul className="space-y-1.5">
                      {provider.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Considerations
                    </p>
                    <ul className="space-y-1.5">
                      {provider.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-slate-500">
                          <AlertCircle className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    {provider.yearFounded && <span>Est. {provider.yearFounded}</span>}
                    {provider.headquartersCity && <span>HQ: {provider.headquartersCity}</span>}
                    {provider.bbRating && <span>BBB: {provider.bbRating}</span>}
                    {provider.trustpilotScore && <span>Trustpilot: {provider.trustpilotScore}/5</span>}
                  </div>
                  <button
                    onClick={() => setRatingOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    <Star className="w-3 h-3" />
                    Rate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>

      <RatingModal
        isOpen={ratingOpen}
        onClose={() => setRatingOpen(false)}
        providerName={provider.name}
      />
    </>
  );
}
