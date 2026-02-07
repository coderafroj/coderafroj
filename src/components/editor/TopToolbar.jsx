import React from 'react';
import {
    AppBar, Toolbar, IconButton, Button, ButtonGroup,
    Stack, Divider, Tooltip, Box, Typography
} from '@mui/material';
import {
    FormatBold, FormatItalic, FormatUnderlined, Code,
    FormatListBulleted, FormatListNumbered, FormatQuote,
    Image as ImageIcon, TableChart, Link as LinkIcon,
    Undo, Redo, Save, CheckCircle, Menu, MoreVert, ExitToApp,
    FormatAlignLeft, FormatAlignCenter, FormatAlignRight,
    Palette, FontDownload, Visibility, DeleteForever,
    Category as CategoryIcon, Title as TitleIcon
} from '@mui/icons-material';
import { Zap } from 'lucide-react';

const TopToolbar = ({
    editor, onSave, onDelete, isSaving,
    onToggleFiles, onToggleProps, isMobile,
    courseId, topicSlug,
    selectedCourse, selectedTopic, onTopicSelect
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    if (!editor) return null;

    const isActive = (type, opts) => editor.isActive(type, opts) ? 'primary' : 'inherit';
    const open = Boolean(anchorEl);

    return (
        <Box sx={{
            position: 'fixed',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1300,
            width: 'auto',
            pointerEvents: 'none'
        }}>
            <Box className="elite-ribbon" sx={{
                height: isMobile ? '72px' : '84px',
                px: 2,
                gap: isMobile ? 1 : 1.5,
                pointerEvents: 'auto',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 30px rgba(99, 102, 241, 0.1)'
            }}>
                {/* Segment: System Navigation */}
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton size="small" onClick={onToggleFiles} sx={{ color: 'white', opacity: 0.6, '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.05)' } }}>
                        <Menu fontSize="medium" />
                    </IconButton>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Segment: History (MS Word Style) */}
                <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Undo">
                        <IconButton size="small" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} sx={{ color: 'white', opacity: 0.4 }}>
                            <Undo fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Redo">
                        <IconButton size="small" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} sx={{ color: 'white', opacity: 0.4 }}>
                            <Redo fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Segment: Text Formatting (Elite Word v2) */}
                <Stack direction="row" spacing={1} alignItems="center">
                    {!isMobile && <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, fontSize: '8px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', opacity: 0.5 }}>TEXT</Typography>}
                    <Stack direction="row" spacing={0.5}>
                        {[
                            { icon: <FormatBold />, active: 'bold', action: () => editor.chain().focus().toggleBold().run() },
                            { icon: <FormatItalic />, active: 'italic', action: () => editor.chain().focus().toggleItalic().run() },
                            { icon: <FormatUnderlined />, active: 'underline', action: () => editor.chain().focus().toggleUnderline().run() },
                            { icon: <Code />, active: 'code', action: () => editor.chain().focus().toggleCode().run() },
                        ].map((tool, i) => (
                            <IconButton
                                key={i}
                                size="small"
                                onClick={tool.action}
                                sx={{
                                    width: 36, height: 36,
                                    color: editor.isActive(tool.active) ? 'primary.main' : 'rgba(255,255,255,0.4)',
                                    bgcolor: editor.isActive(tool.active) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                    borderRadius: '10px',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                                }}
                            >
                                {React.cloneElement(tool.icon, { fontSize: 'small' })}
                            </IconButton>
                        ))}
                    </Stack>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ my: 2, opacity: 0.3 }} />
                    <Stack direction="row" spacing={0.5}>
                        {[
                            { icon: <TitleIcon />, active: { level: 1 }, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
                            { icon: <TitleIcon sx={{ fontSize: '1rem' }} />, active: { level: 2 }, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
                        ].map((tool, i) => (
                            <IconButton
                                key={i}
                                size="small"
                                onClick={tool.action}
                                sx={{
                                    width: 36, height: 36,
                                    color: editor.isActive('heading', tool.active) ? 'primary.main' : 'rgba(255,255,255,0.4)',
                                    bgcolor: editor.isActive('heading', tool.active) ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                    borderRadius: '10px',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                                }}
                            >
                                {tool.icon}
                            </IconButton>
                        ))}
                    </Stack>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Segment: Paragraph & Layout */}
                {!isMobile && (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, fontSize: '8px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', opacity: 0.5 }}>PARA</Typography>
                        <Stack direction="row" spacing={0.5}>
                            <IconButton onClick={() => editor.chain().focus().setTextAlign('left').run()} sx={{ color: editor.isActive({ textAlign: 'left' }) ? 'primary.main' : 'rgba(255,255,255,0.3)' }}><FormatAlignLeft fontSize="small" /></IconButton>
                            <IconButton onClick={() => editor.chain().focus().setTextAlign('center').run()} sx={{ color: editor.isActive({ textAlign: 'center' }) ? 'primary.main' : 'rgba(255,255,255,0.3)' }}><FormatAlignCenter fontSize="small" /></IconButton>
                            <IconButton onClick={() => editor.chain().focus().setTextAlign('right').run()} sx={{ color: editor.isActive({ textAlign: 'right' }) ? 'primary.main' : 'rgba(255,255,255,0.3)' }}><FormatAlignRight fontSize="small" /></IconButton>
                        </Stack>
                    </Stack>
                )}

                <Divider orientation="vertical" variant="middle" flexItem sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Segment: Insert & Media */}
                <Stack direction="row" spacing={1} alignItems="center">
                    {!isMobile && <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, fontSize: '8px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', opacity: 0.5 }}>ADD</Typography>}
                    <Stack direction="row" spacing={0.5}>
                        <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()} sx={{ color: editor.isActive('bulletList') ? 'primary.main' : 'rgba(255,255,255,0.3)' }}><FormatListBulleted fontSize="small" /></IconButton>
                        {!isMobile && <IconButton onClick={() => { const url = window.prompt('Image URL'); if (url) editor.chain().focus().setImage({ src: url }).run(); }} sx={{ color: 'rgba(255,255,255,0.3)' }}><ImageIcon fontSize="small" /></IconButton>}
                        {!isMobile && <IconButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} sx={{ color: 'rgba(255,255,255,0.3)' }}><TableChart fontSize="small" /></IconButton>}
                    </Stack>
                </Stack>

                <Divider orientation="vertical" variant="middle" flexItem sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                {/* Segment: Sync Actions (Primary) */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ pl: 2 }}>
                    <Button
                        variant="contained"
                        onClick={onSave}
                        disabled={isSaving}
                        startIcon={isSaving ? null : <CheckCircle sx={{ fontSize: '14px' }} />}
                        className="magnetic-surface"
                        sx={{
                            height: 48,
                            px: 3,
                            borderRadius: '16px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            fontSize: '0.65rem',
                            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            '&:hover': {
                                boxShadow: '0 15px 40px rgba(99, 102, 241, 0.6)',
                                scale: 1.05
                            }
                        }}
                    >
                        {isSaving ? 'Establishing Link...' : 'Synchronize'}
                    </Button>

                    <IconButton onClick={onToggleProps} sx={{ color: 'white', opacity: 0.5, '&:hover': { opacity: 1, scale: 1.1 } }}>
                        <Zap size={20} />
                    </IconButton>

                    {!isMobile && (
                        <IconButton color="error" onClick={onDelete} sx={{ opacity: 0.3, '&:hover': { opacity: 0.8, scale: 1.1 } }}>
                            <DeleteForever fontSize="small" />
                        </IconButton>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default TopToolbar;
