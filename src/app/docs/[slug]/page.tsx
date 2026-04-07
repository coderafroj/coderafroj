import { notesService } from "@/lib/notes-service";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Calendar, Tag, ChevronLeft, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DocView({ params }: PageProps) {
  const { slug } = await params;
  const doc = await notesService.getNoteBySlug(slug);

  if (!doc) {
    notFound();
  }

  // Handle Novel JSON content if necessary
  let markdown = doc.content;
  try {
    if (doc.content.startsWith('{') || doc.content.startsWith('[')) {
      // Small helper to flatten Novel/TIptap JSON to markdown would go here
      // For now, we'll assume the user saves it or we fallback
      markdown = doc.content; 
    }
  } catch (e) {
    markdown = doc.content;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link 
        href="/docs" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-xs font-black uppercase tracking-widest group"
      >
        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Directory
      </Link>

      <article className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="space-y-4">
           <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                 {doc.category || "General"}
              </span>
              <div className="h-px flex-1 bg-white/5" />
           </div>
           
           <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none">
             {doc.title}
           </h1>

           <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                 <Calendar size={14} /> Published {new Date(doc.$createdAt || doc.$updatedAt || "").toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                 <Globe size={14} /> Shared publicly
              </div>
           </div>
        </header>

        <div className="prose prose-invert prose-zinc max-w-none 
          prose-headings:text-white prose-headings:italic prose-headings:font-black prose-headings:tracking-tight 
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-white prose-strong:font-black
          prose-code:text-emerald-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-3xl prose-pre:p-8
          prose-a:text-emerald-500 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl prose-blockquote:italic
          pt-8 border-t border-white/5"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        {doc.tags && doc.tags.length > 0 && (
          <footer className="pt-12 border-t border-white/5 mt-16 flex flex-wrap gap-3">
             {doc.tags.map(tag => (
               <span key={tag} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[9px] font-bold text-zinc-600 uppercase tracking-widest hover:text-white hover:border-white/10 transition-all">
                 #{tag}
               </span>
             ))}
          </footer>
        )}
      </article>
    </div>
  );
}
