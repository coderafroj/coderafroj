"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, User, LogOut, Search as SearchIcon, ShieldAlert } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin && mounted) {
      router.push("/login");
    }
  }, [loading, isAdmin, router, mounted]);

  if (loading || !mounted) {
    return (
      <div className="h-screen w-full bg-zinc-950 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center"
        >
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
       <div className="h-screen w-full bg-zinc-950 flex items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-6">
             <div className="w-20 h-20 rounded-[2.5rem] bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center mx-auto text-red-500 shadow-2xl shadow-red-500/10">
                <ShieldAlert size={40} />
             </div>
             <h1 className="text-3xl font-black tracking-tight text-white mb-2">Access Denied</h1>
             <p className="text-zinc-500 font-medium leading-relaxed italic">You do not have administrative privileges to access this area. If you believe this is an error, please contact system support.</p>
             <button 
                onClick={() => router.push("/")}
                className="px-8 py-3 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all active:scale-95"
             >
                Return to Safety
             </button>
          </div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      <Sidebar />
      
      <main className="md:ml-[80px] lg:ml-[280px] min-h-screen transition-all duration-300">
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-20 bg-zinc-950/40 backdrop-blur-3xl border-b border-white/5 px-8 flex items-center justify-between">
           <div className="flex-1 max-w-sm relative group hidden sm:block">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search commands, docs, or logs..."
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-2.5 pl-12 pr-4 text-xs font-semibold placeholder:text-zinc-700 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
              />
           </div>

           <div className="flex items-center gap-6 ml-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                 <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Live Sync</span>
              </div>

              <div className="h-6 w-px bg-white/10 hidden sm:block" />

              <button className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-zinc-500 hover:text-white transition-all hover:bg-white/5 relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950" />
              </button>

              <div className="flex items-center gap-4 pl-2 cursor-pointer group">
                 <div className="text-right hidden md:block">
                    <p className="text-[11px] font-black text-white leading-none mb-1 group-hover:text-emerald-500 transition-colors">{profile?.email?.split('@')[0] || "Admin"}</p>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] leading-none">Security Clearance</p>
                 </div>
                 <div className="w-10 h-10 rounded-2xl bg-zinc-900 border-2 border-white/10 flex items-center justify-center text-emerald-500 font-black group-hover:border-emerald-500/50 transition-all transition-all overflow-hidden bg-[url('https://api.dicebear.com/7.x/pixel-art/svg?seed=admin')] bg-cover" />
              </div>
           </div>
        </header>

        {/* Content Container */}
        <div className="p-8 pb-32">
           <AnimatePresence mode="wait">
             <motion.div
               key={pathname}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
             >
                {children}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>

      {/* Global Toast / Overlay can go here */}
    </div>
  );
}
