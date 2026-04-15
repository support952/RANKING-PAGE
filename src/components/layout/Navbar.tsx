"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-xl shadow-sm border-b border-slate-100/80"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-[60px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <USFlagIcon size={26} className="rounded-sm" />
          <div className="flex flex-col">
            <span className="font-serif text-sm font-bold text-navy-900 leading-tight">
              US Immigration Authority
            </span>
            <span className="text-[0.6rem] text-slate-400 font-medium tracking-wider uppercase leading-tight hidden sm:block">
              Independent Rankings
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm text-slate-500 hover:text-navy-900 rounded-lg hover:bg-slate-50 transition-all font-medium"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-2" />
          <Link href="#rankings" className="btn-primary !px-4 !py-2 !text-xs !rounded-lg">
            View Rankings
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-500 hover:text-navy-900 hover:bg-slate-50 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-slate-600 font-medium py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#rankings"
            className="block text-center text-sm font-bold py-2.5 px-3 rounded-lg bg-navy-900 text-white mt-2 hover:bg-navy-800 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            View Rankings
          </Link>
        </div>
      )}
    </nav>
  );
}
