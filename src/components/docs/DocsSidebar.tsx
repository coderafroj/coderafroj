"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Terminal, 
  Layers, 
  Workflow, 
  ShieldCheck,
  Search,
  Command
} from "lucide-react";
import { docsService, DocCategory, DocumentationDoc } from "@/lib/docs-service";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function DocsSidebar() {
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
        
        // Auto-expand category of active doc
        const activeDoc = docsData.find(d => `/docs/${d.slug}` === pathname);
        if (activeDoc) {
          setExpandedCats([activeDoc.categoryId]);
        } else {
          // Default expand first category
          if (catsData.length > 0) setExpandedCats([catsData[0].id]);
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
      <div className="w-80 h-full border-r border-white/5 p-8 space-y-8 animate-pulse">
        <div className="h-12 bg-white/5 rounded-2xl" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-white/5 rounded-xl w-[80%]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="w-80 border-r border-white/5 h-full flex flex-col bg-black/20 backdrop-blur-3xl sticky top-0">
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <BookOpen size={20} className="text-emerald-500" />
           </div>
           <div>
              <h2 className="text-sm font-black italic tracking-widest text-white/90">KODARAFROJ</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">Documentation</p>
           </div>
        </div>

        <div className="relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-emerald-500 transition-colors" />
           <input 
              type="text" 
              placeholder="SEARCH PROTOCOL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest placeholder:text-neutral-700 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
           />
           <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
              <Command size={10} />
              <span className="text-[8px] font-black">K</span>
           </div>
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
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight size={14} className={cn("text-neutral-600 transition-transform duration-300", isExpanded && "rotate-90 text-emerald-500")} />
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors",
                    isExpanded ? "text-white" : "text-neutral-600"
                  )}>
                    {cat.name}
                  </span>
                </div>
                {catDocs.length > 0 && (
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-700 group-hover:text-neutral-400">
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
                    <div className="ml-6 pl-3 border-l border-white/5 space-y-1 py-2">
                       {catDocs.map(doc => {
                         const isActive = pathname === `/docs/${doc.slug}`;
                         return (
                           <Link 
                              key={doc.id} 
                              href={`/docs/${doc.slug}`}
                              className={cn(
                                "flex items-center gap-3 p-2.5 rounded-lg text-[11px] font-medium italic transition-all group/item",
                                isActive 
                                  ? "bg-emerald-500/10 text-emerald-500 border-l-2 border-emerald-500 -ml-[13px] pl-[11px]" 
                                  : "text-neutral-500 hover:text-white hover:bg-white/5"
                              )}
                           >
                              <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-neutral-800")} />
                              {doc.title}
                           </Link>
                         );
                       })}
                       {catDocs.length === 0 && (
                          <div className="text-[10px] text-neutral-700 italic py-2 pl-4">No entries found.</div>
                       )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {categories.length === 0 && (
          <div className="px-8 py-12 text-center space-y-4">
             <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/10 mx-auto flex items-center justify-center">
                <Workflow className="text-neutral-800" size={24} />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-neutral-700 leading-relaxed italic">
                Awaiting documentation initialization...
             </p>
          </div>
        )}
      </nav>

      <div className="p-8 border-t border-white/5 mt-auto">
         <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/10 group cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
               <ShieldCheck size={14} className="text-emerald-500" />
               <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500/60">PRO_SUPPORT</span>
            </div>
            <p className="text-[10px] font-medium italic text-neutral-500 leading-tight group-hover:text-neutral-300 transition-colors">
               Direct access to the core engineering neural link.
            </p>
         </div>
      </div>
    </aside>
  );
}
