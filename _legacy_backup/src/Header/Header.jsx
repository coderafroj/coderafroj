import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-primary/20">
            <Cpu size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase hero-gradient-text italic">
            Coderafroj
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Github', path: '/github' },
            { name: 'Tutorials', path: '/tutorials' }
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-all hover:text-primary ${isActive ? "text-primary" : "text-dim-text"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact">
            <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}