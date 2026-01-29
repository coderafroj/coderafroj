import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import {
    Terminal, Code, Cpu, Shield, ArrowRight, Github,
    Sparkles, BookOpen, Zap, Globe, Layers, Database,
    Play, Activity, Radio, Lock, Search, TrendingUp,
    Palette, MessageSquare, Star, ExternalLink, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import afu from '../assets/AFROJ.jpg';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';

const Home = () => {
    const navigate = useNavigate();

    // Icon map for services
    const iconMap = {
        Code: <Code size={32} />,
        TrendingUp: <TrendingUp size={32} />,
        Palette: <Palette size={32} />,
        Shield: <Shield size={32} />
    };

    return (
        <div className="relative min-h-screen bg-[#02040a] selection:bg-primary/30 selection:text-white overflow-x-hidden">
            <SEO
                title="Elite Digital Architecture"
                description="Coderafroj - Premium full-stack development and high-end digital design agency. Crafting breathtaking digital experiences."
            />

            {/* 3D Background - Simplified but deeper */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[160px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[160px] rounded-full" />
                <div className="coderafroj-grid opacity-[0.15]" />
            </div>

            {/* Hero Section: Simple, Massive, 3D */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-56 md:pb-40">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-glow">Available for New Projects</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <h1 className="text-[12vw] md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase text-white mb-10">
                            DIGITAL <br />
                            <span className="text-reveal-gradient italic">TITANS.</span>
                        </h1>

                        {/* Floating 3D Elements Placeholder for CSS stimulation */}
                        <div className="absolute -top-10 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float opacity-50" />
                        <div className="absolute -bottom-10 -left-20 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float stagger-2 opacity-30" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl leading-relaxed mb-12"
                    >
                        We build high-performance <span className="text-white font-medium italic underline decoration-primary underline-offset-8">Next-Gen</span> architectures
                        where elite engineering meets breathtaking visual design.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-6"
                    >
                        <Link to="/contact">
                            <button className="btn-cyber px-12 py-6 rounded-[2rem] text-white font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_60px_rgba(99,102,241,0.4)] hover:scale-105 active:scale-95 transition-all">
                                Establish Protocol
                            </button>
                        </Link>
                        <Link to="/projects">
                            <button className="px-12 py-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all group">
                                View Portfolio <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Simpler Services: Professional Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden card-3d"
                        >
                            <div className="mb-8 text-primary group-hover:primary-glow transition-all duration-500">
                                {iconMap[service.icon]}
                            </div>
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">{service.title}</h3>
                            <p className="text-sm text-slate-500 font-light leading-relaxed">{service.description}</p>

                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Projects: Large, Immersive Cards */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">
                        MASTER <br /><span className="text-slate-500">WORKS.</span>
                    </h2>
                    <Link to="/projects" className="text-xs font-black text-primary-glow uppercase tracking-[0.4em] border-b-2 border-primary pb-2 hover:text-white transition-colors">
                        Expand All Transmissions
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {projects.slice(0, 2).map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="group relative aspect-[4/5] md:aspect-square rounded-[4rem] overflow-hidden border border-white/10"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 brightness-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                                <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">{project.title}</h3>
                                <div className="flex items-center gap-6">
                                    <a href={project.liveLink} className="flex items-center gap-2 text-[10px] font-black text-white bg-primary px-6 py-3 rounded-full uppercase tracking-widest shadow-xl shadow-primary/30">
                                        Establish Link <ExternalLink size={14} />
                                    </a>
                                    <Link to={`/projects/${project.id}`} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors">
                                        Specifications
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Massive Call to Action */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-40">
                <div className="obsidian-card p-16 md:p-32 rounded-[5rem] border-white/5 relative overflow-hidden text-center group">
                    {/* Interior Glows */}
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
                    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/10 blur-[120px] rounded-full group-hover:bg-accent/20 transition-all duration-700" />

                    <div className="relative z-10 space-y-12">
                        <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase text-white">
                            READY TO <br />
                            <span className="text-reveal-gradient italic">ASCEND?</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Currently accepting high-impact deployments. Let's engineer
                            your brand's digital legacy.
                        </p>
                        <Link to="/contact">
                            <button className="group relative px-16 py-8 bg-white text-black rounded-[3rem] font-black text-sm uppercase tracking-[0.4em] transition-all hover:scale-110 active:scale-95 shadow-[0_20px_80px_rgba(255,255,255,0.2)]">
                                Start Transmission
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;


