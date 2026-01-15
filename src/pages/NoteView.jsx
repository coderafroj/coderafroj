import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { staticNotes } from '../data/computerNotes';

const NoteView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNote();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchNote = async () => {
        try {
            const staticNode = staticNotes.find(n => n.id === id || n.slug === id);
            if (staticNode) {
                setNote({ ...staticNode, isStatic: true });
                setLoading(false);
                return;
            }

            const docRef = doc(db, 'notes', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setNote({
                    id: docSnap.id,
                    ...docSnap.data(),
                    createdAt: docSnap.data().createdAt?.toDate()
                });
            } else {
                navigate('/notes');
            }
        } catch (error) {
            console.error('Error fetching note:', error);
            navigate('/notes');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#030014]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <div className="text-primary-glow font-mono animate-pulse tracking-[0.3em] uppercase text-xs">Accessing Data Bank...</div>
                </div>
            </div>
        );
    }

    if (!note) return null;

    return (
        <div className="min-h-screen digital-grid pt-32 px-6 pb-40">
            <div className="max-w-5xl mx-auto relative">
                {/* Visual Glows */}
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Navigation & Header */}
                <div className="relative z-10 mb-16">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/notes')}
                        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-all group mb-12"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-[10px] font-black tracking-[0.3em] uppercase">Return to Terminal</span>
                    </motion.button>

                    <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                {note.isStatic && (
                                    <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-glow rounded-2xl border border-primary/20 text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(47,129,247,0.15)]">
                                        <Sparkles size={14} className="animate-pulse" /> Node_Authority: High
                                    </span>
                                )}
                                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-400 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest">
                                    <Clock size={14} /> 5 Min Read
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase italic mb-8">
                                {note.title}
                            </h1>
                            <div className="flex items-center gap-4 text-slate-500 font-mono text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent p-[1px]">
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">AF</div>
                                    </div>
                                    <span className="text-white font-bold italic underline decoration-primary/30">Coderafroj</span>
                                </div>
                                <span className="text-slate-700">•</span>
                                <span className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    {note.createdAt?.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="hidden lg:block obsidian-card p-6 rounded-3xl border-white/5"
                        >
                            <p className="text-[10px] font-mono text-primary-glow uppercase tracking-[0.3em] mb-4">Quick Stats</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Category:</span>
                                    <span className="text-white font-bold uppercase tracking-widest">{note.category || 'Documentation'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Node Status:</span>
                                    <span className="text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Synced
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-[1fr_300px] gap-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-12"
                    >
                        {note.image && (
                            <div className="relative group perspective-1000">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur opacity-30 group-hover:opacity-60 transition-opacity rounded-[3rem]" />
                                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 aspect-video mb-12">
                                    <img
                                        src={note.image}
                                        alt={note.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                </div>
                            </div>
                        )}

                        <div className="premium-markdown obsidian-card p-10 md:p-16 rounded-[3rem] border-white/5 bg-black/40 backdrop-blur-3xl shadow-2xl">
                            <ReactMarkdown>{note.content || note.description}</ReactMarkdown>
                        </div>

                        {/* Social Share / Interaction */}
                        <div className="flex justify-center pt-12 border-t border-white/5">
                            <div className="flex items-center gap-8 py-4 px-10 bg-white/5 rounded-full border border-white/10">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Share Protocol:</span>
                                <div className="flex gap-6">
                                    {['TW', 'GH', 'LK'].map(soc => (
                                        <button key={soc} className="text-white font-black hover:text-primary transition-colors text-xs">{soc}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar / Related Contents */}
                    <div className="hidden lg:block space-y-10 sticky top-32 h-fit">
                        <section className="space-y-6">
                            <h3 className="text-[10px] font-mono text-primary-glow uppercase tracking-[0.4em]">Index Keys</h3>
                            <div className="flex flex-wrap gap-2">
                                {note.tags?.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] text-slate-400 font-mono uppercase tracking-widest hover:border-primary/30 transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <div className="obsidian-card p-8 rounded-3xl border border-primary/20 bg-primary/5">
                            <h4 className="text-white font-bold mb-3 italic">Need Help?</h4>
                            <p className="text-xs text-slate-400 leading-relaxed mb-6">
                                If you find any technical inconsistency in this node, please report it to the core developer.
                            </p>
                            <button onClick={() => navigate('/contact')} className="w-full py-3 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(47,129,247,0.2)]">
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteView;
