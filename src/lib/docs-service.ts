import { databases, APPWRITE_CONFIG, ID } from "./appwrite";
import { Query } from "appwrite";

export interface DocCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface DocumentationDoc {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  description?: string;
  author?: string;
  lastUpdated: any; // Appwrite returns ISO dates as strings
  order: number;
}

export const docsService = {
  // --- Categories ---
  async getCategories(): Promise<DocCategory[]> {
    try {
      const response = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.categoriesCollectionId,
        [Query.orderAsc("order")]
      );
      return response.documents.map(doc => ({
        id: doc.$id,
        name: doc.name,
        slug: doc.slug,
        order: doc.order
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  async addCategory(category: Omit<DocCategory, "id">): Promise<void> {
    await databases.createDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.categoriesCollectionId,
      ID.unique(),
      category
    );
  },

  // --- Documentation Pages ---
  async getDocs(): Promise<DocumentationDoc[]> {
    try {
      const response = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.docsCollectionId,
        [Query.orderAsc("order")]
      );
      return response.documents.map(doc => ({
        id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        content: doc.content,
        categoryId: doc.categoryId,
        description: doc.description,
        author: doc.author,
        lastUpdated: { toMillis: () => new Date(doc.$updatedAt).getTime() }, // Keep compatibility with existing UI
        order: doc.order
      }));
    } catch (error) {
      console.error("Error fetching docs:", error);
      return [];
    }
  },

  async getDocBySlug(slug: string): Promise<DocumentationDoc | null> {
    try {
      const response = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.docsCollectionId,
        [Query.equal("slug", slug)]
      );
      if (response.documents.length === 0) return null;
      const doc = response.documents[0];
      return {
        id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        content: doc.content,
        categoryId: doc.categoryId,
        description: doc.description,
        author: doc.author,
        lastUpdated: { toMillis: () => new Date(doc.$updatedAt).getTime() },
        order: doc.order
      };
    } catch (error) {
       console.error("Error fetching doc by slug:", error);
       return null;
    }
  },

  async getDocById(id: string): Promise<DocumentationDoc | null> {
    try {
      const doc = await databases.getDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.docsCollectionId,
        id
      );
      return {
        id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        content: doc.content,
        categoryId: doc.categoryId,
        description: doc.description,
        author: doc.author,
        lastUpdated: { toMillis: () => new Date(doc.$updatedAt).getTime() },
        order: doc.order
      };
    } catch (error) {
       console.error("Error fetching doc by id:", error);
       return null;
    }
  },

  async addDoc(doc: Omit<DocumentationDoc, "id" | "lastUpdated">): Promise<void> {
    await databases.createDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.docsCollectionId,
      ID.unique(),
      doc
    );
  },

  async updateDoc(id: string, data: Partial<DocumentationDoc>): Promise<void> {
    // Remove lastUpdated if it exists as it's handled by Appwrite
    const { lastUpdated, ...updateData } = data;
    await databases.updateDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.docsCollectionId,
      id,
      updateData
    );
  },

  async deleteDoc(id: string): Promise<void> {
    await databases.deleteDocument(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.docsCollectionId,
      id
    );
  }
};
