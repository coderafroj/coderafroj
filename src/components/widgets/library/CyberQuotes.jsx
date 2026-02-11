import React, { useState, useEffect } from 'react';
import { Quote, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Architecture is the art of balancing complexity with elegance.",
    "A protocol is only as strong as its weakest node.",
    "Intelligence is the ability to adapt to change."
];

export default function CyberQuotes() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % quotes.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[160px] flex flex-col justify-center relative">
            <div className="absolute top-0 left-0 opacity-10">
                <Quote size={64} className="text-primary-glow" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative z-10 space-y-4"
                >
                    <p className="text-xl md:text-2xl font-black text-white italic leading-tight tracking-tight">
                        "{quotes[index]}"
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-primary/40" />
                        <p className="text-[10px] font-mono text-primary-glow uppercase tracking-[0.3em]">
                            Archive_Source_0{index + 1}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 right-0 p-2 opacity-20">
                <Terminal size={14} />
            </div>
        </div>
    );
}
