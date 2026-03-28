"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Sparkles, Send, Bot, 
  Code2, RefreshCw, Copy, Check, ShieldCheck, Zap
} from "lucide-react";
import Link from "next/link";

export default function CodingTeacherPage() {
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
    if (!prompt || loading) return;
    setLoading(true);
    setResult("");
    
    try {
      const response = await fetch("/api/ai/teacher", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data.result || data.error || "No response generated.");
    } catch (error) {
      console.error("Teacher Error:", error);
      setResult("Error: Could not connect to the neural engine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-32 pt-44 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">
             <Zap size={14} className="animate-pulse" />
             NEURAL MENTORSHIP ENGINE
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic mask-text">
            AI CODING <br /> <span className="neon-text not-italic text-blue-500 uppercase">TEACHER.</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium italic border-x border-blue-500/20 px-12">
             Stuck on a problem? Ask the neural master. Get deep, comprehensive explanations and pure code intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Input Section */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             className="lg:col-span-12 xl:col-span-4 space-y-8"
           >
              <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.01] border-white/5 h-full flex flex-col shadow-[0_0_60px_rgba(59,130,246,0.05)]">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                       <Terminal size={24} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight">YOUR_QUESTION</h3>
                 </div>
                 
                 <textarea 
                   className="flex-1 w-full min-h-[300px] bg-black/40 border border-white/10 rounded-[1.5rem] p-8 font-mono text-sm focus:ring-2 focus:ring-blue-500/40 outline-none resize-none placeholder:text-neutral-700 transition-all italic font-medium"
                   placeholder="Example: How does the virtual DOM work in React, and can you show me a visual code example?"
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                 />

                 <button 
                   onClick={handleGenerate}
                   disabled={loading || !prompt}
                   className="mt-8 w-full py-6 bg-blue-600 text-white font-black rounded-2xl hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-30 active:scale-95"
                 >
                   {loading ? (
                      <>THINKING <RefreshCw size={22} className="animate-spin" /></>
                   ) : (
                      <>ASK TEACHER <Send size={22} /></>
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
              <div className="glass-card p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent min-h-[600px] h-full shadow-[0_0_60px_rgba(59,130,246,0.05)]">
                 <div className="bg-neutral-950 p-10 md:p-14 rounded-[2.8rem] h-full flex flex-col relative">
                    <div className="flex items-center justify-between mb-12">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                             <Bot size={24} className="text-blue-500" />
                          </div>
                          <div>
                             <h3 className="text-xl font-black tracking-tight">MENTOR_RESPONSE</h3>
                             <p className="text-[10px] text-neutral-600 font-black tracking-widest uppercase">Mistral 7B Neural Engine</p>
                          </div>
                       </div>
                       
                       <button 
                         onClick={copyResults}
                         disabled={!result}
                         className="p-3 rounded-2xl glass hover:bg-white/10 transition-colors disabled:opacity-20"
                       >
                         {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} className="text-neutral-400" />}
                       </button>
                    </div>

                    <div className="flex-1 w-full bg-black/60 border border-white/5 rounded-[2rem] p-10 font-mono text-sm leading-relaxed overflow-auto scrollbar-hide text-neutral-300">
                       <AnimatePresence mode="wait">
                         {loading ? (
                           <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="h-full flex flex-col items-center justify-center gap-4 text-blue-500/70"
                           >
                              <RefreshCw size={40} className="animate-spin" />
                              <p className="text-xs font-black tracking-[0.2em] uppercase">Synthesizing Explanation...</p>
                           </motion.div>
                         ) : result ? (
                           <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             className="whitespace-pre-wrap"
                           >
                             {result}
                           </motion.div>
                         ) : (
                           <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30"
                           >
                              <Code2 size={80} className="text-neutral-700" />
                              <p className="text-lg italic font-medium">Awaiting your question...</p>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
