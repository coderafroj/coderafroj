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

const LanguageSelector = ({ courses, selectedCourse, onSelect, searchQuery, onSearchQueryChange }) => {
    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">
                    Select <span className="text-sky-500">Workspace</span>
                </h2>
                <p className="text-slate-500 max-w-md mx-auto">
                    Choose a project to initialize the professional editor environment.
                </p>
            </motion.div>

            {/* Modern Search Field */}
            <div className="relative max-w-xl mx-auto mb-16">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                    type="text"
                    placeholder="System Search: Find course modules..."
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-3xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all backdrop-blur-xl"
                />
            </div>

            <RadioGroup value={selectedCourse} onChange={onSelect}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
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
                                <div className="flex flex-col w-full">
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

                                    <div className="flex items-center gap-3 mt-4">
                                        <div className="h-[2px] w-8 bg-sky-500/30" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                            {course.notes.length} Modules Loaded
                                        </span>
                                    </div>

                                    <div className="absolute bottom-0 right-0 p-8 opacity-5">
                                        <Globe size={120} />
                                    </div>
                                </div>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
};

export default LanguageSelector;
