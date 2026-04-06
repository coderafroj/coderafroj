"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, ShoppingBag, Database, 
  TrendingUp, ShieldCheck, Mail,
  Calendar, ArrowUpRight, BarChart3,
  Rocket, Sparkles, Layout
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
        const ordersRef = collection(db, "orders");
        const ordersQuery = query(ordersRef, orderBy("createdAt", "desc"), limit(5));
        const ordersSnap = await getDocs(ordersQuery);
        setOrders(ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);
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

  return (
    <div className="relative min-h-screen pb-32 pt-44 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
                 <ShieldCheck size={14} />
                 SECURE_ADMIN_GATEWAY
              </div>
              <h1 className="text-6xl font-black italic mask-text">COMMAND <br /> <span className="neon-text not-italic uppercase">CENTER.</span></h1>
           </div>
           <div className="flex gap-4">
              <div className="p-6 glass rounded-2xl border-white/5 bg-white/[0.02] text-center">
                 <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Total Users</p>
                 <p className="text-3xl font-black tracking-tighter">{users.length}</p>
              </div>
              <div className="p-6 glass rounded-2xl border-white/5 bg-white/[0.02] text-center">
                 <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">New Orders</p>
                 <p className="text-3xl font-black tracking-tighter">{orders.length}</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Orders Section */}
           <div className="lg:col-span-8 space-y-8">
              <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.01] border-white/5 h-full">
                 <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                          <ShoppingBag size={24} className="text-primary" />
                       </div>
                       <h3 className="text-2xl font-black tracking-tight italic">ACTIVE_SOFTWARE_TASKS</h3>
                    </div>
                    <button className="text-xs font-black text-neutral-500 hover:text-white transition-colors uppercase tracking-[0.2em]">View All</button>
                 </div>

                 <div className="space-y-4">
                    {orders.length === 0 ? (
                       <div className="py-12 text-center text-neutral-600 italic font-medium">No tasks in the production queue.</div>
                    ) : (
                       orders.map(order => (
                          <motion.div 
                            key={order.id} 
                            whileHover={{ x: 10 }}
                            className="p-6 rounded-3xl bg-black/40 border border-white/5 flex items-center justify-between group transition-all"
                          >
                             <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                   <Database size={20} className="text-neutral-500" />
                                </div>
                                <div>
                                   <p className="font-black text-white">{order.name}</p>
                                   <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">{order.projectType} • {order.budget}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-6">
                                <span className={cn(
                                   "px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                                   order.status === "pending" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                                )}>
                                   {order.status}
                                </span>
                                <button className="p-3 rounded-xl glass border-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                                   <ArrowUpRight size={18} />
                                </button>
                             </div>
                          </motion.div>
                       ))
                    )}
                 </div>
              </div>
           </div>

           {/* Stats & Sidebar */}
           <div className="lg:col-span-4 space-y-8">
              <div className="glass-card p-10 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border-white/5">
                 <div className="flex items-center gap-4 mb-8">
                    <TrendingUp size={24} className="text-emerald-500" />
                    <h3 className="text-xl font-black tracking-tight italic">METRICS</h3>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500">
                          <span>API_CONSUMPTION</span>
                          <span>74%</span>
                       </div>
                       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="w-[74%] h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500">
                          <span>SERVER_LOAD</span>
                          <span>12%</span>
                       </div>
                       <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="w-[12%] h-full bg-primary shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.01] border-white/5">
                 <h3 className="text-xl font-black tracking-tight italic mb-8">QUICK_ACTIONS</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-black/40 border border-white/5 hover:bg-primary/10 transition-all text-neutral-500 hover:text-primary group">
                       <Rocket size={24} />
                       <span className="text-[8px] font-black uppercase tracking-widest">Broadcast</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-black/40 border border-white/5 hover:bg-accent/10 transition-all text-neutral-500 hover:text-accent group">
                       <BarChart3 size={24} />
                       <span className="text-[8px] font-black uppercase tracking-widest">Reports</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-black/40 border border-white/5 hover:bg-secondary/10 transition-all text-neutral-500 hover:text-secondary group">
                       <Mail size={24} />
                       <span className="text-[8px] font-black uppercase tracking-widest">Comms</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-black/40 border border-white/5 hover:bg-white/10 transition-all text-neutral-500 hover:text-white group">
                       <Layout size={24} />
                       <span className="text-[8px] font-black uppercase tracking-widest">Site</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
