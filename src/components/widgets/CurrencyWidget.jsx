import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, ArrowLeftRight, TrendingUp, Terminal, DollarSign } from 'lucide-react';

const CurrencyWidget = () => {
    const [rates, setRates] = useState({ USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12 });
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [loading, setLoading] = useState(false);

    const fetchRates = async () => {
        setLoading(true);
        try {
            // Using a free, no-auth API for currency
            const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
            const data = await res.json();
            if (data.result === "success") {
                setRates(data.rates);
            }
        } catch (error) {
            console.error("Currency fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, [from]);

    const result = (amount * (rates[to] || 0)).toFixed(2);

    return (
        <div className="relative h-full flex flex-col p-6 bg-[#050505] backdrop-blur-3xl border border-white/5 rounded-2xl overflow-hidden group">
            {/* Fintech Gradient Overlay */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-emerald-500/5 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Landmark size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">Fiscal_Bridge</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                    <TrendingUp size={10} />
                    <span className="text-[9px] font-mono tracking-widest uppercase">Live Rates</span>
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-1">Input Amount</label>
                    <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-emerald-500/50 transition-colors">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-transparent border-none outline-none text-white p-3 w-full font-bold text-lg"
                        />
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="bg-white/5 border-none outline-none text-emerald-400 p-3 font-mono text-xs cursor-pointer uppercase tracking-widest"
                        >
                            {Object.keys(rates).slice(0, 10).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center -my-3">
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 z-20">
                        <ArrowLeftRight size={14} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-1">Converted Value</label>
                    <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all">
                        <div className="bg-transparent p-3 w-full font-black text-2xl text-white flex items-center gap-2">
                            {result} <span className="text-xs text-slate-500 font-normal">{to}</span>
                        </div>
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="bg-white/5 border-none outline-none text-emerald-400 p-3 font-mono text-xs cursor-pointer uppercase tracking-widest"
                        >
                            {Object.keys(rates).slice(0, 10).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 opacity-30">
                    <Terminal size={10} />
                    <span className="text-[8px] font-mono tracking-tighter">FIN_NODE_v1.0</span>
                </div>
                <span className="text-[8px] font-mono text-emerald-400/50 uppercase tracking-widest">Developed by Coderfroj</span>
            </div>
        </div>
    );
};

export default CurrencyWidget;
