
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { Calendar, Tag, Share2, Printer } from 'lucide-react';

const TopicViewer = ({ topic, prevTopic, nextTopic, courseId }) => {
    if (!topic) return <div className="p-8 text-center text-gray-500">Select a topic to start learning</div>;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl mx-auto pb-20"
        >
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                <div className="flex gap-2">
                    {prevTopic ? (
                        <a href={`/learn/${courseId}/${prevTopic.slug}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0a0a16] border border-white/10 hover:border-blue-500/50 hover:text-white text-gray-400 text-xs font-bold uppercase tracking-wider transition-all">
                            <span className="text-lg">«</span> Prev
                        </a>
                    ) : <div className="w-20" />}
                </div>

                <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <span>Course_ID: {courseId}</span>
                </div>

                <div className="flex gap-2">
                    {nextTopic ? (
                        <a href={`/learn/${courseId}/${nextTopic.slug}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 border border-blue-500/50 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/20">
                            Next <span className="text-lg">»</span>
                        </a>
                    ) : <div className="w-20" />}
                </div>
            </div>

            {/* Header */}
            <header className="mb-12">
                <div className="flex flex-wrap gap-3 mb-6">
                    {topic.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-blue-500/5 text-blue-400 border border-blue-500/20">
                            #{tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] uppercase tracking-tight">
                    {topic.title}
                </h1>

                <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center mr-6 text-xs text-gray-400 font-mono">
                        <Calendar size={14} className="mr-2 text-blue-500" />
                        {new Date(topic.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>

                    <div className="h-4 w-[1px] bg-white/10 mr-6" />

                    {/* Action Buttons */}
                    <div className="flex items-center ml-auto gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all" title="Share Node">
                            <Share2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all" title="Print Data">
                            <Printer size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <article className="prose prose-invert prose-lg max-w-none 
                prose-p:leading-relaxed prose-p:text-gray-300
                prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white
                prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:mb-8 prose-h2:mt-12
                prose-h3:text-xl prose-h3:text-blue-400
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-bold
                prose-code:text-pink-400 prose-code:font-mono prose-code:font-medium prose-code:bg-[#0a0a16] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-white/5
                prose-pre:bg-[#050510] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-2xl prose-pre:rounded-2xl
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10 prose-img:my-8
            ">
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="relative group my-8">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-20 group-hover:opacity-40 transition blur" />
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a16]">
                                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">{match[1]}</span>
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                            </div>
                                        </div>
                                        <div className="p-4 overflow-x-auto">
                                            <SyntaxHighlighter
                                                style={vscDarkPlus}
                                                language={match[1]}
                                                PreTag="div"
                                                customStyle={{ margin: 0, padding: 0, background: 'transparent' }}
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        </div>
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

            {/* Footer Navigation */}
            <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                {prevTopic ? (
                    <a href={`/learn/${courseId}/${prevTopic.slug}`} className="group relative p-6 rounded-2xl bg-[#0a0a16] border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all" />
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block group-hover:text-blue-400">Previous Module</span>
                        <div className="relative z-10 font-bold text-white text-lg group-hover:translate-x-1 transition-transform truncate">
                            {prevTopic.title}
                        </div>
                    </a>
                ) : <div />}

                {nextTopic ? (
                    <a href={`/learn/${courseId}/${nextTopic.slug}`} className="group relative p-6 rounded-2xl bg-[#0a0a16] border border-white/5 hover:border-blue-500/30 transition-all overflow-hidden text-right">
                        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all" />
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block group-hover:text-blue-400">Next Module</span>
                        <div className="relative z-10 font-bold text-white text-lg group-hover:-translate-x-1 transition-transform truncate">
                            {nextTopic.title}
                        </div>
                    </a>
                ) : <div />}
            </div>
        </motion.div>
    );
};

export default TopicViewer;
