import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SystemPulse() {
    const [cpu, setCpu] = useState(42);
    const [mem, setMem] = useState(68);
    const [flux, setFlux] = useState(124);
    const [logs, setLogs] = useState([
        'KERNEL_BOOT_COMPLETE',
        'NEURAL_LINK_ESTABLISHED',
        'DASHBOARD_PROTOCOL_V5_LIVE'
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(prev => Math.min(100, Math.max(0, prev + (Math.random() * 10 - 5))));
            setMem(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))));
            setFlux(prev => +(prev + (Math.random() * 20 - 10)).toFixed(1));

            // Log Simulation
            if (Math.random() > 0.7) {
                const events = ['THREAD_IDLE', 'MEMORY_SWAP', 'IO_BURST', 'PACKET_SYNC', 'AUTH_VALID'];
                const newEvent = events[Math.floor(Math.random() * events.length)];
                setLogs(prev => [newEvent, ...prev.slice(0, 4)]);
            }
        }, 3000);
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
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <ProgressRing value={cpu} color="sky" label="CPU_Load" icon={Cpu} />
                <ProgressRing value={mem} color="purple" label="Mem_Alloc" icon={Database} />
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest italic">Kernel_Events_Feed</span>
                    <Activity size={10} className="text-primary-glow animate-pulse" />
                </div>
                <div className="space-y-1.5 min-h-[85px]">
                    {logs.map((log, i) => (
                        <motion.div
                            key={`${log}-${i}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1 - (i * 0.2), x: 0 }}
                            className="flex items-center gap-2 font-mono text-[9px]"
                        >
                            <span className="text-primary-glow/60">λ</span>
                            <span className="text-slate-400 capitalize">{log.toLowerCase().replace(/_/g, ' ')}...</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping absolute inset-0" />
                        <div className="w-2 h-2 rounded-full bg-primary relative" />
                    </div>
                    <div>
                        <p className="text-[8px] font-mono text-primary-glow uppercase font-bold leading-none">Net_Flux_Stable</p>
                        <p className="text-[10px] font-black text-white italic mt-1">{flux} MB/s</p>
                    </div>
                </div>
                <Zap size={14} className="text-primary-glow" />
            </div>
        </div>
    );
}
