import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock, Sparkles, AlertCircle, Github, Linkedin, Instagram } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';

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
                // Keep note null to show the not found state
                console.warn(`Note with id ${id} not found.`);
            }
        } catch (error) {
            console.error('Error fetching note:', error);
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

    if (!note) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#030014] px-6 text-center">
                <div className="p-12 obsidian-card rounded-[3rem] border-white/5 max-w-lg w-full">
                    <AlertCircle className="w-16 h-16 text-primary mx-auto mb-6 opacity-50" />
                    <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic">Sector Not Found</h2>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em] mb-8 leading-relaxed">
                        The knowledge node you're looking for (ID: {id}) does not exist or has been relocated within the archive.
                    </p>
                    <button
                        onClick={() => navigate('/notes')}
                        className="w-full py-4 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
                    >
                        Return to Archive
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen digital-grid pt-24 md:pt-32 pb-32 md:pb-40">
            {note && (
                <SEO
                    title={note.title}
                    description={note.description}
                    image={note.image}
                    url={`/notes/${note.id}`}
                    keywords={note.tags?.join(', ')}
                    type="article"
                    date={note.createdAt?.toISOString()}
                    author="Coderafroj"
                />
            )}
            <div className="w-full max-w-7xl mx-auto relative px-4 md:px-6">
                {/* Visual Glows */}
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

                {/* Navigation & Header */}
                <div className="relative z-10 mb-16 text-center">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/notes')}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-all group mb-8 md:mb-12"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase">Return to Terminal</span>
                    </motion.button>

                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center"
                        >
                            <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
                                {note.isStatic && (
                                    <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-glow rounded-2xl border border-primary/20 text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(47,129,247,0.15)]">
                                        <Sparkles size={14} className="animate-pulse" /> Node_Authority: High
                                    </span>
                                )}
                                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-400 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest">
                                    <Clock size={14} /> 5 Min Read
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] md:leading-none uppercase italic mb-8 w-full text-center">
                                {note.title}
                            </h1>
                            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-500 font-mono text-xs">
                                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent p-[1px]">
                                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white uppercase italic">AF</div>
                                    </div>
                                    <span className="text-white font-bold italic underline decoration-primary/30">Coderafroj</span>
                                </div>
                                <span className="text-slate-700 hidden sm:block">•</span>
                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                    <Calendar size={14} className="text-primary" />
                                    {note.createdAt?.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid lg:grid-cols-[1fr_350px] gap-10 lg:gap-16 relative z-10 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8 md:space-y-12"
                    >
                        {note.image && (
                            <div className="relative group perspective-1000">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-30 group-hover:opacity-60 transition-opacity rounded-[3rem]" />
                                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 aspect-video mb-12 shadow-2xl">
                                    <img
                                        src={note.image}
                                        alt={note.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </div>
                            </div>
                        )}

                        <div className="premium-markdown obsidian-card p-5 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] border-white/5 bg-black/40 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                            <ReactMarkdown>{note.content || note.description}</ReactMarkdown>
                        </div>

                        {/* Social Share / Interaction */}
                        <div className="flex justify-center pt-16 border-t border-white/5">
                            <div className="flex flex-col sm:flex-row items-center gap-8 py-6 px-12 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">Join Community:</span>
                                <div className="flex gap-10">
                                    <a href="https://www.instagram.com/coder_afroj" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-all hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                        <Instagram size={24} />
                                    </a>
                                    <a href="https://github.com/coderafroj" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-all hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                        <Github size={24} />
                                    </a>
                                    <a href="https://in.linkedin.com/in/c-o-d-e-r-a-f-r-o-j-6a626729a" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-all hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                        <Linkedin size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar / Related Contents */}
                    <div className="hidden lg:block space-y-10 sticky top-32 h-fit">
                        <div className="obsidian-card p-8 rounded-3xl border-white/5 bg-white/2">
                            <p className="text-[10px] font-mono text-primary-glow uppercase tracking-[0.3em] mb-6">Article Intel</p>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-[11px] font-mono">
                                    <span className="text-slate-500 uppercase">Category</span>
                                    <span className="text-white font-bold uppercase tracking-widest">{note.category || 'Documentation'}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-mono">
                                    <span className="text-slate-500 uppercase">Status</span>
                                    <span className="text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h3 className="text-[10px] font-mono text-primary-glow uppercase tracking-[0.4em] pl-2">Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {note.tags?.map((tag, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] text-slate-400 font-mono uppercase tracking-[0.2em] hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <div className="obsidian-card p-10 rounded-[2.5rem] border border-primary/20 bg-primary/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <Sparkles size={40} className="text-primary" />
                            </div>
                            <h4 className="text-white font-black mb-4 italic uppercase tracking-tight text-xl">Feedback_Loop</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed mb-8 font-mono">
                                Found a bug or typo in this knowledge node? Report it for optimization.
                            </p>
                            <button onClick={() => navigate('/contact')} className="w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.05] active:scale-95 transition-all shadow-[0_0_30px_rgba(47,129,247,0.3)]">
                                Submit Log
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteView;
