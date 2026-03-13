
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import MermaidRenderer from '../../components/MermaidRenderer';
import { Calendar, Tag, Share2, Printer, ChevronLeft, ChevronRight, Menu, CheckCircle2, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopicViewer = ({ topic, prevTopic, nextTopic, courseId, course }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!topic || !course) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <span className="text-red-500 text-2xl font-black">!</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2">Sync Error</h2>
            <p className="text-gray-500 max-w-sm">Dena data load karne mein samasya ayi hai. Please course select karein ya page refresh karein.</p>
            <button
                onClick={() => navigate('/learn')}
                className="mt-8 px-6 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-all"
            >
                Back to Protocol
            </button>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mx-auto pb-20"
        >
            {/* Elite Top Navigation Bar */}
            <div className="flex items-center justify-between mb-8 md:mb-12 py-4 border-b border-white/5 bg-[#030014]/90 backdrop-blur-xl z-30 -mx-4 px-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 ${isDropdownOpen ? 'bg-blue-600/10 border border-blue-500/30' : 'bg-white/5 border border-white/5 hover:border-white/10'}`}
                        >
                            <LayoutGrid size={14} className={isDropdownOpen ? 'text-blue-400' : 'text-gray-500'} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white hidden sm:inline">Contents</span>
                            <ChevronRight size={14} className={`text-gray-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-90' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="fixed inset-0 z-[-1]"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-3 w-[300px] max-h-[400px] overflow-y-auto bg-[#0a0a16] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-3 custom-scrollbar"
                                    >
                                        <div className="p-3 mb-2">
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/60 leading-none">Transmission_Index</span>
                                        </div>
                                        {course.notes?.map((n, idx) => (
                                            <button
                                                key={n.id}
                                                onClick={() => {
                                                    navigate(`/learn/${courseId}/${n.slug}`);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${topic.id === n.id ? 'bg-blue-600/10 border border-blue-500/20' : 'hover:bg-white/5 border border-transparent'}`}
                                            >
                                                <span className={`text-[10px] font-mono font-bold ${topic.id === n.id ? 'text-blue-400' : 'text-white/20'}`}>
                                                    {String(idx + 1).padStart(2, '0')}
                                                </span>
                                                <span className={`text-xs font-bold ${topic.id === n.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                    {n.title}
                                                </span>
                                                {topic.id === n.id && <CheckCircle2 size={12} className="ml-auto text-blue-400" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/40">Mod</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 truncate max-w-[120px] sm:max-w-none">{course.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all active:scale-95">
                        <Share2 size={14} />
                    </button>
                </div>
            </div>

            {/* Header */}
            <header className="mb-16 mt-8 md:mt-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-wrap gap-2 mb-8"
                >
                    {topic.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-white/5 text-blue-400 border border-white/10 backdrop-blur-md">
                            #{tag.toUpperCase()}
                        </span>
                    ))}
                </motion.div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.9] uppercase tracking-tighter reveal-text">
                    <span className="block opacity-20 text-xs tracking-[0.5em] mb-2">SEQUENCE_01</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">{topic.title}</span>
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center p-2.5 pr-8 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-xl"
                >
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                        <Calendar size={18} className="text-blue-400" />
                    </div>
                    <div className="ml-4 flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 leading-none mb-1">Initialized</span>
                        <span className="text-sm text-white font-mono font-bold">
                            {new Date(topic.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                    </div>
                </motion.div>
            </header>

            {/* Content Area */}
            <article className="prose prose-invert prose-base md:prose-lg max-w-none 
                prose-p:leading-[1.7] prose-p:text-slate-300/90 prose-p:font-normal
                prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white
                prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-blue-400 prose-h3:mt-12
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-bold
                prose-strong:text-white prose-strong:font-black
                prose-code:text-sky-300 prose-code:font-mono prose-code:bg-white/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none
                prose-img:rounded-3xl prose-img:border prose-img:border-white/5 prose-img:my-12
                prose-ul:list-none prose-ul:pl-0
                prose-li:pl-8 prose-li:relative prose-li:my-4 prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.8em] prose-li:before:w-2 prose-li:before:h-[2px] prose-li:before:bg-blue-500
                prose-table:border-collapse prose-table:w-full prose-table:my-8
                prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-3 prose-th:text-left prose-th:font-black prose-th:text-white
                prose-td:border prose-td:border-white/10 prose-td:p-3 prose-td:text-slate-300
            ">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        img: ({ node, ...props }) => (
                            <img {...props} className="rounded-3xl border border-white/10 shadow-2xl my-8 w-full object-cover" />
                        ),
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const isMermaid = match && match[1] === 'mermaid';

                            if (!inline && isMermaid) {
                                return <MermaidRenderer chart={String(children).replace(/\n$/, '')} />;
                            }

                            return !inline && match ? (
                                <div className="code-mac-case group my-8">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-1000 blur-2xl" />
                                    <div className="code-mac-header">
                                        <div className="flex items-center gap-6">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                            </div>
                                            <span className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em]">{match[1]} package</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Live_Module</span>
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-12 overflow-x-auto custom-scrollbar bg-black/40 backdrop-blur-sm">
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{ margin: 0, padding: 0, background: 'transparent', fontSize: '18px', lineHeight: '1.7', fontFamily: '"JetBrains Mono", monospace' }}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                    <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white transition-colors">
                                            Click_to_Clone
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {topic.content}
                </ReactMarkdown>
            </article>


            {/* Premium Module Navigation */}
            <div className="mt-32 pt-16 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prevTopic ? (
                        <a href={`/learn/${courseId}/${prevTopic.slug}`} className="group relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/5 rounded-full blur-[60px] translate-x-[-20%] translate-y-[-20%]" />
                            <div className="relative z-10">
                                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4 group-hover:text-blue-400 transition-colors">
                                    <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                                    Previous_Transmission
                                </span>
                                <div className="font-black text-white text-2xl group-hover:translate-x-1 transition-transform leading-tight">
                                    {prevTopic.title}
                                </div>
                            </div>
                        </a>
                    ) : <div className="hidden md:block" />}

                    {nextTopic ? (
                        <a href={`/learn/${courseId}/${nextTopic.slug}`} className="group relative p-8 rounded-3xl bg-[#0a0a16] border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all duration-500 overflow-hidden text-right">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-[60px] translate-x-[20%] translate-y-[-20%]" />
                            <div className="relative z-10">
                                <span className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                                    Next_Transmission
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="font-black text-white text-2xl group-hover:-translate-x-1 transition-transform leading-tight">
                                    {nextTopic.title}
                                </div>
                            </div>
                        </a>
                    ) : <div className="hidden md:block" />}
                </div>
            </div>
        </motion.div>
    );
};

export default TopicViewer;
