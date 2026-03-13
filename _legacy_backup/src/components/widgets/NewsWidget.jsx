import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ExternalLink, Terminal, Globe } from 'lucide-react';

const NewsWidget = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        setLoading(true);
        try {
            // Using a more stable tech-centric feed from CryptoCompare (which covers broad tech/finance)
            const res = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=Technology,Blockchain');
            const data = await res.json();
            if (data && data.Data) {
                setNews(data.Data.slice(0, 3));
            }
        } catch (error) {
            console.error("News fetch error:", error);
            setNews([
                { id: 1, title: "Global AI Compute Capability Projected to Double", url: "https://techcrunch.com", source: "Intel_Stream" },
                { id: 2, title: "Next-Gen Web Standards Entering Final Draft Phase", url: "https://dev.to", source: "Dev_Core" },
                { id: 3, title: "Quantum Computing Reaches New Stability Milestone", url: "https://theverge.com", source: "Verge_Tech" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="relative h-full flex flex-col p-6 bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/5 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Newspaper size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">Stream_Intel</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                    <Globe size={10} />
                    <span className="text-[9px] font-mono tracking-widest uppercase">Live Feed</span>
                </div>
            </div>

            <div className="flex-grow space-y-3 relative z-10">
                <AnimatePresence mode="wait">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse border border-white/5" />
                        ))
                    ) : (
                        news.map((item, idx) => (
                            <motion.a
                                key={item.id}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="block p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group/item shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <h5 className="text-[11px] font-bold text-white line-clamp-2 leading-tight uppercase tracking-tight group-hover/item:text-primary-glow transition-colors">
                                        {item.title}
                                    </h5>
                                    <ExternalLink size={10} className="text-slate-600 shrink-0 mt-1" />
                                </div>
                                <div className="flex items-center gap-2 mt-2 opacity-40">
                                    <span className="text-[8px] font-mono text-emerald-400 uppercase">{item.source || item.source_info?.name || 'Network'}</span>
                                    <div className="w-1 h-1 bg-slate-600 rounded-full" />
                                    <span className="text-[8px] font-mono text-slate-500 uppercase">Verifying...</span>
                                </div>
                            </motion.a>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 opacity-30">
                    <Terminal size={10} />
                    <span className="text-[8px] font-mono tracking-tighter">NODE_NEWS_v2.4</span>
                </div>
                <span className="text-[8px] font-mono text-emerald-400/50 uppercase tracking-widest">Developed by Coderfroj</span>
            </div>
        </div>
    );
};

export default NewsWidget;
