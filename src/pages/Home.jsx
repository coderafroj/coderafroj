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
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/notes?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const iconMap = {
        Code: <Code />,
        TrendingUp: <TrendingUp />,
        Palette: <Palette />,
        Shield: <Shield />
    };

    return (
        <div className="relative min-h-screen bg-[#02040a] selection:bg-primary/30 selection:text-white overflow-hidden">
            <SEO />
            {/* 3D Background System */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
                <div className="coderafroj-grid coderafroj-grid-pulse opacity-20" />
            </div>

            {/* Hero Section: The Agency Launchpad */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-48 md:pb-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-12">
                        {/* Agency Status */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            <div className="status-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-glow">Agency_Active_Mode</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase text-white">
                                DESIGN <br />
                                <span className="text-primary-glow drop-shadow-[0_0_80px_rgba(47,129,247,0.5)]">MASTERED.</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-slate-400 font-light max-w-xl leading-relaxed tracking-wide">
                                We craft <span className="text-white font-bold uppercase italic border-b-2 border-primary">Breathtaking</span> digital experiences.
                                High-end design meets elite engineering to elevate your brand to the next dimension.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6"
                        >
                            <Link to="/contact">
                                <button className="group relative px-12 py-6 bg-primary text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative z-10 flex items-center gap-3">
                                        Start Project <Zap size={18} fill="currentColor" />
                                    </span>
                                </button>
                            </Link>
                            <Link to="/projects">
                                <button className="relative group px-12 py-6 obsidian-card rounded-[2rem] text-white font-black text-sm uppercase tracking-[0.2em] transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-95 flex items-center gap-3 overflow-hidden shadow-2xl">
                                    View Works
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Integrated Search Command - Now Secondary */}
                    <div className="relative group lg:mt-0 mt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="obsidian-card p-8 rounded-[3rem] border-white/5 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <Terminal size={48} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-black text-white italic uppercase mb-4 tracking-tighter">Knowledge Base</h3>
                            <p className="text-sm text-slate-500 mb-8 font-mono">Execute queries on our core documentation system.</p>

                            <form onSubmit={handleSearch} className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative flex items-center bg-[#0d1117]/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-1 shadow-2xl focus-within:border-primary/50 transition-all">
                                    <div className="pl-4 text-slate-500">
                                        <Search size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Architecture, SEO, Security..."
                                        className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder-slate-600 font-mono text-xs tracking-widest"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-white/5 border border-white/5 hover:bg-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all"
                                    >
                                        Run
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Strategy: The Modules */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 text-primary-glow font-mono text-[10px] uppercase tracking-[0.4em] mx-auto md:mx-0">
                            <Layers size={14} /> core_capabilities
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none italic">
                            Our <span className="text-slate-500">Services</span>
                        </h2>
                    </div>
                    <Link to="/contact" className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors border-b-2 border-slate-800 pb-2">
                        Get Custom Quote
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group relative"
                        >
                            <div className="learning-card-shadow" />
                            <div className="learning-card h-full flex flex-col">
                                <div className="space-y-6 flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700">
                                        <div className="text-primary group-hover:primary-glow">
                                            {React.cloneElement(iconMap[service.icon], { size: 28 })}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight">{service.title}</h3>
                                    <p className="text-xs text-slate-400 font-light leading-relaxed">{service.description}</p>

                                    <ul className="space-y-2 mt-4">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase">
                                                <ChevronRight size={12} className="text-primary" /> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Active_Protocol</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(dot => (
                                            <div key={dot} className="w-1 h-1 rounded-full bg-primary/40" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


            {/* Projects Showcase: The Core Transmissions */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 text-primary-glow font-mono text-[10px] uppercase tracking-[0.4em]">
                            <Sparkles size={14} /> transmission_archive
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8] italic">
                            Featured <br /><span className="text-primary-glow">Deployments</span>
                        </h2>
                    </div>
                    <Link to="/projects">
                        <button className="group flex items-center gap-4 text-white font-black uppercase text-[10px] tracking-[0.4em] hover:text-primary transition-colors">
                            Initialize Full Archive <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {projects.slice(0, 4).map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden border border-white/10"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 brightness-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end space-y-4">
                                <div className="flex gap-2">
                                    {project.tags.slice(0, 2).map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[9px] text-white font-mono border border-white/10 uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white italic truncate uppercase tracking-tighter">{project.title}</h3>
                                <p className="text-sm text-slate-300 line-clamp-2 font-light max-w-md">{project.description}</p>
                                <div className="pt-4 flex items-center gap-6">
                                    <a href={project.liveLink} className="flex items-center gap-2 text-[10px] font-black text-primary-glow uppercase tracking-widest hover:text-white transition-colors">
                                        Establish Link <ExternalLink size={14} />
                                    </a>
                                    <Link to={`/projects/${project.id}`} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                                        View Specs
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Growth Vector: Digital Marketing Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5 overflow-hidden">
                <div className="obsidian-card p-10 md:p-24 rounded-[4rem] border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                                <Activity size={16} className="text-primary animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Growth_Algorithm_Active</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic">
                                SCALE YOUR <br /><span className="text-primary-glow font-normal not-italic">VISION.</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg">
                                We don't just build; we accelerate. Our digital marketing core utilizes proprietary data-driven
                                strategies to amplify your brand signaling across the global network.
                            </p>

                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <h4 className="text-4xl font-black text-white tracking-tighter">200%</h4>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">Avg_Conversion_Lift</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-4xl font-black text-white tracking-tighter">150+</h4>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">Deployments_Managed</p>
                                </div>
                            </div>

                            <button className="flex items-center gap-4 text-white font-black uppercase text-xs tracking-[0.4em] hover:text-primary transition-colors group">
                                Explore Marketing Suite <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>

                        <div className="relative aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-10 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="relative z-10 w-full h-full p-12 flex items-center justify-center">
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
                                <TrendingUp size={120} className="absolute text-primary-glow drop-shadow-[0_0_50px_rgba(47,129,247,0.5)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Design Showcase: The Aesthetic Vanguard */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 text-primary-glow font-mono text-[10px] uppercase tracking-[0.4em]">
                            <Palette size={14} /> design_masterpieces
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8] italic">
                            Visual <br /><span className="text-primary-glow">Excellence</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.filter(p => p.category === "Design Piece").map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bento-item group cursor-pointer"
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-white/5">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <button className="w-full py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                                        Inspect Design
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="text-[8px] font-mono text-primary-glow uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-md border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{project.title}</h3>
                                <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2">{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 glass-glow p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Need a Masterpiece?</h3>
                        <p className="text-slate-400 max-w-lg mx-auto text-sm font-light">
                            Direct transmission line open for custom UI/UX engineering and high-end web design orders.
                        </p>
                        <Link to="/contact">
                            <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-primary/20">
                                Place Design Order
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Social Proof: Client Testimonials */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="text-center space-y-6 mb-24">
                    <div className="inline-flex items-center gap-2 text-primary-glow font-mono text-[10px] uppercase tracking-[0.4em]">
                        <MessageSquare size={14} /> verified_transmissions
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
                        Client <span className="text-slate-500">Feedback</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="obsidian-card p-10 rounded-[2.5rem] border-white/5 flex flex-col justify-between"
                        >
                            <div className="space-y-6">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star key={star} size={14} fill="#2f81f7" className="text-primary" />
                                    ))}
                                </div>
                                <p className="text-slate-300 italic font-light leading-relaxed">"{t.content}"</p>
                            </div>
                            <div className="mt-10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-white uppercase italic">{t.name}</h4>
                                    <p className="text-[10px] text-slate-500 font-mono">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lead Capture: The Call to Action */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-40">
                <div className="flex flex-col items-center text-center space-y-12">
                    <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase italic text-white flex flex-col">
                        <span>READY TO</span>
                        <span className="text-primary-glow drop-shadow-[0_0_100px_rgba(47,129,247,0.4)]">UPGRADE?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl leading-relaxed">
                        Deploy your next-gen digital experience with ByteCore.
                        We are currently accepting new high-impact projects.
                    </p>
                    <Link to="/contact">
                        <button className="group relative px-16 py-8 bg-white text-black rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] transition-all hover:scale-110 active:scale-95 shadow-[0_0_80px_rgba(255,255,255,0.2)]">
                            Initiate Protocol
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

