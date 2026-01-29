import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import BlogCard from '../components/BlogCard';
import { Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'posts'));
                setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Link Failure:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-secondary-glow font-mono animate-pulse tracking-widest text-xs">RETRIEVING_TRANSMISSIONS...</div>
        </div>
    );

    return (
        <div className="pt-40 pb-32 min-h-screen px-6">
            <SEO
                title="Intelligence Logs | Tech Insights"
                description="Deep dives into neural logic, architectural security, and modern web development. Read the latest transmissions from Coderafroj."
                url="/blog"
            />
            <div className="max-w-7xl mx-auto">
                <header className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
                    >
                        <Sparkles size={14} className="text-secondary-glow" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-secondary-glow uppercase">Signal Stream</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 uppercase"
                    >
                        Intel <span className="text-cyber-purple drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">Logs</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-dim-text max-w-2xl mx-auto text-lg leading-relaxed opacity-60 uppercase tracking-wide"
                    >
                        Decrypted transmissions regarding neural logic, architectural security, and the evolving digital singularity.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-40 obsidian-card rounded-3xl border-dashed border-white/5 mx-auto max-w-md">
                        <p className="text-dim-text font-mono text-xs tracking-widest">ERROR: NO_TRANSMISSIONS_DETECTED</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;

