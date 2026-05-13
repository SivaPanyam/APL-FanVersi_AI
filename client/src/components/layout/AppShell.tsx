import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type AppShellProps = { children: ReactNode };

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-verse-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header className="border-b border-ink-800/80 bg-ink-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            FanVerse{" "}
            <span className="text-verse-400">AI</span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-3 text-sm">
            <span className="hidden text-ink-400 sm:inline">Live sports companion</span>
          </nav>
        </div>
      </header>
      <motion.main
        id="main"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <footer className="border-t border-ink-800/80 py-6 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} FanVerse AI
      </footer>
    </div>
  );
}
