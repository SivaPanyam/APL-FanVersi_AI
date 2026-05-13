import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Share2, 
  Bell, 
  MessageSquare, 
  BrainCircuit,
  Zap,
  Activity,
  Trophy
} from "lucide-react";
import { PredictionCard, PredictionEvent } from "@/components/dashboard/PredictionCard";
import { WinProbabilityBar } from "@/components/dashboard/MatchCard";

const MOCK_PREDICTIONS: PredictionEvent[] = [
  {
    id: "p1",
    matchId: "123",
    question: "Who will score the next field goal?",
    type: "event",
    options: [
      { id: "o1", label: "LeBron James", votes: 450 },
      { id: "o2", label: "Stephen Curry", votes: 320 },
      { id: "o3", label: "Anthony Davis", votes: 120 },
      { id: "o4", label: "Other", votes: 45 }
    ],
    xpReward: 150,
    timeLeft: 45
  },
  {
    id: "p2",
    matchId: "123",
    question: "How many 3-pointers in the 4th Quarter?",
    type: "stat",
    options: [
      { id: "o1", label: "Under 5.5", votes: 89 },
      { id: "o2", label: "Over 5.5", votes: 245 }
    ],
    xpReward: 100,
    timeLeft: 120
  }
];

export function MatchDetails() {
  const { id } = useParams();
  const [activePredictions, setActivePredictions] = useState(MOCK_PREDICTIONS);

  return (
    <div className="space-y-8 pb-20">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 text-ink-500 hover:text-white transition-colors">
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Arena</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-xl bg-white/5 text-ink-400 hover:text-white transition">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-xl bg-white/5 text-ink-400 hover:text-white transition">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Hero Scoreboard */}
      <div className="glass-card overflow-hidden p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-verse-600/10 via-transparent to-energy-neon/5 -z-10" />
        
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-4 px-3 py-1 rounded-full bg-energy-ruby/20 border border-energy-ruby/20">
            <span className="h-2 w-2 rounded-full bg-energy-ruby animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-energy-ruby">Live • Q4 02:45</span>
          </div>

          <div className="w-full flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-4 w-1/3">
              <div className="h-24 w-24 rounded-3xl bg-ink-800/50 p-4 flex items-center justify-center border border-white/5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg" alt="Lakers" className="h-full w-full object-contain" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-black text-white">Lakers</h2>
                <p className="text-[10px] font-bold text-ink-500 uppercase tracking-widest">Los Angeles</p>
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-8">
                <span className="text-7xl font-display font-black text-white tracking-tighter">104</span>
                <span className="text-ink-800 font-black text-4xl">-</span>
                <span className="text-7xl font-display font-black text-white tracking-tighter">102</span>
              </div>
              <div className="px-4 py-1 rounded-lg bg-ink-800/50 text-[10px] font-black uppercase text-ink-400 border border-white/5">
                Target: 110 Win Condition
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-4 w-1/3">
              <div className="h-24 w-24 rounded-3xl bg-ink-800/50 p-4 flex items-center justify-center border border-white/5">
                <img src="https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg" alt="Warriors" className="h-full w-full object-contain" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-black text-white">Warriors</h2>
                <p className="text-[10px] font-bold text-ink-500 uppercase tracking-widest">Golden State</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl">
             <WinProbabilityBar probability={0.62} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prediction Zone */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-energy-neon" />
              Prediction Zone
            </h3>
            <span className="text-[10px] font-bold text-ink-500 uppercase">2 Pools Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePredictions.map((pred) => (
              <PredictionCard 
                key={pred.id} 
                event={pred} 
                onVote={(id) => console.log("Voted:", id)} 
              />
            ))}
          </div>

          {/* Tactical Feed */}
          <section className="glass-card overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <h3 className="font-display font-bold text-white flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-energy-neon" />
                AI Tactical Analysis
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-verse-600/10 border border-verse-500/20">
                <div className="h-10 w-10 shrink-0 rounded-full bg-verse-600 flex items-center justify-center shadow-neon">
                  <BrainCircuit className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Coach Gemini:</p>
                  <p className="mt-1 text-sm text-ink-200 leading-relaxed">
                    Warriors are successfully isolating Davis at the top of the key. Expect a pick-and-roll transition from Lakers to reset the defensive shape in the next 2 minutes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Engagement Sidebar */}
        <div className="space-y-8">
          <section className="glass-card p-6">
             <h3 className="font-display font-bold text-white flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-energy-neon" />
              Match Engagement
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-ink-500">
                  <span>Fan Sentiment</span>
                  <span className="text-energy-emerald">Hype: 84%</span>
                </div>
                <div className="h-1.5 w-full bg-ink-800 rounded-full overflow-hidden">
                  <div className="h-full w-[84%] bg-gradient-to-r from-energy-emerald to-energy-neon" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                  <p className="text-2xl font-black text-white">12.4k</p>
                  <p className="text-[10px] font-bold uppercase text-ink-500">Active Fans</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                  <p className="text-2xl font-black text-white">1,240</p>
                  <p className="text-[10px] font-bold uppercase text-ink-500">Total Predictions</p>
                </div>
              </div>

              <button className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Join Live Chat
              </button>
            </div>
          </section>

          <section className="glass-card p-6 border-energy-gold/20 bg-energy-gold/5">
             <div className="flex items-center gap-3 mb-4">
               <Trophy className="h-6 w-6 text-energy-gold" />
               <h3 className="font-display font-bold text-white">Live Leaderboard</h3>
             </div>
             <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <span className="text-xs font-black text-ink-500">#{i}</span>
                     <div className="h-8 w-8 rounded-lg bg-ink-800" />
                     <span className="text-xs font-bold text-white">Fan_{i*123}</span>
                   </div>
                   <span className="text-[10px] font-black text-energy-gold">12,400 XP</span>
                 </div>
               ))}
               <Link to="/leaderboard" className="block text-center text-[10px] font-black uppercase text-energy-gold hover:underline mt-4">
                 View Full Leaderboard
               </Link>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
