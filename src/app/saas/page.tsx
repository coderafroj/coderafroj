"use client";

import { motion } from "framer-motion";
import { 
  Wrench, ImageIcon, FileSearch, Cloud, 
  Cpu, ArrowRight, Zap, Terminal, ShieldCheck,
  Rocket, Sparkles, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "AI BG Remover",
    icon: ImageIcon,
    accent: "text-orange-400",
    bg: "bg-orange-500/10",
    glow: "rgba(249,115,22,0.15)",
    desc: "Next-gen background removal. Perfect edges in < 2 seconds using our specialized neural engine.",
    status: "Production Ready",
    type: "MEDIALAB"
  },
  {
    title: "Smart Minifier",
    icon: FileSearch,
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    glow: "rgba(245,158,11,0.15)",
    desc: "Intelligent code compression for JS, CSS, and HTML. Optimized for extreme edge performance.",
    status: "Beta Active",
    type: "CODE_OPS"
  },
  {
    title: "Edge CDN",
    icon: Cloud,
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "rgba(59,130,246,0.15)",
    desc: "Global delivery for static assets with integrated real-time optimization and cache invalidation.",
    status: "Deployment",
    type: "INFRACORE"
  },
  {
    title: "Compute Core",
    icon: Cpu,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "rgba(16,185,129,0.15)",
    desc: "Serverless function executor with 0ms cold starts. High-performance isolated runtimes.",
    status: "Early Access",
    type: "RUNTIME"
  }
];

export default function SaasPage() {
  return (
    <div className="relative min-h-screen pb-32 pt-44 overflow-hidden px-4">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mb-24 space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
             <Zap size={14} />
             MICRO-SAAS UTILITIES
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mask-text italic">
            UTILITY <br />
            <span className="neon-text not-italic uppercase">ENGINE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed italic border-l-2 border-orange-500/30 pl-8">
            Inject enterprise-grade logic into your applications via our 
            specialized micro-service architecture. Precision built for speed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {tools.map((tool, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="glass-card p-12 relative overflow-hidden group flex flex-col rounded-[3rem] bg-gradient-to-tr from-white/[0.02] to-transparent border-white/5 transition-all duration-500"
            >
              <div 
                className="absolute -right-24 -top-24 w-80 h-80 rounded-full -z-10 blur-[120px] transition-opacity duration-1000 opacity-20 group-hover:opacity-40" 
                style={{ backgroundColor: tool.glow.replace('0.15', '0.4') }} 
              />
              
              <div className="flex items-center justify-between mb-12">
                 <div className={cn("w-18 h-18 rounded-[1.5rem] flex items-center justify-center border transition-all shadow-2xl group-hover:scale-110 duration-500", tool.bg, `border-white/10`)}>
                    <tool.icon className={cn("w-10 h-10", tool.accent)} />
                 </div>
                 <div className="text-[10px] font-black text-neutral-700 border border-white/5 px-4 py-1.5 rounded-full tracking-widest bg-black/40 uppercase">{tool.type}</div>
              </div>

              <h3 className="text-4xl font-black mb-6 tracking-tight">{tool.title}</h3>
              <p className="text-lg text-neutral-500 leading-relaxed mb-12 flex-1 italic font-medium">
                 {tool.desc}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                 <div className="flex items-center gap-2.5">
                    <div className={cn("w-3 h-3 rounded-full animate-pulse", tool.status === 'Early Access' ? 'bg-neutral-700' : 'bg-orange-500')} />
                    <span className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">{tool.status}</span>
                 </div>
                 
                 <button className="flex items-center gap-3 text-sm font-black text-white hover:text-orange-500 transition-colors uppercase tracking-widest group/btn">
                    EXPLORE API <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Concept */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 glass-card p-1 rounded-[4rem] overflow-hidden bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/10"
        >
          <div className="p-16 md:p-24 flex flex-col md:flex-row items-center justify-between gap-16 relative">
             <div className="absolute top-0 right-0 p-10 opacity-10">
                <Globe size={300} className="text-white" />
             </div>
             <div className="flex-1 space-y-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                   <Terminal className="text-orange-400" size={32} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic">ONE UNIFIED <br /> <span className="neon-text not-italic">GATEWAY.</span></h2>
                <p className="text-xl text-neutral-400 italic max-w-xl leading-relaxed border-l-2 border-orange-500/20 pl-8">
                   &quot;Integrating Kodarafroj into our stack was the single most impactful 
                   architectural decision we made this year.&quot;
                </p>
                <div className="flex items-center gap-4 pt-4">
                   <div className="w-12 h-12 rounded-full bg-neutral-800 border border-white/5" />
                   <div className="flex flex-col">
                      <span className="font-black text-white uppercase text-xs tracking-widest">Alex Rivera</span>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">CTO @ ARCHCORE</span>
                   </div>
                </div>
             </div>
             <div className="flex flex-col gap-4 w-full md:w-auto relative z-10">
                <button className="px-12 py-6 rounded-2xl bg-orange-600 text-white font-black text-xl hover:scale-105 transition-all shadow-[0_0_60px_rgba(234,88,12,0.4)] flex items-center justify-center gap-3">
                   GET API KEY <Rocket size={24} />
                </button>
                <button className="px-12 py-6 rounded-2xl glass border-white/10 hover:bg-white/10 transition-all font-black text-lg uppercase tracking-widest flex items-center justify-center gap-2">
                   API DOCS <Sparkles size={18} />
                </button>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
