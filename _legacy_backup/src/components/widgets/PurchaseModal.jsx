import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ShieldCheck, Cpu, CreditCard, Sparkles } from 'lucide-react';

export default function PurchaseModal({ isOpen, onClose, widgetName }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg obsidian-card !rounded-[2.5rem] border-white/10 p-10 overflow-hidden shadow-[0_0_100px_rgba(47,129,247,0.2)]"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />

                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-500 hover:text-white"
                    >
                        <X size={16} />
                    </button>

                    <header className="mb-8 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-glow border border-primary/30">
                            <Zap size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter text-primary-glow">White_Label_License</h2>
                            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-1">Setup: {widgetName || 'ELITE_NODE_v4'}</p>
                        </div>
                    </header>

                    <div className="space-y-6">
                        <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl space-y-4">
                            <div className="flex justify-between items-center text-white">
                                <span className="text-sm font-bold uppercase tracking-tight">Access Protocol</span>
                                <span className="text-xl font-black italic">$29.00</span>
                            </div>
                            <div className="space-y-2">
                                {[
                                    'Remove All "CoderAfroj" Watermarks',
                                    'Professional Custom Branding',
                                    'Deploy on Unlimited Client Sites',
                                    'Direct API Uplink (High Speed)',
                                    'Commercial Usage Node Certificate'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-500">
                                        <ShieldCheck size={14} className="text-primary" />
                                        <span className="text-[10px] font-mono tracking-wider uppercase">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 p-5 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all shadow-xl">
                                <CreditCard size={16} /> Get_Pro
                            </button>
                            <button className="flex items-center justify-center gap-3 p-5 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                                <Cpu size={16} /> Crypto_Buy
                            </button>
                        </div>
                    </div>

                    <footer className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-40">
                        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Secured by CodeRafroj_Guard_v2.0</span>
                        <Sparkles size={12} className="text-slate-600" />
                    </footer>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
