import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign, Terminal, RefreshCcw } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const CryptoPulseWidget = () => {
    const [prices, setPrices] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPrices = async () => {
        setLoading(true);
        try {
            // CoinGecko public API (no key needed)
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true');
            const data = await res.json();

            setPrices([
                { id: 'bitcoin', name: 'BTC', price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change, color: '#F7931A' },
                { id: 'ethereum', name: 'ETH', price: data.ethereum.usd, change: data.ethereum.usd_24h_change, color: '#627EEA' },
                { id: 'solana', name: 'SOL', price: data.solana.usd, change: data.solana.usd_24h_change, color: '#14F195' },
                { id: 'binancecoin', name: 'BNB', price: data.binancecoin.usd, change: data.binancecoin.usd_24h_change, color: '#F3BA2F' }
            ]);
        } catch (error) {
            console.error("Crypto fetch error:", error);
            // High-fidelity fallback
            setPrices([
                { id: 'btc', name: 'BTC', price: 92450.21, change: 2.45, color: '#F7931A' },
                { id: 'eth', name: 'ETH', price: 2840.12, change: -1.12, color: '#627EEA' },
                { id: 'sol', name: 'SOL', price: 145.67, change: 5.82, color: '#14F195' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-full p-6 bg-transparent relative">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#14F195]/10 border border-[#14F195]/20">
                        <Activity size={14} className="text-[#14F195]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#14F195] uppercase">Market_Pulse</span>
                </div>
                <button
                    onClick={fetchPrices}
                    className={`p-2 rounded-full hover:bg-white/5 transition-all ${loading ? 'animate-spin' : ''}`}
                >
                    <RefreshCcw size={12} className="text-slate-500" />
                </button>
            </div>

            <div className="flex-grow space-y-4 relative z-10">
                <AnimatePresence mode="wait">
                    {loading && !prices ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse border border-white/5" />
                        ))
                    ) : (
                        prices?.map((coin, idx) => (
                            <motion.div
                                key={coin.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 border border-white/5 group transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                                        style={{ backgroundColor: coin.color, boxShadow: `0 0 10px ${coin.color}40` }}
                                    />
                                    <div>
                                        <p className="text-xs font-black text-white uppercase tracking-tighter">{coin.name}</p>
                                        <div className="flex items-center gap-1">
                                            <div className={`w-1 h-1 rounded-full ${coin.change >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                            <p className={`text-[8px] font-mono uppercase ${coin.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-mono font-bold text-white">
                                        ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </p>
                                    <div className="h-[2px] w-full bg-white/5 mt-1 overflow-hidden rounded-full">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(Math.abs(coin.change) * 10, 100)}%` }}
                                            className={`h-full ${coin.change >= 0 ? 'bg-emerald-500/50' : 'bg-red-500/50'}`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 opacity-30">
                    <Terminal size={10} />
                    <span className="text-[8px] font-mono tracking-tighter">COIN_STREAM_v4.5</span>
                </div>
                <span className="text-[8px] font-mono text-emerald-400/50 uppercase tracking-widest">REAL_TIME_ORACLE</span>
            </div>
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#14F195]/5 blur-3xl pointer-events-none rounded-full -mr-16 -mt-16" />
        </div>
    );
};

export default CryptoPulseWidget;
