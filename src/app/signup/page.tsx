"use client";

import Link from "next/link";
import { useState } from "react";
import { account, databases, APPWRITE_CONFIG, ID } from "@/lib/appwrite";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Terminal, 
  UserPlus, 
  ArrowRight,
  AlertCircle
} from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");
    
    try {
      // Create account in Appwrite
      const user = await account.create(ID.unique(), email, password);
      const userId = user.$id;
      
      // Auto login after signup to create session
      await account.createEmailPasswordSession(email, password);
      
      // Create user document in Appwrite Database for role management
      try {
        await databases.createDocument(
          APPWRITE_CONFIG.databaseId,
          "users",
          userId,
          {
            email: email,
            role: email === "kodarafroj@gmail.com" ? "admin" : "user",
            createdAt: new Date().toISOString(),
          }
        );
      } catch (dbErr) {
        console.error("Failed to create user profile document:", dbErr);
      }

      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-12 rounded-[3.5rem] border-white/5 bg-white/[0.01] shadow-2xl relative"
      >
        <div className="absolute top-0 right-0 p-8">
           <div className="w-10 h-10 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
              <Cpu size={16} className="text-neutral-700" />
           </div>
        </div>

        <div className="text-center space-y-6 mb-12">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/10 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(168,85,247,0.1)]">
             <UserPlus size={40} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">NEW_IDENTITY</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 block">Initialize System Credentials</p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 pl-4 mb-1">
                 <Terminal size={12} /> EMAIL_ID
              </label>
              <input
                type="email"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-primary/50 transition-all text-white"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 pl-4 mb-1">
                 <Lock size={12} /> SECURE_PASSWORD
              </label>
              <input
                type="password"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-primary/50 transition-all text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 pl-4 mb-1">
                 <ShieldCheck size={12} /> CONFIRM_KEY
              </label>
              <input
                type="password"
                required
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-primary/50 transition-all text-white"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
               <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
               <span className="text-[9px] font-black uppercase tracking-widest text-red-500">{error}</span>
            </div>
          )}

          <div className="pt-4 space-y-6">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center overflow-hidden rounded-2xl bg-white px-12 py-5 text-xs font-black uppercase tracking-widest text-black shadow-2xl transition-all hover:bg-primary hover:text-white disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-3">
                {loading ? "INITIALIZING..." : "CREATE_IDENTITY"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <p className="text-center">
              <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-primary transition-colors italic">
                Existing_credential_login
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
