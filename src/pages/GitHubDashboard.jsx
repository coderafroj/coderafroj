import React, { useState } from 'react';
import { useGitHub } from '../context/GitHubContext';
import GitHubAuth from '../components/GitHub/GitHubAuth';
import GitHubRepoList from '../components/GitHub/GitHubRepoList';
import GitHubFileUploader from '../components/GitHub/GitHubFileUploader';
import GitHubFileBrowser from '../components/GitHub/GitHubFileBrowser';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, LogOut, Layout, Settings, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';

const GitHubDashboard = () => {
    const {
        isAuthenticated,
        user,
        repos,
        selectedRepo,
        isLoading,
        fetchRepos,
        createRepo,
        selectRepo,
        uploadFile,
        logout
    } = useGitHub();

    const [activeTab, setActiveTab] = useState('repos');
    const [activeRepoTab, setActiveRepoTab] = useState('files'); // files or upload

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />
                </div>
                <GitHubAuth />
            </div>
        );
    }

    const navigationTabs = [
        { id: 'repos', icon: <Layout className="w-4 h-4" />, label: 'Repositories' },
        { id: 'activity', icon: <Activity className="w-4 h-4" />, label: 'Live Activity' },
        { id: 'settings', icon: <Settings className="w-4 h-4" />, label: 'Settings' }
    ];

    return (
        <div className="min-h-screen pb-20 pt-10 px-4 max-w-7xl mx-auto relative">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />
            </div>

            {/* Mobile menu is handled by main Navbar - no duplicate needed here */}


            {/* Mobile menu removed - main Navbar handles mobile navigation */}

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-80 space-y-4 flex-shrink-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="obsidian-card p-5 rounded-2xl border-[#30363d]/50 relative overflow-hidden group"
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="relative">
                                <img
                                    src={user.avatar_url}
                                    alt={user.login}
                                    className="w-14 h-14 rounded-xl border border-[#30363d] group-hover:border-primary/50 transition-colors"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0d1117] flex items-center justify-center">
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <h2 className="text-lg font-black text-white truncate leading-tight tracking-tight uppercase">
                                    {user.name || user.login}
                                </h2>
                                <p className="text-[10px] text-slate-400 font-mono truncate">@{user.login.toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-1.5 relative z-10">
                            {navigationTabs.map((tab) => (
                                <Button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full h-10 flex items-center justify-start gap-3 px-4 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest ${activeTab === tab.id
                                        ? 'bg-primary/20 text-white border border-primary/30 shadow-lg shadow-primary/5'
                                        : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </Button>
                            ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-[#30363d]/50 relative z-10">
                            <Button
                                onClick={logout}
                                className="w-full h-10 bg-red-500/5 hover:bg-red-500/10 text-red-500/70 hover:text-red-500 flex items-center justify-center gap-3 rounded-xl transition-all group/logout text-[10px] font-bold uppercase tracking-widest"
                            >
                                <LogOut className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                <span>Terminate Session</span>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Desktop Stats quick-view */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="obsidian-card p-5 rounded-2xl border-[#30363d]/50 flex gap-4"
                    >
                        <div className="flex-1 text-center">
                            <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1">Repos</p>
                            <p className="text-xl font-black text-white leading-none">{repos.length}</p>
                        </div>
                        <div className="w-px bg-[#30363d]/50" />
                        <div className="flex-1 text-center">
                            <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1">Status</p>
                            <div className="text-[10px] font-bold text-green-500 flex items-center justify-center gap-2 h-6">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                ACTIVE
                            </div>
                        </div>
                    </motion.div>
                </aside>

                {/* Main Area */}
                <main className="flex-grow w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeTab === 'repos' && (
                            <motion.div
                                key="repos-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6 md:space-y-8"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                                            MISSION <span className="text-primary italic">CONTROL</span>
                                        </h1>
                                        <p className="text-[10px] text-slate-400 font-mono mt-2 md:mt-3 uppercase tracking-widest border-l-2 border-primary pl-3">
                                            Synchronized with @{user.login.toLowerCase()}
                                        </p>
                                    </div>
                                </div>

                                {!selectedRepo ? (
                                    <GitHubRepoList
                                        repos={repos}
                                        onRefresh={fetchRepos}
                                        onCreateRepo={createRepo}
                                        onSelectRepo={selectRepo}
                                        isLoading={isLoading}
                                    />
                                ) : (
                                    <>
                                        {/* Repository Action Tabs */}
                                        <div className="flex gap-2 mb-6 overflow-x-auto">
                                            <Button
                                                onClick={() => setActiveRepoTab('files')}
                                                className={`px-4 h-10 flex items-center gap-2 rounded-xl transition-all text-xs font-bold uppercase tracking-wider whitespace-nowrap ${activeRepoTab === 'files'
                                                    ? 'bg-primary/20 text-white border border-primary/30'
                                                    : 'bg-[#21262d] text-slate-400 hover:text-white border border-[#30363d]'
                                                    }`}
                                            >
                                                Browse Files
                                            </Button>
                                            <Button
                                                onClick={() => setActiveRepoTab('upload')}
                                                className={`px-4 h-10 flex items-center gap-2 rounded-xl transition-all text-xs font-bold uppercase tracking-wider whitespace-nowrap ${activeRepoTab === 'upload'
                                                    ? 'bg-primary/20 text-white border border-primary/30'
                                                    : 'bg-[#21262d] text-slate-400 hover:text-white border border-[#30363d]'
                                                    }`}
                                            >
                                                Upload Files
                                            </Button>
                                        </div>

                                        {/* Tab Content */}
                                        <AnimatePresence mode="wait">
                                            {activeRepoTab === 'files' ? (
                                                <GitHubFileBrowser
                                                    key="file-browser"
                                                    repository={selectedRepo}
                                                    onBack={() => selectRepo(null)}
                                                />
                                            ) : (
                                                <GitHubFileUploader
                                                    key="file-uploader"
                                                    selectedRepo={selectedRepo}
                                                    onUpload={uploadFile}
                                                    isUploading={isLoading}
                                                    onBack={() => selectRepo(null)}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'activity' && (
                            <motion.div
                                key="activity-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="obsidian-card p-12 md:p-20 flex flex-col items-center justify-center rounded-3xl border-dashed border-white/5"
                            >
                                <Activity className="w-12 h-12 text-primary/30 mb-6" />
                                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Activity Feed</h3>
                                <p className="text-dim-text text-xs mt-2 font-mono text-center">Real-time sync and push monitoring active.</p>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings-view"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="obsidian-card p-12 md:p-20 flex flex-col items-center justify-center rounded-3xl border-dashed border-white/5"
                            >
                                <Settings className="w-12 h-12 text-primary/30 mb-6" />
                                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Sync Settings</h3>
                                <p className="text-dim-text text-xs mt-2 font-mono text-center">Fine-tune your GitHub integration experience.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Mobile Bottom Tab Bar - Fixed at bottom on mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0d1117] border-t border-[#30363d] z-30">
                <div className="flex items-center justify-around px-4 py-3">
                    {navigationTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id
                                ? 'text-primary bg-primary/10'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {tab.icon}
                            <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GitHubDashboard;
