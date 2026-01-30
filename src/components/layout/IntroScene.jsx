import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScene = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState('loading'); // loading, reveal, exit

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStage('reveal'), 500);
                    return 100;
                }
                const next = prev + Math.random() * 20;
                return next > 100 ? 100 : next;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (stage === 'reveal') {
            const timer = setTimeout(() => {
                setStage('exit');
                setTimeout(onComplete, 1500);
            }, 3000);
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
            {/* Soft Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />

            {/* Matrix/Grid Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="coderafroj-grid h-full w-full" />
            </div>

            <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {stage === 'loading' && (
                        <motion.div
                            key="loading-stage"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full flex flex-col items-center space-y-8"
                        >
                            {/* VIP Monogram Placeholder/Logo */}
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-2 border-primary/20 rounded-full"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-2 border border-white/10 rounded-full border-dashed"
                                />
                                <span className="text-white font-black text-2xl italic tracking-tighter">CR</span>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
                                        Initializing_VIP_Experience
                                    </span>
                                    <span className="text-[14px] font-mono text-primary font-black">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-primary to-primary shadow-[0_0_15px_rgba(47,129,247,0.8)]"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {stage === 'reveal' && (
                        <motion.div
                            key="reveal-stage"
                            className="flex flex-col items-center"
                        >
                            {/* Main Name Reveal */}
                            <div className="overflow-hidden flex flex-wrap justify-center gap-1 md:gap-3 px-4">
                                {titleChars.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: 150, rotateX: -90, opacity: 0 }}
                                        animate={{ y: 0, rotateX: 0, opacity: 1 }}
                                        transition={{
                                            duration: 1.2,
                                            delay: i * 0.08,
                                            ease: [0.2, 0.65, 0.3, 0.9]
                                        }}
                                        className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white italic tracking-tighter uppercase inline-block drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] text-gradient"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Tagline Reveal */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 1 }}
                                className="mt-8 flex items-center gap-4 text-white font-mono"
                            >
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: 32 }}
                                    transition={{ delay: 1.5, duration: 0.8 }}
                                    className="h-px bg-primary/60 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                                />
                                <span className="text-[7px] md:text-[10px] uppercase tracking-[0.6em] text-primary-glow font-bold">
                                    Digital_Mastery_Redefined
                                </span>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: 32 }}
                                    transition={{ delay: 1.5, duration: 0.8 }}
                                    className="h-px bg-primary/60 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                                />
                            </motion.div>

                            {/* Lighting Streak Animation */}
                            <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                                transition={{ delay: 1, duration: 2, times: [0, 0.5, 1] }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent blur-sm z-50 pointer-events-none"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Side HUD Elements (VIP Modern Style) */}
            <div className="absolute top-0 left-0 w-full p-12 flex justify-between items-start pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 0.3, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-1 font-mono text-[8px] text-white tracking-[0.3em] uppercase"
                >
                    <span>System_Access: Granted</span>
                    <span>Protocol: Elite_V2</span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 0.3, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-end gap-1 font-mono text-[8px] text-white tracking-[0.3em] uppercase"
                >
                    <span>Location: Global</span>
                    <span>Status: High_Priority</span>
                </motion.div>
            </div>

            <div className="absolute bottom-12 left-12 pointer-events-none">
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="h-24 w-[1px] bg-gradient-to-b from-primary/50 to-transparent origin-top"
                />
            </div>

            <div className="absolute top-12 right-12 pointer-events-none">
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="h-24 w-[1px] bg-gradient-to-t from-primary/50 to-transparent origin-bottom"
                />
            </div>
        </motion.div>
    );
};

export default IntroScene;
