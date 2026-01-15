import { Github, Twitter, Linkedin, Heart, Terminal, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/coderafroj.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="pt-32 pb-12 mt-20 relative overflow-hidden border-t border-[#30363d]/50">
            {/* Top Glow Layer */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                <img
                                    src={logo}
                                    alt="CODERAFROJ"
                                    className="h-10 md:h-12 w-auto relative z-10 brightness-110 drop-shadow-[0_0_8px_rgba(47,129,247,0.3)]"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tighter uppercase leading-none italic font-mono">
                                    CODER<span className="text-primary">AFROJ</span>
                                </span>
                                <span className="text-[7px] font-mono text-slate-500 tracking-[0.4em] uppercase">Protocol_Core_V2</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-light">
                            Architecting decentralized digital landscapes and high-fidelity neural experiences. Engineering the technical frontier through pure logic and craft.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-mono font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            System_Nodes
                        </h4>
                        <ul className="space-y-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <li><Link to="/" className="hover:text-primary transition-colors">Protocol</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><a href="/projects" className="hover:text-primary transition-colors">Codex</a></li>
                            <li><a href="/tutorials" className="hover:text-primary transition-colors">Academy</a></li>
                            <li><a href="/blog" className="hover:text-primary transition-colors">Signals</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-mono font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            EXTERNAL_LINK
                        </h4>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    href="#"
                                    className="w-11 h-11 rounded-xl bg-[#21262d] flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/20 transition-all border border-[#30363d] hover:border-primary/50 shadow-lg shadow-black/20"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-[#30363d]/50 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase">
                        &copy; {currentYear} // Coderafroj Protocol // Build Version 2.0.4
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase bg-[#21262d] px-6 py-2.5 rounded-full border border-[#30363d] shadow-2xl">
                        <span className="opacity-40">Compiled_with</span>
                        <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                        <span className="text-white">CODERAFROJ_OS</span>
                    </div>

                    <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Status: Secure
                    </div>
                </div>
            </div>

            {/* Background Mesh */}
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none -z-10" />
        </footer>
    );
};

export default Footer;

