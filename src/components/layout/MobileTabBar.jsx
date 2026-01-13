import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Terminal, BookOpen, Sparkles, Github, Shield } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const MobileTabBar = () => {
    const location = useLocation();

    const tabs = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'Projects', path: '/projects', icon: <Terminal size={20} /> },
        { name: 'Notes', path: '/notes', icon: <BookOpen size={20} /> },
        { name: 'Blog', path: '/blog', icon: <Sparkles size={20} /> },
        { name: 'Admin', path: '/admin', icon: <Shield size={20} /> },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
            <div className="glass-panel rounded-2xl border-[#30363d]/50 flex items-center justify-around p-2 shadow-2xl">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <Link
                            key={tab.name}
                            to={tab.path}
                            className={twMerge(
                                "relative flex flex-col items-center gap-1 p-2 transition-all duration-300",
                                isActive ? "text-primary-glow" : "text-slate-500 hover:text-white"
                            )}
                        >
                            <div className={twMerge(
                                "p-1 rounded-xl transition-all duration-300",
                                isActive ? "bg-primary/10 shadow-[0_0_15px_rgba(47,129,247,0.2)]" : ""
                            )}>
                                {tab.icon}
                            </div>
                            <span className="text-[9px] font-mono font-bold tracking-widest uppercase">
                                {tab.name}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="mobile-active-tab"
                                    className="absolute -top-1 w-1 h-1 rounded-full bg-primary-glow shadow-[0_0_8px_#2f81f7]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
