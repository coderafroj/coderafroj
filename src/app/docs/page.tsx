import { notesService, Note } from "@/lib/notes-service";
import Link from "next/link";
import React from "react";
import { StickyNote, ChevronRight, Activity, Globe, Zap, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DocsListing() {
  const { documents: notes } = await notesService.getNotes(100);
  const publicDocs = (notes as any[]).filter(n => n.isPublic);

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-12 px-6">
      {/* Search Header */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-emerald-500 font-black uppercase tracking-[0.2em] text-[10px]">
           <Globe size={14} className="animate-pulse" /> Public Documentation Portal
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-white italic leading-[0.9]">
          EXPLAIN IT <br/><span className="text-emerald-500">BETTER.</span>
        </h1>
        <p className="max-w-lg text-zinc-500 font-medium leading-relaxed italic">
          Access specialized system documentation, tutorials, and technical briefs managed through the Coderaf HUB.
        </p>

        <div className="relative group max-w-xl pt-4">
           <Search className="absolute left-6 top-[calc(50%+8px)] -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
           <input 
             type="text" 
             placeholder="Search documentation..."
             className="w-full bg-white/[0.02] border border-white/5 rounded-3xl py-6 pl-14 pr-6 text-sm font-bold placeholder:text-zinc-800 outline-none focus:border-emerald-500/40 transition-all font-mono shadow-2xl"
           />
        </div>
      </section>

      {/* Docs Grid */}
      <section className="space-y-12">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 flex items-center gap-4">
           VAULT_DIRECTORY <div className="h-px flex-1 bg-white/5" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {publicDocs.length === 0 ? (
             <div className="col-span-full py-12 text-zinc-600 italic">
                No public documentation available. Please publish docs from the Admin panel.
             </div>
           ) : (
             publicDocs.map((doc: any) => (
               <Link 
                 key={doc.$id}
                 href={`/docs/${doc.slug || doc.$id}`}
                 className="group relative block p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-zinc-900/60 overflow-hidden shadow-xl"
               >
                  <div className="flex items-center justify-between mb-6">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-500">
                        <StickyNote size={22} />
                     </div>
                     <ChevronRight size={18} className="text-zinc-800 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <div className="space-y-2 relative z-10">
                     <span className="text-[8px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-emerald-500/50 transition-colors">{doc.category || "General"}</span>
                     <h4 className="text-xl font-black text-white italic transition-colors leading-tight">{doc.title}</h4>
                     <p className="text-xs text-zinc-600 font-medium italic line-clamp-2">
                        {doc.content.substring(0, 100).replace(/[{}[\]"]/g, '')}...
                     </p>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                     <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[9px] font-black uppercase text-zinc-600 tracking-widest border border-white/5">
                        <Activity size={10} /> Sync_Stable
                     </div>
                     <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[9px] font-black uppercase text-zinc-600 tracking-widest border border-white/5">
                        <Zap size={10} /> 1.2ms
                     </div>
                  </div>

                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />
               </Link>
             ))
           )}
        </div>
      </section>

      {/* Stats Footer */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/5">
         <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5">
            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-1">Documents</p>
            <p className="text-2xl font-black text-white italic leading-none">{publicDocs.length}</p>
         </div>
         <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5">
            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-1">Status</p>
            <p className="text-2xl font-black text-emerald-500 italic leading-none uppercase tracking-tighter">Live</p>
         </div>
         <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5">
            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-1">Security</p>
            <p className="text-2xl font-black text-white italic leading-none">AES</p>
         </div>
         <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5">
            <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-1">Gateway</p>
            <p className="text-2xl font-black text-white italic leading-none">Cloud</p>
         </div>
      </section> section 
    </div>
  );
}
