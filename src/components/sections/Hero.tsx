"use client";

import { Shield, Clock, Users, Scale } from "lucide-react";

const trustIndicators = [
  { icon: Shield, label: "Independently Verified" },
  { icon: Clock, label: "Updated March 2026" },
  { icon: Users, label: "50K+ Users Served" },
  { icon: Scale, label: "Legally Reviewed" },
];

export function Hero() {
  return (
    <section
      className="relative bg-gradient-to-b from-navy-900 to-navy-800 py-20 md:py-28 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-narrow relative z-10 text-center">
        {/* Label */}
        <p className="section-label mb-4">Trusted Immigration Rankings</p>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
        >
          The Definitive Guide to{" "}
          <span className="text-gradient-gold">U.S. Immigration</span>{" "}
          Services
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Expert-reviewed, independently verified rankings of the top
          immigration service providers in the United States.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <a href="#rankings" className="btn-gold px-8 py-3">
            View Full Rankings
          </a>
          <a
            href="#methodology"
            className="btn-secondary px-8 py-3 bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            Our Methodology
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6">
          {trustIndicators.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
              <Icon className="w-4 h-4 text-trust-gold" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
