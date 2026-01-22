import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Loader2, GitBranch, Lock, Globe, ChevronRight, Star, GitFork, Eye, AlertCircle, Calendar, HardDrive, TrendingUp, Github, ArrowRight } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

// GitHub language colors mapping (popular languages)
const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    Vue: '#41b883',
    React: '#61dafb',
};

const GitHubRepoList = ({ repos, onRefresh, onCreateRepo, onSelectRepo, isLoading }) => {
    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [newRepoName, setNewRepoName] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [sortBy, setSortBy] = useState('updated');

    const filteredAndSortedRepos = useMemo(() => {
        let filtered = repos.filter(repo =>
            repo.name.toLowerCase().includes(search.toLowerCase()) ||
            (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()))
        );

        switch (sortBy) {
            case 'stars': filtered.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)); break;
            case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'updated': default: filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); break;
        }
        return filtered;
    }, [repos, search, sortBy]);

    const totalStats = useMemo(() => {
        return repos.reduce((acc, repo) => ({
            stars: acc.stars + (repo.stargazers_count || 0),
            forks: acc.forks + (repo.forks_count || 0),
            watchers: acc.watchers + (repo.watchers_count || 0),
        }), { stars: 0, forks: 0, watchers: 0 });
    }, [repos]);

    const statsConfig = [
        { label: 'Repositories', value: repos.length, icon: <GitBranch className="w-5 h-5" />, color: 'primary' },
        { label: 'Stars Total', value: totalStats.stars, icon: <Star className="w-5 h-5 text-yellow-500" />, color: 'yellow' },
        { label: 'Forks Active', value: totalStats.forks, icon: <GitFork className="w-5 h-5 text-green-500" />, color: 'green' },
        { label: 'Watchers', value: totalStats.watchers, icon: <Eye className="w-5 h-5 text-blue-500" />, color: 'blue' }
    ];

    return (
        <div className="space-y-10">
            {/* Stats Overview - Premium Design */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {statsConfig.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="obsidian-card p-6 md:p-8 rounded-[2rem] border-white/5 bg-white/2 relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 duration-500`}>
                            {React.cloneElement(stat.icon, { className: 'w-24 h-24' })}
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 bg-${stat.color}-500/10 rounded-2xl border border-${stat.color}-500/20`}>
                                    {stat.icon}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                            </div>
                            <p className="text-3xl md:text-5xl font-black text-white tracking-tighter">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
                <div className="relative group flex-grow max-w-2xl">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="SEARCH PROTOCOLS..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-14 h-14 bg-black/40 border-white/5 focus:border-primary/50 rounded-2xl text-[11px] font-bold tracking-widest uppercase"
                    />
                </div>

                <div className="flex gap-3">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-14 px-6 bg-black/40 border border-white/5 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-all outline-none"
                    >
                        <option value="updated">Recently Updated</option>
                        <option value="stars">Most Stars</option>
                        <option value="name">Name (A-Z)</option>
                    </select>

                    <Button
                        onClick={() => setShowCreate(!showCreate)}
                        className="h-14 px-8 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Initialize</span>
                    </Button>

                    <Button
                        onClick={onRefresh}
                        disabled={isLoading}
                        className="h-14 px-8 bg-primary hover:bg-primary-glow text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Sync</span>}
                    </Button>
                </div>
            </div>

            {/* Create Form */}
            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="obsidian-card p-8 rounded-[2.5rem] border-primary/20 bg-primary/5"
                    >
                        <form onSubmit={(e) => { e.preventDefault(); onCreateRepo(newRepoName.trim(), isPrivate); setShowCreate(false); }} className="grid md:grid-cols-3 gap-6 items-end">
                            <div className="md:col-span-2 space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">Archive Identity</label>
                                <Input
                                    value={newRepoName}
                                    onChange={(e) => setNewRepoName(e.target.value)}
                                    placeholder="new-repository-name"
                                    className="h-14 border-white/10 bg-black/40"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    onClick={() => setIsPrivate(!isPrivate)}
                                    className={`flex-1 h-14 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${isPrivate ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}
                                >
                                    {isPrivate ? 'Private' : 'Public'}
                                </Button>
                                <Button type="submit" className="flex-1 h-14 bg-primary text-white font-bold text-[10px] uppercase tracking-widest">
                                    Create
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Repositories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="obsidian-card h-48 rounded-[2rem] border-white/5 skeleton" />
                    ))
                ) : filteredAndSortedRepos.length > 0 ? (
                    filteredAndSortedRepos.map((repo, index) => (
                        <motion.div
                            key={repo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => onSelectRepo(repo)}
                            className="obsidian-card p-6 rounded-[2.5rem] border-white/5 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-56"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors duration-500">
                                        <Github className={`w-6 h-6 ${repo.private ? 'text-amber-400' : 'text-primary'}`} />
                                    </div>
                                    <div className="flex gap-2">
                                        {repo.private && (
                                            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[8px] font-black uppercase text-amber-500 tracking-widest">
                                                Private
                                            </span>
                                        )}
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-black uppercase text-slate-400 tracking-widest">
                                            <Star className="w-2.5 h-2.5 text-yellow-500" />
                                            {repo.stargazers_count}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2 group-hover:text-primary transition-colors truncate">
                                    {repo.name}
                                </h3>
                                <p className="text-[10px] text-slate-500 font-bold line-clamp-2 leading-relaxed h-10">
                                    {repo.description || "Secure data storage node within the matrix."}
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                <div className="flex items-center gap-2">
                                    {repo.language && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(47,129,247,0.5)]" />
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{repo.language}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest hidden sm:block">
                                        {new Date(repo.updated_at).toLocaleDateString()}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-slate-600 group-hover:text-primary transition-colors">
                                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center obsidian-card rounded-[3rem] border-white/5 border-dashed bg-white/2">
                        <Github className="w-16 h-16 text-slate-800 mx-auto mb-4" />
                        <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2">No Archives Found</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">The specified search query returned null.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitHubRepoList;
