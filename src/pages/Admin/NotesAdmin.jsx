import React, { useState, useEffect } from 'react';
import { useGitHub } from '../../context/GitHubContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Typography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);
import { motion, AnimatePresence } from 'framer-motion';
import {
    Save,
    Plus,
    BookOpen,
    Type,
    Image as ImageIcon,
    Table as TableIcon,
    Code,
    Hash,
    Layers,
    ChevronRight,
    Search,
    Github,
    AlertCircle,
    CheckCircle2,
    Undo,
    Redo,
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Heading1,
    Heading2,
    Heading3,
    CheckSquare,
    Highlighter,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
    TerminalSquare,
    Maximize2,
    Minimize2,
    PanelLeft,
    PanelLeftClose
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { courses } from '../../data/notes';

const NotesAdmin = () => {
    const { isAuthenticated, selectedRepo, uploadFiles, fetchFileContent, user } = useGitHub();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);

    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        tags: '',
        image: '',
        category: ''
    });

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Markdown,
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TableHeader,
            Image,
            Link,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Typography,
            Highlight.configure({ multipart: true }),
            Subscript,
            Superscript,
            Placeholder.configure({
                placeholder: 'Write your high-level notes here...',
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            // Can handle auto-save here if needed
        }
    });

    // Populate metadata when topic is selected
    useEffect(() => {
        if (selectedTopic) {
            setMetadata({
                title: selectedTopic.title || '',
                description: selectedTopic.description || '',
                tags: selectedTopic.tags?.join(', ') || '',
                image: selectedTopic.image || '',
                category: selectedTopic.category || ''
            });
            editor?.commands.setContent(selectedTopic.content || '');
        } else {
            setMetadata({ title: '', description: '', tags: '', image: '', category: '' });
            editor?.commands.setContent('');
        }
    }, [selectedTopic, editor]);

    const handleSave = async () => {
        if (!selectedCourse) return;
        setIsSaving(true);
        setStatus({ type: 'info', message: 'Syncing with GitHub...' });

        try {
            // 1. Get current file content from GitHub
            const repoPath = `src/data/notes/${selectedCourse.id.replace('-masterclass', '')}.js`;
            const [owner, repoName] = selectedRepo.full_name.split('/');

            let fileData;
            try {
                fileData = await fetchFileContent(owner, repoName, repoPath);
            } catch (e) {
                // If file doesn't exist, we might need to handle creation, but for now assuming it exists
                throw new Error(`Could not find ${repoPath} in repository.`);
            }

            const content = fileData.content;

            // 2. Prepare new topic data
            const newTopicData = {
                id: selectedTopic?.id || metadata.title.toLowerCase().replace(/\s+/g, '-'),
                slug: selectedTopic?.slug || metadata.title.toLowerCase().replace(/\s+/g, '-'),
                title: metadata.title,
                description: metadata.description,
                tags: metadata.tags.split(',').map(t => t.trim()),
                category: metadata.category || selectedCourse.title,
                image: metadata.image,
                createdAt: selectedTopic?.createdAt || new Date().toISOString().split('T')[0],
                content: editor.getHTML() // We store as HTML or Markdown? Markdown is better for our viewer.
            };

            // Using TipTap's Markdown extension to get markdown
            const markdownContent = editor.storage.markdown.getMarkdown();
            newTopicData.content = markdownContent;

            // 3. Update the file content (simple string manipulation for .js files)
            // This is a bit tricky with JS files. A better way would be to parse it, 
            // but for a quick "jugad", we can replace the specific object if it exists or append it.

            let updatedFileContent = content;
            const variableName = repoPath.split('/').pop().replace('.js', '');

            // Try to find if topic exists by ID
            const topicRegex = new RegExp(`{\\s*id:\\s*['"]${newTopicData.id}['"][\\s\\S]*?content:\\s*\`[\\s\\S]*?\`\\s*},?`, 'm');

            const newTopicString = `    {
        id: '${newTopicData.id}',
        slug: '${newTopicData.slug}',
        title: '${newTopicData.title}',
        description: '${newTopicData.description}',
        tags: [${newTopicData.tags.map(t => `'${t}'`).join(', ')}],
        category: '${newTopicData.category}',
        image: '${newTopicData.image}',
        createdAt: new Date('${newTopicData.createdAt}'),
        content: \`
${newTopicData.content.replace(/`/g, '\\`')}
\`
    }`;

            if (topicRegex.test(content)) {
                // Update existing
                updatedFileContent = content.replace(topicRegex, newTopicString + ',');
            } else {
                // Append to array
                const arrayEndRegex = /];\s*$/;
                if (arrayEndRegex.test(content)) {
                    updatedFileContent = content.replace(arrayEndRegex, `    ${newTopicString},\n];`);
                } else {
                    throw new Error("Could not find the end of the notes array in the file.");
                }
            }

            // 4. Upload back to GitHub
            await uploadFiles([{
                path: repoPath,
                file: new Blob([updatedFileContent], { type: 'text/javascript' })
            }], `Update note: ${newTopicData.title}`);

            setStatus({ type: 'success', message: 'Successfully synced with GitHub!' });
            setTimeout(() => setStatus({ type: '', message: '' }), 3000);
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: error.message || 'Failed to save notes.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <Github className="w-16 h-16 text-primary mx-auto opacity-20" />
                    <h2 className="text-2xl font-black text-white uppercase italic">Access Restricted</h2>
                    <p className="text-slate-500 max-w-md mx-auto">Please authenticate via Command Center to manage your notes system.</p>
                    <Button onClick={() => window.location.href = '/github'} className="mt-4">Go to Command Center</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
            {/* Header */}
            {!isFocusMode && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-white/5 pb-8"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[9px] font-black text-primary uppercase tracking-widest">Editor_v2.0</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                            Notes <span className="text-primary italic inline-block transform skew-x-[-10deg]">Architect</span>
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving || !selectedCourse}
                            className="h-12 px-6 bg-primary hover:bg-primary/80 text-white flex items-center gap-2 rounded-xl group shadow-lg shadow-primary/20"
                        >
                            {isSaving ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            )}
                            <span className="text-xs font-bold uppercase tracking-widest">Sync to GitHub</span>
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Status Bar */}
            <AnimatePresence>
                {status.message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                            status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            }`}
                    >
                        {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                        <span className="text-xs font-bold uppercase tracking-wider">{status.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                {/* Sidebar Toggle for Mobile/Focus */}
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="lg:hidden absolute -top-12 right-0 p-2 text-white bg-white/10 rounded-lg z-50"
                >
                    {showSidebar ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
                </button>

                {/* Sidebar: Selectors */}
                <AnimatePresence>
                    {(!isFocusMode && showSidebar) && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: '100%' }}
                            exit={{ opacity: 0, x: -20, width: 0 }}
                            className="lg:col-span-3 space-y-6 overflow-hidden"
                        >
                            <section className="obsidian-card p-6 rounded-3xl border-white/5 bg-white/2 space-y-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <Layers size={14} />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Select Course</h3>
                                </div>
                                <div className="space-y-1">
                                    {courses.map(course => (
                                        <button
                                            key={course.id}
                                            onClick={() => {
                                                setSelectedCourse(course);
                                                setSelectedTopic(null);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-between group ${selectedCourse?.id === course.id ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'text-slate-500 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <span>{course.title}</span>
                                            <ChevronRight size={14} className={`${selectedCourse?.id === course.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {selectedCourse && (
                                <section className="obsidian-card p-6 rounded-3xl border-white/5 bg-white/2 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-primary">
                                            <BookOpen size={14} />
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Select Topic</h3>
                                        </div>
                                        <button
                                            onClick={() => setSelectedTopic(null)}
                                            className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-1">
                                        {selectedCourse.notes.map(topic => (
                                            <button
                                                key={topic.id}
                                                onClick={() => setSelectedTopic(topic)}
                                                className={`w-full text-left px-4 py-2.5 rounded-xl transition-all text-[11px] font-medium flex flex-col gap-0.5 ${selectedTopic?.id === topic.id ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <span className="truncate">{topic.title}</span>
                                                <span className="text-[8px] opacity-40 uppercase tracking-widest">{topic.slug}</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content: Metadata & Editor */}
                <motion.div
                    layout
                    className={`${!isFocusMode && showSidebar ? 'lg:col-span-9' : 'col-span-12'} space-y-8 transition-all duration-500`}
                >
                    {/* Metadata Section - Hidden in Focus Mode */}
                    {!isFocusMode && (
                        <div className="obsidian-card p-8 rounded-3xl border-white/5 bg-white/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Topic Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                                        <input
                                            type="text"
                                            value={metadata.title}
                                            onChange={e => setMetadata({ ...metadata, title: e.target.value })}
                                            placeholder="e.g. Masterclass 1: Introduction"
                                            className="w-full h-12 bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 text-sm font-bold text-white placeholder:text-slate-700 focus:border-primary/50 transition-all outline-none shadow-inner"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Description</label>
                                    <textarea
                                        value={metadata.description}
                                        onChange={e => setMetadata({ ...metadata, description: e.target.value })}
                                        placeholder="Brief intro for the sidebar card..."
                                        className="w-full h-24 bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-medium text-white placeholder:text-slate-700 focus:border-primary/50 transition-all outline-none resize-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Featured Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                                        <input
                                            type="text"
                                            value={metadata.image}
                                            onChange={e => setMetadata({ ...metadata, image: e.target.value })}
                                            placeholder="Unsplash URL, etc."
                                            className="w-full h-12 bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 text-sm font-medium text-white placeholder:text-slate-700 focus:border-primary/50 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tags (comma separated)</label>
                                    <div className="relative">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                                        <input
                                            type="text"
                                            value={metadata.tags}
                                            onChange={e => setMetadata({ ...metadata, tags: e.target.value })}
                                            placeholder="Python, Basics, Logic"
                                            className="w-full h-12 bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 text-sm font-medium text-white placeholder:text-slate-700 focus:border-primary/50 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Editor Section */}
                    <div className={`obsidian-card rounded-[2.5rem] border-white/5 bg-black/40 overflow-hidden flex flex-col shadow-2xl relative transition-all duration-500 ${isFocusMode ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)] border-primary/20' : 'min-h-[600px] h-[70vh]'}`}>
                        {/* Editor Toolbar */}
                        <div className="p-3 border-b border-white/5 bg-white/2 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl">
                            <div className="flex overflow-x-auto no-scrollbar gap-1 items-center pb-2 md:pb-0 w-full mask-linear-fade">
                                <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1 shrink-0">
                                    <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo size={14} />} />
                                    <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo size={14} />} />
                                </div>

                                <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1 shrink-0">
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                        active={editor?.isActive('bold')}
                                        icon={<Bold size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleItalic().run()}
                                        active={editor?.isActive('italic')}
                                        icon={<Italic size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleCode().run()}
                                        active={editor?.isActive('code')}
                                        icon={<Code size={14} />}
                                    />
                                </div>

                                <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1 shrink-0">
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                        active={editor?.isActive('heading', { level: 1 })}
                                        icon={<Heading1 size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                        active={editor?.isActive('heading', { level: 2 })}
                                        icon={<Heading2 size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                        active={editor?.isActive('heading', { level: 3 })}
                                        icon={<Heading3 size={14} />}
                                    />
                                </div>

                                <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1 shrink-0">
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                                        active={editor?.isActive('bulletList')}
                                        icon={<List size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                        active={editor?.isActive('orderedList')}
                                        icon={<ListOrdered size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                        active={editor?.isActive('blockquote')}
                                        icon={<Quote size={14} />}
                                    />
                                </div>

                                <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1 shrink-0">
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                                        icon={<TableIcon size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => {
                                            const url = window.prompt('Enter image URL');
                                            if (url) editor.chain().focus().setImage({ src: url }).run();
                                        }}
                                        icon={<ImageIcon size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                        active={editor?.isActive('codeBlock')}
                                        icon={<TerminalSquare size={16} />}
                                    />
                                </div>

                                <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1 shrink-0">
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleTaskList().run()}
                                        active={editor?.isActive('taskList')}
                                        icon={<CheckSquare size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                                        active={editor?.isActive('highlight')}
                                        icon={<Highlighter size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                                        active={editor?.isActive('subscript')}
                                        icon={<SubscriptIcon size={14} />}
                                    />
                                    <ToolbarButton
                                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                                        active={editor?.isActive('superscript')}
                                        icon={<SuperscriptIcon size={14} />}
                                    />
                                </div>
                            </div>

                            {/* Focus Toggle */}
                            <div className="pl-2 border-l border-white/10 ml-2">
                                <ToolbarButton
                                    onClick={() => setIsFocusMode(!isFocusMode)}
                                    active={isFocusMode}
                                    icon={isFocusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                />
                            </div>
                        </div>

                        {/* TipTap Surface */}
                        <div className="flex-grow p-4 md:p-8 overflow-y-auto custom-scrollbar">
                            <EditorContent editor={editor} className="tiptap-editor-surface max-w-4xl mx-auto" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div >
    );
};

const ToolbarButton = ({ onClick, icon, active = false }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-all ${active ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
    >
        {icon}
    </button>
);

export default NotesAdmin;
