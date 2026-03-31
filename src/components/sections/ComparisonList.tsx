"use client";

import { Users } from "lucide-react";
import { providers } from "@/data/providers";
import { ComparisonCard } from "./ComparisonCard";

export function ComparisonList() {
  return (
    <section
      id="rankings"
      className="py-16 md:py-24"
      aria-labelledby="rankings-heading"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">2026 Rankings</p>
          <h2
            id="rankings-heading"
            className="font-serif text-display-sm md:text-display font-bold text-navy-900 text-balance mb-4"
          >
            Top Immigration Service Providers
          </h2>
          <p className="text-body-lg text-slate-500 max-w-2xl mx-auto">
            Ranked by our independent editorial board based on verified
            performance data and expert analysis.
          </p>
        </div>

        {/* Trust Banner */}
        <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
          <Users className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
          <p className="text-xs font-medium text-emerald-700">
            Join <span className="font-bold">12,450+</span> users who rated
            their experience this month.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-3" role="list">
          {providers.map((provider, index) => (
            <div key={provider.id} role="listitem">
              <ComparisonCard provider={provider} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
