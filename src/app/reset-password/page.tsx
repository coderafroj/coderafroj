"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { account } from "@/lib/appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Terminal, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  RefreshCw,
  ArrowLeft
} from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const uId = searchParams.get("userId");
    const sec = searchParams.get("secret");
    
    if (!uId || !sec) {
      setError("CRITICAL_ERR: Missing recovery tokens. Please use the link from your email.");
      setVerifying(false);
      return;
    }

    setUserId(uId);
    setSecret(sec);
    setVerifying(false);
  }, [searchParams]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError("PARITY_MISMATCH: Passwords do not match.");
    }
    if (newPassword.length < 8) {
      return setError("STRENGTH_INSUFFICIENT: Key must be at least 8 characters.");
    }

    setLoading(true);
    setError("");

    try {
      if (!userId || !secret) throw new Error("Missing recovery tokens.");
      
      await account.updateRecovery(userId, secret, newPassword);
      
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update encryption key.");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="flex flex-col items-center gap-6 py-12">
        <RefreshCw size={32} className="text-emerald-500 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Verifying_Recovery_Tokens...</p>
      </div>
    );
  }

  return (
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
            <p className="text-sm font-black italic text-emerald-500 uppercase tracking-widest">Protocol Re-initialized</p>
            <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mt-2 italic">Credentials updated via Appwrite. Redirecting...</p>
          </div>
        </motion.div>
      ) : error ? (
        <motion.div 
          key="error"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 flex flex-col items-center gap-6"
        >
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col items-center gap-4 text-center">
            <AlertCircle size={32} className="text-red-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-red-500 max-w-[200px] leading-relaxed">
              {error}
            </span>
          </div>
          <Link href="/forgot-password" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-white transition-colors italic">
            <ArrowLeft size={14} /> Request_new_link
          </Link>
        </motion.div>
      ) : (
        <motion.form 
          key="form"
          onSubmit={handleReset} 
          className="space-y-6"
          layout
        >
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 pl-4 mb-1">
               <Lock size={12} /> NEW_ENCRYPTION_KEY
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all text-white placeholder:text-neutral-800 pr-14"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 pl-4 mb-1">
               <ShieldCheck size={12} /> CONFIRM_PARITY
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all text-white placeholder:text-neutral-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="pt-4 space-y-6">
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center overflow-hidden rounded-2xl bg-white px-12 py-5 text-xs font-black uppercase tracking-widest text-black shadow-2xl transition-all hover:bg-emerald-400 hover:neon-glow disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-3">
                {loading ? "PATCHING..." : "COMMIT_CHANGES"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-12 rounded-[3.5rem] border-white/5 bg-white/[0.01] shadow-2xl relative"
      >
        <div className="text-center space-y-6 mb-12">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.1)]">
             <Terminal size={40} className="text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">PROTOCOL_PATCH</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 block">Updating Identity Credentials</p>
          </div>
        </div>

        <Suspense fallback={
          <div className="flex flex-col items-center gap-6 py-12">
            <RefreshCw size={32} className="text-emerald-500 animate-spin" />
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
           <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em]"><ShieldCheck size={12} /> SECURE_RECOVERY</div>
        </div>
      </motion.div>
    </div>
  );
}
