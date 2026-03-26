"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Code2, Blocks, ShoppingCart, Wrench, 
  FileCode2, ArrowRight, Rocket, Sparkles,
  ChevronRight, Laptop, Cpu, ShieldCheck, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Developer Tools",
    description: "Online coding tools, editors, and playgrounds to test and run your code instantly.",
    icon: Code2,
    href: "/tools",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Widget Generator",
    description: "Ready-to-use embeddable widgets (forms, galleries, popups) for your websites.",
    icon: Blocks,
    href: "/widgets",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Code Marketplace",
    description: "Premium UI templates, React components, and JS plugins ready for production.",
    icon: ShoppingCart,
    href: "/marketplace",
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "SaaS Utilities",
    description: "Powerful mini-tools like image processors, format converters, and code minifiers.",
    icon: Wrench,
    href: "/saas",
    color: "from-orange-400 to-red-500",
  },
  {
    title: "Free Resources",
    description: "Open-source snippets, CSS tricks, and UI components available for free.",
    icon: FileCode2,
    href: "/resources",
    color: "from-indigo-400 to-blue-600",
  },
];

const stats = [
  { label: "Active Users", value: "10K+", icon: Globe },
  { label: "Deployments", value: "50K+", icon: Rocket },
  { label: "Uptime", value: "99.9%", icon: ShieldCheck },
  { label: "Components", value: "200+", icon: Cpu },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-24">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px] -z-10" />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-44 md:pb-32 px-4 text-center max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 md:mb-10 rounded-full glass border border-white/10 text-primary text-xs md:text-sm font-bold tracking-wide"
        >
          <Sparkles className="w-4 h-4" />
          CODING THE FUTURE OF THE WEB
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight mb-6 md:mb-8 mask-text leading-[0.9]"
        >
          Build Faster <br />
          <span className="neon-text">Than Ever.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-neutral-400 mb-10 md:mb-16 max-w-3xl mx-auto leading-relaxed lg:px-12"
        >
          A premium ecosystem for modern developers. From high-performance <strong>SaaS utilities</strong> to custom enterprise solutions that scale worldwide.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-order-form'))}
            className="w-full sm:w-auto group px-10 py-5 rounded-2xl bg-white text-black font-black hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)]"
          >
            Start Your Project <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <Link 
            href="/widgets" 
            className="w-full sm:w-auto px-10 py-5 rounded-2xl glass font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group"
          >
            Explore Widgets <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Floating Demo Image / Video placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 50 }}
          className="mt-24 relative max-w-5xl mx-auto"
        >
           <div className="absolute inset-0 bg-primary/20 blur-[120px] -z-10 rounded-[3rem]" />
           <div className="aspect-video glass-card border-white/5 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="h-full w-full flex items-center justify-center">
                 <div className="text-center space-y-4">
                    <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                       <Laptop size={48} className="text-primary" />
                    </div>
                    <h3 className="text-3xl font-black italic mask-text">Kodarafroj Dashboard</h3>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm italic">Production Ready • Scalable • Secure</p>
                 </div>
              </div>
           </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2 p-6 md:p-8 glass-card border-white/[0.03]"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-4" />
              <div className="text-4xl font-black">{stat.value}</div>
              <div className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-[10px]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Software Solutions Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto relative">
         <div className="absolute top-1/2 left-0 w-[500px] h-px bg-gradient-to-r from-primary to-transparent opacity-20" />
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-10"
            >
               <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] md:leading-[0.8] italic">
                  WE BUILD <br />
                  <span className="text-neutral-700 uppercase not-italic">ENTERPRISE</span> <br />
                  <span className="neon-text not-italic uppercase">SOFTWARE.</span>
               </h2>
               <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed italic border-l-4 border-primary pl-6 md:pl-8">
                  &quot;Kodarafroj isn&apos;t just a platform; it&apos;s a strategic partner. 
                  We don&apos;t just write code; we architect solutions that dominate industries.&quot;
               </p>
               <div className="flex flex-wrap gap-3">
                  {["Next.js SSR", "Cloud Architecture", "AI Integration", "Real-time Systems", "Fintech"].map(s => (
                     <div key={s} className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-neutral-400">{s}</div>
                  ))}
               </div>
               <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-order-form'))}
                  className="px-10 py-5 rounded-2xl bg-primary text-white font-black hover:neon-glow transition-all flex items-center gap-2 group"
               >
                  Consult Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
            
            <div className="relative">
               <div className="aspect-video sm:aspect-square glass rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 flex flex-col justify-center border-dashed border-primary/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <div className="relative z-10 text-center space-y-8">
                     <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto animate-float">
                        <Cpu size={48} className="text-primary" />
                     </div>
                     <h3 className="text-4xl font-black tracking-tight">Need Custom Logic?</h3>
                     <p className="text-neutral-400 font-medium italic">Get a production-ready MVP in as little as 1 week.</p>
                     <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-order-form'))}
                        className="w-full py-6 rounded-2xl bg-white text-black font-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 text-lg"
                     >
                        Get a Free Quote <Code2 className="w-6 h-6" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">THE ECOSYSTEM.</h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto italic">Everything you need to build, deploy, and scale high-performance applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              href={feature.href}
              className="group glass-card p-10 hover:-translate-y-4 transition-all duration-500 relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${feature.color}`} />
              
              <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br ${feature.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-lg group-hover:text-neutral-300 transition-colors">
                {feature.description}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 uppercase text-xs tracking-widest">
                 Learn More <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 max-w-5xl mx-auto relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/10 blur-[150px] -z-10 rounded-full" />
         <div className="glass-card p-10 md:p-24 text-center border-white/5 space-y-10">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">
               LET&apos;S BUILD <br />
               SOMETHING <span className="neon-text uppercase">LEGENDARY.</span>
            </h2>
            <p className="text-2xl text-neutral-400 italic">No project is too complex. No idea is too ambitious.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-order-form'))}
                  className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white text-black font-black text-xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                >
                  Contact Sales
                </button>
                <Link href="/market" className="w-full sm:w-auto px-12 py-6 rounded-2xl glass font-black text-xl border-white/10 hover:bg-white/10 transition-all text-center">
                   View Marketplace
                </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
