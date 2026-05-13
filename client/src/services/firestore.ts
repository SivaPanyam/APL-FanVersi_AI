import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  Timestamp,
  addDoc,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint
} from "firebase/firestore";
import { getFirebaseFirestore, COLLECTIONS } from "@/lib/firebase";

// --- Generic Helpers ---

export const getDocument = async <T = DocumentData>(collectionName: string, id: string): Promise<T | null> => {
  const db = getFirebaseFirestore();
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
};

export const createDocument = async <T extends object>(collectionName: string, id: string, data: T) => {
  const db = getFirebaseFirestore();
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

export const addDocument = async <T extends object>(collectionName: string, data: T) => {
  const db = getFirebaseFirestore();
  const colRef = collection(db, collectionName);
  return await addDoc(colRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
};

// --- Specific Service Helpers ---

export const userService = {
  getProfile: (uid: string) => getDocument(COLLECTIONS.USERS, uid),
  updateProfile: (uid: string, data: any) => createDocument(COLLECTIONS.USERS, uid, data),
};

export const matchService = {
  getLiveMatches: (callback: (matches: any[]) => void) => {
    const db = getFirebaseFirestore();
    const q = query(
      collection(db, COLLECTIONS.MATCHES), 
      where("status", "==", "live"),
      orderBy("startTime", "desc")
    );
    return onSnapshot(q, (snapshot) => {
      const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(matches);
    });
  },
  getMatchById: (id: string) => getDocument(COLLECTIONS.MATCHES, id),
};

export const predictionService = {
  placePrediction: (uid: string, matchId: string, prediction: string) => 
    addDocument(COLLECTIONS.PREDICTIONS, { uid, matchId, prediction, status: "pending" }),
  
  getUserPredictions: (uid: string, callback: (preds: any[]) => void) => {
    const db = getFirebaseFirestore();
    const q = query(collection(db, COLLECTIONS.PREDICTIONS), where("uid", "==", uid), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }
};

export const chatService = {
  sendMessage: (matchId: string, uid: string, userName: string, text: string) =>
    addDocument(COLLECTIONS.CHATROOMS, { matchId, uid, userName, text, timestamp: serverTimestamp() }),
  
  listenToMessages: (matchId: string, callback: (msgs: any[]) => void) => {
    const db = getFirebaseFirestore();
    const q = query(
      collection(db, COLLECTIONS.CHATROOMS), 
      where("matchId", "==", matchId), 
      orderBy("timestamp", "asc"),
      limit(50)
    );
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }
};
