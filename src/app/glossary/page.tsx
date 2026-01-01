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
  { term: "Buy-In", definition: "The minimum amount required to enter a game or tournament.", category: "general" },
  { term: "Cage", definition: "The cashier area in a casino where chips are exchanged for cash.", category: "general" },
  { term: "Card Counting", definition: "A strategy in blackjack where players track high and low cards to gain an advantage.", category: "general" },
  { term: "Cashback", definition: "A percentage of losses returned to players as a promotional incentive.", category: "general" },
  { term: "Chip", definition: "A token used to represent money in casino games.", category: "general" },
  { term: "Comp", definition: "Complimentary items or services given to players by the casino (meals, rooms, shows).", category: "general" },
  { term: "Croupier", definition: "A French term for a casino dealer, commonly used in European casinos.", category: "general" },
  { term: "Drop", definition: "The total amount of money exchanged for chips at a gaming table.", category: "general" },
  { term: "Edge", definition: "The mathematical advantage the house has over players, expressed as a percentage.", category: "general" },
  { term: "Expected Value", definition: "The average amount a player can expect to win or lose on a bet over time.", category: "general" },
  { term: "Eye in the Sky", definition: "The casino's surveillance system monitoring gaming floors from above.", category: "general" },
  { term: "Gambler's Fallacy", definition: "The mistaken belief that past random events affect future outcomes.", category: "general" },
  { term: "Grind", definition: "Playing for extended periods with small, consistent bets.", category: "general" },
  { term: "High Roller", definition: "A player who consistently wagers large amounts of money.", category: "general" },
  { term: "Hold", definition: "The percentage of money wagered that the casino keeps as profit.", category: "general" },
  { term: "Host", definition: "A casino employee who manages relationships with VIP players.", category: "general" },
  { term: "House", definition: "The casino or gambling establishment.", category: "general" },
  { term: "Junket", definition: "An organized trip for gamblers, often with travel and accommodations provided.", category: "general" },
  { term: "Limit", definition: "The minimum and maximum betting amounts allowed at a game.", category: "general" },
  { term: "Marker", definition: "A line of credit extended by the casino to a player.", category: "general" },
  { term: "Odds", definition: "The probability of winning a bet, often expressed as a ratio.", category: "general" },
  { term: "Payout", definition: "The amount paid to a winner, expressed as a ratio or percentage.", category: "general" },
  { term: "Pit", definition: "An area of table games supervised by pit bosses.", category: "general" },
  { term: "Pit Boss", definition: "A casino supervisor who oversees table games in a specific area.", category: "general" },
  { term: "Player's Club", definition: "A loyalty program that rewards players with points and perks.", category: "general" },
  { term: "RTP", definition: "Return to Player - the percentage of wagered money a game pays back over time.", category: "general" },
  { term: "Session", definition: "A single period of gambling from start to finish.", category: "general" },
  { term: "Stake", definition: "The amount of money wagered on a bet.", category: "general" },
  { term: "Tilt", definition: "Playing recklessly due to emotional frustration after losses.", category: "general" },
  { term: "Toke", definition: "A tip or gratuity given to casino dealers.", category: "general" },
  { term: "Variance", definition: "The statistical measure of how results deviate from expected outcomes.", category: "general" },
  { term: "VIP", definition: "Very Important Player - high-value customers who receive special treatment.", category: "general" },
  { term: "Whale", definition: "An extremely high-stakes gambler who bets very large sums.", category: "general" },

  // Table Games
  { term: "Ante", definition: "An initial bet required before cards are dealt in some games.", category: "table" },
  { term: "Baccarat", definition: "A card game where players bet on whether the player or banker hand will win.", category: "table" },
  { term: "Banker", definition: "In baccarat, the hand that plays second and follows specific drawing rules.", category: "table" },
  { term: "Blackjack", definition: "A hand totaling 21 with the first two cards, typically an ace and a 10-value card.", category: "table" },
  { term: "Box Cars", definition: "In craps, a roll of double sixes (12).", category: "table" },
  { term: "Burn Card", definition: "A card discarded from the top of the deck before dealing begins.", category: "table" },
  { term: "Bust", definition: "In blackjack, to go over 21 and lose the hand.", category: "table" },
  { term: "Come Bet", definition: "In craps, a bet placed after the point is established, similar to a pass line bet.", category: "table" },
  { term: "Come Out Roll", definition: "In craps, the first roll of the dice to establish a point.", category: "table" },
  { term: "Craps", definition: "A dice game where players bet on the outcome of rolls.", category: "table" },
  { term: "Don't Pass", definition: "In craps, betting against the shooter - the opposite of a pass line bet.", category: "table" },
  { term: "Double Down", definition: "In blackjack, doubling your bet in exchange for receiving only one more card.", category: "table" },
  { term: "En Prison", definition: "A roulette rule allowing a second chance when the ball lands on zero.", category: "table" },
  { term: "Even Money", definition: "A bet that pays 1:1 - win the same amount wagered.", category: "table" },
  { term: "Hard Hand", definition: "In blackjack, a hand without an ace or with an ace valued at 1.", category: "table" },
  { term: "Hit", definition: "In blackjack, to request another card from the dealer.", category: "table" },
  { term: "Insurance", definition: "A side bet in blackjack when the dealer shows an ace.", category: "table" },
  { term: "La Partage", definition: "A roulette rule returning half your bet when the ball lands on zero.", category: "table" },
  { term: "Natural", definition: "A blackjack (21) dealt with the initial two cards, or an 8 or 9 in baccarat.", category: "table" },
  { term: "Pass Line", definition: "In craps, the basic bet that the shooter will win.", category: "table" },
  { term: "Point", definition: "In craps, the number established by the come out roll (4, 5, 6, 8, 9, or 10).", category: "table" },
  { term: "Push", definition: "A tie between the player and dealer where the bet is returned.", category: "table" },
  { term: "Roulette", definition: "A game where players bet on where a ball will land on a spinning wheel.", category: "table" },
  { term: "Seven Out", definition: "In craps, rolling a 7 after the point is established, ending the round.", category: "table" },
  { term: "Shoe", definition: "A device holding multiple decks of cards for dealing.", category: "table" },
  { term: "Shooter", definition: "The player rolling the dice in craps.", category: "table" },
  { term: "Snake Eyes", definition: "In craps, a roll of double ones (2).", category: "table" },
  { term: "Soft Hand", definition: "In blackjack, a hand with an ace that can be valued at 11.", category: "table" },
  { term: "Split", definition: "In blackjack, dividing a pair into two separate hands.", category: "table" },
  { term: "Stand", definition: "In blackjack, to refuse additional cards and keep your current hand.", category: "table" },
  { term: "Surrender", definition: "In blackjack, forfeiting half your bet to end the hand early.", category: "table" },
  { term: "Tie", definition: "In baccarat, a bet that both hands will have equal totals.", category: "table" },

  // Slots
  { term: "Autoplay", definition: "A feature that spins the reels automatically for a set number of times.", category: "slots" },
  { term: "Bonus Round", definition: "A special feature in a slot game offering additional winning opportunities.", category: "slots" },
  { term: "Cascading Reels", definition: "Winning symbols disappear and new ones fall into place for additional wins.", category: "slots" },
  { term: "Classic Slot", definition: "Traditional 3-reel slots inspired by original mechanical machines.", category: "slots" },
  { term: "Expanding Wild", definition: "A wild symbol that expands to cover an entire reel.", category: "slots" },
  { term: "Free Spins", definition: "Spins awarded without requiring additional wagers.", category: "slots" },
  { term: "Hit Frequency", definition: "How often a slot machine lands a winning combination.", category: "slots" },
  { term: "Jackpot", definition: "The top prize in a slot machine game.", category: "slots" },
  { term: "Max Bet", definition: "The maximum amount that can be wagered on a single spin.", category: "slots" },
  { term: "Megaways", definition: "A slot mechanic with varying symbols per reel, creating thousands of ways to win.", category: "slots" },
  { term: "Multiplier", definition: "A feature that multiplies your winnings by a specified amount.", category: "slots" },
  { term: "Payline", definition: "A line across the reels where matching symbols must land to win.", category: "slots" },
  { term: "Paytable", definition: "A chart showing the value of each symbol and game rules.", category: "slots" },
  { term: "Progressive", definition: "A jackpot that increases over time as more players contribute.", category: "slots" },
  { term: "Reels", definition: "The vertical sections of a slot machine that spin and display symbols.", category: "slots" },
  { term: "Respins", definition: "Additional spins triggered by specific symbol combinations.", category: "slots" },
  { term: "Scatter", definition: "A symbol that pays regardless of position and often triggers bonuses.", category: "slots" },
  { term: "Sticky Wild", definition: "A wild symbol that remains in place for subsequent spins.", category: "slots" },
  { term: "Video Slot", definition: "Modern slots with advanced graphics, animations, and bonus features.", category: "slots" },
  { term: "Volatility", definition: "How often and how much a slot pays out; high volatility means bigger but rarer wins.", category: "slots" },
  { term: "Ways to Win", definition: "A payout system where matching symbols on adjacent reels win regardless of position.", category: "slots" },
  { term: "Wild", definition: "A symbol that substitutes for other symbols to complete winning combinations.", category: "slots" },

  // Poker
  { term: "All-In", definition: "Betting all of your remaining chips.", category: "poker" },
  { term: "Bad Beat", definition: "Losing a hand despite being a statistical favorite to win.", category: "poker" },
  { term: "Big Blind", definition: "The larger of two forced bets, placed by the player two seats left of the dealer.", category: "poker" },
  { term: "Blinds", definition: "Forced bets placed before cards are dealt to start action.", category: "poker" },
  { term: "Bluff", definition: "Betting or raising with a weak hand to make opponents fold.", category: "poker" },
  { term: "Board", definition: "The community cards face-up in the center of the table.", category: "poker" },
  { term: "Button", definition: "A marker indicating the dealer position, rotating each hand.", category: "poker" },
  { term: "Call", definition: "Matching the current bet to stay in the hand.", category: "poker" },
  { term: "Check", definition: "Passing the action to the next player without betting.", category: "poker" },
  { term: "Check-Raise", definition: "Checking initially, then raising after an opponent bets.", category: "poker" },
  { term: "Community Cards", definition: "Shared cards that all players can use to make their hand.", category: "poker" },
  { term: "Drawing Dead", definition: "Having no possible cards that could give you a winning hand.", category: "poker" },
  { term: "Fish", definition: "An inexperienced or unskilled poker player.", category: "poker" },
  { term: "Flop", definition: "The first three community cards dealt face-up in Texas Hold'em.", category: "poker" },
  { term: "Flush", definition: "A hand containing five cards of the same suit.", category: "poker" },
  { term: "Fold", definition: "Surrendering your cards and forfeiting your bets.", category: "poker" },
  { term: "Full House", definition: "A hand containing three of a kind and a pair.", category: "poker" },
  { term: "Heads-Up", definition: "A poker game or situation with only two players.", category: "poker" },
  { term: "Hole Cards", definition: "The private cards dealt face-down to each player.", category: "poker" },
  { term: "Kicker", definition: "A side card used to break ties between similar hands.", category: "poker" },
  { term: "Muck", definition: "To discard your hand without showing it.", category: "poker" },
  { term: "Nuts", definition: "The best possible hand given the community cards.", category: "poker" },
  { term: "Omaha", definition: "A poker variant where players receive four hole cards and must use exactly two.", category: "poker" },
  { term: "Outs", definition: "Cards remaining in the deck that could improve your hand.", category: "poker" },
  { term: "Pocket Pair", definition: "Two hole cards of the same rank.", category: "poker" },
  { term: "Position", definition: "Your seat relative to the dealer, affecting when you act.", category: "poker" },
  { term: "Pot", definition: "The total amount of chips wagered in a hand.", category: "poker" },
  { term: "Pot Odds", definition: "The ratio of the current pot size to the cost of calling a bet.", category: "poker" },
  { term: "Raise", definition: "Increasing the current bet amount.", category: "poker" },
  { term: "Rake", definition: "The commission taken by the casino from each poker pot.", category: "poker" },
  { term: "River", definition: "The fifth and final community card in Texas Hold'em.", category: "poker" },
  { term: "Royal Flush", definition: "The highest poker hand: A-K-Q-J-10 of the same suit.", category: "poker" },
  { term: "Shark", definition: "A skilled, experienced poker player.", category: "poker" },
  { term: "Showdown", definition: "When remaining players reveal their hands to determine the winner.", category: "poker" },
  { term: "Small Blind", definition: "The smaller of two forced bets, placed by the player left of the dealer.", category: "poker" },
  { term: "Straight", definition: "Five consecutive cards of any suit.", category: "poker" },
  { term: "Tell", definition: "A physical or behavioral clue that reveals information about a player's hand.", category: "poker" },
  { term: "Texas Hold'em", definition: "The most popular poker variant where players get two hole cards and share five community cards.", category: "poker" },
  { term: "Turn", definition: "The fourth community card in Texas Hold'em.", category: "poker" },
  { term: "Under the Gun", definition: "The position immediately left of the big blind, first to act preflop.", category: "poker" },

  // Online
  { term: "Affiliate", definition: "A website or person who promotes online casinos for commission.", category: "online" },
  { term: "Autoplay Ban", definition: "Regulations in some jurisdictions prohibiting automatic slot spins.", category: "online" },
  { term: "Bitcoin Casino", definition: "An online casino that accepts cryptocurrency for deposits and withdrawals.", category: "online" },
  { term: "Bonus", definition: "Extra funds or free spins offered by online casinos as promotions.", category: "online" },
  { term: "Bonus Abuse", definition: "Exploiting bonus terms in ways not intended by the casino.", category: "online" },
  { term: "Cashable Bonus", definition: "A bonus that can be withdrawn after meeting wagering requirements.", category: "online" },
  { term: "Demo Mode", definition: "Playing slot games for free without risking real money.", category: "online" },
  { term: "Deposit Limit", definition: "A responsible gambling tool limiting how much you can deposit.", category: "online" },
  { term: "Deposit Match", definition: "A bonus that matches a percentage of your deposit amount.", category: "online" },
  { term: "Game Provider", definition: "Companies that create and license casino games to operators.", category: "online" },
  { term: "Geoblocking", definition: "Technology that restricts access to online casinos based on location.", category: "online" },
  { term: "iGaming", definition: "The online gambling industry, including casinos, sports betting, and poker.", category: "online" },
  { term: "Instant Play", definition: "Playing casino games directly in a web browser without downloading.", category: "online" },
  { term: "KYC", definition: "Know Your Customer - identity verification required by online casinos.", category: "online" },
  { term: "License", definition: "Official authorization from a regulatory body to operate an online casino.", category: "online" },
  { term: "Live Dealer", definition: "Real dealers operating games via video stream in real-time.", category: "online" },
  { term: "Loyalty Program", definition: "A rewards system that gives points or perks for regular play.", category: "online" },
  { term: "Max Win", definition: "The maximum amount that can be won from a single game or bonus.", category: "online" },
  { term: "Mobile Casino", definition: "An online casino optimized for play on smartphones and tablets.", category: "online" },
  { term: "No Deposit Bonus", definition: "A bonus given without requiring a deposit.", category: "online" },
  { term: "Pending Time", definition: "The waiting period before a withdrawal is processed.", category: "online" },
  { term: "Provably Fair", definition: "A cryptographic method allowing players to verify game fairness.", category: "online" },
  { term: "Reload Bonus", definition: "A bonus offered on deposits after the initial welcome bonus.", category: "online" },
  { term: "Responsible Gambling", definition: "Tools and practices to help players gamble safely.", category: "online" },
  { term: "RNG", definition: "Random Number Generator - software ensuring fair and random game outcomes.", category: "online" },
  { term: "Self-Exclusion", definition: "A program allowing players to ban themselves from gambling.", category: "online" },
  { term: "Sticky Bonus", definition: "A bonus that cannot be withdrawn, only used for wagering.", category: "online" },
  { term: "VPN", definition: "Virtual Private Network - often prohibited for accessing online casinos.", category: "online" },
  { term: "Wagering Requirement", definition: "The number of times you must bet a bonus before withdrawing.", category: "online" },
  { term: "Withdrawal", definition: "The process of cashing out winnings from your casino account.", category: "online" },
  { term: "Withdrawal Limit", definition: "The maximum amount that can be withdrawn in a given period.", category: "online" },
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
