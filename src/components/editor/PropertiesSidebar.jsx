import React from 'react';
import {
    Drawer, Typography, Box, Divider, TextField,
    Stack, Chip, Avatar
} from '@mui/material';
import { Tag, Image, Category, Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const PropertiesSidebar = ({ metadata, setMetadata, open, onClose, isMobile }) => {
    const width = 300;

    const handleChange = (field) => (event) => {
        setMetadata({ ...metadata, [field]: event.target.value });
    };

    return (
        <Drawer
            variant={isMobile ? "temporary" : (open ? "permanent" : "persistent")}
            anchor={isMobile ? "bottom" : "right"}
            open={open}
            onClose={onClose}
            sx={{
                width: isMobile ? '100%' : (open ? width : 0),
                flexShrink: 0,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                [`& .MuiDrawer-paper`]: {
                    width: isMobile ? '100%' : width,
                    height: isMobile ? '85%' : '100%',
                    boxSizing: 'border-box',
                    borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    borderTop: isMobile ? '1px solid rgba(14, 165, 233, 0.2)' : 'none',
                    bgcolor: 'rgba(10, 10, 20, 0.85)',
                    backdropFilter: 'blur(40px) saturate(150%)',
                    borderRadius: isMobile ? '40px 40px 0 0' : 0,
                    boxShadow: '0 -20px 80px rgba(0,0,0,0.9)',
                    overflow: 'hidden',
                    color: 'white'
                },
            }}
        >
            {isMobile && (
                <Box sx={{ width: 60, height: 4, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, mx: 'auto', mt: 2, mb: 1 }} />
            )}
            <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: '0.4em' }}>
                        MISSION CONFIG
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900, italic: true, textTransform: 'uppercase', mt: 0.5 }}>
                        Properties
                    </Typography>
                </div>
                <IconButton onClick={onClose} sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Close fontSize="small" />
                </IconButton>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

            <Stack spacing={4} sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>

                {/* Featured Image Preview */}
                <Box
                    sx={{
                        width: '100%',
                        height: 180,
                        borderRadius: '24px',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)'
                    }}
                >
                    {metadata.image ? (
                        <img src={metadata.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <Stack alignItems="center" spacing={1}>
                            <Image sx={{ fontSize: 40, opacity: 0.1 }} />
                            <Typography variant="caption" sx={{ opacity: 0.2, fontWeight: 900 }}>EMPTY_BUFFER</Typography>
                        </Stack>
                    )}
                </Box>

                <TextField
                    label="Cover Signal (URL)"
                    variant="outlined"
                    fullWidth
                    value={metadata.image || ''}
                    onChange={handleChange('image')}
                    InputProps={{ style: { fontSize: '0.75rem', fontFamily: 'JetBrains Mono' } }}
                    sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: 'rgba(0,0,0,0.2)' }
                    }}
                />

                <TextField
                    label="Protocol Title"
                    variant="filled"
                    fullWidth
                    value={metadata.title || ''}
                    onChange={handleChange('title')}
                    sx={{
                        '& .MuiInputBase-input': { fontWeight: 900, textTransform: 'uppercase', fontSize: '1rem', py: 2 },
                        '& .MuiFilledInput-root': { borderRadius: '16px', bgcolor: 'rgba(14, 165, 233, 0.05)' }
                    }}
                />

                <TextField
                    label="Briefing / Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={metadata.description || ''}
                    onChange={handleChange('description')}
                    InputProps={{ style: { fontSize: '0.8rem', lineHeight: 1.8 } }}
                    sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: 'rgba(0,0,0,0.2)' }
                    }}
                />

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Tag sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.2em' }}>ENTITY_TAGS</Typography>
                    </Box>
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="python, advanced, masterclass"
                        value={metadata.tags || ''}
                        onChange={handleChange('tags')}
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: '0.85rem', fontFamily: 'JetBrains Mono', color: '#0ea5e9' }
                        }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                        {metadata.tags && metadata.tags.split(',').map((tag, i) => (
                            tag.trim() && <Chip key={i} label={tag.trim()} size="small" sx={{ borderRadius: '8px', fontSize: '10px', fontWeight: 900, bgcolor: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', border: '1px solid rgba(14, 165, 233, 0.2)' }} />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ pb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Category sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: '0.2em' }}>WORKSPACE_ID</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', p: 2, bgcolor: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', color: 'slate.400' }}>
                        {metadata.category || 'PENDING_INITIALIZATION'}
                    </Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,0,0,0.1)', my: 2 }} />

                <button
                    onClick={() => {
                        if (window.confirm('TERMINATION_SEQUENCE: Are you sure you want to delete this protocol?')) {
                            // This would call onDelete from props
                        }
                    }}
                    className="w-full py-4 bg-red-500/5 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all haptic-feedback"
                >
                    Terminate Protocol
                </button>

            </Stack>
        </Drawer>
    );
};

export default PropertiesSidebar;
