"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Authentication failed. Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grids... (Same as before) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -z-10" />

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
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.1)] group">
             <ShieldCheck size={40} className="text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">APPWRITE_AUTH</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 block">System Authentication Required</p>
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
                   <p className="text-sm font-black italic text-emerald-500 uppercase tracking-widest">Handshake Successful</p>
                   <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mt-1 italic">Initializing Command Center...</p>
                </div>
             </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleLogin} 
              className="space-y-6"
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 pl-4 mb-1">
                   <Terminal size={12} /> PROTOCOL_IDENTIFIER
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

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 pl-4 mb-1">
                   <Lock size={12} /> ENCRYPTION_KEY
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all placeholder:text-neutral-800 pr-14 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    {loading ? "PROCESSING..." : "AUTHENTICATE"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <p className="text-center">
                  <Link href="/signup" className="text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-emerald-500 transition-colors italic">
                    Request_access_protocol
                  </Link>
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
           <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em]"><Lock size={12} /> SSL-256</div>
           <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em]"><ShieldCheck size={12} /> SECURE</div>
        </div>
      </motion.div>
    </div>
  );
}
