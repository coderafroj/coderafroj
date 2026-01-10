import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Book, ChevronRight, Code, Cpu, Globe, Rocket, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'tutorials'));
                setTutorials(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Link Failure:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTutorials();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-accent-glow font-mono animate-pulse tracking-widest text-xs">UPLOADING_KNOWLEDGE_MODULES...</div>
        </div>
    );

    return (
        <div className="min-h-screen pt-40 px-6 pb-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
                    >
                        <Sparkles size={14} className="text-accent-glow" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-accent-glow uppercase">Neural Academy</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tighter uppercase"
                    >
                        Logic <span className="text-cyber-blue drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">Matrix</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-dim-text text-lg max-w-2xl mx-auto opacity-60 leading-relaxed uppercase tracking-wide"
                    >
                        Professional-grade knowledge modules engineered to accelerate technical evolution and architectural mastery.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence>
                        {tutorials.map((tutorial, index) => (
                            <motion.div
                                key={tutorial.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={`/tutorial/${tutorial.id}/intro`}
                                    className="obsidian-card group block h-[450px] p-10 rounded-[2.5rem] relative overflow-hidden transition-all duration-700 border-white/5 hover:border-accent/40 hover:scale-[1.02]"
                                >
                                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000 ease-out pointer-events-none">
                                        <Book size={150} className="text-accent-glow" />
                                    </div>

                                    <div className="relative z-20 h-full flex flex-col">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 text-accent-glow group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-accent/20">
                                                <Cpu size={24} />
                                            </div>
                                            <span className="text-[10px] font-mono text-accent-glow tracking-[0.2em] uppercase font-black">
                                                {tutorial.category || 'Module.0x'}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-black text-white mb-4 group-hover:text-accent-glow transition-all duration-500 tracking-tighter uppercase leading-tight line-clamp-2">
                                            {tutorial.title}
                                        </h3>

                                        <p className="text-dim-text mb-8 line-clamp-3 text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                                            {tutorial.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-glow animate-pulse" />
                                                    <span className="text-[10px] font-mono font-bold text-white tracking-[0.2em] uppercase">{tutorial.chapterCount || 0} SUB_UNITS</span>
                                                </div>
                                                <div className="text-[8px] font-mono text-dim-text tracking-widest uppercase opacity-40">Status: Verified</div>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent-glow group-hover:bg-accent group-hover:text-white transition-all duration-500 group-hover:translate-x-2">
                                                <ChevronRight size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glass Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {tutorials.length === 0 && (
                    <div className="text-center py-40 obsidian-card rounded-[3rem] border-dashed border-white/5 max-w-lg mx-auto">
                        <Terminal className="mx-auto text-accent-glow mb-6 opacity-40" size={64} />
                        <h3 className="text-2xl text-white font-black tracking-tighter uppercase mb-2">Registry Empty</h3>
                        <p className="text-dim-text font-mono text-xs tracking-widest uppercase opacity-60">No knowledge modules detected in this node.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tutorials;

