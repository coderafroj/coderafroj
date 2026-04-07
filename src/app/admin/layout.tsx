"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import AdminNav from "@/components/admin/AdminNav";
import { ShieldCheck, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading: authLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (authLoading) return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8 text-center text-white">
       <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-zinc-900 border-t-emerald-500 rounded-full animate-spin shadow-[0_0_20px_rgba(16,185,129,0.2)]" />
       </div>
       <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest text-emerald-500">Initializing Session</h2>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em]">Authenticating Administrative Link...</p>
       </div>
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden text-white">
       <div className="absolute inset-0 bg-emerald-500/[0.02] filter blur-[100px] pointer-events-none" />
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="max-w-md w-full p-10 md:p-12 text-center rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl shadow-2xl"
       >
          <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-10">
             <ShieldCheck size={40} className="text-red-500" />
          </div>
          <div className="space-y-3 mb-10">
             <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase italic leading-none">Access <br /> <span className="text-red-500 not-italic">Restricted.</span></h2>
             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Security Protocol Active</p>
          </div>
          <p className="text-zinc-600 mb-12 text-[13px] leading-relaxed max-w-[280px] mx-auto font-medium">
             Unauthorized terminal access detected. Your account does not have administrative clearance for this sector.
          </p>
          <div className="flex flex-col gap-3">
             <Link href="/login" className="py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 group">
                Sign In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
             <Link href="/" className="py-4 bg-transparent border border-white/5 text-zinc-600 font-bold rounded-2xl hover:bg-white/5 transition-all text-xs uppercase tracking-widest">Exit to Hub</Link>
          </div>
       </motion.div>
    </div>
  );

  return (
    <div className="flex h-screen bg-zinc-950 text-white selection:bg-emerald-500/30 selection:text-emerald-500 overflow-hidden relative">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between shadow-2xl">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center border border-white/10">
               <ShieldCheck size={16} className="text-black" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Staff Only</span>
         </div>
         <button 
           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
           className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors border border-white/5"
         >
           {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
      </div>

      <AdminNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Sidebar Backdrop (Mobile-only) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <main className="flex-1 h-full relative overflow-y-auto w-full pt-16 lg:pt-0 scroll-smooth">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] -z-10 rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.02] blur-[100px] -z-10 rounded-full" />
          
          <div className="relative z-10 w-full min-h-full">
             {children}
          </div>
      </main>
    </div>
  );
}
