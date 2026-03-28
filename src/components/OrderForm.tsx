"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, CheckCircle2, Send, ArrowRight, ChevronLeft, 
  Rocket, Sparkles, RefreshCw, CreditCard, ShieldCheck,
  Zap, Globe, Smartphone, Monitor, Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { loadRazorpay } from "@/components/RazorpayScript";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  { id: "Web App", icon: Globe, label: "Web Application" },
  { id: "Mobile App", icon: Smartphone, label: "Mobile Application" },
  { id: "Desktop Software", icon: Monitor, label: "Desktop Software" },
  { id: "Automation Script", icon: Zap, label: "Automation Script" },
  { id: "AI Solution", icon: Cpu, label: "AI & Machine Learning" },
];

const budgets = ["< $500", "$500 - $2,000", "$2,000 - $10,000", "$10,000+"];

export default function OrderForm({ isOpen, onClose }: OrderFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web App",
    description: "",
    budget: "$500 - $2,000",
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

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99, currency: "INR" }) // ₹99 commitment fee
      });
      
      const order = await res.json();
      const rzp = await loadRazorpay();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Kodarafroj Ecosystem",
        description: "Software Engineering Commitment Fee",
        order_id: order.id,
        handler: async (response: any) => {
          setPaymentDone(true);
          await finalSubmit();
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: { color: "#8B5CF6" },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const finalSubmit = async () => {
    setLoading(true);
    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");
      await addDoc(collection(db, "orders"), {
        ...formData,
        status: "paid_commitment",
        paidAmount: 99,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="relative w-full max-w-4xl h-full md:h-auto max-h-[90vh] bg-neutral-900 md:rounded-[3rem] border border-white/5 flex flex-col overflow-hidden shadow-[0_0_100px_-20px_rgba(139,92,246,0.2)]"
          >
            {/* Header Area */}
            <div className="p-8 md:p-12 pb-6 border-b border-white/5 flex items-start justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                  <Rocket size={12} /> Step {step} of 3
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-none">
                  MANUFACTURE <span className="text-primary not-italic">SOFTWARE.</span>
                </h2>
                <p className="text-sm text-white/40 font-medium">Expert architectural assessment for your next big project.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X size={20} className="text-white/40" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 pt-10 custom-scrollbar">
              {!submitted ? (
                <div className="max-w-2xl mx-auto w-full">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">CLIENT_IDENTITY</label>
                          <input 
                            required
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all font-bold text-lg"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">COMMS_LINK</label>
                          <input 
                            required
                            type="email"
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all font-bold text-lg"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">PROJECT_VECTOR</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                           {projectTypes.map(t => (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => setFormData({...formData, projectType: t.id})}
                                className={cn(
                                   "p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all",
                                   formData.projectType === t.id 
                                    ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" 
                                    : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10 hover:border-white/10"
                                )}
                              >
                                 <t.icon size={24} />
                                 <span className="text-[10px] font-black uppercase tracking-tighter">{t.label}</span>
                              </button>
                           ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => setStep(2)}
                        disabled={!formData.name || !formData.email}
                        className="w-full py-6 bg-white text-black font-black rounded-[2rem] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-20 active:scale-95 shadow-2xl"
                      >
                        CONTINUE_SEQUENCE <ArrowRight size={22} />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">BUDGET_PROJECTION</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                           {budgets.map(b => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setFormData({...formData, budget: b})}
                                className={cn(
                                   "py-3 rounded-2xl border text-[11px] font-black transition-all",
                                   formData.budget === b 
                                    ? "bg-primary border-primary text-white shadow-lg" 
                                    : "bg-white/5 border-white/5 text-white/30 hover:bg-white/10"
                                )}
                              >
                                 {b}
                              </button>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-4 relative group/area">
                        <div className="flex items-center justify-between ml-1">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/30">MISSION_DETAILS</label>
                           <button 
                             type="button"
                             onClick={handleEnhance}
                             disabled={!formData.description || isEnhancing}
                             className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all disabled:opacity-30"
                           >
                             {isEnhancing ? <RefreshCw size={10} className="animate-spin" /> : <Sparkles size={10} />}
                             {isEnhancing ? "ENHANCING..." : "AI_OPTIMIZE"}
                           </button>
                        </div>
                        <textarea 
                          required
                          className="w-full h-48 bg-white/[0.03] border border-white/5 rounded-[2.5rem] px-8 py-6 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 resize-none font-medium italic transition-all text-lg leading-relaxed placeholder:text-white/10"
                          placeholder="What engineering marvel are we building?"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => setStep(1)}
                          className="w-20 py-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={() => setStep(3)}
                          disabled={!formData.description}
                          className="flex-1 py-6 bg-white text-black font-black rounded-[2rem] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-20 active:scale-95 shadow-2xl"
                        >
                          PROCEED_TO_QUEUE <ArrowRight size={22} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-10"
                    >
                      <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                           <ShieldCheck size={120} className="text-primary" />
                        </div>

                        <div className="space-y-2 relative z-10">
                           <h3 className="text-2xl font-black italic">QUEUE_COMMITMENT</h3>
                           <p className="text-sm text-white/40 max-w-md">
                             To maintain the highest quality of service and prevent spam, we require a small engineering commitment fee. This amount will be credited back if your project is accepted.
                           </p>
                        </div>

                        <div className="flex items-end gap-3 py-6 border-y border-white/5">
                           <span className="text-5xl font-black text-white italic">₹99</span>
                           <span className="text-white/30 mb-2 font-bold uppercase tracking-widest text-[10px]">One-time fee</span>
                        </div>

                        <div className="space-y-3">
                           <div className="flex items-center gap-3 text-[11px] font-bold text-white/40">
                              <CheckCircle2 size={14} className="text-emerald-500" /> Professional Code Audit Included
                           </div>
                           <div className="flex items-center gap-3 text-[11px] font-bold text-white/40">
                              <CheckCircle2 size={14} className="text-emerald-500" /> Direct Engineer Access
                           </div>
                           <div className="flex items-center gap-3 text-[11px] font-bold text-white/40">
                              <CheckCircle2 size={14} className="text-emerald-500" /> Secure Payments by Razorpay
                           </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => setStep(2)}
                          className="w-20 py-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={handlePayment}
                          disabled={loading}
                          className="flex-1 py-6 bg-primary text-white font-black rounded-[2rem] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg active:scale-95 shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)]"
                        >
                          {loading ? "PROCESSING..." : "UNLOCK_QUEUE"} <CreditCard size={22} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 space-y-10 flex flex-col items-center">
                   <div className="w-32 h-32 rounded-[3.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20" />
                      <CheckCircle2 size={64} className="text-emerald-500 relative z-10" />
                   </div>
                   <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter">PROJECT_ENLISTED.</h2>
                      <p className="text-sm text-white/40 max-w-sm mx-auto font-medium leading-relaxed italic">
                        Your architectural request has been prioritized in our labs. A senior engineer will initiate direct comms within 24 standard hours.
                      </p>
                   </div>
                   <button 
                    onClick={onClose}
                    className="px-12 py-6 bg-white text-black font-black rounded-[2rem] hover:bg-neutral-200 transition-all uppercase tracking-widest text-xs shadow-2xl active:scale-95"
                   >
                     RETURN_TO_DASHBOARD
                   </button>
                </div>
              )}
            </div>

            {/* Footer Area - Branding */}
            <div className="p-8 border-t border-white/5 flex items-center justify-between bg-black/40">
               <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">KODARAFROJ ENGINEERING LABS</span>
               </div>
               <div className="flex items-center gap-4 opacity-10">
                  <Rocket size={16} />
                  <ShieldCheck size={16} />
                  <Zap size={16} />
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
