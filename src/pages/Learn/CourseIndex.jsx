
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { courses as staticCourses } from '../../data/notes';
import { BookOpen, Code, Terminal, Cpu, Database, FileText } from 'lucide-react';
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

                                    {/* Scanline Effect on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CourseIndex;
