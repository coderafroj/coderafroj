import { motion } from 'framer-motion';
import { Button } from './ui/Button'; // Fixed import path
import { Terminal, ArrowRight, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[100px] opacity-30" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Open for collaborations
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Building the <br />
                        <span className="text-gradient">Future Web</span>
                    </h1>

                    <p className="text-lg text-text-muted mb-8 max-w-lg leading-relaxed">
                        I am Coderafroj, a Full-Stack Developer crafting exceptional digital experiences.
                        Merging clean code with stunning design to build scalable applications.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button variant="primary" onClick={() => navigate('/projects')} className="group">
                            View Work <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/blog')}>
                            Read Blog
                        </Button>
                    </div>

                    <div className="mt-12 flex items-center gap-8 text-text-muted opacity-80">
                        {['React', 'Node.js', 'Firebase', 'Tailwind'].map((tech) => (
                            <span key={tech} className="text-sm font-semibold tracking-wider uppercase">{tech}</span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative z-10 bg-bg-card border border-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <div className="ml-auto text-xs text-text-muted font-mono">app.js</div>
                        </div>
                        <div className="font-mono text-sm space-y-2">
                            <div className="text-text-muted">import <span className="text-secondary">Future</span> from <span className="text-green-400">'./reality'</span>;</div>
                            <div className="text-text-muted">const <span className="text-primary">Innovation</span> = () ={'>'} {'{'}</div>
                            <div className="pl-4 text-text-muted">const <span className="text-accent">stack</span> = ['MERN', 'Next.js', 'Cloud'];</div>
                            <div className="pl-4 text-text-muted">return <span className="text-secondary">Future.build</span>(stack);</div>
                            <div className="text-text-muted">{'}'};</div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 blur-xl rounded-full"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 blur-xl rounded-full"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
