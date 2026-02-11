import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = {
    TECH: ["NEURAL_LINK_v4_STABLE", "QUANTUM_ENCRYPTION_LIVE", "BLOCKCHAIN_CORE_DEPLOYED"],
    SPACE: ["MARS_COLONY_UPLINK", "TITAN_MISSION_LAUNCHED", "STAR_MAP_v2_GENERATED"],
    AI: ["AGI_PROTOCOLS_VETTED", "LLM_MATRIX_SYNCED", "NEURAL_SYNAPSE_TUNED"]
};

export default function NewsNode() {
    const [cat, setCat] = useState('TECH');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % categories[cat].length);
        }, 5000);
        return () => clearInterval(interval);
    }, [cat]);

    const nextCat = () => {
        const keys = Object.keys(categories);
        const nextIdx = (keys.indexOf(cat) + 1) % keys.length;
        setCat(keys[nextIdx]);
        setIndex(0);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <Newspaper size={14} className="text-secondary" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">{cat}_Feed</span>
                </div>
                <button
                    onClick={nextCat}
                    className="p-1.5 bg-secondary/10 border border-secondary/20 rounded-md text-[8px] font-black text-secondary uppercase tracking-[0.2em] hover:bg-secondary/20 transition-all active:scale-90"
                >
                    Switch_Protocol
                </button>
            </div>

            <div className="relative h-20 overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={`${cat}-${index}`}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="text-xs font-black text-white italic uppercase tracking-tighter leading-tight"
                    >
                        {categories[cat][index]}
                    </motion.p>
                </AnimatePresence>
                <div className="absolute bottom-2 right-2 text-primary/30">
                    <Sparkles size={12} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                    <span>Source: Reuters_Neural</span>
                    <span>Time: 0.04s ago</span>
                </div>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
                Read_Full_Protocol <ExternalLink size={12} />
            </button>
        </div>
    );
}
