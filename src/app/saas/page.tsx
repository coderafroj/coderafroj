"use client";

import { motion } from "framer-motion";
import { 
  Wrench, ImageIcon, FileSearch, Trash2, 
  Sliders, ArrowRight, Zap, Cloud, 
  Cpu, MousePointer2 
} from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "AI BG Remover",
    icon: ImageIcon,
    accent: "text-orange-400",
    bg: "bg-orange-500/10",
    glow: "rgba(249,115,22,0.15)",
    desc: "Next-gen background removal. Perfect edges in < 2 seconds using neural engine v4.",
    status: "Active",
    type: "Image Process"
  },
  {
    title: "Smart Minifier",
    icon: FileSearch,
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    glow: "rgba(245,158,11,0.15)",
    desc: "Intelligent code compression for JS, CSS, and HTML. Cuts down bundle size by up to 60%.",
    status: "Beta",
    type: "Optimizer"
  },
  {
    title: "Asset CDN",
    icon: Cloud,
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "rgba(59,130,246,0.15)",
    desc: "Global edge delivery for your static assets. Integrated optimization and cache invalidation.",
    status: "Coming Soon",
    type: "Infra"
  },
  {
    title: "Compute Core",
    icon: Cpu,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "rgba(16,185,129,0.15)",
    desc: "Serverless function executor with 0ms cold starts. Deploy high-performance logic instantly.",
    status: "Coming Soon",
    type: "Runtime"
  }
];

export default function SaasPage() {
  return (
    <div className="container max-w-7xl mx-auto py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mb-20"
      >
        <div className="flex items-center gap-3 mb-6">
           <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-widest">Micro-SaaS Engine</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40">
          Scale with <br />
          <span className="italic">Micro-utilities.</span>
        </h1>
        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
          Don't build everything from scratch. Inject high-performance SaaS 
          logic into your app with our specialized micro-service API.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card p-10 relative overflow-hidden group"
          >
            <div 
              className="absolute -right-20 -top-20 w-64 h-64 rounded-full -z-10 blur-[100px] transition-opacity duration-500 opacity-20 group-hover:opacity-40" 
              style={{ backgroundColor: tool.glow.replace('0.15', '0.3') }} 
            />
            
            <div className="flex items-center justify-between mb-8">
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border transition-all", tool.bg, `border-${tool.accent.split('-')[1]}-500/20`)}>
                  <tool.icon className={cn("w-8 h-8", tool.accent)} />
               </div>
               <div className="text-[10px] font-bold text-neutral-600 border border-white/5 px-3 py-1 rounded-full">{tool.type}</div>
            </div>

            <h3 className="text-3xl font-bold mb-4">{tool.title}</h3>
            <p className="text-neutral-400 leading-relaxed mb-8 flex-1">{tool.desc}</p>
            
            <div className="flex items-center justify-between mt-auto">
               <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", tool.status === 'Coming Soon' ? 'bg-neutral-600' : 'bg-emerald-500')} />
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{tool.status}</span>
               </div>
               
               <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors">
                  Check API <ArrowRight size={16} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integration Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-20 glass-card p-1 items-center rounded-3xl overflow-hidden"
      >
        <div className="bg-neutral-900/40 p-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1">
             <h2 className="text-3xl font-bold mb-4">One Endpoint. Infinity.</h2>
             <p className="text-neutral-400 italic">"Kodarafroj's utility API saved us 3 months of dev work on our media processing pipeline."</p>
             <div className="flex items-center gap-4 mt-8">
                <div className="w-10 h-10 rounded-full bg-neutral-800" />
                <span className="font-bold text-sm">Lead Dev @ PixelShift</span>
             </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
             <button className="px-10 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold transition-all shadow-[0_0_40px_rgba(234,88,12,0.3)]">
                Get API Key
             </button>
             <button className="px-10 py-4 rounded-xl glass border-white/5 hover:bg-white/10 transition-all font-bold">
                API Docs
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
