"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Code2, Blocks, ShoppingCart, Wrench, 
  FileCode2, ArrowRight, Rocket 
} from "lucide-react";

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

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] -z-10" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full glass border-primary/30 text-primary text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          The Ultimate Developer Ecosystem
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Build Faster with <br />
          <span className="neon-text">Kodarafroj</span>
        </h1>
        
        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          From advanced embeddable widgets and premium code templates to <strong>custom enterprise software</strong> built to solve your unique business problems.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-order-form'))}
            className="px-8 py-4 rounded-full bg-primary text-white font-black hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]"
          >
            Build My Software <Rocket className="w-4 h-4" />
          </button>
          <Link 
            href="/widgets" 
            className="px-8 py-4 rounded-full glass font-semibold hover:bg-white/10 transition-colors"
          >
            Explore Widgets
          </Link>
        </div>
      </section>

      {/* Software Solutions Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative">
         <div className="absolute top-1/2 left-0 w-[500px] h-px bg-gradient-to-r from-primary to-transparent opacity-20" />
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="space-y-8"
            >
               <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
                  We build <br />
                  <span className="text-neutral-500 italic uppercase">Software</span> <br />
                  that solves <br />
                  <span className="neon-text">Problems.</span>
               </h2>
               <p className="text-xl text-neutral-400 leading-relaxed italic">
                  &quot;Kodarafroj isn&apos;t just a platform; it&apos;s a partner in your tech journey. 
                  Whether you need a simple script or a massive enterprise web app, our dev 
                  team delivers perfection.&quot;
               </p>
               <div className="flex flex-wrap gap-4">
                  {["Web Apps", "Mobile Apps", "Custom Tools", "API Integration", "AI Agents"].map(s => (
                     <div key={s} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-neutral-500">{s}</div>
                  ))}
               </div>
            </motion.div>
            <div className="relative">
               <div className="aspect-square glass rounded-[3rem] p-12 flex flex-col justify-center border-dashed border-primary/40 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <div className="relative z-10 text-center">
                     <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <Rocket size={40} className="text-primary" />
                     </div>
                     <h3 className="text-3xl font-bold mb-4">Start your Project</h3>
                     <p className="text-neutral-500 mb-8 italic">Get a production-ready MVP in as little as 1 week.</p>
                     <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-order-form'))}
                        className="w-full py-5 rounded-2xl bg-white text-black font-black hover:bg-neutral-200 transition-all"
                     >
                        Get a Quote
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">A complete ecosystem</h2>
          <p className="text-neutral-400">Everything from atomic components to complex custom systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              href={feature.href}
              className="group glass-card p-8 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${feature.color}`} />
              
              <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color} bg-opacity-10`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 max-w-3xl mx-auto text-center">
         <h2 className="text-4xl font-bold mb-6">Can&apos;t find what you need?</h2>
         <p className="text-neutral-400 mb-8 italic">We custom build any logic, API, or interface you can imagine.</p>
         <button 
           onClick={() => window.dispatchEvent(new CustomEvent('open-order-form'))}
           className="px-10 py-4 rounded-2xl bg-white text-black font-black hover:scale-105 transition-all shadow-2xl"
         >
           Contact Sales
         </button>
      </section>
    </div>
  );
}
