
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { Calendar, Tag, Share2, Printer } from 'lucide-react';

const TopicViewer = ({ topic }) => {
    if (!topic) return <div className="p-8 text-center text-gray-500">Select a topic to start learning</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto pb-20"
        >
            {/* Header */}
            <header className="mb-8 border-b border-gray-800 pb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    {topic.tags?.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            #{tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {topic.title}
                </h1>

                <div className="flex items-center text-sm text-gray-500 space-x-6">
                    <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        {new Date(topic.createdAt).toLocaleDateString()}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex space-x-4 ml-auto">
                        <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors" title="Share">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors" title="Print">
                            <Printer size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <article className="prose prose-invert prose-lg max-w-none 
        prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-blue-400 prose-headings:to-purple-400
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white
        prose-code:text-pink-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
        prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-gray-800
      ">
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="relative group">
                                    <div className="absolute top-0 right-0 px-3 py-1 text-xs text-gray-500 bg-gray-800 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity">
                                        {match[1]}
                                    </div>
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{ margin: 0, borderRadius: '0.5rem', background: '#0d1117' }}
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
                    {topic.content}
                </ReactMarkdown>
            </article>

            {/* Footer Navigation (Next/Prev could be added here later) */}
        </motion.div>
    );
};

export default TopicViewer;
