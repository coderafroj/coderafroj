import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Folder, File as FileIcon, FileText, FileCode, Image as ImageIcon,
    Film, Archive, Download, Eye, ChevronRight, Search, X, Loader2, Plus, FolderPlus, UploadCloud, Grid, List
} from 'lucide-react';
import { useGitHub } from '../../context/GitHubContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import GitHubMediaShowcase from './GitHubMediaShowcase';

const GitHubFileBrowser = ({ repository, onBack, onUpload }) => {
    const { fetchRepoContents, fetchFileContent, repoContents, currentPath, isLoading, token, user } = useGitHub();
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name'); // name, size, type
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState(null);
    const [viewingFile, setViewingFile] = useState(false);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'media'

    const [owner, repo] = repository.full_name.split('/');

    useEffect(() => {
        // Load repository root contents
        loadContents('');
    }, [repository]);

    const loadContents = async (path) => {
        try {
            await fetchRepoContents(owner, repo, path);
        } catch (err) {
            console.error('Failed to load contents:', err);
        }
    };

    const handleFolderClick = (folderPath) => {
        loadContents(folderPath);
    };

    const handleFileClick = async (file) => {
        setSelectedFile(file);
        setViewingFile(true);

        try {
            const content = await fetchFileContent(owner, repo, file.path);
            setFileContent(content);
        } catch (err) {
            console.error('Failed to load file:', err);
        }
    };

    const handleBreadcrumbClick = (index) => {
        const pathParts = currentPath.split('/').filter(Boolean);
        const newPath = pathParts.slice(0, index + 1).join('/');
        loadContents(newPath);
    };

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;
        setIsCreating(true);
        try {
            const folderPath = currentPath ? `${currentPath}/${newFolderName}` : newFolderName;
            // GitHub doesn't have empty folders, create a .gitkeep
            const [ownerName, repoName] = repository.full_name.split('/');

            await fetch(`https://api.github.com/repos/${repository.full_name}/contents/${folderPath}/.gitkeep`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`, // Assuming token is here or get from context
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Create folder: ${newFolderName}`,
                    content: '', // empty content
                })
            });
            // Re-fetch contents
            await loadContents(currentPath);
            setIsCreatingFolder(false);
            setNewFolderName('');
        } catch (err) {
            console.error('Failed to create folder:', err);
        } finally {
            setIsCreating(false);
        }
    };

    const getFileIcon = (item) => {
        if (item.type === 'dir') {
            return <Folder className="w-5 h-5 text-blue-400" />;
        }

        const ext = item.name.split('.').pop().toLowerCase();

        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'];
        const codeExts = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'go', 'rs', 'php', 'rb', 'swift', 'kt', 'html', 'css'];
        const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
        const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
        const docExts = ['pdf', 'doc', 'docx', 'txt', 'md', 'rtf'];

        if (imageExts.includes(ext)) return <ImageIcon className="w-5 h-5 text-green-400" />;
        if (codeExts.includes(ext)) return <FileCode className="w-5 h-5 text-purple-400" />;
        if (archiveExts.includes(ext)) return <Archive className="w-5 h-5 text-yellow-400" />;
        if (videoExts.includes(ext)) return <Film className="w-5 h-5 text-pink-400" />;
        if (docExts.includes(ext)) return <FileText className="w-5 h-5 text-red-400" />;

        return <FileIcon className="w-5 h-5 text-slate-400" />;
    };

    const formatSize = (bytes) => {
        if (!bytes) return '-';
        if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return bytes + ' B';
    };

    const isImageFile = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'].includes(ext);
    };

    const isPdfFile = (filename) => {
        return filename.toLowerCase().endsWith('.pdf');
    };

    const isCodeFile = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        return ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'go', 'rs', 'php', 'rb', 'swift', 'kt', 'html', 'css', 'json', 'xml', 'yml', 'yaml', 'md'].includes(ext);
    };

    const filteredContents = repoContents.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
        // Folders first
        if (a.type === 'dir' && b.type !== 'dir') return -1;
        if (a.type !== 'dir' && b.type === 'dir') return 1;

        // Then by sortBy
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'size') return (b.size || 0) - (a.size || 0);
        return 0;
    });

    const pathParts = currentPath ? currentPath.split('/').filter(Boolean) : [];

    // File Preview Component
    const FilePreview = () => {
        if (!selectedFile || !fileContent) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => {
                    setViewingFile(false);
                    setSelectedFile(null);
                    setFileContent(null);
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="obsidian-card max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-white/10"
                >
                    {/* Header */}
                    <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            {getFileIcon(selectedFile)}
                            <div className="overflow-hidden">
                                <h3 className="text-base md:text-lg font-bold text-white truncate">{selectedFile.name}</h3>
                                <p className="text-xs text-slate-400">{formatSize(selectedFile.size)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {selectedFile.download_url && (
                                <a
                                    href={selectedFile.download_url}
                                    download
                                    className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors"
                                >
                                    <Download className="w-5 h-5" />
                                </a>
                            )}
                            <Button
                                onClick={() => {
                                    setViewingFile(false);
                                    setSelectedFile(null);
                                    setFileContent(null);
                                }}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg"
                            >
                                <X className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6 overflow-auto max-h-[calc(90vh-100px)]">
                        {isImageFile(selectedFile.name) && selectedFile.download_url ? (
                            <div className="flex items-center justify-center">
                                <img
                                    src={selectedFile.download_url}
                                    alt={selectedFile.name}
                                    className="max-w-full h-auto rounded-lg border border-white/10"
                                />
                            </div>
                        ) : isPdfFile(selectedFile.name) && selectedFile.download_url ? (
                            <div className="w-full h-[600px]">
                                <iframe
                                    src={selectedFile.download_url}
                                    className="w-full h-full rounded-lg border border-white/10"
                                    title={selectedFile.name}
                                />
                            </div>
                        ) : isCodeFile(selectedFile.name) ? (
                            <pre className="bg-black/40 p-4 md:p-6 rounded-xl border border-white/5 overflow-x-auto">
                                <code className="text-xs md:text-sm text-slate-300 font-mono whitespace-pre">
                                    {fileContent.content}
                                </code>
                            </pre>
                        ) : (
                            <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                                <p className="text-sm text-slate-400 mb-4">Preview not available for this file type</p>
                                {selectedFile.download_url && (
                                    <a
                                        href={selectedFile.download_url}
                                        download
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-glow text-white rounded-lg transition-colors text-sm font-bold"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download File
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                    <Button
                        onClick={onBack}
                        className="p-2 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </Button>
                    <div className="overflow-hidden flex-1">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tighter uppercase leading-none truncate">
                            Files <span className="text-primary italic">Browser</span>
                        </h2>
                        <p className="text-[10px] md:text-xs text-slate-500 font-mono mt-1 uppercase tracking-widest truncate">
                            {repository.full_name}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1">
                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 flex-shrink-0">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`h-8 px-3 rounded-lg flex items-center gap-2 transition-all ${viewMode === 'list'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">List</span>
                        </button>
                        <button
                            onClick={() => setViewMode('media')}
                            className={`h-8 px-3 rounded-lg flex items-center gap-2 transition-all ${viewMode === 'media'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Grid className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Media</span>
                        </button>
                    </div>
                    <Button
                        onClick={() => setIsCreatingFolder(true)}
                        className="flex-1 sm:flex-none h-10 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
                    >
                        <FolderPlus className="w-4 h-4 text-blue-400" />
                        <span>New Folder</span>
                    </Button>
                    <Button
                        onClick={onUpload}
                        className="flex-1 sm:flex-none h-10 px-4 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-xl text-[10px] font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
                    >
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload</span>
                    </Button>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="obsidian-card p-3 md:p-4 rounded-2xl border-white/5 bg-white/2">
                <div className="flex items-center gap-2 text-xs md:text-sm overflow-x-auto no-scrollbar scroll-smooth">
                    <button
                        onClick={() => loadContents('')}
                        className="text-primary hover:text-primary-glow font-mono font-black transition-colors flex-shrink-0 flex items-center gap-1.5"
                    >
                        <Folder className="w-3.5 h-3.5" />
                        {repository.name}
                    </button>
                    {pathParts.map((part, index) => (
                        <React.Fragment key={index}>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                            <button
                                onClick={() => handleBreadcrumbClick(index)}
                                className="text-slate-400 hover:text-white font-mono transition-colors flex-shrink-0"
                            >
                                {part}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Conditional View: Media Showcase or File List */}
            {viewMode === 'media' ? (
                <GitHubMediaShowcase
                    items={filteredContents}
                    username={user?.login || ''}
                    currentPath={currentPath}
                    token={token}
                />
            ) : (
                <>
                    {/* Search and Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search files..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-12 h-12 bg-white/2 border-white/5 focus:border-primary/50 rounded-2xl text-sm"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="h-12 px-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-colors outline-none"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="size">Sort by Size</option>
                        </select>
                    </div>

                    {/* File List */}
                    <div className="obsidian-card rounded-[2rem] border-white/5 overflow-hidden">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            </div>
                        ) : filteredContents.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {filteredContents.map((item, index) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.02 }}
                                        onClick={() => item.type === 'dir' ? handleFolderClick(item.path) : handleFileClick(item)}
                                        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-white/5 cursor-pointer transition-all group active:scale-[0.99]"
                                    >
                                        <div className="flex-shrink-0">
                                            {getFileIcon(item)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm md:text-base font-semibold text-white truncate group-hover:text-primary transition-colors">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-slate-500 font-mono">{formatSize(item.size)}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {item.type === 'dir' ? (
                                                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <Folder className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400 font-mono text-sm">No files found</p>
                            </div>
                        )}
                    </div>

                    {/* File Preview Modal */}
                    <AnimatePresence>
                        {viewingFile && <FilePreview />}
                    </AnimatePresence>
                </>
            )}

            {/* Create Folder Modal */}
            <AnimatePresence>
                {isCreatingFolder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsCreatingFolder(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="obsidian-card max-w-md w-full p-6 rounded-3xl border border-white/10"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-2xl">
                                    <FolderPlus className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Create Folder</h3>
                                    <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">In: {currentPath || 'Root'}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    placeholder="Enter folder name..."
                                    value={newFolderName}
                                    onChange={(e) => setNewFolderName(e.target.value)}
                                    autoFocus
                                    className="bg-black/40 border-white/10 focus:border-blue-400/50 h-12 rounded-2xl"
                                />
                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => setIsCreatingFolder(false)}
                                        className="flex-1 h-12 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleCreateFolder}
                                        disabled={!newFolderName.trim() || isCreating}
                                        className="flex-2 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 disabled:opacity-50"
                                    >
                                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Create Folder'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default GitHubFileBrowser;
