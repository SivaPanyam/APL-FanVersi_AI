import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user, status, signInWithGoogle, signOutUser } = useAuth();

  return (
    <nav aria-label="Main Navigation" className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" aria-label="Home" className="flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verse-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950">
            <div className="h-8 w-8 rounded-lg bg-verse-600 shadow-neon flex items-center justify-center">
              <span className="text-white font-bold text-xl" aria-hidden="true">V</span>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Fan<span className="text-energy-neon">Verse</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-ink-300 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verse-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950">Dashboard</Link>
            <Link to="/leaderboard" className="text-sm font-medium text-ink-300 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verse-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950">Leaderboard</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {status === "signedIn" ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-semibold text-white">{user?.displayName}</span>
                <span className="text-[10px] text-energy-neon uppercase">Fan Level 12</span>
              </div>
              <button 
                onClick={signOutUser}
                className="text-sm font-medium text-ink-400 hover:text-white transition-colors"
              >
                Sign Out
              </button>
              <div className="h-10 w-10 rounded-full border-2 border-verse-500 p-0.5">
                <img 
                  src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                  alt="Profile" 
                  className="h-full w-full rounded-full bg-ink-800"
                />
              </div>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="btn-primary py-2 px-4 text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
