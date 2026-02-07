import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Code, Terminal, Database, Globe, ChevronRight, Cpu, FileText, Layout, Layers, ShieldCheck, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import { courses } from '../data/notes';

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
    return (
        <div className="min-h-screen bg-[#030014] pt-24 pb-20 px-4">
            <SEO
                title="Tutorial Hub"
                description="Master modern technologies with Coderafroj's library of depth-first tutorials and developer documentation."
            />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
                        Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Docs</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Premium documentation and tutorials for modern developers. Master the technologies that power the web.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <Link to={`/learn/${course.id}`} className="block h-full">
                                    <div className={`h-full bg-[#0d1117] border border-white/5 rounded-3xl p-8 transition-all duration-300 group hover:bg-[#161b22] ${style.bg} hover:border-opacity-50 hover:shadow-2xl hover:-translate-y-1`}>
                                        <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            {style.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed line-clamp-2">
                                            {course.description}
                                        </p>

                                        <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                            Start Learning <ChevronRight size={16} className="ml-1" />
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
