import firebase from "firebase/app";
import { createContext, FC, useContext, useEffect, useState } from "react";

export type User = firebase.User | null;
type ContextState = { user: User };

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const value = { user };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }

  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };
