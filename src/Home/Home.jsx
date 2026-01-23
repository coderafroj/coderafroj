import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Shield, ArrowRight, BookOpen, Sparkles, Zap, Smartphone, Globe, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { computerNotes } from '../data/computerNotes';
import Hero3D from '../assets/hero-3d-core.png';

export default function Home() {
  // Get top 3 trending notes for the showcase
  const trendingNotes = computerNotes?.slice(0, 3) || [];

  const microWidgets = [
    { id: '01', title: 'System', status: 'Secured', color: 'text-primary' },
    { id: '02', title: 'Latency', status: '0.12ms', color: 'text-secondary' },
    { id: '03', title: 'Traffic', status: 'Active', color: 'text-accent' },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-primary/30 overflow-hidden">
      {/* Hyper-Impact Visual Engine */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 immersive-glow opacity-40" />
        <div className="absolute inset-0 data-strand-bg opacity-30 animate-pulse-slow font-outfit" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,#050505_100%)]" />
      </div>

      {/* Hero Section - Mobile Optimized v3 */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-24 md:py-10">
        {/* Enhanced Mobile Background - Large and Visible */}
        <div className="lg:hidden absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 100, repeat: Infinity, ease: "linear" },
              scale: { duration: 25, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={Hero3D}
              alt="3D Core Background"
              className="w-[300%] sm:w-[250%] max-w-none h-auto opacity-30 filter blur-[0.5px]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/15 to-accent/20 blur-[100px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/90" />
          </motion.div>
        </div>

        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 md:space-y-10 relative z-20 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 sm:gap-4">
              <span className="glass-tag text-[9px] sm:text-[10px]">System.v3</span>
              <span className="text-[9px] sm:text-[10px] font-mono text-dim-text uppercase tracking-widest">Architectural Mastery</span>
            </div>

            <h1 className="text-[3rem] sm:text-6xl md:text-7xl lg:text-[8rem] leading-[0.85] sm:leading-[0.9] md:leading-[0.8] uppercase flex flex-col font-outfit">
              <span className="text-white font-black tracking-tighter sm:tracking-tightest drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Design</span>
              <span className="chrome-text drop-shadow-[0_0_50px_rgba(99,102,241,0.8)]">Mastered.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-dim-text max-w-lg mx-auto lg:mx-0 leading-relaxed font-light font-outfit px-4 sm:px-0">
              We craft <span className="text-white font-bold italic">BREATHTAKING</span> digital experiences. Elite engineering meets high-end design to elevate your brand to the next dimension.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 items-center justify-center lg:justify-start pt-4 md:pt-8">
              <Link to="/projects" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 md:px-12 py-4 sm:py-5 md:py-6 bg-white text-black font-black uppercase text-[10px] md:text-xs tracking-[0.3em] rounded-none shimmer-button font-outfit shadow-2xl shadow-white/20"
                >
                  Start Project <span className="ml-2">⚡</span>
                </motion.button>
              </Link>
              <Link to="/tutorials" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ x: 10 }}
                  className="w-full sm:w-auto text-white font-bold uppercase text-[10px] md:text-xs tracking-widest flex items-center justify-center gap-4 group font-outfit"
                >
                  UI Showcase
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight size={14} />
                  </div>
                </motion.button>
              </Link>
            </div>

            {/* Micro Modules */}
            <div className="flex gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-12 md:pt-16 border-t border-white/5 justify-center lg:justify-start">
              {[
                { label: 'Uptime', val: '99.9%' },
                { label: 'Latency', val: '0.12ms' },
                { label: 'Cores', val: '128-Bit' }
              ].map((m, i) => (
                <div key={i} className="space-y-1 text-center">
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-widest">{m.label}</p>
                  <p className="text-xs sm:text-sm md:text-lg font-black text-white italic font-outfit">{m.val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Desktop 3D Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="relative perspective-2000 hidden lg:block"
          >
            <div className="hero-3d-stage preserve-3d relative">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-500/30 to-accent/40 blur-[150px] rounded-full scale-150 animate-pulse-slow" />

              <img
                src={Hero3D}
                alt="3D Digital Core"
                className="relative w-full h-auto drop-shadow-[0_0_150px_rgba(99,102,241,0.8)] z-10"
              />

              {/* Energy Rings */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 blur-sm scale-150 animate-pulse" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-secondary to-transparent opacity-60 blur-sm scale-150 animate-pulse" />

              {/* Orbiting particles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary/60 blur-sm" />
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-accent/60 blur-sm" />
                <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 rounded-full bg-purple-500/60 blur-sm" />
              </motion.div>
            </div>

            {/* Floating Info Pod */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 right-0 micro-widget flex items-center gap-4 border-primary/30 backdrop-blur-xl"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
              <div className="text-left">
                <p className="text-[8px] font-mono text-dim-text uppercase tracking-tighter">Core Integrity</p>
                <p className="text-xs font-bold text-white uppercase italic font-outfit">Optimal Performance</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Mobile Quick Stats Hub */}
      <div className="pt-20 lg:hidden grid grid-cols-1 gap-4 w-full">
        {microWidgets.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="micro-widget flex items-center justify-between p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full bg-white/20 ${stat.color} animate-pulse`} />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-dim-text">{stat.title}</span>
            </div>
            <span className="text-sm font-black text-white italic">{stat.status}</span>
          </motion.div>
        ))}
      </div>

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
      </section >

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
