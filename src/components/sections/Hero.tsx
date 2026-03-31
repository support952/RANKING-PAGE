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
      className="relative bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 pt-16 pb-16 md:pt-20 md:pb-24 overflow-hidden"
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

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Section Label */}
          <p className="section-label mb-6">Trusted Immigration Rankings</p>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="font-serif text-display-lg md:text-[4rem] font-bold text-white text-balance mb-6 leading-[1.1]"
          >
            The Definitive Guide to{" "}
            <span className="text-gradient-gold">U.S. Immigration</span>{" "}
            Services
          </h1>

          {/* Subheading */}
          <p className="text-body-lg text-slate-400 max-w-2xl mx-auto text-balance mb-10">
            Expert-reviewed, independently verified rankings of the top
            immigration service providers in the United States.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#rankings" className="btn-gold px-8 py-3.5">
              View Full Rankings
            </a>
            <a href="#methodology" className="btn-secondary px-8 py-3.5 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20">
              Our Methodology
            </a>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-4"
        >
          {trustIndicators.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-body-sm text-slate-400"
            >
              <Icon className="w-4 h-4 text-trust-gold" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-primary to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
