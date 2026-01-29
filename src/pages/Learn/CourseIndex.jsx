
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { courses } from '../../data/notes';
import { BookOpen, Code, Terminal, Cpu, Database, FileText } from 'lucide-react';
import SEO from '../../components/SEO';

const icons = {
    'c-programming': Code,
    'computer-fundamentals': Terminal,
    'iot': Cpu,
    'python-masterclass': Database,
    'office-automation': FileText
};

const CourseIndex = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <SEO
                title="Learning Pathways"
                description="Explore depth-first computer science courses and master programming languages, computer fundamentals, and tech concepts."
            />
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                        Learning Pathways
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Master computer science concepts with our premium, depth-first courses.
                        Select a track to begin your journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => {
                        const Icon = icons[course.id] || BookOpen;
                        return (
                            <Link key={course.id} to={`/learn/${course.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03, rotate: 1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 shadow-xl overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

                                    <div className="relative z-10">
                                        <div className="mb-4 p-3 rounded-lg bg-blue-500/20 w-fit text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/30 transition-colors">
                                            <Icon size={32} />
                                        </div>

                                        <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors">
                                            {course.title}
                                        </h2>

                                        <p className="text-gray-400 mb-6 line-clamp-3 group-hover:text-gray-300">
                                            {course.description}
                                        </p>

                                        <div className="flex items-center text-sm font-medium text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                                            View Course <span className="ml-2">→</span>
                                        </div>
                                    </div>

                                    {/* Decorative blobs */}
                                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-all" />
                                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/40 transition-all" />
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
