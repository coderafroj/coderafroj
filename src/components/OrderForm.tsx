"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderForm({ isOpen, onClose }: OrderFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web App",
    description: "",
    budget: "Medium",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = ["Web App", "Mobile App", "Desktop Software", "Automation Script", "Custom Tool"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl glass-card p-1 rounded-[2.5rem] overflow-hidden"
          >
            <div className="bg-neutral-950 p-8 md:p-10 rounded-[2.3rem]">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black tracking-tighter mb-2">Order Custom Software</h2>
                    <p className="text-neutral-500 italic">Tell us your problem, we&apos;ll build the solution.</p>
                  </div>

                  {step === 1 ? (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Full Name</label>
                        <input 
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email Address</label>
                        <input 
                          required
                          type="email"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-primary hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                      >
                        Next Step
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Project Type</label>
                        <select 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                          value={formData.projectType}
                          onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        >
                          {projectTypes.map(t => <option key={t} value={t} className="bg-neutral-900">{t}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Project Description</label>
                        <textarea 
                          required
                          className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                          placeholder="Briefly describe what you need built..."
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                      </div>
                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 py-4 glass rounded-2xl font-bold hover:bg-white/5 transition-colors"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          disabled={loading}
                          className="flex-[2] py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] disabled:opacity-50"
                        >
                          {loading ? "Submitting..." : "Send Request"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              ) : (
                <div className="text-center py-10">
                   <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-500">
                      <CheckCircle2 size={40} />
                   </div>
                   <h2 className="text-3xl font-black mb-4">Order Received!</h2>
                   <p className="text-neutral-400 mb-8 max-w-xs mx-auto italic">
                      Our elite dev team will review your project and email you within 24 hours.
                   </p>
                   <button 
                    onClick={onClose}
                    className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-emerald-500 hover:text-white transition-all"
                   >
                     Done
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
