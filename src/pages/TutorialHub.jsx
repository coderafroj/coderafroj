
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Code, Terminal, Database, Globe, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const tutorials = [
    {
        id: 'python',
        title: 'Python',
        description: 'A popular programming language for Web, AI, and Scripting.',
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" className="w-8 h-8" alt="Python" />,
        color: 'from-blue-600 to-yellow-500',
        bg: 'hover:border-yellow-500/50'
    },
    {
        id: 'c',
        title: 'C',
        description: 'The mother of all languages. High performance and system level.',
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" className="w-8 h-8" alt="C" />,
        color: 'from-blue-500 to-blue-700',
        bg: 'hover:border-blue-500/50'
    },
    {
        id: 'cpp',
        title: 'C++',
        description: 'A powerful extension of C with object-oriented features.',
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" className="w-8 h-8" alt="C++" />,
        color: 'from-blue-700 to-purple-600',
        bg: 'hover:border-blue-700/50'
    },
    {
        id: 'java',
        title: 'Java',
        description: 'A robust, object-oriented language used for enterprise apps.',
        icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" className="w-8 h-8" alt="Java" />,
        color: 'from-red-500 to-orange-600',
        bg: 'hover:border-red-500/50'
    }
];

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
                    {tutorials.map((tut, index) => (
                        <motion.div
                            key={tut.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={`/tutorial/${tut.id}`} className="block h-full">
                                <div className={`h-full bg-[#0d1117] border border-white/5 rounded-3xl p-8 transition-all duration-300 group hover:bg-[#161b22] ${tut.bg} hover:border-opacity-50 hover:shadow-2xl hover:-translate-y-1`}>
                                    <div className="mb-6 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                        {tut.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                                        {tut.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {tut.description}
                                    </p>

                                    <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                        Start Learning <ChevronRight size={16} className="ml-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TutorialHub;
