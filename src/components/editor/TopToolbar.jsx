import React from 'react';
import {
    AppBar, Toolbar, IconButton, Button, ButtonGroup,
    Stack, Divider, Tooltip, Box, Typography
} from '@mui/material';
import {
    FormatBold, FormatItalic, FormatUnderlined, Code,
    FormatListBulleted, FormatListNumbered, FormatQuote,
    Image as ImageIcon, TableChart, Link as LinkIcon,
    Undo, Redo, Save, CheckCircle
} from '@mui/icons-material';

const TopToolbar = ({ editor, onSave, isSaving }) => {
    if (!editor) return null;

    const isActive = (type, opts) => editor.isActive(type, opts) ? 'primary' : 'inherit';

    return (
        <AppBar position="static" elevation={0} sx={{ zIndex: 1201 }}>
            <Toolbar variant="dense" sx={{ minHeight: '56px', gap: 2 }}>

                {/* Brand */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                    <div className="w-8 h-8 bg-cyan-500/10 rounded items-center justify-center flex border border-cyan-500/20">
                        <span className="text-cyan-400 font-black">N</span>
                    </div>
                    <div>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1, letterSpacing: '0.1em' }} color="primary">
                            NOTES
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.5, letterSpacing: '0.15em' }}>
                            ARCHITECT
                        </Typography>
                    </div>
                </Box>

                <Divider orientation="vertical" flexItem variant="middle" />

                {/* History */}
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

                <Divider orientation="vertical" flexItem variant="middle" />

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
                    <Tooltip title="Code">
                        <IconButton
                            size="small"
                            color={isActive('code')}
                            onClick={() => editor.chain().focus().toggleCode().run()}
                        >
                            <Code fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Divider orientation="vertical" flexItem variant="middle" />

                {/* Lists */}
                <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Bullet List">
                        <IconButton
                            size="small"
                            color={isActive('bulletList')}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                        >
                            <FormatListBulleted fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Ordered List">
                        <IconButton
                            size="small"
                            color={isActive('orderedList')}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        >
                            <FormatListNumbered fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Blockquote">
                        <IconButton
                            size="small"
                            color={isActive('blockquote')}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        >
                            <FormatQuote fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Divider orientation="vertical" flexItem variant="middle" />

                {/* Inserts */}
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

                <Box sx={{ flexGrow: 1 }} />

                {/* Actions */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={isSaving ? null : <Save />}
                    onClick={onSave}
                    disabled={isSaving}
                    sx={{ px: 3 }}
                >
                    {isSaving ? 'Syncing...' : 'Save Changes'}
                </Button>

            </Toolbar>
        </AppBar>
    );
};

export default TopToolbar;
