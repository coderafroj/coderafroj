import React, { useState } from 'react';
import {
    Drawer, List, ListItemButton, ListItemText, ListItemIcon,
    Collapse, Typography, Box, Divider
} from '@mui/material';
import {
    ExpandLess, ExpandMore, Folder, Description,
    Code as CodeIcon, Terminal, Language
} from '@mui/icons-material';

const FileSidebar = ({ courses, selectedCourse, onSelectCourse, selectedTopic, onSelectTopic }) => {
    const [openCategories, setOpenCategories] = useState({});

    const handleToggle = (id) => {
        setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const width = 280;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box', top: '64px', height: 'calc(100% - 64px)' },
            }}
        >
            <Box sx={{ p: 2, pb: 1 }}>
                <Typography variant="overline" color="text.secondary" fontWeight="bold" letterSpacing="0.2em">
                    EXPLORER
                </Typography>
            </Box>
            <Divider />

            <List component="nav" sx={{ pt: 1 }}>
                {courses.map((course) => (
                    <React.Fragment key={course.id}>
                        <ListItemButton onClick={() => { handleToggle(course.id); onSelectCourse(course); }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                {openCategories[course.id] ? <Folder fontSize="small" color="primary" /> : <Folder fontSize="small" sx={{ opacity: 0.5 }} />}
                            </ListItemIcon>
                            <ListItemText
                                primary={course.title}
                                primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: 600, color: selectedCourse?.id === course.id ? 'primary.main' : 'text.primary' }}
                            />
                            {openCategories[course.id] ? <ExpandLess fontSize="small" sx={{ opacity: 0.5 }} /> : <ExpandMore fontSize="small" sx={{ opacity: 0.5 }} />}
                        </ListItemButton>

                        <Collapse in={openCategories[course.id]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {course.notes.map((topic) => (
                                    <ListItemButton
                                        key={topic.id}
                                        sx={{ pl: 4, py: 0.5, borderLeft: selectedTopic?.id === topic.id ? '2px solid #00f3ff' : '2px solid transparent' }}
                                        selected={selectedTopic?.id === topic.id}
                                        onClick={() => onSelectTopic(topic)}
                                    >
                                        <ListItemIcon sx={{ minWidth: 28 }}>
                                            <Description fontSize="small" sx={{ fontSize: '1rem', opacity: 0.7 }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={topic.title}
                                            secondary={topic.slug}
                                            primaryTypographyProps={{ fontSize: '0.75rem', fontWeight: 500 }}
                                            secondaryTypographyProps={{ fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.5 }}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
};

export default FileSidebar;
