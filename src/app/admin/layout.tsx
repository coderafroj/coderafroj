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
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8 text-center">
       <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-zinc-900 border-t-emerald-500 rounded-full animate-spin" />
       </div>
       <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-white">Initializing Dashboard</h2>
          <p className="text-sm text-zinc-500">Authenticating terminal session...</p>
       </div>
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="max-w-md w-full p-12 text-center rounded-3xl border border-white/5 bg-white/[0.01]"
       >
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-10">
             <ShieldCheck size={40} className="text-red-500" />
          </div>
          <div className="space-y-3 mb-10">
             <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Unauthorized Access</h2>
             <p className="text-sm font-medium text-zinc-500">Administrative privileges required.</p>
          </div>
          <p className="text-zinc-500 mb-12 text-sm leading-relaxed max-w-[280px] mx-auto">
             You do not have the required permissions to access this console. Please sign in with an authorized account.
          </p>
          <div className="flex flex-col gap-3">
             <Link href="/login" className="py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all text-sm">Sign In</Link>
             <Link href="/" className="py-4 bg-transparent border border-white/10 text-zinc-400 font-bold rounded-xl hover:bg-white/5 transition-all text-sm">Return Home</Link>
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
