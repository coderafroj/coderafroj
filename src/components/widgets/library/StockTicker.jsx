import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StockTicker() {
    const [btc, setBtc] = useState({ current: 64231, history: Array(10).fill(64231) });
    const [eth, setEth] = useState({ current: 3452, history: Array(10).fill(3452) });
    const [sol, setSol] = useState({ current: 142, history: Array(10).fill(142) });
    const [up, setUp] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const change = Math.random() * 50 - 25;
            setUp(change > 0);

            setBtc(prev => ({
                current: +(prev.current + change).toFixed(2),
                history: [...prev.history.slice(1), +(prev.current + change).toFixed(2)]
            }));
            setEth(prev => ({
                current: +(prev.current + (change / 10)).toFixed(2),
                history: [...prev.history.slice(1), +(prev.current + (change / 10)).toFixed(2)]
            }));
            setSol(prev => ({
                current: +(prev.current + (change / 100)).toFixed(2),
                history: [...prev.history.slice(1), +(prev.current + (change / 100)).toFixed(2)]
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const Sparkline = ({ data, color }) => {
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        const points = data.map((d, i) => `${(i * 10).toFixed(0)},${(20 - ((d - min) / range) * 20).toFixed(0)}`).join(' ');

        return (
            <svg className="w-12 h-5 opacity-40 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 20">
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    points={points}
                />
            </svg>
        );
    };

    const AssetRow = ({ name, data, icon: Icon, color }) => (
        <div className="group flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center text-${color}-400`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-white italic">{name}</p>
                    <p className="text-[8px] font-mono text-slate-500 uppercase">Market_Index</p>
                </div>
            </div>

            <div className="flex items-center gap-4 relative z-10">
                <Sparkline data={data.history} color={up ? '#4ade80' : '#f87171'} />
                <div className="text-right">
                    <p className="text-sm font-black text-white italic">${data.current.toLocaleString()}</p>
                    <div className={`flex items-center justify-end gap-1 ${up ? 'text-green-400' : 'text-red-400'}`}>
                        {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        <span className="text-[8px] font-mono font-bold">{up ? '+' : '-'}{Math.abs((Math.random() * 2).toFixed(2))}%</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-4">
            <AssetRow name="BTC_PROTOCOL" data={btc} icon={Activity} color="orange" />
            <AssetRow name="ETH_UPLINK" data={eth} icon={BarChart3} color="purple" />
            <AssetRow name="SOL_MATRIX" data={sol} icon={Zap} color="sky" />

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
