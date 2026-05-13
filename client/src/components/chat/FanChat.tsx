import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Smile, 
  ShieldCheck, 
  Zap, 
  Users,
  MoreVertical,
  ThumbsUp,
  Heart,
  Flame,
  MessageSquare
} from "lucide-react";
import { AriaLive } from "@/components/ui/AriaLive";

interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
    badge?: "MVP" | "PRO" | "FAN";
  };
  text: string;
  timestamp: string;
  reactions: Record<string, number>;
}

const MOCK_MESSAGES: Message[] = [
  { id: "1", user: { name: "NeonStriker", avatar: "1", badge: "MVP" }, text: "LEBRON IS GOING OFF! That last dunk was insane 🏀🔥", timestamp: "19:30", reactions: { "🔥": 12, "😮": 4 } },
  { id: "2", user: { name: "VerseFan_42", avatar: "2", badge: "PRO" }, text: "Warriors need a timeout ASAP. The defense is crumbling.", timestamp: "19:31", reactions: { "💯": 2 } },
  { id: "3", user: { name: "GridMaster", avatar: "3", badge: "FAN" }, text: "Anyone see that screen by Davis? Masterclass.", timestamp: "19:32", reactions: { "🛡️": 5 } },
  { id: "4", user: { name: "MatrixKing", avatar: "4", badge: "MVP" }, text: "Predicting a 3-pointer from Curry right now. Watch this.", timestamp: "19:32", reactions: { "🎯": 8 } },
];

export function MessageBubble({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex gap-3 px-4 py-2 hover:bg-white/5 transition-colors"
    >
      <div className="h-10 w-10 shrink-0 rounded-xl bg-ink-800 overflow-hidden border border-white/10">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.user.name}`} alt="Avatar" />
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-white">{message.user.name}</span>
          {message.user.badge && (
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
              message.user.badge === 'MVP' ? 'bg-energy-gold text-ink-950' : 
              message.user.badge === 'PRO' ? 'bg-verse-600 text-white' : 'bg-ink-800 text-ink-400'
            }`}>
              {message.user.badge}
            </span>
          )}
          <span className="text-[10px] text-ink-600 font-medium">{message.timestamp}</span>
        </div>
        <p className="text-sm text-ink-200 leading-relaxed">{message.text}</p>
        
        {/* Reactions */}
        <div className="flex items-center gap-1.5 mt-2">
          {Object.entries(message.reactions).map(([emoji, count]) => (
            <button key={emoji} className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/5 border border-white/5 hover:border-energy-neon/30 transition-all text-[10px]">
              <span>{emoji}</span>
              <span className="font-bold text-ink-500">{count}</span>
            </button>
          ))}
          <button className="opacity-0 group-hover:opacity-100 h-5 w-5 flex items-center justify-center rounded-full bg-white/5 text-ink-500 hover:text-white transition-all">
            <Smile className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function FanChat({ roomId = "global" }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      user: { name: "You", avatar: "me", badge: "MVP" },
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: {}
    };

    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-ink-950/50 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-verse-600 flex items-center justify-center shadow-neon">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">Match Chat: Lakers vs Warriors</h3>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-energy-emerald animate-pulse" />
              <span className="text-[10px] font-bold text-ink-500 uppercase tracking-widest">12,402 Fans Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-white/5 text-ink-400 hover:text-white transition">
            <Users className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg bg-white/5 text-ink-400 hover:text-white transition">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/10"
      >
        <div className="space-y-1">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        {/* Quick Reactions */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
          {["🔥", "🏀", "😮", "🙌", "💯", "🎯"].map(emoji => (
            <button key={emoji} className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 hover:border-energy-neon/50 transition-all">
              {emoji}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message to the arena..."
              aria-label="Chat message input"
              className="w-full bg-ink-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-ink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verse-400 focus-visible:border-transparent transition-all pr-10"
            />
            <button type="button" aria-label="Add emoji" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-600 hover:text-energy-neon transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verse-400 rounded">
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <button 
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-verse-600 text-white shadow-neon hover:bg-verse-500 disabled:opacity-50 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy-neon/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <AriaLive message={messages.length > 4 ? `New message from ${messages[messages.length - 1].user.name}: ${messages[messages.length - 1].text}` : ""} politeness="polite" />
      </div>
    </div>
  );
}

