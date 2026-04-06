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
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
           <BookOpen size={12} />
           Documentation Hub
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase italic">
           Build with <span className="text-emerald-500 not-italic">Precision</span>.
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed italic">
           Everything you need to integrate, scale, and master our ecosystem. 
           Access foundational protocols and advanced engineering guides.
        </p>
        
        <div className="flex justify-center gap-4 pt-6">
           {docs.length > 0 && (
             <Link 
               href={`/docs/${docs[0].slug}`} 
               className="px-8 py-4 bg-white text-black font-black rounded-xl hover:bg-emerald-400 transition-all uppercase tracking-widest text-xs flex items-center gap-2"
             >
                Start Reading <ArrowRight size={16} />
             </Link>
           )}
           <Link 
             href="https://github.com/coderafroj" 
             target="_blank"
             className="px-8 py-4 border border-white/10 rounded-xl font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs flex items-center gap-2"
           >
              GitHub <Terminal size={16} />
           </Link>
        </div>
      </motion.section>

      {/* Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {features.map((f, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all group"
           >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-8 border border-white/5", f.color)}>
                 <f.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-black italic mb-3 tracking-tight uppercase group-hover:text-emerald-500 transition-colors">{f.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed italic font-medium mb-8">
                 {f.desc}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-700 group-hover:text-emerald-500 transition-colors">
                 Learn More <ArrowUpRight size={12} />
              </div>
           </motion.div>
         ))}
      </section>

      {/* Getting Started Section */}
      <section className="space-y-10">
         <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Recent Protocols</h2>
            <Link href="/docs/all" className="text-[10px] font-black text-neutral-500 hover:text-white uppercase tracking-widest transition-colors">View All _</Link>
         </div>

         {loading ? (
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700">Syncing node data...</span>
            </div>
         ) : docs.length === 0 ? (
            <p className="text-neutral-600 italic">No entry logs found in the core.</p>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {docs.slice(0, 4).map((doc) => (
                 <Link 
                   key={doc.id}
                   href={`/docs/${doc.slug}`}
                   className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all group"
                 >
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-600 group-hover:text-emerald-500 transition-colors">
                          <BookOpen size={18} />
                       </div>
                       <span className="font-black italic text-neutral-400 group-hover:text-white transition-colors">{doc.title}</span>
                    </div>
                    <ChevronRight size={16} className="text-neutral-800 group-hover:text-emerald-500 transition-colors" />
                 </Link>
               ))}
            </div>
         )}
      </section>

      {/* Simple Footer */}
      <footer className="pt-24 pb-12 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-700 italic">
            Kodarafroj Engineering Ecosystem © 2026
         </p>
      </footer>
    </div>
  );
}
