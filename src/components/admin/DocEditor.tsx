"use client";

import { useState, useEffect } from "react";
import MarkdownRenderer from "@/components/docs/MarkdownRenderer";
import { 
  Save, 
  Trash2, 
  Eye, 
  Edit3, 
  Plus, 
  ChevronLeft,
  Layout,
  Type,
  Link,
  Tag,
  Hash
} from "lucide-react";
import { docsService, DocCategory } from "@/lib/docs-service";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DocEditorProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    content: string;
    categoryId: string;
    order: number;
    description?: string;
  };
  onSave: (doc: any) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export default function DocEditor({ initialData, onSave, onDelete }: DocEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [order, setOrder] = useState(initialData?.order || 1);
  const [description, setDescription] = useState(initialData?.description || "");
  
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [view, setView] = useState<"edit" | "preview" | "split">("split");
  const [saving, setSaving] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    docsService.getCategories().then(setCategories);
  }, []);

  const handleAutoSlug = () => {
    if (!slug && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !categoryId) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    setSaving(true);
    try {
      await onSave({ title, slug, content, categoryId, order, description });
      router.push("/admin/docs");
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = async () => {
     if (!newCatName) return;
     try {
       const slug = newCatName.toLowerCase().replace(/ /g, '-');
       await docsService.addCategory({ name: newCatName, slug, order: categories.length + 1 });
       const updatedCats = await docsService.getCategories();
       setCategories(updatedCats);
       setShowCategoryModal(false);
       setNewCatName("");
     } catch (err) {
        console.error(err);
     }
  };

  return (
    <div className="flex flex-col h-screen bg-[#030303] text-white">
      {/* Top Header */}
      <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-3xl sticky top-0 z-50">
         <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="p-3 rounded-2xl glass hover:bg-white/10 transition-colors">
               <ChevronLeft size={20} />
            </button>
            <div>
               <h2 className="text-xl font-black italic tracking-tighter">DOC_EDITOR_v4</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">Protocol Interface</p>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <div className="flex p-1 glass rounded-2xl border border-white/5">
                <button 
                  onClick={() => setView("edit")}
                  className={cn("p-2 px-6 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", view === "edit" ? "bg-white text-black" : "text-neutral-500 hover:text-white")}
                >
                   <Edit3 size={14} /> EDIT
                </button>
                <button 
                  onClick={() => setView("split")}
                  className={cn("p-2 px-6 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", view === "split" ? "bg-white text-black" : "text-neutral-500 hover:text-white")}
                >
                   <Layout size={14} /> SPLIT
                </button>
                <button 
                  onClick={() => setView("preview")}
                  className={cn("p-2 px-6 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", view === "preview" ? "bg-white text-black" : "text-neutral-500 hover:text-white")}
                >
                   <Eye size={14} /> PREVIEW
                </button>
            </div>

            <div className="h-10 w-[1px] bg-white/5 mx-2" />

            {initialData?.id && onDelete && (
               <button 
                 onClick={() => { if(confirm("Are you sure?")) onDelete(initialData.id!); }}
                 className="p-3 rounded-2xl border border-red-500/10 text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={20} />
               </button>
            )}

            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-3 bg-emerald-500 px-8 py-3 rounded-2xl font-black text-black text-xs hover:bg-emerald-400 transition-all uppercase tracking-widest neon-glow disabled:opacity-50"
            >
              <Save size={18} /> {saving ? "PROCESSING..." : "COMMIT_CHANGES"}
            </button>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Left Controls/Inputs */}
         <div className="w-96 border-r border-white/5 p-8 flex flex-col gap-10 overflow-y-auto bg-white/[0.01]">
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                     <Type size={12} /> TITLE_FIELD
                  </div>
                  <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleAutoSlug}
                    placeholder="Enter page title..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all"
                  />
               </div>

               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                     <Link size={12} /> PROTOCOL_SLUG
                  </div>
                  <input 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="getting-started"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all text-neutral-500"
                  />
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                        <Tag size={12} /> DATA_CATEGORY
                     </div>
                     <button onClick={() => setShowCategoryModal(true)} className="text-[8px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1 hover:opacity-100 opacity-60">
                        <Plus size={10} /> NEW
                     </button>
                  </div>
                  <select 
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black outline-none focus:border-emerald-500/50 transition-all appearance-none italic"
                  >
                     <option value="" className="bg-[#0a0a0a]">-- Select Hierarchy --</option>
                     {categories.map(c => (
                        <option key={c.id} value={c.id} className="bg-[#0a0a0a]">{c.name}</option>
                     ))}
                  </select>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                        <Hash size={12} /> ORDER_INDEX
                     </div>
                     <input 
                       type="number"
                       value={order}
                       onChange={(e) => setOrder(parseInt(e.target.value))}
                       className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all"
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                     <Edit3 size={12} /> SHORT_DESC
                  </div>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief objective summary..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all resize-none h-32"
                  />
               </div>
            </div>

            <div className="mt-auto p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2 block">Markdown Enabled</span>
               <p className="text-[10px] font-medium italic text-neutral-600 leading-relaxed">
                  Support for multi-line code, premium callouts like [!NOTE], [!TIP], [!IMPORTANT], and standard GFM.
               </p>
            </div>
         </div>

         {/* Right Editor Area */}
         <div className="flex-1 flex overflow-hidden">
            {/* Editor Input */}
            {(view === "edit" || view === "split") && (
               <div className={cn("flex-1 h-full border-r border-white/5 bg-black/10 relative", view === "edit" ? "w-full" : "w-1/2")}>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full bg-transparent p-12 outline-none font-mono text-sm leading-relaxed text-neutral-300 resize-none transition-colors focus:bg-white/[0.01]"
                    placeholder="# Start writing documentation..."
                  />
               </div>
            )}

            {/* Preview Output */}
            {(view === "preview" || view === "split") && (
               <div className={cn("h-full overflow-y-auto p-12 bg-black/40 custom-scrollbar prose-invert", view === "preview" ? "flex-1" : "w-1/2")}>
                  {content ? (
                     <MarkdownRenderer content={content} />
                  ) : (
                     <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                        <div className="w-16 h-[2px] bg-white" />
                        <span className="text-xs font-black uppercase tracking-widest">Awaiting Content Protocol...</span>
                        <div className="w-16 h-[2px] bg-white" />
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>

      {/* New Category Modal */}
      {showCategoryModal && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowCategoryModal(false)} />
            <div className="relative w-full max-w-md glass-card p-10 rounded-[3rem] border-white/10 bg-[#0a0a0a] shadow-2xl">
               <h3 className="text-2xl font-black italic mb-8">INITIALIZE_CATEGORY</h3>
               <div className="space-y-6">
                  <input 
                    autoFocus
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Enter category name..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50"
                  />
                  <div className="flex gap-4">
                     <button 
                        onClick={() => setShowCategoryModal(false)}
                        className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                     >
                        ABORT
                     </button>
                     <button 
                        onClick={handleAddCategory}
                        className="flex-1 bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest neon-glow"
                     >
                        INITIALIZE
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
