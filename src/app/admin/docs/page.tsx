"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  FileText, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ExternalLink,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Layout,
  ArrowUpRight
} from "lucide-react";
import { docsService, DocCategory, DocumentationDoc } from "@/lib/docs-service";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function DocsAdminPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [docs, setDocs] = useState<DocumentationDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const [catsData, docsData] = await Promise.all([
        docsService.getCategories(),
        docsService.getDocs()
      ]);
      setCategories(catsData);
      setDocs(docsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this protocol entry?")) {
      await docsService.deleteDoc(id);
      fetchData();
    }
  };

  const filteredDocs = docs.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.slug.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || loading) return (
     <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-t-2 border-emerald-500 animate-spin" />
     </div>
  );

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#030303] text-white pb-32 pt-44 px-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">
                 <ShieldCheck size={14} />
                 DOCUMENTATION_CORE
              </div>
              <h1 className="text-6xl font-black italic mask-text italic">DOCS <br /> <span className="neon-text not-italic uppercase">NETWORK.</span></h1>
           </div>
           
           <div className="flex gap-4">
              <Link href="/admin/docs/new" className="flex items-center gap-3 bg-white px-8 py-3 rounded-2xl font-black text-black text-xs hover:bg-emerald-400 transition-all uppercase tracking-widest neon-glow">
                 <Plus size={18} /> INITIALIZE_DOC
              </Link>
           </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Main List */}
           <div className="lg:col-span-8 space-y-8">
              <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.01] border-white/5 relative overflow-hidden">
                 <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <BookOpen size={24} className="text-emerald-500" />
                       </div>
                       <h3 className="text-2xl font-black tracking-tight italic uppercase">ACTIVE_PROTOCOLS</h3>
                    </div>
                    
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-emerald-500 transition-colors" />
                       <input 
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Filter data..." 
                          className="bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-[10px] font-black italic outline-none focus:border-emerald-500/50 transition-all w-64"
                       />
                    </div>
                 </div>

                 <div className="space-y-4">
                    {filteredDocs.length === 0 ? (
                       <div className="py-24 text-center space-y-6">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/5 mx-auto flex items-center justify-center">
                             <FileText className="text-neutral-800" size={32} />
                          </div>
                          <p className="text-neutral-600 italic font-medium">No documentation fragments detected in the current node.</p>
                       </div>
                    ) : (
                       filteredDocs.map((doc, i) => (
                          <motion.div 
                            key={doc.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group p-6 rounded-3xl bg-black/40 border border-white/5 flex items-center justify-between hover:border-emerald-500/30 transition-all"
                          >
                             <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                                   <FileText size={20} className="text-neutral-500 group-hover:text-emerald-500 transition-colors" />
                                </div>
                                <div>
                                   <div className="flex items-center gap-3 mb-1">
                                      <p className="font-black text-lg text-white/90 italic">{doc.title}</p>
                                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/10">
                                         {categories.find(c => c.id === doc.categoryId)?.name || "UNCATEGORIZED"}
                                      </span>
                                   </div>
                                   <p className="text-[10px] text-neutral-600 font-extrabold uppercase tracking-widest">
                                      SLUG: /{doc.slug} • UPDATED_{new Date(doc.lastUpdated.toMillis()).toLocaleDateString()}
                                   </p>
                                </div>
                             </div>
                             
                             <div className="flex items-center gap-3">
                                <div className="h-10 w-[1px] bg-white/5 mx-2" />
                                <Link 
                                  href={`/docs/${doc.slug}`} 
                                  target="_blank"
                                  className="p-3 rounded-xl glass border-white/5 text-neutral-500 hover:text-white transition-all"
                                >
                                   <ExternalLink size={18} />
                                </Link>
                                <Link 
                                  href={`/admin/docs/edit/${doc.id}`}
                                  className="p-3 rounded-xl glass border-white/5 text-neutral-500 hover:text-emerald-500 transition-all"
                                >
                                   <Edit3 size={18} />
                                </Link>
                                <button 
                                  onClick={() => handleDelete(doc.id)}
                                  className="p-3 rounded-xl glass border-white/5 text-neutral-500 hover:text-red-500 transition-all"
                                >
                                   <Trash2 size={18} />
                                </button>
                             </div>
                          </motion.div>
                       ))
                    )}
                 </div>
              </div>
           </div>

           {/* Metrics & Sidebar */}
           <div className="lg:col-span-4 space-y-8">
              <div className="glass-card p-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-transparent border-white/5">
                 <div className="flex items-center gap-4 mb-8">
                    <TrendingUp size={24} className="text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                    <h3 className="text-xl font-black tracking-tight italic">NETWORK_STATS</h3>
                 </div>
                 <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                       <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Total Entries</p>
                       <p className="text-4xl font-black italic tracking-tighter text-emerald-500">{docs.length}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                       <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Active Categories</p>
                       <p className="text-4xl font-black italic tracking-tighter text-white">{categories.length}</p>
                    </div>
                 </div>
              </div>

              <div className="glass-card p-10 rounded-[2.5rem] bg-white/[0.01] border-white/5">
                 <h3 className="text-xl font-black tracking-tight italic mb-8 uppercase">HIERARCHY</h3>
                 <div className="space-y-3">
                    {categories.map(cat => (
                       <div key={cat.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group hover:bg-white/5 transition-all">
                          <div className="flex items-center gap-3">
                             <ChevronRight size={14} className="text-emerald-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-white">{cat.name}</span>
                          </div>
                          <span className="text-[8px] font-black text-neutral-700">{docs.filter(d => d.categoryId === cat.id).length}</span>
                       </div>
                    ))}
                    <button className="w-full flex items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-white/5 text-neutral-600 hover:border-emerald-500/30 hover:text-emerald-500 transition-all text-[10px] font-black uppercase tracking-widest mt-4">
                       <Plus size={16} /> ADD_CATEGORY
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
