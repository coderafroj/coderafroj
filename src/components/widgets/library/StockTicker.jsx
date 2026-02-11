import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StockTicker() {
    const [btc, setBtc] = useState(64231);
    const [eth, setEth] = useState(3452);
    const [sol, setSol] = useState(142);
    const [up, setUp] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const change = Math.random() * 50 - 25;
            setBtc(prev => +(prev + change).toFixed(2));
            setEth(prev => +(prev + (change / 10)).toFixed(2));
            setSol(prev => +(prev + (change / 100)).toFixed(2));
            setUp(change > 0);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const AssetRow = ({ name, val, prev, icon: Icon }) => (
        <div className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-white italic">{name}</p>
                    <p className="text-[8px] font-mono text-slate-500 uppercase">Market_Index</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-black text-white italic">${val.toLocaleString()}</p>
                <div className={`flex items-center justify-end gap-1 ${up ? 'text-green-400' : 'text-red-400'}`}>
                    {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    <span className="text-[8px] font-mono font-bold">{up ? '+' : '-'}{Math.abs((Math.random() * 2).toFixed(2))}%</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            <AssetRow name="BTC_PROTOCOL" val={btc} icon={Activity} />
            <AssetRow name="ETH_UPLINK" val={eth} icon={BarChart3} />
            <AssetRow name="SOL_MATRIX" val={sol} icon={Zap} />

            <div className="pt-4 border-t border-white/5 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-green-500" />
                    <span className="text-[8px] font-mono text-slate-500 uppercase">Live_Feed_Secure</span>
                </div>
                <DollarSign size={12} className="text-slate-500" />
            </div>
        </div>
    );
}
