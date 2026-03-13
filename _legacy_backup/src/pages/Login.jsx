import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Lock, AlertCircle, ShieldCheck, Terminal, Fingerprint, RefreshCcw, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetMode, setResetMode] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user.email !== 'coderafroj@gmail.com') {
                await auth.signOut();
                setError('UNAUTHORIZED: ADMIN_PRIVILEGES_REQUIRED');
                return;
            }
            navigate('/admin');
        } catch (err) {
            setError('ACCESS_DENIED: CREDENTIAL_MISMATCH');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('ERROR: IDENTITY_TOKEN_REQUIRED');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess('RECOVERY_SIGNAL_TRANSMITTED. CHECK INBOX.');
        } catch (err) {
            setError('TRANSMISSION_FAILED: IDENTITY_NOT_FOUND');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />

            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md obsidian-card p-10 rounded-[2.5rem] relative z-10 border-white/5"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-accent/20 shadow-2xl shadow-accent/10">
                        {resetMode ? (
                            <RefreshCcw className="text-accent-glow animate-spin-slow" size={40} />
                        ) : (
                            <Fingerprint className="text-accent-glow" size={40} />
                        )}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                        <ShieldCheck size={12} className="text-accent-glow" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-dim-text uppercase">
                            {resetMode ? 'Recovery_Mode' : 'Secure_Gateway'}
                        </span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
                        {resetMode ? 'Reset Credentials' : 'Neural Access'}
                    </h1>
                    <p className="text-dim-text text-xs font-mono uppercase tracking-widest opacity-60">
                        {resetMode ? 'Initiate Recovery Protocol' : 'Authorized Personnel Only'}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl mb-8 flex items-center gap-3 text-xs font-mono tracking-wider"
                        >
                            <AlertCircle size={18} /> {error}
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-2xl mb-8 flex items-center gap-3 text-xs font-mono tracking-wider"
                        >
                            <ShieldCheck size={18} /> {success}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={resetMode ? handleResetPassword : handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-mono font-black text-dim-text mb-3 tracking-[0.2em] uppercase opacity-60">Identity_Token (Email)</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="OPERATOR@CODERAFROJ"
                            className="bg-white/5 border-white/10 focus:border-accent/40 rounded-2xl h-14 px-6 font-mono text-xs uppercase"
                            required
                        />
                    </div>

                    {!resetMode && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-[10px] font-mono font-black text-dim-text tracking-[0.2em] uppercase opacity-60">Access_Key (Password)</label>
                                <button
                                    type="button"
                                    onClick={() => { setResetMode(true); setError(''); setSuccess(''); }}
                                    className="text-[10px] font-mono text-accent-glow hover:underline opacity-80"
                                >
                                    FORGOT_KEY?
                                </button>
                            </div>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-white/5 border-white/10 focus:border-accent/40 rounded-2xl h-14 px-6 font-mono text-xs"
                                required
                            />
                        </motion.div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-14 mt-4 rounded-2xl bg-accent hover:bg-accent-glow text-white font-black tracking-[0.2em] uppercase shadow-xl shadow-accent/20 transition-all duration-500 text-xs"
                        disabled={loading}
                    >
                        {loading
                            ? 'PROCESSING...'
                            : resetMode
                                ? 'TRANSMIT RESET SIGNAL'
                                : 'Establish Connection'
                        }
                    </Button>
                </form>

                <div className="mt-10 pt-8 border-t border-white/5 text-center text-[10px] font-mono tracking-widest uppercase">
                    {resetMode ? (
                        <button
                            onClick={() => { setResetMode(false); setError(''); setSuccess(''); }}
                            className="text-dim-text hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors"
                        >
                            <ArrowLeft size={12} /> ABORT_RECOVERY
                        </button>
                    ) : (
                        <>
                            <span className="opacity-40 text-dim-text">No active node?</span>
                            <Link to="/register" className="text-accent-glow ml-2 hover:underline decoration-accent/40 underline-offset-4">Initialize Admin</Link>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

