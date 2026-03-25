"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Sparkles, Code2, 
  Blocks, ShoppingCart, Wrench, FileCode2,
  Plus, LogIn, UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import OrderForm from "./OrderForm";

const navLinks = [
  { name: "Tools", href: "/tools", icon: Code2 },
  { name: "Widgets", href: "/widgets", icon: Blocks },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingCart },
  { name: "SaaS", href: "/saas", icon: Wrench },
  { name: "Resources", href: "/resources", icon: FileCode2 },
  { name: "AI Architect", href: "/tools/ai-architect", icon: Cpu, premium: true },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
];

import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const { user, profile, isAdmin, isPro, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const handleOpenOrder = () => setIsOrderFormOpen(true);
    window.addEventListener('open-order-form', handleOpenOrder);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('open-order-form', handleOpenOrder);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 pt-4",
        isScrolled ? "pb-4" : "pb-0"
      )}
    >
      <nav className={cn(
        "max-w-7xl mx-auto transition-all duration-500 rounded-2xl border border-white/10",
        isScrolled ? "glass shadow-2xl py-3 px-6" : "bg-transparent py-5 px-4 border-transparent"
      )}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-11 h-11 rounded-xl bg-primary flex items-center justify-center neon-glow group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-tight">
                KODARAFROJ<span className="text-primary">.</span>
              </span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none">
                Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full p-1 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-bold transition-all relative group flex items-center gap-2",
                  pathname === link.href 
                    ? "text-primary" 
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {pathname === link.href && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                {link.name}
                {link.premium && (
                   <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-md font-black italic">PRO</span>
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
             {isAdmin && (
                <Link 
                  href="/admin" 
                  className="p-2.5 rounded-xl glass border-white/5 text-neutral-400 hover:text-primary transition-all hover:scale-110 active:scale-95"
                >
                  <LayoutDashboard size={20} />
                </Link>
             )}
             
             <button 
              onClick={() => setIsOrderFormOpen(true)}
              className="px-5 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-bold hover:bg-primary/10 transition-all flex items-center gap-2"
            >
              <Plus size={16} /> Order Software
            </button>
            <div className="h-6 w-px bg-white/10 mx-2" />
            
            {!user ? (
               <>
                  <Link 
                    href="/login" 
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <LogIn size={16} /> Log in
                  </Link>
                  <Link 
                    href="/signup" 
                    className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-black hover:bg-neutral-200 transition-all flex items-center gap-2"
                  >
                    Sign up <UserPlus size={16} />
                  </Link>
               </>
            ) : (
               <div className="flex items-center gap-4 pl-2">
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] font-black text-white leading-none mb-1 uppercase tracking-widest">{profile?.role || 'User'}</span>
                     <span className="text-[8px] text-neutral-500 leading-none">{user.email}</span>
                  </div>
                  <div className="relative">
                     {isPro && (
                        <div className="absolute -top-1 -right-1 z-10">
                           <Crown size={12} className="text-yellow-500 fill-current drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                        </div>
                     )}
                     <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black">
                        {user.email?.[0].toUpperCase()}
                     </div>
                  </div>
               </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 rounded-xl glass border-white/5 text-neutral-400"
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
              className="lg:hidden pt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2 pb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white/5 border border-white/5 text-neutral-300 text-lg font-bold"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-5 h-5 text-primary" />
                      {link.name}
                    </div>
                    <motion.div whileHover={{ x: 5 }}>
                      <Plus className="rotate-45" size={16} />
                    </motion.div>
                  </Link>
                ))}
                
                <div className="h-px bg-white/5 my-4" />
                
                <div className="grid grid-cols-1 gap-3">
                   <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsOrderFormOpen(true);
                    }}
                    className="py-4 rounded-2xl bg-primary text-white font-black flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Order Custom Software
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="py-4 rounded-2xl glass text-center font-bold flex items-center justify-center gap-2">
                       <LogIn size={18} /> Log in
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="py-4 rounded-2xl bg-white text-black text-center font-black flex items-center justify-center gap-2">
                       Sign up <UserPlus size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <OrderForm isOpen={isOrderFormOpen} onClose={() => setIsOrderFormOpen(false)} />
    </header>
  );
}
