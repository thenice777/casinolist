import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OnlineCasinoCard from "@/components/casino/OnlineCasinoCard";
import { getOnlineCasinos } from "@/lib/casinos";

export const metadata: Metadata = {
  title: "Online Casinos | Know the House",
  description:
    "Compare the best online casinos with bonuses, game selections, and trusted reviews.",
};

export default async function OnlineCasinosPage() {
  const casinos = await getOnlineCasinos({ limit: 50 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Online Casinos</h1>
          <p className="text-slate-400 text-lg">
            Discover and compare the best online casinos with verified ratings and exclusive insights.
          </p>
        </div>

        {casinos.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
            <p className="text-slate-400">
              No online casinos found. Check back soon for new listings.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {casinos.map((casino) => (
              <OnlineCasinoCard key={casino.id} casino={casino} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
