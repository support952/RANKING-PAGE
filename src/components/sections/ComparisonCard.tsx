"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  CheckCircle,
  ChevronDown,
  Star,
  Trophy,
  Shield,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { Provider } from "@/data/types";
import { AuthorityStars } from "@/components/ui/AuthorityStars";
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

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ComparisonCard({ provider, index }: ComparisonCardProps) {
  const isTopThree = provider.rank <= 3;
  const [expanded, setExpanded] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const rankLabel = getRankLabel(provider.rank);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  // Rating distribution as array for iteration
  const distribution = [
    { label: "5 star", count: provider.ratingDistribution.fiveStar },
    { label: "4 star", count: provider.ratingDistribution.fourStar },
    { label: "3 star", count: provider.ratingDistribution.threeStar },
    { label: "2 star", count: provider.ratingDistribution.twoStar },
    { label: "1 star", count: provider.ratingDistribution.oneStar },
  ];
  const totalRatings = distribution.reduce((sum, d) => sum + d.count, 0);

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
          {/* ROW 1: Rank, Name, Score, CTA, Expand */}
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

            {/* Name + tagline — clickable to expand */}
            <div className="flex-1 min-w-0 cursor-pointer" onClick={toggleExpanded}>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-navy-900 text-base md:text-lg leading-tight hover:underline">
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
            <AuthorityStars score={provider.score} size="md" />

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
              onClick={toggleExpanded}
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

        {/* EXPANDABLE DETAIL VIEW */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-200">
                {/* ── Section 1: Provider Header ── */}
                <div className="px-5 md:px-6 pt-5 md:pt-6 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-serif font-bold text-navy-900 text-xl md:text-2xl leading-tight">
                        {provider.name}
                      </h2>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="text-sm text-slate-500">
                          {formatNumber(provider.reviewCount)} reviews
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <Shield className="w-3 h-3" />
                          Verified Company
                        </span>
                      </div>
                    </div>
                    <AuthorityStars score={provider.score} size="lg" />
                  </div>
                </div>

                {/* ── Section 2: AI Review Summary ── */}
                <div className="px-5 md:px-6 pb-4">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {provider.aiSummary}
                        </p>
                        <p className="text-[0.65rem] text-slate-400 mt-2 uppercase tracking-wide font-medium">
                          AI-generated from reviewer sentiment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Section 3: Two-column layout ── */}
                <div className="px-5 md:px-6 pb-5">
                  <div className="grid md:grid-cols-5 gap-5">
                    {/* Left Column: Rating Distribution (~60%) */}
                    <div className="md:col-span-3 rounded-xl border border-slate-200 bg-white p-4">
                      <h4 className="text-sm font-semibold text-navy-900 mb-3">
                        Rating Distribution
                      </h4>
                      <div className="space-y-2">
                        {distribution.map((row) => {
                          const pct =
                            totalRatings > 0
                              ? Math.round((row.count / totalRatings) * 100)
                              : 0;
                          return (
                            <div key={row.label} className="flex items-center gap-3">
                              <span className="text-xs font-medium text-slate-600 w-12 shrink-0">
                                {row.label}
                              </span>
                              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-slate-500 w-10 text-right shrink-0">
                                {pct}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Contact Info (~40%) */}
                    <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
                      <h4 className="text-sm font-semibold text-navy-900 mb-3">
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-600 leading-snug">
                            {provider.contact.address}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <a
                            href={`mailto:${provider.contact.email}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {provider.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                          <a
                            href={`tel:${provider.contact.phone}`}
                            className="text-sm text-slate-600 hover:underline"
                          >
                            {provider.contact.phone}
                          </a>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                          <a
                            href={provider.ctaUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Section 4: Review Stream ── */}
                {provider.reviews.length > 0 && (
                  <div className="px-5 md:px-6 pb-5">
                    <h4 className="text-sm font-semibold text-navy-900 mb-3">
                      Reviews
                    </h4>
                    <div className="space-y-3">
                      {provider.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="rounded-xl border border-slate-200 bg-white p-4"
                        >
                          {/* Review header: stars + badges */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <AuthorityStars
                              score={review.rating}
                              size="sm"
                              showScore={false}
                            />
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                <CheckCircle className="w-2.5 h-2.5" />
                                Verified
                              </span>
                            )}
                            {review.invited && (
                              <span className="inline-flex items-center gap-1 text-[0.65rem] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                                Invited
                              </span>
                            )}
                          </div>

                          {/* Review title */}
                          <h5 className="font-semibold text-navy-900 text-sm mt-2.5 leading-snug">
                            {review.title}
                          </h5>

                          {/* Review body */}
                          <p className="text-sm text-slate-600 leading-relaxed mt-1.5">
                            {review.body}
                          </p>

                          {/* Author info */}
                          <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                            <span className="font-medium text-slate-500">
                              {review.author}
                            </span>
                            {review.location && (
                              <>
                                <span aria-hidden="true">&middot;</span>
                                <span>{review.location}</span>
                              </>
                            )}
                            <span aria-hidden="true">&middot;</span>
                            <time dateTime={review.date}>
                              {formatDate(review.date)}
                            </time>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Section 5: Action Row ── */}
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => setRatingOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      Write a Review
                    </button>
                    <Button
                      variant="gold"
                      href={provider.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="justify-center"
                    >
                      Visit Website
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </div>
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
