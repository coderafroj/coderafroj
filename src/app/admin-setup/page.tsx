"use client";

import { useState, useEffect } from "react";
import { databases, storage, APPWRITE_CONFIG } from "@/lib/appwrite";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2, XCircle, Activity, Box, Database, HardDrive, RefreshCcw, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ResourceStatus {
  id: string;
  name: string;
  status: "idle" | "checking" | "connected" | "failed";
  type: "database" | "collection" | "bucket";
  message?: string;
}

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<ResourceStatus[]>([
    { id: APPWRITE_CONFIG.databaseId, name: "Neural Database", status: "idle", type: "database" },
    { id: "users", name: "Users Vault", status: "idle", type: "collection" },
    { id: APPWRITE_CONFIG.docsCollectionId, name: "Docs Repository", status: "idle", type: "collection" },
    { id: APPWRITE_CONFIG.bucketId, name: "Media Storage", status: "idle", type: "bucket" },
  ]);

  const checkStatus = async () => {
    setLoading(true);
    const newStatuses = [...statuses];

    for (let i = 0; i < newStatuses.length; i++) {
        const resource = newStatuses[i];
        newStatuses[i].status = "checking";
        setStatuses([...newStatuses]);

        try {
            if (resource.type === "database") {
                // Testing DB connectivity
                await databases.listDocuments(resource.id, "users", []);
            } else if (resource.type === "collection") {
                await databases.listDocuments(APPWRITE_CONFIG.databaseId, resource.id, []);
            } else if (resource.type === "bucket") {
                await storage.listFiles(resource.id);
            }
            newStatuses[i].status = "connected";
            newStatuses[i].message = "SYNC_STABLE";
        } catch (err: any) {
            newStatuses[i].status = "failed";
            newStatuses[i].message = err.code === 404 ? "RESOURCE_NOT_FOUND" : "ACCESS_DENIED";
        }
        setStatuses([...newStatuses]);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <Activity size={24} className="text-emerald-500 animate-pulse" />
                    </div>
                    <div className="h-px w-24 bg-white/5" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/50">SYSTEM_DIAGNOSTICS_V4.0</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">CORE_SYNC_HEALTH</h1>
                <p className="text-sm text-neutral-500 font-medium italic max-w-xl">
                    Verifying neural links between UI and Appwrite backend. Green indicates a stable consciousness bridge. Red highlights resource missing in your console.
                </p>
            </div>
            
            <button 
                onClick={checkStatus}
                disabled={loading}
                className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50"
            >
                {loading ? "SCANNING_CHANNELS..." : "RE_INITIALIZE_SCAN"}
                <RefreshCcw size={18} className={cn("group-hover:rotate-180 transition-transform duration-700", loading && "animate-spin")} />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statuses.map((item, idx) => (
                <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                        "relative p-8 rounded-[3rem] border bg-black/40 backdrop-blur-3xl overflow-hidden group transition-all duration-500",
                        item.status === "connected" ? "border-emerald-500/20 hover:border-emerald-500/40" : 
                        item.status === "failed" ? "border-red-500/20 hover:border-red-500/40" : "border-white/5"
                    )}
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500",
                            item.status === "connected" ? "bg-emerald-500/10 text-emerald-500" : 
                            item.status === "failed" ? "bg-red-500/10 text-red-500" : "bg-white/5 text-neutral-700"
                        )}>
                            {item.type === "database" && <Database size={20} />}
                            {item.type === "collection" && <Box size={20} />}
                            {item.type === "bucket" && <HardDrive size={20} />}
                        </div>
                        {item.status === "connected" && <CheckCircle2 size={16} className="text-emerald-500" />}
                        {item.status === "failed" && <XCircle size={16} className="text-red-500" />}
                        {item.status === "checking" && <RefreshCcw size={16} className="animate-spin text-neutral-500" />}
                    </div>

                    <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-700 block">{item.type}</span>
                        <h3 className="text-lg font-black italic text-neutral-400 group-hover:text-white transition-colors">{item.name}</h3>
                        <p className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            item.status === "connected" ? "text-emerald-500" : 
                            item.status === "failed" ? "text-red-500" : "text-neutral-700"
                        )}>
                            {item.status === "idle" ? "AWAITING_SCAN" : item.message}
                        </p>
                    </div>

                    {/* Background ID display */}
                    <div className="mt-8 pt-4 border-t border-white/5">
                        <span className="text-[8px] font-mono text-neutral-800 break-all">{item.id}</span>
                    </div>

                    <div className={cn(
                        "absolute -bottom-10 -left-10 w-32 h-32 blur-3xl rounded-full -z-10 transition-colors duration-1000",
                        item.status === "connected" ? "bg-emerald-500/5 group-hover:bg-emerald-500/10" : 
                        item.status === "failed" ? "bg-red-500/5 group-hover:bg-red-500/10" : "bg-white/0"
                    )} />
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[4rem] p-12 md:p-16 relative overflow-hidden">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-3xl font-black italic tracking-tight uppercase">MANUAL_INTERVENTION_REQUIRED</h2>
                    <p className="text-sm text-neutral-500 font-medium leading-relaxed italic pr-12">
                        If any sectors are <span className="text-red-500">RED</span>, you must manually create the resources in your Appwrite Console. Use the interactive setup guide for precise instructions.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6">
                    <Link href="/admin/notes" className="flex items-center justify-center gap-3 bg-white text-black px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all neon-glow">
                        ADMIN_DASHBOARD <ShieldAlert size={18} />
                    </Link>
                    <a 
                        href="https://tor.cloud.appwrite.io" 
                        target="_blank" 
                        rel="noopener"
                        className="flex items-center justify-center gap-3 bg-neutral-900 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all border border-white/5"
                    >
                        APPWRITE_CONSOLE <ExternalLink size={18} />
                    </a>
                </div>
            </div>

            <div className="relative aspect-video rounded-[3rem] bg-black/60 border border-white/5 overflow-hidden flex flex-col p-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Self_Healing_Status</span>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                </div>
                <div className="flex-1 font-mono text-[10px] text-neutral-500 leading-relaxed overflow-y-auto">
                    <p>{">"} INITIALIZING AUTO_RECOVERY_PROTOCOL...</p>
                    <p className="text-emerald-500">{">"} IDENTITY_PROVISIONING: ENABLED</p>
                    <p className="text-emerald-500">{">"} SYNC_BUFFER: CALIBRATED (100%)</p>
                    <p className={cn(statuses.some(s => s.status === "failed") ? "text-red-500" : "text-emerald-500")}>
                        {">"} RESOURCE_VALIDATION: {statuses.some(s => s.status === "failed") ? "FAILED_INTERRUPT" : "COMPLETE_SUCCESS"}
                    </p>
                    <div className="mt-4 p-4 rounded-xl bg-white/5 text-zinc-400">
                        <p className="uppercase font-black text-white mb-2">Instructions:</p>
                        <p className="italic">1. Ensure Database ID: {APPWRITE_CONFIG.databaseId}</p>
                        <p className="italic">2. Create Bucket ID: {APPWRITE_CONFIG.bucketId}</p>
                        <p className="italic underline mt-2 cursor-pointer text-emerald-500">Read the appwrite_setup.md artifact for details.</p>
                    </div>
                </div>
            </div>

            {/* Decorative background art */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10 rounded-full" />
        </div>

        <div className="mt-12 flex justify-center">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-800 hover:text-emerald-500 transition-colors">
                RETURN_TO_ROOT_NODE
            </Link>
        </div>
      </motion.div>
    </div>
  );
}
