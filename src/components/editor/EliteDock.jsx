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
                bottom: 30,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.5,
                borderRadius: '100px',
                background: 'rgba(10, 10, 20, 0.8)',
                backdropFilter: 'blur(30px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 20px rgba(14, 165, 233, 0.1)',
            }}
        >
            {dockItems.map((item) => (
                <Tooltip key={item.id} title={item.label} arrow placement="top">
                    <motion.div
                        whileHover={{ y: -8, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="haptic-feedback"
                    >
                        <IconButton
                            onClick={item.action}
                            sx={{
                                width: 54,
                                height: 54,
                                borderRadius: '50%',
                                color: item.id === activeTab ? '#0ea5e9' : 'rgba(255, 255, 255, 0.5)',
                                bgcolor: item.id === activeTab ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    color: item.color || 'white'
                                }
                            }}
                        >
                            {item.icon}
                        </IconButton>
                    </motion.div>
                </Tooltip>
            ))}

            <div style={{ width: 1, height: 30, background: 'rgba(255, 255, 255, 0.1)', margin: '0 10px' }} />

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <IconButton
                    onClick={onSave}
                    disabled={isSaving}
                    sx={{
                        width: 54,
                        height: 54,
                        borderRadius: '20px',
                        bgcolor: '#0ea5e9',
                        color: 'black',
                        boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)',
                        '&:hover': {
                            bgcolor: '#38bdf8',
                            boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)',
                        },
                        '&.Mui-disabled': {
                            bgcolor: 'rgba(14, 165, 233, 0.2)',
                            color: 'rgba(0,0,0,0.3)'
                        }
                    }}
                >
                    {isSaving ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        >
                            <Zap size={22} />
                        </motion.div>
                    ) : (
                        <Save size={22} strokeWidth={2.5} />
                    )}
                </IconButton>
            </motion.div>
        </Box>
    );
};

export default EliteDock;
