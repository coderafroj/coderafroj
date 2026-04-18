import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="space-y-8 max-w-md">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">
                CODERAFROJ<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-neutral-500 text-lg leading-relaxed italic">
              Building secure, high-performance digital experiences. Specializing in Full Stack Development and Cybersecurity research.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/Bytecore-website/bytecorecomputercentre" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/afroj-ahmad-6a626729a" },
                { icon: Twitter, href: "#" },
                { icon: Mail, href: "mailto:hello@kodarafroj.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all active:scale-90"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-[0.3em] opacity-40">Navigate</h4>
              <ul className="space-y-4">
                {["Home", "Projects", "Skills", "Experience"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/#${item.toLowerCase()}`}
                      className="text-neutral-500 hover:text-primary transition-colors font-bold italic"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 text-right md:text-left">
               <button 
                  onClick={scrollToTop}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
               >
                  <ArrowUp className="group-hover:-translate-y-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} CODERAFROJ • All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-neutral-600 text-[10px] font-black uppercase tracking-[0.3em]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="text-white/10">|</span>
            <span className="text-primary italic">Handcrafted with Passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
