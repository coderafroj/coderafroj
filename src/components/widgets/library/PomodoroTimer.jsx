import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PomodoroTimer() {
    const [mode, setMode] = useState('WORK'); // WORK or BREAK
    const [seconds, setSeconds] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(s => s - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const toggleMode = () => {
        const nextMode = mode === 'WORK' ? 'BREAK' : 'WORK';
        setMode(nextMode);
        setSeconds(nextMode === 'WORK' ? 25 * 60 : 5 * 60);
        setIsActive(false);
    };

    const reset = () => {
        setSeconds(mode === 'WORK' ? 25 * 60 : 5 * 60);
        setIsActive(false);
    };

    return (
        <div className="space-y-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
                <button
                    onClick={toggleMode}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${mode === 'WORK' ? 'bg-primary/10 border-primary/20 text-primary-glow' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}
                >
                    {mode}_NODE
                </button>
            </div>

            <div className="relative inline-block">
                <motion.div
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className={`absolute -inset-4 border border-dashed rounded-full ${mode === 'WORK' ? 'border-primary/20' : 'border-emerald-500/20'}`}
                />
                <h2 className="text-5xl font-black text-white italic tracking-tighter tabular-nums">
                    {formatTime(seconds)}
                </h2>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className={`p-4 rounded-2xl transition-all ${isActive ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-primary/10 text-primary-glow border border-primary/20'}`}
                >
                    {isActive ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                    onClick={reset}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <div className="flex items-center justify-center gap-3">
                <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full border ${mode === 'WORK' ? 'bg-primary/20 border-primary/30' : 'bg-emerald-500/20 border-emerald-500/30'}`} />
                    ))}
                </div>
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest italic">{mode}_SESSION_ESTABLISHED</span>
            </div>
        </div>
    );
}
