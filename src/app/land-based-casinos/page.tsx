import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CasinoCard from "@/components/casino/CasinoCard";
import { getLandBasedCasinos } from "@/lib/casinos";

export const metadata: Metadata = {
  title: "Land-Based Casinos | Know the House",
  description:
    "Discover and explore physical casinos worldwide. Expert ratings, verified information, and insider details.",
};

export default async function LandBasedCasinosPage() {
  const casinos = await getLandBasedCasinos({ limit: 50 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Land-Based Casinos
          </h1>
          <p className="text-slate-400 text-lg">
            Discover world-class casino destinations with verified ratings and insider details.
          </p>
        </div>

        {casinos.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
            <p className="text-slate-400">
              No casinos found. Check back soon for new listings.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casinos.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} type="land_based" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
