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
  ShoppingBag,
  X,
  CreditCard,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: BookOpen, label: "Knowledge Hub", href: "/admin/docs" },
  { icon: MessageSquare, label: "User Interactions", href: "/admin/messages" },
  { icon: ShoppingBag, label: "Project Queue", href: "/admin/orders" },
  { icon: Users, label: "Staff Control", href: "/admin/users" },
  { icon: Settings, label: "Preferences", href: "/admin/settings" }
];

interface AdminNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminNav({ isOpen, onClose }: AdminNavProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      window.location.href = "/login";
    });
  };

  return (
    <aside className={cn(
      "w-72 border-r border-white/5 h-screen flex flex-col bg-zinc-950 sticky top-0 overflow-hidden transition-transform duration-300 z-[60]",
      "lg:translate-x-0 lg:static lg:block",
      isOpen ? "translate-x-0 fixed inset-y-0 left-0 shadow-2xl shadow-emerald-500/10" : "-translate-x-full fixed inset-y-0 left-0"
    )}>
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:rotate-6 transition-transform">
               <ShieldCheck size={20} className="text-black" />
            </div>
            <div>
               <h2 className="text-sm font-bold tracking-tight text-white uppercase tracking-widest leading-none">Administration</h2>
               <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mt-1">Management Hub</p>
            </div>
         </div>

         {onClose && (
           <button 
             onClick={onClose}
             className="lg:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
           >
             <X size={18} />
           </button>
         )}
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-1">
         {navItems.map((item) => {
           const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
           return (
             <Link 
               key={item.href} 
               href={item.href}
               onClick={() => onClose?.()}
               className={cn(
                 "flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group",
                 isActive 
                   ? "text-emerald-500 font-bold" 
                   : "text-zinc-500 hover:text-white"
               )}
             >
                {isActive && (
                   <motion.div 
                     layoutId="admin-nav-pill"
                     className="absolute inset-0 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                   />
                )}
                <item.icon size={18} className={cn("relative z-10 transition-colors", isActive ? "text-emerald-500" : "text-zinc-700 group-hover:text-zinc-400")} />
                <span className="text-xs font-bold uppercase tracking-widest relative z-10">{item.label}</span>
             </Link>
           );
         })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-zinc-950 space-y-6">
         <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-emerald-500 font-bold border border-white/5 uppercase">
               {user?.email?.[0] || 'A'}
            </div>
            <div className="min-w-0">
               <p className="text-[10px] font-bold text-white leading-none mb-1 truncate">{user?.email?.split('@')[0] || 'Administrator'}</p>
               <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest leading-none">Security Officer</p>
            </div>
         </div>

         <button 
           onClick={handleSignOut}
           className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-zinc-600 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all group"
         >
            <div className="flex items-center gap-3">
               <LogOut size={16} />
               <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
         </button>
      </div>
    </aside>
  );
}
