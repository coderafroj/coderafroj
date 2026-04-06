"use client";

import { useEffect, useState } from "react";
import { account, databases, APPWRITE_CONFIG } from "@/lib/appwrite";
import { Models } from "appwrite";

export interface UserProfile {
  uid: string;
  email: string | null;
  role: "user" | "pro" | "admin";
}

export function useAuth() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string, email: string) => {
    try {
      const response = await databases.getDocument(
        APPWRITE_CONFIG.databaseId,
        "users", // Assuming a 'users' collection exists
        uid
      );
      
      setProfile({
        uid: uid,
        email: email,
        role: (response.role as "user" | "pro" | "admin") || "user"
      });
    } catch (error) {
      // If profile doc doesn't exist, fallback to default user role
      setProfile({
        uid: uid,
        email: email,
        role: "user"
      });
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionUser = await account.get();
        setUser(sessionUser);
        await fetchProfile(sessionUser.$id, sessionUser.email);
      } catch (error) {
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return { 
    user, 
    profile, 
    loading, 
    isAdmin: profile?.role === "admin", 
    isPro: profile?.role === "pro" || profile?.role === "admin" 
  };
}
