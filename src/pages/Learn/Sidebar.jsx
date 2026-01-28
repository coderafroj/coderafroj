
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ChevronLeft, Search, Book, Sparkles, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ course, isOpen, onClose }) => {
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
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[#050510] border-r border-blue-500/10 z-50 lg:translate-x-0 lg:static lg:block shadow-[10px_0_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col`}
            >
                {/* Sidebar Header */}
                <div className="p-6 border-b border-blue-500/10 bg-[#050510]/95 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[50px] pointer-events-none" />

                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <Link
                            to="/learn"
                            className="flex items-center text-xs font-bold tracking-widest text-blue-400 hover:text-blue-300 uppercase transition-colors group"
                        >
                            <ChevronLeft size={14} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                            Course Index
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <Book size={20} />
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-white/5 text-white/40 uppercase tracking-widest border border-white/5">
                                v2.0
                            </span>
                        </div>
                        <h2 className="text-xl font-black text-white leading-tight bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                            {course.title}
                        </h2>
                        <p className="text-[10px] font-mono text-blue-400/60 mt-2 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            {course.notes?.length || 0} Modules Loaded
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="px-6 py-4">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
                        <div className="relative flex items-center bg-[#0a0a16] border border-white/10 rounded-xl px-4 py-2.5 transition-colors focus-within:border-blue-500/50">
                            <Search size={16} className="text-white/30 mr-3" />
                            <input
                                type="text"
                                placeholder="Search modules..."
                                className="bg-transparent border-none text-sm text-gray-300 placeholder:text-white/20 focus:outline-none w-full font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Scrollable Navigation */}
                <nav className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2 space-y-1">
                    {course.notes?.map((topic, index) => (
                        <NavLink
                            key={topic.id}
                            to={`/learn/${course.id}/${topic.slug}`}
                            onClick={() => {
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={({ isActive }) => `
                                flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative
                                ${isActive
                                    ? 'bg-blue-600/10 text-white border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                                    : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`
                                        text-[10px] font-mono font-bold mr-4 min-w-[1.5rem]
                                        ${isActive ? 'text-blue-400' : 'text-white/20 group-hover:text-white/40'}
                                    `}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    <span className="text-sm font-medium tracking-tight line-clamp-1 flex-1">
                                        {topic.title}
                                    </span>

                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}

                    {/* Bottom spacer */}
                    <div className="h-20" />
                </nav>
            </motion.aside>
        </>
    );
};

export default Sidebar;
