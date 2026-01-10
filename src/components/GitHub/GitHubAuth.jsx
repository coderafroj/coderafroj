import React, { useState } from 'react';
import { useGitHub } from '../../context/GitHubContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Key, AlertCircle, ExternalLink } from 'lucide-react';

const GitHubAuth = () => {
    const [token, setToken] = useState('');
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full mx-auto"
        >
            <div className="obsidian-card p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
                {/* Glow Effects */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-6366f1/20 blur-[100px] rounded-full group-hover:bg-[#6366f1]/30 transition-colors" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#8b5cf6]/20 blur-[100px] rounded-full group-hover:bg-[#8b5cf6]/30 transition-colors" />

                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-white/10 group-hover:border-[#6366f1]/50 transition-colors">
                        <Github className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-3xl font-black text-center mb-2 tracking-tighter text-white uppercase">
                        GitHub <span className="text-[#6366f1]">Control</span>
                    </h2>
                    <p className="text-[#94a3b8] text-center mb-8 text-sm">
                        Enter your Personal Access Token to unlock repository management and file uploads.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#64748b] ml-1 flex items-center gap-2">
                                <Key className="w-3 h-3" />
                                Personal Access Token
                            </label>
                            <Input
                                type="password"
                                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                                value={token}
                                onChange={(e) => {
                                    setToken(e.target.value);
                                    if (error) clearError();
                                }}
                                className="bg-black/40 border-white/5 focus:border-[#6366f1]/50 h-12"
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                                >
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            disabled={isLoading || !token.trim()}
                            className="w-full h-12 bg-[#6366f1] hover:bg-[#818cf8] text-white font-bold tracking-widest uppercase text-xs shadow-lg shadow-[#6366f1]/20"
                        >
                            {isLoading ? 'Authenticating...' : 'Secure Authorization'}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <a
                            href="https://github.com/settings/tokens/new?scopes=repo,user"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#64748b] hover:text-[#6366f1] transition-colors flex items-center justify-center gap-1 font-mono"
                        >
                            Need a token?
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GitHubAuth;
