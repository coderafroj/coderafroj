import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from '../../config/aiConfig';
import {
    Zap,
    Send,
    Sparkles,
    RefreshCcw,
    Copy,
    ChevronRight,
    Bot
} from 'lucide-react';
import { toast } from 'sonner';

const AIAssistantTray = ({ isOpen, onClose, editor, topicTitle }) => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Initialize Gemini using centralized config
    const genAI = new GoogleGenerativeAI(AI_CONFIG.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: AI_CONFIG.GEMINI_MODEL });

    const generateContent = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        setResponse('');

        try {
            const fullPrompt = `Topic: ${topicTitle}\nTask: ${prompt}\nFormat the output in clean Markdown. Use a professional, technical but easy-to-understand Hinglish style if appropriate. Use headings, code blocks and lists.`;
            const result = await model.generateContent(fullPrompt);
            const text = result.response.text();
            setResponse(text);
        } catch (error) {
            console.error(error);
            toast.error('AI Processing Failed', { description: error.message });
        } finally {
            setIsGenerating(false);
        }
    };

    const applyToEditor = () => {
        if (!response) return;
        editor.chain().focus().insertContent(response).run();
        toast.success('Content Applied to Editor');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2100]"
                    />

                    {/* Tray */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-lg glass-plus z-[2200] flex flex-col border-l border-white/10"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-sky-500 rounded-2xl text-black">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black uppercase italic tracking-tight text-white">Elite AI Architect</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-sky-500 mt-1">v4.0 Generative Sync</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <ChevronRight className="text-slate-500" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    Mission Parameters
                                </label>
                                <div className="relative">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="E.g., Generate a detailed tutorial on this topic in Hinglish..."
                                        className="w-full h-32 bg-slate-900/50 border border-white/5 rounded-3xl p-6 text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
                                    />
                                    <button
                                        onClick={generateContent}
                                        disabled={isGenerating || !prompt}
                                        className={`
                      absolute bottom-4 right-4 p-3 rounded-2xl transition-all haptic-feedback
                      ${isGenerating ? 'bg-slate-800 text-slate-500' : 'bg-sky-500 text-black shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:bg-sky-400'}
                    `}
                                    >
                                        {isGenerating ? (
                                            <RefreshCcw className="animate-spin" size={20} />
                                        ) : (
                                            <Send size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {response && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-widest text-sky-500">
                                        Generated Intelligence
                                    </label>
                                    <div className="bg-black/50 border border-white/5 rounded-[2rem] p-8 relative">
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(response);
                                                    toast.success('Copied to Clipboard');
                                                }}
                                                className="p-2 hover:bg-white/10 rounded-lg text-slate-400"
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                        <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-light text-slate-300">
                                            {response}
                                        </div>
                                    </div>
                                    <button
                                        onClick={applyToEditor}
                                        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold uppercase tracking-widest text-xs hover:bg-sky-500 hover:text-black hover:border-sky-500 transition-all haptic-feedback"
                                    >
                                        Integrate into Editor
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer Tip */}
                        {!response && !isGenerating && (
                            <div className="p-8 mt-auto">
                                <div className="p-6 bg-sky-500/5 border border-sky-500/10 rounded-3xl flex items-start gap-4">
                                    <Sparkles className="text-sky-500 shrink-0 mt-1" size={18} />
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        The Elite AI understands context. Simply tell it what you need for <span className="text-white font-bold">{topicTitle}</span> and it will architect the content.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AIAssistantTray;
