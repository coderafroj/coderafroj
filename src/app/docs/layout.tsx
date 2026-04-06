import DocsSidebar from "@/components/docs/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#030303] text-white selection:bg-emerald-500/30 selection:text-emerald-500">
      <DocsSidebar />
      <main className="flex-1 min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[200px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/[0.02] rounded-full blur-[150px] -z-10" />
        
        <div className="max-w-4xl mx-auto px-8 py-24 md:px-12 md:py-32 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
