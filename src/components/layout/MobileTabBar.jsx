import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Terminal, BookOpen, Sparkles, Github, Shield } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const MobileTabBar = () => {
    const location = useLocation();

    const tabs = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Projects', path: '/projects', icon: <Terminal size={18} /> },
        { name: 'Github', path: '/github', icon: <Github size={18} /> },
        { name: 'Notes', path: '/notes', icon: <BookOpen size={18} /> },
        { name: 'Blog', path: '/blog', icon: <Sparkles size={18} /> },
        { name: 'Admin', path: '/admin', icon: <Shield size={18} /> },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-5 pt-2">
            <div className="bg-[#0d1117]/80 backdrop-blur-3xl border border-white/5 rounded-2xl flex items-center justify-between px-2 py-1.5 shadow-2xl relative overflow-hidden">
                {/* Visual Glow Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <Link
                            key={tab.name}
                            to={tab.path}
                            className={twMerge(
                                "relative flex flex-col items-center gap-1 flex-1 py-1 transition-all duration-500",
                                isActive ? "text-primary-glow" : "text-slate-500 hover:text-white"
                            )}
                        >
                            <motion.div
                                animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                                className={twMerge(
                                    "p-1.5 rounded-xl transition-all duration-300 relative",
                                    isActive ? "bg-primary/10" : ""
                                )}
                            >
                                {tab.icon}
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-glow"
                                        className="absolute inset-0 bg-primary/20 blur-md rounded-xl -z-10"
                                    />
                                )}
                            </motion.div>
                            <span className={twMerge(
                                "text-[7px] font-black tracking-widest uppercase transition-colors",
                                isActive ? "text-primary-glow opacity-100" : "text-slate-600 opacity-60"
                            )}>
                                {tab.name}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="mobile-active-dot"
                                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary-glow shadow-[0_0_10px_#2f81f7]"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileTabBar;
