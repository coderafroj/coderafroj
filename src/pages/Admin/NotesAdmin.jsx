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
import ReactMarkdown from 'react-markdown'; // For Preview Mode

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
    PanelLeftClose, ArrowLeft, Loader2, FilePlus, Globe,
    Sparkles, Eye, EyeOff
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
    const [isPreviewMode, setIsPreviewMode] = useState(false); // NEW: Preview Mode

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
            // Smart Content Loading: Handle both Markdown (new/migrated) and HTML (legacy)
            // Tiptap's tiptap-markdown extension usually handles markdown content in setContent automatically
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
            StarterKit.configure({
                codeBlock: false,
                link: false,
                underline: false
            }),
            CodeBlockLowlight.configure({ lowlight }),
            Markdown.configure({
                html: false, // Force Markdown output
                transformPastedText: true,
                transformCopiedText: true,
                break: true // Convert hard breaks to <br> or  
            }),
            Table.configure({ resizable: true }),
            TableRow, TableCell, TableHeader,
            Image.configure({ inline: true }),
            Link.configure({ openOnClick: false }),
            TaskList, TaskItem.configure({ nested: true }),
            Typography, Highlight.configure({ multipart: true }),
            Subscript, Superscript,
            Placeholder.configure({ placeholder: 'Start writing your masterclass content...' }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[300px]',
            },
        },
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

            // 3. Prepare Index Update
            const indexFile = await fetchFileContent(selectedRepo.owner.login, selectedRepo.name, 'src/data/notes/index.js');
            let indexContent = indexFile.content;

            const importStmt = `import { ${varName} } from './${slug}';\n`;
            indexContent = importStmt + indexContent;

            const categoryEntry = `    ${varName}: {\n        title: '${newCourseName}',\n        description: 'New User Created Course',\n        notes: ${varName}\n    },`;
            indexContent = indexContent.replace('export const noteCategories = {', `export const noteCategories = {\n${categoryEntry}`);

            const courseEntry = `    { id: '${slug}', ...noteCategories.${varName} },`;
            indexContent = indexContent.replace('export const courses = [', `export const courses = [\n${courseEntry}`);

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

            let fileData;
            try {
                fileData = await fetchFileContent(owner, repoName, repoPath);
            } catch (e) {
                throw new Error(`File access error: ${repoPath}`);
            }

            const content = fileData.content;

            // Get Markdown Content from Tiptap Storage
            const markdownContent = editor.storage.markdown.getMarkdown();

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
                content: markdownContent // Save as Markdown
            };

            // JS File Injection Logic
            let updatedFileContent = content;
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
                    updatedFileContent += `\n// Recovery append\nexport const append_${newTopicData.id} = ${newTopicString};`;
                }
            }

            await uploadFiles([{
                path: repoPath,
                file: new Blob([updatedFileContent], { type: 'text/javascript' })
            }], `Update Topic (MD): ${newTopicData.title}`);

            setStatus({ type: 'success', message: 'Memory Synced Successfully' });

            // Update local state
            if (activeTopicIndex >= 0) {
                const updatedNotes = [...selectedCourse.notes];
                updatedNotes[activeTopicIndex] = { ...newTopicData };
                // Deep update strategy (ideally use context or refetch)
            }

        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: error.message });
        } finally {
            setIsSaving(false);
            setTimeout(() => setStatus({ message: '' }), 3000);
        }
    };

    const addImage = () => {
        const url = window.prompt('Enter Image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
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
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-[1900px] mx-auto overflow-hidden bg-black text-white selection:bg-primary/30">
            {/* GLOBAL HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    {view === 'courses' ? (
                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 uppercase tracking-tighter">
                            Admin <span className="text-primary italic">Command</span>
                        </h1>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" className="p-2 hover:bg-white/10 rounded-full" onClick={() => {
                                if (view === 'editor') setView('topics');
                                else setView('courses');
                            }}>
                                <ArrowLeft className="w-6 h-6 text-white" />
                            </Button>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                                {view === 'topics' ? selectedCourse?.title : (
                                    <span className="flex items-center gap-2">
                                        <span className="text-slate-500">{selectedCourse?.title}</span>
                                        <ChevronRight size={16} />
                                        <span className="text-primary">Editor</span>
                                    </span>
                                )}
                            </h2>
                        </div>
                    )}
                </div>

                {/* GLOBAL STATUS INDICATOR */}
                <AnimatePresence>
                    {status.message && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            className={`px-6 py-2 rounded-full border backdrop-blur-xl shadow-2xl z-50 fixed top-6 right-1/2 translate-x-1/2 text-sm font-bold uppercase tracking-widest flex items-center gap-3
                                ${status.type === 'error' ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-green-500/20 border-green-500 text-green-500'}
                             `}
                        >
                            {status.type === 'info' && <Loader2 className="w-4 h-4 animate-spin" />}
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
                        <div className="relative overflow-hidden p-8 rounded-[2rem] border border-white/10 bg-[#0A0A0A] group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
                                <div className="p-4 bg-primary/20 rounded-2xl text-primary border border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                                    <Globe size={32} />
                                </div>
                                <div className="flex-1 w-full text-center md:text-left">
                                    <h3 className="text-lg font-black text-white uppercase tracking-wider mb-1">Initialize New Domain</h3>
                                    <p className="text-sm text-slate-400">Expand the knowledge base with a new masterclass module.</p>
                                </div>
                                <div className="flex w-full md:w-auto gap-3">
                                    <input
                                        value={newCourseName}
                                        onChange={(e) => setNewCourseName(e.target.value)}
                                        placeholder="Enter Domain Name..."
                                        className="h-12 bg-black/40 border border-white/10 rounded-xl px-5 text-sm text-white focus:border-primary/50 outline-none min-w-[250px] shadow-inner"
                                    />
                                    <Button
                                        onClick={handleCreateCourse}
                                        disabled={isCreatingCourse}
                                        className="h-12 bg-primary hover:bg-primary/90 text-white px-8 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-primary/20"
                                    >
                                        {isCreatingCourse ? <Loader2 className="animate-spin" /> : 'Create'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {courses.map(course => (
                                <button
                                    key={course.id}
                                    onClick={() => { setSelectedCourse(course); setView('topics'); }}
                                    className="relative group p-8 rounded-[2rem] border border-white/5 bg-[#0A0A0A] hover:bg-[#111] hover:border-primary/30 transition-all duration-300 text-left overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                                        <Layers size={80} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">{course.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">{course.description || 'No description available.'}</p>
                                    <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
                                        <span>{course.notes?.length || 0} MODULES</span>
                                        <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                                            <span>ACCESS</span>
                                            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
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
                        <div className="flex justify-between items-center bg-[#0A0A0A] p-4 rounded-2xl border border-white/5">
                            <h3 className="text-slate-400 text-sm font-mono uppercase tracking-widest pl-2">
                                / {selectedCourse.title.toUpperCase()} / MODULES
                            </h3>
                            <Button onClick={() => { setSelectedTopic(null); setView('editor'); }} className="bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center gap-2 px-6 py-3 shadow-lg shadow-primary/20">
                                <Plus size={18} /> <span className="text-xs font-bold uppercase tracking-wider">New Topic</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {selectedCourse.notes?.map(topic => (
                                <button
                                    key={topic.id}
                                    onClick={() => { setSelectedTopic(topic); setView('editor'); }}
                                    className="p-5 rounded-xl border border-white/5 bg-[#0A0A0A] hover:bg-white/5 hover:border-white/10 flex items-center justify-between group transition-all duration-200"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 font-black text-xl group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                            {topic.title.charAt(0)}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{topic.title}</h4>
                                            <p className="text-xs text-slate-600 font-mono uppercase tracking-widest mt-1">{topic.slug}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex gap-2">
                                            {topic.tags?.slice(0, 3).map((tag, i) => (
                                                <span key={i} className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-slate-400 uppercase tracking-wider border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <ChevronRight size={20} className="text-slate-700 group-hover:text-white transition-colors" />
                                    </div>
                                </button>
                            ))}
                            {(!selectedCourse.notes || selectedCourse.notes.length === 0) && (
                                <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-3xl text-slate-600">
                                    <p className="text-lg font-medium">No topics found in this course.</p>
                                    <Button variant="link" onClick={() => { setSelectedTopic(null); setView('editor'); }} className="mt-4 text-primary">
                                        Create one now
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 3. EDITOR VIEW */}
                {view === 'editor' && (
                    <motion.div
                        key="editor" initial="initial" animate="animate" exit="exit" variants={pageVariants}
                        className="h-[calc(100vh-160px)] flex gap-4"
                    >
                        {/* META SIDEBAR (Collapsible) */}
                        <AnimatePresence>
                            {showMetaSidebar && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }} animate={{ width: 350, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                                    className="bg-[#0A0A0A] border-r border-white/10 overflow-hidden shrink-0 flex flex-col h-full rounded-l-2xl z-20 shadow-2xl"
                                >
                                    <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/2">
                                        <span className="text-xs font-bold uppercase text-primary tracking-widest flex items-center gap-2">
                                            <SettingsIcon /> Metadata
                                        </span>
                                        <Button variant="ghost" size="sm" onClick={() => setShowMetaSidebar(false)} className="hover:bg-white/10 rounded-lg"><PanelLeftClose size={16} /></Button>
                                    </div>
                                    <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                                        <InputGroup label="Title" value={metadata.title} onChange={v => setMetadata({ ...metadata, title: v })} icon={<Type size={16} />} />
                                        <InputGroup label="Description" value={metadata.description} onChange={v => setMetadata({ ...metadata, description: v })} textarea />
                                        <InputGroup label="Tags" value={metadata.tags} onChange={v => setMetadata({ ...metadata, tags: v })} icon={<Hash size={16} />} />
                                        <InputGroup label="Image URL" value={metadata.image} onChange={v => setMetadata({ ...metadata, image: v })} icon={<ImageIcon size={16} />} />
                                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                                            <h5 className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">Status</h5>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                Active Editing Session
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* EDITOR SURFACE */}
                        <div className={`flex-1 flex flex-col rounded-[2rem] border border-white/10 bg-[#0A0A0A] overflow-hidden relative shadow-2xl ${isFocusMode ? 'fixed inset-0 z-[100] rounded-none border-0' : ''}`}>

                            {/* Toolbar - Cyber Style */}
                            <div className="h-16 border-b border-white/5 bg-[#111]/80 backdrop-blur-xl flex items-center justify-between px-4 z-20">
                                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mask-linear-fade flex-1 py-2">
                                    {!showMetaSidebar && !isFocusMode && (
                                        <Button variant="ghost" onClick={() => setShowMetaSidebar(true)} className="mr-3 text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"><PanelLeft size={20} /></Button>
                                    )}
                                    <div className="h-6 w-[1px] bg-white/10 mx-2 mobile-hidden" />

                                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} icon={<Bold size={18} />} tooltip="Bold" />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} icon={<Italic size={18} />} tooltip="Italic" />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor?.isActive('code')} icon={<Code size={18} />} tooltip="Inline Code" />

                                    <div className="h-6 w-[1px] bg-white/10 mx-2" />

                                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })} icon={<Heading1 size={18} />} tooltip="H1" />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} icon={<Heading2 size={18} />} tooltip="H2" />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} icon={<List size={18} />} tooltip="List" />
                                    <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor?.isActive('codeBlock')} icon={<TerminalSquare size={18} />} tooltip="Code Block" />
                                    <ToolbarButton onClick={addImage} icon={<ImageIcon size={18} />} tooltip="Insert Image" />

                                    <div className="h-6 w-[1px] bg-white/10 mx-2" />

                                    <ToolbarButton
                                        onClick={() => setAiOpen(true)}
                                        active={aiOpen}
                                        icon={<Sparkles size={18} className="text-sky-500" />}
                                        title="AI Assistant"
                                        tooltip="AI Help"
                                    />
                                </div>

                                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                    {/* Preview Toggle */}
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                                        className={`p-2 rounded-lg transition-all flex items-center gap-2 ${isPreviewMode ? 'text-primary bg-primary/10' : 'text-slate-400'}`}
                                        title="Toggle Preview"
                                    >
                                        {isPreviewMode ? <Eye size={20} /> : <EyeOff size={20} />}
                                        <span className="hidden md:inline text-xs font-bold uppercase">{isPreviewMode ? 'Preview' : 'Edit'}</span>
                                    </Button>

                                    <div className="h-6 w-[1px] bg-white/10" />

                                    <Button
                                        onClick={handleSaveTopic}
                                        disabled={isSaving}
                                        className="bg-primary hover:bg-primary/90 text-white h-9 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                    >
                                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        <span className="hidden md:inline">Save Cloud</span>
                                    </Button>
                                    <Button variant="ghost" onClick={() => setIsFocusMode(!isFocusMode)} className="text-slate-400 hover:text-white p-2">
                                        {isFocusMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                                    </Button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0A0A0A] relative">
                                {isPreviewMode ? (
                                    <div className="w-full h-full p-8 md:p-12 lg:px-24">
                                        <div className="prose prose-invert prose-lg max-w-4xl mx-auto prose-p:leading-relaxed prose-headings:font-bold prose-a:text-primary">
                                            <ReactMarkdown
                                                components={{
                                                    code: ({ node, inline, className, children, ...props }) => {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline ? (
                                                            <div className="mockup-code-container relative group">
                                                                <code className="block bg-[#161b22] p-4 rounded-lg overflow-x-auto text-sm font-mono border border-white/10 my-4" {...props}>
                                                                    {children}
                                                                </code>
                                                            </div>
                                                        ) : (
                                                            <code className="bg-white/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono border border-white/5" {...props}>{children}</code>
                                                        );
                                                    },
                                                    img: ({ node, ...props }) => (
                                                        <img {...props} className="rounded-xl border border-white/10 shadow-2xl my-6" />
                                                    )
                                                }}
                                            >
                                                {editor?.storage.markdown.getMarkdown()}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full p-6 md:p-8 lg:px-16" onClick={() => editor?.chain().focus().run()}>
                                        <EditorContent editor={editor} className="tiptap-editor-surface max-w-4xl mx-auto min-h-[500px] outline-none" />
                                    </div>
                                )}
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
    <div className="space-y-2 group">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-primary transition-colors">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">{icon}</div>}
            {textarea ? (
                <textarea
                    value={value} onChange={e => onChange(e.target.value)}
                    className="w-full h-24 bg-white/5 border border-white/5 rounded-xl p-4 text-xs text-white resize-none focus:border-primary/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
            ) : (
                <input
                    type="text" value={value} onChange={e => onChange(e.target.value)}
                    className={`w-full h-12 bg-white/5 border border-white/5 rounded-xl pr-4 text-xs text-white focus:border-primary/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600 ${icon ? 'pl-11' : 'pl-4'}`}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
            )}
        </div>
    </div>
);

const ToolbarButton = ({ onClick, active, icon, tooltip }) => (
    <button
        onClick={onClick}
        title={tooltip}
        className={`p-2.5 rounded-lg transition-all duration-200 relative group overflow-hidden ${active ? 'bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
        <div className="relative z-10">{icon}</div>
        {active && <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />}
    </button>
);

const SettingsIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const AccessDenied = () => (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black">
        <div className="text-center space-y-6 relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <div className="relative z-10">
                <Github className="w-20 h-20 text-white mx-auto opacity-20 mb-4" />
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Access Restricted</h2>
                <p className="text-slate-500 max-w-md mx-auto mt-2">Authenticate via Command Center to access the Neural Admin interface.</p>
                <Button onClick={() => window.location.href = '/github'} className="mt-8 bg-white text-black hover:bg-white/90 px-8 py-3 rounded-xl font-bold uppercase tracking-wider">
                    Initiate Login
                </Button>
            </div>
        </div>
    </div>
);

export default NotesAdmin;
