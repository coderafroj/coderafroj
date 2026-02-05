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
import { Typography as TipTapTypography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { common, createLowlight } from 'lowlight';
import { ThemeProvider, Box, CssBaseline, CircularProgress, Typography, Button } from '@mui/material';
import editorTheme from '../../components/editor/EditorTheme';
import TopToolbar from '../../components/editor/TopToolbar';
import FileSidebar from '../../components/editor/FileSidebar';
import PropertiesSidebar from '../../components/editor/PropertiesSidebar';
import { courses } from '../../data/notes';
import { Github } from 'lucide-react';

// Lowlight setup
const lowlight = createLowlight(common);

const UltimateEditor = () => {
    const { isAuthenticated, selectedRepo, uploadFiles, fetchFileContent } = useGitHub();

    // State
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
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
            Link,
            TaskList, TaskItem.configure({ nested: true }),
            TipTapTypography,
            Highlight.configure({ multipart: true }),
            Subscript, Superscript,
            Placeholder.configure({ placeholder: 'Start writing your masterclass content...' }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] px-8 py-6 selection:bg-cyan-500/30 selection:text-cyan-200',
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
        } else {
            setMetadata({ title: '', description: '', tags: '', image: '', category: '' });
            editor?.commands.setContent('');
        }
    }, [selectedTopic, editor]);

    // Save Logic (Copied and adapted from NotesAdmin)
    const handleSave = async () => {
        if (!selectedCourse) return;
        setIsSaving(true);

        try {
            const repoPath = `src/data/notes/${selectedCourse.id.replace('-masterclass', '').replace('-deep-dive', '').replace('-mastery', '').replace('-ecosystem', '').replace('-systems-programming', '').replace('-programming', '')}.js`
                .replace('internet-web-technology', 'internet') // manual fix for long ids
                .replace('pc-maintenance-troubleshooting', 'hardware')
                .replace('office-automation', 'office')
                .replace('advanced-css3', 'css');

            // This path logic is a bit fragile, let's try to be more robust if possible or rely on the ID map we made in index.js?
            // Actually, index.js exports the arrays. The filenames align with the import names.
            // Let's rely on the simple mapping we established:
            // fundamentals -> fundamentals.js
            // c-programming -> c-programming.js
            // etc.
            // A better way is to store the filename in the course object, but we can infer it for now.

            // Quick Fix for ID to Filename mapping based on our known files
            let filename = selectedCourse.id;
            if (filename.includes('javascript')) filename = 'javascript';
            else if (filename.includes('html')) filename = 'html';
            else if (filename.includes('css')) filename = 'css';
            else if (filename.includes('react')) filename = 'react';
            else if (filename.includes('java-')) filename = 'java'; // java-programming
            else if (filename.includes('cpp')) filename = 'cpp';
            else if (filename.includes('python')) filename = 'python';
            else if (filename.includes('fundamentals')) filename = 'fundamentals';
            else if (filename.includes('hardware') || filename.includes('maintenance')) filename = 'hardware';
            else if (filename.includes('office')) filename = 'office';
            else if (filename.includes('internet')) filename = 'internet';
            else if (filename.includes('c-programming')) filename = 'c-programming';

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

            const markdownContent = newTopicData.content.replace(/`/g, '\\`'); // Escape backticks

            // Regex to find existing topic or array end
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

            alert('Saved successfully!'); // Simple feedback for now
        } catch (error) {
            console.error(error);
            alert('Failed to save: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isAuthenticated) return (
        <ThemeProvider theme={editorTheme}>
            <CssBaseline />
            <Box sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Glows */}
                <Box sx={{ position: 'absolute', top: '10%', right: '-10%', width: 600, height: 600, bgcolor: 'primary.main', opacity: 0.05, filter: 'blur(120px)', borderRadius: '50%' }} />
                <Box sx={{ position: 'absolute', bottom: '10%', left: '-10%', width: 600, height: 600, bgcolor: 'cyan', opacity: 0.05, filter: 'blur(120px)', borderRadius: '50%' }} />

                <Box sx={{ textAlign: 'center', zIndex: 1, p: 4 }}>
                    <Box sx={{
                        mb: 4,
                        display: 'inline-flex',
                        p: 3,
                        borderRadius: '2rem',
                        bgcolor: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <Github size={48} color={editorTheme.palette.primary.main} style={{ opacity: 0.5 }} />
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.02em', textTransform: 'uppercase', fontStyle: 'italic' }}>
                        Access <span style={{ color: editorTheme.palette.primary.main }}>Restricted</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, maxWidth: 400, mx: 'auto', fontWeight: 300 }}>
                        Professional Note Architect requires GitHub authentication to sync with your repository.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => window.location.href = '/'}
                            sx={{
                                borderRadius: '1rem',
                                px: 4,
                                py: 1.5,
                                bgcolor: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            Back Home
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => window.location.href = '/github'}
                            sx={{
                                borderRadius: '1rem',
                                px: 4,
                                py: 1.5,
                                fontWeight: 800,
                                boxShadow: '0 10px 30px -5px rgba(0, 243, 255, 0.4)'
                            }}
                        >
                            Log In to GitHub
                        </Button>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );

    return (
        <ThemeProvider theme={editorTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <TopToolbar editor={editor} onSave={handleSave} isSaving={isSaving} />

                <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>

                    <FileSidebar
                        courses={courses}
                        selectedCourse={selectedCourse}
                        onSelectCourse={setSelectedCourse}
                        selectedTopic={selectedTopic}
                        onSelectTopic={setSelectedTopic}
                    />

                    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        {/* Centered Editor Container - Like a "Page" */}
                        <Box sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            p: 4,
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.03), transparent 70%)'
                        }}>
                            <Box sx={{
                                width: '100%',
                                maxWidth: '850px',
                                bgcolor: 'background.paper',
                                minHeight: '100%',
                                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.03)',
                                borderRadius: 1
                            }}>
                                <EditorContent editor={editor} />
                            </Box>
                        </Box>
                    </Box>

                    <PropertiesSidebar metadata={metadata} setMetadata={setMetadata} />

                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default UltimateEditor;
