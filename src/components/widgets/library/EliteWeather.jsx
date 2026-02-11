import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EliteWeather() {
    const [temp, setTemp] = useState(24);
    const [cityIndex, setCityIndex] = useState(0);
    const [showForecast, setShowForecast] = useState(false);
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

    const ForecastNode = ({ time, icon: Icon, temp }) => (
        <div className="flex flex-col items-center gap-1 p-2 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[7px] font-mono text-slate-500">{time}</span>
            <Icon size={14} className="text-primary/60" />
            <span className="text-[9px] font-black text-white italic">{temp}°C</span>
        </div>
    );

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
                <button
                    onClick={() => setShowForecast(!showForecast)}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-[8px] font-mono text-primary-glow uppercase tracking-widest hover:bg-primary/20 transition-all"
                >
                    {showForecast ? 'HIDE_FORECAST' : 'SHOW_FORECAST'}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {showForecast ? (
                    <motion.div
                        key="forecast"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-4 gap-2"
                    >
                        <ForecastNode time="14:00" icon={Sun} temp={26} />
                        <ForecastNode time="18:00" icon={Cloud} temp={22} />
                        <ForecastNode time="22:00" icon={CloudRain} temp={19} />
                        <ForecastNode time="02:00" icon={Thermometer} temp={17} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="stats"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-3">
                            <Wind size={14} className="text-sky-400" />
                            <div>
                                <p className="text-[8px] font-mono text-slate-500 uppercase">Wind</p>
                                <p className="text-xs font-bold text-white">12km/h_W</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-3">
                            <Droplets size={14} className="text-blue-400" />
                            <div>
                                <p className="text-[8px] font-mono text-slate-500 uppercase">Precip</p>
                                <p className="text-xs font-bold text-white">2.4mm</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-12 flex items-end gap-1 px-2 border-t border-white/5 pt-4">
                {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 4 }}
                        animate={{ height: Math.random() * 20 + 4 }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                        className="flex-1 bg-primary/20 rounded-full hover:bg-primary/60 cursor-crosshair"
                    />
                ))}
            </div>
        </div>
    );
}
