"use client";

import { motion } from "framer-motion";
import { 
  ShoppingCart, Search, Filter, ArrowUpRight,
  Zap, Star, Shield, Layout, Box,
  FileCode, Layers, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Glassy Dashboard Pro",
    category: "Next.js 15 Template",
    price: 49,
    rating: 4.9,
    sales: 1240,
    color: "from-blue-600 to-indigo-600",
    badges: ["Best Seller", "React 19"],
    icon: Layout
  },
  {
    name: "Kodara UI Kit",
    category: "Tailwind 4 Components",
    price: 29,
    rating: 4.8,
    sales: 850,
    color: "from-purple-600 to-pink-600",
    badges: ["New", "Premium"],
    icon: Box
  },
  {
    name: "Neo-Brutalism Blog",
    category: "Vite Template",
    price: 0,
    rating: 4.7,
    sales: 3200,
    color: "from-emerald-600 to-teal-600",
    badges: ["Free", "Open Source"],
    icon: FileCode
  },
  {
    name: "SaaS Rocket Engine",
    category: "Fullstack Architecture",
    price: 99,
    rating: 5.0,
    sales: 420,
    color: "from-orange-600 to-red-600",
    badges: ["Elite", "Secure"],
    icon: Layers
  }
];

export default function MarketplacePage() {
  return (
    <div className="relative min-h-screen pb-32 pt-44 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_70%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
              <Sparkles size={14} />
              Elite Code Artifacts
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mask-text italic">
              UPGRADE YOUR <br />
              <span className="neon-text not-italic uppercase">STACK.</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-xl leading-relaxed italic">
              Acquire world-class digital assets. Audited for speed, 
              security, and enterprise scalability.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto p-2 glass rounded-[2rem] border border-white/5"
          >
            <div className="relative group flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 group-focus-within:text-primary transition-colors" />
              <input 
                className="w-full lg:w-80 bg-black/40 border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-6 outline-none focus:bg-black/60 transition-all font-bold text-sm tracking-tight"
                placeholder="Find patterns, UI, templates..."
              />
            </div>
            <button className="bg-primary/10 border border-primary/20 p-5 rounded-[1.5rem] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl group">
              <Filter className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -12 }}
              className="glass-card group flex flex-col h-full bg-white/[0.01] border-white/5 rounded-[2.5rem] overflow-hidden"
            >
              {/* Product Visual Area */}
              <div className="relative h-64 overflow-hidden">
                <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-1000 group-hover:scale-125 opacity-40", product.color)} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                
                {/* Product Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <product.icon size={64} className="text-white/20 group-hover:text-white/40 transition-colors duration-500 transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md bg-black/40">
                  <button className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-all">
                    LIVE PREVIEW <ArrowUpRight size={18} />
                  </button>
                </div>
                
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {product.badges.map(b => (
                    <span key={b} className="px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-[9px] font-black text-white uppercase tracking-[0.2em]">{b}</span>
                  ))}
                </div>
              </div>
              
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] text-primary font-black uppercase tracking-[0.25em]">{product.category}</span>
                  <div className="flex items-center gap-1.5 text-yellow-500 text-sm font-black">
                    <Star size={14} className="fill-current" /> {product.rating}
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-2 tracking-tight leading-7 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-xs text-neutral-600 mb-10 font-bold uppercase tracking-widest">{product.sales.toLocaleString()} ARCHITECTS ACTIVE</p>
                
                <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                  <div className="text-3xl font-black text-white tracking-tighter">
                    {product.price === 0 ? <span className="text-emerald-400">FREE</span> : `$${product.price}`}
                  </div>
                  <button className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/5 text-primary hover:bg-primary hover:text-white transition-all transform active:scale-90 shadow-lg">
                    <ShoppingCart size={22} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Vendor Teaser Card */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-card flex flex-col items-center justify-center p-12 bg-primary/[0.02] border-dashed border-primary/20 text-center rounded-[2.5rem] group hover:bg-primary/[0.05] transition-all"
          >
             <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <Zap className="w-10 h-10 text-primary relative z-10" />
             </div>
             <h4 className="text-2xl font-black tracking-tight mb-4">Ship your Artifacts</h4>
             <p className="text-sm text-neutral-500 mb-10 leading-relaxed font-medium italic">Join a world-class elite of 500+ creators. 90% revenue share.</p>
             <button className="w-full py-4 rounded-2xl border border-primary/30 text-primary font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/20">
                Apply to Partner
             </button>
          </motion.div>
        </div>

        {/* Info Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-10 glass-card rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent"
        >
          <div className="flex items-center gap-8">
             <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Shield className="w-10 h-10 text-emerald-500 neon-glow" />
             </div>
             <div className="space-y-2">
                <p className="font-black text-2xl tracking-tighter uppercase italic">Quality Enforcement</p>
                <p className="text-neutral-500 text-sm font-medium leading-relaxed max-w-lg">Every artifact in our marketplace undergoes rigorous manual auditing for security vulnerabilities and performance bottlenecks.</p>
             </div>
          </div>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all border border-white/10 group">
             Read Protocol <ArrowUpRight className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
