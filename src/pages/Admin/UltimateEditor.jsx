import { Underline } from '@tiptap/extension-underline';
import { CharacterCount } from '@tiptap/extension-character-count';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { common, createLowlight } from 'lowlight';
import {
    Breadcrumbs, Link as MuiLink, Stack, Tooltip,
    TextField, InputAdornment, IconButton, Divider,
    Grid, Paper, Container, Fade, Zoom, Avatar,
    useTheme, useMediaQuery, ThemeProvider, CssBaseline,
    Box, Typography, Button
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
import { Github, Menu as MenuIcon, Search as SearchIcon, Terminal, Zap } from 'lucide-react';

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
            Underline,
            CharacterCount,
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[800px] px-12 py-16 selection:bg-blue-500/30 selection:text-blue-200 font-light leading-[1.8]',
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

            const idMap = {
                'computer-fundamentals': 'computer-fundamentals',
                'c-programming': 'c-programming',
                'python-masterclass': 'python-masterclass',
                'office-automation': 'office',
                'pc-maintenance-troubleshooting': 'hardware',
                'internet-web-technology': 'internet',
                'iot-mastery': 'iot',
                'javascript-deep-dive': 'javascript',
                'html5-mastery': 'html',
                'advanced-css3': 'css',
                'react-js-ecosystem': 'react',
                'java-programming': 'java',
                'cpp-systems-programming': 'cpp'
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

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#8b5cf6', '#d946ef', '#06b6d4'],
                zIndex: 2000
            });

            toast.success('Sync Successful', {
                description: `Node "${newTopicData.title}" has been pushed to GitHub.`,
                duration: 5000,
            });
        } catch (error) {
            console.error(error);
            toast.error('Sync Failed', {
                description: error.message
            });
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
            bgcolor: '#030014',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background Elements */}
            <Box sx={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
            <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)', filter: 'blur(120px)' }} />

            {/* Grid Pattern */}
            <Box sx={{
                position: 'absolute',
                inset: 0,
                opacity: 0.2,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 0%, transparent 100%)'
            }} />

            <Container maxWidth="lg" sx={{ pt: isMobile ? 6 : 12, pb: 12, position: 'relative', zIndex: 1 }}>
                {/* Header Section */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Box sx={{ textAlign: 'center', mb: 10 }}>
                        <Box sx={{
                            display: 'inline-flex',
                            p: 2.5,
                            borderRadius: '2.5rem',
                            bgcolor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(20px)',
                            mb: 4,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                        }}>
                            <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #2563eb, #00f3ff)', borderRadius: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)' }}>
                                <Terminal size={32} color="black" strokeWidth={3} />
                            </div>
                        </Box>
                        <Typography variant={isMobile ? "h3" : "h1"} sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', mb: 2, background: 'linear-gradient(to bottom, #fff 0%, #aaa 100%)', bgClip: 'text', color: 'transparent' }}>
                            Masterclass <span style={{ color: '#2563eb' }}>Architect</span>
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            <div className="h-[1px] w-12 bg-white/10" />
                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem' }}>
                                Elite Creator Engine v3.0
                            </Typography>
                            <div className="h-[1px] w-12 bg-white/10" />
                        </Box>
                    </Box>
                </motion.div>

                {/* Selection Interface */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Box sx={{ mb: 8, maxWidth: '700px', mx: 'auto' }}>
                        <TextField
                            fullWidth
                            placeholder="Initialize mission sequence: Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="primary" sx={{ opacity: 0.8 }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    height: 72,
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    bgcolor: 'rgba(255,255,255,0.03)',
                                    backdropFilter: 'blur(40px)',
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(59, 130, 246, 0.3)' },
                                    '&.Mui-focused': { bgcolor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(59, 130, 246, 0.6)', boxShadow: '0 0 50px rgba(59, 130, 246, 0.15)' }
                                }
                            }}
                        />
                    </Box>

                    <Grid container spacing={4}>
                        {filteredCourses.map((course, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + (index * 0.05) }}
                                    whileHover={{ y: -12, rotateX: 5, rotateY: 5 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setShowLauncher(false);
                                    }}
                                >
                                    <Paper sx={{
                                        p: 4,
                                        height: '100%',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '2.5rem',
                                        bgcolor: 'rgba(15, 15, 25, 0.4)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(30px)',
                                        transition: 'all 0.4s',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 30px rgba(37, 99, 235, 0.15)'
                                        }
                                    }}>
                                        <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'linear-gradient(135deg, transparent 50%, rgba(37, 99, 235, 0.05) 100%)' }} />

                                        <Stack spacing={3}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                                                    <CategoryIcon fontSize="medium" />
                                                </div>
                                                <div style={{ padding: '4px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.4, letterSpacing: '0.15em' }}>SR-N° {index + 1}</Typography>
                                                </div>
                                            </Box>
                                            <Box>
                                                <Typography variant="h5" fontWeight="900" sx={{ mb: 1, color: 'white', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                                                    {course.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ opacity: 0.4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.65rem' }}>
                                                    {course.notes.length} Active Modules Loaded
                                                </Typography>
                                            </Box>
                                            <Box sx={{ pt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <div className="h-[2px] w-6 bg-blue-500" />
                                                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                                                    Initialize Workspace
                                                </Typography>
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

    const breadcrumbs = (
        <Container maxWidth={false} sx={{ py: 3, px: { xs: 2, md: 6 }, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary', opacity: 0.3 }} />} aria-label="breadcrumb">
                <MuiLink
                    underline="hover"
                    sx={{ color: 'text.secondary', cursor: 'pointer', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6, '&:hover': { opacity: 1, color: 'primary.main' } }}
                    onClick={() => { setSelectedCourse(null); setSelectedTopic(null); setShowLauncher(true); }}
                >
                    <HomeIcon sx={{ fontSize: 14 }} /> Dashboard
                </MuiLink>
                {selectedCourse && (
                    <MuiLink
                        underline="hover"
                        sx={{ color: 'text.secondary', cursor: 'pointer', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6, '&:hover': { opacity: 1, color: 'primary.main' } }}
                        onClick={() => setSelectedTopic(null)}
                    >
                        <CategoryIcon sx={{ fontSize: 14 }} /> {selectedCourse.title}
                    </MuiLink>
                )}
                {selectedTopic && (
                    <Typography
                        sx={{ color: 'primary.main', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <ArticleIcon sx={{ fontSize: 14 }} /> {selectedTopic.title}
                    </Typography>
                )}
            </Breadcrumbs>
        </Container>
    );

    return (
        <ThemeProvider theme={editorTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', bgcolor: '#030014' }}>
                {!isMobile ? (
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
                        selectedCourse={selectedCourse}
                        selectedTopic={selectedTopic}
                        onTopicSelect={(topic) => setSelectedTopic(topic)}
                    />
                ) : null}

                {!isMobile && breadcrumbs}

                <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
                    {/* Workspace UI Header for Mobile */}
                    <AnimatePresence>
                        {isMobile && editor && (
                            <>
                                {/* Floating Top Header */}
                                <motion.div
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -100, opacity: 0 }}
                                    style={{
                                        position: 'absolute',
                                        top: 20,
                                        left: 20,
                                        right: 20,
                                        zIndex: 1000,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '14px 24px',
                                        background: 'rgba(10, 10, 18, 0.85)',
                                        backdropFilter: 'blur(30px)',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <IconButton size="small" onClick={() => setShowLauncher(true)} sx={{ color: 'primary.main', bgcolor: 'rgba(37, 99, 235, 0.1)', p: 1 }}>
                                            <HomeIcon fontSize="small" />
                                        </IconButton>
                                        <Box>
                                            <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4, display: 'block' }}>ARCHITECT_OS</Typography>
                                            <Typography variant="body2" fontWeight="900" sx={{ letterSpacing: '0.05em', color: 'white' }}>
                                                {selectedTopic ? selectedTopic.title.substring(0, 18) + '...' : 'New Mission'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'black',
                                            borderRadius: '16px',
                                            p: 1.5,
                                            boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)',
                                            '&:hover': { bgcolor: 'primary.light' }
                                        }}
                                    >
                                        <SaveIcon fontSize="small" />
                                    </IconButton>
                                </motion.div>

                                {/* Vertical Floating Toolbar - Elite Pill */}
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -100, opacity: 0 }}
                                    style={{
                                        position: 'absolute',
                                        left: 20,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 999,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12,
                                        padding: '14px',
                                        background: 'rgba(10, 10, 18, 0.9)',
                                        backdropFilter: 'blur(40px)',
                                        borderRadius: '100px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    {[
                                        { icon: <FormatBoldIcon fontSize="small" />, active: editor.isActive('bold'), action: () => editor.chain().focus().toggleBold().run() },
                                        { icon: <FormatItalicIcon fontSize="small" />, active: editor.isActive('italic'), action: () => editor.chain().focus().toggleItalic().run() },
                                        { icon: <CodeIcon fontSize="small" />, active: editor.isActive('codeBlock'), action: () => editor.chain().focus().toggleCodeBlock().run() },
                                        { icon: <ImageIcon fontSize="small" />, active: false, action: () => { const url = window.prompt('Image URL'); if (url) editor.chain().focus().setImage({ src: url }).run(); } },
                                    ].map((tool, i) => (
                                        <motion.div key={i} whileTap={{ scale: 0.9 }}>
                                            <IconButton
                                                size="small"
                                                onClick={tool.action}
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    color: tool.active ? 'primary.main' : 'rgba(255,255,255,0.4)',
                                                    bgcolor: tool.active ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                                                    border: '1px solid',
                                                    borderColor: tool.active ? 'primary.main' : 'transparent',
                                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                                                }}
                                            >
                                                {tool.icon}
                                            </IconButton>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Bottom Dock - Pro Navigation */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 100, opacity: 0 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: 30,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        zIndex: 1001,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 24,
                                        padding: '14px 40px',
                                        background: 'rgba(15, 15, 25, 0.95)',
                                        backdropFilter: 'blur(40px)',
                                        borderRadius: '100px',
                                        border: '1px solid rgba(37, 99, 235, 0.2)',
                                        boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    <IconButton onClick={() => setFileSidebarOpen(true)} sx={{ color: 'white', opacity: 0.7, '&:hover': { opacity: 1, color: 'primary.main' } }}>
                                        <MenuIcon size={24} strokeWidth={2.5} />
                                    </IconButton>
                                    <div style={{ height: 24, width: 1, background: 'rgba(255,255,255,0.1)' }} />
                                    <IconButton onClick={() => setPropsSidebarOpen(true)} sx={{ color: 'white', opacity: 0.7, '&:hover': { opacity: 1, color: 'primary.main' } }}>
                                        <Zap size={24} strokeWidth={2.5} />
                                    </IconButton>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                    <style>
                        {`
                            ::-webkit-scrollbar {
                                width: 8px;
                                height: 8px;
                            }
                            ::-webkit-scrollbar-track {
                                background: #030014;
                            }
                            ::-webkit-scrollbar-thumb {
                                background: #161b22;
                                border-radius: 10px;
                                border: 2px solid #030014;
                            }
                            ::-webkit-scrollbar-thumb:hover {
                                background: #30363d;
                            }
                            .ProseMirror p.is-editor-empty:first-of-type::before {
                                color: rgba(255,255,255,0.15);
                                content: attr(data-placeholder);
                                float: left;
                                height: 0;
                                pointer-events: none;
                                font-style: italic;
                                font-weight: 300;
                            }
                            .ProseMirror {
                                outline: none !important;
                                padding-bottom: 200px !important;
                            }
                            .tiptap table {
                                border-collapse: collapse;
                                table-layout: fixed;
                                width: 100%;
                                margin: 0;
                                overflow: hidden;
                            }
                            .tiptap table td, .tiptap table th {
                                min-width: 1em;
                                border: 1px solid rgba(255,255,255,0.1);
                                padding: 8px 12px;
                                vertical-align: top;
                                box-sizing: border-box;
                                position: relative;
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

                    <Box component="main" className="infinite-canvas" sx={{ flexGrow: 1, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        {/* Centered Editor Container - Like a "Page" */}
                        <Box sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            p: isMobile ? 0 : 6,
                            pt: isMobile ? 14 : 10,
                            pb: isMobile ? 16 : 10,
                        }}>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                style={{ width: '100%', maxWidth: '1000px' }}
                            >
                                <Paper className="floating-page" sx={{
                                    width: '100%',
                                    minHeight: '100%',
                                    borderRadius: isMobile ? 0 : '1.5rem',
                                    overflow: 'hidden',
                                }}>
                                    {/* Editor Content Inner Padding */}
                                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                                        <EditorContent editor={editor} />
                                    </Box>

                                    {/* Elite Status Bar - MS Word Style */}
                                    <Box sx={{
                                        px: 3, py: 1.5,
                                        bg: 'rgba(255,255,255,0.02)',
                                        borderTop: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Stack direction="row" spacing={3} alignItems="center">
                                            <div className="word-count-badge">
                                                {editor?.storage.characterCount.words()} Words
                                            </div>
                                            <div className="word-count-badge">
                                                {editor?.storage.characterCount.characters()} Characters
                                            </div>
                                        </Stack>
                                        <Typography variant="caption" sx={{ color: 'white/10', fontMono: true, textTransform: 'uppercase', tracking: '0.2em', fontSize: '8px' }}>
                                            Elite_Sync_v4.2
                                        </Typography>
                                    </Box>
                                </Paper>
                            </motion.div>
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
