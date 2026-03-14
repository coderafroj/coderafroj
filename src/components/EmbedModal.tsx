"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Code, ExternalLink } from "lucide-react";
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
  style="border-radius: 20px;"
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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass-card p-1 rounded-[2.5rem] overflow-hidden"
          >
            <div className="bg-neutral-950 p-8 md:p-10 rounded-[2.3rem]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter mb-1">Get Embed Code</h2>
                  <p className="text-neutral-500 font-medium">Deploy <span className="text-primary italic">{widgetName}</span> to any website.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                 <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative bg-black/60 border border-white/10 rounded-2xl p-6 font-mono text-sm text-blue-300/80 break-all leading-relaxed h-48 overflow-auto">
                      {embedCode}
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      {copied ? "Copied!" : "Copy Code"}
                    </button>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-white/5 bg-white/5 space-y-2">
                       <h4 className="text-xs font-black text-neutral-500 uppercase tracking-widest">Setup Instructions</h4>
                       <p className="text-[10px] text-neutral-400 leading-relaxed italic">
                          Simply copy the code above and paste it within the HTML `body` of your website. The widget works with WordPress, Webflow, Shopify, and custom HTML.
                       </p>
                    </div>
                    <div className="p-4 rounded-2xl border border-white/5 bg-white/5 space-y-2 text-center flex flex-col justify-center items-center">
                       <Code size={20} className="text-primary mb-2" />
                       <p className="text-[10px] font-bold">WANT API ACCESS?</p>
                       <button className="mt-1 text-[10px] underline text-neutral-500 hover:text-white transition-colors">Request Dev Portal</button>
                    </div>
                 </div>

                 <button 
                  onClick={() => window.open(`/embed/${widgetId}`, '_blank')}
                  className="w-full py-4 glass border-white/5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                 >
                   Open Preview <ExternalLink size={16} />
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
