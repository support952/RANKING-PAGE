"use client";

import { Search, BarChart3, Scale, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Research & Data Collection",
    description:
      "We gather data from public records, Trustpilot reviews, regulatory filings, client testimonials, and direct provider audits across multiple platforms.",
  },
  {
    icon: BarChart3,
    title: "Quantitative Scoring",
    description:
      "Each provider is scored across weighted criteria including verified success rates, average case duration, pricing transparency, and third-party review sentiment.",
  },
  {
    icon: Scale,
    title: "Expert Review Panel",
    description:
      "An independent panel of immigration attorneys and industry experts validates scores, cross-references Trustpilot data, and provides qualitative assessment.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing Monitoring",
    description:
      "Rankings are re-evaluated monthly using the latest review data. Significant changes trigger an immediate review cycle with full documentation in our audit trail.",
  },
];

export function Methodology() {
  return (
    <section
      id="methodology"
      className="py-20 md:py-28 bg-navy-900 relative overflow-hidden"
      aria-labelledby="methodology-heading"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="container-narrow relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">Our Process</p>
          <h2
            id="methodology-heading"
            className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5"
          >
            Rigorous, Independent Methodology
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Every ranking is the result of a structured, transparent evaluation
            process reviewed by legal professionals and cross-referenced with public review data.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-trust-gold/10 border border-trust-gold/20 flex items-center justify-center group-hover:bg-trust-gold/15 transition-colors">
                    <Icon className="w-5 h-5 text-trust-gold" />
                  </div>
                  <span className="text-[0.65rem] text-trust-gold-light font-bold uppercase tracking-[0.15em]">
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
