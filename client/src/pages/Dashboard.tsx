import { motion } from "framer-motion";
import { 
  Trophy, 
  Users, 
  TrendingUp, 
  Zap, 
  Activity,
  Filter
} from "lucide-react";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { useMatchData } from "@/hooks/useMatchData";

export function Dashboard() {
  const { matches, loading } = useMatchData();

  return (
    <div className="space-y-8 pb-12">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-black text-white tracking-tight uppercase">
            Live <span className="text-energy-neon">Arena</span>
          </h1>
          <p className="mt-1 text-ink-400 font-medium">Real-time engagement and AI strategic insights.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10">
            <Filter className="h-4 w-4" />
            All Sports
          </button>
          <div className="h-10 w-1 px-3 bg-white/5 hidden sm:block" />
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-ink-950 bg-ink-800 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
              </div>
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-ink-950 bg-verse-600 flex items-center justify-center text-[10px] font-bold text-white">
              +4k
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Fans', value: '124,502', icon: Users, color: 'text-energy-neon' },
          { label: 'Total Volume', value: '4.2M VP', icon: Activity, color: 'text-verse-400' },
          { label: 'Global Trend', value: '+14.2%', icon: TrendingUp, color: 'text-energy-emerald' },
          { label: 'Rewards Pool', value: '10.5 ETH', icon: Trophy, color: 'text-energy-gold' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-5 group hover:bg-white/10 transition-all cursor-default"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <div className="h-1.5 w-1.5 rounded-full bg-energy-neon shadow-neon animate-pulse" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-ink-500 mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-energy-neon" />
            Matches in Play
          </h2>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-ink-500">
            <span className="h-2 w-2 rounded-full bg-energy-neon shadow-neon" />
            Synced with RTDB
          </div>
        </div>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}

        {!loading && matches.length === 0 && (
          <div className="glass-card p-20 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-ink-500">
              <Activity className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Live Matches</h3>
            <p className="text-ink-400 mt-2">There are no matches currently in play. Check back soon!</p>
            <button className="btn-secondary mt-6 py-2 px-6">View Schedule</button>
          </div>
        )}
      </section>
    </div>
  );
}
