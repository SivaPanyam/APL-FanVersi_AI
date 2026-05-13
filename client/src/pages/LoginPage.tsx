import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LogIn } from "lucide-react";

export function LoginPage() {
  const { status, signInWithGoogle } = useAuth();

  if (status === "signedIn") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="h-16 w-16 rounded-2xl bg-verse-600 shadow-neon flex items-center justify-center">
            <span className="text-white font-bold text-3xl">V</span>
          </div>
        </motion.div>
        <h2 className="mt-6 text-center font-display text-3xl font-bold tracking-tight text-white">
          Welcome back, Fan
        </h2>
        <p className="mt-2 text-center text-sm text-ink-400">
          Sign in to access live insights and join the competition.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card px-4 py-8 shadow sm:rounded-3xl sm:px-10"
        >
          <div className="space-y-6">
            <button
              onClick={() => void signInWithGoogle()}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-ink-900 shadow-sm transition hover:bg-ink-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-ink-950 px-6 text-ink-500 uppercase tracking-widest text-[10px]">Fan Protocol</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs text-ink-400">
                <div className="h-1.5 w-1.5 rounded-full bg-energy-neon shadow-neon" />
                Real-time sync with live matches
              </div>
              <div className="flex items-center gap-4 text-xs text-ink-400">
                <div className="h-1.5 w-1.5 rounded-full bg-energy-neon shadow-neon" />
                AI-driven strategy insights
              </div>
              <div className="flex items-center gap-4 text-xs text-ink-400">
                <div className="h-1.5 w-1.5 rounded-full bg-energy-neon shadow-neon" />
                Global leaderboard participation
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
