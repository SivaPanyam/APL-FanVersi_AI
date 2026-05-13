import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirebaseFirestore, isFirebaseConfigured } from "@/lib/firebase";

type MatchBriefState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; headline: string; tags: string[] }
  | { status: "error"; message: string };

const DEMO_PATH = "fanverse/demo_match";

/**
 * Example Firestore listener for a second-screen “match context” document.
 * Create `fanverse/demo_match` with fields `{ headline: string, tags?: string[] }` or rely on defaults.
 */
export function useMatchBrief(): MatchBriefState {
  const [state, setState] = useState<MatchBriefState>({ status: "idle" });

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setState({ status: "idle" });
      return;
    }

    setState({ status: "loading" });
    const db = getFirebaseFirestore();
    const unsub = onSnapshot(
      doc(db, DEMO_PATH),
      (snap) => {
        if (!snap.exists()) {
          setState({
            status: "ready",
            headline: "No live doc yet — add Firestore data at fanverse/demo_match.",
            tags: ["Firestore", "Demo"],
          });
          return;
        }
        const data = snap.data() as Record<string, unknown>;
        const headline =
          typeof data.headline === "string"
            ? data.headline
            : "Match context synced from Firestore.";
        const tags = Array.isArray(data.tags)
          ? data.tags.filter((t): t is string => typeof t === "string")
          : [];
        setState({ status: "ready", headline, tags });
      },
      (err) => setState({ status: "error", message: err.message })
    );

    return () => unsub();
  }, []);

  return state;
}
