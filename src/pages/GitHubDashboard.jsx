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
        uploadFiles,
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
            {/* Background elements - more organic glow */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full opacity-50" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-accent/10 blur-[150px] rounded-full opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#0d1117]" />
                <div className="coderafroj-grid coderafroj-grid-pulse opacity-20" />
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start relative z-10">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-72 space-y-4 flex-shrink-0 sticky top-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="obsidian-card p-6 rounded-[2.5rem] border-white/5 bg-black/40 backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="flex flex-col items-center text-center relative z-10 mb-8">
                            <div className="relative mb-4 group/avatar">
                                <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary to-accent rounded-2xl blur opacity-20 group-hover/avatar:opacity-40 transition-opacity" />
                                <img
                                    src={user.avatar_url}
                                    alt={user.login}
                                    className="w-20 h-20 rounded-2xl border border-white/10 relative z-10 rotate-[-2deg] group-hover/avatar:rotate-0 transition-transform duration-500"
                                />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-[3px] border-[#0d1117] z-20" />
                            </div>
                            <h2 className="text-xl font-black text-white leading-tight tracking-tighter uppercase mb-1">
                                {user.name || user.login}
                            </h2>
                            <p className="text-[10px] text-primary font-mono tracking-[0.2em] font-bold">CORE_OPERATOR</p>
                        </div>

                        <div className="space-y-2 relative z-10">
                            {navigationTabs.map((tab) => (
                                <Button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full h-12 flex items-center justify-start gap-4 px-5 rounded-2xl transition-all text-[11px] font-bold uppercase tracking-widest ${activeTab === tab.id
                                        ? 'bg-primary/20 text-white border border-primary/30 shadow-lg shadow-primary/10'
                                        : 'bg-transparent text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    <div className={`${activeTab === tab.id ? 'text-primary' : 'text-slate-500'}`}>{tab.icon}</div>
                                    <span>{tab.label}</span>
                                </Button>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
                            <Button
                                onClick={logout}
                                className="w-full h-12 bg-red-500/5 hover:bg-red-500/10 text-red-500/60 hover:text-red-500 flex items-center justify-center gap-3 rounded-2xl transition-all group/logout text-[10px] font-bold uppercase tracking-[0.2em]"
                            >
                                <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                                <span>Logout System</span>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Quick Stats Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="obsidian-card p-5 rounded-[2rem] border-white/5 flex flex-col gap-4 bg-white/2"
                    >
                        <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest px-1">
                            <span>Connection</span>
                            <span className="text-green-500 flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                Stable
                            </span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5 }}
                                className="h-full bg-gradient-to-r from-primary to-accent"
                            />
                        </div>
                    </motion.div>
                </aside>

                {/* Main Area */}
                <main className="flex-grow w-full">
                    <AnimatePresence mode="wait">
                        {activeTab === 'repos' && (
                            <motion.div
                                key="repos-view"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="space-y-8 md:space-y-12"
                            >
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[9px] font-black text-primary uppercase tracking-[0.2em]">Live_Protocol</span>
                                        </div>
                                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                                            COMMAND <span className="text-primary italic inline-block transform skew-x-[-10deg]">CENTER</span>
                                        </h1>
                                        <p className="text-xs md:text-sm text-slate-500 font-mono tracking-widest uppercase">
                                            Authenticated as <span className="text-white hover:text-primary transition-colors cursor-pointer">@{user.login}</span>
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-1">Local_Time</p>
                                            <p className="text-xs font-mono text-white opacity-60">13:31:46 PST</p>
                                        </div>
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
                                    <div className="fade-slide-up">
                                        {/* Repository Action Header */}
                                        <div className="obsidian-card p-2 rounded-2xl border-white/5 bg-white/5 backdrop-blur-3xl flex gap-1 mb-8 overflow-x-auto no-scrollbar">
                                            <Button
                                                onClick={() => setActiveRepoTab('files')}
                                                className={`flex-1 h-11 flex items-center justify-center gap-2 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest whitespace-nowrap px-6 ${activeRepoTab === 'files'
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                    : 'bg-transparent text-slate-500 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <span>Protocol_Files</span>
                                            </Button>
                                            <Button
                                                onClick={() => setActiveRepoTab('upload')}
                                                className={`flex-1 h-11 flex items-center justify-center gap-2 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest whitespace-nowrap px-6 ${activeRepoTab === 'upload'
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                    : 'bg-transparent text-slate-500 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <span>Transmission_Core</span>
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
                                                    onUploadFiles={uploadFiles}
                                                    isUploading={isLoading}
                                                    onBack={() => selectRepo(null)}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>
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
        </div >
    );
};

export default GitHubDashboard;
