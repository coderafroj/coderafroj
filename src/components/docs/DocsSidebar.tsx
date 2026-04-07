"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronRight, 
  BookOpen, 
  X,
  Search,
  Workflow
} from "lucide-react";
import { docsService, DocCategory, DocumentationDoc } from "@/lib/docs-service";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DocsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [docs, setDocs] = useState<DocumentationDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCats, setExpandedCats] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [catsData, docsData] = await Promise.all([
          docsService.getCategories(),
          docsService.getDocs()
        ]);
        setCategories(catsData);
        setDocs(docsData);
        
        const activeDoc = docsData.find(d => `/docs/${d.slug}` === pathname);
        if (activeDoc) {
          setExpandedCats([activeDoc.categoryId]);
        } else if (catsData.length > 0) {
          setExpandedCats([catsData[0].id]);
        }
      } catch (err) {
        console.error("Error fetching sidebar data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [pathname]);

  const toggleCategory = (id: string) => {
    setExpandedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const filteredDocs = (catId: string) => {
    return docs.filter(d => 
      d.categoryId === catId && 
      (d.title.toLowerCase().includes(search.toLowerCase()) || d.slug.toLowerCase().includes(search.toLowerCase()))
    );
  };

  if (loading) {
    return (
      <div className="w-80 h-full border-r border-white/5 p-8 space-y-8 animate-pulse bg-zinc-950">
        <div className="h-10 bg-white/5 rounded-xl w-3/4" />
        <div className="space-y-4 pt-8">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-6 bg-white/5 rounded-lg w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className={cn(
      "w-80 border-r border-white/5 h-full flex flex-col bg-zinc-950 sticky top-0 overflow-hidden transition-transform duration-300 z-[60]",
      "lg:translate-x-0 lg:static lg:block",
      isOpen ? "translate-x-0 fixed inset-y-0 left-0" : "-translate-x-full fixed inset-y-0 left-0"
    )}>
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <BookOpen size={20} className="text-emerald-500" />
           </div>
           <div>
              <h2 className="text-sm font-bold tracking-tight text-white">Documentation Hub</h2>
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">v4.2.0 Stable</p>
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

      <div className="p-8 border-b border-white/5 hidden lg:block">
        <div className="relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
           <input 
              type="text" 
              placeholder="Search documentation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-2.5 pl-11 pr-4 text-[13px] font-medium placeholder:text-zinc-700 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-white"
           />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-4 scrollbar-hide">
        {categories.map((cat) => {
          const catDocs = filteredDocs(cat.id);
          const isExpanded = expandedCats.includes(cat.id);

          if (search && catDocs.length === 0) return null;

          return (
            <div key={cat.id} className="space-y-1">
              <button 
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.02] group transition-all text-left"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight size={14} className={cn("text-zinc-600 transition-transform duration-300", isExpanded && "rotate-90 text-emerald-500")} />
                  <span className={cn(
                    "text-xs font-semibold transition-colors",
                    isExpanded ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                  )}>
                    {cat.name}
                  </span>
                </div>
                {catDocs.length > 0 && !isExpanded && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-700">
                    {catDocs.length}
                  </span>
                )}
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-5 pl-2.5 border-l border-white/5 space-y-1 py-1">
                       {catDocs.map(doc => {
                         const isActive = pathname === `/docs/${doc.slug}`;
                         return (
                           <Link 
                               key={doc.id} 
                               href={`/docs/${doc.slug}`}
                               onClick={() => onClose?.()}
                               className={cn(
                                 "flex items-center gap-3 py-2 px-3 rounded-lg text-[13px] font-medium transition-all group/item",
                                 isActive 
                                   ? "bg-emerald-500/10 text-emerald-500 font-semibold" 
                                   : "text-zinc-500 hover:text-white hover:bg-white/[0.02]"
                               )}
                           >
                               {doc.title}
                           </Link>
                         );
                       })}
                       {catDocs.length === 0 && (
                          <div className="text-[11px] text-zinc-700 italic py-2 pl-4">No documents available.</div>
                       )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {categories.length === 0 && !loading && (
          <div className="px-8 py-12 text-center space-y-4">
             <div className="w-12 h-12 rounded-full border border-dashed border-white/10 mx-auto flex items-center justify-center">
                <Workflow className="text-zinc-800" size={24} />
             </div>
             <p className="text-[12px] font-medium text-zinc-600 leading-relaxed">
                Loading documentation entries...
             </p>
          </div>
        )}
      </nav>

      <div className="p-6 border-t border-white/5">
         <div className="flex items-center gap-3 text-zinc-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">System Live</span>
         </div>
      </div>
    </aside>
  );
}
