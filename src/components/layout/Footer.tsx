import Link from "next/link";
import { USFlagIcon } from "@/components/ui/USFlagIcon";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="container-wide py-12">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <USFlagIcon size={26} className="rounded-sm" />
              <span className="font-serif text-sm font-bold text-white">
                US Immigration Authority
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Independent, expert-reviewed rankings of U.S. immigration service
              providers. Updated monthly.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-16">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Resources
              </h4>
              <ul className="space-y-2">
                <li><Link href="#methodology" className="text-sm text-slate-400 hover:text-white transition-colors">Methodology</Link></li>
                <li><Link href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="#audit" className="text-sm text-slate-400 hover:text-white transition-colors">Audit Trail</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Legal
              </h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Disclosure</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>&copy; {currentYear} US Immigration Authority. All rights reserved.</p>
          <p className="text-center md:text-right max-w-md">
            This site contains affiliate links. Our editorial team maintains
            full independence in ranking and scoring decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
