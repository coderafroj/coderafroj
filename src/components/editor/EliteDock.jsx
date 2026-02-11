import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Save,
    Home,
    Plus,
    Settings,
    Zap,
    Layout,
    ChevronUp
} from 'lucide-react';
import { Tooltip, IconButton, Box } from '@mui/material';

const EliteDock = ({
    onSave,
    onHome,
    onAddTopic,
    onToggleAI,
    onToggleProps,
    onOpenGraph,
    isSaving,
    activeTab
}) => {
    const dockItems = [
        { id: 'home', icon: <Home size={22} />, label: 'Dashboard', action: onHome },
        { id: 'graph', icon: <Layout size={22} />, label: 'Topic Graph', action: onOpenGraph },
        { id: 'add', icon: <Plus size={22} />, label: 'Add Topic', action: onAddTopic },
        { id: 'ai', icon: <Zap size={22} />, label: 'AI Assistant', action: onToggleAI, color: '#0ea5e9' },
        { id: 'props', icon: <Settings size={22} />, label: 'Properties', action: onToggleProps },
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: { xs: 12, md: 30 },
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2000,
                width: { xs: '94%', md: 'auto' },
                maxWidth: { xs: '380px', md: 'none' },
                display: 'flex',
                alignItems: 'center',
                borderRadius: '28px',
                background: 'rgba(5, 5, 15, 0.95)',
                backdropFilter: 'blur(40px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 30px 100px rgba(0, 0, 0, 0.9), 0 0 40px rgba(14, 165, 233, 0.15)',
                overflow: 'hidden',
                px: 0.5,
                py: 0.5
            }}
        >
            {/* Scrollable Items Block */}
            <Box
                className="no-scrollbar"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.2,
                    overflowX: 'auto',
                    flex: 1,
                    px: 1,
                    WebkitOverflowScrolling: 'touch',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    scrollSnapType: 'x mandatory',
                }}
            >
                {dockItems.map((item) => {
                    const isActive = item.id === activeTab;
                    return (
                        <Tooltip key={item.id} title={item.label} arrow placement="top">
                            <Box sx={{ flexShrink: 0, scrollSnapAlign: 'center' }}>
                                <motion.div
                                    whileTap={{ scale: 0.85 }}
                                    className="haptic-feedback"
                                >
                                    <IconButton
                                        onClick={item.action}
                                        sx={{
                                            width: { xs: 50, md: 54 },
                                            height: { xs: 50, md: 54 },
                                            borderRadius: '22px',
                                            color: isActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.4)',
                                            bgcolor: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                            position: 'relative',
                                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                            '&:hover': {
                                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        {React.cloneElement(item.icon, {
                                            size: 20,
                                            strokeWidth: isActive ? 3 : 2
                                        })}
                                        {isActive && (
                                            <motion.div
                                                layoutId="dock-active-glow"
                                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-sky-500 rounded-full blur-sm"
                                            />
                                        )}
                                    </IconButton>
                                </motion.div>
                            </Box>
                        </Tooltip>
                    );
                })}
            </Box>

            <Box sx={{ width: '1px', height: 24, background: 'rgba(255, 255, 255, 0.1)', mx: 0.5, flexShrink: 0 }} />

            {/* Fixed Save Block */}
            <Box sx={{ px: 0.5, flexShrink: 0 }}>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <IconButton
                        onClick={onSave}
                        disabled={isSaving}
                        sx={{
                            width: { xs: 50, md: 54 },
                            height: { xs: 50, md: 54 },
                            borderRadius: '20px',
                            bgcolor: isSaving ? 'rgba(56, 189, 248, 0.2)' : '#0ea5e9',
                            color: 'black',
                            boxShadow: '0 10px 25px rgba(14, 165, 233, 0.4)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: '#38bdf8',
                                boxShadow: '0 15px 35px rgba(14, 165, 233, 0.6)',
                            },
                        }}
                    >
                        {isSaving ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            >
                                <Zap size={20} fill="currentColor" />
                            </motion.div>
                        ) : (
                            <Save size={20} strokeWidth={2.5} />
                        )}
                    </IconButton>
                </motion.div>
            </Box>
        </Box>
    );
};

export default EliteDock;
