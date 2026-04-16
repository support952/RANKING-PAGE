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
  MessageSquare,
} from "lucide-react";
import { Provider } from "@/data/types";
import { AuthorityStars } from "@/components/ui/AuthorityStars";
import { Button } from "@/components/ui/Button";
import { RatingModal } from "@/components/ui/RatingModal";
import { useUserReviews } from "@/lib/useUserReviews";
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

export function ComparisonCard({ provider }: ComparisonCardProps) {
  const isTopThree = provider.rank <= 3;
  const [expanded, setExpanded] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const { reviews: userReviews, addReview } = useUserReviews(provider.id);
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
                    <div className="md:col-span-3 rounded-xl border border-slate-200 bg-white p-5">
                      <h4 className="text-sm font-bold text-navy-900 mb-4">
                        Rating Distribution
                      </h4>
                      <div className="space-y-2.5">
                        {distribution.map((row, idx) => {
                          const pct =
                            totalRatings > 0
                              ? Math.round((row.count / totalRatings) * 100)
                              : 0;
                          const barColors = [
                            "bg-emerald-500",  // 5 star
                            "bg-lime-500",     // 4 star
                            "bg-yellow-400",   // 3 star
                            "bg-orange-400",   // 2 star
                            "bg-red-400",      // 1 star
                          ];
                          return (
                            <div key={row.label} className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-slate-600 w-12 shrink-0">
                                {row.label}
                              </span>
                              <div className="flex-1 h-3 bg-slate-100 rounded overflow-hidden">
                                <div
                                  className={`h-full ${barColors[idx]} rounded transition-all duration-500`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-slate-500 w-10 text-right shrink-0">
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
                        {provider.contact.address && (
                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <span className="text-sm text-slate-600 leading-snug">
                              {provider.contact.address}
                            </span>
                          </div>
                        )}
                        {provider.contact.email && (
                          <div className="flex items-center gap-2.5">
                            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                            <a
                              href={`mailto:${provider.contact.email}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {provider.contact.email}
                            </a>
                          </div>
                        )}
                        {provider.contact.phone && (
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                            <a
                              href={`tel:${provider.contact.phone}`}
                              className="text-sm text-slate-600 hover:underline"
                            >
                              {provider.contact.phone}
                            </a>
                          </div>
                        )}
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

                {/* ── Section 4: Trustpilot-style Review Section ── */}
                {(provider.reviews.length > 0 || userReviews.length > 0) && (
                  <div className="px-5 md:px-6 pb-5">
                    {/* Review header bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-bold text-navy-900">
                          Reviews
                        </h4>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                          {formatNumber(provider.reviewCount + userReviews.length)} total
                        </span>
                      </div>
                      <button
                        onClick={() => setRatingOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
                      >
                        <Star className="w-3.5 h-3.5 fill-white" />
                        Write a Review
                      </button>
                    </div>

                    <div className="space-y-3">
                      {/* User-submitted reviews (highlighted) */}
                      {userReviews.map((ur) => (
                        <div
                          key={ur.id}
                          className="rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50/60 to-white p-4 relative"
                        >
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                                {ur.author.charAt(0)}
                              </div>
                              <div>
                                <span className="text-sm font-semibold text-navy-900 block leading-tight">
                                  {ur.author}
                                </span>
                                <time dateTime={ur.date} className="text-[0.65rem] text-slate-400">
                                  {formatDate(ur.date)}
                                </time>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold text-blue-700 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full">
                              <MessageSquare className="w-2.5 h-2.5" />
                              Your Review
                            </span>
                          </div>
                          <div className="mb-2">
                            <AuthorityStars score={ur.rating} size="sm" showScore={false} />
                          </div>
                          {ur.title && (
                            <h5 className="font-bold text-navy-900 text-sm leading-snug">
                              {ur.title}
                            </h5>
                          )}
                          {ur.body && (
                            <p className="text-sm text-slate-600 leading-relaxed mt-1">
                              {ur.body}
                            </p>
                          )}
                        </div>
                      ))}

                      {/* Provider reviews (Trustpilot-style cards) */}
                      {provider.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors"
                        >
                          {/* Author row */}
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold uppercase">
                                {review.author.charAt(0)}
                              </div>
                              <div>
                                <span className="text-sm font-semibold text-navy-900 block leading-tight">
                                  {review.author}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {review.location && (
                                    <span className="text-[0.65rem] text-slate-400">{review.location}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
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
                          </div>
                          {/* Stars + date */}
                          <div className="flex items-center gap-2.5 mb-2">
                            <AuthorityStars score={review.rating} size="sm" showScore={false} />
                            <time dateTime={review.date} className="text-[0.65rem] text-slate-400">
                              {formatDate(review.date)}
                            </time>
                          </div>
                          {/* Title + body */}
                          <h5 className="font-bold text-navy-900 text-sm leading-snug">
                            {review.title}
                          </h5>
                          <p className="text-sm text-slate-600 leading-relaxed mt-1">
                            {review.body}
                          </p>
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
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border-2 border-navy-900 bg-white text-sm font-bold text-navy-900 hover:bg-navy-50 transition-colors"
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
        providerId={provider.id}
        onReviewSubmit={addReview}
      />
    </>
  );
}
