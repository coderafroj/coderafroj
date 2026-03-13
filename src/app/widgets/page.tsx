"use client";

import { motion } from "framer-motion";
import { 
  Star, MessageSquare, Instagram, Layout, 
  ArrowRight, Code, ExternalLink, Sparkles 
} from "lucide-react";

const widgetTypes = [
  {
    title: "Review Carousel",
    desc: "Sync with Google Reviews or Trustpilot. 100% customizable slider with auto-fetch.",
    icon: Star,
    color: "bg-yellow-500",
    preview: (
      <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
        <div className="flex gap-1 mb-3 text-yellow-500">
          {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-current" />)}
        </div>
        <p className="text-neutral-400 text-sm italic">"The best service I've ever used. Highly recommended!"</p>
      </div>
    )
  },
  {
    title: "Floating Chat",
    desc: "WhatsApp, Messenger, or Live Chat bubble. Convert visitors with instant communication.",
    icon: MessageSquare,
    color: "bg-cyan-500",
    preview: (
      <div className="relative h-28 bg-black/40 rounded-2xl p-4 border border-white/5 flex flex-col justify-end">
        <div className="w-8 h-8 rounded-full bg-cyan-500/20 absolute bottom-4 right-4 flex items-center justify-center animate-bounce">
          <MessageSquare size={16} className="text-cyan-400" />
        </div>
        <div className="w-1/2 h-4 bg-white/5 rounded-full" />
      </div>
    )
  },
  {
    title: "Instagram Feed",
    desc: "Showcase your social proof with a live-syncing grid of your latest Instagram posts.",
    icon: Instagram,
    color: "bg-gradient-to-tr from-orange-500 to-pink-500",
    preview: (
      <div className="grid grid-cols-3 gap-2 opacity-50">
        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-white/5 rounded-md" />)}
      </div>
    )
  },
  {
    title: "Sales Popup",
    desc: "Create urgency with real-time conversion notifications. 'Someone just bought...' alerts.",
    icon: Sparkles,
    color: "bg-rose-500",
    preview: (
      <div className="flex items-center gap-3 bg-black/40 rounded-full p-2 border border-white/5 pr-4 max-w-[180px]">
        <div className="w-8 h-8 rounded-full bg-rose-500/20" />
        <div className="flex-1 space-y-1">
          <div className="h-2 w-full bg-white/5 rounded" />
          <div className="h-1.5 w-2/3 bg-white/5 rounded" />
        </div>
      </div>
    )
  }
];

export default function WidgetsPage() {
  return (
    <div className="container max-w-7xl mx-auto py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mb-16"
      >
        <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Widget Factory</span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">
          Ready to <span className="neon-text">Embed.</span>
        </h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Boost your website conversion rate with high-end, production-ready widgets. 
          Zero maintenance. Infinite scalability.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {widgetTypes.map((widget, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card group relative overflow-hidden flex flex-col"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${widget.color} opacity-5 blur-[80px] -z-10`} />
            
            <div className="p-8 flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${widget.color}/10 flex items-center justify-center border border-${widget.color}/20 text-white`}>
                    <widget.icon size={30} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{widget.title}</h3>
                    <p className="text-xs text-neutral-500 font-medium">Updated 2 days ago</p>
                  </div>
                </div>
                <button className="p-3 rounded-2xl glass hover:bg-white/10 transition-colors">
                  <Code size={20} className="text-neutral-400" />
                </button>
              </div>

              <p className="text-neutral-400 mb-8 leading-relaxed">
                {widget.desc}
              </p>

              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-4">LIVE PREVIEW</p>
                {widget.preview}
              </div>
            </div>

            <div className="px-8 pb-8 pt-0 flex gap-4">
              <button className="flex-1 py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Install Now <ArrowRight size={18} />
              </button>
              <button className="px-6 rounded-2xl glass border-white/5 hover:bg-white/10 transition-colors">
                <ExternalLink size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-20 p-12 glass rounded-[3rem] border border-white/5 text-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <h2 className="text-3xl font-bold mb-4">Can't find what you need?</h2>
        <p className="text-neutral-400 mb-8 max-w-xl mx-auto">Our developers are constantly building new primitives. Suggest a widget and get it for free.</p>
        <button className="px-8 py-4 rounded-2xl bg-neutral-900 border border-white/10 hover:border-primary/50 transition-all font-bold">Request a Widget</button>
      </motion.div>
    </div>
  );
}
