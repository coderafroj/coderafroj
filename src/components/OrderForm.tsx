"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Send, ArrowRight, ChevronLeft, Rocket, Sparkles, RefreshCw } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderForm({ isOpen, onClose }: OrderFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web App",
    description: "",
    budget: "Medium ($500 - $2000)",
  });

  const handleEnhance = async () => {
    if (!formData.description || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const response = await fetch("/api/ai/enhance-requirement", {
        method: "POST",
        body: JSON.stringify({ prompt: formData.description }),
      });
      const data = await response.json();
      if (data.enhanced) {
        setFormData({ ...formData, description: data.enhanced });
      }
    } catch (error) {
      console.error("Enhance error:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");
      await addDoc(collection(db, "orders"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Submission failed. Our servers might be busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = ["Web App", "Mobile App", "Desktop Software", "Automation Script", "AI Solution"];
  const budgets = ["Small (< $500)", "Medium ($500 - $2000)", "Large ($2k - $10k)", "Enterprise ($10k+)"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl glass-card p-1 rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-white/10 to-transparent"
          >
            <div className="bg-neutral-950 p-10 md:p-14 rounded-[3.3rem] relative">
              <button 
                onClick={onClose}
                className="absolute top-10 right-10 p-4 rounded-2xl glass hover:bg-white/10 transition-colors shadow-xl z-20"
              >
                <X size={24} className="text-neutral-500" />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative z-10">
                  <div className="mb-14 text-left space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                       <Rocket size={12} />
                       Step {step} of 2
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none italic mask-text">MANUFACTURE <br /> <span className="neon-text not-italic uppercase">SOFTWARE.</span></h2>
                    <p className="text-neutral-400 font-medium italic border-l-2 border-primary/20 pl-6">Briefly detail your architectural requirements.</p>
                  </div>

                  {step === 1 ? (
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 ml-2">ARCHITECT_NAME</label>
                          <input 
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:ring-2 focus:ring-primary/40 transition-all font-bold text-lg"
                            placeholder="Identify yourself"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 ml-2">COMMS_LINK</label>
                          <input 
                            required
                            type="email"
                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:ring-2 focus:ring-primary/40 transition-all font-bold text-lg"
                            placeholder="Email for dispatch"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 ml-2">PROJECT_VECTOR</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                           {projectTypes.map(t => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setFormData({...formData, projectType: t})}
                                className={cn(
                                   "py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                                   formData.projectType === t 
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                                    : "bg-white/5 border-white/5 text-neutral-500 hover:bg-white/10"
                                )}
                              >
                                 {t}
                              </button>
                           ))}
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.name || !formData.email}
                        className="w-full py-6 bg-white text-black font-black rounded-2xl hover:scale-[1.02] transition-all shadow-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-30 active:scale-95"
                      >
                        CONTINUE_SEQUENCE <ArrowRight size={22} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-10"
                    >
                       <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 ml-2">BUDGET_PROJECTION</label>
                        <div className="grid grid-cols-2 gap-3">
                           {budgets.map(b => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setFormData({...formData, budget: b})}
                                className={cn(
                                   "py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all text-left px-5",
                                   formData.budget === b 
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                                    : "bg-white/5 border-white/5 text-neutral-500 hover:bg-white/10"
                                )}
                              >
                                 {b}
                              </button>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-3 relative group/area">
                        <div className="flex items-center justify-between ml-2">
                           <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">MISSION_DETAILS</label>
                           <button 
                             type="button"
                             onClick={handleEnhance}
                             disabled={!formData.description || isEnhancing}
                             className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 px-3 py-1 rounded-full glass border-primary/20 hover:bg-primary/10 transition-all disabled:opacity-30"
                           >
                             {isEnhancing ? <RefreshCw size={10} className="animate-spin" /> : <Sparkles size={10} />}
                             {isEnhancing ? "ENHANCING..." : "AI_ENHANCE"}
                           </button>
                        </div>
                        <textarea 
                          required
                          className="w-full h-44 bg-black/40 border border-white/10 rounded-[2rem] px-8 py-6 outline-none focus:ring-2 focus:ring-primary/40 resize-none font-medium italic transition-all"
                          placeholder="What high-stakes problem are we solving?"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                      </div>

                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-20 py-6 glass rounded-2xl font-black hover:bg-white/10 transition-colors flex items-center justify-center active:scale-95"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          type="submit"
                          disabled={loading || !formData.description}
                          className="flex-1 py-6 bg-primary text-white font-black rounded-2xl hover:neon-glow transition-all shadow-2xl flex items-center justify-center gap-3 text-xl disabled:opacity-30 active:scale-95"
                        >
                          {loading ? "TRANSMITTING..." : "INITIATE_TASK"} <Send size={24} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              ) : (
                <div className="text-center py-16 space-y-10">
                   <div className="w-28 h-28 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto relative group">
                      <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse" />
                      <CheckCircle2 size={56} className="text-emerald-500 relative z-10" />
                   </div>
                   <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-black italic mask-text">TASK_ACCEPTED.</h2>
                      <p className="text-xl text-neutral-500 max-w-sm mx-auto italic font-medium leading-relaxed border-x-2 border-emerald-500/10 px-8">
                        Our engineering lab is processing your requirement. Expect a direct comms link within 24 standard hours.
                      </p>
                   </div>
                   <button 
                    onClick={onClose}
                    className="px-16 py-6 bg-white text-black font-black rounded-[2rem] hover:bg-emerald-400 hover:shadow-2xl transition-all uppercase tracking-[0.2em] shadow-xl text-sm"
                   >
                     CLOSE_SEQUENCE
                   </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
