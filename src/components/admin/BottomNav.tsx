"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  StickyNote, 
  Globe, 
  Settings, 
  PlusCircle,
  Activity,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dash", href: "/admin", icon: LayoutDashboard },
  { name: "Notes", href: "/admin/notes", icon: StickyNote },
  { name: "Create", href: "/admin/notes/new", icon: PlusCircle, highlight: true },
  { name: "Control", href: "/admin/control", icon: Globe },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] md:hidden bg-zinc-950/70 backdrop-blur-2xl border-t border-white/5 px-6 pb-8 pt-3 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
       {NAV_ITEMS.map((item) => {
         const isActive = pathname === item.href;
         
         return (
           <Link 
             key={item.href}
             href={item.href}
             className="relative flex flex-col items-center gap-1 group"
           >
             <div className={cn(
               "p-2.5 rounded-2xl transition-all duration-300 relative overflow-hidden",
               item.highlight ? "bg-emerald-500 text-black -mt-6 scale-110 shadow-lg shadow-emerald-500/20" : 
               isActive ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-600 group-hover:text-zinc-400"
             )}>
                <item.icon size={22} className={cn("shrink-0", isActive && !item.highlight && "scale-110")} />
                
                {isActive && !item.highlight && (
                  <motion.div 
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"
                  />
                )}
             </div>
             
             {!item.highlight && (
               <span className={cn(
                 "text-[10px] font-black uppercase tracking-widest transition-colors",
                 isActive ? "text-emerald-500" : "text-zinc-700"
               )}>
                 {item.name}
               </span>
             )}

             {item.highlight && (
               <div className="absolute -top-1 w-1 h-1 bg-white rounded-full animate-ping opacity-50" />
             )}
           </Link>
         );
       })}
    </nav>
  );
}
