"use client";

import { useEffect, useState } from "react";
import { docsService, DocumentationDoc } from "@/lib/docs-service";
import Link from "next/link";
import { 
  ArrowRight, 
  Terminal, 
  BookOpen, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Workflow,
  Cpu,
  Layers,
  Database,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "CORE_PROTOCOLS",
    desc: "Foundational architecture and low-level system integration guides.",
    icon: Cpu,
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "NEURAL_LINK APIs",
    desc: "Complete reference for our advanced AI and machine learning endpoints.",
    icon: Workflow,
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "KINETIC_MOTION",
    desc: "Documentation for high-performance animation and reactive primitives.",
    icon: Sparkles,
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "SECURE_VAULT",
    desc: "Security protocols and authenticated data management strategies.",
    icon: ShieldCheck,
    color: "from-orange-500 to-red-600"
  }
];

export default function DocsLandingPage() {
  const [docs, setDocs] = useState<DocumentationDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    docsService.getDocs().then(data => {
      setDocs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-24 space-y-16 md:space-y-24">
      {/* Simple Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 md:space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
           Documentation Hub
        </div>
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.2] md:leading-[1.1]">
           Comprehensive guides for the <span className="text-emerald-500">Kodarafroj</span> ecosystem.
        </h1>
        <p className="text-sm md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
           Everything you need to integrate, scale, and master our platform. 
           Access foundational systems and advanced development protocols.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 px-6 sm:px-0">
           {docs.length > 0 && (
             <Link 
               href={`/docs/${docs[0].slug}`} 
               className="px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all text-sm flex items-center justify-center gap-2"
             >
                Get Started <ArrowRight size={18} />
             </Link>
           )}
           <Link 
             href="https://github.com/coderafroj" 
             target="_blank"
             className="px-8 py-3.5 border border-white/10 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all text-sm flex items-center justify-center gap-2"
           >
              GitHub <Terminal size={18} />
           </Link>
        </div>
      </motion.section>

      {/* Categories Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
         {features.map((f, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all group"
           >
              <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-6 md:mb-10 border border-white/5 bg-zinc-900 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all")}>
                 <f.icon size={20} className={cn("text-zinc-400 group-hover:text-emerald-500 transition-colors md:size-6")} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 tracking-tight text-white group-hover:text-emerald-500 transition-colors">
                {f.title === "CORE_PROTOCOLS" ? "Architecture & Core Systems" : 
                 f.title === "NEURAL_LINK APIs" ? "AI & Machine Learning APIs" :
                 f.title === "KINETIC_MOTION" ? "UI & Animation Systems" :
                 f.title === "SECURE_VAULT" ? "Security & Auth Guards" : f.title}
              </h3>
              <p className="text-[13px] md:text-sm text-zinc-500 leading-relaxed mb-6 md:mb-10 font-medium">
                 {f.desc}
              </p>
              <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-emerald-500 transition-colors">
                 Read Guides <ArrowUpRight size={14} />
              </div>
           </motion.div>
         ))}
      </section>

      {/* Getting Started Section */}
      <section className="space-y-8 md:space-y-10">
         <div className="flex items-center justify-between border-b border-white/5 pb-6 px-2 md:px-0">
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">Recent Updates</h2>
            <Link href="/docs/all" className="text-[10px] md:text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Browse all</Link>
         </div>

         {loading ? (
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[11px] md:text-[12px] font-medium text-zinc-600">Syncing hub data...</span>
            </div>
         ) : docs.length === 0 ? (
            <p className="text-zinc-600 px-2 md:px-0 text-sm">No documentation entries available yet.</p>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {docs.slice(0, 4).map((doc) => (
                 <Link 
                   key={doc.id}
                   href={`/docs/${doc.slug}`}
                   className="flex items-center justify-between p-5 md:p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all group"
                 >
                    <div className="flex items-center gap-3 md:gap-4">
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 transition-colors">
                          <BookOpen size={18} />
                       </div>
                       <span className="font-medium text-zinc-400 group-hover:text-white transition-colors text-sm md:text-base truncate max-w-[140px] xs:max-w-none">{doc.title}</span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-800 group-hover:text-emerald-500 transition-colors" />
                 </Link>
               ))}
            </div>
         )}
      </section>

      {/* Simple Footer */}
      <footer className="pt-16 md:pt-24 pb-8 md:pb-12 text-center">
         <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-800">
            Kodarafroj Hub © 2026 • Documentation System
         </p>
      </footer>
    </div>
  );
}
