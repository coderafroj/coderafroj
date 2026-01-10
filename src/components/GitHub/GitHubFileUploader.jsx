import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle, Loader2, ArrowLeft, Send, FileText, Image, FileCode, Archive, Film } from 'lucide-react';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';

const GitHubFileUploader = ({ selectedRepo, onUpload, isUploading, onBack }) => {
    const [file, setFile] = useState(null);
    const [path, setPath] = useState('');
    const [message, setMessage] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    // Max file size: 100MB
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateFile = (file) => {
        setUploadError('');

        if (!file) {
            setUploadError('No file selected');
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            setUploadError(`File size exceeds 100MB limit. Your file is ${formatFileSize(file.size)}`);
            return false;
        }

        return true;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
                if (!path) setPath(droppedFile.name);
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
                if (!path) setPath(selectedFile.name);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !path || !message) return;

        if (!validateFile(file)) return;

        try {
            setUploadError('');
            await onUpload(file, path, message);
            setFile(null);
            setPath('');
            setMessage('');
        } catch (err) {
            setUploadError(err.message || 'Upload failed. Please try again.');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes >= 1024 * 1024) {
            return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        }
        return (bytes / 1024).toFixed(2) + ' KB';
    };

    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();

        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'];
        const codeExts = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'go', 'rs', 'php', 'rb', 'swift', 'kt'];
        const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
        const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
        const docExts = ['pdf', 'doc', 'docx', 'txt', 'md', 'rtf'];

        if (imageExts.includes(ext)) return <Image className="w-6 h-6 md:w-7 md:h-7 text-green-500" />;
        if (codeExts.includes(ext)) return <FileCode className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />;
        if (archiveExts.includes(ext)) return <Archive className="w-6 h-6 md:w-7 md:h-7 text-yellow-500" />;
        if (videoExts.includes(ext)) return <Film className="w-6 h-6 md:w-7 md:h-7 text-purple-500" />;
        if (docExts.includes(ext)) return <FileText className="w-6 h-6 md:w-7 md:h-7 text-red-500" />;

        return <File className="w-6 h-6 md:w-7 md:h-7 text-green-500" />;
    };

    const getFileTypeColor = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();

        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'];
        const codeExts = ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'go', 'rs', 'php', 'rb', 'swift', 'kt'];
        const archiveExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
        const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];

        if (imageExts.includes(ext)) return 'border-green-500/30 bg-green-500/5';
        if (codeExts.includes(ext)) return 'border-blue-500/30 bg-blue-500/5';
        if (archiveExts.includes(ext)) return 'border-yellow-500/30 bg-yellow-500/5';
        if (videoExts.includes(ext)) return 'border-purple-500/30 bg-purple-500/5';

        return 'border-green-500/30 bg-green-500/5';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto"
        >
            {/* Header with Back Button - Mobile Optimized */}
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <Button
                    onClick={onBack}
                    className="p-2 w-10 h-10 md:w-11 md:h-11 bg-[#21262d] hover:bg-[#30363d] rounded-xl border border-[#30363d] flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Button>
                <div className="overflow-hidden">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tighter uppercase leading-none truncate">
                        UPLOAD <span className="text-primary italic">CORE</span>
                    </h2>
                    <p className="text-[10px] md:text-xs text-slate-400 font-mono mt-1 md:mt-2 uppercase tracking-widest truncate">
                        Target: {selectedRepo.name}
                    </p>
                </div>
            </div>

            {/* Repository Info Card - Mobile Optimized */}
            <div className="obsidian-card p-4 md:p-5 rounded-xl border border-primary/20 bg-primary/5 mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 md:p-2.5 bg-primary/20 rounded-lg border border-primary/30">
                        <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <div className="overflow-hidden flex-1">
                        <h3 className="text-sm md:text-base font-bold text-white truncate">{selectedRepo.name}</h3>
                        <p className="text-[10px] md:text-xs text-slate-400 truncate">
                            {selectedRepo.description || 'No description'}
                        </p>
                    </div>
                    {selectedRepo.private ? (
                        <span className="px-2 md:px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-[9px] md:text-[10px] font-mono text-yellow-500 uppercase flex-shrink-0">
                            Private
                        </span>
                    ) : (
                        <span className="px-2 md:px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-md text-[9px] md:text-[10px] font-mono text-green-500 uppercase flex-shrink-0">
                            Public
                        </span>
                    )}
                </div>
            </div>

            {/* File Size Info */}
            <div className="obsidian-card p-3 md:p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 mb-6">
                <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-xs md:text-sm font-bold text-white mb-1">Advanced File Upload</p>
                        <p className="text-[10px] md:text-xs text-slate-400">
                            Supports all file types including PDF, images (JPG, PNG, SVG), archives (ZIP, RAR), videos, documents, and code files
                        </p>
                        <p className="text-[9px] md:text-[10px] text-blue-400 mt-2 font-mono">
                            ✓ Maximum file size: <span className="font-bold">100 MB</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="obsidian-card p-5 md:p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                    {/* Drop Zone - Mobile Optimized */}
                    <div
                        className={`relative h-48 md:h-64 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 md:gap-4 group/drop cursor-pointer touch-manipulation ${dragActive ? 'border-primary bg-primary/5' : 'border-[#30363d] bg-[#0d1117] hover:border-primary/40'
                            } ${file ? getFileTypeColor(file.name) : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="*/*"
                        />
                        {file ? (
                            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-3">
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border ${getFileTypeColor(file.name)}`}>
                                    {getFileIcon(file.name)}
                                </div>
                                <div className="text-center px-4">
                                    <p className="text-sm md:text-base font-bold text-white truncate max-w-[220px] md:max-w-[300px]">{file.name}</p>
                                    <p className="text-[10px] md:text-xs text-dim-text font-mono uppercase mt-1">{formatFileSize(file.size)}</p>
                                    <div className="mt-2">
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[200px] mx-auto">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all"
                                                style={{ width: `${Math.min((file.size / MAX_FILE_SIZE) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <p className="text-[9px] text-slate-500 mt-1">
                                            {Math.min((file.size / MAX_FILE_SIZE) * 100, 100).toFixed(1)}% of max size
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                        setUploadError('');
                                    }}
                                    className="absolute top-3 md:top-4 right-3 md:right-4 p-2 md:p-2.5 bg-red-400/10 hover:bg-red-400/20 rounded-lg text-red-400 transition-colors touch-manipulation"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/drop:border-primary/50 transition-colors">
                                    <Upload className="w-7 h-7 md:w-8 md:h-8 text-dim-text group-hover/drop:text-primary transition-colors" />
                                </div>
                                <div className="text-center px-4">
                                    <p className="text-sm md:text-base font-bold text-white">TAP OR DRAG FILE</p>
                                    <p className="text-[10px] md:text-xs text-dim-text font-mono uppercase mt-1 tracking-widest">
                                        All file types • Up to 100 MB
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {uploadError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-3 md:p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs md:text-sm font-bold text-red-500">Upload Error</p>
                                    <p className="text-[10px] md:text-xs text-red-400 mt-1">{uploadError}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form Fields - Mobile Optimized Stack */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-dim-text ml-1">
                                Destination Path
                            </label>
                            <Input
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                placeholder="folder/filename.ext"
                                className="bg-black/40 border-white/5 focus:border-primary/50 h-11 md:h-12 text-sm md:text-base"
                            />
                            <p className="text-[9px] md:text-[10px] text-slate-500 ml-1">Example: docs/guide.pdf or images/hero.jpg</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-dim-text ml-1">
                                Commit Message
                            </label>
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="e.g., Add new documentation PDF or Upload hero image"
                                className="bg-black/40 border-white/5 focus:border-primary/50 min-h-[80px] md:min-h-[100px] text-sm md:text-base"
                            />
                            <p className="text-[9px] md:text-[10px] text-slate-500 ml-1">Describe what you're uploading</p>
                        </div>
                    </div>

                    {/* Submit Button - Mobile Optimized */}
                    <Button
                        type="submit"
                        disabled={isUploading || !file || !path || !message || !!uploadError}
                        className="w-full h-12 md:h-14 bg-primary hover:bg-primary-glow text-white font-black tracking-widest uppercase text-xs md:text-sm rounded-xl shadow-xl shadow-primary/10 flex items-center justify-center gap-3 md:gap-4 group transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                                <span className="hidden sm:inline">COMMITTING TO GITHUB...</span>
                                <span className="sm:hidden">UPLOADING...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                <span className="hidden sm:inline">PUSH CHANGES TO {selectedRepo.default_branch || 'MAIN'}</span>
                                <span className="sm:hidden">PUSH CHANGES</span>
                            </>
                        )}
                    </Button>
                </form>
            </div>

            {/* Mobile Helper Text */}
            <div className="mt-4 md:mt-6 text-center space-y-2">
                <p className="text-[10px] md:text-xs text-slate-500 font-mono">
                    Files will be committed to <span className="text-primary">{selectedRepo.default_branch || 'main'}</span> branch
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] text-slate-600">
                    <span>Supported:</span>
                    <span className="px-2 py-0.5 bg-green-500/10 rounded">Images</span>
                    <span className="px-2 py-0.5 bg-red-500/10 rounded">PDFs</span>
                    <span className="px-2 py-0.5 bg-blue-500/10 rounded">Code</span>
                    <span className="px-2 py-0.5 bg-yellow-500/10 rounded">Archives</span>
                    <span className="px-2 py-0.5 bg-purple-500/10 rounded">Videos</span>
                    <span className="px-2 py-0.5 bg-white/10 rounded">& More</span>
                </div>
            </div>
        </motion.div>
    );
};

export default GitHubFileUploader;
