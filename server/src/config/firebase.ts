import admin from "firebase-admin";

export const initFirebaseAdmin = () => {
  if (admin.apps.length > 0) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (projectId && privateKey && clientEmail) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        privateKey,
        clientEmail,
      }),
      databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
    });
    console.log("Firebase Admin initialized with service account.");
  } else {
    // Fallback for local development or if ADC is configured
    admin.initializeApp();
    console.log("Firebase Admin initialized with default credentials.");
  }
};

export const verifyIdToken = async (authHeader?: string) => {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.split("Bearer ")[1];
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (e) {
    console.error("Token verification failed:", e);
    return null;
  }
};
