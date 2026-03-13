import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Code2, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-black/20 backdrop-blur-xl mt-auto">
      <div className="container max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
        
        {/* Brand Column */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
              <img src="/logo.png" alt="Kodarafroj Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-2xl tracking-tighter">Kodarafroj</span>
          </Link>
          <p className="text-sm text-neutral-500 leading-relaxed mb-6 italic">
            Building the next generation of developer ecosystems. One utility at a time.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 rounded-lg glass hover:bg-white/10 text-neutral-400 hover:text-white transition-all"><Github size={18} /></Link>
            <Link href="#" className="p-2 rounded-lg glass hover:bg-white/10 text-neutral-400 hover:text-white transition-all"><Twitter size={18} /></Link>
            <Link href="#" className="p-2 rounded-lg glass hover:bg-white/10 text-neutral-400 hover:text-white transition-all"><Linkedin size={18} /></Link>
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400 mb-6">Platforms</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/tools" className="text-neutral-500 hover:text-primary transition-colors">Developer Tools</Link></li>
            <li><Link href="/widgets" className="text-neutral-500 hover:text-primary transition-colors">Widget Factory</Link></li>
            <li><Link href="/marketplace" className="text-neutral-500 hover:text-primary transition-colors">Code Marketplace</Link></li>
            <li><Link href="/saas" className="text-neutral-500 hover:text-primary transition-colors">SaaS Utilities</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400 mb-6">Resources</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/resources" className="text-neutral-500 hover:text-primary transition-colors">Asset Library</Link></li>
            <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors">API Docs</Link></li>
            <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors">Changelog</Link></li>
            <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors">Community</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400 mb-6">Legal</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors">Licensing</Link></li>
            <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors">Support</Link></li>
          </ul>
        </div>

      </div>

      <div className="w-full border-t border-white/5 py-8">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-neutral-600 uppercase tracking-[0.2em]">
           <p>© {currentYear} Kodarafroj. All rights reserved.</p>
           <p className="flex items-center gap-1.5 hover:text-neutral-400 transition-colors cursor-default">
             Made with <Heart size={12} className="text-rose-500 fill-current" /> by the Kodara Team
           </p>
        </div>
      </div>
    </footer>
  );
}
