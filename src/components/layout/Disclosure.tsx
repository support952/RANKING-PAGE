"use client";

import { useState } from "react";
import { X, Info } from "lucide-react";

export function Disclosure() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-slate-50 border-b border-slate-100">
      <div className="container-wide flex items-center justify-between gap-4 py-2.5">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <p className="text-xs text-slate-400">
            <span className="font-semibold text-slate-500">Advertising Disclosure:</span>{" "}
            This site may receive compensation through affiliate partnerships. Rankings remain editorially independent and incorporate third-party review data.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
