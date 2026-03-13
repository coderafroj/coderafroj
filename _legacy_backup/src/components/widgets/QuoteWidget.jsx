import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, RefreshCw, Terminal } from 'lucide-react';

const QuoteWidget = () => {
    const [quote, setQuote] = useState({ text: "The object of art is not to reproduce reality, but to create a reality of the same intensity.", author: "Alberto Giacometti" });
    const [loading, setLoading] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            // Using zenquotes.io as another stable source or quotable
            const response = await fetch('https://api.quotable.io/random?tags=technology,motivational,famous-quotes');
            if (response.ok) {
                const data = await response.json();
                setQuote({ text: data.content, author: data.author });
            } else {
                throw new Error("API Limit");
            }
        } catch (error) {
            console.warn("Quote API limit/error, using architectural fallbacks.");
            const fallbacks = [
                { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
                { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
                { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
                { text: "Real programmers don't document. If it was hard to write, it should be hard to understand.", author: "Unknown Operator" },
                { text: "The most impactful systems are those that disappear into the background.", author: "Systems Analyst" }
            ];
            setQuote(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
        } finally {
            setTimeout(() => setLoading(false), 500); // Smooth transition
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="relative h-full flex flex-col p-6 bg-black/60 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden group">
            {/* Ambient Pulse Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/30 transition-all duration-1000 animate-pulse" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-inner">
                        <Quote size={14} className="text-primary-glow" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-primary-glow uppercase">Insight_Node</span>
                </div>
                <button
                    onClick={fetchQuote}
                    disabled={loading}
                    className={`p-2 rounded-full hover:bg-white/10 transition-all active:scale-95 ${loading ? 'animate-spin opacity-50' : ''}`}
                    title="Refresh Node"
                >
                    <RefreshCw size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                </button>
            </div>

            <div className="flex-grow flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={quote.text}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <p className="text-xl font-bold text-white/95 leading-tight tracking-tight italic">
                            "{quote.text}"
                        </p>
                        <div className="flex items-center gap-3 opacity-60">
                            <div className="w-6 h-[1px] bg-primary-glow" />
                            <span className="text-[10px] font-mono text-primary-glow uppercase tracking-widest">{quote.author}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 opacity-30">
                    <Terminal size={10} />
                    <span className="text-[8px] font-mono tracking-tighter uppercase">Protocol_Intel_v1.2</span>
                </div>
                <span className="text-[8px] font-mono text-primary-glow/50 uppercase tracking-widest font-bold">Developed by Coderfroj</span>
            </div>
        </div>
    );
};

export default QuoteWidget;
