import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    ChevronRight,
    Share2,
    Clock,
    Tag,
    Sparkles,
    MousePointer2,
    Layout
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PremiumTutorialViewer = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const loadTutorial = async () => {
            try {
                // Dynamic import from the generated folder
                const module = await import(`../../data/generated_tutorials/${slug}.json`);
                setTutorial(module.default || module);
            } catch (err) {
                console.error("Failed to load tutorial:", err);
            } finally {
                setLoading(false);
            }
        };
        loadTutorial();

        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full"
            />
        </div>
    );

    if (!tutorial) return (
        <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center text-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter text-red-500">Transmission Interrupted</h2>
            <p className="text-slate-400 mb-8">The requested module could not be synchronized.</p>
            <button
                onClick={() => navigate(-1)}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-black uppercase text-[10px] tracking-widest"
            >
                Return to Base
            </button>
        </div>
    );

    return (
        <div ref={containerRef} className="min-h-screen bg-[#030014] text-slate-300 selection:bg-blue-500/30 font-sans">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
            </div>

            {/* Premium Header */}
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'py-4 bg-[#030014]/80 backdrop-blur-xl border-b border-white/5' : 'py-8'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-400/50 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block">Back</span>
                    </button>

                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
                            <Clock size={14} className="text-blue-400" />
                            <span className="text-[10px] font-bold text-white/70 uppercase">Elite Processing</span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{tutorial.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-500 hover:text-white transition-all">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative pt-40 pb-32 max-w-4xl mx-auto px-6">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                        >
                            <Sparkles size={12} />
                            Premium_Module_v2
                        </motion.span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter uppercase italic">
                        {tutorial.title}
                    </h1>

                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                        {tutorial.description}
                    </p>

                    <div className="mt-12 flex flex-wrap gap-4">
                        {tutorial.tags?.map(tag => (
                            <span key={tag} className="px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Content Area */}
                <motion.article
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="prose prose-invert prose-lg max-w-none 
                        prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white
                        prose-p:text-slate-400 prose-p:leading-[1.8] prose-p:font-light
                        prose-strong:text-blue-400 prose-strong:font-black
                        prose-code:text-sky-300 prose-code:bg-white/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg
                        prose-pre:bg-black/40 prose-pre:backdrop-blur-xl prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2rem] prose-pre:p-8
                        prose-li:text-slate-400 prose-li:marker:text-blue-500
                        prose-img:rounded-[2rem] prose-img:border prose-img:border-white/5 prose-img:shadow-2xl
                    "
                >
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h1: ({ children }) => (
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="text-4xl mt-16 mb-8 pt-16 border-t border-white/5"
                                >
                                    {children}
                                </motion.h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-3xl mt-12 mb-6 text-blue-100">{children}</h2>
                            ),
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <div className="relative group my-8">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            className="!bg-black/60 rounded-[2rem] !p-8 !m-0 border border-white/10"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {tutorial.content}
                    </ReactMarkdown>
                </motion.article>

                {/* Sticky Footer Action */}
                <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-blue-600 to-purple-800 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Continue Exploration</h3>
                            <p className="text-blue-100/70 font-medium">Return to the learning hub to explore more modules.</p>
                        </div>
                        <button
                            onClick={() => navigate('/learn')}
                            className="px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            Back to Hub
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PremiumTutorialViewer;
