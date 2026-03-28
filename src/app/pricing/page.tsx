"use client";

import { motion } from "framer-motion";
import { 
  Check, Sparkles, Zap, Rocket, 
  ShieldCheck, ArrowRight, Cpu, Star,
  Code2, Terminal, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { loadRazorpay } from "@/components/RazorpayScript";

const plans = [
  {
    name: "Architect",
    price: "0",
    desc: "Perfect for exploring the ecosystem.",
    features: [
      "Access to standard Tools",
      "Community Support",
      "Basic Widgets",
      "No AI Credits"
    ],
    buttonText: "CURRENT_PLAN",
    premium: false
  },
  {
    name: "Elite Pro",
    price: "29",
    desc: "The ultimate power for serious developers.",
    features: [
      "Unlimited AI Architect calls",
      "Premium Widget Library",
      "Priority API Access",
      "Private Discord Channel",
      "90% Revenue Share on Market"
    ],
    buttonText: "UPGRADE_NOW",
    premium: true,
    accent: "from-primary to-secondary"
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Dedicated infrastructure for large teams.",
    features: [
      "White-label solutions",
      "Custom Widget Design",
      "SLA Guarantees",
      "Direct Dev Support",
      "Unlimited Everything"
    ],
    buttonText: "CONTACT_TEAM",
    premium: false
  }
];

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePayment = async (plan: typeof plans[0]) => {
    if (plan.price === "0") {
      alert("You are already on the current plan.");
      return;
    }
    if (plan.price === "Custom") {
      window.location.href = "mailto:enterprise@kodarafroj.com";
      return;
    }

    setLoadingPlan(plan.name);
    try {
      const res = await fetch("/api/payments/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseInt(plan.price), currency: "USD" })
      });
      
      const order = await res.json();
      const rzp = await loadRazorpay();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Kodarafroj Ecosystem",
        description: `Upgrade to ${plan.name}`,
        order_id: order.id,
        handler: async (response: any) => {
          alert(`Success! Upgraded to ${plan.name} plan.`);
        },
        theme: { color: "#8B5CF6" },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="relative min-h-screen pb-32 pt-44 px-4 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
             <Zap size={14} className="animate-pulse" />
             SUBSCRIPTION_TIERS
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic mask-text">
            CHOOSE YOUR <br /> <span className="neon-text not-italic uppercase">VELOCITY.</span>
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium italic border-x border-primary/20 px-12">
             Select the operational bandwidth that matches your vision. 
             Precision performance at every level.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className={cn(
                "glass-card p-1 rounded-[3rem] transition-all duration-500 flex flex-col",
                plan.premium ? "bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_60px_rgba(168,85,247,0.1)]" : "bg-white/[0.01]"
              )}
            >
              <div className="p-10 md:p-12 flex-1 flex flex-col">
                <div className="mb-10">
                   <h3 className="text-2xl font-black tracking-tight mb-2 italic">{plan.name}</h3>
                   <p className="text-sm text-neutral-500 italic font-medium">{plan.desc}</p>
                </div>

                <div className="mb-12 flex items-baseline gap-1">
                   <span className="text-5xl font-black tracking-tighter">
                      {plan.price !== "Custom" && "$"}
                      {plan.price}
                   </span>
                   {plan.price !== "Custom" && <span className="text-neutral-500 font-bold uppercase text-[10px] tracking-widest">/mo</span>}
                </div>

                <div className="space-y-5 mb-12 flex-1">
                   {plan.features.map(feature => (
                      <div key={feature} className="flex items-center gap-3">
                         <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Check size={12} className="text-emerald-500" />
                         </div>
                         <span className="text-sm text-neutral-400 font-medium italic">{feature}</span>
                      </div>
                   ))}
                </div>

                <button 
                  onClick={() => handlePayment(plan)}
                  disabled={loadingPlan === plan.name}
                  className={cn(
                    "w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2",
                    plan.premium 
                      ? "bg-primary text-white hover:neon-glow" 
                      : "bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10",
                    loadingPlan === plan.name && "opacity-70 cursor-wait"
                  )}
                >
                  {loadingPlan === plan.name ? "PROCESSING..." : plan.buttonText} <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/10">
                 <ShieldCheck size={24} className="text-primary" />
              </div>
              <h4 className="text-xl font-black italic">ULTRA_SECURE</h4>
              <p className="text-sm text-neutral-500 italic leading-relaxed">Enterprise-grade encryption for all neural communications and payloads.</p>
           </div>
           <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/10">
                 <Cpu size={24} className="text-secondary" />
              </div>
              <h4 className="text-xl font-black italic">NEURAL_POWER</h4>
              <p className="text-sm text-neutral-500 italic leading-relaxed">Powered by the latest LLM architectures optimized for software design.</p>
           </div>
           <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/10">
                 <Layers size={24} className="text-accent" />
              </div>
              <h4 className="text-xl font-black italic">MODULAR_STACK</h4>
              <p className="text-sm text-neutral-500 italic leading-relaxed">Every generated architectural pattern is industry-standard and ready to fly.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
