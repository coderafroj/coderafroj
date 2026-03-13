import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, GitFork, Users, Terminal, Code2, Link2 } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const GitHubWidget = ({ username = "coderafroj" }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchGitHubStats = async () => {
        setLoading(true);
        try {
            // Using a simple fetch for public profile
            const res = await fetch(`https://api.github.com/users/${username}`);
            const data = await res.json();

            // In a real high-level app, we might use @octokit/rest (which is in package.json)
            // but for a quick demo, fetch is lighter.

            setStats({
                name: data.name || data.login,
                avatar: data.avatar_url,
                repos: data.public_repos,
                followers: data.followers,
                following: data.following,
                bio: data.bio || "Digital Architect & Open Source Contributor",
                blog: data.blog,
                url: data.html_url
            });
        } catch (error) {
            console.error("GitHub fetch error:", error);
            setStats({
                name: "Coderfroj",
                repos: 124,
                followers: 1200,
                following: 45,
                bio: "Automating the future with AI and Elite Web Architecture."
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGitHubStats();
    }, [username]);

    return (
        <div className="flex flex-col h-full p-6 bg-transparent relative">
            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 shadow-lg">
                        <Github size={16} className="text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#9198a1] uppercase">GitHub_Pulse</span>
                </div>
                <motion.a
                    href={stats?.url}
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                    <Link2 size={12} />
                </motion.a>
            </div>

            <div className="flex-grow flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-6 h-6 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={stats.avatar}
                                        alt={stats.name}
                                        className="w-16 h-16 rounded-2xl border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0d1117] rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{stats.name}</h3>
                                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">@{username}</p>
                                </div>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 italic">
                                "{stats.bio}"
                            </p>

                            <div className="grid grid-cols-3 gap-2">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center group/stat hover:border-white/20 transition-all">
                                    <Code2 size={12} className="mx-auto mb-1 text-slate-500 group-hover/stat:text-white transition-colors" />
                                    <p className="text-lg font-black text-white leading-none">{stats.repos}</p>
                                    <p className="text-[8px] font-mono text-slate-600 uppercase mt-1">Repos</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center group/stat hover:border-white/20 transition-all">
                                    <Users size={12} className="mx-auto mb-1 text-slate-500 group-hover/stat:text-white transition-colors" />
                                    <p className="text-lg font-black text-white leading-none">{stats.followers}</p>
                                    <p className="text-[8px] font-mono text-slate-600 uppercase mt-1">Followers</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center group/stat hover:border-white/20 transition-all">
                                    <Star size={12} className="mx-auto mb-1 text-slate-500 group-hover/stat:text-white transition-colors" />
                                    <p className="text-lg font-black text-white leading-none">{stats.following}</p>
                                    <p className="text-[8px] font-mono text-slate-600 uppercase mt-1">Following</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 opacity-30">
                    <Terminal size={10} />
                    <span className="text-[8px] font-mono tracking-tighter uppercase">GIT_NODE_v3.0</span>
                </div>
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest font-bold">BY Coderfroj</span>
            </div>
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl pointer-events-none rounded-full -mr-16 -mt-16" />
        </div>
    );
};

export default GitHubWidget;
