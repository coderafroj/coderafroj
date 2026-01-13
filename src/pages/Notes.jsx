import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Tag, Sparkles, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('all');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const notesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            }));
            setNotes(notesData);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const allTags = [...new Set(notes.flatMap(note => note.tags || []))];

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === 'all' || note.tags?.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-primary-glow font-mono animate-pulse tracking-widest">LOADING CODERAFROJ NOTES...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-6 pb-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                            <BookOpen size={24} className="text-primary-glow" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
                        CODERAFROJ <span className="text-primary italic">NOTES</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Knowledge base, tutorials, and technical documentation
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12 space-y-6"
                >
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#161b22] border border-[#30363d] rounded-2xl pl-14 pr-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>

                    {/* Tags Filter */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={() => setSelectedTag('all')}
                            className={`px-6 py-2 rounded-xl text-xs font-bold tracking-widest transition-all ${selectedTag === 'all'
                                    ? 'bg-primary text-white'
                                    : 'bg-[#161b22] text-slate-400 hover:text-white border border-[#30363d]'
                                }`}
                        >
                            ALL
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-6 py-2 rounded-xl text-xs font-bold tracking-widest transition-all ${selectedTag === tag
                                        ? 'bg-primary text-white'
                                        : 'bg-[#161b22] text-slate-400 hover:text-white border border-[#30363d]'
                                    }`}
                            >
                                {tag.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note, index) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={`/notes/${note.id}`}
                                className="block obsidian-card p-6 rounded-[2rem] border border-[#30363d] hover:border-primary/50 hover:card-glow-blue transition-all duration-500 group h-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <Sparkles size={16} className="text-primary-glow" />
                                </div>

                                {note.image && (
                                    <div className="mb-6 rounded-2xl overflow-hidden border border-white/5">
                                        <img
                                            src={note.image}
                                            alt={note.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                )}

                                <h3 className="text-xl font-black text-white mb-3 group-hover:text-primary transition-colors">
                                    {note.title}
                                </h3>

                                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                                    {note.description}
                                </p>

                                {note.tags && note.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {note.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-lg border border-primary/20"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                                    <span className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {note.createdAt?.toLocaleDateString()}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredNotes.length === 0 && (
                    <div className="text-center py-20">
                        <Sparkles className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-mono">No notes found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notes;
