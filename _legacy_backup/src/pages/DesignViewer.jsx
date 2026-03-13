import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Play, Pause, FastForward, Rewind,
    Search, Bell, User, Layout, Activity, Settings,
    Smartphone, Monitor, Zap, Shield, Cpu, ExternalLink,
    Square, Circle, Triangle, Layers
} from 'lucide-react';
import { projects as localProjects } from '../data/projects';

const DesignViewer = () => {
    const { id } = useParams();

    const project = localProjects.find(p => p.id === id || String(p.id) === id);
    const hasComponent = ['1', '2', '3', '4', '5', '6'].includes(id);

    const renderDesign = () => {
        if (hasComponent) {
            switch (id) {
                case '1': return <GlassDashboard />;
                case '2': return <BentoLayout />;
                case '3': return <CyberLanding />;
                case '4': return <NeumorphicPlayer />;
                case '5': return <AuroraVisual />;
                case '6': return <Interactive3D />;
                default: break;
            }
        }

        if (project && project.image) {
            return (
                <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-[#0d1117] relative group">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="max-w-full max-h-[800px] object-contain shadow-2xl transition-transform duration-1000 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-10 left-10 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">{project.title}</h2>
                        <div className="flex gap-2">
                            {project.tags?.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] text-primary-glow font-mono font-bold border border-white/5">
                                    {tag.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
                <Layout size={48} className="text-slate-800 animate-pulse" />
                <div className="text-center text-slate-500 font-mono text-xs tracking-[0.5em]">PROTOCOL_SEQUENCE_MISMATCH</div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#02040a] pt-28 pb-20 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto mb-10">
                <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Return to Archive</span>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto obsidian-card rounded-[3rem] overflow-hidden min-h-[700px] relative border-white/5 shadow-2xl">
                {renderDesign()}
            </div>

            <div className="max-w-2xl mx-auto mt-12 text-center space-y-4">
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em]">Proprietary_UI_Mockup_v1.0</p>
                <div className="flex justify-center gap-4">
                    <Link to="/contact">
                        <button className="px-8 py-3 bg-primary/10 border border-primary/20 text-primary-glow rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all">
                            Request This Style
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// 1. Glassmorphism Dashboard
const GlassDashboard = () => (
    <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 p-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-64 glass-glow p-6 flex flex-col gap-8">
            <div className="h-10 w-10 bg-primary rounded-xl" />
            <nav className="space-y-4">
                {[Layout, Activity, Search, Bell, Settings].map((Icon, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-400 hover:text-white cursor-pointer transition-colors p-2 hover:bg-white/5 rounded-lg">
                        <Icon size={18} />
                        <span className="text-xs font-medium">Metric_{i}</span>
                    </div>
                ))}
            </nav>
        </div>
        {/* Main */}
        <div className="flex-1 space-y-8">
            <header className="flex justify-between items-center glass-glow px-8 py-4">
                <h2 className="text-xl font-bold text-white">Quantum Analytics</h2>
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10" />
                    <div className="w-8 h-8 rounded-full bg-white/10" />
                </div>
            </header>
            <div className="grid grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="glass-glow h-40 p-6 flex flex-col justify-between">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                            <Activity size={20} />
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 2 }} className="h-full bg-primary" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="glass-glow flex-1 min-h-[300px] p-8">
                <div className="flex gap-2">
                    {[10, 30, 20, 50, 40, 60, 45, 70].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: h * 2 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-1 bg-primary/40 rounded-t-lg hover:bg-primary transition-colors cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// 2. Bento-Style Portfolio
const BentoLayout = () => (
    <div className="w-full h-full bg-[#050505] p-10 bento-grid overflow-y-auto no-scrollbar">
        <div className="col-span-4 row-span-2 bento-item bg-gradient-to-br from-primary/10 to-transparent">
            <h2 className="text-4xl font-black text-white italic">DESIGN<br />SYSTEMS.</h2>
            <p className="text-xs text-slate-500">A modular approach to digital architecture.</p>
        </div>
        <div className="col-span-2 row-span-1 bento-item border-primary/20">
            <Zap className="text-primary" size={32} />
            <span className="text-[10px] font-mono">HIGH_FREQ</span>
        </div>
        <div className="col-span-2 row-span-2 bento-item bg-white/5">
            <div className="flex gap-1">
                {[Circle, Square, Triangle].map((Shape, i) => <Shape key={i} size={20} className="text-slate-600" />)}
            </div>
            <h3 className="text-sm font-bold text-white">Visual DNA</h3>
        </div>
        <div className="col-span-2 row-span-1 bento-item">
            <Smartphone size={24} className="text-slate-400" />
        </div>
        <div className="col-span-4 row-span-2 bento-item relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] translate-x-1/2" />
            <div className="relative z-10 space-y-6">
                <div className="h-1 w-20 bg-primary rounded-full" />
                <h4 className="text-2xl font-black text-white italic uppercase">Future Proof Deployment</h4>
            </div>
        </div>
        <div className="col-span-2 row-span-1 bento-item bg-primary text-white border-none shadow-[0_0_30px_rgba(47,129,247,0.3)]">
            <span className="text-xs font-black italic uppercase">Establish Connection</span>
        </div>
    </div>
);

// 3. Cyberpunk Landing Page
const CyberLanding = () => (
    <div className="w-full h-full bg-[#030014] relative overflow-hidden font-mono flex items-center justify-center p-20">
        <div className="absolute inset-0 grid-learning opacity-20" />
        <div className="relative z-10 text-center space-y-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] text-primary-glow font-bold tracking-[0.5em] uppercase">Status: Cyber_Link_Active</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase relative">
                NEURAL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse">OVERLOAD.</span>
                <div className="absolute -top-10 -left-10 text-[8px] opacity-30">0xFFFF // SYSTEM_ROOT</div>
            </h1>
            <div className="flex justify-center gap-8">
                <button className="px-10 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.4em] skew-x-[-15deg] hover:skew-x-0 transition-all border-r-4 border-accent">
                    Initiate Boot
                </button>
                <button className="px-10 py-5 bg-transparent border border-white/20 text-white font-black text-xs uppercase tracking-[0.4em] skew-x-[-15deg] hover:skew-x-0 transition-all">
                    Decrypt Docs
                </button>
            </div>
            <div className="flex items-center justify-center gap-12 opacity-40">
                {[Cpu, Shield, Zap].map((Icon, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <Icon size={24} />
                        <span className="text-[8px]">MODULE_{i}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// 4. Neumorphic Music Player
const NeumorphicPlayer = () => (
    <div className="w-full h-full bg-[#e0e0e0] flex items-center justify-center p-20">
        <div className="w-[350px] bg-[#e0e0e0] rounded-[3rem] p-10 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
            <div className="aspect-square rounded-[2rem] bg-[#e0e0e0] shadow-[inset_20px_20px_60px_#bebebe,inset_-20px_-20px_60px_#ffffff] mb-10 overflow-hidden p-6">
                <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-tr from-primary to-accent opacity-80" />
            </div>
            <div className="text-center mb-10">
                <h4 className="text-xl font-bold text-[#444]">Digital Symphony</h4>
                <p className="text-xs text-[#777]">Unknown Artist // Neumorphic Mix</p>
            </div>
            <div className="flex items-center justify-between gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] flex items-center justify-center text-[#777] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all cursor-pointer">
                    <Rewind size={18} />
                </div>
                <div className="w-20 h-20 rounded-full bg-[#e0e0e0] shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] flex items-center justify-center text-primary active:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] transition-all cursor-pointer">
                    <Play size={32} fill="currentColor" />
                </div>
                <div className="w-12 h-12 rounded-full bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] flex items-center justify-center text-[#777] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all cursor-pointer">
                    <FastForward size={18} />
                </div>
            </div>
        </div>
    </div>
);

// 5. Aurora Mesh Gradient
const AuroraVisual = () => (
    <div className="w-full h-full bg-black relative overflow-hidden flex flex-col items-center justify-center p-20 text-center">
        <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-[150px] animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-gradient-to-tr from-cyan-400 to-indigo-600 blur-[120px] mix-blend-screen" />
        </div>
        <div className="relative z-10 space-y-12">
            <h1 className="text-8xl md:text-[12rem] font-light text-white tracking-[0.2em] uppercase text-reveal-mask">
                AURORA
            </h1>
            <p className="text-sm font-light text-slate-300 tracking-[0.8em] uppercase italic">The essence of visual data</p>
            <div className="w-[1px] h-32 bg-gradient-to-t from-transparent via-white/50 to-transparent mx-auto" />
            <button className="px-12 py-3 bg-white/5 backdrop-blur-3xl border border-white/20 text-white text-[9px] uppercase tracking-[0.5em] rounded-full hover:bg-white hover:text-black transition-all">
                Enter Void
            </button>
        </div>
    </div>
);

// 6. 3D Interactive Hero
const Interactive3D = () => (
    <div className="w-full h-full bg-[#111] p-20 grid lg:grid-cols-2 items-center relative gap-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 border-[40px] border-white/5 rounded-full rotate-45 animate-[spin_20s_linear_infinite]" />
        </div>
        <div className="space-y-10 relative z-10">
            <div className="flex gap-4">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <span className="text-[10px] font-mono text-slate-500 uppercase">Interactive_Protocol_3D</span>
            </div>
            <h1 className="text-7xl font-black text-white italic leading-tight uppercase tracking-tighter">
                DEPTH IS <br />
                <span className="text-primary-glow">REALITY.</span>
            </h1>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
                Experience spatial computing through our proprietary 3D simulation engine.
                Move your cursor to interact with the environment.
            </p>
            <div className="flex gap-4">
                <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-primary/40">
                    Get Started
                </button>
            </div>
        </div>
        <div className="relative group perspective-1000 h-[500px]">
            <motion.div
                animate={{ rotateY: [0, 10, 0], rotateX: [0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="w-full h-full glass-glow border-primary/20 relative flex items-center justify-center p-10 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
                <Layers className="text-primary-glow floating-3d" size={200} />
                <div className="absolute bottom-10 left-10 flex gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-primary/40" />)}
                </div>
            </motion.div>
        </div>
    </div>
);

export default DesignViewer;
