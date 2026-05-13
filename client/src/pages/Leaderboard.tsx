import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Search,
  Filter,
  Zap,
  Target
} from "lucide-react";

interface RankItem {
  rank: number;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  xp: string;
  accuracy: string;
  trend: "up" | "down" | "stable";
}

const MOCK_RANKINGS: RankItem[] = [
  { rank: 1, user: { name: "MatrixKing", avatar: "1", level: 52 }, xp: "124,500", accuracy: "84%", trend: "up" },
  { rank: 2, user: { name: "VersePro", avatar: "2", level: 48 }, xp: "112,200", accuracy: "79%", trend: "stable" },
  { rank: 3, user: { name: "NeonStriker", avatar: "3", level: 45 }, xp: "98,400", accuracy: "81%", trend: "up" },
  { rank: 4, user: { name: "FanLord", avatar: "4", level: 42 }, xp: "85,100", accuracy: "75%", trend: "down" },
  { rank: 5, user: { name: "TacticalZen", avatar: "5", level: 40 }, xp: "72,800", accuracy: "88%", trend: "up" },
  { rank: 6, user: { name: "GridMaster", avatar: "6", level: 38 }, xp: "64,200", accuracy: "72%", trend: "stable" },
];

export function Leaderboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-black text-white tracking-tight uppercase">
            Hall of <span className="text-energy-gold">Fame</span>
          </h1>
          <p className="mt-1 text-ink-400 font-medium">Top performing fans across the global arena.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-600" />
            <input 
              type="text" 
              placeholder="Search fans..." 
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-energy-gold outline-none w-64"
            />
          </div>
          <button className="p-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[MOCK_RANKINGS[1], MOCK_RANKINGS[0], MOCK_RANKINGS[2]].map((item, idx) => (
          <motion.div
            key={item.user.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-card p-8 flex flex-col items-center text-center relative overflow-hidden ${
              idx === 1 ? 'border-energy-gold/30 bg-energy-gold/5 -translate-y-4 scale-105 z-10' : ''
            }`}
          >
            {idx === 1 && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-energy-gold to-transparent" />
            )}
            
            <div className="relative">
              <div className={`h-24 w-24 rounded-2xl p-1 bg-gradient-to-br ${
                idx === 1 ? 'from-energy-gold to-energy-ruby' : 'from-ink-700 to-ink-900'
              } shadow-2xl`}>
                <div className="h-full w-full rounded-2xl bg-ink-950 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user.name}`} alt="Avatar" />
                </div>
              </div>
              <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full border-4 border-ink-950 flex items-center justify-center font-black text-xs ${
                idx === 1 ? 'bg-energy-gold text-ink-950' : 'bg-ink-800 text-ink-200'
              }`}>
                {idx === 1 ? 1 : idx === 0 ? 2 : 3}
              </div>
            </div>

            <div className="mt-8 space-y-1">
              <h3 className="text-xl font-black text-white">{item.user.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-ink-500">Level {item.user.level}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 w-full">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <p className="text-sm font-black text-white">{item.xp}</p>
                <p className="text-[8px] font-bold uppercase text-ink-500">XP Earned</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <p className="text-sm font-black text-energy-emerald">{item.accuracy}</p>
                <p className="text-[8px] font-bold uppercase text-ink-500">Accuracy</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rankings List */}
      <div className="glass-card overflow-hidden">
        <div className="bg-white/5 px-6 py-4 border-b border-white/10 grid grid-cols-12 text-[10px] font-black uppercase tracking-widest text-ink-500">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">User</div>
          <div className="col-span-2 text-center">Accuracy</div>
          <div className="col-span-2 text-center">XP Points</div>
          <div className="col-span-2 text-right">Trend</div>
        </div>

        <div className="divide-y divide-white/5">
          {MOCK_RANKINGS.map((item, idx) => (
            <motion.div
              key={item.user.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="px-6 py-4 grid grid-cols-12 items-center hover:bg-white/5 transition-all group"
            >
              <div className="col-span-1">
                <span className={`text-sm font-black ${
                  item.rank <= 3 ? 'text-energy-gold' : 'text-ink-600'
                }`}>#{item.rank}</span>
              </div>
              
              <div className="col-span-5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-ink-800 overflow-hidden border border-white/10">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user.name}`} alt="Avatar" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-energy-neon transition-colors">{item.user.name}</p>
                  <p className="text-[10px] font-medium text-ink-500">Lvl {item.user.level} Fan</p>
                </div>
              </div>

              <div className="col-span-2 text-center">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-energy-emerald/10 text-energy-emerald text-[10px] font-bold">
                  <Target className="h-3 w-3" />
                  {item.accuracy}
                </div>
              </div>

              <div className="col-span-2 text-center">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-verse-600/10 text-verse-400 text-[10px] font-bold">
                  <Zap className="h-3 w-3" />
                  {item.xp}
                </div>
              </div>

              <div className="col-span-2 text-right">
                <div className="flex justify-end">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                    item.trend === 'up' ? 'text-energy-emerald' : item.trend === 'down' ? 'text-energy-ruby' : 'text-ink-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${item.trend === 'down' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
