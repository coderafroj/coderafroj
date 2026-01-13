import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Shield, ArrowRight, Github, Sparkles } from 'lucide-react';
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
                        className="relative space-y-8"
                    >
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-primary/5 border border-primary/20 text-primary-glow text-[10px] font-mono tracking-[0.3em] uppercase backdrop-blur-md">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                            </span>
                            CODERAFROJ_SYSTEM_ACTIVE <span className="text-white/40 ml-2 font-black border-l border-white/10 pl-3">NODE_01</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.8] text-white uppercase italic">
                                Pushing <br />
                                <span className="text-primary-glow drop-shadow-[0_0_50px_rgba(47,129,247,0.4)] not-italic">Limits.</span>
                            </h1>
                            <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full" />
                        </div>

                        <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-light tracking-wide">
                            Architecting <span className="text-white font-bold">high-fidelity systems</span> with precision.
                            Specializing in full-stack engineering, secure cloud infrastructure, and
                            <span className="text-primary-glow font-medium"> hyper-optimized</span> digital experiences.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-6">
                            <Link to="/projects" className="w-full sm:w-auto">
                                <button className="group relative w-full px-12 py-5 bg-primary text-white rounded-2xl font-black tracking-tighter overflow-hidden transition-all hover:scale-[1.05] active:scale-95 shadow-[0_0_40px_rgba(47,129,247,0.3)]">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative z-10 flex items-center justify-center gap-3 text-sm uppercase">
                                        Launch Terminal <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                            <Link to="/github" className="w-full sm:w-auto">
                                <button className="px-12 py-5 obsidian-card rounded-2xl text-white font-black tracking-tighter transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-95 text-sm uppercase flex items-center justify-center gap-3">
                                    <Github size={20} /> Repository
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative flex justify-center"
                    >
                        {/* Image Container with Glows */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-1000 scale-110" />

                            <div className="relative z-10 p-2 rounded-full border-2 border-white/5 bg-white/5 backdrop-blur-3xl shadow-2xl">
                                <div className="relative overflow-hidden rounded-full w-72 h-72 md:w-[28rem] md:h-[28rem]">
                                    <img
                                        src={afu}
                                        alt="Afroj"
                                        className="w-full h-full object-cover brightness-75 contrast-125 saturate-[0.8] hover:saturate-100 hover:brightness-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent opacity-60" />

                                    {/* Scanning Effect Overlay */}
                                    <motion.div
                                        animate={{ y: ["-100%", "200%"] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 w-full h-[20%] bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none"
                                    />
                                </div>
                            </div>

                            {/* Floating Tech Widgets */}
                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-8 obsidian-card p-5 rounded-[2rem] shadow-2xl border-white/10 flex items-center gap-4 group/icon"
                            >
                                <div className="p-3 rounded-xl bg-primary/20 text-primary-glow group-hover/icon:scale-110 transition-transform">
                                    <Cpu size={28} />
                                </div>
                                <div className="space-y-1 pr-4">
                                    <p className="text-[8px] font-mono text-white/30 tracking-widest uppercase">System_Load</p>
                                    <p className="text-lg font-black text-white leading-none tracking-tighter">0.02ms</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-8 -left-8 obsidian-card p-5 rounded-[2rem] shadow-2xl border-white/10 flex items-center gap-4 group/icon"
                            >
                                <div className="p-3 rounded-xl bg-secondary/20 text-secondary-glow group-hover/icon:scale-110 transition-transform">
                                    <Terminal size={28} />
                                </div>
                                <div className="space-y-1 pr-4">
                                    <p className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Kernel_Ready</p>
                                    <p className="text-lg font-black text-white leading-none tracking-tighter text-secondary-glow">OK</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* GitHub Control Center Entry */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
                <div className="obsidian-card p-8 md:p-20 rounded-[3rem] border-white/5 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/10 transition-colors duration-1000" />

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
            {/* Coderafroj Database & Signals */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="obsidian-card p-12 rounded-[3.5rem] border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all group overflow-hidden relative"
                    >
                        <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/40 transition-all duration-1000" />
                        <div className="relative z-10 space-y-8">
                            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-glow shadow-inner border border-white/5">
                                <Code size={32} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
                                    CODERAFROJ <br /><span className="text-primary-glow">DATABASE</span>
                                </h2>
                                <p className="text-slate-400 font-light leading-relaxed max-w-sm">
                                    Deep-dive into the technical archives. Documentation, structural blueprints, and legacy knowledge bases.
                                </p>
                            </div>
                            <Link to="/notes" className="inline-flex items-center gap-4 text-primary-glow font-mono text-xs tracking-[0.4em] font-black group-hover:gap-8 transition-all duration-500">
                                INITIALIZE_FETCH <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="obsidian-card p-12 rounded-[3.5rem] border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-all group overflow-hidden relative"
                    >
                        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary/20 blur-[120px] rounded-full group-hover:bg-secondary/40 transition-all duration-1000" />
                        <div className="relative z-10 space-y-8 text-right flex flex-col items-end">
                            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary-glow shadow-inner border border-white/5">
                                <Sparkles size={32} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
                                    CORE <br /><span className="text-secondary-glow">SIGNALS</span>
                                </h2>
                                <p className="text-slate-400 font-light leading-relaxed max-w-sm">
                                    Live transmissions from the network. Real-time updates, system logs, and operator insights.
                                </p>
                            </div>
                            <Link to="/blog" className="inline-flex items-center gap-4 text-secondary-glow font-mono text-xs tracking-[0.4em] font-black group-hover:gap-8 transition-all duration-500">
                                <ArrowRight size={18} className="rotate-180" /> CONNECT_STREAM
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Cpu />, title: 'Core Logic', label: 'KERNEL', desc: 'Crafting complex algorithms with precision and mathematical elegance.' },
                        { icon: <Shield />, title: 'Secure Ops', label: 'PROTECT', desc: 'Implementing robust security protocols and decentralized architectures.' },
                        { icon: <Terminal />, title: 'Bare Metal', label: 'OPTIMIZE', desc: 'Performance optimization at the lowest system level for maximum efficiency.' }
                    ].map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="obsidian-card p-10 rounded-[2.5rem] border-white/5 group hover:border-primary/40 transition-all duration-500 hover:-translate-y-3"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-primary-glow group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl border border-white/5">
                                {feat.icon}
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-mono text-primary-glow tracking-[0.4em] uppercase">{feat.label}</p>
                                <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase italic">{feat.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">{feat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/5 blur-[150px] rounded-full" />

                {/* Floating Particles Simulation */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.1, y: Math.random() * 1000 }}
                        animate={{
                            y: [null, -500],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 20
                        }}
                        className="absolute w-1 h-1 bg-primary/40 rounded-full"
                        style={{ left: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

