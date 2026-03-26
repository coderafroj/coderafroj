"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Sparkles, Send, Bot, 
  Cpu, Code2, Rocket, Lock, 
  ChevronRight, ArrowRight, RefreshCw,
  Layout, Database, Shield, Copy, Check
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export default function AIArchitectPage() {
  const { profile, loading: authLoading, isPro } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyResults = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    if (!prompt || loading || !isPro) return;
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/architect", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data.choices?.[0]?.message?.content || "No architecture generated.");
    } catch (error) {
      console.error("Generation Error:", error);
      setResult("Error: Could not connect to the neural engine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="relative min-h-screen pb-32 pt-44 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
             <Cpu size={14} className="animate-pulse" />
             NEURAL ARCHITECTURE ENGINE
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic mask-text">
            AI CODE <br /> <span className="neon-text not-italic uppercase">ARCHITECT.</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium italic border-x border-primary/20 px-12">
             Describe your vision. Our neural engine will design the perfect technical 
             foundation, folder structure, and implementation path.
          </p>
        </motion.div>

        {!isPro ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto glass-card p-12 md:p-20 text-center relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-20 -z-10" />
             <Lock size={64} className="mx-auto text-primary mb-8 animate-bounce" />
             <h2 className="text-4xl font-black italic mb-6">PRO_ACCESS_REQUIRED</h2>
             <p className="text-neutral-500 text-lg mb-12 max-w-md mx-auto italic font-medium">
                The AI Code Architect is an elite tool reserved for Pro members only. 
                Upgrade now to unlock the full power of neural engineering.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/pricing" className="px-12 py-5 rounded-2xl bg-primary text-white font-black text-lg hover:neon-glow transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                   UPGRADE TO PRO <Rocket size={20} />
                </Link>
                <Link href="/" className="px-12 py-5 rounded-2xl glass border-white/10 text-neutral-400 font-black hover:bg-white/10 transition-all active:scale-95">
                   BACK TO LAB
                </Link>
             </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
             {/* Input Section */}
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:col-span-12 xl:col-span-4 space-y-8"
             >
                <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.01] border-white/5 h-full flex flex-col">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                         <Terminal size={24} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-black tracking-tight">MISSION_PROMPT</h3>
                   </div>
                   
                   <textarea 
                     className="flex-1 w-full min-h-[300px] bg-black/40 border border-white/10 rounded-[1.5rem] p-8 font-mono text-sm focus:ring-2 focus:ring-primary/40 outline-none resize-none placeholder:text-neutral-700 transition-all italic font-medium"
                     placeholder="Example: Build a high-performance e-commerce engine with Next.js 15, Stripe integration, and a glassmorphism design system..."
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                   />

                   <button 
                     onClick={handleGenerate}
                     disabled={loading || !prompt}
                     className="mt-8 w-full py-6 bg-primary text-white font-black rounded-2xl hover:neon-glow transition-all shadow-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-30 active:scale-95"
                   >
                     {loading ? (
                        <>GEN_IN_PROGRESS <RefreshCw size={22} className="animate-spin" /></>
                     ) : (
                        <>INITIATE_GENERATION <Send size={22} /></>
                     )}
                   </button>
                </div>
             </motion.div>

             {/* Output Section */}
             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:col-span-12 xl:col-span-8"
             >
                <div className="glass-card p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent min-h-[600px] h-full">
                   <div className="bg-neutral-950 p-10 md:p-14 rounded-[2.8rem] h-full flex flex-col">
                      <div className="flex items-center justify-between mb-12">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                               <Code2 size={24} className="text-accent" />
                            </div>
                            <div>
                               <h3 className="text-xl font-black tracking-tight">OUTPUT_ARCHIVE</h3>
                               <p className="text-[10px] text-neutral-600 font-black tracking-widest uppercase">Neural Computed Payload</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                         </div>
                      </div>

                      <div className="flex-1 w-full bg-black/60 border border-white/5 rounded-[2rem] p-10 font-mono text-sm leading-relaxed overflow-auto scrollbar-hide text-neutral-400 prose prose-invert prose-emerald max-w-none">
                         {result ? (
                            <div className="whitespace-pre-wrap">{result}</div>
                         ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                               <Bot size={80} className="text-neutral-700" />
                               <p className="text-lg italic font-medium">Awaiting mission input for neural synthesis...</p>
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-12">
                                  <div className="p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2">
                                     <Layout size={20} />
                                     <span className="text-[8px] font-black tracking-widest uppercase">UI_MODULAR</span>
                                  </div>
                                  <div className="p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2">
                                     <Database size={20} />
                                     <span className="text-[8px] font-black tracking-widest uppercase">DB_SCHEMA</span>
                                  </div>
                                  <div className="p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2">
                                     <Shield size={20} />
                                     <span className="text-[8px] font-black tracking-widest uppercase">SEC_PROTOCOL</span>
                                  </div>
                                  <div className="p-4 rounded-xl border border-white/10 flex flex-col items-center gap-2">
                                     <Rocket size={20} />
                                     <span className="text-[8px] font-black tracking-widest uppercase">DP_PIPELINE</span>
                                  </div>
                               </div>
                            </div>
                         )}
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
