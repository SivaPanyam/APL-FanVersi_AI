import { motion } from "framer-motion";
import { 
  Zap, 
  Users, 
  BrainCircuit, 
  Timer, 
  ArrowUpRight, 
  TrendingUp 
} from "lucide-react";

interface Team {
  name: string;
  logo: string;
  score: number;
}

export interface Match {
  id: string;
  league: string;
  teams: {
    home: Team;
    away: Team;
  };
  timer: string;
  quarter: string;
  winProbability: number; // 0 to 1 for home team
  momentum: number; // -1 to 1
  aiInsight: string;
  fanCount: string;
  status: "live" | "upcoming" | "final";
}

export function WinProbabilityBar({ probability }: { probability: number }) {
  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase text-ink-500">
        <span>Win Probability</span>
        <span className="text-energy-neon">{(probability * 100).toFixed(0)}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-ink-800 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${probability * 100}%` }}
          className="h-full bg-gradient-to-r from-verse-600 to-energy-neon"
        />
      </div>
    </div>
  );
}

export function MatchCard({ match }: { match: Match }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="glass-card flex flex-col overflow-hidden transition-all hover:neon-border group"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between bg-white/5 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-ink-400">{match.league}</span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase text-red-500">Live</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-ink-400">
          <Timer className="h-3 w-3" />
          {match.quarter} • {match.timer}
        </div>
      </div>

      {/* Match Scoreboard */}
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-2 w-24 text-center">
            <div className="h-12 w-12 rounded-xl bg-ink-800/50 p-2 flex items-center justify-center">
              <img src={match.teams.home.logo} alt={match.teams.home.name} className="h-full w-full object-contain" />
            </div>
            <span className="text-xs font-bold text-white truncate w-full">{match.teams.home.name}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-display font-black text-white">{match.teams.home.score}</span>
              <span className="text-ink-700 font-black">-</span>
              <span className="text-3xl font-display font-black text-white">{match.teams.away.score}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-ink-800/50">
              <TrendingUp className={`h-3 w-3 ${match.momentum > 0 ? 'text-energy-emerald' : 'text-energy-ruby'}`} />
              <span className="text-[10px] font-bold text-ink-400 uppercase">Momentum</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 w-24 text-center">
            <div className="h-12 w-12 rounded-xl bg-ink-800/50 p-2 flex items-center justify-center">
              <img src={match.teams.away.logo} alt={match.teams.away.name} className="h-full w-full object-contain" />
            </div>
            <span className="text-xs font-bold text-white truncate w-full">{match.teams.away.name}</span>
          </div>
        </div>

        <WinProbabilityBar probability={match.winProbability} />

        {/* AI Insight Box */}
        <div className="rounded-xl bg-verse-600/10 border border-verse-500/20 p-3 flex gap-3">
          <BrainCircuit className="h-5 w-5 text-energy-neon shrink-0" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-verse-400">AI Intelligence</span>
            <p className="text-[11px] leading-relaxed text-ink-200 line-clamp-2">
              {match.aiInsight}
            </p>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-ink-500" />
              <span className="text-xs font-medium text-ink-400">{match.fanCount}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 text-ink-400 hover:text-energy-neon hover:bg-white/10 transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button className="btn-primary py-1.5 px-4 text-[11px] h-8">
              Join Experience
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
