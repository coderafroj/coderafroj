"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, CheckCircle2, ArrowRight, ChevronLeft, 
  Sparkles, RefreshCw, CreditCard, ShieldCheck,
  Globe, Smartphone, Monitor, Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { loadRazorpay } from "@/components/RazorpayScript";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  { id: "Web App", icon: Globe, label: "Web Application" },
  { id: "Mobile App", icon: Smartphone, label: "Mobile App" },
  { id: "Desktop", icon: Monitor, label: "Desktop Software" },
  { id: "AI Integration", icon: Cpu, label: "AI & ML" },
];

const budgets = ["<$5k", "$5k-$20k", "$20k-$50k", "$50k+"];

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
    budget: "$5k-$20k",
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

  const finalSubmit = async () => {
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
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99, currency: "INR" }) 
      });
      
      const order = await res.json();
      const rzp = await loadRazorpay();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Kodarafroj",
        description: "Project Onboarding Fee",
        order_id: order.id,
        handler: async (response: any) => {
          await finalSubmit();
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: { color: "#171717" },
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/60">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="relative w-full max-w-3xl max-h-[95vh] bg-neutral-950/90 backdrop-blur-2xl rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header Area */}
            <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white tracking-tight">Project Requirements</h2>
                <p className="text-sm text-neutral-400 mt-1">Provide details so we can assess your vision.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {!submitted ? (
                <div className="max-w-2xl mx-auto w-full">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-300">Full Name</label>
                          <input 
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-white placeholder:text-neutral-600"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-300">Email Address</label>
                          <input 
                            required
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-white placeholder:text-neutral-600"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-neutral-300">Project Type</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                           {projectTypes.map(t => (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => setFormData({...formData, projectType: t.id})}
                                className={cn(
                                   "p-4 rounded-xl border flex flex-col items-center gap-3 transition-all",
                                   formData.projectType === t.id 
                                    ? "bg-white text-black border-white shadow-md shadow-white/10" 
                                    : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                                )}
                              >
                                 <t.icon size={20} className={formData.projectType === t.id ? "text-primary" : ""} />
                                 <span className="text-xs font-semibold">{t.label}</span>
                              </button>
                           ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => setStep(2)}
                        disabled={!formData.name || !formData.email}
                        className="w-full mt-4 py-4 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        Continue <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-neutral-300">Estimated Budget</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                           {budgets.map(b => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setFormData({...formData, budget: b})}
                                className={cn(
                                   "py-3 rounded-xl border text-sm font-semibold transition-all",
                                   formData.budget === b 
                                    ? "bg-white border-white text-black" 
                                    : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                                )}
                              >
                                 {b}
                              </button>
                           ))}
                        </div>
                      </div>

                      <div className="space-y-3 group">
                        <div className="flex items-center justify-between">
                           <label className="text-sm font-medium text-neutral-300">Project Description</label>
                           <button 
                             type="button"
                             onClick={handleEnhance}
                             disabled={!formData.description || isEnhancing}
                             className="text-xs font-medium text-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all disabled:opacity-50"
                           >
                             {isEnhancing ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                             {isEnhancing ? "Enhancing..." : "Improve with AI"}
                           </button>
                        </div>
                        <textarea 
                          required
                          className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none font-medium transition-all text-white placeholder:text-neutral-600"
                          placeholder="Briefly describe your software needs..."
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                      </div>

                      <div className="flex gap-3">
                        <button 
                          onClick={() => setStep(1)}
                          className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-neutral-300"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={() => setStep(3)}
                          disabled={!formData.description}
                          className="flex-1 py-4 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          Review & Submit <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                           <ShieldCheck size={100} className="text-white" />
                        </div>

                        <div className="space-y-1 relative z-10">
                           <h3 className="text-xl font-semibold text-white">Commitment Fee</h3>
                           <p className="text-sm text-neutral-400 max-w-sm">
                             To ensure quality service, we require a small onboarding fee. This secures your priority queue slot.
                           </p>
                        </div>

                        <div className="flex items-end gap-2 py-4 border-y border-white/10">
                           <span className="text-4xl font-bold text-white">₹99</span>
                           <span className="text-neutral-400 mb-1 text-sm font-medium">One-time</span>
                        </div>

                        <div className="space-y-3">
                           <div className="flex items-center gap-3 text-sm font-medium text-neutral-300">
                              <CheckCircle2 size={16} className="text-primary" /> Senior Engineer Assessment
                           </div>
                           <div className="flex items-center gap-3 text-sm font-medium text-neutral-300">
                              <CheckCircle2 size={16} className="text-primary" /> Priority Queue Access
                           </div>
                           <div className="flex items-center gap-3 text-sm font-medium text-neutral-300">
                              <CheckCircle2 size={16} className="text-primary" /> Secure Razorpay Checkout
                           </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button 
                          onClick={() => setStep(2)}
                          className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-neutral-300"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={handlePayment}
                          disabled={loading}
                          className="flex-1 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                          {loading ? "Initializing..." : "Complete Payment"} <CreditCard size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 space-y-8 flex flex-col items-center">
                   <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <CheckCircle2 size={40} className="text-primary" />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white tracking-tight">Request Received</h2>
                      <p className="text-neutral-400 max-w-sm mx-auto text-sm leading-relaxed">
                        We've prioritized your project. One of our senior architects will reach out within 24 hours to discuss the plan.
                      </p>
                   </div>
                   <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all text-sm"
                   >
                     Close Window
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
