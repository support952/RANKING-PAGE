"use client";

import { Search, BarChart3, Scale, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Research & Data Collection",
    description:
      "Our team gathers data from public records, client reviews, regulatory filings, and direct provider audits.",
  },
  {
    icon: BarChart3,
    title: "Quantitative Scoring",
    description:
      "Each provider is scored across weighted criteria including success rates, processing speed, and pricing transparency.",
  },
  {
    icon: Scale,
    title: "Expert Review Panel",
    description:
      "An independent panel of immigration attorneys and industry experts validates scores and provides qualitative assessment.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Monitoring",
    description:
      "Rankings are re-evaluated monthly. Significant changes trigger an immediate review cycle with full documentation.",
  },
];

export function Methodology() {
  return (
    <section
      id="methodology"
      className="py-16 md:py-24 bg-navy-900"
      aria-labelledby="methodology-heading"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Our Process</p>
          <h2
            id="methodology-heading"
            className="font-serif text-2xl md:text-3xl font-bold text-white mb-4"
          >
            Rigorous, Independent Methodology
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Every ranking is the result of a structured, transparent evaluation
            process reviewed by legal professionals.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-trust-gold/10 border border-trust-gold/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-trust-gold" />
                  </div>
                  <span className="text-xs text-trust-gold-light font-bold uppercase tracking-wider">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
