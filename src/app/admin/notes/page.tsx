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
  AlertCircle
} from "lucide-react";
import { notesService, Note } from "@/lib/notes-service";
import { cn } from "@/lib/utils";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    isPinned: false,
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    
    setSaving(true);
    try {
      const noteData = {
        ...formData,
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
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category || "General",
      isPinned: note.isPinned || false,
      tags: note.tags?.join(", ") || ""
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingNote(null);
    setFormData({ title: "", content: "", category: "General", isPinned: false, tags: "" });
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(n => n.isPinned);
  const otherNotes = filteredNotes.filter(n => !n.isPinned);

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-zinc-500 font-black uppercase tracking-[0.2em] mb-2 text-[10px]">
              <StickyNote size={14} className="text-emerald-500" /> Administrative Knowledge Base
           </div>
           <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
             Notes <span className="text-emerald-500 italic">Management</span>
           </h1>
           <p className="text-zinc-500 font-medium italic mt-1">Capture, organize, and secure your system insights.</p>
        </div>

        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="h-14 px-8 bg-white text-black font-black rounded-2xl flex items-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
        >
          Create New Note <Plus size={20} />
        </button>
      </section>

      {/* Toolbar */}
      <section className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
         <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter notes by title, content, or category..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs font-semibold placeholder:text-zinc-700 outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
            />
         </div>

         <div className="flex items-center gap-4">
            <div className="flex items-center p-1 bg-zinc-950 border border-white/5 rounded-xl gap-1">
               <button 
                  onClick={() => setViewMode("grid")}
                  className={cn("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-white/10 text-white" : "text-zinc-600 hover:text-zinc-400")}
               >
                  <LayoutGrid size={18} />
               </button>
               <button 
                  onClick={() => setViewMode("list")}
                  className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-white/10 text-white" : "text-zinc-600 hover:text-zinc-400")}
               >
                  <List size={18} />
               </button>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <button className="flex items-center gap-2 px-4 py-3 bg-zinc-950 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
               <Filter size={16} /> Filter
            </button>
         </div>
      </section>

      {/* Notes Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4 text-zinc-600 italic">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
          <p className="font-medium">Accessing Appwrite Storage...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="py-20 text-center space-y-6">
           <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-zinc-800">
              <StickyNote size={32} />
           </div>
           <div className="space-y-2">
              <p className="text-lg font-black text-white italic">No records found.</p>
              <p className="text-sm text-zinc-600 font-medium">Try adjusting your search or create a new entry.</p>
           </div>
        </div>
      ) : (
        <div className="space-y-12 pb-20">
          {/* Pinned section if exists */}
          {pinnedNotes.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-3">
                 <Pin size={14} /> Pinned Records
              </h3>
              <div className={cn(
                "grid gap-8",
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              )}>
                {pinnedNotes.map((note) => (
                  <NoteCard key={note.$id} note={note} onEdit={handleEdit} onDelete={handleDelete} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}

          {/* Main section */}
          {otherNotes.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                 Rest of Stack
              </h3>
              <div className={cn(
                "grid gap-8",
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              )}>
                {otherNotes.map((note) => (
                  <NoteCard key={note.$id} note={note} onEdit={handleEdit} onDelete={handleDelete} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Interface */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="fixed inset-0 bg-black/80 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-10"
             >
                <div className="absolute top-8 right-8">
                   <button 
                      onClick={() => setIsModalOpen(false)} 
                      className="p-3 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-600 hover:text-white transition-all"
                   >
                      <X size={20} />
                   </button>
                </div>

                <div className="space-y-8">
                   <div>
                      <h2 className="text-3xl font-black tracking-tight text-white italic">
                         {editingNote ? "Refine Entry" : "Initialization"}
                      </h2>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">
                         {editingNote ? `Modifying ID: ${editingNote.$id}` : "Adding to Appwrite Database"}
                      </p>
                   </div>

                   <form onSubmit={handleSave} className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block px-4">Subject Line</label>
                         <input 
                           required
                           type="text" 
                           value={formData.title}
                           onChange={(e) => setFormData({...formData, title: e.target.value})}
                           placeholder="Enter a descriptive title..."
                           className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm font-semibold text-white outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
                         />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block px-4">Category Cluster</label>
                           <select 
                             value={formData.category}
                             onChange={(e) => setFormData({...formData, category: e.target.value})}
                             className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm font-semibold text-white outline-none focus:border-emerald-500/50 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTIgMSIgc3Ryb2tlPSIjNTI1MjUyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:12px] bg-[right_1.5rem_center] bg-no-repeat"
                           >
                              <option className="bg-zinc-950" value="General">General</option>
                              <option className="bg-zinc-950" value="Development">Development</option>
                              <option className="bg-zinc-950" value="Finance">Finance</option>
                              <option className="bg-zinc-950" value="System Admin">System Admin</option>
                              <option className="bg-zinc-950" value="Personal">Personal</option>
                           </select>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block px-4">Tags (Comma Sep)</label>
                           <input 
                             type="text" 
                             value={formData.tags}
                             onChange={(e) => setFormData({...formData, tags: e.target.value})}
                             placeholder="urgent, project-a, ideas"
                             className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm font-semibold text-white outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
                           />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block px-4">Core Content</label>
                         <textarea 
                           required
                           value={formData.content}
                           onChange={(e) => setFormData({...formData, content: e.target.value})}
                           rows={6}
                           placeholder="Documentation body..."
                           className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] py-6 px-6 text-sm font-medium text-white outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all resize-none overflow-y-auto custom-scrollbar"
                         />
                      </div>

                      <div className="flex items-center justify-between pt-4">
                         <label className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={formData.isPinned}
                              onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
                              className="hidden"
                            />
                            <div className={cn(
                              "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                              formData.isPinned ? "border-emerald-500 bg-emerald-500 text-black shadow-lg shadow-emerald-500/20" : "border-white/10 group-hover:border-emerald-500/50"
                            )}>
                               {formData.isPinned && <Check size={14} />}
                            </div>
                            <span className="text-xs font-bold text-zinc-500 group-hover:text-white uppercase tracking-widest transition-colors">Pin to Dashboard Top</span>
                         </label>

                         <div className="flex gap-4">
                            <button 
                              type="button" 
                              onClick={() => setIsModalOpen(false)}
                              className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all"
                            >
                               Discard Changes
                            </button>
                            <button 
                              disabled={saving}
                              className="px-10 py-4 bg-emerald-600 text-black font-black rounded-2xl flex items-center gap-3 hover:bg-emerald-500 active:scale-95 transition-all shadow-xl shadow-emerald-900/10"
                            >
                               {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : editingNote ? "Update Protocol" : "Deploy Insight"}
                            </button>
                         </div>
                      </div>
                   </form>
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
              <p className="text-xs text-zinc-500 italic truncate">{note.content}</p>
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
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
             {note.content}
          </p>
       </div>

       <div className="mt-8 flex flex-wrap gap-2 mb-6">
          {note.tags?.map(tag => (
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
