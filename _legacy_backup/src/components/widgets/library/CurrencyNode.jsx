import React, { useState, useEffect } from 'react';
import { DollarSign, Euro, PoundSterling, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CurrencyNode() {
    const [base, setBase] = useState('USD');
    const [rates, setRates] = useState([
        { id: 'USD/EUR', val: 0.92, icon: <Euro size={12} />, trend: 'up' },
        { id: 'USD/GBP', val: 0.79, icon: <PoundSterling size={12} />, trend: 'down' },
        { id: 'USD/JPY', val: 151.2, icon: <DollarSign size={12} />, trend: 'up' }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRates(prev => prev.map(r => ({
                ...r,
                val: +(r.val + (Math.random() * 0.02 - 0.01)).toFixed(r.id.includes('JPY') ? 1 : 2),
                trend: Math.random() > 0.5 ? 'up' : 'down'
            })));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const toggleBase = () => setBase(prev => prev === 'USD' ? 'EUR' : 'USD');

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={toggleBase}
                    className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-[8px] font-black text-primary-glow uppercase tracking-widest hover:bg-primary/20 transition-all"
                >
                    Base: {base}
                </button>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">Forex_Live</span>
            </div>

            <div className="space-y-3">
                {rates.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                                {r.icon}
                            </div>
                            <span className="text-[10px] font-black text-white italic tracking-tight">{r.id}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black text-white">{r.val}</p>
                            <p className={`text-[8px] font-mono font-bold uppercase ${r.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {r.trend === 'up' ? '▲' : '▼'} {Math.abs((Math.random() * 0.5).toFixed(2))}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
