import React, { useState } from 'react';
import {
    Drawer, List, ListItemButton, ListItemText, ListItemIcon,
    Collapse, Typography, Box, Divider, Stack, Tooltip, IconButton,
    TextField, InputAdornment
} from '@mui/material';
import {
    ExpandLess, ExpandMore, Folder, Description,
    Code as CodeIcon, Terminal, Language, Add, CreateNewFolder,
    Delete as DeleteIcon, Search as SearchIcon
} from '@mui/icons-material';

const FileSidebar = ({
    courses, selectedCourse, onSelectCourse,
    selectedTopic, onSelectTopic, onNewCourse,
    onNewTopic, onDeleteTopic, open, onClose, isMobile,
    searchQuery, onSearchChange
}) => {
    const [openCategories, setOpenCategories] = useState({});

    const handleToggle = (id) => {
        setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const width = 280;

    return (
        <Drawer
            variant={isMobile ? "temporary" : (open ? "permanent" : "persistent")}
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
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    bgcolor: 'background.paper'
                },
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing="0.2em">
                    EXPLORER
                </Typography>
                <Stack direction="row" spacing={0.5}>
                    <Tooltip title="New Course">
                        <IconButton size="small" onClick={onNewCourse} color="primary">
                            <CreateNewFolder fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                    {isMobile && (
                        <IconButton size="small" onClick={onClose}>
                            <ExpandLess sx={{ transform: 'rotate(-90deg)' }} />
                        </IconButton>
                    )}
                </Stack>
            </Box>
            <Divider />

            {/* Search Bar */}
            <Box sx={{ p: 2, pb: 1 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="inherit" sx={{ opacity: 0.5 }} />
                            </InputAdornment>
                        ),
                        sx: {
                            fontSize: '0.75rem',
                            bgcolor: 'rgba(0,0,0,0.2)',
                            '& fieldset': { border: 'none' },
                            '&:hover fieldset': { border: 'none' },
                            '&.Mui-focused fieldset': { border: 'none' },
                            borderRadius: '8px'
                        }
                    }}
                />
            </Box>

            <List component="nav" sx={{ pt: 1, overflowY: 'auto', flexGrow: 1 }}>
                {courses.map((course) => (
                    <React.Fragment key={course.id}>
                        <ListItemButton
                            onClick={() => { handleToggle(course.id); onSelectCourse(course); }}
                            sx={{
                                minHeight: 48,
                                borderLeft: selectedCourse?.id === course.id ? '3px solid #00f3ff' : '3px solid transparent'
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                {openCategories[course.id] ? <Folder fontSize="small" color="primary" /> : <Folder fontSize="small" sx={{ opacity: 0.5 }} />}
                            </ListItemIcon>
                            <ListItemText
                                primary={course.title}
                                primaryTypographyProps={{ fontSize: '0.75rem', fontWeight: 600, color: selectedCourse?.id === course.id ? 'primary.main' : 'text.primary' }}
                            />
                            {openCategories[course.id] && (
                                <IconButton
                                    size="small"
                                    onClick={(e) => { e.stopPropagation(); onNewTopic(course); }}
                                    sx={{ mr: 1, p: 0.5 }}
                                >
                                    <Add fontSize="inherit" />
                                </IconButton>
                            )}
                            {openCategories[course.id] ? <ExpandLess fontSize="small" sx={{ opacity: 0.5 }} /> : <ExpandMore fontSize="small" sx={{ opacity: 0.5 }} />}
                        </ListItemButton>

                        <Collapse in={openCategories[course.id]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {course.notes.map((topic) => (
                                    <ListItemButton
                                        key={topic.id}
                                        sx={{ pl: 5, py: 0.2, borderLeft: selectedTopic?.id === topic.id ? '2px solid #00f3ff' : '2px solid transparent' }}
                                        selected={selectedTopic?.id === topic.id}
                                        onClick={() => {
                                            onSelectTopic(topic);
                                            if (isMobile) onClose();
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                            <Description fontSize="small" sx={{ fontSize: '1rem', opacity: 0.7 }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={topic.title}
                                            primaryTypographyProps={{ fontSize: '0.7rem', fontWeight: 500 }}
                                        />
                                        <IconButton
                                            size="small"
                                            className="delete-btn"
                                            sx={{
                                                opacity: 0,
                                                transition: 'opacity 0.2s',
                                                p: 0.5
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteTopic(course, topic);
                                            }}
                                        >
                                            <DeleteIcon fontSize="inherit" color="error" />
                                        </IconButton>
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
            <style>
                {`
                    .MuiListItemButton-root:hover .delete-btn {
                        opacity: 0.7 !important;
                    }
                    .MuiListItemButton-root:hover .delete-btn:hover {
                        opacity: 1 !important;
                    }
                `}
            </style>
        </Drawer>
    );
};

export default FileSidebar;
