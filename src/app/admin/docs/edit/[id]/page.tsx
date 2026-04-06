"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DocEditor from "@/components/admin/DocEditor";
import { docsService, DocumentationDoc } from "@/lib/docs-service";
import { useAuth } from "@/hooks/use-auth";

export default function EditDocPage() {
  const { id } = useParams() as { id: string };
  const { isAdmin } = useAuth();
  const [doc, setDoc] = useState<DocumentationDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin && id) {
      docsService.getDocById(id).then(d => {
        setDoc(d);
        setLoading(false);
      });
    }
  }, [isAdmin, id]);

  if (!isAdmin || loading || !doc) return (
     <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-t-2 border-emerald-500 animate-spin" />
     </div>
  );

  const handleSave = async (data: any) => {
    await docsService.updateDoc(id, data);
  };

  const handleDelete = async (id: string) => {
     await docsService.deleteDoc(id);
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <DocEditor 
        initialData={doc} 
        onSave={handleSave} 
        onDelete={handleDelete}
      />
    </div>
  );
}
