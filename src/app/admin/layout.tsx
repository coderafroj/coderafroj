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
    <div className="min-h-screen bg-[#030303] flex items-center justify-center">
       <div className="w-20 h-20 rounded-full border-t-2 border-emerald-500 animate-spin" />
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         className="glass-card p-12 text-center max-w-lg rounded-[3rem] border-red-500/20 bg-red-500/[0.02]"
       >
          <div className="w-24 h-24 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
             <ShieldCheck size={48} className="text-red-500" />
          </div>
          <h2 className="text-4xl font-black italic mb-6 tracking-tighter uppercase">ACCESS_DENIED</h2>
          <p className="text-neutral-500 mb-10 italic leading-relaxed text-lg">
             Unauthorized entry detected into the Executive Command Center. 
             This incident has been logged.
          </p>
          <div className="flex gap-4">
             <Link href="/login" className="flex-1 py-5 bg-white text-black font-black rounded-2xl hover:bg-neutral-200 transition-all uppercase tracking-widest text-xs">RE_AUTHENTICATE</Link>
             <Link href="/" className="flex-1 py-5 glass border border-white/5 rounded-2xl font-black text-neutral-500 hover:text-white transition-all uppercase tracking-widest text-xs">BACK_TO_TERMINAL</Link>
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
