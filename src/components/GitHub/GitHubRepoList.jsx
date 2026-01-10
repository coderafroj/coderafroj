import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Loader2, GitBranch, Lock, Globe, ChevronRight } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const GitHubRepoList = ({ repos, onRefresh, onCreateRepo, onSelectRepo, isLoading }) => {
    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [newRepoName, setNewRepoName] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);

    const filteredRepos = repos.filter(repo =>
        repo.name.toLowerCase().includes(search.toLowerCase())
    );

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

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Filter repositories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-12 h-11 bg-[#0d1117] border-[#30363d] focus:border-primary/50 rounded-xl text-sm"
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <Button
                        onClick={() => setShowCreate(!showCreate)}
                        className="flex-1 md:flex-initial h-11 px-5 bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] rounded-xl text-[11px] font-bold uppercase tracking-wider"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create
                    </Button>
                    <Button
                        onClick={onRefresh}
                        disabled={isLoading}
                        className="flex-1 md:flex-initial h-11 px-6 bg-primary hover:bg-primary-glow text-white border border-primary/20 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-primary/10"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sync'}
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="obsidian-card p-6 rounded-xl border border-primary/20 bg-primary/5"
                    >
                        <form onSubmit={handleCreateSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-grow space-y-2 w-full">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-dim-text ml-1">Repository Name</label>
                                <Input
                                    value={newRepoName}
                                    onChange={(e) => setNewRepoName(e.target.value)}
                                    placeholder="my-awesome-repo"
                                    className="h-10 border-white/10"
                                />
                            </div>
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
                                Create
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading && repos.length === 0 ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="obsidian-card h-32 rounded-xl animate-pulse bg-white/5 border-white/5" />
                    ))
                ) : filteredRepos.length > 0 ? (
                    filteredRepos.map((repo) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={repo.id}
                            onClick={() => onSelectRepo(repo)}
                            className="github-card group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[140px]"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                <ChevronRight className="w-5 h-5 text-primary" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/5 rounded-lg border border-primary/20 text-primary">
                                        <GitBranch className="w-4 h-4" />
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-[15px] font-bold text-white truncate group-hover:text-primary transition-colors">
                                                {repo.name}
                                            </h3>
                                            {repo.private ? (
                                                <Lock className="w-3 h-3 text-slate-500" />
                                            ) : (
                                                <Globe className="w-3 h-3 text-slate-500" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                    {repo.description || 'Secure repository established within mission control.'}
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#30363d] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary/40 border border-primary/60" />
                                        <span className="text-[10px] font-mono text-slate-400">{repo.language || 'Mixed'}</span>
                                    </div>
                                </div>
                                <span className="text-[9px] font-medium text-slate-500 uppercase tracking-tight">
                                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center obsidian-card rounded-2xl border-dashed border-white/10">
                        <p className="text-dim-text font-mono text-sm">No repositories found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitHubRepoList;
