import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Casinos",
  description:
    "Compare the best online casinos with bonuses, game selections, and trusted reviews.",
};

export default function OnlineCasinosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="border-b border-slate-700">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-white">
            Casino<span className="text-emerald-400">List</span>.io
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/online-casinos"
              className="text-emerald-400 font-medium"
            >
              Online Casinos
            </Link>
            <Link
              href="/land-based-casinos"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Land-Based Casinos
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Online Casinos</h1>
        <p className="text-slate-400 mb-8">
          Discover and compare the best online casinos with exclusive bonuses.
        </p>

        {/* Placeholder for casino listings */}
        <div className="bg-slate-800/50 rounded-xl p-12 border border-slate-700 text-center">
          <p className="text-slate-400">
            Casino listings coming soon. Connect the database to see casinos
            here.
          </p>
        </div>
      </main>
    </div>
  );
}
