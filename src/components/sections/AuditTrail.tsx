"use client";

import { motion } from "framer-motion";
import { FileCheck, Calendar, User } from "lucide-react";
import { auditTrail } from "@/data/providers";

export function AuditTrail() {
  return (
    <section
      id="audit"
      className="py-20 md:py-28 bg-surface-secondary"
      aria-labelledby="audit-heading"
    >
      <div className="container-narrow">
        <div className="text-center mb-14">
          <p className="section-label mb-4">Transparency</p>
          <h2
            id="audit-heading"
            className="font-serif text-3xl md:text-4xl font-bold text-navy-900 text-balance mb-5"
          >
            Editorial Audit Trail
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Every ranking decision is documented. Full transparency in our
            editorial process.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {auditTrail.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-5 bg-white rounded-2xl border border-slate-100 p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy-900/5 shrink-0">
                <FileCheck
                  className="w-5 h-5 text-navy-900"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-navy-900 mb-2">
                  {entry.action}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    {entry.date}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                    <User className="w-3.5 h-3.5" aria-hidden="true" />
                    {entry.reviewer}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
