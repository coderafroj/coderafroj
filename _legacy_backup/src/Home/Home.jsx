import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Terminal, Code, Cpu, Shield, ArrowRight, BookOpen,
  Sparkles, Zap, Smartphone, Globe, Layers, Activity,
  Search, Command, Box, ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { computerNotes } from '../data/computerNotes';
import SolutionGrid from '../components/home/SolutionGrid';
import Hero3D from '../assets/hero-3d-core.png';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // SaaS-style mock data for "Products"
  const masterclassProducts = computerNotes?.slice(0, 6).map(note => ({
    ...note,
    metric: `${Math.floor(Math.random() * 20) + 80}% Efficiency`,
    icon: note.id % 2 === 0 ? <Cpu size={32} /> : <Zap size={32} />,
    tags: [...note.tags, 'Elite']
  })) || [];

  const [systemLoad, setSystemLoad] = useState(0.04);
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => +(prev + (Math.random() * 0.02 - 0.01)).toFixed(3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030014] selection:bg-primary/30 overflow-hidden">
      {/* SaaS Background Matrix */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 coderafroj-grid opacity-20" />
        <div className="absolute inset-0 bg-[#030014]/60 backdrop-blur-[2px]" />
      </div>

      {/* Kinetic Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <motion.div style={{ opacity }} className="max-w-7xl w-full text-center space-y-12">
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="solution-badge"
            >
              <Activity size={12} className="text-primary animate-pulse" />
              <span>System Protocol Alpha v4.2</span>
            </motion.div>

            <h1 className="text-6xl md:text-[9rem] kinetic-text flex flex-col items-center">
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Problem
              </motion.span>
              <motion.span
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-primary-glow italic"
              >
                Solved.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed"
            >
              The global repository for <span className="text-white font-bold">Elite Masterclasses</span>.
              Architectural precision meets high-speed knowledge injection.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/notes">
              <button className="px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-primary hover:text-white transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-primary/50">
                Enter Registry
              </button>
            </Link>
            <Link to="/github">
              <button className="flex items-center gap-3 text-white font-bold uppercase text-[10px] tracking-widest group">
                <span className="opacity-40 group-hover:opacity-100 transition-opacity">Fetch Latest Data</span>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Command size={14} />
                </div>
              </button>
            </Link>
          </motion.div>

          {/* Performance Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-24 border-t border-white/5">
            {[
              { label: 'Latency', val: '0.04ms', icon: <Activity size={14} /> },
              { label: 'Load Factor', val: systemLoad, icon: <Activity size={14} /> },
              { label: 'Uptime', val: '99.98%', icon: <Activity size={14} /> }
            ].map((w, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-3 text-slate-500">
                  {w.icon}
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{w.label}</span>
                </div>
                <span className="text-sm font-black text-white italic">{w.val}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Problem Solver Engine Grid */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="space-y-4 mb-20 text-center md:text-left">
          <div className="solution-badge mx-auto md:mx-0">
            <Box size={12} />
            <span>The Registry</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-white">
            Global <span className="text-primary-glow">Solutions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl font-light">
            Every module is a product designed to solve complex architectural problems.
            Simplified for the next generation of engineers.
          </p>
        </div>

        <SolutionGrid items={masterclassProducts} />

        <div className="flex justify-center mt-12">
          <Link to="/tutorials" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors">
            Explore Full Library <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* GitHub Live Protocol */}
      <section className="relative z-10 py-32 bg-black/40 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="glass-pill text-sky-500">
              <Activity size={14} />
              <span>GitHub Sync Engine</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] text-white">
              Zero Database.<br />
              <span className="text-primary-glow">Zero Friction.</span>
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              Content is pushed directly from our secure repository.
              Your knowledge base scales with every commit, delivered over high-speed protocols.
            </p>
            <div className="flex gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[8px] font-mono text-slate-500 uppercase mb-2">Sync Status</p>
                <p className="text-lg font-black text-sky-500 italic">OPTIMAL</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-[8px] font-mono text-slate-500 uppercase mb-2">Data Integrity</p>
                <p className="text-lg font-black text-primary italic">SECURED</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
            <div className="saas-card !p-0 overflow-hidden border-primary/20">
              <div className="bg-white/5 p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[9px] font-mono text-slate-500">github_protocol.sh</span>
              </div>
              <div className="p-6 font-mono text-[10px] sm:text-xs text-sky-400/80 space-y-2 leading-relaxed h-[250px] overflow-y-auto no-scrollbar">
                <p className="text-slate-500"># Initializing elite fetch...</p>
                <p><span className="text-slate-500">λ</span> git pull origin masterclass</p>
                <p>Updating 3e0632e..ac6373e</p>
                <p className="text-green-400">Successfully fetched: python_advanced.json</p>
                <p className="text-green-400">Successfully fetched: neural_networks_core.md</p>
                <p className="text-slate-500">λ injection completed in 0.042ms</p>
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-4 bg-primary/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer SaaS Preview */}
      <footer className="relative z-10 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
            The Nairobi Protocol // 2026
          </p>
          <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-tight hero-gradient-text tracking-tighter">
            Building the future, one commit at a time.
          </h2>
          <div className="pt-12">
            <p className="text-slate-700 text-[10px] font-mono uppercase tracking-widest">
              Built with Modern Tech by CoderAfroj Agentic Intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
