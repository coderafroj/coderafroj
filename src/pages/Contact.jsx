import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Shield, CheckCircle, AlertCircle, Globe, Cpu } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import SEO from '../components/SEO';

const Contact = () => {
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await addDoc(collection(db, 'feedback'), {
                ...formData,
                timestamp: serverTimestamp(),
                source: 'website_contact_page'
            });

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error sending transmission:', error);
            setStatus('error');
            setErrorMessage('Neural link failed. Please try again later.');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="min-h-screen digital-grid pt-32 px-6 pb-40">
            <SEO
                title="Establish Contact | Neural Link"
                description="Start your next high-impact digital project with Coderafroj. Establish a neural link for custom engineering and premium design."
                url="/contact"
            />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-glow rounded-2xl border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(47,129,247,0.15)]"
                    >
                        <Globe size={14} className="animate-pulse" /> Neural_Link_Status: Active
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase italic mb-6"
                    >
                        Establish <span className="text-primary">Contact</span>
                    </motion.h1>
                </div>

                <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="obsidian-card p-8 md:p-12 rounded-[3.5rem] border-white/5 bg-black/40 backdrop-blur-3xl shadow-2xl relative"
                    >
                        <AnimatePresence mode='wait'>
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                                        <CheckCircle size={40} className="text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase italic mb-4">Transmission Received</h3>
                                </motion.div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-mono text-primary-glow uppercase tracking-[0.3em] ml-2 block">Operator_Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="NAME"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-xs outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-mono text-primary-glow uppercase tracking-[0.3em] ml-2 block">Neural_Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="EMAIL"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-black text-xs outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-mono text-primary-glow uppercase tracking-[0.3em] ml-2 block">Payload</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            placeholder="MESSAGE"
                                            className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-6 text-white font-black text-xs outline-none focus:border-primary/50 transition-all resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        disabled={status === 'sending'}
                                        type="submit"
                                        className="w-full py-5 bg-primary rounded-2xl font-black text-xs uppercase tracking-[0.4em] text-white hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                                    >
                                        {status === 'sending' ? 'Sending...' : 'Send Transmission'}
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <div className="space-y-10">
                        <div className="obsidian-card p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5">
                            <Shield size={24} className="text-primary-glow mb-4" />
                            <h4 className="text-white font-black uppercase text-sm italic mb-3 tracking-widest">Secure</h4>
                            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest leading-relaxed">
                                Logged in protected sector.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
