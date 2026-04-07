"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, ShoppingBag, Database, 
  TrendingUp, ShieldCheck, Mail,
  Calendar, ArrowUpRight, BarChart3,
  Rocket, Sparkles, Layout,
  Activity, Globe, Search,
  Bell, ChevronDown, Plus,
  MoreVertical
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!isAdmin) return;
      try {
        const [ordersSnap, usersSnap] = await Promise.all([
           getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(5))),
           getDocs(collection(db, "users"))
        ]);
        setOrders(ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isAdmin]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center p-4">
       <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
    </div>
  );

  const metrics = [
    { label: "Total Users", value: users.length, icon: Users, trend: "+12%", color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Orders", value: orders.length, icon: ShoppingBag, trend: "Stable", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "System Health", value: "99.9%", icon: Activity, trend: "Max", color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Global Traffic", value: "48.2k", icon: Globe, trend: "+5.4%", color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="min-h-screen bg-transparent pb-32">
       {/* Modern Top Header */}
       <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 h-16 flex items-center px-8 mb-8">
          <div className="flex-1 max-w-md relative group hidden md:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
             <input 
                type="text" 
                placeholder="Search analytics, users or docs..."
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs font-medium placeholder:text-zinc-700 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
             />
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
             <button className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-500 hover:text-white transition-colors">
                <Bell size={18} />
             </button>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3 pl-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <div className="text-right hidden sm:block">
                   <p className="text-[10px] font-bold text-white leading-none mb-1">Kodarafroj Hub</p>
                   <p className="text-[9px] text-zinc-500 font-medium leading-none uppercase tracking-widest leading-none">Primary Admin</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold border border-emerald-500/20">A</div>
             </div>
          </div>
       </header>

       <div className="max-w-[1600px] mx-auto px-8 space-y-10">
          {/* Hero / Greeting Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold">
                   <Calendar size={14} className="text-zinc-700" />
                   {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Dashboard <span className="text-zinc-600 font-medium tracking-normal">Overview</span></h1>
                <p className="text-sm text-zinc-500 font-medium">Welcome back, Admin. System is performing at 100% efficiency.</p>
             </div>
             <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white text-black font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
                   <Plus size={16} /> New Project
                </button>
                <button className="px-5 py-2.5 bg-white/[0.03] border border-white/5 text-zinc-300 font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-white/10 transition-all active:scale-95">
                   <BarChart3 size={16} /> Reports
                </button>
             </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {metrics.map((m, i) => (
               <motion.div 
                 key={m.label}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-6 rounded-3xl border border-white/5 bg-zinc-950/50 hover:bg-zinc-900/50 transition-all relative group overflow-hidden"
               >
                  <div className="flex items-center justify-between mb-6">
                     <div className={cn("p-3 rounded-2xl border border-white/5", m.bg, m.color)}>
                        <m.icon size={20} />
                     </div>
                     <span className={cn("text-[10px] font-bold px-2 py-1 rounded-lg bg-white/5", m.color === "text-emerald-500" ? "text-emerald-500" : "text-zinc-500")}>
                        {m.trend}
                     </span>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest">{m.label}</p>
                     <p className="text-3xl font-bold tracking-tight text-white">{m.value}</p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/10 transition-all rounded-full" />
               </motion.div>
             ))}
          </div>

          {/* Main Content Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             {/* Active Orders / Software Tasks Section */}
             <div className="lg:col-span-8">
                <div className="rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-sm p-8 shadow-2xl">
                   <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                            <ShoppingBag size={20} />
                         </div>
                         <h3 className="text-lg font-bold tracking-tight">Software Deliverables</h3>
                      </div>
                      <Link href="/admin/orders" className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">View Full Queue <ArrowUpRight size={14}/></Link>
                   </div>

                   <div className="space-y-1">
                      {orders.length === 0 ? (
                         <div className="py-20 text-center space-y-4">
                            <div className="w-16 h-16 rounded-3xl bg-zinc-950 border border-white/5 mx-auto flex items-center justify-center text-zinc-800">
                               <Database size={32} />
                            </div>
                            <p className="text-sm font-medium text-zinc-600 italic">Production queue idle.</p>
                         </div>
                      ) : (
                         orders.map((order, idx) => (
                           <motion.div 
                             key={order.id} 
                             initial={{ opacity: 0, x: -10 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: 0.4 + (idx * 0.05) }}
                             className="p-5 rounded-2xl hover:bg-white/[0.02] flex items-center justify-between group transition-all"
                           >
                              <div className="flex items-center gap-5">
                                 <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-700 font-bold group-hover:text-emerald-500 transition-colors">
                                    {order.name?.[0].toUpperCase() || "T"}
                                 </div>
                                 <div className="min-w-0">
                                    <p className="font-bold text-zinc-200 group-hover:text-white transition-colors truncate max-w-[200px]">{order.name}</p>
                                    <p className="text-[10px] text-zinc-600 font-semibold tracking-wider">{order.projectType}</p>
                                 </div>
                              </div>
                              
                              <div className="hidden sm:flex flex-col items-center">
                                 <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Budget</span>
                                 <span className="text-xs font-bold text-zinc-300">{order.budget || "$0"}</span>
                              </div>

                              <div className="flex items-center gap-8">
                                 <div className="flex flex-col items-end">
                                    <span className={cn(
                                       "px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-widest",
                                       order.status === "pending" ? "bg-amber-500/10 text-amber-500" : 
                                       order.status === "completed" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                                    )}>
                                       {order.status}
                                    </span>
                                    <span className="text-[8px] text-zinc-700 font-bold mt-1 uppercase">2h ago</span>
                                 </div>
                                 <button className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 text-zinc-600 hover:text-white hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100">
                                    <MoreVertical size={16} />
                                 </button>
                              </div>
                           </motion.div>
                         ))
                      )}
                   </div>
                </div>
             </div>

             {/* Sidebar Analytics */}
             <div className="lg:col-span-4 space-y-8">
                <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/50 p-8 shadow-2xl">
                   <div className="flex items-center gap-4 mb-10">
                      <TrendingUp size={20} className="text-emerald-500" />
                      <h3 className="text-lg font-bold tracking-tight">System Integrity</h3>
                   </div>
                   <div className="space-y-8">
                      <div className="space-y-3">
                         <div className="flex justify-between items-end">
                            <div>
                               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 block mb-1">API Reliability</span>
                               <span className="text-sm font-bold text-white">94.12%</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1"><TrendingUp size={12}/> +2%</span>
                         </div>
                         <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "94%" }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                            />
                         </div>
                      </div>

                      <div className="space-y-3">
                         <div className="flex justify-between items-end">
                            <div>
                               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 block mb-1">Storage Util</span>
                               <span className="text-sm font-bold text-white">12.4 GB / 50 GB</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1"><TrendingUp size={12}/> Normal</span>
                         </div>
                         <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "24.8%" }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                            />
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-12 p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 text-center space-y-3">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Upgrade Insights</p>
                      <p className="text-xs font-medium text-zinc-400">Unlock advanced data visualization and user behavior analytics.</p>
                      <button className="w-full py-2 bg-emerald-500 text-black font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-colors">Go Premium</button>
                   </div>
                </div>

                <div className="rounded-[2.5rem] border border-white/5 bg-zinc-950/50 p-8 shadow-2xl">
                   <h3 className="text-lg font-bold tracking-tight mb-8">Quick Actions</h3>
                   <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Rocket, label: "Broadcast", color: "text-blue-500", bg: "bg-blue-500/10" },
                        { icon: BarChart3, label: "Reports", color: "text-purple-500", bg: "bg-purple-500/10" },
                        { icon: Mail, label: "Comms", color: "text-orange-500", bg: "bg-orange-500/10" },
                        { icon: Layout, label: "Editor", color: "text-emerald-500", bg: "bg-emerald-500/10" }
                      ].map((item) => (
                        <button key={item.label} className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all">
                           <div className={cn("p-2 rounded-xl transition-all group-hover:scale-110", item.bg, item.color)}>
                              <item.icon size={20} />
                           </div>
                           <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">{item.label}</span>
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
