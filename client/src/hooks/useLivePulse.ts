import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { getFirebaseRealtimeDb } from "@/lib/firebase";

type PulseState =
  | { status: "idle"; message: string }
  | { status: "live"; payload: unknown }
  | { status: "error"; message: string };

const DEFAULT_IDLE =
  "Add `VITE_FIREBASE_DATABASE_URL` and publish read rules for `public/live` to enable live fan pulse.";

/**
 * Read-only subscription to `public/live` in Firebase Realtime Database.
 */
export function useLivePulse(): PulseState {
  const [state, setState] = useState<PulseState>({ status: "idle", message: DEFAULT_IDLE });

  useEffect(() => {
    const db = getFirebaseRealtimeDb();
    if (!db) {
      setState({ status: "idle", message: DEFAULT_IDLE });
      return;
    }

    const liveRef = ref(db, "public/live");
    const unsub = onValue(
      liveRef,
      (snap) => {
        if (!snap.exists()) {
          setState({ status: "live", payload: null });
          return;
        }
        setState({ status: "live", payload: snap.val() });
      },
      (err) => {
        setState({
          status: "error",
          message: err.message || "Realtime listener failed.",
        });
      }
    );

    return () => unsub();
  }, []);

  return state;
}
