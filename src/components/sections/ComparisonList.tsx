"use client";

import { providers } from "@/data/providers";
import { ComparisonCard } from "./ComparisonCard";

export function ComparisonList() {
  return (
    <section id="rankings" className="py-16 md:py-24" aria-labelledby="rankings-heading">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">2026 Rankings</p>
          <h2
            id="rankings-heading"
            className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mb-4"
          >
            Top Immigration Service Providers
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Ranked by our independent editorial board based on verified
            performance data and expert analysis.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {providers.map((provider, index) => (
            <ComparisonCard key={provider.id} provider={provider} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
