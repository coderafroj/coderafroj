import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  addDoc
} from "firebase/firestore";
import { db } from "./firebase";

export interface DocCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface DocumentationDoc {
  id: string;
  title: string;
  slug: string; // URL slug like 'getting-started'
  content: string; // Markdown content
  categoryId: string;
  order: number;
  lastUpdated: Timestamp;
  author?: string;
  description?: string;
}

const DOCS_COLLECTION = "documentation";
const CATEGORIES_COLLECTION = "doc_categories";

export const docsService = {
  // Categories
  async getCategories() {
    const q = query(collection(db, CATEGORIES_COLLECTION), orderBy("order", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as DocCategory));
  },

  async addCategory(data: Omit<DocCategory, "id">) {
    return await addDoc(collection(db, CATEGORIES_COLLECTION), data);
  },

  async updateCategory(id: string, data: Partial<DocCategory>) {
    const ref = doc(db, CATEGORIES_COLLECTION, id);
    return await updateDoc(ref, data);
  },

  async deleteCategory(id: string) {
    const ref = doc(db, CATEGORIES_COLLECTION, id);
    return await deleteDoc(ref);
  },

  // Documentation Docs
  async getDocs() {
    const q = query(collection(db, DOCS_COLLECTION), orderBy("order", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as DocumentationDoc));
  },

  async getDocsByCategory(categoryId: string) {
    const q = query(
      collection(db, DOCS_COLLECTION), 
      where("categoryId", "==", categoryId),
      orderBy("order", "asc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as DocumentationDoc));
  },

  async getDocBySlug(slug: string) {
    const q = query(collection(db, DOCS_COLLECTION), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as DocumentationDoc;
  },

  async getDocById(id: string) {
    const ref = doc(db, DOCS_COLLECTION, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as DocumentationDoc;
  },

  async addDoc(data: Omit<DocumentationDoc, "id" | "lastUpdated">) {
    return await addDoc(collection(db, DOCS_COLLECTION), {
      ...data,
      lastUpdated: Timestamp.now()
    });
  },

  async updateDoc(id: string, data: Partial<DocumentationDoc>) {
    const ref = doc(db, DOCS_COLLECTION, id);
    return await updateDoc(ref, {
      ...data,
      lastUpdated: Timestamp.now()
    });
  },

  async deleteDoc(id: string) {
    const ref = doc(db, DOCS_COLLECTION, id);
    return await deleteDoc(ref);
  }
};
