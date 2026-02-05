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
    Palette, FontDownload, Visibility, DeleteForever
} from '@mui/icons-material';

const TopToolbar = ({
    editor, onSave, onDelete, isSaving,
    onToggleFiles, onToggleProps, isMobile,
    courseId, topicSlug
}) => {
    if (!editor) return null;

    const isActive = (type, opts) => editor.isActive(type, opts) ? 'primary' : 'inherit';

    return (
        <AppBar position="static" elevation={0} sx={{ zIndex: 1201, borderBottom: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.paper' }}>
            <Toolbar variant="dense" sx={{ minHeight: '56px', px: 1, gap: isMobile ? 0.5 : 2 }}>

                <IconButton edge="start" color="inherit" onClick={onToggleFiles} sx={{ display: { md: 'flex' } }}>
                    <Menu fontSize="small" />
                </IconButton>

                {/* Brand - Hide on small mobile */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, mr: isMobile ? 0 : 2 }}>
                    <div className="w-8 h-8 bg-cyan-500/10 rounded items-center justify-center flex border border-cyan-500/20">
                        <span className="text-cyan-400 font-black">N</span>
                    </div>
                    {!isMobile && (
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1, letterSpacing: '0.1em' }} color="primary">
                                NOTES
                            </Typography>
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.5, letterSpacing: '0.15em' }}>
                                ARCHITECT
                            </Typography>
                        </div>
                    )}
                </Box>

                {!isMobile && <Divider orientation="vertical" flexItem variant="middle" />}

                {/* History - Hide on mobile toolkit */}
                {!isMobile && (
                    <ButtonGroup variant="text" size="small">
                        <Tooltip title="Undo (Ctrl+Z)">
                            <IconButton size="small" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                                <Undo fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Redo (Ctrl+Y)">
                            <IconButton size="small" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                                <Redo fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </ButtonGroup>
                )}

                {!isMobile && <Divider orientation="vertical" flexItem variant="middle" />}

                {/* Text Formatting */}
                <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Bold">
                        <IconButton
                            size="small"
                            color={isActive('bold')}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                        >
                            <FormatBold fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Italic">
                        <IconButton
                            size="small"
                            color={isActive('italic')}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                        >
                            <FormatItalic fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="CodeBlock">
                        <IconButton
                            size="small"
                            color={isActive('codeBlock')}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        >
                            <Code fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>

                {!isMobile && <Divider orientation="vertical" flexItem variant="middle" />}

                {/* Advanced Formatting */}
                {!isMobile && (
                    <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Text Color">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    const color = window.prompt('Enter color (hex or name)');
                                    if (color) editor.chain().focus().setColor(color).run();
                                }}
                            >
                                <Palette fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <ButtonGroup size="small">
                            <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('left').run()} color={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'inherit'}>
                                <FormatAlignLeft fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('center').run()} color={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'inherit'}>
                                <FormatAlignCenter fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => editor.chain().focus().setTextAlign('right').run()} color={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'inherit'}>
                                <FormatAlignRight fontSize="small" />
                            </IconButton>
                        </ButtonGroup>
                    </Stack>
                )}

                {!isMobile && <Divider orientation="vertical" flexItem variant="middle" />}

                {/* Actions & Settings Toggles */}
                {!isMobile && (
                    <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Insert Table">
                            <IconButton
                                size="small"
                                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                            >
                                <TableChart fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Insert Image">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    const url = window.prompt('Enter image URL');
                                    if (url) editor.chain().focus().setImage({ src: url }).run();
                                }}
                            >
                                <ImageIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}

                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                        variant="contained"
                        color="primary"
                        size={isMobile ? "small" : "medium"}
                        startIcon={isSaving || isMobile ? null : <Save />}
                        onClick={onSave}
                        disabled={isSaving}
                        sx={{
                            px: isMobile ? 1.5 : 3,
                            fontWeight: 800,
                            borderRadius: '8px',
                            minWidth: isMobile ? 'auto' : '120px'
                        }}
                    >
                        {isSaving ? (isMobile ? '...' : 'Syncing...') : (isMobile ? <Save fontSize="small" /> : 'Save Changes')}
                    </Button>

                    <IconButton color="inherit" onClick={onToggleProps}>
                        <MoreVert fontSize="small" />
                    </IconButton>

                    {!isMobile && (
                        <Divider orientation="vertical" flexItem variant="middle" />
                    )}

                    {!isMobile && courseId && topicSlug && (
                        <Tooltip title="View Live">
                            <IconButton color="inherit" onClick={() => window.open(`/learn/${courseId}/${topicSlug}`, '_blank')}>
                                <Visibility fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    {!isMobile && (
                        <Tooltip title="Delete Topic">
                            <IconButton color="error" onClick={onDelete}>
                                <DeleteForever fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    {!isMobile && (
                        <Tooltip title="Exit to Website">
                            <IconButton color="inherit" onClick={() => window.location.href = '/'}>
                                <ExitToApp fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>

            </Toolbar>
        </AppBar>
    );
};

export default TopToolbar;
