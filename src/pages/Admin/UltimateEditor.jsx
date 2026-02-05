import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
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
    Breadcrumbs, Link as MuiLink, Stack, Tooltip,
    TextField, InputAdornment, IconButton, Divider,
    Grid, Paper, Container, Fade, Zoom, Avatar
} from '@mui/material';
import {
    NavigateNext as NavigateNextIcon,
    Home as HomeIcon,
    Category as CategoryIcon,
    Article as ArticleIcon,
    FormatBold as FormatBoldIcon,
    FormatItalic as FormatItalicIcon,
    Code as CodeIcon,
    Image as ImageIcon,
    Save as SaveIcon,
    MoreVert as MoreVertIcon,
    Visibility as VisibilityIcon,
    DeleteForever as DeleteForeverIcon
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
    const [showLauncher, setShowLauncher] = useState(true);

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

    // Launcher UI Component
    const LaunchCenter = () => (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background Elements */}
            <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 243, 255, 0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 102, 255, 0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

            <Container maxWidth="lg" sx={{ pt: isMobile ? 4 : 8, pb: 8, position: 'relative', zIndex: 1 }}>
                {/* Header Section */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Box sx={{
                            display: 'inline-flex',
                            p: 2,
                            borderRadius: '24px',
                            bgcolor: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            mb: 3
                        }}>
                            <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #00f3ff, #0066ff)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)' }}>
                                <Typography variant="h5" fontWeight="900" sx={{ color: 'black' }}>N</Typography>
                            </div>
                        </Box>
                        <Typography variant={isMobile ? "h4" : "h2"} sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', fontStyle: 'italic', mb: 1.5 }}>
                            Notes <span style={{ color: theme.palette.primary.main }}>Architect</span>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 300, opacity: 0.7 }}>
                            Elite Command Center for Professional Content Management
                        </Typography>
                    </Box>
                </motion.div>

                {/* Selection Interface */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Box sx={{ mb: 6 }}>
                        <TextField
                            fullWidth
                            placeholder="Find a course mission..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="primary" sx={{ opacity: 0.5 }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    height: 64,
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    bgcolor: 'rgba(255,255,255,0.02)',
                                    backdropFilter: 'blur(20px)',
                                    fontSize: '1.1rem',
                                    transition: 'all 0.3s',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(0, 243, 255, 0.2)' },
                                    '&.Mui-focused': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0, 243, 255, 0.5)', boxShadow: '0 0 30px rgba(0, 243, 255, 0.1)' }
                                }
                            }}
                        />
                    </Box>

                    <Grid container spacing={3}>
                        {filteredCourses.map((course, index) => (
                            <Grid item xs={12} sm={6} md={4} key={course.id}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setShowLauncher(false);
                                    }}
                                >
                                    <Paper sx={{
                                        p: 3,
                                        height: '100%',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '24px',
                                        bgcolor: 'rgba(20, 20, 20, 0.6)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(30px)',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(0, 243, 255, 0.1)'
                                        }
                                    }}>
                                        <Stack spacing={2}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Avatar sx={{ bgcolor: 'rgba(0, 243, 255, 0.1)', color: 'primary.main', borderRadius: '12px' }}>
                                                    <CategoryIcon fontSize="small" />
                                                </Avatar>
                                                <Typography variant="caption" sx={{ opacity: 0.3, letterSpacing: '0.1em' }}>COURSE ID: {course.id.substring(0, 6)}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, lineHeight: 1.2 }}>
                                                    {course.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ opacity: 0.5, fontSize: '0.8rem' }}>
                                                    {course.notes.length} Active Modules
                                                </Typography>
                                            </Box>
                                            <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button size="small" variant="text" sx={{ fontWeight: 800, fontSize: '0.7rem', color: 'primary.main' }} endIcon={<NavigateNextIcon />}>
                                                    Initialize Workspace
                                                </Button>
                                            </Box>
                                        </Stack>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );

    if (showLauncher) {
        return (
            <ThemeProvider theme={editorTheme}>
                <CssBaseline />
                <LaunchCenter />
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={editorTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                {!isMobile && (
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
                )}

                {!isMobile && breadcrumbs}

                <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
                    {/* Workspace UI Header for Mobile */}
                    <AnimatePresence>
                        {isMobile && editor && (
                            <>
                                {/* Floating Top Header */}
                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    style={{
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        right: 16,
                                        zIndex: 1000,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 20px',
                                        background: 'rgba(10, 10, 10, 0.8)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <IconButton size="small" onClick={() => setShowLauncher(true)} sx={{ mr: 0.5, color: 'primary.main' }}>
                                            <HomeIcon fontSize="small" />
                                        </IconButton>
                                        <Typography variant="body2" fontWeight="800" sx={{ letterSpacing: '0.1em', opacity: 0.9 }}>
                                            {selectedTopic ? selectedTopic.title.substring(0, 15) + '...' : (selectedCourse?.title.substring(0, 15) + '...' || 'ARCHITECT')}
                                        </Typography>
                                    </Box>
                                    <Button
                                        size="small"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        variant="contained"
                                        sx={{
                                            borderRadius: '10px',
                                            fontWeight: 800,
                                            height: 32,
                                            padding: '0 16px',
                                            background: 'linear-gradient(to right, #00f3ff, #0066ff)',
                                            color: 'black',
                                            boxShadow: '0 0 15px rgba(0, 243, 255, 0.3)'
                                        }}
                                    >
                                        {isSaving ? '...' : <SaveIcon fontSize="small" />}
                                    </Button>
                                </motion.div>

                                {/* Vertical Floating Toolbar */}
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    style={{
                                        position: 'absolute',
                                        left: 12,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 999,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 8,
                                        padding: '10px',
                                        background: 'rgba(10, 10, 10, 0.7)',
                                        backdropFilter: 'blur(15px)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}
                                >
                                    {[
                                        { icon: <FormatBoldIcon fontSize="small" />, active: editor.isActive('bold'), action: () => editor.chain().focus().toggleBold().run() },
                                        { icon: <FormatItalicIcon fontSize="small" />, active: editor.isActive('italic'), action: () => editor.chain().focus().toggleItalic().run() },
                                        { icon: <CodeIcon fontSize="small" />, active: editor.isActive('codeBlock'), action: () => editor.chain().focus().toggleCodeBlock().run() },
                                        { icon: <ImageIcon fontSize="small" />, active: false, action: () => { const url = window.prompt('Image URL'); if (url) editor.chain().focus().setImage({ src: url }).run(); } },
                                    ].map((tool, i) => (
                                        <IconButton
                                            key={i}
                                            size="small"
                                            onClick={tool.action}
                                            sx={{
                                                width: 38,
                                                height: 38,
                                                color: tool.active ? '#00f3ff' : 'white',
                                                bgcolor: tool.active ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
                                                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                                            }}
                                        >
                                            {tool.icon}
                                        </IconButton>
                                    ))}
                                </motion.div>

                                {/* Bottom Dock */}
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: 24,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        zIndex: 1001,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 20,
                                        padding: '12px 24px',
                                        background: 'rgba(20, 20, 20, 0.9)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '80px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
                                    }}
                                >
                                    <IconButton onClick={() => setFileSidebarOpen(true)} sx={{ color: 'white', opacity: 0.8 }}>
                                        <MenuIcon size={20} />
                                    </IconButton>
                                    <Divider orientation="vertical" flexItem sx={{ borderRightColor: 'rgba(255,255,255,0.1)', my: 1 }} />
                                    <IconButton onClick={() => setPropsSidebarOpen(true)} sx={{ color: 'white', opacity: 0.8 }}>
                                        <SearchIcon size={20} />
                                    </IconButton>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
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
                            p: isMobile ? 1 : 4,
                            pt: isMobile ? 10 : 4, // More space for floating header
                            pb: isMobile ? 12 : 4, // More space for bottom dock
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
