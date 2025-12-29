import Link from "next/link";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import RegionalHelpline from "@/components/geo/RegionalHelpline";

const footerLinks = {
  explore: [
    { href: "/explore", label: "World Map" },
    { href: "/land-based-casinos", label: "Land-Based Casinos" },
    { href: "/online-casinos", label: "Online Casinos" },
    { href: "/bonuses", label: "Casino Bonuses" },
    { href: "/destinations", label: "Destinations" },
    { href: "/best-of", label: "Best Of Lists" },
    { href: "/search", label: "Search" },
  ],
  resources: [
    { href: "/how-we-rate", label: "How We Rate" },
    { href: "/responsible-gambling", label: "Responsible Gambling" },
    { href: "/glossary", label: "Casino Glossary" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ],
  legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/about#affiliate", label: "Affiliate Disclosure" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white">
              Casino<span className="text-emerald-400">List</span>.io
            </Link>
            <p className="text-slate-400 text-sm mt-4 mb-4">
              Know the House. The trusted authority for casino discovery worldwide.
            </p>
            <div className="text-slate-500 text-xs">
              18+ Only. Gamble Responsibly.
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">
              Get casino insights delivered to your inbox.
            </p>
            <NewsletterSignup variant="inline" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CasinoList.io. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Responsible Gambling Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 py-4">
          <a
            href="https://www.begambleaware.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-300 transition-colors"
            aria-label="BeGambleAware"
          >
            <div className="flex items-center gap-2 text-xs font-medium border border-slate-700 rounded px-3 py-1.5 hover:border-slate-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              BeGambleAware
            </div>
          </a>
          <a
            href="https://www.gamstop.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-300 transition-colors"
            aria-label="GAMSTOP"
          >
            <div className="flex items-center gap-2 text-xs font-medium border border-slate-700 rounded px-3 py-1.5 hover:border-slate-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              GAMSTOP
            </div>
          </a>
          <a
            href="https://www.gamcare.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-300 transition-colors"
            aria-label="GamCare"
          >
            <div className="flex items-center gap-2 text-xs font-medium border border-slate-700 rounded px-3 py-1.5 hover:border-slate-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
              </svg>
              GamCare
            </div>
          </a>
          <a
            href="https://www.gamblingtherapy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-300 transition-colors"
            aria-label="Gambling Therapy"
          >
            <div className="flex items-center gap-2 text-xs font-medium border border-slate-700 rounded px-3 py-1.5 hover:border-slate-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Gambling Therapy
            </div>
          </a>
        </div>

        {/* Regional Helpline */}
        <div className="mt-4 flex justify-center">
          <RegionalHelpline />
        </div>

        {/* Responsible Gambling Notice */}
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-xs leading-relaxed text-center">
            <strong className="text-slate-300">Responsible Gambling:</strong> Gambling can be addictive. Play responsibly and only gamble with money you can afford to lose. If you think you may have a gambling problem, please seek help. Visit our{" "}
            <Link
              href="/responsible-gambling"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Responsible Gambling
            </Link>{" "}
            page for resources and support.
          </p>
        </div>
      </div>
    </footer>
  );
}
