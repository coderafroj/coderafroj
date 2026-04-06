"use client";

import { useState } from "react";
import { databases, APPWRITE_CONFIG } from "@/lib/appwrite";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminSetupPage() {
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const makeAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid) return setError("Please enter your User UID from Appwrite Console or signup.");
    setLoading(true);
    setError("");
    
    try {
      await databases.updateDocument(
        APPWRITE_CONFIG.databaseId,
        "users", // Ensure this collection exists
        uid,
        {
          role: "admin"
        }
      );
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to update role. Make sure the UID is correct and the 'users' collection exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 rounded-[3rem] border-emerald-500/20 bg-emerald-500/[0.02] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col items-center text-center space-y-8">
           <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <ShieldAlert size={40} className="text-emerald-500" />
           </div>
           
           <div className="space-y-4">
              <h1 className="text-3xl font-black italic tracking-tighter uppercase">APPWRITE_ELEVATION</h1>
              <p className="text-sm text-neutral-500 font-medium italic leading-relaxed">
                 Enter your Appwrite USER_ID to elevate your credentials to ADMIN. 
                 You can find your UID after signing up in the console.
              </p>
           </div>

           {success ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-8"
              >
                 <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
                    <CheckCircle2 className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Access Granted. Proceed to Login.</span>
                 </div>
                 <Link href="/login" className="flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all w-full neon-glow">
                    PROCEED_TO_LOGIN <ArrowRight size={18} />
                 </Link>
              </motion.div>
           ) : (
              <form onSubmit={makeAdmin} className="w-full space-y-6">
                 <input 
                   value={uid}
                   onChange={(e) => setUid(e.target.value)}
                   placeholder="PASTE_APPWRITE_UID_HERE"
                   className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all text-center text-white"
                 />
                 {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}
                 <button 
                   disabled={loading}
                   className="w-full bg-emerald-500 text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50 neon-glow"
                 >
                    {loading ? "ELEVATING..." : "ELEVATE_TO_ADMIN"}
                 </button>
              </form>
           )}
           
           <p className="text-[8px] font-black uppercase tracking-[0.4em] text-neutral-700">
              WARNING: UNAUTHORIZED ACCESS IS LOGGED
           </p>
        </div>
      </motion.div>
    </div>
  );
}
