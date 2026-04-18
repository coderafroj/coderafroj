"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  Code2, Blocks, ShoppingCart, Wrench, 
  FileCode2, ArrowRight, Rocket, Sparkles,
  ChevronRight, Laptop, CpuIcon as Cpu, ShieldCheck, Globe,
  BookOpen, Terminal, Shield, Network, Database, Briefcase, GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES = ["Student", "Cyber Security Aspirant", "Bug Hunter", "CS Teacher"];

const skills = [
  {
    category: "Web Development",
    icon: Globe,
    items: ["HTML", "CSS", "JavaScript", "ReactJS", "Next.js", "MERN Stack"],
    color: "from-blue-500 to-indigo-500"
  },
  {
    category: "Programming",
    icon: Terminal,
    items: ["Python", "C++", "C", "JavaScript"],
    color: "from-emerald-500 to-teal-500"
  },
  {
    category: "Software & Design",
    icon: Database,
    items: ["Git", "GitHub", "MS Office", "Advance Excel", "Tally", "Corel Graphics Design"],
    color: "from-orange-500 to-red-500"
  },
  {
    category: "Cybersecurity",
    icon: Shield,
    items: ["Linux", "SIEM TOOLS", "WAPT", "Network Security", "Offensive Security"],
    color: "from-purple-500 to-pink-500"
  }
];

const experience = [
  {
    role: "Full Stack Developer",
    company: "Self-Taught Excellence",
    period: "2023 - Present",
    description: "Mastered complex web architectures and modern frameworks through intensive self-study and real-world project builds. Specialized in Next.js, React, and UI/UX design.",
    icon: Laptop
  },
  {
    role: "Cyber Security Specialist",
    company: "Independent Research",
    period: "2024 - Present",
    description: "Deep-diving into offensive security and network auditing. Actively engaged in bug hunting and practical application of SIEM tools.",
    icon: Shield
  }
];

const portfolioProjects = [
  {
    title: "Artificial Intelligence",
    description: "Artificial Intelligence research and development.",
    image: "/image/Ai.webp",
    github: "https://github.com/project/blinkit"
  },
  {
    title: "Evigo.in",
    description: "Machine Learning and Web services integration.",
    image: "/image/Ml.webp",
    github: "https://github.com/project/evego"
  },
  {
    title: "Profile Card",
    description: "Responsive personal identity card project.",
    image: "https://i.postimg.cc/C5txzdTX/Screenshot-20250518-194303-3.png",
    github: "https://github.com/project/profileCard"
  }
];

const features = [
  {
    title: "Developer Tools",
    description: "Online coding tools, editors, and playgrounds to test and run your code instantly.",
    icon: Code2,
    href: "/tools",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Widget Generator",
    description: "Ready-to-use embeddable widgets (forms, galleries, popups) for your websites.",
    icon: Blocks,
    href: "/widgets",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Code Marketplace",
    description: "Premium UI templates, React components, and JS plugins ready for production.",
    icon: ShoppingCart,
    href: "/marketplace",
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "SaaS Utilities",
    description: "Powerful mini-tools like image processors, format converters, and code minifiers.",
    icon: Wrench,
    href: "/saas",
    color: "from-orange-400 to-red-500",
  },
  {
    title: "System Documentation",
    description: "Deep-dive into our technical architecture, API references, and specialized engineering protocols.",
    icon: BookOpen,
    href: "/docs",
    color: "from-emerald-500 to-teal-400",
  },
  {
    title: "Free Resources",
    description: "Open-source snippets, CSS tricks, and UI components available for free.",
    icon: FileCode2,
    href: "/resources",
    color: "from-indigo-400 to-blue-600",
  },
];

const stats = [
  { label: "Active Users", value: "10K+", icon: Globe },
  { label: "Deployments", value: "50K+", icon: Rocket },
  { label: "Uptime", value: "99.9%", icon: ShieldCheck },
  { label: "Components", value: "200+", icon: Cpu },
];

