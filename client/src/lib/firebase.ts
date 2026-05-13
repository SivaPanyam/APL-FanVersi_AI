import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getDatabase, type Database } from "firebase/database";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const required = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
] as const;

function readConfig() {
  const env = import.meta.env;
  const missing = required.filter((k) => !env[k]);
  if (missing.length) return { ok: false as const, missing };
  return {
    ok: true as const,
    config: {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      databaseURL: env.VITE_FIREBASE_DATABASE_URL,
    },
  };
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let rtdb: Database | null = null;
let storage: FirebaseStorage | null = null;

export function isFirebaseConfigured(): boolean {
  return readConfig().ok;
}

export function getFirebaseApp(): FirebaseApp {
  const cfg = readConfig();
  if (!cfg.ok) {
    throw new Error(
      `Firebase env missing: ${cfg.missing.join(", ")}. Copy .env.example to .env and fill values.`
    );
  }
  if (!app) {
    app = initializeApp(cfg.config);
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) auth = getAuth(getFirebaseApp());
  return auth;
}

export function getFirebaseFirestore(): Firestore {
  if (!db) db = getFirestore(getFirebaseApp());
  return db;
}

export function getFirebaseRealtimeDb(): Database | null {
  const cfg = readConfig();
  if (!cfg.ok || !cfg.config.databaseURL) return null;
  if (!rtdb) rtdb = getDatabase(getFirebaseApp());
  return rtdb;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) storage = getStorage(getFirebaseApp());
  return storage;
}

// Collection Names
export const COLLECTIONS = {
  USERS: "users",
  MATCHES: "matches",
  PREDICTIONS: "predictions",
  POLLS: "polls",
  CHATROOMS: "chatrooms",
  LEADERBOARD: "leaderboard",
  AI_INTERACTIONS: "aiInteractions",
} as const;
