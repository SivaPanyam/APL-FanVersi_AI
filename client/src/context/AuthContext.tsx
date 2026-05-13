import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode,
  useCallback
} from "react";
import { 
  User, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

type AuthStatus = "loading" | "signedIn" | "signedOut" | "unconfigured";

interface AuthContextType {
  user: User | null;
  status: AuthStatus;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(() => 
    isFirebaseConfigured() ? "loading" : "unconfigured"
  );

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setStatus("unconfigured");
      return;
    }

    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setStatus(user ? "signedIn" : "signedOut");
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured()) return;
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  }, []);

  const signOutUser = useCallback(async () => {
    if (!isFirebaseConfigured()) return;
    try {
      await signOut(getFirebaseAuth());
    } catch (error) {
      console.error("Sign-Out Error:", error);
      throw error;
    }
  }, []);

  const value = {
    user,
    status,
    signInWithGoogle,
    signOutUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
