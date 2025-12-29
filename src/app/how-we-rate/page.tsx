import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Star, Gamepad2, Users, Sparkles, DollarSign, Shield, Check, Eye, Scale, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Rate Casinos | CasinoList.io",
  description:
    "Learn about our comprehensive 5-dimension rating system. We evaluate games, service, atmosphere, value, and trust to help you find your perfect casino.",
};

const ratingDimensions = [
  {
    icon: Gamepad2,
    name: "Games & Selection",
    weight: "20%",
    description: "The variety and quality of gaming options available.",
    criteria: [
      "Variety of table games (blackjack, roulette, baccarat, etc.)",
      "Slot machine selection and quality",
      "Poker room availability and tournament schedule",
      "Live dealer options (for online)",
      "Sports betting offerings",
      "Progressive jackpots and specialty games",
    ],
  },
  {
    icon: Users,
    name: "Service Quality",
    weight: "20%",
    description: "How well staff treats guests and handles requests.",
    criteria: [
      "Staff friendliness and professionalism",
      "Dealer competence and entertainment value",
      "Response time to requests",
      "VIP and loyalty program quality",
      "Problem resolution effectiveness",
      "Multilingual support availability",
    ],
  },
  {
    icon: Sparkles,
    name: "Atmosphere / UX",
    weight: "20%",
    description: "The overall ambiance and experience quality.",
    criteria: [
      "Interior design and decor quality",
      "Cleanliness and maintenance",
      "Noise levels and crowd management",
      "Comfort of gaming areas",
      "Entertainment and amenities",
      "Website/app usability (for online)",
    ],
  },
  {
    icon: DollarSign,
    name: "Value & Bonuses",
    weight: "20%",
    description: "How fairly priced the gaming experience is.",
    criteria: [
      "Minimum bet requirements",
      "Comp and rewards program generosity",
      "Food and drink pricing",
      "Welcome bonuses and promotions",
      "Wagering requirements fairness",
      "Overall value for money spent",
    ],
  },
  {
    icon: Shield,
    name: "Trust & Safety",
    weight: "20%",
    description: "How secure and fair the gaming environment is.",
    criteria: [
      "Licensing and regulatory compliance",
      "Security measures and surveillance",
      "Fair gaming certification",
      "Payout reliability and speed",
      "Responsible gambling tools",
      "Data protection and privacy",
    ],
  },
];

const ratingProcess = [
  {
    icon: Eye,
    title: "On-Site Visits",
    description:
      "Our team visits land-based casinos anonymously, experiencing them as regular guests would. We spend multiple sessions testing different areas.",
  },
  {
    icon: Scale,
    title: "Standardized Evaluation",
    description:
      "We use a consistent checklist across all casinos, ensuring fair and comparable ratings regardless of location or type.",
  },
  {
    icon: Users,
    title: "User Feedback",
    description:
      "We aggregate verified user reviews and factor in community feedback to balance our expert assessments.",
  },
  {
    icon: Clock,
    title: "Regular Updates",
    description:
      "Ratings are reviewed and updated regularly. Casinos that improve get recognized; those that decline are re-rated.",
  },
];

export default function HowWeRatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            How We Rate Casinos
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our comprehensive rating system evaluates casinos across five key dimensions,
            giving you a complete picture of what to expect.
          </p>
        </div>

        {/* Overall Score Explanation */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800 rounded-xl p-6 border border-emerald-700/30 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                The CasinoList Score
              </h2>
              <p className="text-slate-400">
                A weighted average of all five dimensions
              </p>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Every casino on CasinoList receives a score from 1.0 to 10.0. This overall
            rating is calculated by averaging our five dimension scores, each weighted
            equally at 20%. A score of 8.0 or higher represents an exceptional casino
            experience, while anything below 5.0 should be approached with caution.
          </p>
        </div>

        {/* Rating Dimensions */}
        <h2 className="text-2xl font-bold text-white mb-6">
          The Five Dimensions
        </h2>
        <div className="space-y-6 mb-12">
          {ratingDimensions.map((dimension) => (
            <div
              key={dimension.name}
              className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <dimension.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {dimension.name}
                      </h3>
                      <span className="bg-slate-700 text-slate-300 text-sm px-3 py-1 rounded-full">
                        Weight: {dimension.weight}
                      </span>
                    </div>
                    <p className="text-slate-400 mb-4">{dimension.description}</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {dimension.criteria.map((criterion) => (
                        <div
                          key={criterion}
                          className="flex items-center gap-2 text-slate-300 text-sm"
                        >
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{criterion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Scale */}
        <h2 className="text-2xl font-bold text-white mb-6">
          Understanding the Scale
        </h2>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 text-center">
                  <span className="text-2xl font-bold text-emerald-400">9-10</span>
                </div>
                <div>
                  <span className="text-white font-medium">Exceptional</span>
                  <p className="text-slate-400 text-sm">World-class destination</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-center">
                  <span className="text-2xl font-bold text-emerald-400">8-9</span>
                </div>
                <div>
                  <span className="text-white font-medium">Excellent</span>
                  <p className="text-slate-400 text-sm">Highly recommended</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-center">
                  <span className="text-2xl font-bold text-amber-400">7-8</span>
                </div>
                <div>
                  <span className="text-white font-medium">Very Good</span>
                  <p className="text-slate-400 text-sm">Worth visiting</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 text-center">
                  <span className="text-2xl font-bold text-amber-400">6-7</span>
                </div>
                <div>
                  <span className="text-white font-medium">Good</span>
                  <p className="text-slate-400 text-sm">Solid choice</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-center">
                  <span className="text-2xl font-bold text-orange-400">5-6</span>
                </div>
                <div>
                  <span className="text-white font-medium">Average</span>
                  <p className="text-slate-400 text-sm">Has notable issues</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 text-center">
                  <span className="text-2xl font-bold text-red-400">&lt;5</span>
                </div>
                <div>
                  <span className="text-white font-medium">Below Average</span>
                  <p className="text-slate-400 text-sm">Not recommended</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Process */}
        <h2 className="text-2xl font-bold text-white mb-6">Our Rating Process</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {ratingProcess.map((step) => (
            <div
              key={step.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
            >
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Verification Badges */}
        <h2 className="text-2xl font-bold text-white mb-6">Verification Badges</h2>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-12">
          <p className="text-slate-300 mb-6">
            Beyond our ratings, casinos can earn special verification badges that
            highlight specific strengths:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                Fast Payouts
              </span>
              <span className="text-slate-400 text-sm">Verified quick withdrawals</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                VIP Excellence
              </span>
              <span className="text-slate-400 text-sm">Outstanding VIP program</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                High Limit
              </span>
              <span className="text-slate-400 text-sm">Accommodates high rollers</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                24/7 Operation
              </span>
              <span className="text-slate-400 text-sm">Never closes</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                Fair Games
              </span>
              <span className="text-slate-400 text-sm">Certified RNG audits</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                Crypto Accepted
              </span>
              <span className="text-slate-400 text-sm">Accepts cryptocurrency</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Editorial Independence
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Our ratings are editorially independent. While we may receive compensation
            from some casinos through affiliate partnerships, this never influences our
            ratings or reviews. Our team evaluates each casino using the same standardized
            criteria, regardless of any business relationships.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
