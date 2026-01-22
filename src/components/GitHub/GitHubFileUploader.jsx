import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File as FileIcon, X, CheckCircle, AlertCircle, Loader2, ArrowLeft, Send, FileText, Image, FileCode, Archive, Film, Terminal } from 'lucide-react';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';

import { useGitHub } from '../../context/GitHubContext';

const GitHubFileUploader = ({ selectedRepo, onUploadFiles, isUploading, onBack }) => {
    const { currentPath } = useGitHub();
    const [files, setFiles] = useState([]);
    const [targetPath, setTargetPath] = useState(currentPath || '');
    const [message, setMessage] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [isCompressing, setIsCompressing] = useState(false);
    const [compressionProgress, setCompressionProgress] = useState(0);
    const fileInputRef = useRef(null);

    const MAX_DIRECT_SIZE = 25 * 1024 * 1024;
    const MAX_FILE_SIZE = 150 * 1024 * 1024;

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const addFilesToList = (newFiles) => {
        setUploadError('');
        const validFiles = Array.from(newFiles).filter(file => {
            if (file.size > MAX_FILE_SIZE) {
                setUploadError(`File "${file.name}" exceeds 150MB limit.`);
                return false;
            }
            return true;
        });

        const newEntries = validFiles.map(f => ({
            file: f,
            path: targetPath ? `${targetPath}/${f.name}` : f.name,
            id: Math.random().toString(36).substr(2, 9)
        }));

        setFiles(prev => [...prev, ...newEntries]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files) addFilesToList(e.dataTransfer.files);
    };

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const updateFilePath = (id, newPath) => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, path: newPath } : f));
    };

    const compressFile = async (originalFile) => {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        zip.file(originalFile.name, originalFile);
        const content = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
        return new File([content], `${originalFile.name}.zip`, { type: 'application/zip' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0 || !message) return;

        try {
            setUploadError('');
            setIsCompressing(true);
            const processedFiles = [];

            for (let i = 0; i < files.length; i++) {
                setCompressionProgress(Math.round((i / files.length) * 100));
                let fileToUpload = files[i].file;
                let pathToUpload = files[i].path;

                if (fileToUpload.size > MAX_DIRECT_SIZE) {
                    fileToUpload = await compressFile(fileToUpload);
                    pathToUpload = pathToUpload.endsWith('.zip') ? pathToUpload : `${pathToUpload}.zip`;
                }
                processedFiles.push({ file: fileToUpload, path: pathToUpload });
            }

            setIsCompressing(false);
            await onUploadFiles(processedFiles, message);
            setFiles([]);
            setMessage('');
        } catch (err) {
            setUploadError(err.message || 'System error during transmission.');
            setIsCompressing(false);
        }
    };

    const formatSize = (bytes) => {
        if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        return (bytes / 1024).toFixed(1) + ' KB';
    };

    return (
        <div className="space-y-8 fade-slide-up">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Side: Controls */}
                <div className="w-full lg:w-80 space-y-6 shrink-0 order-2 lg:order-1">
                    <motion.div
                        onDragOver={handleDrag}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`obsidian-card p-10 rounded-[2.5rem] border-2 border-dashed transition-all group cursor-pointer text-center relative overflow-hidden ${dragActive ? 'border-primary bg-primary/10' : 'border-white/5 hover:border-primary/50 bg-white/2'
                            }`}
                    >
                        <input type="file" multiple className="hidden" ref={fileInputRef} onChange={(e) => addFilesToList(e.target.files)} />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                                <Upload className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">Add Files</h3>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Drag & Drop or Browse</p>
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Target Folder</label>
                            <Input
                                value={targetPath}
                                onChange={(e) => setTargetPath(e.target.value)}
                                placeholder="e.g. photos/holiday"
                                className="bg-black/40 border-white/5 rounded-2xl text-[11px] h-12 font-bold focus:border-primary/50"
                            />
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Commit Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="What changes are you making?"
                                className="w-full h-32 p-5 bg-black/40 border-white/5 rounded-[2rem] text-[11px] text-white placeholder:text-slate-800 focus:border-primary/50 transition-all outline-none resize-none font-bold"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        disabled={files.length === 0 || !message || isUploading || isCompressing}
                        className="w-full h-16 bg-primary hover:bg-primary-glow text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transition-all flex items-center justify-center"
                    >
                        {isUploading || isCompressing ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Upload {files.length} Files</span>}
                    </Button>

                    <Button onClick={onBack} variant="ghost" className="w-full h-12 text-slate-500 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors">
                        Back to Repository
                    </Button>
                </div>

                {/* Right Side: List */}
                <div className="flex-1 w-full space-y-6 order-1 lg:order-2">
                    <div className="obsidian-card p-1 rounded-[3rem] border-white/5 bg-white/2 min-h-[300px] lg:min-h-[500px] flex flex-col">
                        <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5 mx-2">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl">
                                    <FileCode className="w-5 h-5 text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">Upload Queue</h3>
                                    <p className="text-[10px] text-primary font-mono font-bold uppercase tracking-widest">{files.length} files staged</p>
                                </div>
                            </div>
                            {files.length > 0 && (
                                <button onClick={() => setFiles([])} className="text-[9px] font-black text-red-500/50 hover:text-red-500 uppercase tracking-[0.2em] transition-colors">Clear Queue</button>
                            )}
                        </div>

                        <div className="flex-1 p-6 space-y-3 overflow-y-auto no-scrollbar max-h-[550px]">
                            {files.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-20">
                                    <Terminal className="w-16 h-16 mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Queue is offline</p>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {files.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="p-4 bg-white/2 border border-white/5 rounded-2xl flex items-center gap-4 group hover:border-primary/30 transition-all"
                                        >
                                            <div className="p-3 bg-black/40 rounded-xl group-hover:text-primary transition-colors">
                                                {item.file.type.includes('image') ? <Image className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <input
                                                    value={item.path}
                                                    onChange={(e) => updateFilePath(item.id, e.target.value)}
                                                    className="w-full bg-transparent text-[11px] font-bold text-white outline-none border-b border-white/0 focus:border-primary/50 transition-all pb-1 mb-1"
                                                />
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{formatSize(item.file.size)}</span>
                                                    {item.file.size > MAX_DIRECT_SIZE && (
                                                        <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-[7px] font-black text-yellow-500 uppercase tracking-widest">Comp_Req</span>
                                                    )}
                                                </div>
                                            </div>
                                            <button onClick={() => removeFile(item.id)} className="p-2 text-slate-700 hover:text-red-500 transition-colors">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Progress Bar */}
                        {(isUploading || isCompressing) && (
                            <div className="px-8 pb-8">
                                <div className="p-6 bg-primary/5 border border-primary/20 rounded-[2rem] space-y-3">
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
                                        <span className="text-primary">{isCompressing ? 'Synthesizing data' : 'Transmitting core'}</span>
                                        <span className="text-white">{isCompressing ? `${compressionProgress}%` : 'LINK_ESTABLISHED'}</span>
                                    </div>
                                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: isCompressing ? `${compressionProgress}%` : '95%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {uploadError && (
                            <div className="px-8 pb-8">
                                <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center gap-4 text-red-500">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed">{uploadError}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Simple footer note */}
            <div className="text-center pt-10 border-t border-white/5">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                    Maximum file size: 150MB • Batch processing enabled
                </p>
            </div>
        </div>
    );
};

export default GitHubFileUploader;
