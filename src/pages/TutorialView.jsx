import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, ChevronRight, List, Book, Menu, X, Clock, Terminal, Share2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const TutorialView = () => {
    const { tutorialId, chapterId } = useParams();
    const [tutorial, setTutorial] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [currentChapter, setCurrentChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const tutDoc = await getDoc(doc(db, 'tutorials', tutorialId));
                if (tutDoc.exists()) setTutorial(tutDoc.data());

                const q = query(
                    collection(db, 'chapters'),
                    where('tutorialId', '==', tutorialId),
                    orderBy('order', 'asc')
                );
                const qSnap = await getDocs(q);
                const chaptersData = qSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setChapters(chaptersData);

                const current = chaptersData.find(c => c.id === chapterId) || chaptersData[0];
                setCurrentChapter(current);
            } catch (err) {
                console.error("Link Failure:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [tutorialId, chapterId]);

    const currentIndex = chapters.findIndex(c => c.id === (currentChapter?.id));
    const prevChapter = chapters[currentIndex - 1];
    const nextChapter = chapters[currentIndex + 1];

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-accent-glow font-mono animate-pulse tracking-widest text-xs">UPLINKING_CHAPTER_DATA...</div>
        </div>
    );

    return (
        <div className="min-h-screen flex bg-bg-dark">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary z-[100] origin-left shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                style={{ scaleX }}
            />

            {/* Sidebar Desktop */}
            <aside className="hidden lg:block w-80 border-r border-white/5 pt-32 pb-10 px-8 h-screen sticky top-0 overflow-y-auto scrollbar-hide obsidian-card rounded-none border-t-0 border-b-0 border-l-0">
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-accent-glow font-mono text-[8px] tracking-[0.4em] uppercase mb-4 opacity-70">
                        <Terminal size={10} />
                        Nexus_Module
                    </div>
                    <h1 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter">
                        {tutorial?.title}
                    </h1>
                </div>

                <nav className="space-y-2">
                    {chapters.map((chapter, idx) => {
                        const isActive = chapter.id === currentChapter?.id;
                        return (
                            <Link
                                key={chapter.id}
                                to={`/tutorial/${tutorialId}/${chapter.id}`}
                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative ${isActive
                                    ? 'bg-accent/10 border border-accent/20 text-white shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                                    : 'text-dim-text hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10'
                                    }`}
                            >
                                <span className={`text-[10px] font-mono font-black ${isActive ? 'text-accent-glow' : 'opacity-40 group-hover:opacity-100'}`}>
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-[11px] font-mono font-bold tracking-widest uppercase transition-colors">{chapter.title}</span>
                                {isActive && <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-1/2 bg-accent-glow rounded-full" />}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Sidebar Toggle */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed bottom-8 right-8 z-40 w-14 h-14 rounded-2xl bg-accent text-white shadow-2xl shadow-accent/20 flex items-center justify-center border border-accent-glow/50"
            >
                <List size={24} />
            </motion.button>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            className="fixed inset-y-0 left-0 w-[85%] max-w-sm obsidian-card z-[60] p-10 lg:hidden rounded-none border-t-0 border-b-0 border-l-0"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-xl font-black text-white tracking-tighter uppercase">Nexus Nodes</h2>
                                <button onClick={() => setIsSidebarOpen(false)} className="text-dim-text hover:text-white transition-colors p-2 rounded-xl bg-white/5"><X size={20} /></button>
                            </div>
                            <div className="space-y-2">
                                {chapters.map((chapter, idx) => (
                                    <Link
                                        key={chapter.id}
                                        to={`/tutorial/${tutorialId}/${chapter.id}`}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${chapter.id === currentChapter?.id
                                            ? 'bg-accent/10 border border-accent/20 text-white'
                                            : 'text-dim-text hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="text-[10px] font-mono opacity-40">{idx + 1}</span>
                                        <span className="text-xs font-mono font-bold tracking-widest uppercase">{chapter.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 w-full pt-32 pb-20 px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        key={currentChapter?.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <header className="mb-16 border-b border-white/5 pb-16">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-accent/10 text-accent-glow px-3 py-1 rounded-lg text-[10px] font-mono font-black tracking-[0.3em] border border-accent/20 uppercase">
                                    Segment_{currentIndex + 1}
                                </span>
                                <div className="h-[1px] w-12 bg-white/10" />
                                <span className="text-[10px] font-mono text-dim-text tracking-widest uppercase opacity-40">Ready_for_uplink</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-tight uppercase">
                                {currentChapter?.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono font-bold tracking-widest">
                                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl text-dim-text border border-white/5">
                                    <Clock size={14} className="text-accent-glow" />
                                    <span>UPLINK_TIME: 12_MINS</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl text-dim-text border border-white/5">
                                    <Terminal size={14} className="text-accent-glow" />
                                    <span>DOMAIN: {tutorial?.title?.toUpperCase()}</span>
                                </div>
                            </div>
                        </header>

                        <div className="markdown-content nexus-markdown prose-lg prose-invert max-w-none">
                            <ReactMarkdown>
                                {currentChapter?.content || "TRANSMISSION_ERROR: NO_DATA_DETECTED"}
                            </ReactMarkdown>
                        </div>

                        {/* Pagination */}
                        <div className="mt-32 pt-16 border-t border-white/5 grid sm:grid-cols-2 gap-6">
                            {prevChapter ? (
                                <Link
                                    to={`/tutorial/${tutorialId}/${prevChapter.id}`}
                                    className="obsidian-card group p-8 rounded-[2rem] hover:border-accent/40 transition-all duration-500"
                                >
                                    <span className="text-[10px] font-mono text-dim-text mb-4 block tracking-widest uppercase opacity-40">Previous Segment</span>
                                    <div className="flex items-center gap-4 text-white font-black tracking-tighter text-xl uppercase">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                            <ChevronLeft size={20} />
                                        </div>
                                        <span className="truncate">{prevChapter.title}</span>
                                    </div>
                                </Link>
                            ) : <div />}

                            {nextChapter ? (
                                <Link
                                    to={`/tutorial/${tutorialId}/${nextChapter.id}`}
                                    className="obsidian-card group p-8 rounded-[2rem] border-accent/10 hover:border-accent/40 transition-all duration-500 text-right"
                                >
                                    <span className="text-[10px] font-mono text-dim-text mb-4 block tracking-widest uppercase opacity-40">Next Segment</span>
                                    <div className="flex items-center gap-4 text-accent-glow font-black tracking-tighter text-xl justify-end uppercase">
                                        <span className="truncate">{nextChapter.title}</span>
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl shadow-accent/10">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </Link>
                            ) : <div />}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default TutorialView;

