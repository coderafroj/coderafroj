import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Terminal, BookOpen, Github, Shield } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const MobileTabBar = () => {
    const location = useLocation();

    const tabs = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'Projects', path: '/projects', icon: <Terminal size={20} /> },
        { name: 'Github', path: '/github', icon: <Github size={20} /> },
        { name: 'Notes', path: '/notes', icon: <BookOpen size={20} /> },
        { name: 'Admin', path: '/admin', icon: <Shield size={20} /> },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
            <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex items-center justify-around px-2 py-3 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Adaptive Glow Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />

                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <Link
                            key={tab.name}
                            to={tab.path}
                            className={twMerge(
                                "relative flex flex-col items-center justify-center flex-1 transition-all duration-500",
                                isActive ? "text-primary-glow" : "text-slate-500"
                            )}
                        >
                            <motion.div
                                animate={isActive ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className={twMerge(
                                    "p-2.5 rounded-2xl transition-all duration-300 relative z-10",
                                    isActive ? "shadow-[0_10px_30px_rgba(99,102,241,0.2)]" : "hover:bg-white/5"
                                )}
                            >
                                {tab.icon}
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-liquid-pill"
                                        className="absolute inset-0 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-2xl -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.div>

                            <motion.span
                                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                                className={twMerge(
                                    "text-[8px] font-black tracking-[0.2em] mt-1.5 uppercase transition-all duration-300",
                                    isActive ? "text-primary-glow" : "text-slate-500"
                                )}
                            >
                                {tab.name}
                            </motion.span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileTabBar;

