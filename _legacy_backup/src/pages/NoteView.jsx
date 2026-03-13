import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock, Sparkles, AlertCircle, Github, Linkedin, Instagram } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';



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
                <div className="relative z-10 mb-20 text-center">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/notes')}
                        className="inline-flex items-center gap-3 text-slate-500 hover:text-sky-400 transition-all group mb-16 px-6 py-2 bg-white/5 rounded-full border border-white/5"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-sky-400" />
                        <span className="font-black text-[10px] uppercase tracking-[0.4em] italic leading-none">Back_To_Nexus</span>
                    </motion.button>

                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center"
                        >
                            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
                                <span className="flex items-center gap-2 px-6 py-3 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-3xl shadow-[0_0_40px_rgba(14,165,233,0.15)]">
                                    <Sparkles size={14} className="animate-pulse" /> Core_Node: Level_1
                                </span>
                                <span className="flex items-center gap-2 px-6 py-3 bg-white/2 text-slate-500 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-3xl">
                                    <Clock size={14} className="text-sky-500/50" /> Sync: Operational
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase italic mb-12 w-full text-center selection:bg-sky-500 selection:text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                {note.title}
                            </h1>

                            <div className="flex flex-wrap justify-center items-center gap-8 font-mono">
                                <div className="flex items-center gap-5 bg-white/[0.03] px-8 py-4 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                                        <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-xs font-black text-white uppercase italic">AF</div>
                                    </div>
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="text-[9px] uppercase tracking-widest text-slate-500 mb-1.5 font-black">Architect</span>
                                        <span className="text-white font-black italic tracking-tighter uppercase text-base">Coderafroj</span>
                                    </div>
                                </div>
                                <div className="hidden sm:block h-12 w-[1px] bg-white/10" />
                                <div className="flex items-center gap-5 bg-white/[0.03] px-8 py-4 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-2xl">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/5">
                                        <Calendar size={18} className="text-sky-400" />
                                    </div>
                                    <div className="flex flex-col items-start leading-none">
                                        <span className="text-[9px] uppercase tracking-widest text-slate-500 mb-1.5 font-black">Timestamp</span>
                                        <span className="text-white font-black uppercase tracking-tighter text-base">
                                            {note.createdAt?.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
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

                        <div className="premium-markdown obsidian-card p-6 md:p-20 lg:p-32 rounded-[4rem] border-white/10 bg-white/[0.01] backdrop-blur-3xl shadow-[0_50px_150px_rgba(0,0,0,0.8)] overflow-hidden relative group/content transition-all duration-700 hover:bg-white/[0.02] hover:border-sky-500/20">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/10 rounded-full blur-[80px] opacity-0 group-hover/content:opacity-100 transition-opacity" />
                            <div className="prose prose-invert prose-sky max-w-none 
                                prose-headings:font-black prose-headings:italic prose-headings:uppercase prose-headings:tracking-tighter
                                prose-h1:text-6xl prose-h2:text-4xl prose-h3:text-2xl
                                prose-p:text-slate-400 prose-p:leading-relaxed prose-p:text-lg
                                prose-strong:text-white prose-strong:font-black
                                prose-code:text-sky-400 prose-code:bg-sky-500/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-slate-950 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2rem]
                                prose-li:text-slate-400 prose-li:text-lg
                                prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-500/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic
                            ">
                                <ReactMarkdown>{note.content || note.description}</ReactMarkdown>
                            </div>
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
                        <div className="obsidian-card p-8 rounded-[2rem] border-white/5 bg-white/2 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <AlertCircle size={40} className="text-primary" />
                            </div>
                            <p className="text-[10px] font-black text-primary-glow uppercase tracking-[0.4em] mb-8 italic">Archive_Intel</p>
                            <div className="space-y-8">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[9px] uppercase tracking-[0.3em] text-slate-600 font-black">Classification</span>
                                    <span className="text-white font-black uppercase tracking-widest text-sm italic">{note.category || 'Documentation'}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[9px] uppercase tracking-[0.3em] text-slate-600 font-black">Node_Status</span>
                                    <span className="text-green-500 font-black uppercase tracking-[0.2em] flex items-center gap-3 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" /> Decrypted
                                    </span>
                                </div>
                            </div>
                        </div>

                        <section className="space-y-8 pl-4">
                            <h3 className="text-[10px] font-black text-primary-glow uppercase tracking-[0.5em] italic">Keywords</h3>
                            <div className="flex flex-wrap gap-3">
                                {note.tags?.map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/2 border border-white/5 rounded-xl text-[10px] text-slate-500 font-black uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all cursor-pointer hover:bg-primary/10">
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
