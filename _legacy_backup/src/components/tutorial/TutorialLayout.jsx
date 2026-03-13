
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronLeft, Home, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';
import MermaidRenderer from '../../components/MermaidRenderer';

const TutorialLayout = ({ tutorialData }) => {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentTopic, setCurrentTopic] = useState(null);

    // Helper to flatten topics for navigation (prev/next) and lookup
    const getFlatTopics = (topics) => {
        let flat = [];
        topics.forEach(topic => {
            if (topic.children) {
                // If it's a section, we assume it might have content itself, or just children
                if (topic.content) flat.push(topic);
                flat = [...flat, ...getFlatTopics(topic.children)];
            } else {
                flat.push(topic);
            }
        });
        return flat;
    };

    const flatTopics = getFlatTopics(tutorialData.topics);

    // Default to first topic if no chapterId
    useEffect(() => {
        if (!chapterId && flatTopics.length > 0) {
            navigate(`/tutorial/${tutorialData.id}/${flatTopics[0].id}`, { replace: true });
        } else if (chapterId) {
            const topic = flatTopics.find(t => t.id === chapterId);
            if (topic) setCurrentTopic(topic);
        }
    }, [chapterId, tutorialData, navigate]);

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, [chapterId]);

    const currentIndex = flatTopics.findIndex(t => t.id === chapterId);
    const prevTopic = currentIndex > 0 ? flatTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < flatTopics.length - 1 ? flatTopics[currentIndex + 1] : null;

    if (!currentTopic) return null;

    // Sidebar Item Component for recursive rendering
    const SidebarItem = ({ topic, depth = 0 }) => {
        const [isOpen, setIsOpen] = useState(true); // Default open
        const hasChildren = topic.children && topic.children.length > 0;
        const isActive = chapterId === topic.id;

        // Check if any child is active to auto-expand
        const isChildActive = hasChildren && getFlatTopics(topic.children).some(t => t.id === chapterId);

        useEffect(() => {
            if (isChildActive) setIsOpen(true);
        }, [isChildActive]);

        return (
            <div className="mb-0.5">
                {hasChildren ? (
                    <div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`w-full text-left flex items-center justify-between px-6 py-3 text-sm font-bold text-gray-200 hover:text-white hover:bg-white/5 transition-colors ${depth > 0 ? 'bg-[#12161c]' : ''}`}
                        >
                            <span>{topic.title}</span>
                            {isOpen ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    {topic.children.map(child => (
                                        <SidebarItem key={child.id} topic={child} depth={depth + 1} />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <Link
                        to={`/tutorial/${tutorialData.id}/${topic.id}`}
                        className={`block py-2 text-sm transition-colors border-l-2 ${isActive
                            ? 'bg-green-900/20 text-green-400 border-green-500 font-medium'
                            : 'border-transparent hover:bg-white/5 hover:text-white text-gray-400'
                            }`}
                        style={{ paddingLeft: `${(depth * 16) + 24}px`, paddingRight: '24px' }}
                    >
                        {topic.title}
                    </Link>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans pt-16 flex">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-green-600 rounded-full text-white shadow-lg md:hidden hover:bg-green-700 transition"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Sidebar (Portaled for Z-Index supremacy) */}
            {createPortal(
                <AnimatePresence>
                    {isSidebarOpen && window.innerWidth < 768 && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[190] md:hidden"
                            />
                            {/* Drawer */}
                            <motion.div
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed top-0 left-0 h-[100dvh] w-[85vw] bg-[#0d1117]/95 backdrop-blur-2xl border-r border-white/10 overflow-y-auto z-[200] md:hidden shadow-2xl shadow-black custom-scrollbar"
                            >
                                <div className="p-5 border-b border-white/10 bg-transparent sticky top-0 z-10 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <span className="text-green-500">{tutorialData.title}</span> Tutorial
                                    </h2>
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="py-2 pb-40">
                                    {tutorialData.topics.map((topic) => (
                                        <SidebarItem key={topic.id} topic={topic} />
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Desktop Sidebar (Sticky, In-Flow) */}
            <div className={`hidden md:block sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#161b22] border-r border-gray-800 overflow-y-auto custom-scrollbar`}>
                <div className="p-4 border-b border-gray-800 bg-[#161b22]/95 backdrop-blur-sm sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-green-500">{tutorialData.title}</span> Tutorial
                    </h2>
                </div>
                <div className="py-2">
                    {tutorialData.topics.map((topic) => (
                        <SidebarItem key={topic.id} topic={topic} />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 bg-[#0d1117]">
                <div className="max-w-4xl mx-auto px-4 md:px-12 py-8 md:py-12">

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link to="/tutorials" className="hover:text-green-400 transition"><Home size={14} /></Link>
                        <ChevronRight size={14} />
                        <span className="text-green-400 font-semibold">{tutorialData.title}</span>
                        <ChevronRight size={14} />
                        <span className="text-gray-300">{currentTopic.title}</span>
                    </div>

                    {/* Content */}
                    <motion.div
                        key={chapterId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="prose prose-invert prose-lg max-w-none prose-green prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-gray-700"
                    >
                        <div className="markdown-content">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-4xl md:text-5xl font-black mb-8 pb-4 border-b border-gray-800 text-white" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-white" {...props} />,
                                    p: ({ node, ...props }) => <p className="leading-relaxed text-gray-300 mb-6" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside my-4 space-y-2 text-gray-300" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-4 space-y-2 text-gray-300" {...props} />,
                                    li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                                    img: ({ node, ...props }) => <img {...props} className="rounded-xl border border-white/10 shadow-2xl my-6 w-full object-cover" />,
                                    blockquote: ({ node, ...props }) => (
                                        <div className="border-l-4 border-green-500 bg-[#161b22] p-6 my-8 rounded-r-xl shadow-lg relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-green-500 select-none">"</div>
                                            <div className="relative z-10 italic text-gray-300">
                                                {props.children}
                                            </div>
                                        </div>
                                    ),
                                    code: ({ node, inline, className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const isMermaid = match && match[1] === 'mermaid';

                                        if (!inline && isMermaid) {
                                            return <MermaidRenderer chart={String(children).replace(/\n$/, '')} />;
                                        }

                                        return inline ? (
                                            <code className="bg-gray-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-700" {...props}>{children}</code>
                                        ) : (
                                            <code className="block bg-[#0d1117] p-6 rounded-xl overflow-x-auto text-sm font-mono text-gray-200 border border-gray-800 my-6 shadow-2xl relative" {...props}>{children}</code>
                                        )
                                    }
                                }}
                            >
                                {currentTopic.content}
                            </ReactMarkdown>
                        </div>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-16 pt-8 border-t border-gray-800 gap-4">
                        {prevTopic ? (
                            <Link
                                to={`/tutorial/${tutorialData.id}/${prevTopic.id}`}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition group"
                            >
                                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">Previous</div>
                                    <div className="font-semibold">{prevTopic.title}</div>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextTopic ? (
                            <Link
                                to={`/tutorial/${tutorialData.id}/${nextTopic.id}`}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition group text-right shadow-lg shadow-green-900/20"
                            >
                                <div>
                                    <div className="text-xs text-green-200 uppercase tracking-wider">Next</div>
                                    <div className="font-semibold">{nextTopic.title}</div>
                                </div>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialLayout;
