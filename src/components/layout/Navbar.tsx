"use client";

import { useState, useEffect } from "react";
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
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center p-1">
            <USFlagIcon size={20} />
          </div>
          <span className="font-serif text-sm md:text-base font-bold text-navy-900">
            US Immigration Authority
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-500 hover:text-navy-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#rankings" className="btn-primary !px-4 !py-2 !text-xs">
            View Rankings
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-500"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-slate-600 py-2 px-3 rounded-lg hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#rankings"
            className="block text-center text-sm font-semibold py-2 px-3 rounded-lg bg-navy-900 text-white mt-2"
            onClick={() => setMobileOpen(false)}
          >
            View Rankings
          </a>
        </div>
      )}
    </nav>
  );
}
