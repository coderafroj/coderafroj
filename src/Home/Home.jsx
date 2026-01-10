import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import afu from '../assets/AFROJ.jpg';

export default function Home() {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-glow text-[10px] font-mono tracking-[0.2em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Nexus Protocol Active
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              BUILD THE <br />
              <span className="text-cyber-blue drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]">FUTURE.</span>
            </h1>

            <p className="text-lg text-dim-text max-w-lg leading-relaxed font-light">
              Professional software engineering for the modern age. Developing high-performance systems and decentralized digital architectures.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/projects">
                <button className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-bold tracking-tighter overflow-hidden transition-all hover:scale-[1.05] active:scale-[0.98]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center gap-2 text-sm uppercase">View Protocols <ArrowRight size={18} /></span>
                </button>
              </Link>
              <Link to="/tutorials">
                <button className="px-8 py-4 obsidian-card rounded-2xl text-white font-bold tracking-tighter transition-all hover:border-white/20 hover:scale-[1.05] text-sm uppercase">
                  Access Archive
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/5">
              {[
                { label: 'CORES', val: '04' },
                { label: 'LATENCY', val: '12ms' },
                { label: 'UPTIME', val: '99.9%' }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase">{stat.label}</p>
                  <p className="text-xl font-bold text-white tracking-tighter">{stat.val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 obsidian-card p-4 rounded-[3rem] border-white/10 shadow-2xl">
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-square">
                <img src={afu} alt="Afroj" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
              </div>

              {/* Floating Tech Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 obsidian-card p-4 rounded-2xl shadow-xl shadow-primary/20 border-primary/20"
              >
                <Cpu className="text-primary-glow" size={24} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 obsidian-card p-4 rounded-2xl shadow-xl shadow-secondary/20 border-secondary/20"
              >
                <Terminal className="text-secondary-glow" size={24} />
              </motion.div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[120px] rounded-full -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Code />, title: 'Advanced Logic', desc: 'Crafting complex algorithms with precision and mathematical elegance.' },
            { icon: <Shield />, title: 'High Security', desc: 'Implementing robust security protocols and decentralized architectures.' },
            { icon: <Terminal />, title: 'Bare Metal', desc: 'Optimizing systems at the lowest level for maximum efficiency.' }
          ].map((feat, i) => (
            <div key={i} className="obsidian-card p-8 rounded-3xl border-white/5 group hover:border-primary/30 transition-all hover:-translate-y-2">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-primary-glow group-hover:bg-primary group-hover:text-white transition-all">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{feat.title}</h3>
              <p className="text-sm text-dim-text leading-relaxed font-light">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

