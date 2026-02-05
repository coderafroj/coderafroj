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
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { TextAlign } from '@tiptap/extension-text-align';
import { common, createLowlight } from 'lowlight';
import {
    ThemeProvider, Box, CssBaseline, CircularProgress,
    Typography, Button, useMediaQuery, useTheme,
    Breadcrumbs, Link as MuiLink, Stack, Tooltip,
    TextField, InputAdornment
} from '@mui/material';
import {
    NavigateNext as NavigateNextIcon,
    Home as HomeIcon,
    Category as CategoryIcon,
    Article as ArticleIcon
} from '@mui/icons-material';
import editorTheme from '../../components/editor/EditorTheme';
import TopToolbar from '../../components/editor/TopToolbar';
import FileSidebar from '../../components/editor/FileSidebar';
import PropertiesSidebar from '../../components/editor/PropertiesSidebar';
import { courses } from '../../data/notes';
import { Github, Menu as MenuIcon, Search as SearchIcon } from 'lucide-react';

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
    const [searchQuery, setSearchQuery] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [fileSidebarOpen, setFileSidebarOpen] = useState(!isMobile);
    const [propsSidebarOpen, setPropsSidebarOpen] = useState(!isMobile);

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
            TextStyle,
            Color,
            FontFamily,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Start writing your masterclass content...' }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] px-8 py-6 selection:bg-cyan-500/30 selection:text-cyan-200',
            },
        },
    });

    // Filtering logic for search
    const filteredCourses = courses.map(course => ({
        ...course,
        notes: course.notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    })).filter(course => course.notes.length > 0 || searchQuery === '');

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
            if (!selectedRepo) {
                throw new Error('No repository selected. Please select your repository in the Command Center (/github) first.');
            }

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

    const handleDeleteTopic = async (course, topic) => {
        if (!window.confirm(`Are you sure you want to delete "${topic.title}"?`)) return;
        setIsSaving(true);

        try {
            const filename = course.id.replace('-masterclass', '').split('-')[0]; // simple inference
            const fullPath = `src/data/notes/${filename}.js`;
            const [owner, repoName] = selectedRepo.full_name.split('/');
            const fileData = await fetchFileContent(owner, repoName, fullPath);
            const content = fileData.content;

            const topicRegex = new RegExp(`{\\s*id:\\s*['"]${topic.id}['"][\\s\\S]*?content:\\s*\`[\\s\\S]*?\`\\s*},?`, 'm');
            const updatedContent = content.replace(topicRegex, '');

            await uploadFiles([{
                path: fullPath,
                file: new Blob([updatedContent], { type: 'text/javascript' })
            }], `Delete note: ${topic.title}`);

            alert('Deleted successfully! Refreshing...');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Failed to delete: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleNewTopic = (course) => {
        setSelectedCourse(course);
        setSelectedTopic(null);
        setMetadata({
            title: '',
            description: '',
            tags: '',
            image: '',
            category: course.title
        });
        editor?.commands.setContent('');
    };

    const handleNewCourse = () => {
        const name = window.prompt('Enter new course name (e.g., Node.js Mastery)');
        if (!name) return;
        alert('Creating new courses involves updating project structure. For now, please add the new .js file in src/data/notes/ and import it in index.js manually. I will automate this in the next update!');
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
                <TopToolbar
                    editor={editor}
                    onSave={handleSave}
                    onDelete={() => selectedTopic && handleDeleteTopic(selectedCourse, selectedTopic)}
                    isSaving={isSaving}
                    onToggleFiles={() => setFileSidebarOpen(!fileSidebarOpen)}
                    onToggleProps={() => setPropsSidebarOpen(!propsSidebarOpen)}
                    isMobile={isMobile}
                    courseId={selectedCourse?.id}
                    topicSlug={selectedTopic?.slug}
                />

                {breadcrumbs}

                <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
                    <style>
                        {`
                            ::-webkit-scrollbar {
                                width: 6px;
                                height: 6px;
                            }
                            ::-webkit-scrollbar-track {
                                background: rgba(0,0,0,0.2);
                            }
                            ::-webkit-scrollbar-thumb {
                                background: rgba(0, 243, 255, 0.1);
                                border-radius: 10px;
                            }
                            ::-webkit-scrollbar-thumb:hover {
                                background: rgba(0, 243, 255, 0.3);
                            }
                            .ProseMirror p.is-editor-empty:first-of-type::before {
                                color: rgba(255,255,255,0.2);
                                content: attr(data-placeholder);
                                float: left;
                                height: 0;
                                pointer-events: none;
                            }
                        `}
                    </style>
                    <FileSidebar
                        courses={filteredCourses}
                        selectedCourse={selectedCourse}
                        onSelectCourse={setSelectedCourse}
                        selectedTopic={selectedTopic}
                        onSelectTopic={setSelectedTopic}
                        onNewCourse={handleNewCourse}
                        onNewTopic={handleNewTopic}
                        onDeleteTopic={handleDeleteTopic}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        open={fileSidebarOpen}
                        onClose={() => setFileSidebarOpen(false)}
                        isMobile={isMobile}
                    />

                    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        {/* Centered Editor Container - Like a "Page" */}
                        <Box sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            p: isMobile ? 2 : 4,
                            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.03), transparent 70%)'
                        }}>
                            <Box sx={{
                                width: '100%',
                                maxWidth: '850px',
                                bgcolor: 'background.paper',
                                minHeight: '100%',
                                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.03)',
                                borderRadius: isMobile ? 0 : 1
                            }}>
                                <EditorContent editor={editor} />
                            </Box>
                        </Box>
                    </Box>

                    <PropertiesSidebar
                        metadata={metadata}
                        setMetadata={setMetadata}
                        open={propsSidebarOpen}
                        onClose={() => setPropsSidebarOpen(false)}
                        isMobile={isMobile}
                    />

                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default UltimateEditor;
