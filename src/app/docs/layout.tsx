import { Layout, Navbar, Footer } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import React from "react";
import { notesService } from "@/lib/notes-service";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const { documents: notes } = await notesService.getNotes(100);
  const publicDocs = (notes as any[]).filter(n => n.isPublic);

  // Generate Nextra PageMap for Sidebar
  const pageMap = [
    { name: "index", title: "Overview", route: "/docs" },
    ...publicDocs.map(doc => ({
      name: doc.slug || doc.$id,
      title: doc.title,
      route: `/docs/${doc.slug || doc.$id}`
    }))
  ];

  return (
    <div className="nextra-container">
      <Layout
        pageMap={pageMap as any}
        navbar={
          <Navbar 
            logo={
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-black font-sans shadow-lg shadow-emerald-500/20">C</div>
                <div className="flex flex-col leading-none">
                   <span className="font-black tracking-tighter uppercase italic text-white text-sm">Coderaf <span className="text-emerald-500">HUB</span></span>
                   <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">Documentation Portal</span>
                </div>
              </div>
            }
          />
        }
        footer={
          <Footer className="bg-zinc-950 border-t border-white/5 py-12 px-6 flex flex-col gap-4 text-center">
             <div className="text-zinc-500 text-xs font-medium italic">
                © {new Date().getFullYear()} Coderaf HUB. All high-power protocols reserved.
             </div>
             <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-700">
                <a href="/admin" className="hover:text-emerald-500 transition-colors">Admin_Sync</a>
                <a href="#" className="hover:text-emerald-500 transition-colors">Core_API</a>
                <a href="#" className="hover:text-emerald-500 transition-colors">Status_Live</a>
             </div>
          </Footer>
        }
        sidebar={{
          defaultMenuCollapseLevel: 1,
          toggleButton: true,
        }}
        docsRepositoryBase="https://github.com/coderafroj/coderafroj/tree/main"
        editLink="Edit this documentation"
        feedback={{
          content: "Was this helpful?",
          labels: "feedback"
        }}
      >
        {children}
      </Layout>
    </div>
  );
}
