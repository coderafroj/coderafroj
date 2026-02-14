import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Tag, Sparkles, Search, Command, Zap, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';



const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('all');

    useEffect(() => {
        fetchNotes();
        const params = new URLSearchParams(window.location.search);
        const queryVal = params.get('q');
        if (queryVal) setSearchTerm(queryVal);
    }, []);

    const fetchNotes = async () => {
        try {
            const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const firebaseNotes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            }));

            setNotes(firebaseNotes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            setNotes([]);
        } finally {
            setLoading(false);
        }
    };

    const allTags = [...new Set(notes.flatMap(note => note.tags || []))];

    const filteredNotes = notes.filter(note => {
        const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(w => w);
        const matchesSearch = searchWords.length === 0 || searchWords.every(word =>
            note.title.toLowerCase().includes(word) ||
            note.description.toLowerCase().includes(word) ||
            note.content?.toLowerCase().includes(word)
        );
        const matchesTag = selectedTag === 'all' || note.tags?.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#030014]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-b-2 border-primary rounded-full animate-spin" />
                    <div className="text-primary-glow font-mono animate-pulse tracking-widest text-xs uppercase">Initializing Archive...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen digital-grid pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40">
            <SEO
                title="Computer Science Notes & Architecture"
                description="Access the core data repository for Computer Science, Architecture, and Digital Security concepts. High-quality notes and tutorials."
                url="/notes"
            />
            <div className="max-w-7xl mx-auto relative">
                {/* Visual Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-[120px] pointer-events-none" />

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-24 md:mb-40 relative"
                >
                    <div className="absolute inset-0 bg-primary/20 blur-[150px] -z-10 animate-pulse" />
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-sky-500/10 border border-sky-500/20 rounded-full mb-10 backdrop-blur-3xl">
                        <Zap size={14} className="text-sky-400 animate-pulse" />
                        <span className="text-[10px] font-black font-mono text-sky-400 uppercase tracking-[0.4em]">Knowledge Nexus_v3.0</span>
                    </div>
                    <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-10 selection:bg-sky-500">
                        Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(14,165,233,0.3)]">Archive</span>
                    </h1>
                    <p className="text-slate-400 text-sm md:text-xl max-w-3xl mx-auto font-black leading-relaxed px-4 uppercase tracking-[0.3em] italic opacity-80">
                        The ultimate repository of high-level <span className="text-white border-b-2 border-sky-500/50">Computing Architecture</span> & Advanced Protocols.
                    </p>
                </motion.div>

                {/* Search & Filter - Modern Command Style */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12 md:mb-20 space-y-6 md:space-y-8 max-w-4xl mx-auto"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl opacity-30 group-hover:opacity-100 transition duration-1000 rounded-3xl" />
                        <div className="relative bg-[#030014]/80 backdrop-blur-3xl border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-3 flex items-center">
                            <div className="pl-6 md:pl-8 text-slate-500">
                                <Search size={22} className="text-primary" strokeWidth={3} />
                            </div>
                            <input
                                type="text"
                                placeholder="Decrypt Archive Nodes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent border-none px-4 md:px-8 py-4 md:py-5 text-white placeholder-slate-800 focus:outline-none focus:ring-0 text-sm md:text-xl font-black tracking-widest uppercase italic"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="pr-6 md:pr-8 text-slate-500 hover:text-white transition-colors"
                                >
                                    <Zap size={20} className="text-primary animate-pulse" fill="currentColor" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar mask-gradient-x -mx-4 px-4 md:mx-0 md:px-0">
                        {['all', ...allTags].map((tag, idx) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`
                                    whitespace-nowrap px-6 md:px-8 py-3 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 border backdrop-blur-3xl flex-shrink-0
                                    ${selectedTag === tag
                                        ? 'bg-primary text-white shadow-[0_0_30px_rgba(47,129,247,0.4)] scale-105 border-primary'
                                        : 'bg-white/2 border-white/5 text-slate-500 hover:bg-white/10 hover:border-white/20 hover:text-white'
                                    }
                                `}
                            >
                                {tag.replace(/_/g, ' ')}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 md:gap-3 mb-8 md:mb-12">
                    <div className="status-pulse" />
                    <span className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-wider md:tracking-widest">Showing {filteredNotes.length} active nodes</span>
                </div>

                {/* Grid - Master Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredNotes.map((note, index) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index % 3) * 0.1 }}
                        >
                            <Link
                                to={`/notes/${note.id}`}
                                className="group block h-full"
                            >
                                <div className="obsidian-card group/item p-2 rounded-[3.5rem] border-white/5 flex flex-col h-full hover:border-sky-500/50 transition-all duration-700 relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-700" />

                                    <div className="p-4 md:p-6 flex flex-col h-full">
                                        <div className="mb-8 rounded-[2.8rem] overflow-hidden border border-white/10 aspect-[16/10] relative shadow-2xl">
                                            {note.image ? (
                                                <img
                                                    src={note.image}
                                                    alt={note.title}
                                                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-1000"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                    <BookOpen size={48} className="text-sky-500/20" />
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030014] to-transparent" />
                                            <div className="absolute top-6 left-6 px-4 py-2 bg-sky-500/20 backdrop-blur-xl rounded-2xl border border-sky-500/30">
                                                <span className="text-[9px] font-black text-sky-400 uppercase tracking-[0.2em]">Alpha_Protocol</span>
                                            </div>
                                        </div>

                                        <div className="flex-1 px-4">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.4em] italic">{note.category || 'Architecture'}</span>
                                                <div className="h-[1px] flex-1 bg-gradient-to-r from-sky-500/30 to-transparent" />
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-black text-white mb-6 group-hover/item:text-sky-400 transition-all tracking-tighter uppercase italic leading-[0.9]">
                                                {note.title}
                                            </h3>
                                            <p className="text-slate-400 text-xs md:text-sm mb-8 line-clamp-3 leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity uppercase tracking-widest font-bold font-mono">
                                                {note.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-white/[0.03] rounded-[2.5rem] border border-white/5 mt-auto group-hover/item:border-sky-500/20 transition-all">
                                            <div className="flex items-center gap-4 text-slate-500">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                                                    <Calendar size={16} className="text-sky-500/60" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] uppercase tracking-widest text-slate-600 font-bold">Deployed</span>
                                                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                                                        {note.createdAt?.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 group-hover/item:bg-sky-500 group-hover/item:text-black transition-all duration-500 shadow-xl">
                                                <ArrowRight size={20} className="group-hover/item:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredNotes.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24 md:py-40 obsidian-card rounded-2xl md:rounded-[3rem] border-white/5"
                    >
                        <Search className="w-12 h-12 md:w-16 md:h-16 text-slate-800 mx-auto mb-4 md:mb-6 opacity-50" />
                        <h3 className="text-lg md:text-xl font-bold text-slate-400 mb-2 px-4">No matching nodes found</h3>
                        <p className="text-slate-600 font-mono text-[10px] md:text-xs uppercase tracking-wider md:tracking-widest px-4">Adjust your search parameters</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Notes;
