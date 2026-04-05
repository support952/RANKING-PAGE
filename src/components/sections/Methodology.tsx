"use client";

import { motion } from "framer-motion";
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
      className="py-20 md:py-28 bg-navy-900 relative overflow-hidden"
      aria-labelledby="methodology-heading"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container-narrow relative z-10">
        <div className="text-center mb-16">
          <p className="section-label mb-4 text-sm">Our Process</p>
          <h2
            id="methodology-heading"
            className="font-serif text-3xl md:text-4xl font-bold text-white text-balance mb-5"
          >
            Rigorous, Independent Methodology
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every ranking is the result of a structured, transparent evaluation
            process reviewed by legal professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-trust-gold/10 border border-trust-gold/20">
                    <Icon
                      className="w-5 h-5 text-trust-gold"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-serif text-xs text-trust-gold-light font-bold uppercase tracking-wider">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
