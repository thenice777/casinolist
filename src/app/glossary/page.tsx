import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Book } from "lucide-react";

export const metadata: Metadata = {
  title: "Casino Glossary | CasinoList.io",
  description:
    "Learn casino terminology with our comprehensive glossary. From 'action' to 'whale', understand every term used in land-based and online casinos.",
};

interface GlossaryTerm {
  term: string;
  definition: string;
  category: "general" | "table" | "slots" | "poker" | "online";
}

const glossaryTerms: GlossaryTerm[] = [
  // General Terms
  { term: "Action", definition: "The total amount of money wagered by a player during a gaming session.", category: "general" },
  { term: "Bankroll", definition: "The total amount of money a player has set aside for gambling.", category: "general" },
  { term: "Cage", definition: "The cashier area in a casino where chips are exchanged for cash.", category: "general" },
  { term: "Comp", definition: "Complimentary items or services given to players by the casino (meals, rooms, shows).", category: "general" },
  { term: "Edge", definition: "The mathematical advantage the house has over players, expressed as a percentage.", category: "general" },
  { term: "High Roller", definition: "A player who consistently wagers large amounts of money.", category: "general" },
  { term: "House", definition: "The casino or gambling establishment.", category: "general" },
  { term: "Marker", definition: "A line of credit extended by the casino to a player.", category: "general" },
  { term: "Pit", definition: "An area of table games supervised by pit bosses.", category: "general" },
  { term: "Pit Boss", definition: "A casino supervisor who oversees table games in a specific area.", category: "general" },
  { term: "RTP", definition: "Return to Player - the percentage of wagered money a game pays back over time.", category: "general" },
  { term: "Toke", definition: "A tip or gratuity given to casino dealers.", category: "general" },
  { term: "Whale", definition: "An extremely high-stakes gambler who bets very large sums.", category: "general" },

  // Table Games
  { term: "Ante", definition: "An initial bet required before cards are dealt in some games.", category: "table" },
  { term: "Blackjack", definition: "A hand totaling 21 with the first two cards, typically an ace and a 10-value card.", category: "table" },
  { term: "Box Cars", definition: "In craps, a roll of double sixes (12).", category: "table" },
  { term: "Bust", definition: "In blackjack, to go over 21 and lose the hand.", category: "table" },
  { term: "Come Out Roll", definition: "In craps, the first roll of the dice to establish a point.", category: "table" },
  { term: "Double Down", definition: "In blackjack, doubling your bet in exchange for receiving only one more card.", category: "table" },
  { term: "Even Money", definition: "A bet that pays 1:1 - win the same amount wagered.", category: "table" },
  { term: "Hit", definition: "In blackjack, to request another card from the dealer.", category: "table" },
  { term: "Natural", definition: "A blackjack (21) dealt with the initial two cards.", category: "table" },
  { term: "Push", definition: "A tie between the player and dealer where the bet is returned.", category: "table" },
  { term: "Snake Eyes", definition: "In craps, a roll of double ones (2).", category: "table" },
  { term: "Split", definition: "In blackjack, dividing a pair into two separate hands.", category: "table" },
  { term: "Stand", definition: "In blackjack, to refuse additional cards and keep your current hand.", category: "table" },
  { term: "Surrender", definition: "In blackjack, forfeiting half your bet to end the hand early.", category: "table" },

  // Slots
  { term: "Bonus Round", definition: "A special feature in a slot game offering additional winning opportunities.", category: "slots" },
  { term: "Free Spins", definition: "Spins awarded without requiring additional wagers.", category: "slots" },
  { term: "Jackpot", definition: "The top prize in a slot machine game.", category: "slots" },
  { term: "Max Bet", definition: "The maximum amount that can be wagered on a single spin.", category: "slots" },
  { term: "Payline", definition: "A line across the reels where matching symbols must land to win.", category: "slots" },
  { term: "Progressive", definition: "A jackpot that increases over time as more players contribute.", category: "slots" },
  { term: "Scatter", definition: "A symbol that pays regardless of position and often triggers bonuses.", category: "slots" },
  { term: "Volatility", definition: "How often and how much a slot pays out; high volatility means bigger but rarer wins.", category: "slots" },
  { term: "Wild", definition: "A symbol that substitutes for other symbols to complete winning combinations.", category: "slots" },

  // Poker
  { term: "All-In", definition: "Betting all of your remaining chips.", category: "poker" },
  { term: "Blinds", definition: "Forced bets placed before cards are dealt to start action.", category: "poker" },
  { term: "Bluff", definition: "Betting or raising with a weak hand to make opponents fold.", category: "poker" },
  { term: "Call", definition: "Matching the current bet to stay in the hand.", category: "poker" },
  { term: "Check", definition: "Passing the action to the next player without betting.", category: "poker" },
  { term: "Flop", definition: "The first three community cards dealt face-up in Texas Hold'em.", category: "poker" },
  { term: "Fold", definition: "Surrendering your cards and forfeiting your bets.", category: "poker" },
  { term: "Muck", definition: "To discard your hand without showing it.", category: "poker" },
  { term: "Pot", definition: "The total amount of chips wagered in a hand.", category: "poker" },
  { term: "Raise", definition: "Increasing the current bet amount.", category: "poker" },
  { term: "River", definition: "The fifth and final community card in Texas Hold'em.", category: "poker" },
  { term: "Turn", definition: "The fourth community card in Texas Hold'em.", category: "poker" },

  // Online
  { term: "Bonus", definition: "Extra funds or free spins offered by online casinos as promotions.", category: "online" },
  { term: "Deposit Match", definition: "A bonus that matches a percentage of your deposit amount.", category: "online" },
  { term: "KYC", definition: "Know Your Customer - identity verification required by online casinos.", category: "online" },
  { term: "Live Dealer", definition: "Real dealers operating games via video stream in real-time.", category: "online" },
  { term: "No Deposit Bonus", definition: "A bonus given without requiring a deposit.", category: "online" },
  { term: "RNG", definition: "Random Number Generator - software ensuring fair and random game outcomes.", category: "online" },
  { term: "Wagering Requirement", definition: "The number of times you must bet a bonus before withdrawing.", category: "online" },
  { term: "Withdrawal", definition: "The process of cashing out winnings from your casino account.", category: "online" },
];

const categoryLabels: Record<string, string> = {
  general: "General Terms",
  table: "Table Games",
  slots: "Slots",
  poker: "Poker",
  online: "Online Casino",
};

export default function GlossaryPage() {
  const termsByCategory = glossaryTerms.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  const categories = ["general", "table", "slots", "poker", "online"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Book className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Casino Glossary
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            New to casinos? Learn the language of gambling with our comprehensive
            glossary of terms used in land-based and online casinos.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
            >
              {categoryLabels[category]}
            </a>
          ))}
        </div>

        {/* Glossary Sections */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category} id={category}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                {categoryLabels[category]}
              </h2>
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 divide-y divide-slate-700">
                {termsByCategory[category]?.sort((a, b) => a.term.localeCompare(b.term)).map((item) => (
                  <div key={item.term} className="p-4">
                    <dt className="text-white font-semibold mb-1">{item.term}</dt>
                    <dd className="text-slate-400 text-sm">{item.definition}</dd>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Back to top */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="text-emerald-400 hover:text-emerald-300 text-sm"
          >
            ↑ Back to top
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
