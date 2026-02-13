import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw, Terminal } from 'lucide-react';

const QuoteWidget = () => {
    const [quote, setQuote] = useState({ text: "The only way to do great work is to love what you do.", author: "Steve Jobs" });
    const [loading, setLoading] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            // Using a free, no-key API
            const response = await fetch('https://api.quotable.io/random?tags=technology,motivational');
            if (response.ok) {
                const data = await response.json();
                setQuote({ text: data.content, author: data.author });
            }
        } catch (error) {
            console.error("Failed to fetch quote:", error);
            // Fallback quotes
            const fallbacks = [
                { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
                { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
                { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" }
            ];
            setQuote(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="relative h-full flex flex-col p-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group">
            {/* Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Quote size={14} className="text-primary-glow" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-primary-glow uppercase">Insight_Node</span>
                </div>
                <button
                    onClick={fetchQuote}
                    disabled={loading}
                    className={`p-2 rounded-full hover:bg-white/5 transition-all active:scale-90 ${loading ? 'animate-spin opacity-50' : ''}`}
                >
                    <RefreshCw size={14} className="text-slate-400" />
                </button>
            </div>

            <div className="flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={quote.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <p className="text-lg font-medium text-white/90 leading-relaxed italic">
                            "{quote.text}"
                        </p>
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-4 h-[1px] bg-primary" />
                            <span className="text-xs font-mono text-primary-glow">{quote.author}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 opacity-30">
                    <Terminal size={10} />
                    <span className="text-[8px] font-mono tracking-tighter">PROTO_QUOTE_v1.0</span>
                </div>
                <span className="text-[8px] font-mono text-primary-glow/50 uppercase tracking-widest">Developed by Coderfroj</span>
            </div>
        </div>
    );
};

export default QuoteWidget;
