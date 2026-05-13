import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useLivePulse } from "@/hooks/useLivePulse";
import { useMatchBrief } from "@/hooks/useMatchBrief";
import { postJson } from "@/lib/api";
import { isFirebaseConfigured } from "@/lib/firebase";

type InsightResponse = { text: string };

export function HomePage() {
  const auth = useAuth();
  const match = useMatchBrief();
  const pulse = useLivePulse();
  const [context, setContext] = useState(
    "NBA crunch time: tie game, 30s left, home team has momentum."
  );
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runInsight = useCallback(async () => {
    setLoading(true);
    setError(null);
    setInsight(null);
    try {
      const token =
        auth.status === "signedIn" && auth.user ? await auth.user.getIdToken() : null;
      const res = await postJson<InsightResponse>(
        "/ai/insight",
        { context: context.trim() },
        token
      );
      setInsight(res.text);
    } catch (e) {
      const msg = e && typeof e === "object" && "message" in e ? String((e as { message: unknown }).message) : "Request failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [auth, context]);

  return (
    <div className="space-y-10">
      <section aria-labelledby="hero-heading" className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wide text-verse-400">
          Second-screen sports AI
        </p>
        <h1
          id="hero-heading"
          className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          Turn every match into an interactive fan experience.
        </h1>
        <p className="max-w-2xl text-base text-ink-300 sm:text-lg">
          FanVerse AI blends live context, predictions, and gamified nudges so viewers stay
          locked in — without leaving the action on screen.
        </p>
      </section>

      <section
        aria-labelledby="live-heading"
        className="grid gap-6 lg:grid-cols-2"
      >
        <motion.div
          layout
          className="rounded-2xl border border-ink-800 bg-ink-900/40 p-6 shadow-xl shadow-black/20"
        >
          <h2 id="live-heading" className="font-display text-lg font-semibold text-white">
            Live stack
          </h2>
          <dl className="mt-4 space-y-3 text-sm text-ink-300">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <dt className="text-ink-400">Firebase</dt>
              <dd>
                {isFirebaseConfigured() ? (
                  <span className="text-verse-300">Configured</span>
                ) : (
                  <span className="text-amber-300/90">Add client env keys</span>
                )}
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <dt className="text-ink-400">Match brief (Firestore)</dt>
              <dd>
                {match.status === "loading" ? <Spinner label="Syncing" /> : null}
                {match.status === "ready" ? (
                  <span className="text-ink-100">{match.headline}</span>
                ) : null}
                {match.status === "error" ? (
                  <span className="text-red-300">{match.message}</span>
                ) : null}
                {match.status === "idle" ? (
                  <span className="text-ink-500">Waiting for Firebase env</span>
                ) : null}
              </dd>
            </div>
            {match.status === "ready" && match.tags.length ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {match.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-ink-800 px-3 py-1 text-xs text-ink-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="flex flex-col gap-1 border-t border-ink-800 pt-3 sm:flex-row sm:items-start sm:justify-between">
              <dt className="text-ink-400">Realtime pulse</dt>
              <dd className="max-w-md text-ink-200">
                {pulse.status === "idle" ? pulse.message : null}
                {pulse.status === "error" ? pulse.message : null}
                {pulse.status === "live" ? (
                  <pre className="whitespace-pre-wrap break-words rounded-lg bg-ink-950/80 p-3 text-xs text-verse-100">
                    {pulse.payload == null
                      ? "Listening — write JSON under public/live in RTDB."
                      : JSON.stringify(pulse.payload, null, 2)}
                  </pre>
                ) : null}
              </dd>
            </div>
          </dl>
        </motion.div>

        <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-6 shadow-xl shadow-black/20">
          <h2 className="font-display text-lg font-semibold text-white">Account</h2>
          <p className="mt-2 text-sm text-ink-400">
            Sign in to attach Firebase ID tokens to API calls when your Cloud Run service verifies
            them.
          </p>
          <div className="mt-4 space-y-3">
            {auth.status === "unconfigured" ? (
              <p className="text-sm text-amber-200/90">
                Firebase client keys are missing. Copy <code className="text-verse-200">client/.env.example</code>{" "}
                to <code className="text-verse-200">client/.env</code>.
              </p>
            ) : null}
            {auth.status === "loading" ? <Spinner label="Checking session" /> : null}
            {auth.status === "signedOut" ? (
              <button
                type="button"
                onClick={() => void auth.signInWithGoogle()}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink-900 transition hover:bg-ink-100"
              >
                Continue with Google
              </button>
            ) : null}
            {auth.status === "signedIn" ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ink-200">
                  Signed in as{" "}
                  <span className="font-medium text-white">
                    {auth.user?.displayName || auth.user?.email || "Fan"}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => void auth.signOutUser()}
                  className="rounded-xl border border-ink-600 px-4 py-2 text-sm font-medium text-ink-100 transition hover:border-ink-500 hover:bg-ink-800/60"
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="ai-heading" className="space-y-4">
        <h2 id="ai-heading" className="font-display text-lg font-semibold text-white">
          AI insight preview
        </h2>
        <p className="text-sm text-ink-400">
          Calls your Express API (proxied as <code className="text-verse-200">/api</code>), which uses Gemini on the server — API keys never ship to the browser.
        </p>
        <label htmlFor="ctx" className="block text-sm font-medium text-ink-200">
          Match context
        </label>
        <textarea
          id="ctx"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-xl border border-ink-700 bg-ink-950/80 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-600 focus:border-verse-500 focus:ring-1 focus:ring-verse-500"
          placeholder="Describe the live situation…"
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void runInsight()}
            disabled={loading || !context.trim()}
            aria-busy={loading}
            className="inline-flex min-h-[2.75rem] min-w-[10rem] items-center justify-center rounded-xl bg-verse-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-verse-900/30 transition hover:bg-verse-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating…" : "Generate insight"}
          </button>
        </div>
        {error ? (
          <ErrorBanner message={error} onRetry={() => void runInsight()} />
        ) : null}
        {insight ? (
          <motion.article
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-verse-700/40 bg-verse-950/30 p-5 text-sm leading-relaxed text-ink-100"
          >
            {insight}
          </motion.article>
        ) : null}
      </section>
    </div>
  );
}
