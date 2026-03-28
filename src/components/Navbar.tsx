"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Sparkles, Code2, 
  Blocks, ShoppingCart, Wrench, FileCode2,
  Plus, LogIn, UserPlus, CpuIcon as Cpu, CreditCard, LayoutDashboard, Crown,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import OrderForm from "./OrderForm";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { name: "Tools", href: "/tools", icon: Code2 },
  { name: "Widgets", href: "/widgets", icon: Blocks },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingCart },
  { name: "SaaS", href: "/saas", icon: Wrench },
  { name: "Resources", href: "/resources", icon: FileCode2 },
  { name: "AI Architect", href: "/tools/ai-architect", icon: Cpu, premium: true },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
];

export function Navbar() {
  const { user, profile, isAdmin, isPro } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    
    const handleOpenOrder = () => setIsOrderFormOpen(true);
    window.addEventListener('open-order-form', handleOpenOrder);
    
    setIsMobileMenuOpen(false);
    setIsOrderFormOpen(false);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('open-order-form', handleOpenOrder);
    };
  }, [pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled ? "py-4 px-4" : "py-6 px-6"
      )}
    >
      <nav className={cn(
        "max-w-7xl mx-auto transition-all duration-500 rounded-[2rem] border border-white/5",
        isScrolled 
          ? "bg-black/60 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] py-2 px-3 pr-2" 
          : "bg-white/[0.03] backdrop-blur-md py-3 px-5 pr-3"
      )}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group pl-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none mb-0.5">
                KODARAFROJ<span className="text-primary">.</span>
              </span>
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] leading-none">
                Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Centered & Unified */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/5 rounded-2xl p-1 backdrop-blur-sm mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-xl text-[13px] font-bold transition-all relative group flex items-center gap-2",
                  pathname === link.href 
                    ? "text-white" 
                    : "text-white/40 hover:text-white/80"
                )}
              >
                {pathname === link.href && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
                {link.premium && (
                   <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            ))}
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-2">
             <button 
                onClick={() => setIsOrderFormOpen(true)}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-[13px] font-black hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group relative overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Plus size={16} /> Order Software
              </button>

             <div className="hidden lg:flex h-8 w-px bg-white/10 mx-2" />

             {!user ? (
                <div className="hidden lg:flex items-center gap-2">
                  <Link 
                    href="/login" 
                    className="px-4 py-2.5 rounded-xl text-[13px] font-bold text-white/40 hover:text-white transition-colors"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/signup" 
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white text-black text-[13px] font-black hover:bg-neutral-200 transition-all active:scale-95 shadow-xl"
                  >
                    Get Started <ArrowRight size={14} />
                  </Link>
                </div>
             ) : (
                <div className="hidden lg:flex items-center gap-3 pl-2 group/user cursor-pointer">
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-white leading-none mb-1 uppercase tracking-widest">{profile?.role || 'User'}</span>
                      <span className="text-[8px] text-white/30 leading-none">{user.email?.split('@')[0]}</span>
                   </div>
                   <div className="relative">
                      {isPro && (
                         <div className="absolute -top-1 -right-1 z-10">
                            <Crown size={12} className="text-yellow-500 fill-current drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                         </div>
                      )}
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black group-hover:border-primary/50 transition-colors">
                         {user.email?.[0].toUpperCase()}
                      </div>
                   </div>
                </div>
             )}

             {/* Mobile Menu Toggle */}
             <button 
                className="lg:hidden w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors ml-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
        </div>

        {/* Improved Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 h-screen bg-black/90 backdrop-blur-xl z-[101] lg:hidden"
              />
              
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-neutral-950/50 border-l border-white/5 z-[102] p-8 flex flex-col lg:hidden overflow-hidden"
              >
                <div className="flex items-center justify-between mb-12">
                   <Link href="/" className="flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-primary" />
                      <span className="font-black text-lg tracking-tighter">KODARAFROJ</span>
                   </Link>
                   <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                     <X size={20} />
                   </button>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-none">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all text-sm font-bold",
                        pathname === link.href 
                          ? "bg-primary/10 border-primary/20 text-primary" 
                          : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <link.icon className="w-5 h-5 opacity-40" />
                        {link.name}
                      </div>
                      {link.premium && (
                        <span className="text-[8px] bg-primary/20 text-primary px-2 py-0.5 rounded-lg font-black">PRO</span>
                      )}
                    </Link>
                  ))}
                </div>
                
                <div className="pt-8 space-y-4">
                   <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsOrderFormOpen(true);
                    }}
                    className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                  >
                    <Plus size={18} /> Order Software
                  </button>
                  
                  {!user ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/login" className="py-4 rounded-2xl bg-white/5 border border-white/10 text-center text-[13px] font-bold">
                         Log in
                      </Link>
                      <Link href="/signup" className="py-4 rounded-2xl bg-white text-black text-center text-[13px] font-black">
                         Sign up
                      </Link>
                    </div>
                  ) : (
                    <div className="p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">
                          {user.email?.[0].toUpperCase()}
                       </div>
                       <div className="flex flex-col min-w-0">
                          <span className="text-xs font-black text-white leading-none mb-1.5 truncate uppercase tracking-widest">{user.email?.split('@')[0]}</span>
                          <span className="text-[10px] text-white/30 leading-none font-bold italic">{profile?.role || 'Free'} Tier</span>
                       </div>
                    </div>
                  )}
                </div>

                <div className="absolute top-1/4 -right-20 w-64 h-64 bg-primary/10 blur-[100px] -z-10 rounded-full" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <OrderForm isOpen={isOrderFormOpen} onClose={() => setIsOrderFormOpen(false)} />
    </header>
  );
}
