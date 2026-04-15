"use client";

import { Shield, Clock, Users, Scale, Award, TrendingUp, FileCheck } from "lucide-react";

function getCurrentMonthYear(): string {
  const now = new Date();
  return now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

const trustIndicators = [
  { icon: Shield, label: "Independently Verified" },
  { icon: Clock, label: `Updated ${getCurrentMonthYear()}` },
  { icon: Users, label: "50K+ Users Served" },
  { icon: Scale, label: "Legally Reviewed" },
];

const stats = [
  { value: "10", label: "Providers Reviewed", icon: Award },
  { value: "12K+", label: "Reviews Analyzed", icon: TrendingUp },
  { value: "Monthly", label: "Update Cycle", icon: FileCheck },
];

export function Hero() {
  return (
    <section
      className="relative bg-navy-900 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/95 to-navy-800" />

      <div className="container-narrow relative z-10 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Shield className="w-3.5 h-3.5 text-trust-gold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-trust-gold-light">
              Trusted Immigration Rankings
            </span>
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] mb-6 tracking-tight"
          >
            The Definitive Guide to{" "}
            <span className="text-gradient-gold">U.S. Immigration</span>{" "}
            Services
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-slate-300/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Expert-reviewed, independently verified rankings of the top
            immigration service providers in the United States. Cross-referenced with Trustpilot and public review data.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <a href="#rankings" className="btn-gold px-8 py-3.5 text-base shadow-lg shadow-trust-gold/20">
              View Full Rankings
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white/90 rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/25"
            >
              Our Methodology
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon className="w-4 h-4 text-trust-gold/70" />
                  <span className="text-xl md:text-2xl font-bold text-white font-serif">{value}</span>
                </div>
                <span className="text-[0.65rem] text-slate-400 uppercase tracking-wider font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {trustIndicators.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-400/80">
                <Icon className="w-4 h-4 text-trust-gold/60" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-primary to-transparent" />
    </section>
  );
}
