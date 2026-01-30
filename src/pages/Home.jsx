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
import logo from '../assets/logo/coderafroj.png';

// Lazy load 3D components to prevent crash on initial load
const Portfolio3DScene = React.lazy(() => import('../components/Three/Portfolio3DScene'));
const BackgroundStream = React.lazy(() => import('../components/Three/BackgroundStream'));
const ThreeErrorBoundary = React.lazy(() => import('../components/Three/ThreeErrorBoundary'));

// Component for elegant 3D fallback
const ThreeFallback = ({ fullScreen = false }) => (
    <div className={`${fullScreen ? 'fixed inset-0' : 'w-full h-full'} bg-transparent pointer-events-none`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/30 to-[#02040a]" />
        <div className="coderafroj-grid opacity-[0.05]" />
    </div>
);

const useScrambleText = (text) => {
    const [scrambled, setScrambled] = React.useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    React.useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setScrambled(prev =>
                text.split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return scrambled;
};

const HUDOverlay = () => (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-30">
        {/* Scanning Line */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />

        {/* Corner HUD - Simplified */}
        <div className="absolute top-40 left-10 space-y-2 hidden lg:block">
            <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-primary" />
                <span className="text-[8px] font-mono text-primary tracking-widest uppercase animate-pulse">Design System Active</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white/20" />
                <span className="text-[8px] font-mono text-white/40 tracking-widest uppercase">Version 4.0</span>
            </div>
        </div>

        {/* Right HUD - Simplified */}
        <div className="absolute bottom-40 right-10 flex flex-col items-end space-y-4 hidden lg:block">
            <div className="text-[8px] font-mono text-white/20 text-right">
                WEB DEVELOPER<br />
                CREATIVE DESIGNER<br />
                CS TEACHER
            </div>
        </div>
    </div>
);

const ServiceCard = ({ service, index, color }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Map icon strings to Lucide components
    const IconComponent = {
        Code: Code,
        TrendingUp: TrendingUp,
        Palette: Palette,
        Shield: Shield,
        Terminal: Terminal,
        Cpu: Cpu,
        Globe: Globe,
        Layers: Layers,
        Activity: Activity,
        Radio: Radio,
        Lock: Lock,
        Database: Database
    }[service.icon] || Sparkles;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden card-3d h-full flex flex-col"
        >
            <div className="mb-8 flex justify-between items-start">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: isHovered ? [1, 1.1, 1] : 1,
                            rotate: isHovered ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                        className="relative z-10"
                    >
                        <IconComponent
                            size={32}
                            style={{ color }}
                            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        />
                    </motion.div>

                    {/* Elegant Background Glow for Icon */}
                    <div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                        style={{ backgroundColor: color }}
                    />
                    <div className="absolute inset-0 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm" />
                </div>
                <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={14} className="text-white" />
                </div>
            </div>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">{service.title}</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed flex-grow">{service.description}</p>

            {/* Accent Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
                className="absolute bottom-0 left-0 w-full h-1 transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
            />
        </motion.div>
    );
};

const Home = () => {
    const navigate = useNavigate();
    const [hasWebGL, setHasWebGL] = React.useState(true);
    const scrambledTitle = useScrambleText("coderafroj");

    // Deep isolation of WebGL checking
    React.useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const support = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            setHasWebGL(support);
        } catch (e) {
            setHasWebGL(false);
        }
    }, []);

    // Icon map for services - keeping for fallback but using ServiceNode
    const iconMap = {
        Code: "#6366f1",
        TrendingUp: "#10b981",
        Palette: "#ec4899",
        Shield: "#f59e0b"
    };

    return (
        <div className="relative min-h-screen bg-[#02040a] selection:bg-primary/30 selection:text-white overflow-x-hidden font-outfit">
            <SEO
                title="Elite Digital Architecture"
                description="Coderafroj - Premium full-stack development and high-end digital design agency. Crafting breathtaking digital experiences."
            />

            {/* Global 3D Background Stream */}
            {hasWebGL && (
                <React.Suspense fallback={<ThreeFallback fullScreen />}>
                    <ThreeErrorBoundary>
                        <BackgroundStream />
                    </ThreeErrorBoundary>
                </React.Suspense>
            )}

            {/* 3D Background - Live Advanced Hero Scene */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {hasWebGL ? (
                    <React.Suspense fallback={<ThreeFallback fullScreen />}>
                        <ThreeErrorBoundary showPlaceholder>
                            <Portfolio3DScene />
                        </ThreeErrorBoundary>
                    </React.Suspense>
                ) : <ThreeFallback fullScreen />}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/40 to-[#02040a] z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent z-0 opacity-80" />
                <div className="coderafroj-grid opacity-[0.1] z-0" />
            </div>

            {/* Hacker HUD Interface */}
            <HUDOverlay />

            {/* Hero Content */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
                <div className="max-w-7xl w-full">
                    <div className="flex flex-col items-center text-center space-y-12">
                        {/* 3D Logo is now inside AdvancedHero Canvas behind this content */}

                        <div className="space-y-6 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-md"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                <span className="text-[10px] font-mono font-black tracking-[0.5em] text-primary uppercase">My Personal Portfolio</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] mb-4 select-none hacker-glow text-gradient"
                            >
                                {scrambledTitle}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed font-mono px-4"
                            >
                                [<span className="text-primary-glow tracking-widest uppercase text-xs">Web Developer</span>] Building Beautiful Websites & <span className="text-white font-medium">Digital Experiences</span>
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center justify-center gap-6"
                        >
                            <button
                                onClick={() => navigate('/projects')}
                                className="px-12 py-6 bg-primary text-white font-black uppercase text-xs tracking-[0.3em] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(47,129,247,0.4)] border border-primary-glow/50"
                            >
                                View My Work
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.3em] rounded-xl hover:bg-white/10 transition-all backdrop-blur-md"
                            >
                                Get In Touch
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} color={iconMap[service.icon]} />
                    ))}
                </div>
            </section>

            {/* Elite Tech Stack Marquee */}
            <section className="relative z-10 py-20 border-y border-white/5 bg-white/[0.01] overflow-hidden">
                <div className="flex whitespace-nowrap animate-scroll">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-20 items-center px-10">
                            {['REACT', 'NEXT.JS', 'THREE.JS', 'TYPESCRIPT', 'PYTHON', 'NODE.JS', 'TAILWIND', 'FIREBASE', 'GIT', 'DOCKER'].map((tech) => (
                                <span key={tech} className="text-4xl md:text-6xl font-black text-white/10 italic tracking-tighter hover:text-primary transition-colors cursor-default select-none">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Projects: Large, Immersive Cards */}
            {/* The Architect Section - High End Creator Showcase */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="text-primary font-mono text-xs tracking-[0.6em] uppercase block">About Me</span>
                            <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
                                MEET <br /><span className="text-reveal-gradient">AFROJ.</span>
                            </h2>
                        </div>
                        <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                            Hi, I'm Afroj. I'm a passionate <span className="text-white font-medium italic">Web Developer</span> and <span className="text-white font-medium italic">Designer</span>.
                            I also love teaching Computer Science to students.
                            I build websites that are fast, beautiful, and easy to use.
                        </p>
                        <div className="flex gap-8 items-center border-l-2 border-primary/20 pl-8">
                            <div>
                                <div className="text-3xl font-black text-white tracking-tighter italic uppercase underline decoration-primary/30">150+</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Projects Done</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white tracking-tighter italic uppercase underline decoration-primary/30">100%</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Satisfaction</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square"
                    >
                        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full animate-pulse" />
                        <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full animate-pulse delay-700" />

                        <div className="relative z-10 w-full h-full rounded-[4rem] overflow-hidden border border-white/10 group cursor-crosshair">
                            <img
                                src={afu}
                                alt="Afroj"
                                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-60" />

                            {/* Signature Element */}
                            <div className="absolute bottom-10 left-10">
                                <span className="text-4xl md:text-6xl font-black text-white italic tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity">
                                    AFROJ.
                                </span>
                            </div>
                        </div>

                        {/* Decorative HUD Frame */}
                        <div className="absolute -inset-4 border border-primary/20 rounded-[5rem] pointer-events-none z-0 rotate-3" />
                        <div className="absolute -inset-4 border border-white/5 rounded-[5rem] pointer-events-none z-0 -rotate-3" />
                    </motion.div>
                </div>
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 text-primary font-mono text-xs tracking-[0.5em] uppercase"
                        >
                            <span className="h-px w-12 bg-primary/30" />
                            Featured Work
                        </motion.div>
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">
                            MY BEST <br /><span className="text-slate-500 hover:text-primary transition-colors duration-500">PROJECTS.</span>
                        </h2>
                    </div>
                    <Link to="/projects" className="text-xs font-black text-primary-glow uppercase tracking-[0.4em] border-b-2 border-primary pb-2 hover:text-white transition-colors group">
                        See All Projects <ArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" size={12} />
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
                            START A <br />
                            <span className="text-reveal-gradient italic">PROJECT?</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                            I am currently available for new projects. Let's work
                            together to build something amazing.
                        </p>
                        <Link to="/contact">
                            <button className="group relative px-16 py-8 bg-white text-black rounded-[3rem] font-black text-sm uppercase tracking-[0.4em] transition-all hover:scale-110 active:scale-95 shadow-[0_20px_80px_rgba(255,255,255,0.2)]">
                                Message Me
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;


