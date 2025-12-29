import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, Phone, Globe, Shield, Clock, DollarSign, Users, Heart, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Responsible Gambling | CasinoList.io",
  description:
    "Gambling should be fun. Learn about responsible gambling practices, warning signs of problem gambling, and resources for help.",
};

const warningSignsList = [
  "Spending more money than you can afford to lose",
  "Gambling to escape problems or relieve stress",
  "Lying to family or friends about gambling habits",
  "Chasing losses by gambling more",
  "Neglecting work, family, or personal needs to gamble",
  "Borrowing money or selling possessions to gamble",
  "Feeling restless or irritable when trying to stop",
  "Gambling until your last dollar is gone",
];

const tipsList = [
  {
    icon: Clock,
    title: "Set Time Limits",
    description: "Decide how long you'll play before you start and stick to it. Use alarms or casino tools to remind you.",
  },
  {
    icon: DollarSign,
    title: "Set a Budget",
    description: "Only gamble with money you can afford to lose. Never use rent, bill money, or borrowed funds.",
  },
  {
    icon: Shield,
    title: "Take Breaks",
    description: "Step away regularly. Take a walk, get food, or simply pause. Don't gamble for extended periods.",
  },
  {
    icon: Users,
    title: "Don't Gamble Alone",
    description: "Gaming with friends can help maintain perspective. They can notice if your behavior changes.",
  },
];

const helpResources = [
  {
    name: "National Council on Problem Gambling",
    phone: "1-800-522-4700",
    website: "https://www.ncpgambling.org",
    description: "24/7 confidential helpline for problem gamblers and their families.",
    region: "USA",
  },
  {
    name: "Gamblers Anonymous",
    website: "https://www.gamblersanonymous.org",
    description: "Fellowship of people who share experience and help each other recover.",
    region: "Worldwide",
  },
  {
    name: "BeGambleAware",
    phone: "0808 8020 133",
    website: "https://www.begambleaware.org",
    description: "Free, confidential help for anyone affected by gambling problems.",
    region: "UK",
  },
  {
    name: "GamCare",
    phone: "0808 8020 133",
    website: "https://www.gamcare.org.uk",
    description: "Support, information, and advice for gambling problems.",
    region: "UK",
  },
  {
    name: "Gambling Therapy",
    website: "https://www.gamblingtherapy.org",
    description: "Free online support for anyone affected by problem gambling.",
    region: "Worldwide",
  },
];

export default function ResponsibleGamblingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Responsible Gambling
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Gambling should be entertainment, not a way to make money. Know your limits,
            play responsibly, and never gamble more than you can afford to lose.
          </p>
        </div>

        {/* Key Message */}
        <div className="bg-gradient-to-br from-amber-900/30 to-slate-800 rounded-xl p-6 border border-amber-700/30 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                18+ Only | Gamble Responsibly
              </h2>
              <p className="text-slate-300 leading-relaxed">
                You must be of legal gambling age in your jurisdiction to access casinos.
                If gambling is causing problems in your life, please seek help. There are
                people who can support you through this.
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <h2 className="text-2xl font-bold text-white mb-6">
          Tips for Responsible Gambling
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {tipsList.map((tip) => (
            <div
              key={tip.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
            >
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <tip.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {tip.title}
              </h3>
              <p className="text-slate-400 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>

        {/* Warning Signs */}
        <h2 className="text-2xl font-bold text-white mb-6">
          Warning Signs of Problem Gambling
        </h2>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-12">
          <p className="text-slate-300 mb-6">
            If you recognize any of these behaviors in yourself or someone you know,
            it may be time to seek help:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {warningSignsList.map((sign) => (
              <div key={sign} className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <span className="text-slate-300 text-sm">{sign}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Exclusion */}
        <h2 className="text-2xl font-bold text-white mb-6">
          Self-Exclusion Tools
        </h2>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-12">
          <p className="text-slate-300 mb-4">
            Most casinos offer self-exclusion programs that allow you to voluntarily
            ban yourself from gambling for a set period. These tools include:
          </p>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span><strong className="text-white">Deposit Limits:</strong> Set daily, weekly, or monthly deposit caps</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span><strong className="text-white">Time Limits:</strong> Get reminders or automatic logouts after set periods</span>
            </li>
            <li className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span><strong className="text-white">Loss Limits:</strong> Set maximum loss amounts per session or period</span>
            </li>
            <li className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-emerald-400" />
              <span><strong className="text-white">Reality Checks:</strong> Periodic notifications showing time and money spent</span>
            </li>
          </ul>
          <p className="text-slate-400 text-sm mt-4">
            Contact any casino's support team to learn about their responsible gambling features.
          </p>
        </div>

        {/* Help Resources */}
        <h2 className="text-2xl font-bold text-white mb-6">
          Get Help Now
        </h2>
        <div className="space-y-4 mb-12">
          {helpResources.map((resource) => (
            <div
              key={resource.name}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">
                      {resource.name}
                    </h3>
                    <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded">
                      {resource.region}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {resource.phone && (
                      <a
                        href={`tel:${resource.phone.replace(/[^0-9+]/g, "")}`}
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {resource.phone}
                      </a>
                    )}
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Message */}
        <div className="bg-emerald-900/30 rounded-xl border border-emerald-700/30 p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Remember: It's Okay to Ask for Help
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Problem gambling is a recognized condition that affects millions of people
            worldwide. There is no shame in seeking help. Recovery is possible, and
            support is available 24/7.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
