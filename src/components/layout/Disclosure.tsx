"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function Disclosure() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="w-full h-8 flex items-center bg-slate-50 border-b border-slate-200/50"
      role="status"
      aria-label="Advertising disclosure"
    >
      <div className="container-wide flex items-center justify-between gap-4">
        <p className="text-[0.65rem] text-slate-400 truncate">
          <span className="font-medium text-slate-500">
            Advertising Disclosure:
          </span>{" "}
          This site may receive compensation through affiliate partnerships.
          Rankings remain editorially independent.
        </p>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Dismiss disclosure"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
