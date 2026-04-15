import Link from "next/link";
import { USFlagIcon } from "@/components/ui/USFlagIcon";
import { Shield, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-trust-gold/30 to-transparent" />

      <div className="container-wide pt-14 pb-8">
        {/* Main grid */}
        <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <USFlagIcon size={28} className="rounded-sm" />
              <div>
                <span className="font-serif text-base font-bold text-white block leading-tight">
                  US Immigration Authority
                </span>
                <span className="text-[0.65rem] text-slate-500 uppercase tracking-wider font-medium">
                  Independent Rankings Since 2023
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-5">
              Independent, expert-reviewed rankings of U.S. immigration service
              providers. Cross-referenced with Trustpilot and public review platforms. Updated monthly.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-trust-gold/60" />
              <span>All rankings are editorially independent</span>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#rankings" className="text-sm text-slate-400 hover:text-white transition-colors">Rankings</Link></li>
              <li><Link href="#methodology" className="text-sm text-slate-400 hover:text-white transition-colors">Methodology</Link></li>
              <li><Link href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#audit" className="text-sm text-slate-400 hover:text-white transition-colors">Audit Trail</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Disclosure</Link></li>
              <li>
                <a href="mailto:editorial@usimmigrationauthority.com" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} US Immigration Authority. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 text-center md:text-right max-w-lg leading-relaxed">
            This site may contain affiliate links. Our editorial team maintains
            full independence in ranking and scoring decisions. Rankings incorporate third-party review data from Trustpilot and other verified platforms.
          </p>
        </div>
      </div>
    </footer>
  );
}
