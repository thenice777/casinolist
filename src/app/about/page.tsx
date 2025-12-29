import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Globe, Target, Shield, Users, Map, Star, Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "About CasinoList.io | Know the House",
  description:
    "CasinoList.io is the trusted authority for casino discovery worldwide. Learn about our mission to help players find their perfect casino experience.",
};

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "We maintain editorial independence. Our ratings are never influenced by advertising relationships or partnerships.",
  },
  {
    icon: Target,
    title: "Accuracy First",
    description:
      "Every piece of information is verified. We visit casinos, test online platforms, and continuously update our data.",
  },
  {
    icon: Users,
    title: "Player-Focused",
    description:
      "We exist to help players make informed decisions. Everything we do centers on providing value to our users.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "From Las Vegas to Macau, Monaco to Melbourne, we cover casinos worldwide with the same rigorous standards.",
  },
];

const features = [
  {
    icon: Map,
    title: "Interactive World Map",
    description: "Explore casinos visually with our interactive map featuring every listed casino globally.",
  },
  {
    icon: Star,
    title: "5-Dimension Ratings",
    description: "Our comprehensive rating system evaluates games, service, atmosphere, value, and trust.",
  },
  {
    icon: Shield,
    title: "Verification Badges",
    description: "Special badges highlight casinos that excel in specific areas like payouts or VIP service.",
  },
  {
    icon: Users,
    title: "Community Reviews",
    description: "Real player experiences complement our expert reviews for a complete picture.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            About Casino<span className="text-emerald-400">List</span>.io
          </h1>
          <p className="text-2xl text-slate-400 font-light mb-6">
            Know the House
          </p>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            We're the trusted authority for casino discovery worldwide. Our mission is simple:
            help players find casinos that match their style, budget, and expectations—whether
            they're exploring the Vegas Strip or looking for a reputable online platform.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800 rounded-xl p-8 border border-emerald-700/30 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The casino industry can be opaque. Players often don't know what to expect until
            they arrive—or until they've already deposited. We believe everyone deserves
            transparent, honest information before they gamble.
          </p>
          <p className="text-slate-300 leading-relaxed">
            CasinoList.io was built to be the definitive resource for casino information.
            We rate casinos objectively, verify claims independently, and present findings
            clearly. Whether you're planning a trip to Monte Carlo or searching for an
            online casino with fast payouts, we've got you covered.
          </p>
        </div>

        {/* Values */}
        <h2 className="text-2xl font-bold text-white mb-6">What We Stand For</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
            >
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-slate-400 text-sm">{value.description}</p>
            </div>
          ))}
        </div>

        {/* What We Offer */}
        <h2 className="text-2xl font-bold text-white mb-6">What We Offer</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
            >
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How We Make Money */}
        <h2 className="text-2xl font-bold text-white mb-6">
          How We Sustain CasinoList.io
        </h2>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-12">
          <p className="text-slate-300 leading-relaxed mb-4">
            <strong className="text-white">Affiliate Partnerships:</strong> We earn
            commissions when users sign up at online casinos through our links. This
            allows us to provide free content to everyone.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            <strong className="text-white">Editorial Independence:</strong> Our ratings
            are never for sale. A casino's affiliate relationship with us has zero impact
            on their score. We've given low ratings to partners and high ratings to
            casinos we have no relationship with.
          </p>
          <p className="text-slate-400 text-sm">
            We clearly mark affiliate links and always recommend that players do their
            own research before gambling. See our{" "}
            <Link href="/responsible-gambling" className="text-emerald-400 hover:text-emerald-300">
              Responsible Gambling
            </Link>{" "}
            page for more information.
          </p>
        </div>

        {/* Contact */}
        <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              General Inquiries
            </h3>
            <p className="text-slate-400 text-sm mb-3">
              Questions, feedback, or partnership opportunities
            </p>
            <a
              href="mailto:hello@casinolist.io"
              className="text-emerald-400 hover:text-emerald-300"
            >
              hello@casinolist.io
            </a>
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Casino Submissions
            </h3>
            <p className="text-slate-400 text-sm mb-3">
              Own or manage a casino? Request a review
            </p>
            <a
              href="mailto:listings@casinolist.io"
              className="text-emerald-400 hover:text-emerald-300"
            >
              listings@casinolist.io
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
