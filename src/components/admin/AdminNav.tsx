"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  ShieldCheck, 
  Database, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Mail,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: BookOpen, label: "Documentation", href: "/admin/docs" },
  { icon: Users, label: "User Control", href: "/admin/users" },
  { icon: ShoppingBag, label: "Software Tasks", href: "/admin/orders" },
  { icon: Mail, label: "Communications", href: "/admin/messages" },
  { icon: Settings, label: "Settings", href: "/admin/settings" }
];

export default function AdminNav() {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <aside className="w-80 border-r border-white/5 h-screen flex flex-col bg-black/40 backdrop-blur-3xl sticky top-0 z-50">
      <div className="p-10 border-b border-white/5">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
               <ShieldCheck size={24} className="text-emerald-500" />
            </div>
            <div>
               <h2 className="text-lg font-black italic tracking-tighter">EXECUTIVE_GATE</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">Admin Control</p>
            </div>
         </div>

         <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center gap-4">
               <TrendingUp size={16} className="text-emerald-500" />
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">System Integrity: 98%</span>
            </div>
         </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-10 space-y-2 scrollbar-hide">
         {navItems.map((item) => {
           const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
           return (
             <Link 
               key={item.href} 
               href={item.href}
               className={cn(
                 "flex items-center justify-between p-4 rounded-2xl transition-all group",
                 isActive 
                   ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10" 
                   : "text-neutral-500 hover:text-white hover:bg-white/5"
               )}
             >
                <div className="flex items-center gap-4">
                   <item.icon size={20} className={cn("transition-colors", isActive ? "text-emerald-500" : "group-hover:text-white")} />
                   <span className="text-xs font-black uppercase tracking-widest italic">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active" className="w-1 h-5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                )}
             </Link>
           );
         })}
      </nav>

      <div className="p-8 border-t border-white/5 space-y-4">
         <button 
           onClick={handleSignOut}
           className="w-full flex items-center gap-4 p-4 rounded-2xl text-neutral-600 hover:text-red-500 hover:bg-red-500/5 transition-all group"
         >
            <LogOut size={20} />
            <span className="text-xs font-black uppercase tracking-widest italic">LOGOUT_PROTOCOL</span>
         </button>
         
         <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
               <Database size={14} className="text-neutral-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-[8px] font-black uppercase tracking-widest text-neutral-700">NODE_STATUS</span>
               <span className="text-[10px] font-black italic text-emerald-500 uppercase">Operational</span>
            </div>
         </div>
      </div>
    </aside>
  );
}
