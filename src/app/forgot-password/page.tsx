"use client";

import Link from "next/link";
import { useState } from "react";
import { account } from "@/lib/appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Appwrite recovery flow
      const redirectUrl = `${window.location.origin}/reset-password`;
      await account.createRecovery(email, redirectUrl);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please verify the address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-12 rounded-[3.5rem] border-white/5 bg-white/[0.01] shadow-2xl relative"
      >
        <div className="text-center space-y-6 mb-12">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center mx-auto">
             <Mail size={40} className="text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">RECOVER_KEY</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 block">Identity Verification Protocol</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
             <motion.div 
               key="success"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="py-12 flex flex-col items-center gap-6"
             >
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center neon-glow">
                   <CheckCircle2 size={32} className="text-black" />
                </div>
                <div className="text-center">
                   <p className="text-sm font-black italic text-emerald-500 uppercase tracking-widest">Signal Transmitted</p>
                   <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mt-2 px-4">
                     Verification link dispatched to encryption buffer via Appwrite. Check your email.
                   </p>
                </div>
                <Link href="/login" className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-white transition-colors italic">
                  <ArrowLeft size={14} /> Back_to_access_gate
                </Link>
             </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleResetRequest} 
              className="space-y-8"
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 pl-4 mb-1">
                   <Terminal size={12} /> TARGET_IDENTIFIER
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@provider.com"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all placeholder:text-neutral-800 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                >
                   <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-red-500">{error}</span>
                </motion.div>
              )}

              <div className="pt-4 space-y-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full justify-center overflow-hidden rounded-2xl bg-white px-12 py-5 text-xs font-black uppercase tracking-widest text-black shadow-2xl transition-all hover:bg-emerald-400 hover:neon-glow disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {loading ? "TRANSMITTING..." : "DISPATCH_LINK"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <p className="text-center">
                  <Link href="/login" className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-emerald-500 transition-colors italic">
                    <ArrowLeft size={14} /> Abort_and_return
                  </Link>
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
           <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em]"><ShieldCheck size={12} /> SECURE_TX</div>
        </div>
      </motion.div>
    </div>
  );
}
