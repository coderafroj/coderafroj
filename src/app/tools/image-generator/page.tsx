"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, Sparkles, Send, Download, 
  RefreshCw, Camera, Layout, Palette, Zap
} from "lucide-react";
import Image from "next/image";

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setResultImage(null);
    
    try {
      const response = await fetch("/api/ai/image", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      // The response is a blob (image file)
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setResultImage(objectUrl);
    } catch (error) {
      console.error("Image Gen Error:", error);
      alert("Error: Could not generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = `kodarafroj-ai-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="relative min-h-screen pb-32 pt-44 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_70%)] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-pink-500 text-[10px] font-black uppercase tracking-[0.3em]">
             <Camera size={14} className="animate-pulse" />
             STABLE DIFFUSION XL ENGINE
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic mask-text">
            AI IMAGE <br /> <span className="neon-text not-italic text-pink-500 uppercase">STUDIO.</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium italic border-x border-pink-500/20 px-12">
             Describe your perfect visual. Our SDXL neural engine will manifest it into stunning, high-definition reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Input Section */}
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             className="lg:col-span-12 xl:col-span-4 space-y-8"
           >
              <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.01] border-white/5 h-full flex flex-col shadow-[0_0_60px_rgba(236,72,153,0.05)]">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                       <Palette size={24} className="text-pink-500" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight">VISUAL_PROMPT</h3>
                 </div>
                 
                 <textarea 
                   className="flex-1 w-full min-h-[300px] bg-black/40 border border-white/10 rounded-[1.5rem] p-8 font-mono text-sm focus:ring-2 focus:ring-pink-500/40 outline-none resize-none placeholder:text-neutral-700 transition-all italic font-medium"
                   placeholder="Example: A futuristic cyberpunk city at night with neon lights reflecting on wet streets, 8k resolution, highly detailed, cinematic lighting..."
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                 />

                 <button 
                   onClick={handleGenerate}
                   disabled={loading || !prompt}
                   className="mt-8 w-full py-6 bg-pink-600 text-white font-black rounded-2xl hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-30 active:scale-95"
                 >
                   {loading ? (
                      <>RENDERING <RefreshCw size={22} className="animate-spin" /></>
                   ) : (
                      <>GENERATE IMAGE <Send size={22} /></>
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
              <div className="glass-card p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent min-h-[600px] h-full shadow-[0_0_60px_rgba(236,72,153,0.05)]">
                 <div className="bg-neutral-950 p-10 md:p-14 rounded-[2.8rem] h-full flex flex-col relative">
                    <div className="flex items-center justify-between mb-12">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                             <ImageIcon size={24} className="text-pink-500" />
                          </div>
                          <div>
                             <h3 className="text-xl font-black tracking-tight">OUTPUT_CANVAS</h3>
                             <p className="text-[10px] text-neutral-600 font-black tracking-widest uppercase">Stable Diffusion Neural Net</p>
                          </div>
                       </div>
                       
                       <button 
                         onClick={downloadImage}
                         disabled={!resultImage}
                         className="p-3 rounded-2xl glass hover:bg-white/10 transition-colors disabled:opacity-20 text-pink-500 bg-pink-500/10 border border-pink-500/20 hidden md:flex items-center gap-2 px-6 font-black uppercase tracking-widest text-xs"
                       >
                         <Download size={16} /> Save Elite HD
                       </button>
                    </div>

                    <div className="flex-1 w-full bg-black/60 border border-white/5 rounded-[2rem] p-2 overflow-hidden flex items-center justify-center min-h-[400px]">
                       <AnimatePresence mode="wait">
                         {loading ? (
                           <motion.div 
                             key="loading"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="flex flex-col items-center justify-center gap-6"
                           >
                              <div className="relative w-24 h-24">
                                <div className="absolute inset-0 rounded-full border-4 border-pink-500/20" />
                                <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Sparkles size={24} className="text-pink-500 animate-pulse" />
                                </div>
                              </div>
                              <p className="text-xs font-black tracking-[0.3em] text-pink-500 uppercase animate-pulse">
                                Synthesizing Pixels...
                              </p>
                           </motion.div>
                         ) : resultImage ? (
                           <motion.div 
                             key="result"
                             initial={{ opacity: 0, scale: 0.95 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="relative w-full h-full min-h-[500px] rounded-[1.5rem] overflow-hidden group"
                           >
                             <Image 
                               src={resultImage} 
                               alt="AI Generated" 
                               layout="fill" 
                               objectFit="contain"
                               className="rounded-[1.5rem]" 
                               unoptimized
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 md:hidden">
                                <button 
                                  onClick={downloadImage}
                                  className="px-6 py-3 rounded-xl bg-pink-600 text-white font-black text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                                >
                                  <Download size={16} /> DOWNLOAD
                                </button>
                             </div>
                           </motion.div>
                         ) : (
                           <motion.div 
                             key="empty"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             className="flex flex-col items-center justify-center text-center space-y-6 opacity-30"
                           >
                              <Layout size={80} className="text-neutral-700" />
                              <p className="text-lg italic font-medium">Awaiting prompt to begin rendering...</p>
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
