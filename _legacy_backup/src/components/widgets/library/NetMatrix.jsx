import React from 'react';
import { Wifi, Shield, Globe, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NetMatrix() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                        <Wifi size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-white italic">CODERAFROJ_UPLINK</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocol_v6_Stable</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-black text-green-400 tabular-nums">12ms</p>
                    <p className="text-[8px] font-mono text-slate-600 uppercase">Latency</p>
                </div>
            </div>

            <div className="relative h-24 bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-4">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="w-full h-full coderafroj-grid brightness-200" />
                </div>

                <div className="flex items-center justify-center h-full gap-4">
                    <Globe size={40} className="text-primary/20 animate-pulse" />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Shield size={12} className="text-primary" />
                            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">AES_256_ACTIVE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity size={12} className="text-primary" />
                            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">PACKET_STREAMS_04</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-xs font-black text-white italic">842 Mbps</p>
                    <p className="text-[8px] font-mono text-slate-600 uppercase">Download</p>
                </div>
                <div className="text-center p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-xs font-black text-white italic">124 Mbps</p>
                    <p className="text-[8px] font-mono text-slate-600 uppercase">Upload</p>
                </div>
            </div>
        </div>
    );
}
