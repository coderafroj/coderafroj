import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Shield, ArrowRight, BookOpen, Sparkles, Zap, Smartphone, Globe, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { computerNotes } from '../data/computerNotes';
import Hero3D from '../assets/hero-3d-core.png';

export default function Home() {
  // Get top 3 trending notes for the showcase
  const trendingNotes = computerNotes?.slice(0, 3) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-primary/30 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute inset-0 dynamic-grid-bg opacity-30" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-dim-text">
                v2.0 System Online // Ultra-Modern
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tightest leading-[0.9] mb-8 uppercase italic font-outfit">
              <span className="block text-white">Digital</span>
              <span className="block hero-gradient-text">Architect.</span>
            </h1>

            <p className="text-lg md:text-xl text-dim-text font-light leading-relaxed mb-10 max-w-lg">
              Engineering high-fidelity digital experiences with precision and speed. We don't just build websites; we architect the future.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-none shimmer-button"
                >
                  Access Protocols
                </motion.button>
              </Link>
              <Link to="/tutorials">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="px-10 py-5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-none backdrop-blur-sm"
                >
                  View Archive
                </motion.button>
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="mt-20 grid grid-cols-3 gap-8 border-t border-white/5 pt-10">
              {[
                { label: 'Elite Members', val: '2.5K+', icon: <Zap size={14} /> },
                { label: 'Systems Built', val: '150+', icon: <Globe size={14} /> },
                { label: 'Uptime', val: '99.9%', icon: <Shield size={14} /> }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="space-y-1"
                >
                  <p className="text-2xl font-black text-white font-outfit">{stat.val}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-dim-text">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="relative perspective-1000"
          >
            <div className="relative z-10 hero-3d-asset preserve-3d">
              <img
                src={Hero3D}
                alt="3D Digital Core"
                className="w-full h-auto drop-shadow-[0_0_100px_rgba(99,102,241,0.3)]"
              />
              {/* Orbital Glows */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            </div>

            <div className="absolute -bottom-10 -right-10 p-8 glass-glow border-white/20 backdrop-blur-3xl hidden md:block z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Terminal size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-dim-text uppercase tracking-widest">System Status</p>
                  <p className="text-sm font-bold text-white uppercase italic">All Cores Active</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="glass-pill text-accent-glow">
                <Layers size={14} />
                <span>Capabilities</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Our Ecosystem</h2>
              <p className="text-dim-text max-w-lg font-light leading-relaxed">
                From high-end web development to advanced architectural security, we provide the tools to scale your vision.
              </p>
            </div>
          </div>

          <div className="bento-container">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`bento-item p-8 group flex flex-col justify-between ${i === 0 || i === 3 ? 'md:col-span-2' : 'md:col-span-1'}`}
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-glow group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                    {service.icon === 'Code' && <Code size={28} />}
                    {service.icon === 'TrendingUp' && <Zap size={28} />}
                    {service.icon === 'Palette' && <Smartphone size={28} />}
                    {service.icon === 'Shield' && <Shield size={28} />}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{service.title}</h3>
                    <p className="text-sm text-dim-text font-light leading-relaxed">{service.description}</p>
                  </div>
                </div>

                <div className="pt-8 flex flex-wrap gap-2">
                  {service.features.map((feat, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
                      {feat}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Learning Showcase */}
      <section className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="glass-pill text-primary-glow mx-auto">
                <BookOpen size={14} />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Trending Tutorials</h2>
              <p className="text-dim-text max-w-2xl mx-auto font-light leading-relaxed">
                Unlock the mastery of computer science with our premium, simplified notes crafted for ultimate clarity.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {trendingNotes.map((note) => (
                <motion.div
                  key={note.id}
                  variants={itemVariants}
                  className="group relative h-[450px] rounded-[3rem] overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500"
                >
                  <img src={note.image} alt={note.title} className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-2">
                      {note.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-[10px] font-bold text-primary-glow uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight uppercase italic">{note.title}</h3>
                    <p className="text-sm text-slate-300 font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {note.description}
                    </p>
                    <Link to={`/note/${note.slug}`} className="pt-4 flex items-center gap-2 text-primary-glow font-bold text-sm">
                      Read Blueprint <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-8">
              <Link to="/tutorials">
                <button className="px-12 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20 active:scale-95">
                  View Full Archive
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Quote / Footer Preview */}
      <footer className="py-20 px-6 max-w-7xl mx-auto text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-dim-text text-[10px] font-mono uppercase tracking-[0.4em]">Integrated Intelligence</div>
          <p className="text-4xl md:text-5xl font-black italic max-w-4xl mx-auto leading-tight hero-gradient-text uppercase">
            "We don't just build websites; we architect digital legacies."
          </p>
          <div className="pt-12 text-dim-text/50 text-[10px] font-mono">
            &copy; 2026 CODERAFROJ NAIROBI PROTOCOL • DESIGNED BY AGENTIC INTELLIGENCE
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
