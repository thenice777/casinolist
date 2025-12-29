import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, MapPin, Phone, Globe, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Content Not Available | CasinoList.io",
  description: "This content is not available in your region due to local regulations.",
  robots: "noindex, nofollow",
};

interface Props {
  searchParams: Promise<{
    reason?: string;
    from?: string;
  }>;
}

export default async function RestrictedPage({ searchParams }: Props) {
  const params = await searchParams;
  const reason = params.reason || "Online gambling content is not available in your region.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center">
          {/* Warning Icon */}
          <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-amber-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Content Not Available
          </h1>

          <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto">
            {reason}
          </p>

          {/* Info Card */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-8 text-left">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Why am I seeing this?
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We respect local laws and regulations regarding online gambling.
                  Based on your location, we cannot display online casino content
                  or affiliate links in compliance with regional gambling laws.
                </p>
              </div>
            </div>
          </div>

          {/* What you can do */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              What You Can Still Access
            </h3>
            <div className="grid gap-3 text-left">
              <Link
                href="/land-based-casinos"
                className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-white font-medium">Land-Based Casinos</div>
                  <div className="text-slate-400 text-sm">
                    Explore physical casino venues worldwide
                  </div>
                </div>
              </Link>
              <Link
                href="/destinations"
                className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Globe className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-white font-medium">Casino Destinations</div>
                  <div className="text-slate-400 text-sm">
                    Discover gaming destinations around the world
                  </div>
                </div>
              </Link>
              <Link
                href="/responsible-gambling"
                className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-white font-medium">Responsible Gambling Resources</div>
                  <div className="text-slate-400 text-sm">
                    Get help if you or someone you know needs support
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
