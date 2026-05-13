import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Users, 
  Timer, 
  Trophy,
  CheckCircle2
} from "lucide-react";

interface PredictionOption {
  id: string;
  label: string;
  votes: number;
}

export interface PredictionEvent {
  id: string;
  matchId: string;
  question: string;
  type: "event" | "outcome" | "stat";
  options: PredictionOption[];
  xpReward: number;
  timeLeft: number; // seconds
}

export function PredictionCard({ event, onVote }: { event: PredictionEvent; onVote: (optionId: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const totalVotes = event.options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId: string) => {
    if (selected) return;
    setSelected(optionId);
    onVote(optionId);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card overflow-hidden border-verse-500/10"
    >
      <div className="flex items-center justify-between bg-white/5 px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Zap className="h-3 w-3 text-energy-neon" />
          <span className="text-[10px] font-black uppercase tracking-widest text-ink-400">Live Pool</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-energy-ruby">
          <Timer className="h-3 w-3" />
          {Math.floor(event.timeLeft / 60)}:{(event.timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-base font-bold text-white mb-4 leading-tight">
          {event.question}
        </h3>

        <div className="space-y-3">
          {event.options.map((option) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            const isSelected = selected === option.id;

            return (
              <button
                key={option.id}
                disabled={!!selected}
                onClick={() => handleVote(option.id)}
                aria-pressed={isSelected}
                aria-label={`Vote for ${option.label}. ${percentage}% of votes currently.`}
                className={`relative w-full overflow-hidden rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-neon/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${
                  isSelected 
                    ? "border-energy-neon bg-energy-neon/10" 
                    : "border-white/5 bg-white/5 hover:border-white/20"
                }`}
              >
                {/* Progress Bar Background */}
                {selected && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`absolute inset-y-0 left-0 -z-10 bg-white/5 transition-all`}
                  />
                )}

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-ink-300'}`}>
                    {option.label}
                  </span>
                  {selected && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-ink-400">{percentage}%</span>
                      {isSelected && <CheckCircle2 className="h-3 w-3 text-energy-neon" />}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-ink-500" />
            <span className="text-[10px] font-bold uppercase text-ink-500">{totalVotes} Fans Voted</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-3.5 w-3.5 text-energy-gold" />
            <span className="text-[10px] font-black text-energy-gold uppercase">+{event.xpReward} XP</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
