"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Info, AlertCircle, CheckCircle2, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none prose-pre:bg-transparent prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:italic prose-p:font-medium prose-headings:font-black prose-headings:tracking-tight prose-headings:italic">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-5xl md:text-7xl font-black mb-12 italic tracking-tighter mask-text uppercase">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl md:text-5xl font-black mt-16 mb-8 italic tracking-tighter border-b border-white/5 pb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-black mt-10 mb-6 italic tracking-tight text-white/90">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed italic border-l-2 border-emerald-500/10 pl-6">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-4 mb-10 list-none pl-4">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-3 group">
              <ChevronRight className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="text-neutral-400 italic font-medium">{children}</div>
            </li>
          ),
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const [copied, setCopied] = useState(false);

            const handleCopy = () => {
              navigator.clipboard.writeText(String(children));
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            };

            if (!inline && match) {
              return (
                <div className="relative group my-8">
                  <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={handleCopy}
                      className="p-2 glass rounded-lg border border-white/10 text-neutral-500 hover:text-white transition-all bg-black/40"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="rounded-3xl border border-white/5 overflow-hidden bg-black/40 backdrop-blur-xl">
                    <div className="px-6 py-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                       <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500/40" />
                          <div className="w-2 h-2 rounded-full bg-amber-500/40" />
                          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">{match[1]}</span>
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        background: "transparent",
                        padding: "24px",
                        margin: 0,
                        fontSize: "0.9rem",
                        lineHeight: "1.6",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }

            return (
              <code className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-emerald-500 font-mono text-sm italic" {...props}>
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => {
            // Check for potential custom callouts [!NOTE], [!TIP], etc.
            const textContent = React.Children.toArray(children).map(c => {
               if (typeof c === 'string') return c;
               if (React.isValidElement(c)) {
                  const props = c.props as any;
                  return props.children;
               }
               return '';
            }).join('');

            let icon = <Info className="w-6 h-6 text-blue-500" />;
            let title = "INFO";
            let colorClass = "from-blue-500/10 to-transparent border-blue-500/20 text-blue-500";

            if (textContent.includes("[!NOTE]")) {
               icon = <Info className="w-6 h-6 text-emerald-500" />;
               title = "PROCESS_NOTE";
               colorClass = "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-500";
            } else if (textContent.includes("[!IMPORTANT]") || textContent.includes("[!CAUTION]")) {
               icon = <AlertCircle className="w-6 h-6 text-red-500" />;
               title = "CRITICAL_ACTION";
               colorClass = "from-red-500/10 to-transparent border-red-500/20 text-red-500";
            } else if (textContent.includes("[!TIP]")) {
               icon = <CheckCircle2 className="w-6 h-6 text-amber-500" />;
               title = "OPTIMIZATION_TIP";
               colorClass = "from-amber-500/10 to-transparent border-amber-500/20 text-amber-500";
            }

            return (
              <div className={cn("my-10 p-8 glass rounded-[2.5rem] border bg-gradient-to-br flex gap-6 items-start relative overflow-hidden group", colorClass)}>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:opacity-[0.07] transition-opacity" />
                 <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0">
                    {icon}
                 </div>
                 <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 italic">{title}</span>
                    <div className="text-neutral-400 italic font-medium leading-relaxed prose-invert-p">
                       {children}
                    </div>
                 </div>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
