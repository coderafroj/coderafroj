import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Image as ImageIcon, AlertCircle } from 'lucide-react';

const MissionHeadModal = ({ isOpen, onClose, onInitialize }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Mission title is required.');
            return;
        }
        onInitialize({ title, image });
        setTitle('');
        setImage('');
        setError('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px]" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-sky-500 rounded-2xl text-black shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                                        <Rocket size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black uppercase italic text-white tracking-tight">Initialize Mission</h3>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-sky-500 mt-1">Strategic Content Setup</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-3 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 block mb-3 ml-2">Mission Title</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-slate-700 text-lg font-bold uppercase italic"
                                        placeholder="E.G. DATA_STRUCTURES_CORE"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 block mb-3 ml-2">Mission Cover Image (URL)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-700">
                                            <ImageIcon size={20} />
                                        </div>
                                        <input
                                            type="url"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-8 text-white focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-slate-700 text-sm"
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                    <div className="mt-4 flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                                        <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                        <p className="text-[10px] text-amber-500/80 font-medium leading-relaxed uppercase tracking-wider">
                                            Architecture Alert: Ensure image size is under <span className="text-amber-500 font-black">50KB</span> for optimal transmission throughput.
                                        </p>
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>
                                )}

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-6 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-sky-500 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] active:scale-95"
                                    >
                                        Execute Initialization
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MissionHeadModal;
