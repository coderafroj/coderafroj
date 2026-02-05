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
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                width: open ? width : 0,
                flexShrink: 0,
                transition: 'width 0.3s ease',
                [`& .MuiDrawer-paper`]: {
                    width: width,
                    boxSizing: 'border-box',
                    height: '100%',
                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                    bgcolor: 'background.paper'
                },
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing="0.2em">
                    PROPERTIES
                </Typography>
                <IconButton size="small" onClick={onClose}>
                    <Close fontSize="small" />
                </IconButton>
            </Box>
            <Divider />

            <Stack spacing={3} sx={{ p: 3, overflowY: 'auto', flexGrow: 1 }}>

                {/* Featured Image Preview */}
                <Box
                    sx={{
                        width: '100%',
                        height: 140,
                        borderRadius: 2,
                        bgcolor: 'background.default',
                        border: '1px dashed rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
                    }}
                >
                    {metadata.image ? (
                        <img src={metadata.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <Image sx={{ fontSize: 40, opacity: 0.1 }} />
                    )}
                </Box>

                <TextField
                    label="Featured Image URL"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={metadata.image || ''}
                    onChange={handleChange('image')}
                    InputProps={{ style: { fontSize: '0.75rem', fontFamily: 'monospace' } }}
                    sx={{ bgcolor: 'black' }}
                />

                <Divider />

                <TextField
                    label="Topic Title"
                    variant="filled"
                    size="small"
                    fullWidth
                    value={metadata.title || ''}
                    onChange={handleChange('title')}
                    sx={{ '& .MuiInputBase-input': { fontWeight: 900, textTransform: 'uppercase', fontSize: '0.9rem' } }}
                />

                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    size="small"
                    fullWidth
                    value={metadata.description || ''}
                    onChange={handleChange('description')}
                    InputProps={{ style: { fontSize: '0.75rem', lineHeight: 1.6 } }}
                    placeholder="Brief summary for indexing..."
                    sx={{ bgcolor: 'black' }}
                />

                <Divider />

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Tag sx={{ fontSize: 14, opacity: 0.7, color: 'primary.main' }} />
                        <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 800 }}>TAGS</Typography>
                    </Box>
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="python, basics, logic"
                        value={metadata.tags || ''}
                        onChange={handleChange('tags')}
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: '0.8rem', fontFamily: 'monospace', color: '#00f3ff' }
                        }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
                        {metadata.tags && metadata.tags.split(',').map((tag, i) => (
                            tag.trim() && <Chip key={i} label={tag.trim()} size="small" variant="filled" sx={{ borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, bgcolor: 'rgba(255,255,255,0.05)' }} />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ pb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Category sx={{ fontSize: 14, opacity: 0.7, color: 'primary.main' }} />
                        <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 800 }}>COURSE_NODE</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', p: 1, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 1, border: '1px solid rgba(255,255,255,0.03)' }}>
                        {metadata.category || 'Unassigned'}
                    </Typography>
                </Box>

            </Stack>
        </Drawer>
    );
};

export default PropertiesSidebar;
