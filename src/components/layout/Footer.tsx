import { USFlagIcon } from "@/components/ui/USFlagIcon";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-navy-900 border-t border-white/5"
    >
      <div className="container-wide py-16">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 group-hover:bg-white/15 transition-colors overflow-hidden p-1.5">
                <USFlagIcon size={20} />
              </div>
              <span className="font-serif text-base font-bold text-white">
                US Immigration Authority
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              Independent, expert-reviewed rankings of U.S. immigration service
              providers. Updated monthly with full editorial transparency.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-20">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#methodology" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Methodology
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-slate-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#audit" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Audit Trail
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Disclosure
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} US Immigration Authority. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 max-w-lg text-center md:text-right leading-relaxed">
            This site contains affiliate links. Our editorial team maintains
            full independence in ranking and scoring decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
