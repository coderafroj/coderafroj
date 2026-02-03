import React, { useState } from 'react';
import { useGitHub } from '../../context/GitHubContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Key, AlertCircle, ExternalLink, Eye, EyeOff } from 'lucide-react';

const GitHubAuth = () => {
    const [token, setToken] = useState('');
    const [showToken, setShowToken] = useState(false);
    const { login, isLoading, error, clearError } = useGitHub();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token.trim()) return;
        try {
            await login(token.trim());
        } catch (err) {
            // Error handled in context
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full mx-auto"
        >
            <div className="obsidian-card p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                {/* Glow Effects */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-all duration-1000" />
                <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-accent/10 blur-[120px] rounded-full opacity-50" />

                <div className="relative z-10">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-8 mx-auto border border-white/10 group-hover:border-primary/50 transition-all duration-500 shadow-xl"
                    >
                        <Github className="w-10 h-10 text-white group-hover:text-primary-glow transition-all" />
                    </motion.div>

                    <h2 className="text-4xl font-black text-center mb-2 tracking-tighter text-white uppercase italic">
                        Github  <span className="text-primary-glow not-italic">Sync</span>
                    </h2>
                    <p className="text-slate-400 text-center mb-10 text-xs font-light tracking-wide uppercase">
                        Authorize Github
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 flex items-center gap-2">
                                <Key className="w-3 h-3 text-primary-glow" />
                                Access Github by token
                            </label>
                            <div className="relative">
                                <Input
                                    type={showToken ? "text" : "password"}
                                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                                    value={token}
                                    onChange={(e) => {
                                        setToken(e.target.value);
                                        if (error) clearError();
                                    }}
                                    className="bg-black/60 border-white/5 focus:border-primary/50 h-14 pr-12 rounded-2xl font-mono text-sm tracking-widest text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowToken(!showToken)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                                >
                                    {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/5 p-4 rounded-2xl border border-red-500/20"
                                >
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            disabled={isLoading || !token.trim()}
                            className="w-full h-14 bg-white text-black hover:bg-primary hover:text-white font-black tracking-[0.3em] uppercase text-[10px] rounded-2xl shadow-2xl transition-all active:scale-95"
                        >
                            {isLoading ? 'Decrypting...' : 'Establish Connection'}
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <a
                            href="https://github.com/settings/tokens/new?scopes=repo,user"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] text-slate-500 hover:text-primary-glow underline underline-offset-8 decoration-white/10 transition-all font-black tracking-widest flex items-center justify-center gap-2 uppercase"
                        >
                            create access key
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GitHubAuth;

