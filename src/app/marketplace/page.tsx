"use client";

import { motion } from "framer-motion";
import { 
  ShoppingCart, Search, Filter, Download, 
  Zap, Star, Shield, ArrowUpRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Glassy Dashboard Pro",
    category: "Next.js 14 Template",
    price: 49,
    rating: 4.9,
    sales: 1240,
    color: "from-blue-600 to-indigo-600",
    badges: ["Best Seller", "App Router"]
  },
  {
    name: "Kodara UI Kit",
    category: "React Components",
    price: 29,
    rating: 4.8,
    sales: 850,
    color: "from-purple-600 to-pink-600",
    badges: ["New", "Tailwind"]
  },
  {
    name: "Neo-Brutalism Blog",
    category: "Vite Template",
    price: 0,
    rating: 4.7,
    sales: 3200,
    color: "from-emerald-600 to-teal-600",
    badges: ["Free", "Open Source"]
  },
  {
    name: "SaaS Rocket Engine",
    category: "Fullstack SaaS",
    price: 99,
    rating: 5.0,
    sales: 420,
    color: "from-orange-600 to-red-600",
    badges: ["Elite", "Micro-services"]
  }
];

export default function MarketplacePage() {
  return (
    <div className="container max-w-7xl mx-auto py-20 px-4">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-left"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-none">
            Scale your <br />
            <span className="neon-text italic">Vision.</span>
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            Acquire world-class code artifacts. Audited for security, optimized 
            for speed, and designed to convert.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
        >
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
            <input 
              className="w-full lg:w-80 bg-neutral-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
              placeholder="Search artifacts..."
            />
          </div>
          <button className="bg-neutral-900/50 border border-white/5 p-4 rounded-2xl flex items-center justify-center hover:bg-white/5 transition-colors">
            <Filter className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card group flex flex-col h-full bg-neutral-950/20"
          >
            {/* Image/Gradient area */}
            <div className="relative h-56 overflow-hidden rounded-t-[1.4rem]">
              <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110", product.color)} />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm bg-black/40">
                <button className="bg-white text-black px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <ArrowUpRight size={18} /> Live Preview
                </button>
              </div>
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.badges.map(b => (
                  <span key={b} className="px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">{b}</span>
                ))}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">{product.category}</span>
                <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                  <Star size={12} className="fill-current" /> {product.rating}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-sm text-neutral-500 mb-8 italic">{product.sales.toLocaleString()} active users</p>
              
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                <div className="text-2xl font-black text-white">
                  {product.price === 0 ? "FREE" : `$${product.price}`}
                </div>
                <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all transform active:scale-90">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Vendor Teaser */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card flex flex-col items-center justify-center p-8 bg-primary/5 border-dashed border-primary/20 text-center"
        >
           <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-pulse">
              <Zap className="w-8 h-8 text-primary shadow-[0_0_20px_rgba(139,92,246,0.5)]" />
           </div>
           <h4 className="text-xl font-bold mb-2">Sell your Code</h4>
           <p className="text-sm text-neutral-400 mb-6 leading-relaxed">Join 500+ creators earning on Kodarafroj. 90% revenue share.</p>
           <button className="px-6 py-2.5 rounded-xl border border-primary/30 text-primary font-bold hover:bg-primary hover:text-white transition-all">
              Apply to Sell
           </button>
        </motion.div>
      </div>

      <div className="mt-20 p-8 glass rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
              <Shield className="w-8 h-8 text-neutral-400" />
           </div>
           <div>
              <p className="font-bold text-lg">Buyer Protection</p>
              <p className="text-sm text-neutral-500 italic">Every artifact is manually audited for backdoors and vulnerabilities.</p>
           </div>
        </div>
        <button className="text-sm font-bold underline underline-offset-8 hover:text-primary transition-colors uppercase tracking-widest">Read our Quality Promise</button>
      </div>
    </div>
  );
}
