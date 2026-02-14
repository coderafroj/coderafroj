import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Code, Terminal, Database, Globe, ChevronRight, Cpu, FileText, Layout, Layers, ShieldCheck, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FirestoreService } from '../services/FirestoreService';

const courseStyles = {
    'python-masterclass': {
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" className="w-8 h-8" alt="Python" />,
        color: 'from-blue-600 to-yellow-500',
        bg: 'hover:border-yellow-500/50'
    },
    'c-programming': {
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" className="w-8 h-8" alt="C" />,
        color: 'from-blue-500 to-blue-700',
        bg: 'hover:border-blue-500/50'
    },
    'cpp-systems-programming': {
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" className="w-8 h-8" alt="C++" />,
        color: 'from-blue-700 to-purple-600',
        bg: 'hover:border-blue-700/50'
    },
    'java-programming': {
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" className="w-8 h-8" alt="Java" />,
        color: 'from-red-500 to-orange-600',
        bg: 'hover:border-red-500/50'
    },
    'javascript-deep-dive': {
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" className="w-8 h-8" alt="JS" />,
        color: 'from-yellow-400 to-yellow-600',
        bg: 'hover:border-yellow-400/50'
    },
    'html5-mastery': {
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" className="w-8 h-8" alt="HTML" />,
        color: 'from-orange-500 to-red-600',
        bg: 'hover:border-orange-500/50'
    },
    'advanced-css3': {
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" className="w-8 h-8" alt="CSS" />,
        color: 'from-blue-400 to-blue-600',
        bg: 'hover:border-blue-400/50'
    },
    'react-js-ecosystem': {
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" className="w-8 h-8" alt="React" />,
        color: 'from-cyan-400 to-blue-500',
        bg: 'hover:border-cyan-400/50'
    },
    'computer-fundamentals': {
        icon: <Terminal size={32} className="text-green-400" />,
        color: 'from-green-500 to-emerald-700',
        bg: 'hover:border-green-500/50'
    },
    'office-automation': {
        icon: <FileText size={32} className="text-blue-400" />,
        color: 'from-blue-400 to-indigo-600',
        bg: 'hover:border-blue-400/50'
    },
    'pc-maintenance-troubleshooting': {
        icon: <Cpu size={32} className="text-purple-400" />,
        color: 'from-purple-500 to-pink-600',
        bg: 'hover:border-purple-500/50'
    },
    'internet-web-technology': {
        icon: <Globe size={32} className="text-cyan-400" />,
        color: 'from-cyan-500 to-blue-600',
        bg: 'hover:border-cyan-500/50'
    },
    'iot-mastery': {
        icon: <Layers size={32} className="text-yellow-400" />,
        color: 'from-yellow-400 to-orange-600',
        bg: 'hover:border-yellow-400/50'
    }
};

const TutorialHub = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const cloudCourses = await FirestoreService.getCourses();
                // Fetch note counts for each course
                const fullCourses = await Promise.all(cloudCourses.map(async (c) => {
                    const notes = await FirestoreService.getNotes(c.id);
                    return { ...c, notesCount: notes.length };
                }));
                setCourses(fullCourses);
            } catch (err) {
                console.error("Fetch Courses Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#030014]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-b-2 border-sky-500 rounded-full animate-spin" />
                    <div className="text-sky-500 font-mono animate-pulse tracking-widest text-xs uppercase">Connecting to Nexus...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030014] pt-24 pb-20 px-4">
            <SEO
                title="Tutorial Hub"
                description="Master modern technologies with Coderafroj's library of depth-first tutorials and developer documentation."
            />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-sky-500/10 border border-sky-500/20 rounded-full mb-10 backdrop-blur-3xl">
                        <Zap size={14} className="text-sky-400 animate-pulse" />
                        <span className="text-[10px] font-black font-mono text-sky-400 uppercase tracking-[0.4em]">Knowledge Nexus_v3.0</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter italic">
                        Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(14,165,233,0.3)]">Archive</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto uppercase tracking-widest font-bold opacity-70">
                        Premium archival data for modern system architects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => {
                        const style = courseStyles[course.id] || {
                            icon: <Book size={32} className="text-gray-400" />,
                            color: 'from-gray-600 to-gray-400',
                            bg: 'hover:border-gray-400/50'
                        };

                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link to={`/learn/${course.id}`} className="group block h-full">
                                    <div className={`h-full bg-white/[0.02] border border-white/5 rounded-[3rem] p-4 transition-all duration-700 group hover:bg-white/[0.04] ${style.bg} hover:border-sky-500/30 overflow-hidden relative backdrop-blur-3xl shadow-2xl`}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                        {/* Image Area */}
                                        <div className="mb-6 rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video relative shadow-2xl">
                                            {course.image ? (
                                                <img src={course.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${style.color} flex items-center justify-center opacity-20`}>
                                                    {style.icon}
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030014] to-transparent" />
                                            <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
                                                {style.icon}
                                            </div>
                                        </div>

                                        <div className="px-6 pb-6">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em] italic">{course.id.includes('-') ? course.id.split('-')[0] : 'Nexus'}</span>
                                                <div className="h-[1px] flex-1 bg-gradient-to-r from-sky-500/30 to-transparent" />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-4 group-hover:text-sky-400 transition-all tracking-tighter uppercase italic leading-[0.9]">
                                                {course.title}
                                            </h3>
                                            <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 uppercase tracking-widest font-bold font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                                                {course.description}
                                            </p>

                                            <div className="mt-8 flex items-center justify-between p-5 bg-white/[0.03] rounded-3xl border border-white/5 group-hover:border-sky-500/20 transition-all">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Modules</span>
                                                    <span className="text-white font-black">{course.notesCount || 0} Deployed</span>
                                                </div>
                                                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-black transition-all duration-500">
                                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TutorialHub;
