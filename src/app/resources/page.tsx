"use client";

import { motion } from "framer-motion";
import { 
  FileCode2, ExternalLink, Bookmark, Share2, 
  Terminal, Palette, Layers, Box 
} from "lucide-react";

const categories = ["All", "CSS", "React Hooks", "SVG Assets", "Tutorials"];

const resources = [
  {
    title: "Glassmorphism Generator",
    desc: "Generate professional CSS glassmorphism code with interactive sliders and real-time preview.",
    tags: ["CSS", "Utility"],
    icon: Palette,
    color: "from-blue-500 to-indigo-500",
    stats: "2.4k DLs"
  },
  {
    title: "React Motion Library",
    desc: "Curated collection of 50+ performant Framer Motion hooks and component primitives.",
    tags: ["React", "Motion"],
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    stats: "1.8k DLs"
  },
  {
    title: "Vibrant Mesh Pack",
    desc: "50+ handcrafted SVG mesh gradients optimized for high-performance web backgrounds.",
    tags: ["Design", "SVG"],
    icon: Box,
    color: "from-emerald-500 to-teal-500",
    stats: "5.1k DLs"
  },
  {
    title: "Neo-Code Snippets",
    desc: "A highly curated VS Code extension for modern JavaScript and TypeScript development.",
    tags: ["Tools", "VS Code"],
    icon: Terminal,
    color: "from-orange-500 to-red-500",
    stats: "940 DLs"
  }
];

export default function ResourcesPage() {
  return (
    <div className="container max-w-7xl mx-auto py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-16"
      >
        <span className="font-bold text-xs tracking-widest text-emerald-500 uppercase mb-4 block">Knowledge Vault</span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-none">
          Free for <br />
          <span className="text-neutral-500 italic uppercase">Humans.</span>
        </h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          The ultimate asset library for the modern web. Every resource is 
          handpicked, tested, and ready to be used in production.
        </p>
      </motion.div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat, i) => (
          <button 
            key={i}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${i === 0 ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((res, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card group flex flex-col items-start bg-neutral-950/20 border-white/5"
          >
            <div className="p-10 w-full h-full flex flex-col">
              <div className="flex justify-between items-start mb-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${res.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <res.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex gap-2">
                  <button className="p-3 hover:bg-white/5 rounded-xl transition-colors border border-white/5">
                    <Bookmark className="w-5 h-5 text-neutral-500" />
                  </button>
                  <button className="p-3 hover:bg-white/5 rounded-xl transition-colors border border-white/5">
                    <Share2 className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4">{res.title}</h3>
              <p className="text-lg text-neutral-400 mb-8 leading-relaxed italic">
                {res.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {res.tags.map(tag => (
                  <span key={tag} className="px-3.5 py-1.5 bg-neutral-900 border border-white/5 rounded-full text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                <span className="text-sm font-bold text-neutral-600">{res.stats}</span>
                <button className="flex items-center gap-2 group-hover:text-primary font-bold text-sm transition-colors group-hover:underline underline-offset-8 decoration-2">
                  Access Raw Assets <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-20 glass rounded-[3rem] text-center bg-gradient-to-b from-emerald-500/5 to-transparent"
      >
         <h2 className="text-3xl font-bold mb-6 italic tracking-tight underline underline-offset-[16px] decoration-emerald-500/30">Never miss a drop.</h2>
         <p className="text-neutral-400 mb-12 max-w-lg mx-auto leading-relaxed">Join 12,000+ developers receiving our weekly resource digest. Curated directly by the Kodarafroj team.</p>
         <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="your@email.com" />
            <button className="bg-white text-black font-black px-10 py-4 rounded-2xl hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] transition-all uppercase tracking-widest text-xs">Join Library</button>
         </div>
      </motion.div>
    </div>
  );
}
