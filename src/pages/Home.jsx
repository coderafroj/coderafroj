import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Shield, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import afu from '../assets/AFROJ.jpg';

const Home = () => {
    return (
        <div className="relative min-h-screen pt-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary-glow text-[10px] font-mono tracking-[0.2em] uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            CODERAFROJ SYSTEM <span className="text-white/40 ml-1">v2.0.4-LTS</span>
                        </div>

                        <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85] text-white">
                            WELCOME TO <br />
                            <span className="text-primary drop-shadow-[0_0_40px_rgba(47,129,247,0.3)]">CODERAFROJ.</span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-light">
                            High-fidelity software engineering. Architecting scalable digital systems with a focus on <span className="text-white font-medium">performance, security, and elegant user experience.</span>
                        </p>

                        <div className="flex flex-wrap gap-5 pt-6">
                            <Link to="/projects" className="w-full sm:w-auto">
                                <button className="btn-cyber group relative w-full px-10 py-5 text-white rounded-xl font-bold tracking-tighter overflow-hidden transition-all hover:scale-[1.02] shadow-2xl shadow-primary/20">
                                    <span className="relative z-10 flex items-center justify-center gap-3 text-sm uppercase font-black">
                                        Initialize Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                            <Link to="/github" className="w-full sm:w-auto">
                                <button className="px-10 py-5 obsidian-card rounded-xl text-white font-bold tracking-tighter transition-all hover:border-white/20 hover:scale-[1.02] text-sm uppercase flex items-center justify-center gap-3">
                                    <Github size={18} /> Mission Control
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

            {/* GitHub Control Center Entry */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-[#30363d]/50">
                <div className="obsidian-card p-8 md:p-16 rounded-[2.5rem] border-[#30363d]/50 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/10 transition-colors" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-grow space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent-glow text-[10px] font-mono tracking-widest uppercase">
                                <Github size={12} /> Remote Sync Integration
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                                GITHUB <span className="text-primary italic">MISSION</span> CONTROL
                            </h2>
                            <p className="text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                                Seamlessly manage your repositories, monitor live deployments, and push code directly from the Coderafroj dashboard.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
                                <Link to="/github" className="w-full sm:w-auto">
                                    <button className="group relative w-full px-12 py-5 bg-white text-black rounded-xl font-black tracking-tighter overflow-hidden transition-all hover:bg-primary hover:text-white active:scale-[0.98] flex items-center justify-center gap-4">
                                        <Github size={22} />
                                        <span className="text-sm uppercase tracking-tight">Access Mission Control</span>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="w-full lg:w-[40%] aspect-video md:aspect-square obsidian-card rounded-[2rem] border-[#30363d]/50 flex items-center justify-center relative overflow-hidden group/icon">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-30 group-hover/icon:opacity-60 transition-opacity" />
                            <div className="relative z-10 grid grid-cols-2 gap-4 p-8 w-full h-full">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                                        <div className="w-12 h-1 h-2 bg-white/10 rounded-full" />
                                    </div>
                                ))}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Github size={100} className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] group-hover/icon:scale-110 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Preview */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
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
};

export default Home;

