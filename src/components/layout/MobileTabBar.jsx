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
        <div className="md:hidden fixed bottom-1 left-4 right-4 z-50 pb-4 pt-2">
            <div className="bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative">
                {/* Edge Fades for Slider Indication */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent z-20 pointer-events-none" />

                {/* Scrollable Container */}
                <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory relative z-10">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.path;
                        return (
                            <Link
                                key={tab.name}
                                to={tab.path}
                                className={twMerge(
                                    "relative flex flex-col items-center justify-center min-w-[70px] flex-shrink-0 transition-all duration-500 snap-center py-1",
                                    isActive ? "text-primary-glow" : "text-slate-500"
                                )}
                            >
                                <motion.div
                                    animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className={twMerge(
                                        "p-2.5 rounded-2xl transition-all duration-300 relative z-10",
                                        isActive ? "bg-primary/20 shadow-[0_10px_30px_rgba(99,102,241,0.2)] border border-primary/30" : "hover:bg-white/5"
                                    )}
                                >
                                    <div className="scale-90">
                                        {tab.icon}
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="mobile-slider-active"
                                            className="absolute inset-0 bg-primary/20 blur-md rounded-2xl -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.div>

                                <motion.span
                                    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 0.9 }}
                                    className={twMerge(
                                        "text-[8px] font-black tracking-widest mt-1.5 uppercase transition-all duration-300",
                                        isActive ? "text-primary-glow" : "text-slate-500"
                                    )}
                                >
                                    {tab.name}
                                </motion.span>

                                {isActive && (
                                    <motion.div
                                        layoutId="active-dot"
                                        className="w-1 h-1 bg-primary rounded-full mt-1 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileTabBar;

