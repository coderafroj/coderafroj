"use client";

import Link from "next/link";
import { Code2, Github, Twitter, Menu, X, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Tools", href: "/tools" },
    { name: "Widgets", href: "/widgets" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "SaaS", href: "/saas" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
      isScrolled 
        ? "bg-background/80 backdrop-blur-xl border-white/10 py-3 shadow-2xl" 
        : "bg-transparent border-transparent py-6"
    )}>
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500">
               <img src="/logo.png" alt="Kodarafroj Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 group-hover:to-white transition-all duration-500">
            Kodarafroj
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2 rounded-full text-sm font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">{link.name}</span>
              <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login" className="px-6 py-2.5 rounded-xl text-sm font-bold text-neutral-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="group px-6 py-2.5 rounded-xl bg-white text-black text-sm font-black hover:bg-primary hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center gap-2">
            Get Started <Rocket size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 rounded-xl glass border-white/5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="container px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-black tracking-tighter hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-4" />
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" className="py-4 rounded-2xl glass text-center font-bold">Log in</Link>
                <Link href="/signup" className="py-4 rounded-2xl bg-white text-black text-center font-black">Sign up</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
