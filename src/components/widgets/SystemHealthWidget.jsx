import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Network, Gauge, Terminal } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const SystemHealthWidget = () => {
    const [stats, setStats] = useState({
        cpu: 24,
        ram: 68,
        net: 12,
        tasks: 142
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() * 10 - 5))),
                ram: Math.max(60, Math.min(85, prev.ram + (Math.random() * 2 - 1))),
                net: Math.max(5, Math.min(40, prev.net + (Math.random() * 4 - 2))),
                tasks: Math.floor(prev.tasks + (Math.random() * 2 - 1))
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const GaugeBar = ({ label, value, icon: Icon, color }) => (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon size={12} className="text-slate-500" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{label}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-white shrink-0">{Math.round(value)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 border border-white/5 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                    style={{ backgroundColor: color }}
                    className="h-full relative z-10"
                />
                {/* Visual "Segments" */}
                <div className="absolute inset-0 z-20 flex gap-1 px-1">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="h-full w-[1px] bg-black/40" />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full p-6 bg-transparent relative">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <Gauge size={14} className="text-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase">System_Link</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Operational</span>
                </div>
            </div>

            <div className="flex-grow flex flex-col justify-around relative z-10">
                <GaugeBar label="Processor Load" value={stats.cpu} icon={Cpu} color="#3b82f6" />
                <GaugeBar label="Memory Buffer" value={stats.ram} icon={Database} color="#8b5cf6" />
                <GaugeBar label="Network IO" value={stats.net} icon={Network} color="#06b6d4" />
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 opacity-30">
                    <Terminal size={10} />
                    <span className="text-[8px] font-mono tracking-tighter uppercase">CORE_DGNSTC_v2.1</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[8px] font-mono text-slate-600 uppercase">Threads</p>
                        <p className="text-xs font-black text-white leading-none">{stats.tasks}</p>
                    </div>
                </div>
            </div>
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none rounded-full -mr-16 -mt-16" />
        </div>
    );
};

export default SystemHealthWidget;
