"use client";

import { motion } from "framer-motion";
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
      className="relative bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 pt-20 pb-20 md:pt-28 md:pb-32 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Section Label */}
          <p className="section-label mb-5 text-sm tracking-[0.2em]">
            Trusted Immigration Rankings
          </p>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-balance mb-7 leading-[1.08]"
          >
            The Definitive Guide to{" "}
            <span className="text-gradient-gold">U.S. Immigration</span>{" "}
            Services
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto text-balance mb-12 leading-relaxed">
            Expert-reviewed, independently verified rankings of the top
            immigration service providers in the United States.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#rankings" className="btn-gold px-10 py-4 text-base">
              View Full Rankings
            </a>
            <a
              href="#methodology"
              className="btn-secondary px-10 py-4 text-base bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
            >
              Our Methodology
            </a>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-10 gap-y-4"
        >
          {trustIndicators.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-sm text-slate-300"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-trust-gold/10 border border-trust-gold/20">
                <Icon className="w-4 h-4 text-trust-gold" aria-hidden="true" />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-primary to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
