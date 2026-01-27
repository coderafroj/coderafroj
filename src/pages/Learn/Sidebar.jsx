
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ChevronLeft, BookOpen, Search } from 'lucide-react';
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
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                initial={false}
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed top-0 left-0 bottom-0 w-72 bg-gray-900 border-r border-white/10 z-50 lg:translate-x-0 lg:static lg:block shadow-2xl overflow-y-auto custom-scrollbar`}
            >
                <div className="p-4 border-b border-white/10 sticky top-0 bg-gray-900/95 backdrop-blur z-10">
                    <div className="flex items-center justify-between mb-4">
                        <Link
                            to="/learn"
                            className="flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium"
                        >
                            <ChevronLeft size={16} className="mr-1" />
                            All Courses
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-full"
                        >
                            <X size={20} className="text-white" />
                        </button>
                    </div>

                    <h2 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent truncate" title={course.title}>
                        {course.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">{course.topics.length} Topics</p>
                </div>

                {/* Search (Optional future enhancement, placeholder for now) */}
                <div className="px-4 py-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="w-full bg-black/30 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600"
                        />
                    </div>
                </div>

                <nav className="p-2 space-y-1">
                    {course.topics.map((topic, index) => (
                        <NavLink
                            key={topic.id}
                            to={`/learn/${course.id}/${topic.slug}`}
                            onClick={() => {
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={({ isActive }) => `
                flex items-start p-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                ${isActive
                                    ? 'bg-blue-600/20 text-blue-200 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'}
              `}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`
                    mt-1 min-w-[1.25rem] h-5 flex items-center justify-center rounded text-[10px] font-bold mr-3 transition-colors
                    ${isActive ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-500 group-hover:bg-white/20'}
                  `}>
                                        {index + 1}
                                    </div>
                                    <span className="text-sm font-medium leading-relaxed">{topic.title}</span>

                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute left-0 w-1 h-full bg-blue-500 rounded-r-full top-0"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </motion.aside>
        </>
    );
};

export default Sidebar;
