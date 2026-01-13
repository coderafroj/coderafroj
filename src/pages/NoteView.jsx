import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const NoteView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNote();
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-primary-glow font-mono animate-pulse tracking-widest">LOADING...</div>
            </div>
        );
    }

    if (!note) return null;

    return (
        <div className="min-h-screen pt-32 px-6 pb-20">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/notes')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm">BACK TO NOTES</span>
                </motion.button>

                {/* Note Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    {note.image && (
                        <div className="mb-8 rounded-2xl overflow-hidden">
                            <img
                                src={note.image}
                                alt={note.title}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    )}

                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                        {note.title}
                    </h1>

                    <p className="text-xl text-slate-400 mb-6">
                        {note.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-mono">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} />
                            {note.createdAt?.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>

                        {note.tags && note.tags.length > 0 && (
                            <div className="flex items-center gap-2">
                                <Tag size={16} />
                                <div className="flex gap-2">
                                    {note.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-lg border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Note Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="obsidian-card p-10 rounded-3xl border border-[#30363d]"
                >
                    <div className="coderafroj-markdown prose prose-invert max-w-none">
                        <ReactMarkdown>{note.content || note.description}</ReactMarkdown>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block px-6 py-3 bg-[#161b22] rounded-xl border border-[#30363d]">
                        <p className="text-xs font-mono text-slate-500">
                            Written by <span className="text-primary font-bold">CODERAFROJ</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NoteView;
