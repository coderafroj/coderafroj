"use client";

import { motion } from "framer-motion";
import { 
  FileCode2, ExternalLink, Bookmark, Share2, 
  Terminal, Palette, Layers, Box,
  Sparkles, ShieldCheck, Download,
  Library, ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All Assets", "CSS Lab", "React Hooks", "SVG Assets", "Archived"];

const resources = [
  {
    title: "Glassmorphism Lab",
    desc: "Advanced real-time CSS engine to generate production-ready glassmorphism primitives.",
    tags: ["CSS", "Utility"],
    icon: Palette,
    color: "from-blue-500 to-indigo-600",
    stats: "24.5k Downloads"
  },
  {
    title: "React Kinetic Hooks",
    desc: "Curated collection of 50+ high-performance motion hooks and component primitives.",
    tags: ["React", "Motion"],
    icon: Layers,
    color: "from-purple-500 to-pink-600",
    stats: "18.2k Downloads"
  },
  {
    title: "Vibrant Mesh Pack",
    desc: "50+ handcrafted SVG mesh gradients optimized for high-performance web backgrounds.",
    tags: ["SVG", "Design"],
    icon: Box,
    color: "from-emerald-600 to-teal-700",
    stats: "51k Downloads"
  },
  {
    title: "Neo-Code Pro",
    desc: "A highly specialized VS Code extension for modern JavaScript and TypeScript development.",
    tags: ["Tools", "DX"],
    icon: Terminal,
    color: "from-orange-500 to-red-600",
    stats: "9.4k Downloads"
  }
];

export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen pb-32 pt-44 overflow-hidden px-4">
      {/* Background patterns */}
      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-emerald-500/5 rounded-full blur-[200px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-24 space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
             <Library size={14} />
             KNOWLEDGE VAULT
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mask-text italic">
            FREE FOR <br />
            <span className="neon-text not-italic uppercase">HUMANS.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed italic border-l-2 border-emerald-500/30 pl-8 font-medium">
            The ultimate asset library for the modern web. Every resource is 
            audited, validated, and ready for high-stakes production.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((cat, i) => (
            <button 
              key={i}
              className={cn(
                "px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border",
                i === 0 
                  ? "bg-white text-black border-white shadow-xl shadow-white/10 scale-105" 
                  : "bg-white/5 text-neutral-500 border-white/5 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {resources.map((res, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="glass-card group flex flex-col items-start bg-white/[0.01] border-white/5 rounded-[3rem] overflow-hidden transition-all duration-500"
            >
              <div className="p-12 w-full h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <div className={`w-18 h-18 rounded-[1.5rem] bg-gradient-to-br ${res.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700 shadow-primary/20`}>
                    <res.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex gap-3">
                    <button className="p-4 glass rounded-2xl border border-white/5 text-neutral-500 hover:text-white transition-all shadow-lg active:scale-90">
                      <Bookmark className="w-6 h-6" />
                    </button>
                    <button className="p-4 glass rounded-2xl border border-white/5 text-neutral-500 hover:text-white transition-all shadow-lg active:scale-90">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <h3 className="text-3xl font-black mb-4 tracking-tight leading-8">{res.title}</h3>
                <p className="text-xl text-neutral-500 mb-10 leading-relaxed italic font-medium">
                  {res.desc}
                </p>

                <div className="flex flex-wrap gap-2.5 mb-12">
                  {res.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-black/40 border border-white/5 rounded-full text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em] leading-none">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-10 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-neutral-700 uppercase tracking-widest leading-none mb-1">Impact</span>
                    <span className="text-sm font-black text-neutral-500 italic">{res.stats}</span>
                  </div>
                  <button className="flex items-center gap-3 bg-white/5 px-8 py-4 rounded-2xl font-black text-sm transition-all hover:bg-primary hover:text-white hover:neon-glow uppercase tracking-widest border border-white/5 group/btn">
                    ACCESS RAW <Download size={18} className="group-hover/btn:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-16 md:p-24 glass rounded-[4rem] text-center bg-gradient-to-b from-emerald-500/10 to-transparent relative overflow-hidden group"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-emerald-500/10 rounded-full blur-[150px] -z-10 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-10 border border-emerald-500/30 neon-glow group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-emerald-500/20">
             <Sparkles size={40} className="text-emerald-500" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-10 italic tracking-tighter mask-text">NEVER MISS A DROP.</h2>
          <p className="text-2xl text-neutral-500 mb-16 max-w-2xl mx-auto leading-relaxed italic font-medium px-8 border-x border-emerald-500/10">
             Join 12,000+ top-tier developers receiving our weekly resource digest. 
             Curated directly by the Kodarafroj engineering lab.
          </p>
          
          <div className="flex flex-col md:flex-row max-w-2xl mx-auto gap-4 p-2 glass rounded-[2.5rem] border border-white/10 shadow-2xl">
            <input className="flex-1 bg-transparent border-none px-8 py-5 outline-none font-bold text-lg placeholder:text-neutral-700" placeholder="DECODER_READY@EMAIL.COM" />
            <button className="bg-white text-black font-black px-12 py-5 rounded-[1.8rem] hover:bg-emerald-400 hover:shadow-2xl transition-all uppercase tracking-[0.2em] text-sm flex items-center gap-2 justify-center">
              SECURE ACCESS <ArrowUpRight size={20} />
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 opacity-40">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><ShieldCheck size={14} /> Encrypted</div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Sparkles size={14} /> Curated</div>
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Terminal size={14} /> Decoded</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
