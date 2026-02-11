import { Quote, Sparkles, Terminal, Copy, CheckCircle2 } from 'lucide-react';

export default function CyberQuotes() {
    const [index, setIndex] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!copied) setIndex(prev => (prev + 1) % quotes.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [copied]);

    const handleCopy = () => {
        navigator.clipboard.writeText(quotes[index]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-[180px] flex flex-col justify-center relative group/quote">
            <div className="absolute top-0 left-0 opacity-5 -translate-x-4 -translate-y-4">
                <Quote size={80} className="text-primary-glow" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="relative z-10 space-y-6"
                >
                    <p className="text-xl md:text-2xl font-black text-white italic leading-[1.1] tracking-tighter">
                        "{quotes[index]}"
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-[2px] w-6 bg-primary/40 rounded-full" />
                            <p className="text-[9px] font-mono text-primary-glow uppercase tracking-[0.4em] font-bold">
                                Archive_Source_0{index + 1}
                            </p>
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${copied ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white hover:bg-white/10'}`}
                        >
                            {copied ? (
                                <>
                                    <CheckCircle2 size={12} />
                                    <span className="text-[8px] font-black uppercase tracking-widest">Protocol_Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={12} />
                                    <span className="text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/quote:opacity-100 transition-opacity">Copy_Protocol</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Bottom Branded Metadata */}
            <div className="absolute bottom-0 right-0 py-2 flex items-center gap-2 opacity-20 border-t border-white/5 w-full justify-between">
                <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-slate-500">Node_Auth: Coderafroj_Engine</span>
                <Terminal size={10} className="text-slate-500" />
            </div>
        </div>
    );
}
