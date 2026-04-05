"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Star,
} from "lucide-react";
import { Provider } from "@/data/types";
import { Badge } from "@/components/ui/Badge";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { Button } from "@/components/ui/Button";
import { RatingModal } from "@/components/ui/RatingModal";
import { cn } from "@/lib/utils";

interface ComparisonCardProps {
  provider: Provider;
  index: number;
}

function getMedalVariant(rank: number) {
  if (rank === 1) return "gold" as const;
  if (rank === 2) return "silver" as const;
  if (rank === 3) return "bronze" as const;
  return null;
}

function getMedalLabel(rank: number) {
  if (rank === 1) return "Overall Winner";
  if (rank === 2) return "Highly Recommended";
  if (rank === 3) return "Top Rated Expert";
  return null;
}

const topThreeBg: Record<number, string> = {
  1: "bg-amber-50/60",
  2: "bg-slate-50/80",
  3: "bg-orange-50/50",
};

// Simulated review counts per rank for social proof
const reviewCounts: Record<number, number> = {
  1: 2100, 2: 1850, 3: 1620, 4: 1340, 5: 1180,
  6: 980, 7: 870, 8: 740, 9: 620, 10: 510,
};

export function ComparisonCard({ provider, index }: ComparisonCardProps) {
  const isPremium = provider.premium;
  const isTopThree = provider.rank <= 3;
  const [expanded, setExpanded] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const medal = getMedalVariant(provider.rank);
  const medalLabel = getMedalLabel(provider.rank);
  const reviews = reviewCounts[provider.rank] || 500;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className={cn(
          "card-premium",
          isTopThree && "editors-pick"
        )}
        aria-label={`Rank ${provider.rank}: ${provider.name}`}
      >
        {/* Gold ribbon for top 3 */}
        {isTopThree && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-trust-gold to-transparent" />
        )}

        {/* ── MAIN ROW ── */}
        <div
          className={cn(
            "px-5 py-5 md:px-7 md:py-5",
            isTopThree && topThreeBg[provider.rank]
          )}
        >
          {/* Desktop: horizontal layout */}
          <div className="flex items-center gap-5">
            {/* LEFT: Rank + Brand */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <Badge
                variant="rank"
                className={cn(
                  "shrink-0",
                  isTopThree ? "w-12 h-12 text-xl" : "w-10 h-10 text-base"
                )}
              >
                {provider.rank}
              </Badge>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3
                    className={cn(
                      "font-serif font-bold text-navy-900",
                      isTopThree
                        ? "text-lg md:text-xl"
                        : "text-base md:text-lg"
                    )}
                  >
                    {provider.name}
                  </h3>
                  {medal && <Badge variant={medal}>{medalLabel}</Badge>}
                  {provider.rank === 4 || provider.rank === 5 ? (
                    <Badge variant="verified">Verified Provider</Badge>
                  ) : null}
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  {provider.tagline}
                </p>
              </div>
            </div>

            {/* MIDDLE: 4-column Specs (desktop) */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {provider.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col items-center px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 min-w-[100px]"
                >
                  <span className="text-[0.65rem] text-slate-400 uppercase tracking-wider font-medium">
                    {spec.label}
                  </span>
                  <span className="text-sm font-bold text-navy-900 mt-0.5">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* RIGHT: Score + CTA + Toggle */}
            <div className="flex items-center gap-4 shrink-0">
              <ScoreGauge
                score={provider.score}
                size={isTopThree ? 46 : 40}
                strokeWidth={3}
              />

              <Button
                variant={isTopThree ? "gold" : "primary"}
                href={provider.ctaUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={`${provider.ctaLabel} — ${provider.name}`}
                className="hidden sm:inline-flex !px-5 !py-2.5 !text-sm"
              >
                {provider.ctaLabel}
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </Button>

              <button
                onClick={() => setExpanded(!expanded)}
                className="shrink-0 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-expanded={expanded}
                aria-label={expanded ? "Show less" : "Show more details"}
              >
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    expanded && "rotate-180"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Mobile: Specs 2x2 grid */}
          <div className="lg:hidden grid grid-cols-2 gap-2.5 mt-4 ml-14">
            {provider.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100"
              >
                <span className="text-[0.65rem] text-slate-400 uppercase tracking-wide">
                  {spec.label}:
                </span>
                <span className="text-xs font-bold text-navy-900">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="sm:hidden mt-4 ml-14">
            <Button
              variant={isTopThree ? "gold" : "primary"}
              href={provider.ctaUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={`${provider.ctaLabel} — ${provider.name}`}
              className="!px-4 !py-2 !text-sm w-full justify-center"
            >
              {provider.ctaLabel}
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
          </div>

          {/* Always-visible Rate link */}
          {!expanded && (
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setRatingOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-amber-500 transition-colors"
              >
                <Star className="w-3 h-3" aria-hidden="true" />
                Rate this provider
              </button>
            </div>
          )}
        </div>

        {/* ── EXPANDABLE DETAILS ── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-7 py-5 border-t border-slate-100 space-y-4">
                {/* Expert Verdict */}
                <div
                  className={cn(
                    "rounded-xl px-5 py-4",
                    isTopThree
                      ? "bg-amber-50/50 border border-amber-100/50"
                      : "bg-surface-secondary border border-slate-100"
                  )}
                >
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-navy-900">
                      Expert Verdict:
                    </span>{" "}
                    {provider.expertVerdict}
                  </p>
                </div>

                {/* Pros & Cons */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-2">
                      Strengths
                    </p>
                    <ul className="space-y-2">
                      {provider.pros.map((pro) => (
                        <li
                          key={pro}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle
                            className="w-4 h-4 text-trust-green mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                      Considerations
                    </p>
                    <ul className="space-y-2">
                      {provider.cons.map((con) => (
                        <li
                          key={con}
                          className="flex items-start gap-2 text-sm text-slate-500"
                        >
                          <AlertCircle
                            className="w-4 h-4 text-slate-400 mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Meta + Rate button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    {provider.yearFounded && (
                      <span className="text-xs text-slate-400">
                        Est. {provider.yearFounded}
                      </span>
                    )}
                    {provider.headquartersCity && (
                      <span className="text-xs text-slate-400">
                        HQ: {provider.headquartersCity}
                      </span>
                    )}
                    {provider.bbRating && (
                      <span className="text-xs text-slate-400">
                        BBB: {provider.bbRating}
                      </span>
                    )}
                    {provider.trustpilotScore && (
                      <span className="text-xs text-slate-400">
                        Trustpilot: {provider.trustpilotScore}/5.0
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setRatingOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    <Star className="w-3.5 h-3.5" aria-hidden="true" />
                    Rate this provider
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>

      {/* Rating Modal */}
      <RatingModal
        isOpen={ratingOpen}
        onClose={() => setRatingOpen(false)}
        providerName={provider.name}
      />
    </>
  );
}
