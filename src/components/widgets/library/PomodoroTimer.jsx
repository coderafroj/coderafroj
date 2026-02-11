import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PomodoroTimer() {
    const [mode, setMode] = useState('WORK'); // WORK or BREAK
    const [seconds, setSeconds] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);

    const totalSeconds = mode === 'WORK' ? 25 * 60 : 5 * 60;
    const progress = (seconds / totalSeconds) * 100;

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(s => s - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
            if (mode === 'WORK') setSessionsCompleted(prev => prev + 1);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, mode]);

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
        setSeconds(totalSeconds);
        setIsActive(false);
    };

    return (
        <div className="space-y-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
                <button
                    onClick={toggleMode}
                    className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] transition-all border ${mode === 'WORK' ? 'bg-primary/10 border-primary/20 text-primary-glow shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}
                >
                    {mode}_MODE_V1
                </button>
            </div>

            <div className="relative inline-flex items-center justify-center">
                {/* SVG Progress Ring */}
                <svg className="w-48 h-48 -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className="text-white/[0.03]"
                    />
                    <motion.circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 88}
                        animate={{ strokeDashoffset: (2 * Math.PI * 88) * (1 - progress / 100) }}
                        transition={{ duration: 1, ease: "linear" }}
                        className={mode === 'WORK' ? 'text-primary' : 'text-emerald-500'}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-5xl font-black text-white italic tracking-tighter tabular-nums mb-1">
                        {formatTime(seconds)}
                    </h2>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Remaining</span>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className={`p-5 rounded-2xl transition-all ${isActive ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'bg-primary/10 text-primary-glow border border-primary/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]'}`}
                >
                    {isActive ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                    onClick={reset}
                    className="p-5 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all hover:bg-white/10"
                >
                    <RotateCcw size={24} />
                </button>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Coffee size={12} className="text-slate-600" />
                    <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Sessions_Ready</span>
                </div>
                <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < sessionsCompleted ? 'bg-primary shadow-[0_0_5px_rgba(99,102,241,0.5)]' : 'bg-white/10 border border-white/5'}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
