import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Tag, Sparkles, Search, Command, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content?.toLowerCase().includes(searchTerm.toLowerCase());
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
        <div className="min-h-screen digital-grid pt-32 px-6 pb-40">
            <div className="max-w-7xl mx-auto relative">
                {/* Visual Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-[120px] pointer-events-none" />

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24 relative"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl mb-8">
                        <Command size={14} className="text-primary" />
                        <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.3em]">Knowledge Hub Interface</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none mb-6">
                        Logic <span className="text-primary text-glow-blue underline decoration-primary/20">Archive</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Access the core data repository for Computer Science, Architecture, and Digital Security concepts.
                    </p>
                </motion.div>

                {/* Search & Filter - Modern Command Style */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-20 space-y-8 max-w-4xl mx-auto"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur opacity-30 group-hover:opacity-100 transition duration-1000 rounded-3xl" />
                        <div className="relative bg-[#0d1117]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-2 flex items-center">
                            <div className="pl-6 text-slate-500">
                                <Search size={22} strokeWidth={2.5} />
                            </div>
                            <input
                                type="text"
                                placeholder="Query Knowledge Database..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent border-none px-6 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-0 text-lg font-mono"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="pr-6 text-slate-500 hover:text-white transition-colors"
                                >
                                    <Zap size={18} fill="currentColor" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar mask-gradient-x px-4 md:px-0">
                        {['all', ...allTags].map((tag, idx) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`
                                    whitespace-nowrap px-6 py-2.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 border backdrop-blur-md
                                    ${selectedTag === tag
                                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25 scale-105 border-transparent'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-white'
                                    }
                                `}
                            >
                                {tag.toUpperCase().replace(/_/g, ' ')}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Status Indicator */}
                <div className="flex items-center gap-3 mb-12 px-4">
                    <div className="status-pulse" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Showing {filteredNotes.length} active nodes in current sector</span>
                </div>

                {/* Grid - Master Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                className="group block learning-card h-full"
                            >
                                <div className="learning-card-shadow" />
                                <div className="relative z-10 flex flex-col h-full">
                                    {note.image && (
                                        <div className="mb-6 rounded-[1.5rem] overflow-hidden border border-white/5 aspect-video relative">
                                            <img
                                                src={note.image}
                                                alt={note.title}
                                                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                            {note.isStatic && (
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/20 backdrop-blur-md rounded-lg border border-primary/30 flex items-center gap-2">
                                                    <Sparkles size={12} className="text-primary-glow" />
                                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Verified</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">{note.category || 'Documentation'}</span>
                                            <span className="h-0.5 w-4 bg-white/10" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">
                                            {note.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed font-light">
                                            {note.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-mono uppercase tracking-widest">
                                                {note.createdAt?.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                                            <Zap size={14} className="text-slate-600 group-hover:text-primary transition-colors" />
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
                        className="text-center py-40 obsidian-card rounded-[3rem] border-white/5"
                    >
                        <Search className="w-16 h-16 text-slate-800 mx-auto mb-6 opacity-50" />
                        <h3 className="text-xl font-bold text-slate-400 mb-2">No matching nodes found</h3>
                        <p className="text-slate-600 font-mono text-xs uppercase tracking-widest">Adjust your search parameters or query another sector</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Notes;
