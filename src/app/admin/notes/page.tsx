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
    } catch (err) {
      console.error(err);
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
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(n => n.isPinned);
  const otherNotes = filteredNotes.filter(n => !n.isPinned);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 space-y-12">
      {/* Dynamic Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-white/5">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500">
              <Zap size={10} className="fill-emerald-500" /> System_Brain_v2.0
           </div>
           <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white italic leading-none">
             NOTES<span className="text-emerald-500 text-8xl md:text-9xl leading-[0.5] ml-1">.</span>
           </h1>
           <p className="max-w-md text-zinc-500 text-sm font-medium leading-relaxed italic">
             High-power administrative knowledge base with Appwrite encrypted storage.
           </p>
        </div>

        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="h-16 px-10 bg-white text-black font-black rounded-3xl flex items-center justify-center gap-4 hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(52,211,153,0.3)] transition-all active:scale-95 group"
        >
          <span>INITIATE NEW ENTRY</span>
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </section>

      {/* Modern Dashboard Toolbar */}
      <section className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl sticky top-24 z-30">
         <div className="flex-1 w-full relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query memory banks..."
              className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] py-5 pl-14 pr-6 text-sm font-bold placeholder:text-zinc-800 outline-none focus:border-emerald-500/40 transition-all font-mono"
            />
         </div>

         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex flex-1 md:flex-none items-center p-1 bg-black/40 border border-white/5 rounded-2xl gap-1">
               <button 
                  onClick={() => setViewMode("grid")}
                  className={cn("flex-1 md:flex-none p-3 rounded-xl transition-all", viewMode === "grid" ? "bg-white/10 text-white shadow-xl" : "text-zinc-600 hover:text-zinc-400")}
               >
                  <LayoutGrid size={20} />
               </button>
               <button 
                  onClick={() => setViewMode("list")}
                  className={cn("flex-1 md:flex-none p-3 rounded-xl transition-all", viewMode === "list" ? "bg-white/10 text-white shadow-xl" : "text-zinc-600 hover:text-zinc-400")}
               >
                  <List size={20} />
               </button>
            </div>
            <div className="hidden md:block h-8 w-px bg-white/10" />
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-4 bg-black/40 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all shadow-xl group">
               <Filter size={18} className="group-hover:text-emerald-500" /> 
               <span className="hidden sm:inline">Advanced Filter</span>
            </button>
         </div>
      </section>

      {/* Main Grid Interface */}
      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center gap-6 text-zinc-600 italic">
          <div className="relative">
            <Loader2 className="w-16 h-16 animate-spin text-emerald-500/20" />
            <Activity className="absolute inset-0 m-auto w-6 h-6 text-emerald-500 animate-pulse" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] animate-pulse">Syncing Cryptographic Data...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="py-40 text-center space-y-8">
           <div className="w-32 h-32 bg-zinc-900 border border-white/5 rounded-[3rem] flex items-center justify-center mx-auto text-zinc-800 shadow-2xl relative group overflow-hidden">
              <StickyNote size={48} className="relative z-10" />
              <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
           </div>
           <div className="space-y-3">
              <p className="text-2xl font-black text-white italic uppercase tracking-tighter">Memory Banks Empty</p>
              <p className="text-sm text-zinc-600 font-medium max-w-xs mx-auto leading-relaxed">No protocols detected matching your query in the current directory.</p>
           </div>
        </div>
      ) : (
        <div className="space-y-20 pb-32">
          {pinnedNotes.length > 0 && (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="h-px flex-1 bg-emerald-500/20" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-3 bg-zinc-950 px-4 py-2 rounded-full border border-emerald-500/30">
                    <Pin size={14} className="fill-emerald-500" /> PRIORITY_PROTOCOLS
                 </h3>
                 <div className="h-px flex-1 bg-emerald-500/20" />
              </div>
              <div className={cn(
                "grid gap-8",
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}>
                {pinnedNotes.map((note) => (
                  <NoteCard key={note.$id} note={note} onEdit={handleEdit} onDelete={handleDelete} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-px flex-1 bg-white/5" />
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 bg-zinc-950 px-4">
                  SYSTEM_DUMP_ALL
               </h3>
               <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className={cn(
              "grid gap-8",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {otherNotes.map((note) => (
                <NoteCard key={note.$id} note={note} onEdit={handleEdit} onDelete={handleDelete} viewMode={viewMode} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Advanced Full-Screen Modal Interface */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-6 overflow-hidden">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
             />
             <motion.div 
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 100 }}
               className="relative w-full h-full md:h-auto md:max-w-6xl bg-zinc-950 border-t border-white/10 md:border md:rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
             >
                {/* Modal Header */}
                <div className="p-8 md:p-10 flex items-center justify-between bg-white/[0.02] border-b border-white/5">
                   <div className="flex items-center gap-6">
                      <div className="hidden sm:flex w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 items-center justify-center text-emerald-500">
                         <StickyNote size={32} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black tracking-tighter text-white italic leading-none mb-2">
                           {editingNote ? "REFINE_EYE" : "GENERATE_BRAIN"}
                        </h2>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest border-r border-white/10 pr-3">{editingNote ? "ACCESSING_VAULT" : "INIT_PROTOCOL"}</span>
                           <span className="text-[10px] text-zinc-600 font-black tracking-widest">ENCRYPTED_WRITE_ENABLED</span>
                        </div>
                      </div>
                   </div>

                   <button 
                      onClick={() => setIsModalOpen(false)} 
                      className="w-14 h-14 bg-zinc-900 border border-white/10 rounded-2xl text-zinc-500 hover:text-white hover:border-emerald-500/50 transition-all flex items-center justify-center group"
                   >
                      <X size={24} className="group-hover:rotate-90 transition-transform" />
                   </button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10 custom-scrollbar">
                   <div className="max-w-4xl mx-auto space-y-12">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                         <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-3">
                               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 block px-2">SUBJECT_IDENTIFIER</label>
                               <input 
                                 required
                                 type="text" 
                                 value={formData.title}
                                 onChange={(e) => setFormData({...formData, title: e.target.value})}
                                 placeholder="Protocol Name..."
                                 className="w-full bg-white/[0.03] border border-white/10 rounded-3xl py-6 px-8 text-2xl font-black italic text-white outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all placeholder:text-zinc-900"
                               />
                            </div>

                            <div className="space-y-3">
                               <div className="flex items-center justify-between px-2">
                                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 block">CORE_NEURAL_DATA</label>
                                  <div className="flex items-center gap-4">
                                     <label className="cursor-pointer group flex items-center gap-2">
                                        <input type="file" className="hidden" onChange={handleFileUpload} />
                                        <Paperclip size={14} className="text-zinc-700 group-hover:text-emerald-500 transition-colors" />
                                        <span className="text-[8px] font-black text-zinc-700 group-hover:text-white uppercase tracking-widest">Attach File</span>
                                     </label>
                                  </div>
                               </div>
                               <NovelEditor 
                                 initialValue={formData.content} 
                                 onChange={(val) => setFormData({...formData, content: val})} 
                               />
                            </div>
                         </div>

                         <div className="space-y-8">
                            <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-8">
                               <div className="space-y-3">
                                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 block">CLUSTER_TYPE</label>
                                 <select 
                                   value={formData.category}
                                   onChange={(e) => setFormData({...formData, category: e.target.value})}
                                   className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-xs font-black uppercase tracking-widest text-emerald-500 outline-none focus:border-emerald-500/50 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjMTRiODhhIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px] bg-[right_1.5rem_center] bg-no-repeat transition-all"
                                 >
                                    <option value="General">GENERAL_SYNC</option>
                                    <option value="Development">CODE_PROTO</option>
                                    <option value="Finance">CREDIT_NODE</option>
                                    <option value="System Admin">ROOT_ACCESS</option>
                                    <option value="Personal">CORE_MEM</option>
                                 </select>
                               </div>

                               <div className="space-y-3">
                                 <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 block">METADATA_LABELS</label>
                                 <input 
                                   type="text" 
                                   value={formData.tags}
                                   onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                   placeholder="tags, separate, with, comma"
                                   className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-bold text-zinc-400 outline-none focus:border-emerald-500/50 transition-all font-mono"
                                 />
                               </div>

                               <div className="h-px bg-white/5" />

                               <label className="flex items-center gap-4 cursor-pointer group">
                                  <input 
                                    type="checkbox" 
                                    checked={formData.isPinned}
                                    onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
                                    className="hidden"
                                  />
                                  <div className={cn(
                                    "w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all",
                                    formData.isPinned ? "border-emerald-500 bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]" : "border-white/10 group-hover:border-zinc-700"
                                  )}>
                                     {formData.isPinned && <Pin size={18} className="fill-current" />}
                                  </div>
                                  <div>
                                     <span className="text-[10px] font-black text-white uppercase tracking-widest block">Pin to Access Top</span>
                                     <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest block mt-0.5">PRIORITY_TRUE</span>
                                  </div>
                               </label>

                               <div className="h-px bg-white/5" />

                               <div className="space-y-4 pt-2">
                                  <label className="flex items-center gap-4 cursor-pointer group">
                                     <input 
                                       type="checkbox" 
                                       checked={formData.isPublic}
                                       onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                                       className="hidden"
                                     />
                                     <div className={cn(
                                       "w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all",
                                       formData.isPublic ? "border-blue-500 bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "border-white/10 group-hover:border-zinc-700"
                                     )}>
                                        {formData.isPublic && <Globe size={18} />}
                                     </div>
                                     <div>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest block">Publish to Public Docs</span>
                                        <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest block mt-0.5">NEXTRA_SYNC_ENABLED</span>
                                     </div>
                                  </label>

                                  {formData.isPublic && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                                       <label className="text-[9px] font-black uppercase tracking-widest text-zinc-700 px-1">SEO_SLUG_IDENTIFIER</label>
                                       <input 
                                         type="text" 
                                         value={formData.slug}
                                         onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                         placeholder="my-custom-doc-slug"
                                         className="w-full bg-blue-500/5 border border-blue-500/20 rounded-2xl py-3 px-4 text-[10px] font-bold text-blue-400 outline-none focus:border-blue-500/50 transition-all font-mono"
                                       />
                                    </div>
                                  )}
                               </div>
                            </div>

                            <div className="p-8 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                               <div className="flex items-center gap-3 text-emerald-500">
                                  <Activity size={16} />
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live_Statistics</span>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-black/40 rounded-xl p-3">
                                     <p className="text-[8px] text-zinc-600 font-black uppercase mb-1">Status</p>
                                     <p className="text-[10px] text-white font-black uppercase tracking-tight">Encrypted</p>
                                  </div>
                                  <div className="bg-black/40 rounded-xl p-3">
                                     <p className="text-[8px] text-zinc-600 font-black uppercase mb-1">Storage</p>
                                     <p className="text-[10px] text-white font-black uppercase tracking-tight">Appwrite</p>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Modal Action Bar */}
                <div className="p-8 md:p-10 bg-black/50 border-t border-white/5 flex items-center justify-end gap-4">
                   <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all italic"
                   >
                      ABORT_CURRENT_BUFFER
                   </button>
                   <button 
                      onClick={() => handleSave()}
                      disabled={saving}
                      className="px-14 py-5 bg-white text-black font-black rounded-3xl flex items-center gap-4 hover:bg-emerald-400 hover:shadow-[0_0_50px_rgba(52,211,153,0.2)] active:scale-95 transition-all disabled:opacity-50 group shadow-2xl"
                   >
                      <span className="text-xs uppercase tracking-[0.2em]">{saving ? "PROCESSING..." : editingNote ? "OVERWRITE_MEMORY" : "COMMIT_TO_VAULT"}</span>
                      {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                   </button>
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
        className="group relative flex items-center justify-between p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all hover:bg-zinc-900/60"
      >
        <div className="flex items-center gap-6 flex-1 min-w-0">
           <div className={cn(
             "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner",
             note.isPinned ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-zinc-600"
           )}>
              <StickyNote size={20} />
           </div>
           <div className="flex-1 min-w-0 pr-10">
              <div className="flex items-center gap-3 mb-1">
                 <h4 className="text-sm font-black text-white truncate max-w-[300px]">{note.title}</h4>
                 <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-zinc-600 uppercase tracking-widest shrink-0">{note.category}</span>
              </div>
              <p className="text-xs text-zinc-500 italic truncate line-clamp-1">
                {note.content.substring(0, 100).replace(/[{}[\]"]/g, '')}
              </p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest hidden sm:block">
              {new Date(note.updatedAt || "").toLocaleDateString()}
           </div>
           <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => onEdit(note)} className="p-2 rounded-xl bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10"><Edit3 size={16} /></button>
              <button onClick={() => onDelete(note.$id!)} className="p-2 rounded-xl bg-white/5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10"><Trash2 size={16} /></button>
           </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="group relative flex flex-col p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-emerald-500/20 transition-all hover:bg-zinc-900/60 overflow-hidden min-h-[300px]"
    >
       <div className="flex items-center justify-between mb-6">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
            note.isPinned ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-zinc-600"
          )}>
             <StickyNote size={22} />
          </div>
          <div className="flex items-center gap-2">
             {note.isPinned && <Pin size={16} className="text-emerald-500 fill-emerald-500" />}
             <button className="p-2 rounded-xl text-zinc-700 hover:text-white transition-colors"><MoreVertical size={18} /></button>
          </div>
       </div>

       <div className="flex-1 space-y-4">
          <div className="space-y-1">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 block">{note.category}</span>
             <h4 className="text-xl font-black text-white italic group-hover:text-emerald-500 transition-colors leading-tight">{note.title}</h4>
          </div>
          <p className="text-sm font-medium text-zinc-500 italic leading-relaxed line-clamp-4">
             {note.content.substring(0, 200).replace(/[{}[\]"]/g, '')}
          </p>
       </div>

       <div className="mt-8 flex flex-wrap gap-2 mb-6">
          {note.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[9px] font-black px-2 py-1 rounded-lg bg-white/5 text-zinc-600 uppercase tracking-widest">#{tag}</span>
          ))}
       </div>

       <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-700 px-2 uppercase tracking-widest">
             <Calendar size={12} /> {new Date(note.updatedAt || "").toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
             <button onClick={() => onEdit(note)} className="p-2.5 rounded-xl bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-all"><Edit3 size={18} /></button>
             <button onClick={() => onDelete(note.$id!)} className="p-2.5 rounded-xl bg-white/5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={18} /></button>
          </div>
       </div>

       <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />
    </motion.div>
  );
}
