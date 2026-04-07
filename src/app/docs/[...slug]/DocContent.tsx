"use client";

import { useEffect, useState } from "react";
import { docsService, DocumentationDoc } from "@/lib/docs-service";
import MarkdownRenderer from "@/components/docs/MarkdownRenderer";
import NovelRenderer from "@/components/docs/NovelRenderer";
import { 
  ArrowRight, 
  Edit3, 
  ChevronRight,
  ShieldCheck
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
           <ShieldCheck size={40} className="text-red-500 opacity-60" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-white">Document Not Found</h1>
          <p className="text-zinc-500 max-w-sm mx-auto font-medium text-sm">
            The requested documentation could not be located. 
            It may have been moved or the link is incorrect.
          </p>
        </div>
        <Link href="/docs" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-emerald-400 transition-all text-xs">
           Return to Docs
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 md:space-y-12 pb-24 md:pb-32"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-zinc-500 mb-6 md:mb-8 border-b border-white/5 pb-4 md:pb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
         <Link href="/docs" className="hover:text-emerald-500 transition-colors">Documentation</Link>
         <ChevronRight size={10} className="text-zinc-800 flex-shrink-0" />
         <span className="text-zinc-300">{doc.title}</span>
      </div>

      <header className="space-y-8 md:space-y-10 relative">
        <div className="space-y-4 md:space-y-6">
           {isAdmin && (
             <Link 
               href={`/admin/docs/edit/${doc.id}`}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-500/20 transition-colors"
             >
                <Edit3 size={10} /> Edit Guide
             </Link>
           )}
           <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-white leading-[1.2] md:leading-[1.1]">
              {doc.title}
           </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 py-6 border-y border-white/5">
           <div className="flex flex-wrap gap-8">
              <div className="flex flex-col">
                 <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-zinc-600">Last Modified</span>
                 <span className="text-xs md:text-sm font-semibold text-zinc-400">{new Date(doc.lastUpdated.toMillis()).toLocaleDateString()}</span>
              </div>
              
              <div className="flex flex-col">
                 <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-zinc-600">Author</span>
                 <span className="text-xs md:text-sm font-semibold text-zinc-400">{doc.author || "Kodarafroj Hub"}</span>
              </div>
           </div>

           <div className="sm:ml-auto">
              <div className="inline-flex px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                 PRO_VERIFIED
              </div>
           </div>
        </div>

        {doc.description && (
           <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-3xl italic md:not-italic">
              {doc.description}
           </p>
        )}
      </header>

      <div className="py-8 md:py-12 border-b border-white/5 overflow-x-hidden">
         <div className="prose prose-invert max-w-none prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-white/5">
            {doc.content.startsWith('{') ? (
               <NovelRenderer content={doc.content} />
            ) : (
               <MarkdownRenderer content={doc.content} />
            )}
         </div>
      </div>

      <footer className="pt-16 md:pt-24 flex flex-col md:flex-row justify-between items-center gap-12">
         <div className="space-y-4 text-center md:text-left w-full md:w-auto">
            <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Was this guide helpful?</h4>
            <div className="flex gap-4 justify-center md:justify-start">
               <button className="flex-1 md:flex-none px-8 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-emerald-500/10 hover:text-emerald-500 transition-all text-sm font-bold">Yes</button>
               <button className="flex-1 md:flex-none px-8 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/10 transition-all text-sm font-bold">No</button>
            </div>
         </div>

         <Link 
           href="/docs"
           className="w-full md:w-auto flex items-center justify-between gap-6 p-6 md:p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
         >
            <div className="text-right">
               <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">Return to hub</span>
               <span className="text-base md:text-lg font-bold group-hover:text-emerald-500 transition-colors">Browse Documentation</span>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-neutral-600 group-hover:text-emerald-500 transition-colors">
               <ArrowRight size={20} />
            </div>
         </Link>
      </footer>
    </motion.div>
  );
}
