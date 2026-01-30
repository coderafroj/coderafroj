import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo/coderafroj.png';

const useScrambleText = (text, delay = 0) => {
    const [scrambled, setScrambled] = useState('');
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    useEffect(() => {
        let iteration = 0;
        let interval;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                setScrambled(prev =>
                    text.split("")
                        .map((char, index) => {
                            if (index < iteration) return text[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        }, delay);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [text, delay]);

    return scrambled;
};

const IntroScene = ({ onComplete }) => {
    const [status, setStatus] = useState('INITIALIZING...');
    const scrambledTitle = useScrambleText("CODERAFROJ", 500);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const statusMsgs = [
            'BYPASSING_FIREWALL...',
            'INJECTING_CORE_MODULES...',
            'ESTABLISHING_SECURE_LINK...',
            'ACCESS_GRANTED',
            'LOADING_SYSTEM_UI...'
        ];

        let msgIdx = 0;
        const msgInterval = setInterval(() => {
            if (msgIdx < statusMsgs.length) {
                setStatus(statusMsgs[msgIdx]);
                msgIdx++;
            }
        }, 600);

        const progInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progInterval);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        return () => {
            clearInterval(msgInterval);
            clearInterval(progInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: "circOut" }}
            className="fixed inset-0 z-[9999] bg-[#02040a] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Hacker Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="coderafroj-grid h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
            </div>

            {/* Glowing Scanline */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="w-full h-[2px] bg-primary blur-sm animate-scanline shadow-[0_0_15px_rgba(47,129,247,0.5)]" />
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-12">
                {/* Rotating Logo */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    <motion.img
                        src={logo}
                        alt="Logo"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(47,129,247,0.4)]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                {/* Scrambled Text */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase hacker-glow">
                        {scrambledTitle}
                    </h1>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-primary">
                            <span className="animate-pulse">▶</span> {status}
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm relative">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(47,129,247,0.8)]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                            />
                        </div>
                        <span className="font-mono text-[8px] text-white/40 tracking-widest lowercase">
                            Progress: {Math.round(progress)}%_STABLE
                        </span>
                    </div>
                </div>
            </div>

            {/* Corner Decorative HUD Elements */}
            <div className="absolute top-10 left-10 hidden md:block">
                <div className="flex flex-col gap-1 font-mono text-[8px] text-primary/40 uppercase tracking-widest">
                    <span>System_Core: 0x8A7B2</span>
                    <span>Link_Status: Active</span>
                </div>
            </div>
            <div className="absolute bottom-10 right-10 hidden md:block">
                <div className="flex flex-col items-end gap-1 font-mono text-[8px] text-primary/40 uppercase tracking-widest">
                    <span>Ver: 0.b.2.x</span>
                    <span>User: Coderafroj_Admin</span>
                </div>
            </div>
        </motion.div>
    );
};

export default IntroScene;
