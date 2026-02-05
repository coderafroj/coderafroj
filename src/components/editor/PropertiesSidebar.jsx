import React from 'react';
import {
    Drawer, Typography, Box, Divider, TextField,
    Stack, Chip, Avatar
} from '@mui/material';
import { Tag, Image, Category } from '@mui/icons-material';

const PropertiesSidebar = ({ metadata, setMetadata }) => {
    const width = 300;

    const handleChange = (field) => (event) => {
        setMetadata({ ...metadata, [field]: event.target.value });
    };

    return (
        <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                width: width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box', top: '64px', height: 'calc(100% - 64px)' },
            }}
        >
            <Box sx={{ p: 2, pb: 1 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing="0.2em">
                    PROPERTIES
                </Typography>
            </Box>
            <Divider />

            <Stack spacing={3} sx={{ p: 3 }}>

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
                        position: 'relative'
                    }}
                >
                    {metadata.image ? (
                        <img src={metadata.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <Image sx={{ fontSize: 40, opacity: 0.2 }} />
                    )}
                </Box>

                <TextField
                    label="Featured Image URL"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={metadata.image || ''}
                    onChange={handleChange('image')}
                    InputProps={{ style: { fontSize: '0.8rem', fontFamily: 'monospace' } }}
                    InputLabelProps={{ style: { fontSize: '0.8rem' } }}
                />

                <Divider />

                <TextField
                    label="Title"
                    variant="filled"
                    size="small"
                    fullWidth
                    value={metadata.title || ''}
                    onChange={handleChange('title')}
                    sx={{ '& .MuiInputBase-input': { fontWeight: 'bold' } }}
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
                    InputProps={{ style: { fontSize: '0.8rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.8rem' } }}
                    placeholder="Brief summary..."
                />

                <Divider />

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Tag sx={{ fontSize: 14, opacity: 0.7 }} />
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>TAGS</Typography>
                    </Box>
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="python, basics, logic"
                        value={metadata.tags || ''}
                        onChange={handleChange('tags')}
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: '0.85rem', fontFamily: 'monospace', color: '#00f3ff' }
                        }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {metadata.tags && metadata.tags.split(',').map((tag, i) => (
                            tag.trim() && <Chip key={i} label={tag.trim()} size="small" variant="outlined" sx={{ borderRadius: 1, fontSize: '0.7rem' }} />
                        ))}
                    </Box>
                </Box>

                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Category sx={{ fontSize: 14, opacity: 0.7 }} />
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>CATEGORY</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {metadata.category || 'Uncategorized'}
                    </Typography>
                </Box>

            </Stack>
        </Drawer>
    );
};

export default PropertiesSidebar;
