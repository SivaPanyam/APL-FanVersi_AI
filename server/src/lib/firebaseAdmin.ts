import admin from "firebase-admin";

let initialized = false;

export function initFirebaseAdmin(): void {
  if (initialized) return;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    console.warn(
      "[fanverse] FIREBASE_SERVICE_ACCOUNT not set — ID tokens will not be verified server-side."
    );
    return;
  }
  try {
    const creds = JSON.parse(raw) as admin.ServiceAccount;
    admin.initializeApp({ credential: admin.credential.cert(creds) });
    initialized = true;
    console.log("[fanverse] Firebase Admin initialized.");
  } catch (e) {
    console.error("[fanverse] Failed to parse FIREBASE_SERVICE_ACCOUNT", e);
  }
}

export function isAdminReady(): boolean {
  return admin.apps.length > 0;
}

export async function verifyIdToken(
  bearer: string | undefined
): Promise<admin.auth.DecodedIdToken | null> {
  if (!isAdminReady() || !bearer?.startsWith("Bearer ")) return null;
  const token = bearer.slice("Bearer ".length).trim();
  if (!token) return null;
  return admin.auth().verifyIdToken(token);
}
