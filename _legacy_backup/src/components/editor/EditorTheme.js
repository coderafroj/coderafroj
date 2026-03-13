import { createTheme } from '@mui/material/styles';

const editorTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00f3ff', // Cyan Neon
            contrastText: '#000000',
        },
        secondary: {
            main: '#7000ff', // Purple Neon
            contrastText: '#ffffff',
        },
        background: {
            default: '#050505', // Deep Black
            paper: '#0a0a0a', // Slightly lighter black for cards
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
        divider: 'rgba(255, 255, 255, 0.1)',
    },
    typography: {
        fontFamily: '"Space Mono", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' },
        h2: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
        h3: { fontSize: '1.25rem', fontWeight: 600 },
        button: { fontWeight: 600, letterSpacing: '0.05em' },
        body1: { fontSize: '0.875rem' },
        body2: { fontSize: '0.75rem' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 0 15px rgba(0, 243, 255, 0.3)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #00f3ff 30%, #0099ff 90%)',
                    boxShadow: '0 3px 5px 2px rgba(0, 243, 255, .3)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(10, 10, 10, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(5, 5, 5, 0.9)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#050505',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '0.7rem',
                },
            },
        },
    },
});

export default editorTheme;
