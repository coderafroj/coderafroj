import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Tag, Sparkles, Search, Command, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

import { staticNotes } from '../data/computerNotes';

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

            const processedStatic = staticNotes.map(n => ({
                ...n,
                tags: [...(n.tags || []), 'System_Knowledge'],
                isStatic: true
            }));

            setNotes([...processedStatic, ...firebaseNotes]);
        } catch (error) {
            console.error('Error fetching notes:', error);
            setNotes(staticNotes.map(n => ({ ...n, isStatic: true, tags: [...(n.tags || []), 'System_Knowledge'] })));
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 md:mb-32 relative"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl mb-8">
                        <Command size={14} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-[0.3em]">Knowledge_Archive_v2.0</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter uppercase italic leading-[0.85] mb-8">
                        Logic <span className="text-primary text-glow-blue underline decoration-primary/20">Nexus</span>
                    </h1>
                    <p className="text-slate-500 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4 uppercase tracking-widest italic opacity-60">
                        Decrypting core concepts in Computer Science & Digital Architecture.
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
                                <div className="obsidian-card p-4 md:p-6 rounded-[2.5rem] border-white/5 flex flex-col h-full hover:border-primary/50 transition-all duration-700 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                    {note.image && (
                                        <div className="mb-6 rounded-[2rem] overflow-hidden border border-white/5 aspect-video relative">
                                            <img
                                                src={note.image}
                                                alt={note.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />
                                            {note.isStatic && (
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/20 backdrop-blur-md rounded-xl border border-primary/30 flex items-center gap-2">
                                                    <Sparkles size={12} className="text-primary-glow animate-pulse" />
                                                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Verified</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex-1 relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{note.category || 'Documentation'}</span>
                                            <div className="h-px flex-1 bg-white/5" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tighter uppercase italic leading-none">
                                            {note.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs md:text-sm mb-6 line-clamp-2 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-wider font-bold">
                                            {note.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto relative z-10">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Calendar size={14} className="text-primary/50" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">
                                                {note.createdAt?.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary group-hover:bg-primary/20 transition-all duration-500">
                                            <Zap size={16} className="text-slate-600 group-hover:text-primary transition-colors group-hover:scale-110" />
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
