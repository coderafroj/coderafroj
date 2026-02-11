import React from 'react';
import { Github, GitCommit, GitBranch, Star, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GitHubPulse() {
    const commitFlux = [4, 8, 2, 5, 9, 3, 6, 8, 4, 7, 10, 5, 3, 6];

    return (
        <div className="space-y-6">
            <div className="group/repo flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center border border-white/10 group-hover/repo:border-primary/50 transition-all">
                        <Github size={24} className="text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-white uppercase italic tracking-tight">Core_Repo_V2</p>
                        <p className="text-[9px] font-mono text-slate-500">coderafroj/ultimate_engine</p>
                    </div>
                </div>
                <div className="opacity-0 group-hover/repo:opacity-100 transition-opacity">
                    <Activity size={14} className="text-primary-glow" />
                </div>
            </div>

            {/* Commit Flux Feed */}
            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Commit_Flux_14D</span>
                    <span className="text-[8px] font-mono text-primary-glow uppercase font-bold">Stable_Interval</span>
                </div>
                <div className="h-10 flex items-end gap-1 px-2 bg-white/[0.02] border border-white/5 rounded-xl py-2">
                    {commitFlux.map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 2 }}
                            animate={{ height: `${(val / 10) * 100}%` }}
                            transition={{ delay: i * 0.05, duration: 1 }}
                            className={`flex-1 rounded-full ${val > 7 ? 'bg-primary shadow-[0_0_8px_rgba(99,102,241,0.4)]' : 'bg-primary/20'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {[
                    { label: 'Commits', val: '1.2k', icon: <GitCommit size={12} />, color: 'text-primary' },
                    { label: 'Branches', val: '14', icon: <GitBranch size={12} />, color: 'text-sky-400' },
                    { label: 'Stars', val: '432', icon: <Star size={12} />, color: 'text-yellow-400' }
                ].map((stat, i) => (
                    <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center group hover:bg-white/[0.05] transition-all">
                        <div className={`flex justify-center mb-1 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`}>{stat.icon}</div>
                        <p className="text-sm font-black text-white italic">{stat.val}</p>
                        <p className="text-[7px] font-mono text-slate-600 uppercase tracking-tighter">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[9px] font-mono text-green-500 uppercase font-black tracking-[0.2em]">
                        Live_Deploy_V1.4.2
                    </span>
                </div>
                <span className="text-[8px] font-mono text-slate-600 italic">4m_ago</span>
            </div>
        </div>
    );
}
