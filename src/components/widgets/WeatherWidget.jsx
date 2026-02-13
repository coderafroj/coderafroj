import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudLightning, Wind, Thermometer, MapPin, Terminal } from 'lucide-react';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationName, setLocationName] = useState("Detecting...");

    const fetchWeather = async (query = "") => {
        setLoading(true);
        try {
            // Using wttr.in for keyless fetching. If query is empty, it uses IP-based location.
            const res = await fetch(`https://wttr.in/${query}?format=j1`);
            const data = await res.json();

            const current = data.current_condition[0];
            const identity = data.nearest_area[0];

            setLocationName(`${identity.areaName[0].value}, ${identity.country[0].value}`);
            setWeather({
                temp: current.temp_C,
                condition: current.weatherDesc[0].value,
                humidity: current.humidity,
                wind: current.windspeedKmph,
                icon: current.weatherCode
            });
        } catch (error) {
            console.error("Weather fetch error:", error);
            setWeather({
                temp: 24,
                condition: "Optimal",
                humidity: 45,
                wind: 12,
                icon: "113"
            });
            setLocationName("Global Hub");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(`${latitude},${longitude}`);
                },
                (error) => {
                    console.warn("Geolocation denied, using IP-based location.");
                    fetchWeather(""); // Fallback to IP
                }
            );
        } else {
            fetchWeather("");
        }
    }, []);

    const getWeatherIcon = (code) => {
        const c = parseInt(code);
        if (c <= 113) return <Sun size={32} className="text-yellow-400" />;
        if (c <= 122) return <Cloud size={32} className="text-blue-400" />;
        if (c <= 200) return <CloudRain size={32} className="text-sky-400" />;
        return <CloudLightning size={32} className="text-purple-400" />;
    };

    return (
        <div className="relative h-full flex flex-col p-6 bg-[#0d1117]/60 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden group">
            {/* Dynamic Weather Glow */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sky-500/10 blur-[60px] rounded-full group-hover:bg-sky-500/20 transition-all duration-1000" />

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
                        <Thermometer size={14} className="text-sky-400" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase">Atmosphere_Link</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 truncate max-w-[150px]">
                    <MapPin size={10} className="shrink-0" />
                    <span className="text-[9px] font-mono tracking-widest opacity-60 uppercase truncate">{locationName}</span>
                </div>
            </div>

            <div className="flex-grow flex items-center gap-6">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="flex-grow flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-row items-center gap-6"
                        >
                            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 shadow-2xl">
                                {getWeatherIcon(weather.icon)}
                            </div>
                            <div>
                                <h4 className="text-5xl font-black text-white tracking-tighter">
                                    {weather.temp}°<span className="text-xl text-slate-500">C</span>
                                </h4>
                                <p className="text-xs font-mono text-slate-400 uppercase tracking-[0.2em] mt-1 line-clamp-1">{weather.condition}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <Wind size={14} className="text-slate-500 shadow-sm" />
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-mono">Wind</p>
                        <p className="text-sm font-bold text-white uppercase">{weather?.wind} km/h</p>
                    </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                    <CloudRain size={14} className="text-slate-500" />
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-mono">Humidity</p>
                        <p className="text-sm font-bold text-white uppercase">{weather?.humidity}%</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 opacity-30">
                    <Terminal size={10} />
                    <span className="text-[8px] font-mono tracking-tighter">OS_WEATHER_v4.2</span>
                </div>
                <span className="text-[8px] font-mono text-sky-400/50 uppercase tracking-widest">Developed by Coderfroj</span>
            </div>
        </div>
    );
};

export default WeatherWidget;
