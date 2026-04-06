"use client";

import DocEditor from "@/components/admin/DocEditor";
import { docsService } from "@/lib/docs-service";
import { useAuth } from "@/hooks/use-auth";

export default function NewDocPage() {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  const handleSave = async (data: any) => {
    await docsService.addDoc(data);
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <DocEditor onSave={handleSave} />
    </div>
  );
}
