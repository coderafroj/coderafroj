"use client";

import { useState } from "react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { Menu, X, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30 selection:text-emerald-500 relative overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
               <BookOpen size={16} className="text-emerald-500" />
            </div>
            <span className="text-xs font-bold tracking-tight uppercase text-zinc-400">Documentation</span>
         </div>
         <button 
           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
           className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
         >
           {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
      </div>

      {/* Docs Sidebar Wrapper */}
      <div className={cn(
        "lg:block",
        isSidebarOpen ? "block" : "hidden"
      )}>
        <DocsSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <main className="flex-1 min-h-screen relative overflow-hidden w-full">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[300px] md:h-[600px] bg-emerald-500/[0.03] rounded-full blur-[100px] md:blur-[200px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-emerald-500/[0.02] rounded-full blur-[80px] md:blur-[150px] -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 py-28 md:px-12 md:py-32 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
