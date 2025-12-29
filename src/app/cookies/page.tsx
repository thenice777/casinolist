import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | CasinoList.io",
  description: "Cookie Policy for CasinoList.io - Learn about how we use cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert prose-slate max-w-none">
          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
              <p className="leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device
                when you visit a website. They are widely used to make websites work more
                efficiently and provide information to site owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Cookies</h2>
              <p className="leading-relaxed">
                CasinoList.io uses cookies and similar technologies to enhance your browsing
                experience, analyze site traffic, and understand where our visitors come from.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies We Use</h2>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 mb-6">
                <h3 className="text-xl font-medium text-white mb-3">Essential Cookies</h3>
                <p className="mb-2">Required for the website to function properly.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                  <li>Session management</li>
                  <li>Security features</li>
                  <li>User preferences</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 mb-6">
                <h3 className="text-xl font-medium text-white mb-3">Analytics Cookies</h3>
                <p className="mb-2">Help us understand how visitors interact with our site.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                  <li>Google Analytics (page views, traffic sources)</li>
                  <li>Performance monitoring</li>
                  <li>User behavior analysis</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 mb-6">
                <h3 className="text-xl font-medium text-white mb-3">Functional Cookies</h3>
                <p className="mb-2">Enable enhanced functionality and personalization.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                  <li>Remember your preferences</li>
                  <li>Comparison tool selections</li>
                  <li>Recently viewed casinos</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-xl font-medium text-white mb-3">Marketing Cookies</h3>
                <p className="mb-2">Used to track visitors across websites for advertising.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                  <li>Affiliate tracking</li>
                  <li>Conversion tracking</li>
                  <li>Personalized advertisements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Cookies</h2>
              <p className="leading-relaxed mb-4">
                Some cookies are placed by third-party services that appear on our pages:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Google Analytics:</strong> Website analytics and performance</li>
                <li><strong className="text-white">Mapbox:</strong> Interactive maps functionality</li>
                <li><strong className="text-white">Affiliate Partners:</strong> Track referrals to casino sites</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Managing Cookies</h2>
              <p className="leading-relaxed mb-4">
                You can control and manage cookies in various ways:
              </p>

              <h3 className="text-xl font-medium text-white mb-3">Browser Settings</h3>
              <p className="leading-relaxed mb-4">
                Most browsers allow you to refuse or accept cookies, delete existing cookies,
                and set preferences for certain websites. Here's how to manage cookies in
                common browsers:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Microsoft Edge
                  </a>
                </li>
              </ul>

              <h3 className="text-xl font-medium text-white mb-3">Opt-Out Links</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Google Analytics Opt-out
                  </a>
                </li>
                <li>
                  <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Your Online Choices (EU)
                  </a>
                </li>
                <li>
                  <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Network Advertising Initiative
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Impact of Disabling Cookies</h2>
              <p className="leading-relaxed">
                If you disable or refuse cookies, some features of the website may not function
                properly. Essential cookies are required for basic site functionality. Disabling
                analytics cookies will not affect your browsing experience but will limit our
                ability to improve the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Updates to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in
                technology or legal requirements. Any changes will be posted on this page
                with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about our use of cookies, please contact us at{" "}
                <a href="mailto:privacy@casinolist.io" className="text-emerald-400 hover:text-emerald-300">
                  privacy@casinolist.io
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
