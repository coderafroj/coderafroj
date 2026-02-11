import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGitHub } from '../../context/GitHubContext';
import { useEditor } from '@tiptap/react';
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
import { Typography as TipTapTypography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { CharacterCount } from '@tiptap/extension-character-count';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { common, createLowlight } from 'lowlight';

// Component Imports
import editorTheme from '../../components/editor/EditorTheme';
import { courses } from '../../data/notes';
import LanguageSelector from '../../components/editor/LanguageSelector';
import TopicFlowArea from '../../components/editor/TopicFlowArea';
import EliteDock from '../../components/editor/EliteDock';
import ModernEditorTray from '../../components/editor/ModernEditorTray';
import AIAssistantTray from '../../components/editor/AIAssistantTray';
import PropertiesSidebar from '../../components/editor/PropertiesSidebar';

// Lowlight setup
const lowlight = createLowlight(common);

const UltimateEditor = () => {
    const { isAuthenticated, user, selectedRepo, uploadFiles, fetchFileContent } = useGitHub();

    // Workflow State
    const [step, setStep] = useState('select'); // 'select', 'graph'
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // UI Toggles
    const [editorOpen, setEditorOpen] = useState(false);
    const [aiOpen, setAiOpen] = useState(false);
    const [propsOpen, setPropsOpen] = useState(false);

    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        tags: '',
        image: '',
        category: ''
    });

    // Editor Initialization
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({ lowlight }),
            Markdown,
            Table.configure({ resizable: true }),
            TableRow, TableCell, TableHeader,
            Image,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'cursor-pointer text-cyan-400 no-underline hover:underline',
                },
            }),
            TaskList, TaskItem.configure({ nested: true }),
            TipTapTypography,
            Highlight.configure({ multipart: true }),
            Subscript, Superscript,
            TextStyle,
            Color,
            FontFamily,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Initialize mission content...' }),
            Underline,
            CharacterCount,
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none selection:bg-blue-500/30 font-light leading-relaxed',
            },
        },
    });

    // Effects
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
            setEditorOpen(true);
        }
    }, [selectedTopic, editor]);

    // Save Logic
    const handleSave = async () => {
        if (!selectedCourse) return;
        setIsSaving(true);

        try {
            if (!selectedRepo) {
                throw new Error('No repository selected. Please select your repository in the Command Center (/github) first.');
            }

            const idMap = {
                'computer-fundamentals': 'computer-fundamentals',
                'c-programming': 'c-programming',
                'python-masterclass': 'python-masterclass',
                'office-automation': 'office'
                // ... add others as needed or use inference
            };

            const filename = idMap[selectedCourse.id] || selectedCourse.id.split('-')[0];
            const fullPath = `src/data/notes/${filename}.js`;

            const [owner, repoName] = selectedRepo.full_name.split('/');
            const fileData = await fetchFileContent(owner, repoName, fullPath);
            const content = fileData.content;

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

            const markdownContent = newTopicData.content.replace(/`/g, '\\`');

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
${markdownContent}
\`
    }`;

            let updatedFileContent = content;
            if (topicRegex.test(content)) {
                updatedFileContent = content.replace(topicRegex, newTopicString + ',');
            } else {
                updatedFileContent = content.replace(/];\s*$/, `    ${newTopicString},\n];`);
            }

            await uploadFiles([{
                path: fullPath,
                file: new Blob([updatedFileContent], { type: 'text/javascript' })
            }], `Update note: ${newTopicData.title}`);

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0ea5e9', '#38bdf8', '#818cf8', '#06b6d4'],
                zIndex: 4000
            });

            toast.success('Elite Cloud Sync Successful', {
                description: `Node "${newTopicData.title}" has been pushed to GitHub.`,
            });
        } catch (error) {
            console.error(error);
            toast.error('Sync Failed', { description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const handleNewTopic = () => {
        setSelectedTopic(null);
        setMetadata({
            title: '',
            description: '',
            tags: '',
            image: '',
            category: selectedCourse?.title || ''
        });
        editor?.commands.setContent('');
        setEditorOpen(true);
    };

    if (!isAuthenticated || user?.login !== 'coderafroj') return (
        <ThemeProvider theme={editorTheme}>
            <CssBaseline />
            <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#030014', gap: 2 }}>
                <h1 className="text-white text-2xl font-black italic uppercase">Access Denied</h1>
                <p className="text-slate-500 font-mono text-sm uppercase">Administrative Privileges Required (User: {user?.login || 'Not Authenticated'})</p>
            </Box>
        </ThemeProvider>
    );

    return (
        <ThemeProvider theme={editorTheme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', bgcolor: '#030014', overflowX: 'hidden' }}>

                <AnimatePresence mode="wait">
                    {step === 'select' ? (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: -100 }}
                        >
                            <LanguageSelector
                                courses={courses}
                                selectedCourse={selectedCourse}
                                onSelect={(course) => {
                                    setSelectedCourse(course);
                                    setStep('graph');
                                }}
                                searchQuery={searchQuery}
                                onSearchQueryChange={setSearchQuery}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="graph"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="h-screen w-full relative"
                        >
                            <TopicFlowArea
                                topics={selectedCourse?.notes || []}
                                courseTitle={selectedCourse?.title}
                                onTopicSelect={setSelectedTopic}
                                selectedTopic={selectedTopic}
                            />

                            {/* Redesigned Dock */}
                            <EliteDock
                                onSave={handleSave}
                                onHome={() => setStep('select')}
                                onAddTopic={handleNewTopic}
                                onToggleAI={() => setAiOpen(true)}
                                onToggleProps={() => setPropsOpen(!propsOpen)}
                                onOpenGraph={() => setEditorOpen(false)}
                                isSaving={isSaving}
                                activeTab={editorOpen ? 'editor' : 'graph'}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Overlays */}
                <ModernEditorTray
                    isOpen={editorOpen}
                    onClose={() => setEditorOpen(false)}
                    editor={editor}
                    topicTitle={metadata.title}
                />

                <AIAssistantTray
                    isOpen={aiOpen}
                    onClose={() => setAiOpen(false)}
                    editor={editor}
                    topicTitle={metadata.title}
                />

                <PropertiesSidebar
                    metadata={metadata}
                    setMetadata={setMetadata}
                    open={propsOpen}
                    onClose={() => setPropsOpen(false)}
                />

            </Box>
        </ThemeProvider>
    );
};

export default UltimateEditor;
