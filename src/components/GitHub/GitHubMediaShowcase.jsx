import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Heart, Image as ImageIcon, Film, Maximize2, Play, Pause } from 'lucide-react';
import { Button } from '../ui/Button';

import AuthenticatedImage from './AuthenticatedImage';

const GitHubMediaShowcase = ({ items = [], username = '', currentPath = '', token = null }) => {
    const [lightboxMedia, setLightboxMedia] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [playingVideo, setPlayingVideo] = useState(null);

    // Check if user is coderinnu for special theme
    const isCoderinnu = username.toLowerCase() === 'coderinnu';

    // Filter only media files
    const mediaFiles = items.filter(item => {
        if (item.type === 'dir') return false;
        const ext = item.name.split('.').pop().toLowerCase();
        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
        const videoExts = ['mp4', 'webm', 'mov', 'avi', 'mkv'];
        return imageExts.includes(ext) || videoExts.includes(ext);
    });

    const isVideo = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        return ['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext);
    };

    const isImage = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext);
    };

    const openLightbox = (media, index) => {
        setLightboxMedia(media);
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxMedia(null);
        setPlayingVideo(null);
    };

    const navigateLightbox = (direction) => {
        const newIndex = direction === 'next'
            ? (lightboxIndex + 1) % mediaFiles.length
            : (lightboxIndex - 1 + mediaFiles.length) % mediaFiles.length;
        setLightboxIndex(newIndex);
        setLightboxMedia(mediaFiles[newIndex]);
        setPlayingVideo(null);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!lightboxMedia) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') navigateLightbox('next');
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [lightboxMedia, lightboxIndex]);

    if (mediaFiles.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="obsidian-card p-20 rounded-3xl border-white/5 text-center"
            >
                <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Media Files</h3>
                <p className="text-slate-400 text-sm font-mono">This folder doesn't contain any photos or videos</p>
            </motion.div>
        );
    }

    return (
        <>
            {/* Special Header for coderinnu */}
            {isCoderinnu && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-red-500/10 border border-pink-500/20 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyMDQsIDIyOSwgMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/50 animate-pulse">
                            <Heart className="w-8 h-8 text-white fill-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-red-400 tracking-tighter uppercase">
                                Our Love Story 💕
                            </h2>
                            <p className="text-sm text-pink-300/80 font-mono mt-1">
                                Special Collection • {mediaFiles.length} precious memories
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Standard Header */}
            {!isCoderinnu && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 pb-4 border-b border-white/5"
                >
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                        Media <span className="text-primary italic">Gallery</span>
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-widest">
                        {mediaFiles.length} files found
                    </p>
                </motion.div>
            )}

            {/* Masonry Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {mediaFiles.map((media, index) => (
                    <motion.div
                        key={media.path}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group relative rounded-2xl overflow-hidden cursor-pointer ${isCoderinnu
                            ? 'border-2 border-pink-500/20 hover:border-pink-500/50 shadow-lg shadow-pink-500/10'
                            : 'border border-white/10 hover:border-primary/50'
                            } transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                        onClick={() => openLightbox(media, index)}
                    >
                        {/* Media Preview */}
                        <div className="aspect-square bg-black/40 relative overflow-hidden">
                            {isImage(media.name) && media.download_url && (
                                <AuthenticatedImage
                                    src={media.download_url}
                                    alt={media.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    token={token}
                                    apiUrl={media.api_url}
                                />
                            )}
                            {isVideo(media.name) && (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                                    <Film className={`w-16 h-16 ${isCoderinnu ? 'text-pink-400' : 'text-primary'} opacity-60`} />
                                </div>
                            )}

                            {/* Overlay */}
                            <div className={`absolute inset-0 ${isCoderinnu
                                ? 'bg-gradient-to-t from-pink-900/90 via-pink-900/40 to-transparent'
                                : 'bg-gradient-to-t from-black/90 via-black/40 to-transparent'
                                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white font-semibold text-sm truncate mb-1">{media.name}</p>
                                    <div className="flex items-center gap-2">
                                        {isVideo(media.name) && (
                                            <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${isCoderinnu
                                                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                                                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                }`}>
                                                Video
                                            </span>
                                        )}
                                        <span className="text-[10px] text-white/60 font-mono">
                                            {(media.size / 1024).toFixed(0)} KB
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <Maximize2 className={`w-5 h-5 ${isCoderinnu ? 'text-pink-300' : 'text-primary'}`} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        {/* Navigation Arrows */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-10"
                        >
                            <span className="text-white text-2xl">‹</span>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-10"
                        >
                            <span className="text-white text-2xl">›</span>
                        </button>

                        {/* Content */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-7xl w-full max-h-[90vh] flex flex-col"
                        >
                            {/* Header */}
                            <div className={`p-4 md:p-6 flex items-center justify-between mb-4 rounded-t-3xl ${isCoderinnu
                                ? 'bg-gradient-to-r from-pink-900/50 to-purple-900/50 border border-pink-500/20'
                                : 'bg-white/5 border border-white/10'
                                }`}>
                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                    {isCoderinnu && <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />}
                                    <div className="overflow-hidden">
                                        <h3 className="text-lg font-bold text-white truncate">{lightboxMedia.name}</h3>
                                        <p className="text-xs text-slate-400 font-mono">
                                            {lightboxIndex + 1} / {mediaFiles.length}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {lightboxMedia.download_url && (
                                        <a
                                            href={lightboxMedia.download_url}
                                            download
                                            onClick={(e) => e.stopPropagation()}
                                            className={`p-2 rounded-xl transition-colors ${isCoderinnu
                                                ? 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-400'
                                                : 'bg-primary/10 hover:bg-primary/20 text-primary'
                                                }`}
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    )}
                                    <button
                                        onClick={closeLightbox}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Media Display */}
                            <div className="flex-1 flex items-center justify-center">
                                {isImage(lightboxMedia.name) && lightboxMedia.download_url && (
                                    <AuthenticatedImage
                                        src={lightboxMedia.download_url}
                                        alt={lightboxMedia.name}
                                        className={`max-w-full max-h-[calc(90vh-120px)] object-contain rounded-2xl ${isCoderinnu ? 'shadow-2xl shadow-pink-500/20' : 'shadow-2xl'
                                            }`}
                                        token={token}
                                        apiUrl={lightboxMedia.api_url}
                                    />
                                )}
                                {isVideo(lightboxMedia.name) && lightboxMedia.download_url && (
                                    <video
                                        src={lightboxMedia.download_url}
                                        controls
                                        autoPlay
                                        className={`max-w-full max-h-[calc(90vh-120px)] rounded-2xl ${isCoderinnu ? 'shadow-2xl shadow-pink-500/20' : 'shadow-2xl'
                                            }`}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GitHubMediaShowcase;
