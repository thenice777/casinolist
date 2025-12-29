import Link from "next/link";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

const footerLinks = {
  explore: [
    { href: "/explore", label: "World Map" },
    { href: "/land-based-casinos", label: "Land-Based Casinos" },
    { href: "/online-casinos", label: "Online Casinos" },
    { href: "/destinations", label: "Destinations" },
    { href: "/best-of", label: "Best Of Lists" },
    { href: "/search", label: "Search" },
  ],
  resources: [
    { href: "/how-we-rate", label: "How We Rate" },
    { href: "/responsible-gambling", label: "Responsible Gambling" },
    { href: "/glossary", label: "Casino Glossary" },
    { href: "/about", label: "About Us" },
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

        {/* Responsible Gambling Notice */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-xs leading-relaxed">
            <strong className="text-slate-300">Responsible Gambling:</strong> Gambling can be addictive. Play responsibly and only gamble with money you can afford to lose. If you think you may have a gambling problem, please seek help at{" "}
            <a
              href="https://www.begambleaware.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300"
            >
              BeGambleAware.org
            </a>{" "}
            or{" "}
            <a
              href="https://www.gamblingtherapy.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300"
            >
              GamblingTherapy.org
            </a>
            . You must be 18 years or older (21 in some jurisdictions) to access gambling sites.
          </p>
        </div>
      </div>
    </footer>
  );
}
