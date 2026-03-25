"use client";

import { motion } from "framer-motion";
import { 
  Star, MessageSquare, Instagram, 
  ArrowRight, Code, ExternalLink, Sparkles,
  Zap, Bell, Rocket, Box
} from "lucide-react";
import { useState } from "react";
import EmbedModal from "@/components/EmbedModal";
import { cn } from "@/lib/utils";

const widgetTypes = [
  {
    id: "review-carousel",
    title: "Review Carousel",
    desc: "Sync with Google Reviews or Trustpilot. 100% customizable slider with auto-fetch capabilities.",
    icon: Star,
    color: "from-yellow-400 to-orange-500",
    preview: (
      <div className="bg-black/40 rounded-3xl p-8 border border-white/5 space-y-4">
        <div className="flex gap-1.5 text-yellow-500">
          {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-current" />)}
        </div>
        <p className="text-neutral-500 text-sm italic font-medium leading-relaxed">
          &quot;Kodarafroj is the gold standard for developer tools. Unmatched quality.&quot;
        </p>
        <div className="flex items-center gap-3 pt-2">
           <div className="w-8 h-8 rounded-full bg-white/10" />
           <div className="h-2 w-20 bg-white/5 rounded-full" />
        </div>
      </div>
    )
  },
  {
    id: "floating-chat",
    title: "Floating Hub",
    desc: "Multi-channel communication hub (WhatsApp, Messenger, Live Chat). Convert on the fly.",
    icon: MessageSquare,
    color: "from-cyan-400 to-blue-500",
    preview: (
      <div className="relative h-40 bg-black/40 rounded-3xl p-6 border border-white/5 flex flex-col justify-end overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -z-10" />
        <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center absolute bottom-6 right-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
          <MessageSquare size={24} className="text-white" />
        </div>
        <div className="space-y-2">
          <div className="w-2/3 h-4 bg-white/10 rounded-full" />
          <div className="w-1/2 h-4 bg-white/5 rounded-full" />
        </div>
      </div>
    )
  },
  {
    id: "insta-grid",
    title: "Social Proof Grid",
    desc: "Automated social proof with live-syncing feeds. Beautifully integrated into any UI design.",
    icon: Instagram,
    color: "from-purple-500 via-rose-500 to-orange-500",
    preview: (
      <div className="grid grid-cols-3 gap-3 opacity-40">
        {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-gradient-to-br from-white/10 to-transparent rounded-xl" />)}
      </div>
    )
  },
  {
    id: "sales-proof",
    title: "FOMO Alerts",
    desc: "Real-time conversion popups and urgency triggers. Proven to increase sales by 40% in days.",
    icon: Bell,
    color: "from-rose-500 to-red-600",
    preview: (
      <div className="flex items-center gap-4 bg-black/60 rounded-[2rem] p-4 border border-white/10 pr-8 max-w-[240px] shadow-2xl">
        <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center">
           <Zap size={18} className="text-rose-500" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 w-full bg-white/10 rounded-full" />
          <div className="h-2 w-2/3 bg-white/5 rounded-full" />
        </div>
      </div>
    )
  }
];

export default function WidgetsPage() {
  const [selectedWidget, setSelectedWidget] = useState<{id: string, name: string} | null>(null);

  return (
    <div className="relative min-h-screen pb-32 pt-44 px-4 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-3xl mb-24 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
             <Box size={14} />
             EMBEDDABLE PRIMITIVES
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mask-text italic">
            WIDGET <br />
            <span className="neon-text not-italic uppercase">FACTORY.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-xl leading-relaxed italic">
            Inject ready-to-use power into your apps. zero maintenance, 
            infinite customization, and lightning speed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {widgetTypes.map((widget, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="glass-card group relative overflow-hidden flex flex-col p-1 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent transition-all duration-500"
            >
              <div className="p-10 flex-1">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-5">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border bg-white/5 border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl")}>
                      <widget.icon size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black tracking-tight">{widget.title}</h3>
                      <p className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.2em]">High Performance Component</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedWidget({id: widget.id, name: widget.title})}
                    className="p-4 rounded-2xl glass hover:bg-white/10 transition-colors shadow-lg"
                  >
                    <Code size={24} className="text-primary" />
                  </button>
                </div>

                <p className="text-lg text-neutral-400 mb-12 leading-relaxed italic font-medium">
                  {widget.desc}
                </p>

                <div className="mb-12 relative">
                  <div className="absolute inset-0 bg-primary/10 blur-3xl -z-10 group-hover:opacity-40 transition-opacity" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-700 font-black mb-6 flex items-center gap-2">
                     <Sparkles size={12} className="text-primary" />
                     LIVE SIMULATION
                  </p>
                  <div className="group-hover:scale-[1.02] transition-transform duration-500">
                     {widget.preview}
                  </div>
                </div>
              </div>

              <div className="px-10 pb-10 pt-0 flex gap-4">
                <button 
                  onClick={() => setSelectedWidget({id: widget.id, name: widget.title})}
                  className="flex-1 py-5 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-2xl active:scale-95 text-lg"
                >
                  GET CODE SNIPPET <ArrowRight size={22} />
                </button>
                <button 
                  onClick={() => window.open(`/embed/${widget.id}`, '_blank')}
                  className="w-20 rounded-2xl glass border-white/5 hover:bg-white/10 transition-colors flex items-center justify-center active:scale-95"
                >
                  <ExternalLink size={24} className="text-neutral-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <EmbedModal 
          isOpen={!!selectedWidget} 
          onClose={() => setSelectedWidget(null)} 
          widgetId={selectedWidget?.id || ""} 
          widgetName={selectedWidget?.name || ""} 
        />

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-16 md:p-24 glass rounded-[4rem] border border-white/5 text-center relative overflow-hidden group bg-gradient-to-b from-primary/10 to-transparent"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] -z-10 group-hover:opacity-100 transition-opacity duration-1000" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic mask-text">Custom Primitives?</h2>
          <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed italic border-x-2 border-primary/20 px-12">
             Our lab is constantly evolving. If you have a specific UI requirement 
             or logic pattern, we&apos;ll build it for you at no cost.
          </p>
          <button className="px-12 py-5 rounded-2xl bg-neutral-900 border border-white/10 hover:border-primary/50 transition-all font-black text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 mx-auto">
             Submit Request <Rocket size={18} className="text-primary" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
