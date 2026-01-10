import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Loader2, GitBranch, Lock, Globe, ChevronRight, Star, GitFork, Eye, AlertCircle, Calendar, HardDrive, TrendingUp } from 'lucide-react';
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
    const [sortBy, setSortBy] = useState('updated'); // updated, stars, name

    const filteredAndSortedRepos = useMemo(() => {
        let filtered = repos.filter(repo =>
            repo.name.toLowerCase().includes(search.toLowerCase()) ||
            (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()))
        );

        // Sort repositories
        switch (sortBy) {
            case 'stars':
                filtered.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'updated':
            default:
                filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                break;
        }

        return filtered;
    }, [repos, search, sortBy]);

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        if (!newRepoName.trim()) return;
        try {
            await onCreateRepo(newRepoName.trim(), isPrivate);
            setNewRepoName('');
            setShowCreate(false);
        } catch (err) {
            // Error handled in context
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    };

    const formatSize = (kb) => {
        if (kb >= 1024) {
            return (kb / 1024).toFixed(1) + ' MB';
        }
        return kb + ' KB';
    };

    const getRelativeTime = (date) => {
        const now = new Date();
        const updated = new Date(date);
        const diffMs = now - updated;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 30) return `${diffDays}d ago`;
        return updated.toLocaleDateString();
    };

    // Calculate total stats
    const totalStats = useMemo(() => {
        return repos.reduce((acc, repo) => ({
            stars: acc.stars + (repo.stargazers_count || 0),
            forks: acc.forks + (repo.forks_count || 0),
            watchers: acc.watchers + (repo.watchers_count || 0),
        }), { stars: 0, forks: 0, watchers: 0 });
    }, [repos]);

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
                <div className="obsidian-card p-4 md:p-5 rounded-xl border-[#30363d]/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <GitBranch className="w-4 h-4 text-primary" />
                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400">Repos</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-white">{repos.length}</p>
                </div>
                <div className="obsidian-card p-4 md:p-5 rounded-xl border-[#30363d]/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400">Stars</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-white">{formatNumber(totalStats.stars)}</p>
                </div>
                <div className="obsidian-card p-4 md:p-5 rounded-xl border-[#30363d]/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <GitFork className="w-4 h-4 text-green-500" />
                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400">Forks</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-white">{formatNumber(totalStats.forks)}</p>
                </div>
                <div className="obsidian-card p-4 md:p-5 rounded-xl border-[#30363d]/50 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400">Watchers</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-white">{formatNumber(totalStats.watchers)}</p>
                </div>
            </motion.div>

            {/* Search and Controls */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-stretch md:items-center">
                    <div className="relative w-full md:flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search repositories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12 h-11 bg-[#0d1117] border-[#30363d] focus:border-primary/50 rounded-xl text-sm w-full"
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="flex-1 md:flex-initial h-11 px-4 bg-[#21262d] border border-[#30363d] rounded-xl text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#30363d] transition-colors"
                        >
                            <option value="updated">Recently Updated</option>
                            <option value="stars">Most Stars</option>
                            <option value="name">Name (A-Z)</option>
                        </select>
                        <Button
                            onClick={() => setShowCreate(!showCreate)}
                            className="flex-1 md:flex-initial h-11 px-4 md:px-5 bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] rounded-xl text-[11px] font-bold uppercase tracking-wider"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Create</span>
                        </Button>
                        <Button
                            onClick={onRefresh}
                            disabled={isLoading}
                            className="flex-1 md:flex-initial h-11 px-4 md:px-6 bg-primary hover:bg-primary-glow text-white border border-primary/20 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-primary/10"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="hidden sm:inline">Sync</span>}
                            <span className="sm:hidden">↻</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Create Repository Form */}
            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="obsidian-card p-4 md:p-6 rounded-xl border border-primary/20 bg-primary/5"
                    >
                        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
                            <div className="flex-grow space-y-2 w-full">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dim-text ml-1">Repository Name</label>
                                <Input
                                    value={newRepoName}
                                    onChange={(e) => setNewRepoName(e.target.value)}
                                    placeholder="my-awesome-repo"
                                    className="h-10 border-white/10"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                                <div className="flex items-center bg-black/40 h-10 px-4 rounded-lg border border-white/10">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isPrivate}
                                            onChange={(e) => setIsPrivate(e.target.checked)}
                                            className="accent-primary"
                                        />
                                        <span className="text-xs text-white">Private</span>
                                    </label>
                                </div>
                                <Button type="submit" disabled={isLoading} className="h-10 px-8 bg-primary text-white font-bold text-xs uppercase">
                                    Create Repository
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Repository Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading && repos.length === 0 ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="obsidian-card h-52 rounded-xl animate-pulse bg-white/5 border-white/5" />
                    ))
                ) : filteredAndSortedRepos.length > 0 ? (
                    filteredAndSortedRepos.map((repo) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={repo.id}
                            onClick={() => onSelectRepo(repo)}
                            className="github-card group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[180px] md:min-h-[200px] hover:border-primary/30 transition-all active:scale-[0.98]"
                        >
                            {/* Hover Arrow */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                <ChevronRight className="w-5 h-5 text-primary" />
                            </div>

                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/5 rounded-lg border border-primary/20 text-primary flex-shrink-0">
                                        <GitBranch className="w-4 h-4" />
                                    </div>
                                    <div className="flex-grow overflow-hidden pr-8">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-[15px] font-bold text-white truncate group-hover:text-primary transition-colors">
                                                {repo.name}
                                            </h3>
                                            {repo.private ? (
                                                <Lock className="w-3 h-3 text-slate-500 flex-shrink-0" />
                                            ) : (
                                                <Globe className="w-3 h-3 text-slate-500 flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                            {repo.description || 'No description available'}
                                        </p>
                                    </div>
                                </div>

                                {/* Topics/Tags */}
                                {repo.topics && repo.topics.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {repo.topics.slice(0, 3).map((topic, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-[9px] font-mono text-primary uppercase tracking-wide"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                        {repo.topics.length > 3 && (
                                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] font-mono text-slate-400">
                                                +{repo.topics.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Stats Row */}
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <div className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors" title="Stars">
                                        <Star className="w-3.5 h-3.5" />
                                        <span className="font-mono">{formatNumber(repo.stargazers_count || 0)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 hover:text-green-500 transition-colors" title="Forks">
                                        <GitFork className="w-3.5 h-3.5" />
                                        <span className="font-mono">{formatNumber(repo.forks_count || 0)}</span>
                                    </div>
                                    {repo.open_issues_count > 0 && (
                                        <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors" title="Open Issues">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            <span className="font-mono">{repo.open_issues_count}</span>
                                        </div>
                                    )}
                                    {repo.size > 0 && (
                                        <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors" title="Repository Size">
                                            <HardDrive className="w-3.5 h-3.5" />
                                            <span className="font-mono text-[10px]">{formatSize(repo.size)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 pt-4 border-t border-[#30363d] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {repo.language && (
                                        <div className="flex items-center gap-1.5">
                                            <div
                                                className="w-2.5 h-2.5 rounded-full border"
                                                style={{
                                                    backgroundColor: languageColors[repo.language] || '#858585',
                                                    borderColor: languageColors[repo.language] || '#858585'
                                                }}
                                            />
                                            <span className="text-[10px] font-mono text-slate-400">{repo.language}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1.5 text-[9px] font-medium text-slate-500 uppercase tracking-tight">
                                    <Calendar className="w-3 h-3" />
                                    <span>{getRelativeTime(repo.updated_at)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center obsidian-card rounded-2xl border-dashed border-white/10">
                        <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-dim-text font-mono text-sm">No repositories found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitHubRepoList;
