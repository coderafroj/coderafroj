"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hammer, Construction, ArrowLeft, Zap, Globe, Activity, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminFeatureSoon() {
  const pathname = usePathname();
  
  const getInfo = () => {
    if (pathname.includes("control")) return { name: "Website Control", icon: Globe, color: "text-blue-500", bg: "bg-blue-500/10" };
    if (pathname.includes("stats")) return { name: "System Stats", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10" };
    if (pathname.includes("settings")) return { name: "Global Settings", icon: Settings, color: "text-emerald-500", bg: "bg-emerald-500/10" };
    return { name: "Advanced Feature", icon: Hammer, color: "text-zinc-500", bg: "bg-zinc-500/10" };
  };

  const info = getInfo();

  return (
    <div className="h-[70vh] flex items-center justify-center p-8 text-center">
       <div className="max-w-xl space-y-10 group">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-32 h-32 rounded-[3.5rem] ${info.bg} border-2 border-white/5 flex items-center justify-center mx-auto ${info.color} shadow-2xl relative overflow-hidden group-hover:border-white/10 transition-all`}
          >
             <info.icon size={48} className="relative z-10" />
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <div className="space-y-4">
             <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                <Construction size={14} /> Development in Progress
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white italic">
                {info.name} <span className="text-emerald-500">Protocol</span>
             </h1>
             <p className="text-zinc-500 font-medium italic leading-relaxed">
                This module is currently being optimized for the Coderafroj high-performance ecosystem. Full integration will be available in the next deployment cycle.
             </p>
          </div>

          <div className="flex items-center justify-center gap-6">
             <Link 
                href="/admin"
                className="px-8 py-4 bg-white text-black font-black rounded-2xl flex items-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
             >
                <ArrowLeft size={18} /> Dash Overview
             </Link>
             <button className="px-8 py-4 bg-zinc-900 border border-white/10 text-zinc-400 font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all">
                Check Status <Zap size={18} />
             </button>
          </div>
       </div>
    </div>
  );
}
