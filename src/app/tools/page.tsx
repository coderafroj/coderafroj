"use client";

import { useState, useEffect } from "react";
import { 
  FileJson, Type, ShieldCheck, HelpCircle, 
  RefreshCw, Copy, Check, Hash, Ruler 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  // JSON Tool State
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);

  // Password Tool State
  const [passLength, setPassLength] = useState(16);
  const [password, setPassword] = useState("");
  const [copiedPass, setCopiedPass] = useState(false);

  // Base64 Tool State
  const [b64Input, setB64Input] = useState("");
  const [b64Output, setB64Output] = useState("");
  const [copiedB64, setCopiedB64] = useState(false);

  // --- Handlers ---
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
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="min-h-screen pb-20 px-4 pt-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Developer Toolbox
            </h1>
            <p className="text-xl text-neutral-400">
              A high-performance collection of essential tools for modern developers. 
              Fast, secure, and entirely client-side.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 rounded-full glass border-white/5 text-sm font-medium text-neutral-400">
              {activeTool ? "Active: " + activeTool : "Select a tool"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* JSON Formatter */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-2 glass-card p-1 rounded-3xl group transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]"
          >
            <div className="bg-neutral-950/40 p-8 rounded-[22px] h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20 text-blue-400">
                    <FileJson size={28} />
                  </div>
                  <h2 className="text-2xl font-bold">JSON Prettifier</h2>
                </div>
                <button 
                  onClick={() => copyToClipboard(jsonOutput, setCopiedJson)}
                  disabled={!jsonOutput || jsonOutput.startsWith("Error")}
                  className="p-2.5 rounded-xl glass hover:bg-white/10 transition-colors disabled:opacity-30"
                >
                  {copiedJson ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
                <textarea 
                  className="w-full h-full bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-sm focus:ring-2 focus:ring-blue-500/50 outline-none resize-none placeholder:text-neutral-700"
                  placeholder='{"messy":"json"}'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
                <div className="w-full h-full bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-xs overflow-auto text-blue-300/90 whitespace-pre">
                  {jsonOutput || <span className="text-neutral-700 italic">Prettified output will appear here...</span>}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-neutral-500 flex items-center gap-2">
                  <ShieldCheck size={14} /> 100% Client-side. We never store your data.
                </p>
                <button 
                  onClick={formatJSON}
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
                >
                  Format JSON
                </button>
              </div>
            </div>
          </motion.div>

          {/* Password Generator */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-1 rounded-3xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)]"
          >
            <div className="bg-neutral-950/40 p-8 rounded-[22px] h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20 text-primary">
                  <ShieldCheck size={28} />
                </div>
                <h2 className="text-2xl font-bold">Secure Pass</h2>
              </div>

              <div className="relative mb-6">
                <div className="bg-black/60 border border-white/5 rounded-2xl p-6 font-mono text-xl text-center break-all min-h-[5rem] flex items-center justify-center">
                  {password}
                </div>
                <button 
                  onClick={() => copyToClipboard(password, setCopiedPass)}
                  className="absolute top-2 right-2 p-2 rounded-lg glass hover:bg-white/10"
                >
                  {copiedPass ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <div className="flex justify-between text-sm mb-3 font-medium">
                    <span className="text-neutral-400">Length</span>
                    <span className="text-primary">{passLength} chars</span>
                  </div>
                  <input 
                    type="range" min="8" max="64" step="1"
                    className="w-full accent-primary bg-white/5 rounded-lg h-2"
                    value={passLength}
                    onChange={(e) => setPassLength(Number(e.target.value))}
                  />
                </div>
                
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary leading-relaxed">
                  Generates cryptographically secure passwords locally on your device.
                </div>
              </div>

              <button 
                onClick={generatePassword}
                className="mt-8 w-full py-4 rounded-xl bg-primary hover:bg-primary/90 font-bold transition-all flex items-center justify-center gap-2 group"
              >
                <RefreshCw size={20} className="group-active:rotate-180 transition-transform duration-500" />
                Regenerate
              </button>
            </div>
          </motion.div>

          {/* Base64 Tool */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="lg:col-span-3 glass-card p-1 rounded-3xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.15)]"
          >
            <div className="bg-neutral-950/40 p-8 rounded-[22px] h-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                    <Type size={28} />
                  </div>
                  <h2 className="text-2xl font-bold">Base64</h2>
                </div>
                <p className="text-neutral-400 text-sm">Convert binary data or text to/from Base64 encoding instantly.</p>
              </div>

              <div className="md:col-span-4">
                <textarea 
                  className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-sm focus:ring-1 focus:ring-emerald-500/50 outline-none resize-none"
                  placeholder="Input text here..."
                  value={b64Input}
                  onChange={(e) => setB64Input(e.target.value)}
                />
              </div>

              <div className="md:col-span-1 flex md:flex-col gap-2">
                <button onClick={() => b64Process("encode")} className="flex-1 p-3 rounded-xl bg-emerald-600 font-bold text-xs">ENC</button>
                <button onClick={() => b64Process("decode")} className="flex-1 p-3 rounded-xl bg-neutral-800 font-bold text-xs">DEC</button>
              </div>

              <div className="md:col-span-4 relative">
                <textarea 
                  readOnly
                  className="w-full h-32 bg-black/60 border border-white/5 rounded-2xl p-4 font-mono text-sm text-emerald-400/80 outline-none resize-none"
                  value={b64Output}
                  placeholder="Result..."
                />
                <button 
                  onClick={() => copyToClipboard(b64Output, setCopiedB64)}
                  className="absolute top-2 right-2 p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                >
                  {copiedB64 ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
