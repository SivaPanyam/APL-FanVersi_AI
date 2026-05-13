import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  BrainCircuit, 
  Sparkles, 
  X, 
  MessageSquare,
  RefreshCw
} from "lucide-react";
import { postJson } from "@/lib/api";

interface Message {
  role: "user" | "model";
  text: string;
}

const SUGGESTED_PROMPTS = [
  "Why did momentum shift?",
  "Predict the next goal",
  "Who is performing best?",
  "Tactical changes needed?"
];

export function ChatPanel({ matchContext, onClose }: { matchContext?: string; onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "I'm your FanVerse AI Assistant. Ask me anything about the live match strategy, player performance, or predictions!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const res = await postJson<{ text: string }>("/ai/chat", {
        message: text.trim(),
        history,
        matchContext
      });

      setMessages(prev => [...prev, { role: "model", text: res.text }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "model", text: "Sorry, I'm having trouble connecting to the arena data. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-ink-950/50 backdrop-blur-2xl border-l border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-verse-600 flex items-center justify-center shadow-neon">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Assistant</h3>
            <span className="text-[10px] text-energy-neon font-black uppercase tracking-widest animate-pulse">Live Analysis</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-ink-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user" 
                  ? "bg-verse-600 text-white shadow-neon" 
                  : "glass-card text-ink-100"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="glass-card px-4 py-3 rounded-2xl flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-energy-neon animate-spin" />
              <span className="text-xs font-medium text-ink-400 italic">Analyzing plays...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 border-t border-white/5 bg-white/5">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-ink-300 hover:border-energy-neon/50 hover:text-white transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-4 border-t border-white/10"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI about the match..."
            className="w-full rounded-xl border border-white/10 bg-ink-900/50 px-4 py-3 pr-12 text-sm text-white placeholder:text-ink-600 focus:border-verse-500 focus:ring-1 focus:ring-verse-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 h-8 w-8 flex items-center justify-center rounded-lg bg-verse-600 text-white shadow-neon hover:bg-verse-500 disabled:opacity-50 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-ink-500 justify-center">
          <Sparkles className="h-3 w-3 text-energy-neon" />
          Powered by Gemini 1.5 Flash
        </div>
      </form>
    </div>
  );
}
