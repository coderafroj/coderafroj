import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Zap } from 'lucide-react';

export default function WidgetWrapper({ children, title, isLocked = false, onUnlock, category = "Alpha" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="saas-card relative group overflow-hidden border-white/5 bg-white/[0.02]"
        >
            {/* Decorative Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{category}_Node_CODERAFROJ</span>
                    </div>
                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter group-hover:text-primary-glow transition-colors">
                        {title}
                    </h3>
                </div>
                {isLocked ? (
                    <div className="p-3 bg-red-500/10 rounded-2xl text-red-400 border border-red-500/20">
                        <Lock size={18} />
                    </div>
                ) : (
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-[8px] font-black text-primary-glow border border-primary/20 uppercase tracking-widest">
                        Free_Branded
                    </div>
                )}
            </div>

            {/* Content area with Watermark Logic */}
            <div className="relative overflow-hidden">
                {/* The CoderAfroj Watermark - Visible if not purchased */}
                {!isLocked && (
                    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
                        <span className="text-4xl font-black uppercase tracking-[0.5em] rotate-12">CODERAFROJ</span>
                    </div>
                )}

                <div className={`relative z-10 transition-all duration-700 ${isLocked ? 'blur-md grayscale pointer-events-none opacity-40' : 'opacity-100'}`}>
                    {children}
                </div>
            </div>

            {/* Unlock Overlay */}
            {isLocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileHover={{ scale: 1 }}
                        className="text-center space-y-4"
                    >
                        <div className="flex justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Zap size={24} className="text-primary-glow" />
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Professional Deployment</p>
                            <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mt-1">Remove CoderAfroj Branding</p>
                        </div>
                        <button
                            onClick={onUnlock}
                            className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95"
                        >
                            Unlock Setup
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Footer Decoration */}
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[6px] font-mono text-slate-600 uppercase tracking-[0.3em]">Node_Auth: CoderAfroj_Engine</span>
                    <span className="text-[5px] font-mono text-primary/40 uppercase tracking-widest">Digital_Architect_Verified</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-slate-800" />
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
}
