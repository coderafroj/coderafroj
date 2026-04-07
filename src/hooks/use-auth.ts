"use client";

import { useEffect, useState } from "react";
import { databases, APPWRITE_CONFIG, account } from "@/lib/appwrite";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  role: "user" | "pro" | "admin";
  name?: string;
}

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string, email: string) => {
    try {
      // Try to get profile from Appwrite 'users' collection
      const response = await databases.getDocument(
        APPWRITE_CONFIG.databaseId,
        "users",
        uid
      );
      
      setProfile({
        uid: uid,
        email: email,
        role: (response.role as "user" | "pro" | "admin") || 
              (email === "kodarafroj@gmail.com" ? "admin" : "user"),
        name: response.name || email.split('@')[0]
      });
    } catch (error) {
      // Fallback if document doesn't exist yet
      console.warn("Profile not found in Appwrite, using fallback.");
      setProfile({
        uid: uid,
        email: email,
        role: email === "kodarafroj@gmail.com" ? "admin" : "user"
      });
    }
  };

  useEffect(() => {
    // Current auth uses Firebase, keeping it for now but profiles in Appwrite
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

  const isAdmin = profile?.email === "kodarafroj@gmail.com" || profile?.email === "koderafroj@gmail.com" || profile?.role === "admin";
 promotional_code: false 

  return { 
    user, 
    profile, 
    loading, 
    isAdmin,
    isPro: profile?.role === "pro" || isAdmin
  };
}
