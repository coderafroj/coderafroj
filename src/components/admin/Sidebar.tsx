"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  StickyNote, 
  Settings, 
  Globe, 
  Users, 
  ShoppingBag,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Notes Manager", href: "/admin/notes", icon: StickyNote, pro: true },
  { name: "Website Control", href: "/admin/control", icon: Globe },
  { name: "System Stats", href: "/admin/stats", icon: Activity },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile } = useAuth();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const NavItem = ({ item, isMobile = false }: { item: any, isMobile?: boolean }) => {
    const isActive = pathname === item.href;
    
    return (
      <Link 
        href={item.href}
        onClick={() => isMobile && setMobileOpen(false)}
        className={cn(
          "relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all group overflow-hidden",
          isActive 
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10" 
            : "text-zinc-500 hover:text-white hover:bg-white/[0.03] border border-transparent"
        )}
      >
        <item.icon size={20} className={cn("shrink-0 transition-transform duration-300", isActive && "scale-110")} />
        
        <AnimatePresence>
          {(!isCollapsed || isMobile) && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-sm font-bold tracking-tight whitespace-nowrap"
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>

        {isActive && (
          <motion.div 
            layoutId="active-pill"
            className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {item.pro && !isCollapsed && (
          <span className="ml-auto flex items-center justify-center p-1 rounded-md bg-zinc-900 border border-white/5">
             <Zap size={10} className="text-zinc-400 fill-zinc-400" />
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="fixed top-4 left-4 z-[60] md:hidden">
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-3 bg-zinc-900 border border-white/5 rounded-2xl text-white shadow-2xl backdrop-blur-xl"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: mobileOpen ? "280px" : isCollapsed ? "80px" : "280px",
          x: mobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768) ? -300 : 0
        }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-zinc-950/80 backdrop-blur-2xl border-r border-white/5 z-[55] flex flex-col p-4 transition-all duration-300",
          mobileOpen && "x-0"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-3 py-6 mb-8 border-b border-white/5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            C
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h1 className="text-lg font-black tracking-tighter text-white uppercase italic leading-none">Coderaf <span className="text-emerald-500 font-bold tracking-normal italic not-italic">HUB</span></h1>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-none mt-1">Admin Central</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1">
          <div className="mb-4">
             {!isCollapsed && <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.2em] px-4 mb-4">Core Menu</p>}
             <div className="space-y-1">
               {MENU_ITEMS.map((item) => <NavItem key={item.name} item={item} isMobile={mobileOpen} />)}
             </div>
          </div>

          <div className="mt-8">
             {!isCollapsed && <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.2em] px-4 mb-4">Support</p>}
             <div className="space-y-1">
                <NavItem item={{ name: "Help Center", href: "/admin/help", icon: ShieldCheck }} isMobile={mobileOpen} />
             </div>
          </div>
        </nav>

        {/* Profile Footer */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <div className={cn(
            "p-3 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-3",
            isCollapsed && !mobileOpen ? "justify-center" : "px-4"
          )}>
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-bold text-emerald-500">
               {profile?.email?.[0].toUpperCase() || "A"}
            </div>
            {(!isCollapsed || mobileOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{profile?.email || "Admin User"}</p>
                <p className="text-[9px] text-zinc-600 font-semibold uppercase tracking-widest">Master Admin</p>
              </div>
            )}
            {(!isCollapsed || mobileOpen) && (
              <button title="Logout" className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/5 transition-all">
                <LogOut size={16} />
              </button>
            )}
          </div>

          {!mobileOpen && (
            <button 
              onClick={toggleSidebar}
              className="mt-4 w-full py-2 flex items-center justify-center text-zinc-700 hover:text-zinc-500 transition-all border border-transparent hover:border-white/5 rounded-xl"
            >
              <ChevronRight size={16} className={cn("transition-transform duration-300", !isCollapsed && "rotate-180")} />
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
}
