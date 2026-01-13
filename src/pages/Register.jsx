import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { UserPlus, AlertCircle, ArrowLeft, ShieldPlus, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('VALIDATION_ERROR: KEY_MISMATCH');
            setLoading(false);
            return;
        }

        if (email !== 'coderafroj@gmail.com') {
            setError('AUTH_ERROR: UNAUTHORIZED_IDENTIFIER');
            setLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err) {
            setError(err.message || 'SYSTEM_FAILURE: INIT_ABORTED');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] animate-pulse" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md obsidian-card p-10 rounded-[2.5rem] relative z-10 border-white/5"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-2xl shadow-primary/10">
                        <ShieldPlus className="text-primary-glow" size={40} />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                        <Cpu size={12} className="text-primary-glow" />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-dim-text uppercase">Root_Initialization</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Coderafroj Core Init</h1>
                    <p className="text-dim-text text-xs font-mono uppercase tracking-widest opacity-60">Create Master Root Account</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl mb-8 flex items-center gap-3 text-xs font-mono tracking-wider"
                    >
                        <AlertCircle size={18} /> {error}
                    </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-mono font-black text-dim-text mb-3 tracking-[0.2em] uppercase opacity-60">Identity_Token (Email)</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="coderafroj@gmail.com"
                            className="bg-white/5 border-white/10 focus:border-primary/40 rounded-2xl h-14 px-6 font-mono text-xs uppercase"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono font-black text-dim-text mb-3 tracking-[0.2em] uppercase opacity-60">Master_Key (Password)</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-white/5 border-white/10 focus:border-primary/40 rounded-2xl h-14 px-6 font-mono text-xs"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-mono font-black text-dim-text mb-3 tracking-[0.2em] uppercase opacity-60">Verify_Key</label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-white/5 border-white/10 focus:border-primary/40 rounded-2xl h-14 px-6 font-mono text-xs"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-14 mt-4 rounded-2xl bg-primary hover:bg-primary-glow text-white font-black tracking-[0.2em] uppercase shadow-xl shadow-primary/20 transition-all duration-500 text-xs"
                        disabled={loading}
                    >
                        {loading ? 'INITIALIZING...' : 'Establish Root Access'}
                    </Button>
                </form>

                <div className="mt-10 pt-8 border-t border-white/5 text-center text-[10px] font-mono tracking-widest uppercase">
                    <Link to="/login" className="text-dim-text hover:text-white flex items-center justify-center gap-2 transition-colors">
                        <ArrowLeft size={14} /> Back to Secure Gateway
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;

