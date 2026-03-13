import { Link } from "react-router-dom";
import { Cpu, Github, Youtube, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                <Cpu size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase hero-gradient-text italic">
                Coderafroj
              </span>
            </Link>
            <p className="text-dim-text max-w-sm font-light leading-relaxed">
              Architecting the future of the web through premium engineering and simplified masterclasses. Join our ecosystem and scale your digital legacy.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Github size={20} />, link: "https://github.com/coderafroj" },
                { icon: <Youtube size={20} />, link: "https://youtube.com/@coderafroj" },
                { icon: <Twitter size={20} />, link: "#" },
                { icon: <Instagram size={20} />, link: "#" }
              ].map((social, i) => (
                <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-dim-text hover:bg-primary hover:text-white transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm text-dim-text">
              <li><Link to="/tutorials" className="hover:text-primary transition-colors">Masterclasses</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">Open Source</Link></li>
              <li><Link to="/github" className="hover:text-primary transition-colors">Github Archive</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-sm text-dim-text">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Join Community</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-mono text-dim-text uppercase tracking-widest">
            &copy; 2026 CODERAFROJ • ALL SYSTEMS OPERATIONAL
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono text-dim-text uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}