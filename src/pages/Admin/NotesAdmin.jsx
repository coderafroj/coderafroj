import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
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
    Save, Plus, BookOpen, Type, Image as ImageIcon,
    Table as TableIcon, Code, Hash, Layers, ChevronRight,
    Search, Github, AlertCircle, CheckCircle2, Undo, Redo,
    Bold, Italic, List, ListOrdered, Quote, Heading1,
    Heading2, Heading3, CheckSquare, Highlighter,
    Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
    TerminalSquare, Maximize2, Minimize2, PanelLeft,
    PanelLeftClose, ArrowLeft, Loader2, FilePlus, Globe
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { courses as initialCourses } from '../../data/notes';
import AIAssistantTray from '../../components/editor/AIAssistantTray';

// --- ANIMATION VARIANTS ---
const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
};

const NotesAdmin = () => {
    const navigate = useNavigate();
    const { isAuthenticated, selectedRepo, uploadFiles, fetchFileContent, user } = useGitHub();
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Firebase Authentication Check
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && currentUser.email === 'coderafroj@gmail.com') {
                setFirebaseUser(currentUser);
            } else {
                setFirebaseUser(null);
                navigate('/login');
            }
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    // --- STATE ---
    const [view, setView] = useState('courses'); // 'courses' | 'topics' | 'editor'
    const [courses, setCourses] = useState(initialCourses);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Editor State
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [showMetaSidebar, setShowMetaSidebar] = useState(false);
    const [aiOpen, setAiOpen] = useState(false);

    // New Course State
    const [newCourseName, setNewCourseName] = useState('');
    const [isCreatingCourse, setIsCreatingCourse] = useState(false);

    // Topic Metadata State
    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        tags: '',
        image: '',
        category: ''
    });

    // --- EFFECT: Metadata Sync ---
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
        } else if (view === 'editor' && !selectedTopic) {
            // Creating new topic
            setMetadata({
                title: '',
                description: '',
                tags: '',
                image: '',
                category: selectedCourse?.title || ''
            });
            editor?.commands.setContent('');
        }
    }, [selectedTopic, view]);

    // --- EDITOR SETUP ---
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({ lowlight }),
            Markdown,
            Table.configure({ resizable: true }),
            TableRow, TableCell, TableHeader,
            Image, Link, TaskList, TaskItem.configure({ nested: true }),
            Typography, Highlight.configure({ multipart: true }),
            Subscript, Superscript,
            Placeholder.configure({ placeholder: 'Start writing your masterclass content...' }),
        ],
        content: '',
    });

    // --- ACTIONS ---

    const handleCreateCourse = async () => {
        if (!newCourseName.trim()) return;
        setIsCreatingCourse(true);
        setStatus({ type: 'info', message: 'Initializing new Learning Module...' });

        try {
            if (!selectedRepo) throw new Error('Repository connection required');

            // 1. Generate Slugs & Filenames
            const slug = newCourseName.toLowerCase().replace(/\s+/g, '-');
            const fileName = `${slug}.js`;
            const varName = slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase()); // camelCase for variable

            // 2. Create the Content File
            const newFileContent = `export const ${varName} = [\n    // New course topics will appear here\n];\n`;

            // 3. Prepare Index Update (This is complex to do via text replace safely, but we'll try best effort)
            // We need to fetch current index.js
            const indexFile = await fetchFileContent(selectedRepo.owner.login, selectedRepo.name, 'src/data/notes/index.js');
            let indexContent = indexFile.content;

            // Inject Import
            const importStmt = `import { ${varName} } from './${slug}';\n`;
            indexContent = importStmt + indexContent;

            // Inject into noteCategories
            const categoryEntry = `    ${varName}: {\n        title: '${newCourseName}',\n        description: 'New User Created Course',\n        notes: ${varName}\n    },`;
            indexContent = indexContent.replace('export const noteCategories = {', `export const noteCategories = {\n${categoryEntry}`);

            // Inject into courses array
            const courseEntry = `    { id: '${slug}', ...noteCategories.${varName} },`;
            indexContent = indexContent.replace('export const courses = [', `export const courses = [\n${courseEntry}`);

            // Inject into allNotes (Simplified)
            indexContent = indexContent.replace('export const allNotes = [', `export const allNotes = [\n    ...${varName},`);

            // 4. Upload Files
            await uploadFiles([
                {
                    path: `src/data/notes/${fileName}`,
                    file: new Blob([newFileContent], { type: 'text/javascript' })
                },
                {
                    path: 'src/data/notes/index.js',
                    file: new Blob([indexContent], { type: 'text/javascript' })
                }
            ], `Create Course: ${newCourseName}`);

            // 5. Update Local State
            const newCourseObj = {
                id: slug,
                title: newCourseName,
                description: 'New User Created Course',
                notes: []
            };
            setCourses([...courses, newCourseObj]);
            setNewCourseName('');
            setStatus({ type: 'success', message: 'Course Module Created Successfully!' });

        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: error.message || 'Failed to create course' });
        } finally {
            setIsCreatingCourse(false);
            setTimeout(() => setStatus({ message: '' }), 3000);
        }
    };

    const handleSaveTopic = async () => {
        if (!selectedCourse) return;
        setIsSaving(true);
        setStatus({ type: 'info', message: 'Syncing to Neural Cloud...' });

        try {
            if (!selectedRepo) throw new Error('No Neural Link (Repo) Connected');

            const repoPath = `src/data/notes/${selectedCourse.id.replace('-masterclass', '')}.js`;
            const [owner, repoName] = selectedRepo.full_name.split('/');

            // Fetch current file
            let fileData;
            try {
                fileData = await fetchFileContent(owner, repoName, repoPath);
            } catch (e) {
                // If it's a new course file we just created locally but hasn't synced fully?
                // Or if the course ID doesn't match the filename exactly.
                // Fallback to searching or erroring.
                throw new Error(`File access error: ${repoPath}`);
            }

            const content = fileData.content;

            // Prepare Data
            const newTopicData = {
                id: selectedTopic?.id || metadata.title.toLowerCase().replace(/\s+/g, '-'),
                slug: selectedTopic?.slug || metadata.title.toLowerCase().replace(/\s+/g, '-'),
                title: metadata.title,
                description: metadata.description,
                tags: metadata.tags.split(',').map(t => t.trim()),
                category: metadata.category || selectedCourse.title,
                image: metadata.image,
                createdAt: selectedTopic?.createdAt || new Date().toISOString().split('T')[0],
                content: editor.storage.markdown.getMarkdown()
            };

            // JS File Injection Logic (Regex Magic)
            let updatedFileContent = content;
            // Check if topic exists
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
                updatedFileContent = content.replace(topicRegex, newTopicString + ',');
            } else {
                const arrayEndRegex = /];\s*$/;
                if (arrayEndRegex.test(content)) {
                    updatedFileContent = content.replace(arrayEndRegex, `    ${newTopicString},\n];`);
                } else {
                    // Fallback append/create
                    updatedFileContent += `\n// Recovery append\nexport const append_${newTopicData.id} = ${newTopicString};`;
                }
            }

            await uploadFiles([{
                path: repoPath,
                file: new Blob([updatedFileContent], { type: 'text/javascript' })
            }], `Update Topic: ${newTopicData.title}`);

            setStatus({ type: 'success', message: 'Memory Synced Successfully' });

            // Update local state largely for UI feedback
            if (activeTopicIndex >= 0) {
                const updatedNotes = [...selectedCourse.notes];
                updatedNotes[activeTopicIndex] = { ...newTopicData, content: newTopicData.content }; // Store as markdown or existing struct
                // Need to update deeply nested state... might be easier to just refresh
            }

        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: error.message });
        } finally {
            setIsSaving(false);
            setTimeout(() => setStatus({ message: '' }), 3000);
        }
    };

    // Derived Local State Helpers
    const activeTopicIndex = selectedCourse?.notes?.findIndex(n => n.id === selectedTopic?.id) ?? -1;


    // --- RENDER HELPERS ---

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white text-xl font-mono uppercase tracking-widest"
                >
                    Authenticating...
                </motion.div>
            </div>
        );
    }

    if (!firebaseUser) {
        return null;
    }

    if (!isAuthenticated) return <AccessDenied />;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto overflow-hidden">
            {/* GLOBAL HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    {view === 'courses' ? (
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Admin <span className="text-primary italic">Console</span>
                        </h1>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" className="p-2" onClick={() => {
                                if (view === 'editor') setView('topics');
                                else setView('courses');
                            }}>
                                <ArrowLeft className="w-6 h-6 text-white" />
                            </Button>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                                {view === 'topics' ? selectedCourse?.title : 'Editor'}
                            </h2>
                        </div>
                    )}
                </div>

                {/* GLOBAL STATUS INDICATOR */}
                <AnimatePresence>
                    {status.message && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest flex items-center gap-2
                                ${status.type === 'error' ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-green-500/10 border-green-500 text-green-500'}
                             `}
                        >
                            {status.type === 'info' && <Loader2 className="w-3 h-3 animate-spin" />}
                            {status.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* VIEWS */}
            <AnimatePresence mode="wait">

                {/* 1. COURSES VIEW */}
                {view === 'courses' && (
                    <motion.div
                        key="courses" initial="initial" animate="animate" exit="exit" variants={pageVariants}
                        className="space-y-8"
                    >
                        {/* Create Course Section */}
                        <div className="obsidian-card p-6 rounded-3xl border-white/5 bg-white/2 flex flex-col md:flex-row gap-4 items-center">
                            <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <Globe size={24} />
                            </div>
                            <div className="flex-1 w-full">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">New Knowledge Domain</h3>
                                <p className="text-xs text-slate-500">Create a new language or course category.</p>
                            </div>
                            <div className="flex w-full md:w-auto gap-2">
                                <input
                                    value={newCourseName}
                                    onChange={(e) => setNewCourseName(e.target.value)}
                                    placeholder="Enter Language Name..."
                                    className="h-10 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white focus:border-primary/50 outline-none min-w-[200px]"
                                />
                                <Button onClick={handleCreateCourse} disabled={isCreatingCourse} className="h-10 bg-primary text-white px-6 rounded-xl">
                                    {isCreatingCourse ? <Loader2 className="animate-spin" /> : 'Create'}
                                </Button>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {courses.map(course => (
                                <button
                                    key={course.id}
                                    onClick={() => { setSelectedCourse(course); setView('topics'); }}
                                    className="obsidian-card p-6 rounded-3xl border-white/5 bg-white/2 hover:bg-white/5 hover:border-primary/30 transition-all text-left group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Layers size={60} />
                                    </div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                                    <p className="text-xs text-slate-400 font-medium line-clamp-2">{course.description || 'No description available.'}</p>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                        <span className="text-[10px] font-mono text-slate-500">{course.notes?.length || 0} MODULES</span>
                                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 2. TOPICS VIEW */}
                {view === 'topics' && (
                    <motion.div
                        key="topics" initial="initial" animate="animate" exit="exit" variants={pageVariants}
                        className="space-y-6"
                    >
                        {/* Action Bar */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-slate-400 text-sm font-mono uppercase">Modules in {selectedCourse.title}</h3>
                            <Button onClick={() => { setSelectedTopic(null); setView('editor'); }} className="bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2">
                                <Plus size={16} /> <span className="text-xs font-bold uppercase">New Topic</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {selectedCourse.notes?.map(topic => (
                                <button
                                    key={topic.id}
                                    onClick={() => { setSelectedTopic(topic); setView('editor'); }}
                                    className="p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 flex items-center justify-between group transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 font-black text-lg">
                                            {topic.title.charAt(0)}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{topic.title}</h4>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">{topic.slug}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-400">{topic.tags?.length || 0} Tags</span>
                                        <ChevronRight size={16} className="text-slate-600 group-hover:text-white" />
                                    </div>
                                </button>
                            ))}
                            {(!selectedCourse.notes || selectedCourse.notes.length === 0) && (
                                <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl text-slate-500">
                                    <p className="text-sm">No topics found in this course.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 3. EDITOR VIEW */}
                {view === 'editor' && (
                    <motion.div
                        key="editor" initial="initial" animate="animate" exit="exit" variants={pageVariants}
                        className="h-[calc(100vh-140px)] flex gap-4"
                    >
                        {/* META SIDEBAR (Collapsible) */}
                        <AnimatePresence>
                            {showMetaSidebar && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }} animate={{ width: 300, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                                    className="bg-black/40 border-r border-white/10 overflow-hidden shrink-0 flex flex-col h-full rounded-l-2xl z-20"
                                >
                                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                                        <span className="text-xs font-bold uppercase text-slate-400">Metadata</span>
                                        <Button variant="ghost" size="sm" onClick={() => setShowMetaSidebar(false)}><PanelLeftClose size={14} /></Button>
                                    </div>
                                    <div className="p-4 space-y-4 overflow-y-auto">
                                        <InputGroup label="Title" value={metadata.title} onChange={v => setMetadata({ ...metadata, title: v })} icon={<Type size={14} />} />
                                        <InputGroup label="Description" value={metadata.description} onChange={v => setMetadata({ ...metadata, description: v })} textarea />
                                        <InputGroup label="Tags" value={metadata.tags} onChange={v => setMetadata({ ...metadata, tags: v })} icon={<Hash size={14} />} />
                                        <InputGroup label="Image URL" value={metadata.image} onChange={v => setMetadata({ ...metadata, image: v })} icon={<ImageIcon size={14} />} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* EDITOR SURFACE */}
                        <div className={`flex-1 flex flex-col obsidian-card rounded-2xl md:rounded-[2rem] border-white/10 bg-black/40 overflow-hidden relative ${isFocusMode ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
                            {/* Toolbar */}
                            <div className="h-14 border-b border-white/5 bg-white/2 flex items-center justify-between px-2 md:px-4 backdrop-blur-xl">
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-linear-fade flex-1">
                                    {!showMetaSidebar && !isFocusMode && (
                                        <Button variant="ghost" onClick={() => setShowMetaSidebar(true)} className="mr-2 text-slate-400 hover:text-white"><PanelLeft size={18} /></Button>
                                    )}
                                    <div className="h-4 w-[1px] bg-white/10 mx-1 mobile-hidden" />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} icon={<Bold size={16} />} />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} icon={<Italic size={16} />} />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor?.isActive('code')} icon={<Code size={16} />} />

                                    <div className="h-4 w-[1px] bg-white/10 mx-1" />

                                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} icon={<Heading2 size={16} />} />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} icon={<List size={16} />} />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor?.isActive('codeBlock')} icon={<TerminalSquare size={16} />} />

                                    <div className="h-4 w-[1px] bg-white/10 mx-1" />

                                    <ToolbarButton
                                        onClick={() => setAiOpen(true)}
                                        active={aiOpen}
                                        icon={<Sparkles size={16} className="text-sky-500" />}
                                        title="AI Assistant"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                                    <Button
                                        onClick={handleSaveTopic}
                                        disabled={isSaving}
                                        className="bg-primary text-white h-8 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform"
                                    >
                                        {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                        <span className="hidden md:inline">Save</span>
                                    </Button>
                                    <Button variant="ghost" onClick={() => setIsFocusMode(!isFocusMode)} className="text-slate-400 hover:text-white">
                                        {isFocusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                    </Button>
                                </div>
                            </div>

                            {/* Tiptap Area */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 lg:px-16">
                                <EditorContent editor={editor} className="tiptap-editor-surface max-w-4xl mx-auto min-h-[500px]" />
                            </div>

                            <AIAssistantTray
                                isOpen={aiOpen}
                                onClose={() => setAiOpen(false)}
                                editor={editor}
                                topicTitle={metadata.title}
                            />
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};

// --- SUBCOMPONENTS ---

const InputGroup = ({ label, value, onChange, icon, textarea }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>}
            {textarea ? (
                <textarea
                    value={value} onChange={e => onChange(e.target.value)}
                    className="w-full h-20 bg-black/20 border border-white/5 rounded-xl p-3 text-xs text-white resize-none focus:border-primary/50 outline-none"
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
            ) : (
                <input
                    type="text" value={value} onChange={e => onChange(e.target.value)}
                    className={`w-full h-10 bg-black/20 border border-white/5 rounded-xl pr-3 text-xs text-white focus:border-primary/50 outline-none ${icon ? 'pl-9' : 'pl-3'}`}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
            )}
        </div>
    </div>
);

const ToolbarButton = ({ onClick, active, icon }) => (
    <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-all ${active ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
        {icon}
    </button>
);

const AccessDenied = () => (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black">
        <div className="text-center space-y-4">
            <Github className="w-16 h-16 text-primary mx-auto opacity-20" />
            <h2 className="text-2xl font-black text-white uppercase italic">Access Restricted</h2>
            <p className="text-slate-500 max-w-md mx-auto">Authenticate via Command Center to access the Neural Admin interface.</p>
            <Button onClick={() => window.location.href = '/github'} className="mt-4">Login</Button>
        </div>
    </div>
);

export default NotesAdmin;
