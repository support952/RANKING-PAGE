"use client";

import { motion } from "framer-motion";
import { FileCheck, Calendar, User } from "lucide-react";
import { auditTrail } from "@/data/providers";

export function AuditTrail() {
  return (
    <section
      id="audit"
      className="py-16 md:py-24 bg-surface-secondary"
      aria-labelledby="audit-heading"
    >
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Transparency</p>
          <h2
            id="audit-heading"
            className="font-serif text-display-sm font-bold text-navy-900 text-balance mb-4"
          >
            Editorial Audit Trail
          </h2>
          <p className="text-body text-slate-500 max-w-xl mx-auto">
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
              className="flex items-start gap-4 bg-white rounded-xl border border-slate-100 p-5 shadow-card"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-900/5 shrink-0">
                <FileCheck
                  className="w-5 h-5 text-navy-900"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium text-navy-900">
                  {entry.action}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                  <span className="inline-flex items-center gap-1.5 text-caption text-slate-400">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {entry.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-caption text-slate-400">
                    <User className="w-3 h-3" aria-hidden="true" />
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
