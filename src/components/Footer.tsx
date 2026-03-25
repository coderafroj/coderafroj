import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const footerLinks = [
  {
    title: "Ecosystem",
    links: [
      { name: "Developer Tools", href: "/tools" },
      { name: "Widget Generator", href: "/widgets" },
      { name: "Code Marketplace", href: "/marketplace" },
      { name: "SaaS Utilities", href: "/saas" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact Sales", href: "/contact" },
      { name: "Custom Solutions", href: "/custom" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Free Snippets", href: "/resources" },
      { name: "API Reference", href: "/api" },
      { name: "Support Hub", href: "/support" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center neon-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                KODARAFROJ<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-neutral-500 text-lg leading-relaxed max-w-sm">
              Empowering developers with high-performance tools and custom software solutions that scale.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: siteConfig.links.github },
                { icon: Twitter, href: siteConfig.links.twitter },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "mailto:hello@kodarafroj.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-primary/50 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-6">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-neutral-500 hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Kodarafroj Ecosystem. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-neutral-600 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/rss" className="hover:text-white transition-colors">RSS Feed</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
