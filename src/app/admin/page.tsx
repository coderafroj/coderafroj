"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  ShoppingBag, 
  Activity, 
  Globe, 
  TrendingUp, 
  ArrowUpRight,
  Database,
  ShieldCheck,
  Zap,
  Clock,
  ExternalLink,
  ChevronRight,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Total Users", value: "1,284", icon: Users, trend: "+12.5%", color: "emerald", desc: "Across all sectors" },
    { label: "Active Nodes", value: "42", icon: Activity, trend: "Stable", color: "blue", desc: "System wide status" },
    { label: "Market Growth", value: "$12.4k", icon: TrendingUp, trend: "+8.2%", color: "purple", desc: "Net revenue growth" },
    { label: "Global Reach", value: "18", icon: Globe, trend: "+3", color: "orange", desc: "Active regions" },
  ];

  const recentActivity = [
    { id: 1, type: "User", action: "Signed up", details: "shubham@example.com", time: "2m ago", status: "success" },
    { id: 2, type: "System", action: "Backup completed", details: "Database Cluster A", time: "15m ago", status: "success" },
    { id: 3, type: "Access", action: "New Login", details: "Admin from 192.168.1.1", time: "1h ago", status: "warning" },
    { id: 4, type: "Update", action: "Resource Push", details: "AuraResume v2.1.0", time: "3h ago", status: "success" },
  ];

  if (loading) {
    return (
      <div className="space-y-10 animate-pulse">
        <div className="h-20 w-1/3 bg-white/5 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[1,2,3,4].map(i => <div key={i} className="h-40 bg-white/5 rounded-[2.5rem]" />)}
        </div>
        <div className="h-96 bg-white/5 rounded-[3rem]" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                System Status: Operational
             </div>
             <div className="text-[10px] font-bold text-zinc-600 flex items-center gap-2 uppercase tracking-widest">
                <Clock size={12} /> {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
             </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Terminal <span className="text-emerald-500 italic">Overview</span>
          </h1>
          <p className="text-zinc-500 font-medium max-w-xl leading-relaxed italic">
            Monitor and control every aspect of the Coderafroj ecosystem. All systems are currently performing within optimal parameters.
          </p>
        </div>

        <div className="flex items-center gap-4">
           <button className="h-14 px-6 bg-white text-black font-black rounded-2xl flex items-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5 group">
              Command Center <Zap size={18} className="group-hover:fill-current" />
           </button>
           <button className="h-14 w-14 bg-white/[0.03] border border-white/5 text-zinc-400 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-95">
              <ExternalLink size={20} />
           </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
             key={stat.label}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="relative group p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-emerald-500/20 transition-all overflow-hidden"
          >
             <div className="flex items-center justify-between mb-8">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110",
                  stat.color === "emerald" && "bg-emerald-500/10 text-emerald-500",
                  stat.color === "blue" && "bg-blue-500/10 text-blue-500",
                  stat.color === "purple" && "bg-purple-500/10 text-purple-500",
                  stat.color === "orange" && "bg-orange-500/10 text-orange-500",
                )}>
                   <stat.icon size={22} />
                </div>
                <div className="flex flex-col items-end">
                   <span className={cn(
                     "text-[10px] font-black uppercase px-2 py-1 rounded-lg",
                     stat.trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-zinc-500"
                   )}>
                      {stat.trend}
                   </span>
                </div>
             </div>
             
             <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                   <h3 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h3>
                </div>
                <p className="text-[10px] text-zinc-700 font-medium italic mt-2">{stat.desc}</p>
             </div>

             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />
          </motion.div>
        ))}
      </section>

      {/* Main Grid: Activity & Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-8 p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl">
          <div className="bg-zinc-950 p-10 rounded-[2.9rem] h-full">
             <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 shadow-inner">
                      <Clock size={20} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black tracking-tight text-white">Resource Updates</h3>
                      <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest leading-none mt-1">Live Feed</p>
                   </div>
                </div>
                <button className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-all flex items-center gap-2">
                   Scan All Records <ChevronRight size={14} />
                </button>
             </div>

             <div className="space-y-6">
                {recentActivity.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    className="group flex items-center justify-between p-6 rounded-3xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all"
                  >
                     <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all group-hover:rotate-12",
                          item.status === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                        )}>
                           {item.type[0]}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-white">{item.action}</span>
                              <span className="w-1 h-1 rounded-full bg-zinc-800" />
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.time}</span>
                           </div>
                           <p className="text-xs font-medium text-zinc-600 italic mt-1">{item.details}</p>
                        </div>
                     </div>
                     <button className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-700 hover:text-white hover:border-white/20 transition-all opacity-0 group-hover:opacity-100">
                        <ArrowUpRight size={16} />
                     </button>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar Mini Tools */}
        <div className="lg:col-span-4 space-y-10">
           {/* System Health */}
           <div className="p-8 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 space-y-8 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                 <ShieldCheck size={20} className="text-blue-500" />
                 <h4 className="text-lg font-black tracking-tight">Security Core</h4>
              </div>
              <div className="space-y-6">
                 {[
                   { label: "Firewall", value: 100, color: "emerald" },
                   { label: "Latency", value: 92, color: "blue" },
                   { label: "Storage", value: 45, color: "purple" }
                 ].map(bar => (
                   <div key={bar.label} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                         <span className="text-zinc-600">{bar.label}</span>
                         <span className="text-white">{bar.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${bar.value}%` }}
                           className={cn(
                             "h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                             bar.color === "emerald" && "bg-emerald-500",
                             bar.color === "blue" && "bg-blue-500",
                             bar.color === "purple" && "bg-purple-500"
                           )}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Quick Launch */}
           <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 space-y-6">
              <div className="flex items-center gap-3">
                 <Zap size={18} className="text-emerald-500" />
                 <h4 className="text-sm font-black uppercase tracking-widest text-emerald-500/80">Hyper Focus</h4>
              </div>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed italic">
                 New documentation batch is ready for review. Access the editor to finalize publication.
              </p>
              <Link href="/admin/notes" className="flex items-center justify-between w-full p-4 rounded-2xl bg-white text-black font-black text-xs hover:bg-zinc-200 transition-all active:scale-95">
                 Open Notes Manager <ArrowUpRight size={16} />
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
