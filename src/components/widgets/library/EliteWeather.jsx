import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EliteWeather() {
    const [temp, setTemp] = useState(24);
    const [cityIndex, setCityIndex] = useState(0);
    const cities = ['NEO_TOKIO', 'SYL_VALLEY', 'DUBAI_HUB', 'LONDON_SYS', 'DELHI_NODE'];

    useEffect(() => {
        const interval = setInterval(() => {
            setTemp(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const cityInterval = setInterval(() => {
            setCityIndex(prev => (prev + 1) % cities.length);
        }, 8000);
        return () => clearInterval(cityInterval);
    }, [cities.length]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="w-16 h-16 rounded-3xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 border border-yellow-500/20"
                    >
                        <Sun size={32} />
                    </motion.div>
                    <div>
                        <p className="text-3xl font-black text-white italic">{temp}°C</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{cities[cityIndex]}_ATMOS_LINK</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-white uppercase tracking-tighter">Clear_Sky</p>
                    <div className="flex gap-1 justify-end mt-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 rounded-full bg-primary/40" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-3">
                    <Wind size={14} className="text-sky-400" />
                    <div>
                        <p className="text-[8px] font-mono text-slate-500 uppercase">Wind</p>
                        <p className="text-xs font-bold text-white">12km/h</p>
                    </div>
                </div>
                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-3">
                    <Droplets size={14} className="text-blue-400" />
                    <div>
                        <p className="text-[8px] font-mono text-slate-500 uppercase">Humidity</p>
                        <p className="text-xs font-bold text-white">42%</p>
                    </div>
                </div>
            </div>

            <div className="h-12 flex items-end gap-1 px-2">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 4 }}
                        animate={{ height: Math.random() * 20 + 4 }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                        className="flex-1 bg-primary/20 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
}
