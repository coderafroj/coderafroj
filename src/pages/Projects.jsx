import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProjectCard from '../components/ProjectCard';
import { Sparkles, Terminal } from 'lucide-react';
import SEO from '../components/SEO';
import { projects as localProjects } from '../data/projects';

// Lazy load widgets
const QuoteWidget = lazy(() => import('../components/widgets/QuoteWidget.jsx'));
const WeatherWidget = lazy(() => import('../components/widgets/WeatherWidget.jsx'));
const NewsWidget = lazy(() => import('../components/widgets/NewsWidget.jsx'));
const CurrencyWidget = lazy(() => import('../components/widgets/CurrencyWidget.jsx'));

const widgetMap = {
    QuoteWidget,
    WeatherWidget,
    NewsWidget,
    CurrencyWidget
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'projects'));
                const firebaseProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Merge local and firebase projects, ensuring no duplicates if IDs overlap
                const merged = [...localProjects, ...firebaseProjects.filter(fp => !localProjects.find(lp => lp.id === fp.id))];
                setProjects(merged);
            } catch (err) {
                console.error("Link Failure:", err);
                // Fallback to local only on error
                setProjects(localProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const categories = ['All', ...new Set(projects.map(p => p.category || 'Other'))];
    const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-primary-glow font-mono animate-pulse tracking-widest text-xs">SYNCHRONIZING_PROTOCOLS...</div>
        </div>
    );

    return (
        <div className="pt-40 pb-32 min-h-screen px-6">
            <SEO
                title="Elite Widget Registry"
                description="Explore the Coderafroj Widget Engine. A gallery of high-performance, interactive SaaS nodes for global deployment."
                url="/widgets"
            />
            <div className="max-w-7xl mx-auto">
                <header className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 border border-primary/20 mb-8"
                    >
                        <Terminal size={12} className="text-primary-glow" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary-glow uppercase">Widget__Registry v4.2</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-10 uppercase leading-none"
                    >
                        THE <span className="text-primary drop-shadow-[0_0_40px_rgba(47,129,247,0.3)]">REGISTRY</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed font-light"
                    >
                        A global repository of high-end SaaS widgets. Architecturally verified and ready for deployment.
                    </motion.p>
                </header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center flex-wrap gap-2 mb-20"
                >
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-mono font-bold tracking-widest border transition-all duration-300 active:scale-95 ${filter === cat
                                ? 'bg-primary/20 text-white border-primary shadow-lg shadow-primary/5'
                                : 'bg-[#161b22] text-slate-400 border-[#30363d] hover:border-[#8b949e] hover:text-white'
                                }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => {
                            const WidgetComponent = project.component ? widgetMap[project.component] : null;

                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="h-[500px]"
                                >
                                    {WidgetComponent ? (
                                        <Suspense fallback={<div className="h-full w-full bg-white/5 animate-pulse rounded-2xl" />}>
                                            <WidgetComponent />
                                        </Suspense>
                                    ) : (
                                        <ProjectCard project={project} />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Projects;

