import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | CasinoList.io",
  description: "Terms of Service for using CasinoList.io",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert prose-slate max-w-none">
          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using CasinoList.io ("the Site"), you accept and agree to be bound
                by these Terms of Service. If you do not agree to these terms, please do not use
                the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p className="leading-relaxed mb-4">
                CasinoList.io provides information about casinos, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Casino reviews and ratings</li>
                <li>Casino locations and contact information</li>
                <li>Online casino comparisons</li>
                <li>Gaming-related educational content</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We are an informational service only. We do not operate any gambling services,
                accept bets, or handle any gambling transactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Age Restriction</h2>
              <p className="leading-relaxed">
                You must be at least 18 years of age (or the legal gambling age in your jurisdiction,
                whichever is higher) to use this Site. By using the Site, you represent and warrant
                that you meet this age requirement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. User Conduct</h2>
              <p className="leading-relaxed mb-4">When using the Site, you agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Submit false or misleading reviews</li>
                <li>Impersonate any person or entity</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to the Site</li>
                <li>Use the Site for any commercial purposes without our consent</li>
                <li>Interfere with or disrupt the Site's functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. User Content</h2>
              <p className="leading-relaxed">
                By submitting reviews or other content to the Site, you grant us a non-exclusive,
                royalty-free, perpetual, and worldwide license to use, modify, publish, and display
                such content. You represent that you have the right to grant this license and that
                your content does not violate any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Affiliate Disclosure</h2>
              <p className="leading-relaxed">
                CasinoList.io participates in affiliate programs. We may earn commissions when you
                click on links to partner casinos and complete sign-ups or deposits. This does not
                affect our editorial independence or the ratings we assign to casinos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Disclaimer</h2>
              <p className="leading-relaxed mb-4">
                The information on this Site is provided "as is" without warranty of any kind.
                We make no guarantees regarding:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The accuracy or completeness of casino information</li>
                <li>The availability of any casino or promotion</li>
                <li>The outcome of any gambling activity</li>
                <li>The security or fairness of any casino</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Gambling involves risk. Never gamble more than you can afford to lose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, CasinoList.io shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your
                use of the Site or any gambling activities you undertake based on information found
                on the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content on this Site, including text, graphics, logos, and software, is the
                property of CasinoList.io or its content suppliers and is protected by intellectual
                property laws. You may not reproduce, distribute, or create derivative works without
                our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be
                effective immediately upon posting. Your continued use of the Site after any changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Contact</h2>
              <p className="leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@casinolist.io" className="text-emerald-400 hover:text-emerald-300">
                  legal@casinolist.io
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
