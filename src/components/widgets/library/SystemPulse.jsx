import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SystemPulse() {
    const [cpu, setCpu] = useState(42);
    const [mem, setMem] = useState(68);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(prev => Math.min(100, Math.max(0, prev + (Math.random() * 10 - 5))));
            setMem(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const ProgressRing = ({ value, color, label, icon: Icon }) => (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                    <Icon size={14} className={`text-${color}-400`} />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{label}</span>
                </div>
                <span className="text-sm font-black text-white italic">{Math.round(value)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                    animate={{ width: `${value}%` }}
                    className={`h-full bg-${color}-500 shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                />
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <ProgressRing value={cpu} color="sky" label="CPU_Load" icon={Cpu} />
            <ProgressRing value={mem} color="purple" label="Memory_Alloc" icon={Database} />

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px] font-mono text-primary-glow uppercase font-bold">CoderAfroj_Neural_Core</span>
                </div>
                <Zap size={14} className="text-primary-glow" />
            </div>
        </div>
    );
}
