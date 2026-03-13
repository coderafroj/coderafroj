import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Cpu, Shield, Globe } from 'lucide-react';

const SolutionGrid = ({ items }) => {
    return (
        <div className="solution-grid py-12">
            {items.map((item, i) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.7 }}
                    className="saas-card group relative glow-border"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-primary-glow group-hover:bg-primary group-hover:text-black transition-all duration-500 group-hover:rotate-6">
                                {item.icon || <Cpu size={32} />}
                            </div>
                            <span className="solution-badge">
                                {item.metric || 'Elite_Protocol'}
                            </span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h3 className="text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-primary-glow transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-dim-text leading-relaxed font-light line-clamp-3">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex gap-2">
                                {(item.tags || ['Free', 'Masterclass']).map((tag, idx) => (
                                    <span key={idx} className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <Link
                                to={item.link || `/note/${item.slug}`}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500"
                            >
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default SolutionGrid;
