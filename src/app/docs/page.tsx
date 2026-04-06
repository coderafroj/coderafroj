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
    <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">
      {/* Simple Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-bold uppercase tracking-wider">
           Documentation Hub
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
           Comprehensive guides for the <span className="text-emerald-500">Kodarafroj</span> ecosystem.
        </h1>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
           Everything you need to integrate, scale, and master our platform. 
           Access foundational systems and advanced development protocols.
        </p>
        
        <div className="flex justify-center gap-4 pt-4">
           {docs.length > 0 && (
             <Link 
               href={`/docs/${docs[0].slug}`} 
               className="px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all text-sm flex items-center gap-2"
             >
                Get Started <ArrowRight size={18} />
             </Link>
           )}
           <Link 
             href="https://github.com/coderafroj" 
             target="_blank"
             className="px-8 py-3.5 border border-white/10 rounded-xl font-bold text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all text-sm flex items-center gap-2"
           >
              GitHub <Terminal size={18} />
           </Link>
        </div>
      </motion.section>

      {/* Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {features.map((f, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all group"
           >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-10 border border-white/5 bg-zinc-900 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all")}>
                 <f.icon size={24} className="text-zinc-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight text-white group-hover:text-emerald-500 transition-colors">
                {f.title === "CORE_PROTOCOLS" ? "Architecture & Core Systems" : 
                 f.title === "NEURAL_LINK APIs" ? "AI & Machine Learning APIs" :
                 f.title === "KINETIC_MOTION" ? "UI & Animation Systems" :
                 f.title === "SECURE_VAULT" ? "Security & Auth Guards" : f.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-10 font-medium">
                 {f.desc}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-emerald-500 transition-colors">
                 Read Guides <ArrowUpRight size={14} />
              </div>
           </motion.div>
         ))}
      </section>

      {/* Getting Started Section */}
      <section className="space-y-10">
         <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h2 className="text-xl font-bold tracking-tight text-white">Recent Updates</h2>
            <Link href="/docs/all" className="text-[11px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Browse all guides</Link>
         </div>

         {loading ? (
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[12px] font-medium text-zinc-600">Syncing hub data...</span>
            </div>
         ) : docs.length === 0 ? (
            <p className="text-zinc-600">No documentation entries available yet.</p>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {docs.slice(0, 4).map((doc) => (
                 <Link 
                   key={doc.id}
                   href={`/docs/${doc.slug}`}
                   className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all group"
                 >
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 transition-colors">
                          <BookOpen size={18} />
                       </div>
                       <span className="font-medium text-zinc-400 group-hover:text-white transition-colors">{doc.title}</span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-800 group-hover:text-emerald-500 transition-colors" />
                 </Link>
               ))}
            </div>
         )}
      </section>

      {/* Simple Footer */}
      <footer className="pt-24 pb-12 text-center">
         <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-800">
            Kodarafroj Hub © 2026 • Documentation System
         </p>
      </footer>
    </div>
  );
}
