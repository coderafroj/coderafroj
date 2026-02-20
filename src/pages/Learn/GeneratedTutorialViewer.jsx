import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Bot } from 'lucide-react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: '"Outfit", sans-serif'
});

const Mermaid = ({ chart }) => {
    const [svg, setSvg] = useState('');
    useEffect(() => {
        const render = async () => {
            try {
                const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart);
                setSvg(svg);
            } catch (err) {
                console.error("Mermaid fail:", err);
            }
        };
        render();
    }, [chart]);

    return <div className="my-8 overflow-x-auto flex justify-center bg-white/[0.02] p-8 rounded-2xl border border-white/5" dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default function GeneratedTutorialViewer() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [tutorial, setTutorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTutorial = async () => {
            try {
                // Dynamic import of the JSON file
                // Note: In Vite, we might need to import specifically or fetch
                // For now, simpler to fetch from public if we moved it there, 
                // but since it's in src/data, we can try dynamic import.
                const module = await import(`../../data/generated_tutorials/${slug}.json`);
                setTutorial(module.default || module);
            } catch (err) {
                console.error("Failed to load tutorial:", err);
                setError("Tutorial not found or could not be loaded.");
            } finally {
                setLoading(false);
            }
        };

        loadTutorial();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-blue-400 font-mono text-sm animate-pulse">DECODING_NEURAL_DATA...</p>
                </div>
            </div>
        );
    }

    if (error || !tutorial) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center p-8">
                <div className="text-center space-y-4 max-w-md">
                    <div className="text-red-500 font-black text-4xl">404</div>
                    <h2 className="text-white text-xl font-bold">Data Stream Interrupted</h2>
                    <p className="text-slate-400">{error || "The requested tutorial module could not be located in the neural network."}</p>
                    <button
                        onClick={() => navigate('/learn')}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-mono text-sm"
                    >
                        RETURN_TO_BASE
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030014] text-slate-300 selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 py-20">
                {/* Navigation */}
                <button
                    onClick={() => navigate('/learn')}
                    className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors mb-12"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Back_to_Hub</span>
                </button>

                {/* Header */}
                <header className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                            <Bot size={12} />
                            AI_GENERATED_CONTENT
                        </span>
                        {tutorial.tags?.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase">
                        {tutorial.title}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">
                        {tutorial.description}
                    </p>
                </header>

                {/* Content */}
                <article className="prose prose-invert prose-lg max-w-none
                    prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                    prose-h1:text-white prose-h2:text-white/90 prose-h3:text-blue-400
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                    prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-[#0a0a16] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
                    prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                ">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                if (match && match[1] === 'mermaid') {
                                    return <Mermaid chart={String(children)} />;
                                }
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{ background: 'transparent', margin: 0 }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {tutorial.content}
                    </ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
