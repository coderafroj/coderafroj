import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle, Loader2, ArrowLeft, Send } from 'lucide-react';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';

const GitHubFileUploader = ({ selectedRepo, onUpload, isUploading, onBack }) => {
    const [file, setFile] = useState(null);
    const [path, setPath] = useState('');
    const [message, setMessage] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);
            if (!path) setPath(droppedFile.name);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            if (!path) setPath(selectedFile.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !path || !message) return;
        try {
            await onUpload(file, path, message);
            setFile(null);
            setPath('');
            setMessage('');
        } catch (err) {
            // Error handled in parent
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
        >
            <div className="flex items-center gap-4 mb-8">
                <Button
                    onClick={onBack}
                    className="p-2 w-10 h-10 bg-[#21262d] hover:bg-[#30363d] rounded-xl border border-[#30363d] flex items-center justify-center transition-all active:scale-95"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Button>
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none">
                        UPLOAD <span className="text-primary italic">CORE</span>
                    </h2>
                    <p className="text-[10px] text-slate-400 font-mono mt-2 uppercase tracking-widest">Target: {selectedRepo.name}</p>
                </div>
            </div>

            <div className="obsidian-card p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    {/* Drop Zone */}
                    <div
                        className={`relative h-64 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 group/drop cursor-pointer ${dragActive ? 'border-primary bg-primary/5' : 'border-[#30363d] bg-[#0d1117] hover:border-primary/40'
                            } ${file ? 'border-green-500/40 bg-green-500/5' : ''}`}
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
                        />
                        {file ? (
                            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-3">
                                <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center border border-green-500/30">
                                    <File className="w-7 h-7 text-green-500" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-white truncate max-w-[250px]">{file.name}</p>
                                    <p className="text-[10px] text-dim-text font-mono uppercase">{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-red-400/10 hover:bg-red-400/20 rounded-lg text-red-400 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/drop:border-primary/50 transition-colors">
                                    <Upload className="w-8 h-8 text-dim-text group-hover/drop:text-primary transition-colors" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-white">CHOOSE OR DRAG FILE</p>
                                    <p className="text-[10px] text-dim-text font-mono uppercase mt-1 tracking-widest">Supports all common formats</p>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-dim-text ml-1">Destination Path</label>
                            <Input
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                placeholder="folder/filename.ext"
                                className="bg-black/40 border-white/5 focus:border-primary/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-dim-text ml-1">Commit Message</label>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="e.g., Update system core logic"
                            className="bg-black/40 border-white/5 focus:border-primary/50 min-h-[100px]"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isUploading || !file || !path || !message}
                        className="w-full h-14 bg-primary hover:bg-primary-glow text-white font-black tracking-widest uppercase text-xs rounded-xl shadow-xl shadow-primary/10 flex items-center justify-center gap-4 group transition-all"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>COMMITTING TO GITHUB...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                <span>PUSH CHANGES TO MASTER</span>
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </motion.div>
    );
};

export default GitHubFileUploader;
