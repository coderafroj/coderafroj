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
    const checkAuth = async () => {
      try {
        const appwriteUser = await account.get();
        if (appwriteUser) {
          // Map Appwrite user to Firebase-like structure if needed, or just use as is
          setUser({
            uid: appwriteUser.$id,
            email: appwriteUser.email,
            displayName: appwriteUser.name,
          } as any);
          await fetchProfile(appwriteUser.$id, appwriteUser.email);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
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
