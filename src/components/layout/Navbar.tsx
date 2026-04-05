"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { USFlagIcon } from "@/components/ui/USFlagIcon";

const navLinks = [
  { label: "Rankings", href: "#rankings" },
  { label: "Methodology", href: "#methodology" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Primary navigation"
      className={`sticky top-0 z-50 w-full h-[72px] flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="container-wide flex items-center justify-between w-full">
        {/* LEFT: Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="US Immigration Authority — Home"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-900 group-hover:bg-navy-800 transition-colors overflow-hidden p-1.5">
            <USFlagIcon size={22} />
          </div>
          <span className="font-serif text-base md:text-lg font-bold text-navy-900 leading-tight">
            US Immigration Authority
          </span>
        </a>

        {/* CENTER: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-500 hover:text-navy-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT: CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#rankings"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-navy-900 border border-navy-900/15 hover:bg-navy-900 hover:text-white transition-all duration-200"
          >
            View Rankings
          </a>

          <button
            className="md:hidden p-2 -mr-1 text-slate-500 hover:text-navy-900 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[72px] left-0 right-0 bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-card md:hidden"
          >
            <div className="container-wide py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-navy-900 py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-100">
                <a
                  href="#rankings"
                  className="block text-center text-sm font-semibold py-3 px-4 rounded-xl bg-navy-900 text-white hover:bg-navy-800 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  View Rankings
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
