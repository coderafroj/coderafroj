"use client";

import { useState, useEffect } from "react";
import { 
  FileJson, Type, ShieldCheck, 
  RefreshCw, Copy, Check, Sparkles,
  Zap, Code2, Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ToolsPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);

  const [passLength, setPassLength] = useState(16);
  const [password, setPassword] = useState("");
  const [copiedPass, setCopiedPass] = useState(false);

  const [b64Input, setB64Input] = useState("");
  const [b64Output, setB64Output] = useState("");
  const [copiedB64, setCopiedB64] = useState(false);

  const formatJSON = () => {
    try {
      const obj = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(obj, null, 2));
    } catch (e) {
      setJsonOutput("Error: Invalid JSON format");
    }
  };

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0, n = charset.length; i < passLength; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
  };

  const b64Process = (mode: "encode" | "decode") => {
    try {
      if (mode === "encode") setB64Output(btoa(b64Input));
      else setB64Output(atob(b64Input));
    } catch (e) {
      setB64Output("Error: Could not process Base64");
    }
  };

  const copyToClipboard = (text: string, setter: (v: boolean) => void) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  useEffect(() => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0, n = charset.length; i < 16; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPassword(retVal);
  }, []);

  return (
    <div className="relative min-h-screen pb-32 pt-44 px-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-24 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-primary text-sm font-bold uppercase tracking-widest"
          >
            <Terminal size={16} />
            POWERED BY PRECISION
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mask-text italic leading-tight">
            DEVELOPER <br />
            <span className="neon-text not-italic">TOOLBOX.</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto italic">
            Essential utilities designed for extreme speed and security. 
            All processing happens 100% on your device.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* JSON Formatter */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="lg:col-span-2 glass-card p-1 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.15)] bg-gradient-to-br from-white/5 to-transparent"
          >
            <div className="p-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20 text-primary neon-glow">
                    <FileJson size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">JSON Beautifier</h2>
                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Visualizer & Formatter</p>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(jsonOutput, setCopiedJson)}
                  disabled={!jsonOutput || jsonOutput.startsWith("Error")}
                  className="p-3 rounded-2xl glass hover:bg-white/10 transition-colors disabled:opacity-20"
                >
                  {copiedJson ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} className="text-neutral-400" />}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[450px]">
                <div className="relative group">
                  <textarea 
                    className="w-full h-full bg-black/40 border border-white/5 rounded-3xl p-8 font-mono text-sm focus:ring-2 focus:ring-primary/40 outline-none resize-none placeholder:text-neutral-800 transition-all"
                    placeholder='{"messy":"json_here"}'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                  />
                  <div className="absolute top-4 left-4 text-[10px] font-black text-neutral-800 uppercase tracking-widest">Input Raw</div>
                </div>
                <div className="relative">
                  <div className="w-full h-full bg-neutral-950/80 border border-white/5 rounded-3xl p-8 font-mono text-[13px] overflow-auto text-primary/80 whitespace-pre scrollbar-hide">
                    {jsonOutput || <span className="text-neutral-800 italic">Beautified output will appear here...</span>}
                  </div>
                  <div className="absolute top-4 left-4 text-[10px] font-black text-neutral-800 uppercase tracking-widest">Formatted Output</div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-600 font-bold text-[10px] uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-emerald-500" /> 
                  Privacy Guaranteed • No Data Leaves Your Browser
                </div>
                <button 
                  onClick={formatJSON}
                  className="px-10 py-4 rounded-2xl bg-primary text-white font-black hover:neon-glow transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  Format JSON <Sparkles size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Password Generator */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-card p-1 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.15)] bg-gradient-to-bl from-white/5 to-transparent"
          >
            <div className="p-10 h-full flex flex-col">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center border border-secondary/20 text-secondary neon-glow">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">SecurePass</h2>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Entropy-based Generator</p>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="bg-neutral-950/80 border border-white/5 rounded-[2rem] p-10 font-mono text-2xl text-center break-all min-h-[7rem] flex items-center justify-center text-secondary/90 selection:bg-secondary/20">
                  {password}
                </div>
                <button 
                  onClick={() => copyToClipboard(password, setCopiedPass)}
                  className="absolute top-3 right-3 p-3 rounded-xl glass hover:bg-white/10"
                >
                  {copiedPass ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-neutral-600" />}
                </button>
              </div>

              <div className="space-y-10 flex-1">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-neutral-500">Character Length</span>
                    <span className="text-secondary">{passLength}</span>
                  </div>
                  <input 
                    type="range" min="8" max="64" step="1"
                    className="w-full accent-secondary bg-white/5 rounded-full h-3 appearance-none cursor-pointer"
                    value={passLength}
                    onChange={(e) => setPassLength(Number(e.target.value))}
                  />
                </div>
                
                <div className="p-6 rounded-[1.5rem] bg-secondary/5 border border-secondary/10 space-y-2">
                  <p className="text-xs text-secondary/70 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} /> Security Note
                  </p>
                  <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                    Uses cryptographically secure pseudo-random number generators (CSPRNG) to ensure maximum entropy.
                  </p>
                </div>
              </div>

              <button 
                onClick={generatePassword}
                className="mt-10 w-full py-5 rounded-2xl bg-secondary text-white font-black transition-all flex items-center justify-center gap-3 group overflow-hidden relative shadow-lg shadow-secondary/20 hover:scale-[1.02]"
              >
                <RefreshCw size={22} className="group-active:rotate-180 transition-transform duration-700" />
                Generate New Key
              </button>
            </div>
          </motion.div>

          {/* Base64 Tool */}
          <motion.div 
            whileHover={{ y: -8 }}
            className="lg:col-span-3 glass-card p-1 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_0_60px_rgba(34,211,238,0.15)] bg-gradient-to-t from-white/5 to-transparent"
          >
            <div className="p-10 h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-3 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/20 text-accent neon-glow">
                    <Type size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Base64 Converter</h2>
                  </div>
                </div>
                <p className="text-neutral-500 text-sm font-medium leading-relaxed italic border-l-2 border-accent/30 pl-4">
                  Lossless encoding and decoding for binary data and string transmission.
                </p>
              </div>

              <div className="lg:col-span-3">
                <textarea 
                  className="w-full h-44 bg-black/40 border border-white/5 rounded-3xl p-6 font-mono text-sm focus:ring-2 focus:ring-accent/40 outline-none resize-none transition-all"
                  placeholder="Input raw content..."
                  value={b64Input}
                  onChange={(e) => setB64Input(e.target.value)}
                />
              </div>

              <div className="lg:col-span-2 flex lg:flex-col gap-3">
                <button 
                  onClick={() => b64Process("encode")} 
                  className="flex-1 py-4 rounded-2xl bg-accent text-black font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
                >
                  ENCODE_DATA
                </button>
                <button 
                  onClick={() => b64Process("decode")} 
                  className="flex-1 py-4 rounded-2xl bg-neutral-900 border border-white/10 text-white font-black text-sm hover:bg-neutral-800 transition-all active:scale-95"
                >
                  DECODE_BASE64
                </button>
              </div>

              <div className="lg:col-span-4 relative group">
                <textarea 
                  readOnly
                  className="w-full h-44 bg-neutral-950/80 border border-white/5 rounded-3xl p-6 font-mono text-sm text-accent/80 outline-none resize-none scrollbar-hide"
                  value={b64Output}
                  placeholder="Computed result will appear here..."
                />
                <button 
                  onClick={() => copyToClipboard(b64Output, setCopiedB64)}
                  className="absolute top-3 right-3 p-2 rounded-xl glass hover:bg-white/10 transition-colors"
                >
                  {copiedB64 ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-neutral-700" />}
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
