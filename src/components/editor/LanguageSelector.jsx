import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    Code2,
    Cpu,
    Layers,
    Terminal,
    Globe,
    Database,
    Search,
    CheckCircle2
} from 'lucide-react';

import { Plus } from 'lucide-react';

const LanguageSelector = ({ courses, selectedCourse, onSelect, onAddCourse, searchQuery, onSearchQueryChange, loading }) => {
    const [isAdding, setIsAdding] = React.useState(false);
    const [newCourse, setNewCourse] = React.useState({ title: '', description: '' });

    const filteredCourses = (courses || []).filter(c =>
        (c.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
        (c.description || '').toLowerCase().includes((searchQuery || '').toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCourse(newCourse);
        setNewCourse({ title: '', description: '' });
        setIsAdding(false);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-white">
                    Select <span className="text-sky-500">Workspace</span>
                </h2>
                <p className="text-slate-500 max-w-md mx-auto">
                    Choose a project to initialize the professional editor environment.
                </p>
            </motion.div>

            {/* Modern Search Field */}
            <div className="relative max-w-xl mx-auto mb-16 px-4 md:px-0">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none pl-4 md:pl-0">
                    <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                    type="text"
                    placeholder="System Search: Find course modules..."
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all backdrop-blur-xl"
                />
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
                </div>
            ) : (
                <RadioGroup value={selectedCourse} onChange={onSelect}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <RadioGroup.Option
                                key={course.id}
                                value={course}
                                className={({ checked }) => `
                    relative flex cursor-pointer rounded-[2.5rem] border p-8 transition-all duration-300 focus:outline-none focus:ring-0
                    ${checked
                                        ? 'border-sky-500 bg-sky-500/[0.03] shadow-[0_0_50px_rgba(14,165,233,0.15)] scale-[1.02]'
                                        : 'border-white/5 bg-slate-900/30 hover:border-white/20 hover:bg-slate-900/40'
                                    }
                  `}
                            >
                                {({ checked }) => (
                                    <div className="flex flex-col w-full h-full min-h-[160px]">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`
                          p-4 rounded-3xl transition-colors duration-300
                          ${checked ? 'bg-sky-500 text-black' : 'bg-white/5 text-sky-500'}
                        `}>
                                                <Code2 size={28} />
                                            </div>
                                            {checked && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-sky-500"
                                                >
                                                    <CheckCircle2 size={24} fill="currentColor" className="text-black" />
                                                </motion.div>
                                            )}
                                        </div>

                                        <RadioGroup.Label as="h3" className="text-xl font-bold text-white mb-2 uppercase italic tracking-tight">
                                            {course.title}
                                        </RadioGroup.Label>
                                        <p className="text-slate-500 text-xs mb-4 line-clamp-2">{course.description}</p>

                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
                                            <div className="h-[2px] w-8 bg-sky-500/30" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                                {course.notes?.length || 0} Modules Loaded
                                            </span>
                                        </div>

                                        <div className="absolute bottom-0 right-0 p-8 opacity-5">
                                            <Globe size={120} />
                                        </div>
                                    </div>
                                )}
                            </RadioGroup.Option>
                        ))}

                        {/* Add New Course Card */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAdding(true);
                            }}
                            className="relative flex flex-col items-center justify-center cursor-pointer rounded-[2.5rem] border border-dashed border-white/10 p-8 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.05] hover:border-sky-500/50 group min-h-[220px]"
                        >
                            <div className="p-4 rounded-3xl bg-white/5 text-slate-500 group-hover:bg-sky-500 group-hover:text-black transition-all mb-4">
                                <Plus size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-400 group-hover:text-white uppercase italic tracking-tight">
                                New Course
                            </h3>
                            <p className="text-slate-600 text-[10px] mt-2 group-hover:text-slate-500">INITIALIZE NEW ARCHITECTURE</p>
                        </div>
                    </div>
                </RadioGroup>
            )}

            {/* Simple Modal for New Course */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative"
                    >
                        <h3 className="text-2xl font-black uppercase italic text-white mb-6">Initialize Course</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-sky-500 block mb-2">Course Title</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    value={newCourse.title}
                                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-sky-500/50 transition-all placeholder:text-slate-700"
                                    placeholder="e.g. Next.js Masterclass"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-sky-500 block mb-2">Description</label>
                                <textarea
                                    required
                                    value={newCourse.description}
                                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-sky-500/50 transition-all h-24 resize-none placeholder:text-slate-700"
                                    placeholder="A brief overview of the course content..."
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsAdding(false);
                                    }}
                                    className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-bold uppercase text-xs hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 rounded-2xl bg-sky-500 text-black font-bold uppercase text-xs hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                                >
                                    Initialize
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
