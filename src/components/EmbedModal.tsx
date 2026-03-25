"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, ExternalLink, Sparkles, Terminal, ShieldCheck, Share2 } from "lucide-react";
import { useState } from "react";

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgetId: string;
  widgetName: string;
}

export default function EmbedModal({ isOpen, onClose, widgetId, widgetName }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);
  
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const embedCode = `<iframe 
  src="${origin}/embed/${widgetId}" 
  width="100%" height="400" 
  frameborder="0" 
  style="border-radius: 20px; border: 1px solid rgba(255,255,255,0.1);"
></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-3xl glass-card p-1 rounded-[3.5rem] overflow-hidden bg-gradient-to-tr from-white/10 to-transparent"
          >
            <div className="bg-neutral-950 p-10 md:p-14 rounded-[3.3rem]">
              <div className="flex items-center justify-between mb-12">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                     <Terminal size={12} />
                     DEPLOYMENT_READY
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-1 mask-text italic">
                    EXTRACT <br /> <span className="neon-text not-italic uppercase">PRIMITIVE.</span>
                  </h2>
                  <p className="text-neutral-500 font-bold italic border-l-2 border-primary/20 pl-6">Deploy <span className="text-primary not-italic uppercase font-black text-xs tracking-widest">{widgetName}</span> to any machine.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-4 rounded-full glass hover:bg-white/10 transition-colors z-20"
                >
                  <X size={24} className="text-neutral-500" />
                </button>
              </div>

              <div className="space-y-10">
                 <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative bg-black/60 border border-white/10 rounded-3xl p-10 font-mono text-xs md:text-sm text-blue-300/60 break-all leading-relaxed h-56 overflow-auto scrollbar-hide selection:bg-primary/20">
                      {embedCode}
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="absolute top-6 right-6 px-6 py-3 rounded-2xl bg-white text-black font-black text-xs flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl"
                    >
                      {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                      {copied ? "COPIED_HASH" : "COPY_PAYLOAD"}
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] space-y-4">
                       <h4 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] flex items-center gap-2">
                         <ShieldCheck size={14} className="text-emerald-500" />
                         SYSTEM_REQUIREMENTS
                       </h4>
                       <p className="text-[11px] text-neutral-400 leading-relaxed italic font-medium">
                          Inject the payload into any HTML host. Fully compatible with WordPress, Webflow, Shopify, and cross-platform machine nodes.
                       </p>
                    </div>
                    <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col justify-center items-center text-center space-y-4 group/box">
                       <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/10 group-hover/box:scale-110 transition-transform">
                          <Sparkles size={24} className="text-primary" />
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Need API Access?</p>
                          <button className="text-xs font-black text-white underline underline-offset-4 hover:text-primary transition-colors">REQUEST_TOKEN</button>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      onClick={() => window.open(`/embed/${widgetId}`, '_blank')}
                      className="flex-1 py-6 glass border-white/10 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white/5 transition-all active:scale-95"
                    >
                      SIMULATE_ENVIRONMENT <ExternalLink size={18} />
                    </button>
                    <button className="w-20 py-6 glass border-white/10 rounded-[2rem] flex items-center justify-center hover:bg-white/10 transition-colors">
                       <Share2 size={24} className="text-neutral-500" />
                    </button>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
