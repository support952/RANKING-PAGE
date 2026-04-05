"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function Disclosure() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-slate-50 border-b border-slate-100 py-2">
      <div className="container-wide flex items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          <span className="font-medium text-slate-500">Advertising Disclosure:</span>{" "}
          This site may receive compensation through affiliate partnerships. Rankings remain editorially independent.
        </p>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded"
          aria-label="Dismiss"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
