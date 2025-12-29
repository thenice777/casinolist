import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MessageSquare, Building2, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | CasinoList.io",
  description: "Get in touch with CasinoList.io. Contact us for business inquiries, casino listings, partnerships, or general questions.",
};

const contactReasons = [
  {
    icon: Building2,
    title: "Casino Listing",
    description: "Want your casino featured on CasinoList.io? Reach out to learn about our listing process.",
    email: "listings@casinolist.io",
  },
  {
    icon: MessageSquare,
    title: "Business Inquiries",
    description: "For partnerships, advertising, or affiliate opportunities.",
    email: "business@casinolist.io",
  },
  {
    icon: HelpCircle,
    title: "General Support",
    description: "Questions about the site, feedback, or general inquiries.",
    email: "support@casinolist.io",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a question, suggestion, or business inquiry? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactReasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <reason.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                {reason.description}
              </p>
              <a
                href={`mailto:${reason.email}`}
                className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {reason.email}
              </a>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          {/* FAQ */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">
                  How can I list my casino on CasinoList.io?
                </h3>
                <p className="text-slate-400 text-sm">
                  Contact us at listings@casinolist.io with your casino details.
                  We review all submissions and will respond within 5 business days.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">
                  How do you rate casinos?
                </h3>
                <p className="text-slate-400 text-sm">
                  We use a comprehensive rating system based on games, service,
                  atmosphere, value, and trust. Visit our{" "}
                  <a href="/how-we-rate" className="text-emerald-400 hover:text-emerald-300">
                    How We Rate
                  </a>{" "}
                  page for details.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">
                  Can I write a review for a casino?
                </h3>
                <p className="text-slate-400 text-sm">
                  Yes! You can write reviews directly on any casino's profile page.
                  Share your experience to help other visitors make informed decisions.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">
                  How do I report inaccurate information?
                </h3>
                <p className="text-slate-400 text-sm">
                  If you notice any errors or outdated information, please use the
                  contact form or email support@casinolist.io with details.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">
                  Do you offer affiliate partnerships?
                </h3>
                <p className="text-slate-400 text-sm">
                  Yes, we work with select partners. Contact business@casinolist.io
                  to discuss partnership opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
