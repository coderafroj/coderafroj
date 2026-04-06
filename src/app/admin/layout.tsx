"use client";

import { useAuth } from "@/hooks/use-auth";
import AdminNav from "@/components/admin/AdminNav";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading: authLoading } = useAuth();

  if (authLoading) return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-8 text-center">
       <div className="relative mb-12">
          <div className="w-32 h-32 rounded-full border border-white/5 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
             <div className="w-16 h-16 rounded-full border-t-2 border-emerald-500 animate-spin" />
          </div>
          <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-ping opacity-20" />
       </div>
       <div className="space-y-4">
          <h2 className="text-xl font-black italic tracking-[0.3em] uppercase text-white/90">SECURE_GATEWAY_INITIALIZING</h2>
          <div className="flex gap-1 justify-center">
             {[1,2,3,4,5].map(i => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  className="w-1 h-3 bg-emerald-500 rounded-full"
                />
             ))}
          </div>
       </div>
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background noise/grids */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:100px_100px] -z-10" />
       
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         className="max-w-xl w-full glass-card p-16 text-center rounded-[4rem] border-red-500/20 bg-red-500/[0.01] shadow-[0_0_100px_rgba(239,68,68,0.05)]"
       >
          <div className="w-28 h-28 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(239,68,68,0.2)] group hover:scale-105 transition-transform duration-500">
             <ShieldCheck size={56} className="text-red-500 animate-pulse" />
          </div>
          <div className="space-y-4 mb-12">
             <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">PROTOCOL_ERROR</h2>
             <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500/50">ACCESS_DENIED // UNAUTHORIZED_ENTRY</p>
          </div>
          <p className="text-neutral-500 mb-16 italic leading-[1.8] text-lg max-w-sm mx-auto">
             Critical security breach detected. Your identity does not match the executive command protocols. 
             This incident has been logged in the secure vault.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
             <Link href="/login" className="flex-1 py-6 bg-white text-black font-black rounded-3xl hover:bg-emerald-400 hover:neon-glow transition-all uppercase tracking-[0.2em] text-[10px]">RE_AUTHENTICATE</Link>
             <Link href="/" className="flex-1 py-6 glass border border-white/10 rounded-3xl font-black text-neutral-500 hover:text-white transition-all uppercase tracking-[0.2em] text-[10px]">BACK_TO_TERMINAL</Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-red-500/10 flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-red-500/30">
             <span>VAULT_INIT: FAILED</span>
             <span className="w-1 h-1 rounded-full bg-red-500/30" />
             <span>LOG_ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>
       </motion.div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#030303] text-white selection:bg-emerald-500/30 selection:text-emerald-500">
      <AdminNav />
      <main className="flex-1 min-h-screen relative overflow-hidden bg-white/[0.01]">
         {/* Background Gradients */}
         <div className="absolute top-0 right-0 w-[1000px] h-[800px] bg-emerald-500/[0.03] rounded-full blur-[200px] -z-10" />
         <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-primary/[0.02] rounded-full blur-[150px] -z-10" />
         
         <div className="relative z-10 w-full h-full overflow-y-auto">
            {children}
         </div>
      </main>
    </div>
  );
}
