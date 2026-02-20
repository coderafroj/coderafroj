
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { courses as staticCourses } from '../../data/notes';
import { BookOpen, Code, Terminal, Cpu, Database, FileText, ChevronRight } from 'lucide-react';
import SEO from '../../components/SEO';
import { FirestoreService } from '../../services/FirestoreService';

const icons = {
    'c-programming': Code,
    'computer-fundamentals': Terminal,
    'iot': Cpu,
    'python-masterclass': Database,
    'office-automation': FileText
};

const CourseIndex = () => {
    const [courses, setCourses] = React.useState(staticCourses);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadCourses = async () => {
            try {
                const cloudCourses = await FirestoreService.getCourses();
                if (cloudCourses.length > 0) {
                    // Combine cloud courses with static ones for a full list
                    // Use a Map to avoid duplicates by ID
                    const courseMap = new Map();
                    staticCourses.forEach(c => courseMap.set(c.id, c));
                    cloudCourses.forEach(c => courseMap.set(c.id, { ...courseMap.get(c.id), ...c }));
                    setCourses(Array.from(courseMap.values()));
                }
            } catch (err) {
                console.error("Public Load Error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);
    const [aiTutorials, setAiTutorials] = React.useState([]);
    const [premiumTutorials, setPremiumTutorials] = React.useState([]);

    React.useEffect(() => {
        // Load Generated Tutorials dynamically
        const loadTutorials = async () => {
            try {
                // Vite specific glob import
                const modules = import.meta.glob('../../data/generated_tutorials/*.json');
                const ai = [];
                const premium = [];
                for (const path in modules) {
                    const mod = await modules[path]();
                    const data = mod.default || mod;
                    if (data.tags?.includes('Elite') || data.tags?.includes('Premium')) {
                        premium.push(data);
                    } else {
                        ai.push(data);
                    }
                }
                setAiTutorials(ai);
                setPremiumTutorials(premium);
            } catch (err) {
                console.error("Failed to load tutorials", err);
            }
        };
        loadTutorials();
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-24 infinite-canvas text-white">
            <SEO
                title="Learning Pathways | Elite Architech"
                description="Explore depth-first computer science courses and master programming languages, computer fundamentals, and tech concepts."
            />
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-24"
                >
                    <div className="flex justify-center mb-8">
                        <span className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                            Educational_Protocol_Active
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase">
                        Learning <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">Pathways</span>
                    </h1>
                    <p className="text-white/40 text-sm md:text-base font-mono uppercase tracking-[0.2em] max-w-2xl mx-auto">
                        Mastering the digital landscape through depth-first exploration and premium architecture.
                    </p>
                </motion.div>

                {/* Standard Courses */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
                    {courses.map((course, index) => {
                        const Icon = icons[course.id] || BookOpen;
                        return (
                            <Link key={course.id} to={`/learn/${course.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ y: -15 }}
                                    className="group relative h-[450px] p-10 rounded-[2.5rem] glass-plus hover:border-blue-500/40 transition-all duration-700 overflow-hidden flex flex-col justify-between"
                                >
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="relative z-10">
                                        <div className="mb-10 p-5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit text-blue-400 group-hover:text-white group-hover:bg-blue-600 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500">
                                            <Icon size={40} strokeWidth={1.5} />
                                        </div>

                                        <h2 className="text-3xl font-black mb-6 text-white group-hover:translate-x-2 transition-transform duration-500 uppercase tracking-tight">
                                            {course.title}
                                        </h2>

                                        <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:text-white/60 transition-colors">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/60 group-hover:text-blue-400 transition-colors">
                                            Initialize_Module
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                            <span className="text-2xl mt-[-4px]">→</span>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>

                {/* Elite Knowledge Base (Extracted from PDFs) */}
                {premiumTutorials.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-t border-white/10 pt-24 mb-32"
                    >
                        <div className="flex items-center gap-4 mb-16">
                            <div className="h-px bg-white/10 flex-1" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">ELITE_ARCHIVE_DATA</span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {premiumTutorials.map((tutorial, idx) => (
                                <Link key={idx} to={`/premium-tutorial/${tutorial.slug}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group relative p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors" />

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-8">
                                                <span className="px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em]">
                                                    High_Level_Module
                                                </span>
                                                <div className="h-[1px] w-8 bg-white/10" />
                                                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                                                    SYN_PROTO_{String(idx).padStart(3, '0')}
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-black text-white mb-6 group-hover:translate-x-2 transition-transform duration-500 uppercase tracking-tighter leading-[0.9]">
                                                {tutorial.title}
                                            </h3>

                                            <p className="text-white/40 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                                                {tutorial.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    {tutorial.tags?.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-[9px] font-black text-blue-500/40 uppercase tracking-widest">#{tag}</span>
                                                    ))}
                                                </div>
                                                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                                    <ChevronRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* AI Knowledge Base Section */}
                {aiTutorials.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-t border-white/10 pt-24"
                    >
                        <div className="flex items-center gap-4 mb-16">
                            <div className="h-px bg-white/10 flex-1" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">AI_KNOWLEDGE_BASE</span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {aiTutorials.map((tutorial, idx) => (
                                <Link key={idx} to={`/ai-tutorial/${tutorial.slug}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group p-8 rounded-3xl bg-[#0a0a16] border border-white/5 hover:border-blue-500/30 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-purple-500/20">
                                                AI_Generated
                                            </span>
                                            <span className="text-[10px] font-mono text-white/20 uppercase">
                                                ID: {String(idx).padStart(3, '0')}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors uppercase leading-tight">
                                            {tutorial.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {tutorial.tags?.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[9px] font-mono text-white/30 uppercase">#{tag}</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CourseIndex;
