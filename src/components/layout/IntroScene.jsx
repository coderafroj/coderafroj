import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo/coderafroj.png';

const MatrixBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const columns = Math.floor(width / 20);
        const drops = new Array(columns).fill(1);
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*".split("");

        const draw = () => {
            ctx.fillStyle = 'rgba(2, 4, 10, 0.1)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#6366f1';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                if (drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="matrix-canvas" />;
};

const IntroScene = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [terminalLine, setTerminalLine] = useState(0);
    const [stage, setStage] = useState('loading'); // loading, reveal, exit

    const terminalMessages = [
        "> Starting things up...",
        "> Loading my projects...",
        "> Setting up the design...",
        "> Making it look good...",
        "> Welcome to my world"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 8;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStage('reveal'), 800);
                    return 100;
                }
                return next;
            });
        }, 150);

        const terminalInterval = setInterval(() => {
            setTerminalLine(prev => (prev < terminalMessages.length - 1 ? prev + 1 : prev));
        }, 800);

        return () => {
            clearInterval(interval);
            clearInterval(terminalInterval);
        };
    }, []);

    useEffect(() => {
        if (stage === 'reveal') {
            const timer = setTimeout(() => {
                setStage('exit');
                setTimeout(onComplete, 1500);
            }, 4500);
            return () => clearTimeout(timer);
        }
    }, [stage, onComplete]);

    const titleChars = "CODERAFROJ".split("");

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#02040a] flex flex-col items-center justify-center overflow-hidden font-outfit"
        >
            <MatrixBackground />

            {/* Ambient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-[#02040a] opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />

            <div className="relative z-10 w-full flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {stage === 'loading' && (
                        <motion.div
                            key="loading-stage"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-md px-8 flex flex-col items-center space-y-12"
                        >
                            {/* Terminal Output */}
                            <div className="w-full font-mono text-[10px] md:text-xs text-primary/80 space-y-2 h-20">
                                {terminalMessages.slice(0, terminalLine + 1).map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-primary-glow">√</span>
                                        {msg}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Progress Status */}
                            <div className="w-full space-y-4">
                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                    <div className="flex flex-col">
                                        <span className="text-[7px] md:text-[10px] uppercase tracking-[0.6em] text-primary-glow font-bold">
                                            Building Better Websites
                                        </span>
                                        <span className="text-[10px] font-mono text-white/60">Portfolio v4.0</span>
                                    </div>
                                    <span className="text-3xl font-black italic text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="w-full h-1 bg-white/5 overflow-hidden relative">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_20px_rgba(99,102,241,1)]"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {stage === 'reveal' && (
                        <motion.div
                            key="reveal-stage"
                            className="flex flex-col items-center w-full relative"
                        >
                            {/* 3D-styled Logo Reveal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotateY: [0, 20, -20, 0],
                                    y: [0, -15, 0]
                                }}
                                transition={{
                                    opacity: { duration: 1 },
                                    scale: { duration: 1 },
                                    rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="mb-16 relative"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-28 h-28 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(47,129,247,0.7)]"
                                />
                            </motion.div>

                            {/* Main Name Reveal - Glitched & Single Line */}
                            <div className="flex flex-nowrap justify-center gap-0.5 md:gap-4 px-4 w-full overflow-visible relative">
                                {titleChars.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 2, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                        transition={{
                                            duration: 0.5,
                                            delay: i * 0.05 + 0.5,
                                        }}
                                        className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white italic tracking-tighter uppercase inline-block drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] glitch-text whitespace-nowrap select-none"
                                        data-text={char}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Identity Reveal */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8 }}
                                className="mt-12 flex flex-col items-center gap-4"
                            >
                                <div className="flex items-center gap-6 text-[8px] md:text-[10px] font-mono text-primary font-black tracking-[0.6em] uppercase">
                                    <span className="opacity-40 animate-pulse">Web_Architect</span>
                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                    <span className="animate-pulse">Creative_Designer</span>
                                    <span className="w-1 h-1 rounded-full bg-primary" />
                                    <span className="opacity-40 animate-pulse">CS_Educator</span>
                                </div>
                                <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                            </motion.div>

                            {/* Scanline Effect */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,4px_100%] z-50 opacity-20" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Global HUD Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -right-1/2 w-full h-full border border-primary/10 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/2 -left-1/2 w-full h-full border border-primary/5 rounded-full"
                />
            </div>
        </motion.div>
    );
};

export default IntroScene;
