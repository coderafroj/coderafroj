"use client";

import { useState, useEffect, useRef } from "react";
import MarkdownRenderer from "@/components/docs/MarkdownRenderer";
import NovelRenderer from "@/components/docs/NovelRenderer";
import NovelEditor from "./NovelEditor";
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
  Hash,
  Image as ImageIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Code as CodeIcon,
  List as ListIcon,
  Quote as QuoteIcon,
  CheckCircle2,
  Loader2,
  FileText,
  History
} from "lucide-react";
import { docsService, DocCategory } from "@/lib/docs-service";
import { storageService } from "@/lib/storage-service";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [order, setOrder] = useState(initialData?.order || 1);
  const [description, setDescription] = useState(initialData?.description || "");
  
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [view, setView] = useState<"edit" | "preview" | "split">("split");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const insertText = (before: string, after: string = "") => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = textareaRef.current.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    const newContent = `${beforeText}${before}${selectedText}${after}${afterText}`;
    setContent(newContent);
    
    // Reset focus and selection
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          start + before.length,
          end + before.length
        );
      }
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await storageService.uploadFile(file);
      insertText(`\n![${file.name}](${url})\n`);
    } catch (err) {
      alert("Image upload failed.");
    } finally {
      setUploading(false);
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
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Edit3 size={18} className="text-emerald-500" />
               </div>
               <div>
                  <h2 className="text-xl font-black italic tracking-tighter uppercase">{initialData?.id ? 'PROTOCOL_UPDATE' : 'INITIALIZE_PROTOCOL'}</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">Secure Documentation Interface</p>
               </div>
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
              className="flex items-center gap-3 bg-white px-8 py-3 rounded-2xl font-black text-black text-xs hover:bg-emerald-400 transition-all uppercase tracking-widest shadow-2xl disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
              {saving ? "PROCESSING..." : "COMMIT_CHANGES"}
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
                     <FileText size={12} /> SHORT_DESC (SEO)
                  </div>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief objective summary..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-sm font-black italic outline-none focus:border-emerald-500/50 transition-all resize-none h-32 scrollbar-hide"
                  />
               </div>
            </div>

            <div className="mt-auto space-y-4">
               <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="flex items-center gap-3 mb-2">
                     <History size={14} className="text-emerald-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">LIVE_METRICS</span>
                  </div>
                  <div className="space-y-2 opacity-60">
                     <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                        <span>Characters</span>
                        <span>{content.length}</span>
                     </div>
                     <div className="flex justify-between text-[8px] font-black uppercase tracking-widest">
                        <span>Estimated Read</span>
                        <span>{Math.ceil(content.length / 1500)} min</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Editor Area */}
         <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Toolbar */}
            {(view === "edit" || view === "split") && (
               <div className="h-14 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-8 gap-2 z-20">
                  <button onClick={() => insertText("**", "**")} className="p-2.5 rounded-xl hover:bg-white/5 text-neutral-500 hover:text-white transition-all" title="Bold"><BoldIcon size={16} /></button>
                  <button onClick={() => insertText("_", "_")} className="p-2.5 rounded-xl hover:bg-white/5 text-neutral-500 hover:text-white transition-all" title="Italic"><ItalicIcon size={16} /></button>
                  <div className="h-6 w-[1px] bg-white/5 mx-1" />
                  <button onClick={() => insertText("\n### ", "")} className="p-2.5 rounded-xl hover:bg-white/5 text-neutral-500 hover:text-white transition-all font-black text-xs">H3</button>
                  <button onClick={() => insertText("\n- ", "")} className="p-2.5 rounded-xl hover:bg-white/5 text-neutral-500 hover:text-white transition-all" title="List"><ListIcon size={16} /></button>
                  <button onClick={() => insertText("\n> ", "")} className="p-2.5 rounded-xl hover:bg-white/5 text-neutral-500 hover:text-white transition-all" title="Quote"><QuoteIcon size={16} /></button>
                  <button onClick={() => insertText("`", "`")} className="p-2.5 rounded-xl hover:bg-white/5 text-neutral-500 hover:text-white transition-all" title="Code"><CodeIcon size={16} /></button>
                  <div className="h-6 w-[1px] bg-white/5 mx-1" />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="p-2.5 rounded-xl hover:bg-emerald-500/10 text-neutral-500 hover:text-emerald-500 transition-all flex items-center gap-2"
                  >
                     {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                     <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">ATTACH_MEDIA</span>
                  </button>
                  <input 
                    type="file" 
                    hidden 
                    ref={fileInputRef} 
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  
                  <div className="ml-auto flex items-center gap-4">
                     <span className="text-[8px] font-black uppercase tracking-widest text-neutral-700 italic">Autosave: On</span>
                     <CheckCircle2 size={12} className="text-emerald-500/40" />
                  </div>
               </div>
            )}

            <div className="flex-1 flex overflow-hidden">
               {/* Editor Input */}
               {(view === "edit" || view === "split") && (
                  <div className={cn("flex-1 h-full border-r border-white/5 bg-black/10 relative overflow-y-auto custom-scrollbar", view === "edit" ? "w-full" : "w-1/2")}>
                     <NovelEditor 
                        initialValue={content} 
                        onChange={setContent} 
                     />
                  </div>
               )}

               {/* Preview Output */}
               {(view === "preview" || view === "split") && (
                  <div className={cn("h-full overflow-y-auto p-12 bg-[#050505] custom-scrollbar prose-invert", view === "preview" ? "flex-1" : "w-1/2")}>
                     {content ? (
                        content.startsWith('{') ? (
                           <NovelRenderer content={content} />
                        ) : (
                           <MarkdownRenderer content={content} />
                        )
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                           <div className="w-16 h-[2px] bg-white" />
                           <span className="text-xs font-black uppercase tracking-widest">Awaiting Content Handshake...</span>
                           <div className="w-16 h-[2px] bg-white" />
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* New Category Modal */}
      <AnimatePresence>
         {showCategoryModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-black/90 backdrop-blur-3xl" 
                 onClick={() => setShowCategoryModal(false)} 
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-md glass-card p-12 rounded-[3.5rem] border-white/10 bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.5)]"
               >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                     <Tag size={24} className="text-emerald-500" />
                  </div>
                  
                  <h3 className="text-3xl font-black italic mb-8 tracking-tighter uppercase">NEW_HIERARCHY</h3>
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 ml-4">CATEGORY_NAME</span>
                        <input 
                        autoFocus
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        placeholder="e.g. CORE_MODULES"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm font-black italic outline-none focus:border-emerald-500/50"
                        />
                     </div>
                     <div className="flex gap-4">
                        <button 
                           onClick={() => setShowCategoryModal(false)}
                           className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors italic"
                        >
                           ABORT_ACTION
                        </button>
                        <button 
                           onClick={handleAddCategory}
                           className="flex-1 bg-white text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-2xl"
                        >
                           CONSTRUCT
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
