"use client";

import { FileCheck, Calendar, User } from "lucide-react";
import { auditTrail } from "@/data/providers";

export function AuditTrail() {
  return (
    <section id="audit" className="py-16 md:py-24 bg-slate-50" aria-labelledby="audit-heading">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">Transparency</p>
          <h2
            id="audit-heading"
            className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mb-4"
          >
            Editorial Audit Trail
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Every ranking decision is documented. Full transparency in our editorial process.
          </p>
        </div>

        {/* Entries */}
        <div className="max-w-2xl mx-auto space-y-3">
          {auditTrail.map((entry, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-5"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-navy-900" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy-900 mb-1">
                  {entry.action}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {entry.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    {entry.reviewer}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
