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
  const [firstDoc, setFirstDoc] = useState<DocumentationDoc | null>(null);

  useEffect(() => {
    docsService.getDocs().then(docs => {
      if (docs.length > 0) setFirstDoc(docs[0]);
    });
  }, []);

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 relative"
      >
        <div className="absolute -left-20 top-0 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/30 via-transparent to-transparent hidden md:block" />
        
        <div className="space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
              <Terminal size={14} />
              SYSTEM_DOCUMENTATION_v4.2.0
           </div>
           <h1 className="text-7xl md:text-[9rem] font-black italic tracking-tighter leading-[0.8] mb-12 mask-text uppercase">
              DECODE <br /> 
              <span className="neon-text not-italic uppercase text-white/10">THE_CORE.</span>
           </h1>
           <p className="text-2xl md:text-3xl text-neutral-500 italic font-medium leading-relaxed max-w-2xl border-l border-emerald-500/20 pl-10">
              Welcome to the central repository. Access foundational protocols, 
              high-performance APIs, and specialized engineering assets.
           </p>
        </div>

        <div className="flex flex-wrap gap-6 pt-8">
           <Link 
             href={firstDoc ? `/docs/${firstDoc.slug}` : "#"} 
             className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-emerald-400 hover:shadow-2xl transition-all uppercase tracking-widest text-sm flex items-center gap-3 neon-glow"
           >
              INITIALIZE_READ <ArrowRight size={20} />
           </Link>
           <button className="px-12 py-5 glass border-white/10 rounded-2xl font-black text-neutral-500 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-sm flex items-center gap-3">
              GITHUB_SYNC <Terminal size={20} />
           </button>
        </div>
      </motion.section>

      {/* Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {features.map((f, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="glass-card p-12 rounded-[3.5rem] border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group overflow-hidden relative"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-500", f.color)}>
                 <f.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-3xl font-black italic mb-4 tracking-tighter uppercase">{f.title}</h3>
              <p className="text-lg text-neutral-500 leading-relaxed italic font-medium mb-10">
                 {f.desc}
              </p>
              
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-neutral-700 group-hover:text-emerald-500 transition-colors">
                 ACCESS_MODULE <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
           </motion.div>
         ))}
      </section>

      {/* Network Visual */}
      <section className="relative h-96 rounded-[4rem] border border-white/5 bg-black/40 bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] overflow-hidden flex items-center justify-center group">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
         <div className="relative z-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:neon-glow transition-all">
               <Database size={32} className="text-emerald-500" />
            </div>
            <h4 className="text-3xl font-black italic uppercase tracking-widest mask-text">REPLICATED_ACROSS_NODES</h4>
            <p className="text-neutral-500 italic max-w-lg mx-auto px-8">
               Our documentation is distributed globally for zero-latency engineering 
               synchronization. Always up to date, always accessible.
            </p>
         </div>
         
         {/* Animated scan line */}
         <div className="absolute inset-x-0 top-0 h-[2px] bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-scan" />
      </section>

      {/* Community / Support */}
      <footer className="pt-24 pb-12 text-center space-y-12">
         <div className="flex justify-center gap-12 opacity-30">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]"><Layers size={14} /> Modular</div>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]"><Cpu size={14} /> Efficient</div>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]"><ShieldCheck size={14} /> Validated</div>
         </div>
      </footer>
    </div>
  );
}
