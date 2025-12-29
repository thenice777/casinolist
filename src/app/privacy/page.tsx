import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CasinoList.io",
  description: "Privacy Policy for CasinoList.io - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert prose-slate max-w-none">
          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p className="leading-relaxed">
                CasinoList.io ("we," "our," or "us") respects your privacy and is committed to
                protecting your personal data. This Privacy Policy explains how we collect, use,
                and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>

              <h3 className="text-xl font-medium text-white mb-3 mt-6">Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email address (when subscribing to our newsletter)</li>
                <li>Display name and review content (when submitting reviews)</li>
                <li>Contact information (when reaching out to us)</li>
              </ul>

              <h3 className="text-xl font-medium text-white mb-3 mt-6">Information Collected Automatically</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and approximate location</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website</li>
                <li>Cookies and similar technologies (see Cookie Policy)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our services</li>
                <li>Send newsletters and updates (with your consent)</li>
                <li>Display user reviews on casino pages</li>
                <li>Analyze site usage and trends</li>
                <li>Prevent fraud and maintain security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Legal Basis for Processing</h2>
              <p className="leading-relaxed mb-4">We process your data based on:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Consent:</strong> When you subscribe to our newsletter or submit reviews</li>
                <li><strong className="text-white">Legitimate interests:</strong> To improve our services and analyze usage</li>
                <li><strong className="text-white">Legal compliance:</strong> When required by applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing</h2>
              <p className="leading-relaxed mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Service providers:</strong> Hosting, analytics, email services</li>
                <li><strong className="text-white">Affiliate partners:</strong> When you click through to partner casinos</li>
                <li><strong className="text-white">Legal authorities:</strong> When required by law</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal data for as long as necessary to provide our services and
                comply with legal obligations. Newsletter subscriptions can be cancelled at any time.
                Review data is retained indefinitely but can be removed upon request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
              <p className="leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data ("right to be forgotten")</li>
                <li>Object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="leading-relaxed mt-4">
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@casinolist.io" className="text-emerald-400 hover:text-emerald-300">
                  privacy@casinolist.io
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational measures to protect your
                personal data against unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">International Transfers</h2>
              <p className="leading-relaxed">
                Your data may be transferred to and processed in countries outside your own.
                We ensure appropriate safeguards are in place for such transfers in compliance
                with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Links</h2>
              <p className="leading-relaxed">
                Our site contains links to third-party websites, including casino sites. We are
                not responsible for the privacy practices of these external sites. We encourage
                you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
              <p className="leading-relaxed">
                Our services are not intended for individuals under 18 years of age. We do not
                knowingly collect personal data from children. If you believe we have collected
                data from a minor, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any
                significant changes by posting the new policy on this page and updating the
                "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                For questions about this Privacy Policy or our data practices, contact us at:{" "}
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
