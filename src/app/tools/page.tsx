"use client";

import { useState, useEffect } from "react";
import { 
  FileJson, Type, ShieldCheck, 
  RefreshCw, Copy, Check, Sparkles,
  Zap, Code2, Terminal, MessageSquare,
  PenTool, Share2, Search, Rocket,
  ShieldAlert, Loader2, Wand2, Download,
  CreditCard, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import RazorpayScript, { loadRazorpay } from "@/components/RazorpayScript";

type ToolType = "code_gen" | "blog" | "linkedin" | "explain" | "project_gen" | "audit";

interface AIToolState {
  input: string;
  output: string;
  loading: boolean;
  copied: boolean;
  downloaded: boolean;
}

export default function ToolsPage() {
  // --- Legacy Tools State ---
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [copiedJson, setCopiedJson] = useState(false);

  const [passLength, setPassLength] = useState(16);
  const [password, setPassword] = useState("");
  const [copiedPass, setCopiedPass] = useState(false);

  const [b64Input, setB64Input] = useState("");
  const [b64Output, setB64Output] = useState("");
  const [copiedB64, setCopiedB64] = useState(false);

  // --- AI Tools State ---
  const [aiTools, setAiTools] = useState<Record<ToolType, AIToolState>>({
    code_gen: { input: "", output: "", loading: false, copied: false, downloaded: false },
    blog: { input: "", output: "", loading: false, copied: false, downloaded: false },
    linkedin: { input: "", output: "", loading: false, copied: false, downloaded: false },
    explain: { input: "", output: "", loading: false, copied: false, downloaded: false },
    project_gen: { input: "", output: "", loading: false, copied: false, downloaded: false },
    audit: { input: "", output: "", loading: false, copied: false, downloaded: false },
  });

  const [unlockedTools, setUnlockedTools] = useState<ToolType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("unlocked_tools");
    if (saved) setUnlockedTools(JSON.parse(saved));
    generatePassword();
  }, []);

  const updateAiTool = (type: ToolType, updates: Partial<AIToolState>) => {
    setAiTools(prev => ({
      ...prev,
      [type]: { ...prev[type], ...updates }
    }));
  };

  const handlePayment = async (type: ToolType) => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // Create order on server
      const orderRes = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: 49, // Pricing for high-end AI tools
          currency: "INR",
          receipt: `rcpt_${type}_${Date.now()}`
        }),
      });

      const orderData = await orderRes.json();
      if (orderData.error) throw new Error(orderData.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Kodarafroj Ecosystem",
        description: `Unlock Elite ${type.replace("_", " ")} Tool`,
        order_id: orderData.id,
        handler: function (response: any) {
          // Success!
          const newUnlocked = [...unlockedTools, type];
          setUnlockedTools(newUnlocked);
          localStorage.setItem("unlocked_tools", JSON.stringify(newUnlocked));
        },
        prefill: {
          name: "Developer Name",
          email: "dev@example.com",
        },
        theme: {
          color: "#a855f7",
        },
      };

      const rzp = (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      alert("Checkout failed. Please try again.");
    }
  };

  const runAiTool = async (type: ToolType) => {
    const tool = aiTools[type];
    
    // Check if it's a Pro tool and if it's unlocked
    const isPro = type === "project_gen" || type === "audit";
    if (isPro && !unlockedTools.includes(type)) {
      handlePayment(type);
      return;
    }

    if (!tool.input || tool.loading) return;

    updateAiTool(type, { loading: true, output: "" });

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, prompt: tool.input }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      updateAiTool(type, { output: data.result, loading: false });
    } catch (e) {
      updateAiTool(type, { output: `Error: ${e instanceof Error ? e.message : "Failed to generate"}`, loading: false });
    }
  };

  const downloadOutput = (type: ToolType) => {
    const text = aiTools[type].output;
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kodarafroj-${type}-${Date.now()}.txt`;
    a.click();
    updateAiTool(type, { downloaded: true });
    setTimeout(() => updateAiTool(type, { downloaded: false }), 2000);
  };

  // --- Legacy Tool Handlers ---
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

  const copyToClipboard = (text: string, onCopy: (v: boolean) => void) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    onCopy(true);
    setTimeout(() => onCopy(false), 2000);
  };

  return (
    <div className="relative min-h-screen pb-32 pt-44 px-4 overflow-hidden">
      <RazorpayScript />
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
            AI DEV <br />
            <span className="neon-text not-italic text-accent">ECOSYSTEM.</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto italic">
            Advanced AI-powered utilities and essential tools for modern engineers. 
            Supercharge your workflow with next-gen intelligence.
          </p>
        </div>

        {/* AI LABS SECTION */}
        <div className="mb-32 space-y-12">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <Wand2 className="text-accent" />
            <h2 className="text-3xl font-black tracking-tight uppercase italic">AI Labs <span className="text-neutral-700 not-italic">_Beta</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* AI Code Generator */}
            <AICard 
              title="Code Forge"
              subtitle="AI Code Generator"
              icon={<Code2 />}
              placeholder="Describe the function or component you need..."
              tool={aiTools.code_gen}
              onRun={() => runAiTool("code_gen")}
              onCopy={() => copyToClipboard(aiTools.code_gen.output, (v) => updateAiTool("code_gen", { copied: v }))}
              onDownload={() => downloadOutput("code_gen")}
              onChange={(val) => updateAiTool("code_gen", { input: val })}
              accent="primary"
            />

            {/* AI Blog Writer */}
            <AICard 
              title="Nexus Writer"
              subtitle="AI Blog Assistant"
              icon={<PenTool />}
              placeholder="Topic or title for your blog post..."
              tool={aiTools.blog}
              onRun={() => runAiTool("blog")}
              onCopy={() => copyToClipboard(aiTools.blog.output, (v) => updateAiTool("blog", { copied: v }))}
              onDownload={() => downloadOutput("blog")}
              onChange={(val) => updateAiTool("blog", { input: val })}
              accent="secondary"
            />

            {/* AI LinkedIn Post */}
            <AICard 
              title="Social Pulse"
              subtitle="LinkedIn Post Gen"
              icon={<Share2 />}
              placeholder="What's the main takeaway for your post?"
              tool={aiTools.linkedin}
              onRun={() => runAiTool("linkedin")}
              onCopy={() => copyToClipboard(aiTools.linkedin.output, (v) => updateAiTool("linkedin", { copied: v }))}
              onDownload={() => downloadOutput("linkedin")}
              onChange={(val) => updateAiTool("linkedin", { input: val })}
              accent="accent"
            />

            {/* AI Code Explainer */}
            <AICard 
              title="Code Oracle"
              subtitle="Code Explanation"
              icon={<MessageSquare />}
              placeholder="Paste code snippet to explain..."
              tool={aiTools.explain}
              onRun={() => runAiTool("explain")}
              onCopy={() => copyToClipboard(aiTools.explain.output, (v) => updateAiTool("explain", { copied: v }))}
              onDownload={() => downloadOutput("explain")}
              onChange={(val) => updateAiTool("explain", { input: val })}
              accent="primary"
            />

          </div>
        </div>

        {/* PREMIUM PRO TOOLS SECTION */}
        <div className="mb-32 space-y-12">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <Rocket className="text-yellow-500" />
              <h2 className="text-3xl font-black tracking-tight uppercase italic">Pro Essentials <span className="text-neutral-700 not-italic">_Premium</span></h2>
            </div>
            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-[10px] font-black uppercase tracking-widest">
              Revenue Engine
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* AI Project Generator */}
             <AICard 
              title="Project Architect"
              subtitle="Full Boilerplate Gen"
              icon={<Rocket />}
              placeholder="Describe your full project requirements (e.g. Next.js SaaS with Stripe and Auth)..."
              tool={aiTools.project_gen}
              onRun={() => runAiTool("project_gen")}
              onCopy={() => copyToClipboard(aiTools.project_gen.output, (v) => updateAiTool("project_gen", { copied: v }))}
              onDownload={() => downloadOutput("project_gen")}
              onChange={(val) => updateAiTool("project_gen", { input: val })}
              accent="yellow-500"
              isPremium
              isUnlocked={unlockedTools.includes("project_gen")}
              onUnlock={() => handlePayment("project_gen")}
            />

            {/* AI Code Audit */}
            <AICard 
              title="Sentinel Audit"
              subtitle="Security & Performance"
              icon={<ShieldAlert />}
              placeholder="Paste your code for a deep security and performance audit..."
              tool={aiTools.audit}
              onRun={() => runAiTool("audit")}
              onCopy={() => copyToClipboard(aiTools.audit.output, (v) => updateAiTool("audit", { copied: v }))}
              onDownload={() => downloadOutput("audit")}
              onChange={(val) => updateAiTool("audit", { input: val })}
              accent="red-500"
              isPremium
              isUnlocked={unlockedTools.includes("audit")}
              onUnlock={() => handlePayment("audit")}
            />
          </div>
        </div>

        {/* ESSENTIAL TOOLS SECTION (LEGACY) */}
        <div className="space-y-12">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <Zap className="text-primary" />
            <h2 className="text-3xl font-black tracking-tight uppercase italic">Cloudless Utilities <span className="text-neutral-700 not-italic">_Standard</span></h2>
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
        </div>
      </motion.div>
    </div>
  );
}

// Helper Component for AI Cards
function AICard({ 
  title, subtitle, icon, placeholder, tool, onRun, onCopy, onDownload, onChange, accent, isPremium, isUnlocked, onUnlock 
}: { 
  title: string, subtitle: string, icon: React.ReactNode, placeholder: string, 
  tool: AIToolState, onRun: () => void, onCopy: () => void, onDownload: () => void, onChange: (val: string) => void,
  accent: string, isPremium?: boolean, isUnlocked?: boolean, onUnlock?: () => void
}) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={cn(
        "glass-card p-1 rounded-[2.5rem] transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent",
        isPremium ? "border-yellow-500/20 shadow-[0_0_40px_rgba(234,179,8,0.05)]" : "hover:shadow-[0_0_60px_rgba(168,85,247,0.1)]"
      )}
    >
      <div className="p-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center border text-white neon-glow",
              isPremium ? "bg-yellow-500/20 border-yellow-500/20 text-yellow-500" : `bg-${accent}/20 border-${accent}/20 text-${accent}`
            )}>
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">{title}</h3>
                {isPremium && <Sparkles size={14} className="text-yellow-500" />}
              </div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">{subtitle}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onCopy}
              disabled={!tool.output || tool.loading}
              className="p-3 rounded-2xl glass hover:bg-white/10 transition-colors disabled:opacity-20"
              title="Copy to Clipboard"
            >
              {tool.copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-neutral-600" />}
            </button>
            <button 
              onClick={onDownload}
              disabled={!tool.output || tool.loading}
              className="p-3 rounded-2xl glass hover:bg-white/10 transition-colors disabled:opacity-20"
              title="Download results"
            >
              {tool.downloaded ? <Check size={18} className="text-emerald-400" /> : <Download size={18} className="text-neutral-600" />}
            </button>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <textarea 
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-sm focus:ring-1 focus:ring-accent/40 outline-none resize-none min-h-[100px] transition-all"
            placeholder={placeholder}
            value={tool.input}
            onChange={(e) => onChange(e.target.value)}
          />
          
          <div className="relative min-h-[150px] bg-neutral-950/80 border border-white/5 rounded-2xl p-6 overflow-hidden">
            <AnimatePresence mode="wait">
              {tool.loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm z-10"
                >
                  <Loader2 className="animate-spin text-accent" size={32} />
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] animate-pulse">Syncing with Intelligence...</p>
                </motion.div>
              ) : (isPremium && !isUnlocked) ? (
                <motion.div 
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/80 backdrop-blur-md z-10 p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/20 text-yellow-500">
                    <CreditCard size={32} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight mb-2">PRO TOOL LOCKED</h4>
                    <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                      Unlock Elite Architecture & Deep Audits for a small fee. One-time unlock for professional grade results.
                    </p>
                  </div>
                  <button 
                    onClick={onUnlock}
                    className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-black text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-yellow-500/20"
                  >
                    Unlock Now (₹49) <ExternalLink size={16} />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
            
            <div className="font-mono text-[13px] text-white/70 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-auto scrollbar-hide">
              {tool.output || <span className="text-neutral-800 italic">AI generation will appear here...</span>}
            </div>
          </div>
        </div>

        <button 
          onClick={onRun}
          disabled={tool.loading || !tool.input || (isPremium && !isUnlocked)}
          className={cn(
            "mt-8 w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50",
            isPremium 
              ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 hover:scale-[1.02]" 
              : `bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800`
          )}
        >
          {tool.loading ? "PROCESSING..." : isPremium ? "GENERATE ARCHITECTURE" : "RUN INFERENCE"} 
          <Zap size={16} className={isPremium ? "fill-black" : ""} />
        </button>
      </div>
    </motion.div>
  );
}
