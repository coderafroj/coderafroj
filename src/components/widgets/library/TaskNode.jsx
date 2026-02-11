import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ListTodo, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskNode() {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem('coderafroj_tasks');
            const defaultTasks = [
                { id: 1, text: 'Initialize_Core_Kernel', done: true, priority: 'HIGH' },
                { id: 2, text: 'Secure_Neural_Link', done: false, priority: 'MED' }
            ];
            return saved ? JSON.parse(saved) : defaultTasks;
        } catch (e) {
            console.error("Task Registry Corrupted:", e);
            return [
                { id: 1, text: 'Initialize_Core_Kernel', done: true, priority: 'HIGH' },
                { id: 2, text: 'Secure_Neural_Link', done: false, priority: 'MED' }
            ];
        }
    });
    const [input, setInput] = useState('');
    const [priority, setPriority] = useState('MED');

    useEffect(() => {
        localStorage.setItem('coderafroj_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggle = (id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTasks(prev => [...prev, { id: Date.now(), text: input.toUpperCase(), done: false, priority }]);
        setInput('');
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const priorityColors = {
        HIGH: 'text-red-400 border-red-400/20 bg-red-400/5',
        MED: 'text-primary-glow border-primary/20 bg-primary/5',
        LOW: 'text-slate-500 border-white/5 bg-white/5'
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <ListTodo size={14} className="text-primary" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active_Checklist</span>
                </div>
                <span className="text-[10px] font-mono text-primary-glow font-bold">{tasks.filter(t => t.done).length}/{tasks.length}</span>
            </div>

            <div className="space-y-2 max-h-[200px] overflow-y-auto no-scrollbar pr-1">
                <AnimatePresence mode="popLayout">
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${task.done ? 'bg-primary/5 border-primary/20 text-slate-500' : 'bg-white/5 border-white/5 text-white'}`}
                        >
                            <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggle(task.id)}>
                                {task.done ? (
                                    <CheckCircle2 size={16} className="text-primary-glow" />
                                ) : (
                                    <Circle size={16} className="text-slate-700" />
                                )}
                                <div className="flex flex-col">
                                    <span className={`text-[10px] font-bold italic uppercase tracking-tight ${task.done ? 'line-through opacity-50' : ''}`}>
                                        {task.text}
                                    </span>
                                    {!task.done && (
                                        <span className={`text-[7px] font-mono font-black uppercase tracking-[0.2em] mt-0.5 ${priorityColors[task.priority || 'MED'].split(' ')[0]}`}>
                                            [{task.priority || 'MED'}_LEVEL]
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-red-400 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <form onSubmit={addTask} className="space-y-3 mt-4">
                <div className="flex gap-2">
                    {['LOW', 'MED', 'HIGH'].map(p => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => setPriority(p)}
                            className={`flex-1 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest border transition-all ${priority === p ? priorityColors[p] : 'bg-white/5 border-transparent text-slate-600 hover:text-slate-400'}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="INSERT_NODE_PROTOCOL..."
                        className="w-full bg-white/[0.02] border border-dashed border-white/10 rounded-xl px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 transition-all"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-glow hover:scale-110 transition-transform">
                        <Plus size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
}
