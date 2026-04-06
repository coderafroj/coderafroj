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
    <aside className="w-72 border-r border-white/5 h-screen flex flex-col bg-zinc-950 sticky top-0 z-50">
      <div className="p-8 border-b border-white/5">
         <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
               <ShieldCheck size={20} className="text-emerald-500" />
            </div>
            <div>
               <h2 className="text-sm font-bold tracking-tight text-white">Admin Panel</h2>
               <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Management Console</p>
            </div>
         </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-1.5">
         {navItems.map((item) => {
           const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
           return (
             <Link 
               key={item.href} 
               href={item.href}
               className={cn(
                 "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                 isActive 
                   ? "bg-emerald-500/10 text-emerald-500 font-semibold" 
                   : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
               )}
             >
                <div className="flex items-center gap-3">
                   <item.icon size={18} className={cn("transition-colors", isActive ? "text-emerald-500" : "text-zinc-500 group-hover:text-zinc-300")} />
                   <span className="text-sm font-medium">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active" className="w-1 h-4 bg-emerald-500 rounded-full" />
                )}
             </Link>
           );
         })}
      </nav>

      <div className="p-6 border-t border-white/5">
         <button 
           onClick={handleSignOut}
           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all group"
         >
            <LogOut size={18} />
            <span className="text-sm font-medium">Log out</span>
         </button>
      </div>
    </aside>
  );
}
