import React from 'react';
import { Github, GitCommit, GitBranch, Star, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GitHubPulse() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-all">
                    <Github size={24} className="text-white" />
                </div>
                <div>
                    <p className="text-sm font-black text-white uppercase italic tracking-tight">Core_Repo_V2</p>
                    <p className="text-[10px] font-mono text-slate-500">coderafroj/ultimate_engine</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {[
                    { label: 'Commits', val: '1.2k', icon: <GitCommit size={12} /> },
                    { label: 'Branches', val: '14', icon: <GitBranch size={12} /> },
                    { label: 'Stars', val: '432', icon: <Star size={12} /> }
                ].map((stat, i) => (
                    <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                        <div className="flex justify-center mb-1 text-primary/40">{stat.icon}</div>
                        <p className="text-xs font-black text-white">{stat.val}</p>
                        <p className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3 px-2">
                <Activity size={12} className="text-green-500" />
                <span className="text-[10px] font-mono text-green-500/80 uppercase font-black tracking-widest animate-pulse">
                    Deployment_Success: Stable
                </span>
            </div>
        </div>
    );
}
