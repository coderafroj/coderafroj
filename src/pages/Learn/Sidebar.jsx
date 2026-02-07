
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ChevronLeft, Search, Book, Sparkles, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ course, isOpen, onClose }) => {
    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 1024);

    React.useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!course) return null;

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                initial={false}
                animate={{ x: (isOpen || isDesktop) ? 0 : '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed top-0 left-0 bottom-0 w-[300px] glass-plus z-50 lg:translate-x-0 lg:static lg:block overflow-hidden flex flex-col border-r border-white/5`}
            >
                {/* Sidebar Header */}
                <div className="p-8 border-b border-white/5 bg-white/[0.02] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 rounded-full blur-[60px] pointer-events-none" />

                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <Link
                            to="/learn"
                            className="flex items-center text-[10px] font-black tracking-[0.3em] text-blue-400 hover:text-white uppercase transition-all group"
                        >
                            <ChevronLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Return_Home
                        </Link>
                        {isOpen && (
                            <button
                                onClick={onClose}
                                className="lg:hidden p-2 hover:bg-white/5 rounded-xl text-white/50 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                <Hexagon size={24} className="animate-glow-pulse" />
                            </div>
                            <span className="px-3 py-1 rounded-lg text-[9px] font-black bg-white/5 text-white/40 uppercase tracking-[0.3em] border border-white/5">
                                Protocol_v3
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter italic">
                            {course.title}
                        </h2>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="px-8 py-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md" />
                        <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-5 py-3 transition-all focus-within:border-blue-500/30">
                            <Search size={16} className="text-white/20 mr-4" />
                            <input
                                type="text"
                                placeholder="Search modules..."
                                className="bg-transparent border-none text-[11px] font-black uppercase tracking-widest text-white placeholder:text-white/10 focus:outline-none w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Scrollable Navigation */}
                <nav className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-2">
                    {course.notes?.map((topic, index) => (
                        <NavLink
                            key={topic.id}
                            to={`/learn/${course.id}/${topic.slug}`}
                            onClick={() => {
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={({ isActive }) => `
                                flex items-center px-6 py-4 rounded-2xl transition-all duration-500 group relative
                                ${isActive
                                    ? 'bg-blue-600/10 text-white border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.1)]'
                                    : 'text-white/30 hover:bg-white/[0.03] hover:text-white border border-transparent'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`
                                        text-[10px] font-mono font-black mr-5 min-w-[1.8rem] transition-colors
                                        ${isActive ? 'text-blue-400' : 'text-white/10 group-hover:text-white/40'}
                                    `}>
                                        {String(index + 1).padStart(2, '0')}_
                                    </span>

                                    <span className="text-[11px] font-black uppercase tracking-widest line-clamp-1 flex-1">
                                        {topic.title}
                                    </span>

                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,1)]"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                    <div className="h-20" />
                </nav>
            </motion.aside>
        </>
    );
};

export default Sidebar;
