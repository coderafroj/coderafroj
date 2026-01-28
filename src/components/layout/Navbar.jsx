import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Terminal, BookOpen, Shield, Sparkles, Github, Mail, Palette } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import logo from '../../assets/logo/coderafroj.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: 'Protocol', path: '/', icon: <Terminal size={14} /> },
        { name: 'Projects', path: '/projects', icon: <Code size={14} /> },
        { name: 'Notes', path: '/learn', icon: <BookOpen size={14} /> },
        { name: 'Signals', path: '/blog', icon: <Sparkles size={14} /> },
        { name: 'Control', path: '/github', icon: <Github size={14} /> },
        { name: 'Contact', path: '/contact', icon: <Mail size={14} /> },
    ];

    return (
        <nav className={twMerge(
            'fixed top-4 left-1/2 z-50 transition-all duration-500 w-[95%] max-w-7xl rounded-2xl border',
            visible ? 'nav-visible' : 'nav-hidden',
            scrolled
                ? 'obsidian-card py-2 border-[#30363d] shadow-2xl scale-[0.99]'
                : 'bg-transparent py-4 border-transparent'
        )}>
            <div className="mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <img
                            src={logo}
                            alt="CODERAFROJ"
                            className="h-9 md:h-11 w-auto relative z-10 brightness-110 drop-shadow-[0_0_8px_rgba(47,129,247,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(47,129,247,0.5)] transition-all"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-widest text-white leading-none font-mono">CODE<span className="text-primary">RAFROJ</span></span>
                        <span className="text-[6px] font-mono text-slate-500 tracking-[0.4em] uppercase">Digital_Architect</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={twMerge(
                                    'relative px-4 py-2 text-[10px] font-mono font-bold tracking-widest rounded-lg transition-all duration-300 group',
                                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {link.icon} {link.name.toUpperCase()}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute inset-0 bg-[#30363d]/50 border border-[#30363d] rounded-lg -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <Link to="/admin" className="ml-2 px-4 py-2 bg-white text-black text-[10px] font-black tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all duration-300 border border-transparent">
                        LOGIN
                    </Link>
                </div>

                <button
                    className="md:hidden relative w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center gap-1.5 overflow-hidden group"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="w-5 h-0.5 bg-primary-glow rounded-full transition-transform"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                        className="w-5 h-0.5 bg-primary-glow rounded-full transition-all"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="w-5 h-0.5 bg-primary-glow rounded-full transition-transform"
                    />
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md -z-10"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="md:hidden absolute top-full left-0 right-0 mt-4 mx-2 p-1 overflow-hidden"
                        >
                            <div className="obsidian-card rounded-[2.5rem] border-white/10 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
                                {/* Decorative Background in Menu */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                                <div className="grid grid-cols-2 gap-3 relative z-10">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsOpen(false)}
                                                className="flex flex-col items-center justify-center gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 text-[10px] font-black tracking-[0.2em] text-slate-400 hover:text-white hover:bg-primary/10 hover:border-primary/20 transition-all group"
                                            >
                                                <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-primary/20 group-hover:text-primary-glow transition-all">
                                                    {React.cloneElement(link.icon, { size: 20 })}
                                                </div>
                                                {link.name.toUpperCase()}
                                            </Link>
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="col-span-2 mt-2"
                                    >
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsOpen(false)}
                                            className="w-full flex items-center justify-center p-5 rounded-3xl bg-white text-black text-[10px] font-black tracking-[0.3em] uppercase shadow-xl active:scale-95 transition-transform"
                                        >
                                            <Shield size={16} className="mr-3" /> Secure_Access
                                        </Link>
                                    </motion.div>
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[8px] font-mono text-slate-500 tracking-[0.2em]">NODE_SESSION_01</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

