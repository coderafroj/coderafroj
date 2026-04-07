"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  StickyNote, 
  Tag, 
  Trash2, 
  Edit3, 
  Pin, 
  Check, 
  X, 
  Loader2,
  Calendar,
  ChevronRight,
  Filter,
  MoreVertical,
  LayoutGrid,
  List,
  AlertCircle,
  Zap,
  Activity,
  Paperclip,
  FileUp,
  Globe,
  Link as LinkIcon,
  ExternalLink
} from "lucide-react";
import { notesService, Note } from "@/lib/notes-service";
import { cn } from "@/lib/utils";
import NovelEditor from "@/components/admin/NovelEditor";
import { storageService } from "@/lib/storage-service";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "" as any, // Novel JSON or Plain Text
    category: "General",
    isPinned: false,
    isPublic: false,
    slug: "",
    tags: ""
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await notesService.getNotes();
      setNotes(res.documents as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!formData.title || !formData.content) return;
    
    setSaving(true);
    try {
      const noteData = {
        title: formData.title,
        content: typeof formData.content === 'string' ? formData.content : JSON.stringify(formData.content),
        category: formData.category,
        isPinned: formData.isPinned,
        isPublic: formData.isPublic,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== "")
      };

      if (editingNote) {
        await notesService.updateNote(editingNote.$id!, noteData);
      } else {
        await notesService.createNote(noteData);
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchNotes();
      // Success feedback
      console.log("Memory committed successfully.");
    } catch (err: any) {
      console.error("Critical Commit Error:", err);
      alert(`Commit Failed: ${err.message || "Unknown neural disruption"}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await notesService.deleteNote(id);
      setNotes(notes.filter(n => n.$id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    
    let parsedContent = note.content;
    try {
      if (note.content.startsWith('{') || note.content.startsWith('[')) {
        parsedContent = JSON.parse(note.content);
      }
    } catch (e) {
      parsedContent = note.content;
    }

    setFormData({
      title: note.title,
      content: parsedContent,
      category: note.category || "General",
      isPinned: note.isPinned || false,
      isPublic: note.isPublic || false,
      slug: note.slug || "",
      tags: note.tags?.join(", ") || ""
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingNote(null);
    setFormData({ title: "", content: "", category: "General", isPinned: false, isPublic: false, slug: "", tags: "" });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const url = await storageService.uploadFile(file);
      alert(`File uploaded successfully! URL: ${url}`);
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setUploadingFile(false);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (typeof n.content === 'string' ? n.content : JSON.stringify(n.content)).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(n => n.isPinned);
  const otherNotes = filteredNotes.filter(n => !n.isPinned);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 space-y-16">
      {/* Dynamic Header - Refined */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-white/5">
        <div className="space-y-6">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
           >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> CORE_OS_KNOWLEDGE_VAULT
           </motion.div>
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic leading-[0.8] select-none">
             MEMORI<span className="text-emerald-500">.</span>
           </h1>
           <p className="max-w-md text-zinc-500 text-base font-medium leading-relaxed italic opacity-80">
             High-fidelity administrative consciousness hub. Syncing neural notes to Appwrite persistent storage.
           </p>
        </div>

        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="h-20 px-12 bg-white text-black font-black rounded-[2rem] flex items-center justify-center gap-5 hover:bg-emerald-400 hover:shadow-[0_0_60px_rgba(52,211,153,0.4)] transition-all active:scale-95 group relative overflow-hidden"
        >
          <span className="relative z-10 text-sm tracking-widest">INITIALIZE_BRAIN_DUMP</span>
          <Plus size={24} className="relative z-10 group-hover:rotate-180 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>
      </section>

      {/* Advanced Toolbar - App-style */}
      <section className="flex flex-col md:flex-row items-center gap-6 p-5 rounded-[3rem] bg-zinc-900/60 border border-white/10 backdrop-blur-3xl sticky top-24 z-30 shadow-2xl">
         <div className="flex-1 w-full relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query memory clusters..."
              className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] py-6 pl-16 pr-8 text-sm font-bold placeholder:text-zinc-800 outline-none focus:border-emerald-500/40 focus:bg-black/60 transition-all font-mono text-emerald-500/90"
            />
         </div>

         <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="flex flex-1 md:flex-none items-center p-1.5 bg-black/60 border border-white/10 rounded-[1.8rem] gap-1.5">
               <button 
                  onClick={() => setViewMode("grid")}
                  className={cn("flex-1 md:flex-none p-4 rounded-2xl transition-all duration-500", viewMode === "grid" ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "text-zinc-600 hover:text-white hover:bg-white/5")}
               >
                  <LayoutGrid size={22} />
               </button>
               <button 
                  onClick={() => setViewMode("list")}
                  className={cn("flex-1 md:flex-none p-4 rounded-2xl transition-all duration-500", viewMode === "list" ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "text-zinc-600 hover:text-white hover:bg-white/5")}
               >
                  <List size={22} />
               </button>
            </div>
            <div className="hidden md:block h-10 w-px bg-white/10" />
            <button className="flex-1 md:flex-none flex items-center justify-center gap-4 px-8 py-5 bg-black/60 border border-white/10 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-all shadow-xl group">
               <Filter size={20} /> 
               <span className="hidden lg:inline">PROTO_FILTER</span>
            </button>
         </div>
      </section>

      {/* Main Interface */}
      {loading ? (
        <div className="py-60 flex flex-col items-center justify-center gap-8 text-zinc-600 italic">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-emerald-500/10 border-t-emerald-500 animate-[spin_3s_linear_infinite]" />
            <Activity className="absolute inset-0 m-auto w-10 h-10 text-emerald-500 animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/50">ACCESSING_ENCRYPTED_VAULT</p>
            <p className="text-[8px] font-mono text-zinc-800">Verifying_Sync_Hashes...</p>
          </div>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="py-60 text-center space-y-10">
           <div className="w-40 h-40 bg-zinc-900/50 border border-white/5 rounded-[4rem] flex items-center justify-center mx-auto text-zinc-800 shadow-3xl relative group overflow-hidden">
              <StickyNote size={64} className="relative z-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
           </div>
           <div className="space-y-4">
              <p className="text-4xl font-black text-white italic uppercase tracking-tighter">COGNITIVE_VOID_DETECTED</p>
              <p className="text-sm text-zinc-600 font-medium max-w-sm mx-auto leading-relaxed italic">No mental clusters found in current directory. Initiate a brain dump sequence to populate memory.</p>
           </div>
        </div>
      ) : (
        <div className="space-y-32 pb-40">
          {pinnedNotes.length > 0 && (
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                 <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-400 flex items-center gap-4 bg-zinc-950 px-8 py-3 rounded-full border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                    <Pin size={16} className="fill-emerald-500 animate-bounce" /> PRIORITY_CONSCIOUSNESS
                 </h3>
                 <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              </div>
              <div className={cn(
                "grid gap-10",
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}>
                {pinnedNotes.map((note) => (
                  <NoteCard key={note.$id} note={note} onEdit={handleEdit} onDelete={handleDelete} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-12">
            <div className="flex items-center gap-6">
               <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
               <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-600 bg-zinc-950 px-8">
                  NEURAL_NETWORK_DUMP
               </h3>
               <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className={cn(
              "grid gap-10",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {otherNotes.map((note) => (
                <NoteCard key={note.$id} note={note} onEdit={handleEdit} onDelete={handleDelete} viewMode={viewMode} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Premium Full-Screen Workspace Interface */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="fixed inset-0 bg-black/98 backdrop-blur-[100px]"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 40 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative w-full h-[100svh] bg-transparent overflow-hidden flex flex-col"
             >
                {/* Workspace Header - Fixed */}
                <div className="px-6 md:px-12 py-8 flex items-center justify-between border-b border-white/5">
                   <div className="flex items-center gap-8">
                      <div className="hidden md:flex w-20 h-20 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 items-center justify-center text-emerald-500 shadow-2xl">
                         <div className="relative">
                            <StickyNote size={36} />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                         </div>
                      </div>
                      <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white italic leading-none mb-3">
                           {editingNote ? "REFINE_NEURON" : "SYNTHESIZE_BRAIN"}
                        </h2>
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                              <div className={cn("w-1.5 h-1.5 rounded-full", saving ? "bg-amber-500 animate-pulse" : "bg-emerald-500")} />
                              <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">{saving ? "WRITING_SYNC..." : "SYNC_STABLE"}</span>
                           </div>
                           <span className="text-[9px] text-zinc-700 font-black tracking-widest hidden sm:block">ENDPOINT://APPWRITE_VAULT_NODE_01</span>
                        </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-4">
                      {/* Responsive Action Buttons */}
                      <button 
                        onClick={() => setIsModalOpen(false)} 
                        className="w-16 h-16 md:w-20 md:h-20 bg-zinc-900/50 border border-white/5 rounded-[2rem] text-zinc-500 hover:text-white hover:border-red-500/40 hover:bg-red-500/5 transition-all flex items-center justify-center group active:scale-90"
                      >
                         <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                      </button>
                   </div>
                </div>

                {/* Workspace Body - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 md:px-12 py-12 custom-scrollbar">
                   <div className="max-w-6xl mx-auto">
                      <div className="flex flex-col lg:flex-row gap-16">
                         <div className="flex-1 space-y-12">
                            <div className="space-y-4">
                               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800 block px-4">IDENTIFIER_PROTOCOL_NAME</label>
                               <input 
                                 required
                                 type="text" 
                                 value={formData.title}
                                 onChange={(e) => setFormData({...formData, title: e.target.value})}
                                 placeholder="Enter Protocol Title..."
                                 className="w-full bg-white/[0.02] border border-white/10 rounded-[3rem] py-10 px-10 md:px-12 text-4xl md:text-6xl font-black italic text-white outline-none focus:border-emerald-500/40 focus:bg-emerald-500/[0.03] transition-all placeholder:text-zinc-950 shadow-2xl"
                               />
                            </div>

                            <div className="space-y-4">
                               <div className="flex items-center justify-between px-4">
                                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800 block">RAW_CONSCIOUSNESS_DATA</label>
                                  <div className="flex items-center gap-6">
                                     <label className="cursor-pointer group flex items-center gap-3">
                                        <input type="file" className="hidden" onChange={handleFileUpload} />
                                        <Paperclip size={18} className="text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                                        <span className="text-[9px] font-black text-zinc-800 group-hover:text-white uppercase tracking-[0.2em] transition-colors">LINK_EXTERNAL_MEDIA</span>
                                     </label>
                                  </div>
                               </div>
                               <div className="relative group p-1 md:p-2 rounded-[3.5rem] bg-white/[0.01] border border-white/5 hover:border-emerald-500/20 transition-all focus-within:border-emerald-500/40 shadow-inner">
                                  <NovelEditor 
                                    initialValue={formData.content} 
                                    onChange={(val) => setFormData({...formData, content: val})} 
                                  />
                               </div>
                            </div>
                         </div>

                         <div className="lg:w-[400px] space-y-10">
                            <div className="p-10 rounded-[4rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl space-y-10 shadow-3xl">
                               <div className="space-y-4">
                                 <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800 block">SEGMENT_INDEX</label>
                                 <select 
                                   value={formData.category}
                                   onChange={(e) => setFormData({...formData, category: e.target.value})}
                                   className="w-full bg-black border border-white/10 rounded-[1.8rem] py-6 px-10 text-xs font-black uppercase tracking-[0.3em] text-emerald-500 outline-none focus:border-emerald-500/40 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjMTRiODhhIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:14px] bg-[right_2rem_center] bg-no-repeat transition-all shadow-inner"
                                 >
                                    <option value="General">GENERAL_NODES</option>
                                    <option value="Development">CORE_DEV_PROTO</option>
                                    <option value="Finance">CREDIT_SYNC_LOG</option>
                                    <option value="System Admin">ROOT_PERMISSION</option>
                                    <option value="Personal">EGO_MEMORY</option>
                                 </select>
                               </div>

                               <div className="space-y-4">
                                 <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800 block">TAXONOMY_TAGS</label>
                                 <input 
                                   type="text" 
                                   value={formData.tags}
                                   onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                   placeholder="meta, labels, hash"
                                   className="w-full bg-black/40 border border-white/10 rounded-[1.8rem] py-6 px-10 text-[11px] font-bold text-zinc-500 outline-none focus:border-emerald-500/40 transition-all font-mono shadow-inner"
                                 />
                               </div>

                               <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                               <label className="flex items-center gap-6 cursor-pointer group p-2 hover:bg-white/[0.02] rounded-[2rem] transition-all">
                                  <input 
                                    type="checkbox" 
                                    checked={formData.isPinned}
                                    onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
                                    className="hidden"
                                  />
                                  <div className={cn(
                                    "w-14 h-14 rounded-[1.4rem] border-2 flex items-center justify-center transition-all duration-500",
                                    formData.isPinned ? "border-emerald-500 bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,0.5)]" : "border-white/10 group-hover:border-emerald-500/40"
                                  )}>
                                     <Pin size={22} className={cn("transition-transform duration-500", formData.isPinned ? "fill-current" : "group-hover:rotate-12")} />
                                  </div>
                                  <div className="flex-1">
                                     <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] block">TOP_PRIORITY</span>
                                     <span className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest block mt-1">FORCE_PIN_TRUE</span>
                                  </div>
                               </label>

                               <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                               <div className="space-y-6 pt-2">
                                  <label className="flex items-center gap-6 cursor-pointer group p-2 hover:bg-blue-500/[0.03] rounded-[2rem] transition-all">
                                     <input 
                                       type="checkbox" 
                                       checked={formData.isPublic}
                                       onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                                       className="hidden"
                                     />
                                     <div className={cn(
                                       "w-14 h-14 rounded-[1.4rem] border-2 flex items-center justify-center transition-all duration-500",
                                       formData.isPublic ? "border-blue-500 bg-blue-500 text-white shadow-[0_0_40px_rgba(59,130,246,0.5)]" : "border-white/10 group-hover:border-blue-500/40"
                                     )}>
                                        <Globe size={22} className={cn("transition-all duration-700", formData.isPublic && "rotate-[360deg]")} />
                                     </div>
                                     <div className="flex-1">
                                        <span className="text-[11px] font-black text-white uppercase tracking-[0.2em] block">PUBLIC_NEXTRA</span>
                                        <span className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest block mt-1">DOCS_AUTO_SYNC</span>
                                     </div>
                                  </label>

                                  <AnimatePresence>
                                    {formData.isPublic && (
                                      <motion.div 
                                        initial={{ opacity: 0, height: 0, y: -20 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -20 }}
                                        className="space-y-3 px-2 overflow-hidden"
                                      >
                                         <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-800 px-2 block">SEO_SLUG_ID</label>
                                         <div className="relative group">
                                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-blue-500/50">
                                               <LinkIcon size={14} />
                                            </div>
                                            <input 
                                              type="text" 
                                              value={formData.slug}
                                              onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                              placeholder="protocol-slug-ref"
                                              className="w-full bg-blue-500/[0.05] border border-blue-500/20 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-blue-400 outline-none focus:border-blue-500/50 transition-all font-mono"
                                            />
                                         </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                               </div>
                            </div>

                            <motion.div 
                               whileHover={{ scale: 1.02 }}
                               className="p-10 rounded-[4rem] bg-emerald-500/5 border border-emerald-500/10 space-y-6 shadow-2xl relative overflow-hidden group"
                            >
                               <div className="flex items-center gap-4 text-emerald-500 relative z-10 transition-colors group-hover:text-emerald-400">
                                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                     <Activity size={20} className="animate-pulse" />
                                  </div>
                                  <span className="text-[11px] font-black uppercase tracking-[0.4em]">VAULT_HEALTH</span>
                               </div>
                               <div className="grid grid-cols-2 gap-5 relative z-10">
                                  <div className="bg-black/60 rounded-[1.5rem] p-5 border border-white/5">
                                     <p className="text-[9px] text-zinc-700 font-black uppercase mb-2 tracking-widest">Encryption</p>
                                     <p className="text-xs text-white font-black uppercase tracking-tight flex items-center gap-2">AES-256 <div className="w-1 h-1 rounded-full bg-emerald-500" /></p>
                                  </div>
                                  <div className="bg-black/60 rounded-[1.5rem] p-5 border border-white/5">
                                     <p className="text-[9px] text-zinc-700 font-black uppercase mb-2 tracking-widest">Protocol</p>
                                     <p className="text-xs text-white font-black uppercase tracking-tight flex items-center gap-2">APPWRITE <div className="w-1 h-1 rounded-full bg-blue-500" /></p>
                                  </div>
                               </div>
                               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
                            </motion.div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Workspace Action Bar - Fixed Bottom */}
                <div className="px-6 md:px-12 py-10 bg-black/80 backdrop-blur-3xl border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-0">
                   <div className="hidden md:flex items-center gap-6 text-zinc-700">
                      <span className="text-[10px] font-mono tracking-widest animate-pulse flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> SYSTEM_IDLE_STANDBY: 100%
                      </span>
                      <div className="h-4 w-px bg-white/10" />
                      <span className="text-[10px] font-mono tracking-widest">BUFFER_SIZE: {(JSON.stringify(formData.content).length / 1024).toFixed(2)} KB</span>
                   </div>

                   <div className="flex items-center gap-6 w-full md:w-auto">
                      <button 
                         type="button" 
                         onClick={() => setIsModalOpen(false)}
                         className="flex-1 md:flex-none h-20 px-10 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-white transition-all italic active:scale-95"
                      >
                         ABORT_SYNC
                      </button>
                      <button 
                         onClick={() => handleSave()}
                         disabled={saving}
                         className="flex-[2] md:flex-none h-20 px-16 bg-white text-black font-black rounded-[2.2rem] flex items-center justify-center gap-5 hover:bg-emerald-400 hover:shadow-[0_0_70px_rgba(52,211,153,0.3)] active:scale-95 transition-all disabled:opacity-50 group shadow-3xl min-w-[280px]"
                      >
                         <span className="text-sm uppercase tracking-[0.3em] font-black">{saving ? "WRITING_VAULT..." : editingNote ? "OVERWRITE_NEURON" : "COMMIT_CONSCIOUSNESS"}</span>
                         {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />}
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

function NoteCard({ note, onEdit, onDelete, viewMode }: { note: Note, onEdit: (n: Note) => void, onDelete: (id: string) => void, viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <motion.div 
        layout
        whileHover={{ x: 10 }}
        className="group relative flex items-center justify-between p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-zinc-900/80 shadow-2xl"
      >
        <div className="flex items-center gap-8 flex-1 min-w-0" onClick={() => onEdit(note)}>
           <div className={cn(
             "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl transition-all duration-500",
             note.isPinned ? "bg-emerald-500 text-black" : "bg-white/5 text-zinc-600 group-hover:text-emerald-500"
           )}>
              <StickyNote size={28} />
           </div>
           <div className="flex-1 min-w-0 pr-10 cursor-pointer">
              <div className="flex items-center gap-4 mb-2">
                 <h4 className="text-lg font-black text-white truncate max-w-[400px] italic">{note.title}</h4>
                 <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white/5 text-zinc-500 uppercase tracking-[0.2em] shrink-0 border border-white/5 group-hover:border-emerald-500/20 group-hover:text-emerald-500 transition-colors">{note.category}</span>
              </div>
              <p className="text-sm text-zinc-500 font-medium italic truncate line-clamp-1 opacity-60">
                {note.content.substring(0, 150).replace(/[{}[\]"]/g, '').replace(/\\n/g, ' ')}
              </p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.3em] hidden lg:block mr-4">
              MOD://{new Date(note.$updatedAt || note.$createdAt || "").toLocaleDateString()}
           </div>
           <div className="flex items-center gap-3">
              <button 
                onClick={() => onEdit(note)} 
                className="w-12 h-12 rounded-xl bg-white/5 text-zinc-500 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/30 border border-transparent transition-all flex items-center justify-center active:scale-90"
              >
                <Edit3 size={20} />
              </button>
              <button 
                onClick={() => onDelete(note.$id!)} 
                className="w-12 h-12 rounded-xl bg-white/5 text-zinc-500 hover:text-red-500 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent transition-all flex items-center justify-center active:scale-90"
              >
                <Trash2 size={20} />
              </button>
           </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -10 }}
      className="group relative flex flex-col p-10 rounded-[3.5rem] bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-zinc-900/80 overflow-hidden min-h-[380px] shadow-3xl"
    >
       <div className="flex items-center justify-between mb-8">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-700",
            note.isPinned ? "bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.3)]" : "bg-white/5 text-zinc-700 group-hover:text-emerald-500"
          )}>
             <StickyNote size={32} />
          </div>
          <div className="flex items-center gap-3">
             {note.isPinned && <Pin size={18} className="text-emerald-500 fill-emerald-500 animate-pulse" />}
             <button className="w-12 h-12 rounded-xl text-zinc-800 hover:text-white transition-colors flex items-center justify-center hover:bg-white/5"><MoreVertical size={24} /></button>
          </div>
       </div>

       <div className="flex-1 space-y-6 cursor-pointer" onClick={() => onEdit(note)}>
          <div className="space-y-2">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 block group-hover:text-emerald-500/50 transition-colors">{note.category}</span>
             <h4 className="text-2xl font-black text-white italic group-hover:text-emerald-400 transition-colors leading-[1.1] tracking-tighter">{note.title}</h4>
          </div>
          <p className="text-base font-medium text-zinc-500 italic leading-relaxed line-clamp-4 opacity-70 group-hover:opacity-100 transition-opacity">
             {note.content.substring(0, 250).replace(/[{}[\]"]/g, '').replace(/\\n/g, ' ')}
          </p>
       </div>

       <div className="mt-8 flex flex-wrap gap-3 mb-8">
          {note.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-black px-4 py-1.5 rounded-full bg-black/40 border border-white/5 text-zinc-600 uppercase tracking-widest group-hover:border-emerald-500/20 transition-all">#{tag}</span>
          ))}
       </div>

       <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
          <div className="flex items-center gap-3 text-[10px] font-black text-zinc-800 px-2 uppercase tracking-[0.2em]">
             <Calendar size={14} className="text-zinc-800" /> {new Date(note.$updatedAt || note.$createdAt || "").toLocaleDateString()}
          </div>
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
             <button 
               onClick={() => onEdit(note)} 
               className="w-12 h-12 rounded-xl bg-white/5 text-zinc-500 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-500/20 border border-transparent transition-all flex items-center justify-center active:scale-90 shadow-2xl"
             >
               <Edit3 size={20} />
             </button>
             <button 
               onClick={() => onDelete(note.$id!)} 
               className="w-12 h-12 rounded-xl bg-white/5 text-zinc-500 hover:text-red-500 hover:bg-red-500/20 hover:border-red-500/20 border border-transparent transition-all flex items-center justify-center active:scale-90 shadow-2xl"
             >
               <Trash2 size={20} />
             </button>
          </div>
       </div>

       {/* Decorative Elements */}
       <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/[0.03] blur-[100px] rounded-full group-hover:bg-emerald-500/[0.08] transition-all duration-1000" />
       <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/[0.01] blur-[80px] rounded-full group-hover:bg-emerald-500/[0.02] transition-all duration-1000" />
    </motion.div>
  );
}
