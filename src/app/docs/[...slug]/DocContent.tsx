"use client";

import { useEffect, useState } from "react";
import { docsService, DocumentationDoc } from "@/lib/docs-service";
import MarkdownRenderer from "@/components/docs/MarkdownRenderer";
import NovelRenderer from "@/components/docs/NovelRenderer";
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Edit3, 
  ExternalLink,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

interface DocContentProps {
  initialDoc: DocumentationDoc | null;
  slug: string;
}

export default function DocContent({ initialDoc, slug }: DocContentProps) {
  const [doc, setDoc] = useState<DocumentationDoc | null>(initialDoc);
  const [loading, setLoading] = useState(!initialDoc);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!initialDoc && slug) {
      setLoading(true);
      docsService.getDocBySlug(slug).then(d => {
        setDoc(d);
        setLoading(false);
      });
    }
  }, [slug, initialDoc]);

  if (loading) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-4 w-32 bg-white/5 rounded-lg" />
        <div className="space-y-4">
          <div className="h-16 w-3/4 bg-white/5 rounded-2xl" />
          <div className="h-8 w-1/2 bg-white/5 rounded-xl" />
        </div>
        <div className="space-y-6 pt-12">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-4 bg-white/5 rounded-full w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-10">
        <div className="w-24 h-24 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex items-center justify-center">
           <ShieldCheck size={48} className="text-red-500 opacity-40 shadow-[0_0_20px_rgba(239,68,68,0.3)]" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">PROTOCOL_MISSING</h1>
          <p className="text-neutral-500 italic font-medium max-w-md mx-auto">
            The requested documentation node could not be located in the central repository. 
            Possible data corruption or unauthorized entry.
          </p>
        </div>
        <Link href="/docs" className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-emerald-400 transition-all uppercase tracking-widest text-xs neon-glow">
           RETURN_TO_BASE
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-16"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-8 border-b border-white/5 pb-8">
         <span className="hover:text-white transition-colors cursor-pointer">DOCS</span>
         <ChevronRight size={12} className="text-neutral-800" />
         <span className="text-emerald-500 italic">/{doc.slug}</span>
      </div>

      <header className="space-y-8 relative">
        <div className="absolute -left-12 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-full blur-[1px]" />
        
        <div className="space-y-4">
           {isAdmin && (
             <Link 
               href={`/admin/docs/edit/${doc.id}`}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/30 text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] mb-4 hover:bg-emerald-500/10 transition-colors"
             >
                <Edit3 size={12} /> PROTOCOL_OWNER_OVERRIDE
             </Link>
           )}
           <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mask-text uppercase">
              {doc.title}
           </h1>
        </div>

        <div className="flex flex-wrap gap-8 pt-4">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                 <Clock size={16} className="text-neutral-500" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700">MODIFIED</span>
                 <span className="text-xs font-black italic text-neutral-400">{new Date(doc.lastUpdated.toMillis()).toLocaleDateString()}</span>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                 <User size={16} className="text-neutral-500" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-neutral-700">AUTHOR</span>
                 <span className="text-xs font-black italic text-neutral-400">{doc.author || "CORE_LAB"}</span>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                 <Terminal size={16} className="text-emerald-500" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">ENCRYPTION</span>
                 <span className="text-xs font-black italic text-neutral-400">AES-256_ACTIVE</span>
              </div>
           </div>
        </div>

        {doc.description && (
           <p className="text-2xl text-neutral-500 italic font-medium leading-relaxed max-w-3xl border-l-2 border-white/5 pl-10 mt-12">
              {doc.description}
           </p>
        )}
      </header>

      <div className="py-20 border-y border-white/5 relative">
         <div className="absolute top-0 right-0 w-32 h-[1px] bg-emerald-500/40" />
         <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-emerald-500/40" />
         {doc.content.startsWith('{') ? (
            <NovelRenderer content={doc.content} />
         ) : (
            <MarkdownRenderer content={doc.content} />
         )}
      </div>

      <footer className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
         <div className="space-y-4">
            <h4 className="text-sm font-black italic uppercase tracking-widest text-white/90">WAS THIS RELEVANT?</h4>
            <div className="flex gap-4">
               <button className="px-8 py-3 rounded-2xl glass border-white/10 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all text-[10px] font-black uppercase tracking-widest">TRANSACTION_VALID</button>
               <button className="px-8 py-3 rounded-2xl glass border-white/10 hover:bg-red-500/10 hover:text-red-500 transition-all text-[10px] font-black uppercase tracking-widest">REPORT_FAILURE</button>
            </div>
         </div>

         <div className="p-8 glass rounded-[2.5rem] border border-white/10 relative group cursor-pointer overflow-hidden max-w-xs">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:neon-glow transition-all">
                  <ExternalLink size={20} className="text-neutral-500" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 italic">NEXT_MODULE</span>
            </div>
            <h5 className="text-xl font-black italic tracking-tight group-hover:text-emerald-500 transition-colors">ADVANCED_PROTOCOLS</h5>
         </div>
      </footer>
    </motion.div>
  );
}
