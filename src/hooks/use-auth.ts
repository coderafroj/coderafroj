"use client";

import { useEffect, useState } from "react";
import { databases, APPWRITE_CONFIG } from "@/lib/appwrite";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  role: "user" | "pro" | "admin";
}

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string, email: string) => {
    try {
      const response = await databases.getDocument(
        APPWRITE_CONFIG.databaseId,
        "users",
        uid
      );
      
      setProfile({
        uid: uid,
        email: email,
        role: (response.role as "user" | "pro" | "admin") || 
              (email === "kodarafroj@gmail.com" ? "admin" : "user")
      });
    } catch (error) {
      setProfile({
        uid: uid,
        email: email,
        role: email === "kodarafroj@gmail.com" ? "admin" : "user"
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchProfile(firebaseUser.uid, firebaseUser.email || "");
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { 
    user, 
    profile, 
    loading, 
    isAdmin: profile?.email === "kodarafroj@gmail.com" || profile?.role === "admin", 
    isPro: profile?.role === "pro" || (profile?.email === "kodarafroj@gmail.com" || profile?.role === "admin") 
  };
}
