"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

interface AuthContextType {
  user: User | null;
  logout: () => void;
  setIsSignUp: (isSignUp: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        console.log('AuthContext: Email verified, logging in:', user.emailVerified);
        setUser(user);
      } else {
        console.log('AuthContext: User signed out');
        if (!isSignUp) {
          setUser(null);
        }
      }
    });
    return () => unsubscribe();
  }, [isSignUp]);

  const logout = async () => {
    await signOut(auth);
    console.log('AuthContext: User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, logout, setIsSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
