import React from 'react';
import { motion } from 'framer-motion';
import {
    Terminal, Code, Cpu, Shield, ArrowRight, Github,
    Sparkles, BookOpen, Zap, Globe, Layers, Database,
    Play, Activity, Radio, Lock, Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import afu from '../assets/AFROJ.jpg';
import { staticNotes } from '../data/computerNotes';

const Home = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/notes?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#02040a] selection:bg-primary/30 selection:text-white overflow-hidden">
            {/* 3D Background System */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
                <div className="coderafroj-grid coderafroj-grid-pulse opacity-20" />
            </div>

            {/* Hero Section: The Portal */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-48 md:pb-32">
                <div className="flex flex-col items-center text-center space-y-12">
                    {/* Status Transmission */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <div className="status-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-glow">Central_System_Online</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 max-w-5xl"
                    >
                        <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase italic text-white">
                            Learn. Build. <br />
                            <span className="text-primary-glow not-italic drop-shadow-[0_0_80px_rgba(47,129,247,0.5)]">Evolve.</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
                            Experience the next generation of <span className="text-white font-bold uppercase italic">Cyber-Learning</span>.
                            Master full-stack systems with professional depth.
                        </p>
                    </motion.div>

                    {/* Integrated Search Command */}
                    <motion.form
                        onSubmit={handleSearch}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full max-w-2xl group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-[#0d1117]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 pr-4 shadow-2xl focus-within:border-primary/50 transition-all">
                            <div className="pl-6 text-slate-500">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Knowledge Base (e.g. Von Neumann, Architecture...)"
                                className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-white placeholder-slate-600 font-mono text-sm tracking-widest"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white/5 border border-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                            >
                                Execute
                            </button>
                        </div>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <Link to="/tutorials">
                            <button className="group relative px-12 py-6 bg-primary text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center gap-3">
                                    Start Learning <Play size={18} fill="currentColor" />
                                </span>
                            </button>
                        </Link>
                        <Link to="/github">
                            <button className="relative group px-12 py-6 obsidian-card rounded-[2rem] text-white font-black text-sm uppercase tracking-[0.2em] transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-95 flex items-center gap-3 overflow-hidden shadow-2xl">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <Github size={20} className="text-primary-glow" />
                                </motion.div>
                                Connect Core
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Knowledge Hub: Featured Modules (3D Section) */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 text-primary-glow font-mono text-[10px] uppercase tracking-[0.4em]">
                            <Layers size={14} /> Knowledge_Architecture
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none italic">
                            Learning <span className="text-slate-500">Modules</span>
                        </h2>
                    </div>
                    <Link to="/notes" className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors border-b-2 border-slate-800 pb-2">
                        View Full Archive
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
                    {[
                        {
                            title: 'Frontend Engine',
                            desc: 'Architecting high-fidelity user interfaces with React, Framer Motion, and Three.js.',
                            icon: <Globe className="text-primary" />,
                            color: 'primary'
                        },
                        {
                            title: 'Backend Logic',
                            desc: 'Scaling distributed architectures, secure APIs, and high-performance database systems.',
                            icon: <Database className="text-secondary" />,
                            color: 'secondary'
                        },
                        {
                            title: 'Cyber Security',
                            desc: 'Implementing advanced encryption protocols and defensive structural patterns.',
                            icon: <Shield className="text-accent" />,
                            color: 'accent'
                        }
                    ].map((mod, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, rotateX: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group relative"
                        >
                            <div className="learning-card-shadow" />
                            <div className="learning-card group-hover:-translate-y-4 group-hover:rotate-2 transition-all duration-700 h-full flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700">
                                        <div className="group-hover:primary-glow">
                                            {React.cloneElement(mod.icon, { size: 32 })}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{mod.title}</h3>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">{mod.desc}</p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Protocol_V.01</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(dot => (
                                            <div key={dot} className={`w-1 h-1 rounded-full ${dot <= 3 ? 'bg-primary/50' : 'bg-white/10'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Operator Status: The 3D Figure */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 overflow-hidden">
                <div className="obsidian-card p-10 md:p-24 rounded-[4rem] border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                                <Activity size={16} className="text-primary animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">LIVE_OPERATOR_STATUS</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic">
                                SYSTEM <br /><span className="text-primary-glow">ARCHITECT</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-light leading-relaxed">
                                Managed by <span className="text-white font-bold italic underline decoration-primary decoration-4">AFROJ</span>,
                                a developer dedicated to pushing the boundaries of what is possible in the digital realm.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-6">
                                <div>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Current_Load</p>
                                    <p className="text-2xl font-black text-white tracking-tighter uppercase italic">Optimized</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Signal_Security</p>
                                    <p className="text-2xl font-black text-primary-glow tracking-tighter uppercase italic">Encrypted</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex justify-center perspective-1000">
                            <motion.div
                                animate={{
                                    rotateY: [0, 10, -10, 0],
                                    rotateX: [0, -5, 5, 0]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 w-64 h-64 md:w-96 md:h-96 rounded-full p-3 bg-white/5 border border-white/10 backdrop-blur-3xl preserve-3d"
                            >
                                <div className="w-full h-full rounded-full overflow-hidden relative group">
                                    <img
                                        src={afu}
                                        alt="Operator"
                                        className="w-full h-full object-cover brightness-90 saturate-[0.7] group-hover:scale-110 group-hover:rotate-3 transition-all duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                    {/* Scanning Beam */}
                                    <motion.div
                                        animate={{ height: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute top-0 left-0 w-full bg-primary/20 blur-md z-20"
                                    />
                                </div>
                            </motion.div>

                            {/* Floating Tech Orbs */}
                            <motion.div
                                animate={{ y: [0, -40, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
                            />
                            <motion.div
                                animate={{ y: [0, 40, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Remote Core Sync: The GitHub Block */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                            <Radio size={14} className="text-red-500" /> Remote_Transmission_Protocol
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
                            Remote <br /><span className="text-slate-500">Core Sync</span>
                        </h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            Synchronize your workspace with GitHub. Direct deployment,
                            repository management, and multi-file transmissions at
                            quantum speed.
                        </p>
                        <Link to="/github">
                            <button className="group px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl flex items-center gap-4 transition-all hover:bg-primary hover:text-white hover:scale-105 active:scale-95 shadow-2xl">
                                <Github size={20} /> Establish Link
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-6 p-4 perspective-1000">
                        {[
                            { icon: <Code />, label: 'TRANS_CODE' },
                            { icon: <Lock />, label: 'SECURE_AUTH' },
                            { icon: <Activity />, label: 'LIVE_STATUS' },
                            { icon: <Terminal />, label: 'ROOT_ACCESS' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05, rotateZ: idx % 2 === 0 ? 2 : -2 }}
                                className="obsidian-card p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center space-y-4 group cursor-help"
                            >
                                <div className="text-slate-500 group-hover:text-primary group-hover:primary-glow transition-all duration-500">
                                    {React.cloneElement(item.icon, { size: 32 })}
                                </div>
                                <span className="text-[10px] font-black text-slate-700 group-hover:text-white transition-colors tracking-widest">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Knowledge Nodes Preview */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 mb-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] text-primary-glow font-mono tracking-widest uppercase">
                            <Sparkles size={14} /> Knowledge_Sub-Processor
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.8]">
                            Logic <br /><span className="text-primary-glow">Archive</span>
                        </h2>
                    </div>
                    <Link to="/notes">
                        <button className="group flex items-center gap-4 text-white font-black uppercase text-[10px] tracking-[0.4em] hover:text-primary transition-colors">
                            Access Full Database <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {staticNotes.slice(0, 4).map((note, i) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link to={`/notes/${note.id}`} className="block group h-full">
                                <div className="obsidian-card p-8 rounded-[2rem] border-white/5 h-full flex flex-col justify-between group-hover:border-primary/30 transition-all group-hover:shadow-[0_0_30px_rgba(47,129,247,0.1)]">
                                    <div className="space-y-4">
                                        <div className="text-primary/40 group-hover:text-primary transition-colors">
                                            <Layers size={24} />
                                        </div>
                                        <h3 className="text-lg font-black text-white uppercase italic group-hover:text-primary-glow transition-colors tracking-tight leading-tight">{note.title}</h3>
                                        <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed tracking-wider uppercase font-mono">{note.description}</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                                        READ_NODE <ArrowRight size={12} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;

