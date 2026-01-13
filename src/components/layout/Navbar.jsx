import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Terminal, BookOpen, Shield, Sparkles, Github } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

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
        { name: 'Notes', path: '/notes', icon: <BookOpen size={14} /> },
        { name: 'Signals', path: '/blog', icon: <Sparkles size={14} /> },
        { name: 'Control', path: '/github', icon: <Github size={14} /> },
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
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-300">
                        <Terminal className="text-primary-glow group-hover:text-white" size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-tighter text-white leading-none">NEXUS</span>
                        <span className="text-[7px] font-mono text-primary-glow tracking-[0.2em]">CORE__v2.0</span>
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
                    className="md:hidden p-2 text-slate-400 hover:text-white transition-colors" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
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
                            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm -z-10"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-1 p-2 obsidian-card rounded-2xl border-[#30363d]"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-[9px] font-mono font-bold tracking-widest text-slate-400 hover:text-white hover:bg-primary/10 hover:border-primary/20 transition-all"
                                    >
                                        <div className="p-2 rounded-lg bg-white/5">{link.icon}</div>
                                        {link.name.toUpperCase()}
                                    </Link>
                                ))}
                                <Link
                                    to="/admin"
                                    onClick={() => setIsOpen(false)}
                                    className="col-span-2 flex items-center justify-center p-4 rounded-xl bg-white text-black text-[9px] font-black tracking-widest uppercase"
                                >
                                    Secure Login Session
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

