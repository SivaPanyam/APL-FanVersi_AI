import { motion } from "framer-motion";
import { FanChat } from "@/components/chat/FanChat";
import { 
  Users, 
  Flame, 
  Activity,
  Search
} from "lucide-react";

export function FanChatPage() {
  return (
    <div className="h-[calc(100vh-12rem)] grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar: Channels/Rooms */}
      <div className="hidden lg:flex flex-col gap-6">
        <div className="space-y-4">
           <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-energy-neon" />
            Active Arenas
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-600" />
            <input 
              type="text" 
              placeholder="Search arenas..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:border-verse-500 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/5">
          {[
            { id: 1, name: "Lakers vs Warriors", fans: "12k", active: true },
            { id: 2, name: "Chiefs vs Eagles", fans: "45k", active: false },
            { id: 3, name: "Real Madrid vs Man City", fans: "89k", active: false },
            { id: 4, name: "Global Fan Lounge", fans: "4k", active: false },
          ].map((room) => (
            <button 
              key={room.id}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                room.active 
                  ? "bg-verse-600/10 border-verse-500/30 text-white" 
                  : "bg-white/5 border-transparent text-ink-400 hover:bg-white/10"
              }`}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-bold text-left">{room.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`h-1 w-1 rounded-full ${room.active ? 'bg-energy-neon animate-pulse' : 'bg-ink-600'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink-500">{room.fans} Fans</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* User Presence Card */}
        <div className="glass-card p-4 border-verse-500/20 bg-verse-600/5">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-ink-800 border-2 border-energy-neon shadow-neon overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="Me" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Your Squad Status</p>
                <p className="text-[10px] font-black text-energy-neon uppercase">Online • MVP</p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-3 flex flex-col h-full">
         <FanChat />
      </div>
    </div>
  );
}