function Typewriter({ text }: { text: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = text[index];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % text.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, text]);

  return (
    <span className="text-secondary font-bold">
      {displayText}
      <span className="animate-pulse border-r-2 border-secondary ml-1" />
    </span>
  );
}
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("perspective-1000", className)}
    >
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-24 selection:bg-primary selection:text-white">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-neutral-950/10 rounded-full blur-[120px] -z-10" />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-16 md:pt-44 md:pb-32 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-64 h-64 md:w-96 md:h-96"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full -z-10" />
          <div className="w-full h-full rounded-full border-2 border-white/10 p-2 overflow-hidden group">
            <Image 
              src="/image/profile.jpg" 
              alt="Afroj Profile" 
              width={400} 
              height={400} 
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </motion.div>

        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-primary text-xs font-black tracking-widest uppercase italic"
          >
            <Sparkles className="w-4 h-4" /> Available for Opportunities
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9]"
          >
            Hi It&apos;s <span className="text-secondary drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">Afroj</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-black italic"
          >
            I&apos;m a <Typewriter text={ROLES} />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-medium"
          >
            I&apos;m actively seeking <strong>internship or entry-level</strong> job opportunities. With <strong>hands-on experience in automation</strong> and practical application of <strong>SIEM skills</strong>, I also engage in <strong>freelancing and bug hunting.</strong> My expertise spans Offensive Security, Network Security and Web Security Auditing.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center md:justify-start gap-6 items-center"
          >
            <div className="flex gap-4">
              {[
                { icon: Shield, href: "https://www.linkedin.com/in/afroj-ahmad-6a626729a" },
                { icon: Code2, href: "https://github.com/Bytecore-website/bytecorecomputercentre" },
                { icon: Globe, href: "https://medium.com/Coderafroj" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all active:scale-90"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-order-form'))}
              className="px-8 py-4 rounded-full bg-white text-black font-black hover:bg-primary hover:text-white transition-all active:scale-95 shadow-xl uppercase text-xs tracking-[0.2em]"
            >
              Consult Me Now
            </button>
          </motion.div>
        </div>
      </section>

      <div className="portfolio-line max-w-7xl mx-auto opacity-50" />

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter">PROJECTS</h2>
          <p className="text-xl text-neutral-500 italic">Showcasing my technical journey through code and security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 portfolio-dim-group">
          {portfolioProjects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="portfolio-dim-item group glass-card overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-700"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-black tracking-tight">{project.title}</h3>
                  <a 
                    href={project.github} 
                    target="_blank"
                    className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all"
                  >
                    <Code2 size={18} />
                  </a>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-neutral-400 text-sm font-medium leading-relaxed italic">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="portfolio-line max-w-7xl mx-auto opacity-30" />

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="text-center mb-16 md:mb-24 space-y-4 relative z-10">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter">SKILLS</h2>
          <p className="text-xl text-neutral-500 italic">My weapon of choice and expertise mapping.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {skills.map((skillGroup, idx) => (
            <TiltCard 
              key={idx}
              className={cn(
                "h-full",
                idx === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-2"
              )}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 flex flex-col items-center justify-center text-center group h-full relative overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${skillGroup.color}`} />
                
                <div className={`w-20 h-20 rounded-3xl mb-8 flex items-center justify-center bg-gradient-to-br ${skillGroup.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <skillGroup.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-black mb-6 tracking-tight uppercase italic">{skillGroup.category}</h3>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span 
                      key={i}
                      className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-neutral-400 group-hover:text-white group-hover:border-primary/30 transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      <div className="portfolio-line max-w-7xl mx-auto opacity-30" />

      {/* Experience Section */}
      <section id="experience" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Experience</h2>
          <p className="text-xl text-neutral-500 italic">My professional growth and contributions.</p>
        </div>

        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <TiltCard key={idx}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-10 rounded-[2.5rem] border-white/5 group hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <exp.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black italic">{exp.role}</h3>
                      <p className="text-primary font-bold uppercase tracking-wider text-sm">{exp.company}</p>
                    </div>
                  </div>
                  <div className="px-6 py-2 rounded-full glass border border-white/10 text-neutral-400 font-bold text-sm h-fit">
                    {exp.period}
                  </div>
                </div>
                <p className="text-neutral-400 text-lg leading-relaxed md:ml-22 italic">
                  {exp.description}
                </p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </section>

      <div className="portfolio-line max-w-7xl mx-auto opacity-30" />

      {/* Education Section */}
      <section id="education" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Education</h2>
          <p className="text-xl text-neutral-500 italic">Foundational knowledge and certifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2.5rem] border-white/5 border-l-8 border-l-secondary"
          >
            <h3 className="text-2xl font-black italic mb-2">Advance Computer Science</h3>
            <p className="text-secondary font-bold uppercase tracking-wider text-sm mb-4">Self-Taught & Focused Training</p>
            <p className="text-neutral-400 leading-relaxed italic">
              Extensive focus on Cybersecurity, Defensive & Offensive tactics, Networking protocols, and modern Web Development stacks.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-10 rounded-[2.5rem] border-white/5 border-l-8 border-l-primary"
          >
            <h3 className="text-2xl font-black italic mb-2">Cybersecurity Specialist</h3>
            <p className="text-primary font-bold uppercase tracking-wider text-sm mb-4">Professional Certifications</p>
            <p className="text-neutral-400 leading-relaxed italic">
              Specialized training in SIEM tools, Vulnerability Assessment, and Penetration Testing.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="portfolio-line max-w-7xl mx-auto opacity-30" />

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Contact Form</h2>
          <p className="text-xl text-neutral-500 italic">Let&apos;s build something legendary together.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
          
          <form action="https://getform.io/f/bpjpkmzb" method="POST" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-neutral-500 ml-1">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your name" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary/50 transition-colors"
                  required 
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-neutral-500 ml-1">Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary/50 transition-colors"
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-neutral-500 ml-1">Your Message</label>
              <textarea 
                name="message" 
                placeholder="I am utilizing a 3rd party service for this form, so please do not provide any information you consider sensitive." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-primary/50 transition-colors min-h-[200px] transition-all"
                required
              />
            </div>
            
            <button 
              type="submit"
              className="w-full py-6 rounded-2xl orange-gradient text-white font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-3 group"
            >
              Send Message <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </motion.div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center space-y-6">
        <div className="text-neutral-500 flex items-center justify-center gap-2 font-bold italic">
          &copy; 2025 <span className="text-white hover:text-primary transition-colors cursor-pointer font-black">CODERAFROJ</span> • All rights reserved.
        </div>
        <div className="flex justify-center gap-8">
          <Link href="/saas" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">SaaS Utilities</Link>
          <Link href="/docs" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Documentation</Link>
          <Link href="/marketplace" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Marketplace</Link>
        </div>
      </footer>
    </div>
  );
}
