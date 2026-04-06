import { Metadata } from "next";
import { docsService } from "@/lib/docs-service";
import DocContent from "./DocContent";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");
  const doc = await docsService.getDocBySlug(slug);
  
  return {
    title: doc ? `${doc.title} | Kodarafroj Docs` : "Documentation | Kodarafroj",
    description: doc?.description || "Official documentation and protocol guides for Kodarafroj system.",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");
  const initialDoc = await docsService.getDocBySlug(slug);

  return <DocContent initialDoc={initialDoc} slug={slug} />;
}
