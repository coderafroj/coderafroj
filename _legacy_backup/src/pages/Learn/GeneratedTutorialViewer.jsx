import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Search, Menu, X, ChevronRight, ChevronLeft, Hash, Bot, Sparkles } from 'lucide-react';
import mermaid from 'mermaid';
import SEO from '../../components/SEO';

// Initialize Mermaid
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
    const [topics, setTopics] = useState([]);
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadTutorial = async () => {
            try {
                const module = await import(`../../data/generated_tutorials/${slug}.json`);
                const data = module.default || module;
                setTutorial(data);

                // Parse Content into Topics
                if (data.content) {
                    const parsedTopics = parseMarkdownToTopics(data.content);
                    setTopics(parsedTopics);
                }
            } catch (err) {
                console.error("Failed to load tutorial:", err);
                setError("Tutorial module not found.");
            } finally {
                setLoading(false);
            }
        };
        loadTutorial();
    }, [slug]);

    // Helper to parse markdown headers
    const parseMarkdownToTopics = (markdown) => {
        const lines = markdown.split('\n');
        const sections = [];
        let currentSection = { title: "Introduction", content: "", id: "intro" };
        let hasContent = false;

        lines.forEach(line => {
            // Match headers #, ##, ### (but not ####+ for now, to keep it high level)
            const headerMatch = line.match(/^(#{1,3})\s+(.+)/);
            if (headerMatch) {
                if (hasContent) {
                    sections.push(currentSection);
                }
                const title = headerMatch[2].trim();
                currentSection = {
                    title: title,
                    content: line + '\n',
                    id: title.toLowerCase().replace(/[^\w]+/g, '-') + '-' + Math.random().toString(36).substr(2, 5)
                };
                hasContent = true;
            } else {
                currentSection.content += line + '\n';
                if (line.trim() !== '') hasContent = true;
            }
        });
        if (hasContent) {
            sections.push(currentSection);
        }

        // Filter out empty sections if any
        return sections.filter(s => s.content.trim().length > 0);
    };

    const filteredTopics = useMemo(() => {
        return topics.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [topics, searchTerm]);

    const handleTopicClick = (index) => {
        setActiveTopicIndex(index);
        if (window.innerWidth < 1024) setSidebarOpen(false); // Close mobile sidebar on select
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigation = (direction) => {
        const newIndex = direction === 'next' ? activeTopicIndex + 1 : activeTopicIndex - 1;
        if (newIndex >= 0 && newIndex < topics.length) {
            handleTopicClick(newIndex);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-primary font-mono text-sm animate-pulse tracking-widest">DECODING_MATRIX...</p>
            </div>
        </div>
    );

    if (error || !tutorial) return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center p-8">
            <div className="text-center space-y-4 max-w-md">
                <div className="text-red-500 font-black text-4xl">404</div>
                <h2 className="text-white text-xl font-bold">Data Stream Interrupted</h2>
                <button onClick={() => navigate('/learn')} className="px-6 py-2 bg-white/10 text-white rounded-lg font-mono text-sm">RETURN_TO_BASE</button>
            </div>
        </div>
    );

    const activeTopic = topics[activeTopicIndex] || { title: 'Loading...', content: '' };

    return (
        <div className="min-h-screen bg-[#030014] text-slate-300 selection:bg-primary/30 overflow-hidden flex">
            <SEO title={`${tutorial.title} - ${activeTopic.title}`} description={tutorial.description} />
            {/* SEO & Background would go here */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-[#030014]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-white/70 hover:text-white">
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <span className="font-bold text-white uppercase tracking-wider text-sm truncate max-w-[200px]">{tutorial.title}</span>
                <button onClick={() => navigate('/learn')} className="p-2 text-white/70 hover:text-white"><ArrowLeft size={24} /></button>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {(sidebarOpen || window.innerWidth >= 1024) && (
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className={`
                            fixed lg:static inset-y-0 left-0 z-40 w-[280px] lg:w-[320px] bg-[#050510] border-r border-white/5 flex flex-col
                            ${window.innerWidth < 1024 ? 'shadow-2xl' : ''}
                        `}
                    >
                        {/* Sidebar Header */}
                        <div className="p-6 border-b border-white/5">
                            <button onClick={() => navigate('/learn')} className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-primary mb-4 transition-colors uppercase tracking-widest">
                                <ArrowLeft size={12} /> Back to Modules
                            </button>
                            <h2 className="text-xl font-black text-white leading-tight uppercase tracking-tight mb-2">{tutorial.title}</h2>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-primary-glow bg-primary/10 px-2 py-1 rounded w-fit">
                                <Bot size={12} />
                                <span>AI_COMPILED_ARCHIVE</span>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="p-4 border-b border-white/5">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Filter topics..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-300 focus:border-primary/50 focus:outline-none placeholder-slate-600 transition-all font-mono"
                                />
                            </div>
                        </div>

                        {/* Topics List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                            {filteredTopics.map((topic, idx) => {
                                // Find original index in full list to maintain correctness
                                const originalIndex = topics.findIndex(t => t === topic);
                                const isActive = originalIndex === activeTopicIndex;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleTopicClick(originalIndex)}
                                        className={`
                                            w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 group flex items-start gap-3
                                            ${isActive
                                                ? 'bg-primary/10 text-primary-glow font-bold border border-primary/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                            }
                                        `}
                                    >
                                        <div className={`mt-0.5 min-w-[16px] h-4 flex items-center justify-center rounded text-[9px] font-mono ${isActive ? 'bg-primary text-black' : 'bg-white/10 text-slate-500 group-hover:bg-white/20'}`}>
                                            {originalIndex + 1}
                                        </div>
                                        <span className={`line-clamp-2 ${isActive ? 'opacity-100' : 'opacity-80'}`}>{topic.title}</span>
                                    </button>
                                );
                            })}
                            {filteredTopics.length === 0 && (
                                <div className="text-center py-8 text-slate-600 text-xs font-mono uppercase tracking-widest">
                                    No nodes found
                                </div>
                            )}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Quick Toggle for Desktop (when closed) - optional enhancement, currently always open on desktop */}

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth selection:bg-purple-500/30">
                <div className="max-w-4xl mx-auto px-6 py-24 lg:py-16">

                    {/* Breadcrumbs / Status */}
                    <div className="flex items-center justify-between mb-8 opacity-60">
                        <span className="text-[10px] font-mono text-primary tracking-[0.2em] uppercase">
                            Section {activeTopicIndex + 1} / {topics.length}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase">
                            {activeTopic.id}
                        </span>
                    </div>

                    <motion.div
                        key={activeTopicIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <article className="prose prose-invert prose-lg max-w-none
                            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white
                            prose-h1:text-5xl prose-h1:mb-8 prose-h1:bg-gradient-to-r prose-h1:from-white prose-h1:to-slate-400 prose-h1:bg-clip-text prose-h1:text-transparent
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
                            prose-h3:text-xl prose-h3:text-primary-glow prose-h3:mt-8
                            prose-p:text-slate-300 prose-p:leading-8 prose-p:font-light
                            prose-strong:text-white prose-strong:font-bold
                            prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
                            prose-code:text-primary-glow prose-code:bg-primary/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-[#080814] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-2xl
                            prose-li:text-slate-300 prose-li:marker:text-primary
                            prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-8
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
                                            <div className="relative group">
                                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="text-[10px] uppercase font-mono text-slate-500 bg-black/50 px-2 rounded">
                                                        {match[1]}
                                                    </div>
                                                </div>
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    customStyle={{ background: 'transparent', margin: 0 }}
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            </div>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {activeTopic.content}
                            </ReactMarkdown>
                        </article>
                    </motion.div>

                    {/* Navigation Footer */}
                    <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
                        <button
                            onClick={() => handleNavigation('prev')}
                            disabled={activeTopicIndex === 0}
                            className={`flex items-center gap-3 px-6 py-4 rounded-xl border border-white/5 transition-all group ${activeTopicIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5 hover:border-white/10'}`}
                        >
                            <ChevronLeft size={18} className="text-primary group-hover:-translate-x-1 transition-transform" />
                            <div className="text-left hidden sm:block">
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Previous</div>
                                <div className="text-sm font-bold text-white max-w-[150px] truncate">{topics[activeTopicIndex - 1]?.title || 'Start'}</div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigation('next')}
                            disabled={activeTopicIndex === topics.length - 1}
                            className={`flex items-center gap-3 px-6 py-4 rounded-xl border border-white/5 transition-all group ${activeTopicIndex === topics.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/20 hover:border-primary/30 bg-primary/10'}`}
                        >
                            <div className="text-right hidden sm:block">
                                <div className="text-[10px] font-mono text-primary-glow uppercase tracking-widest mb-1">Next Unit</div>
                                <div className="text-sm font-bold text-white max-w-[150px] truncate">{topics[activeTopicIndex + 1]?.title || 'Complete'}</div>
                            </div>
                            <ChevronRight size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-20 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
                            <Sparkles size={12} className="text-yellow-500" />
                            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">END OF SECTION</span>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
