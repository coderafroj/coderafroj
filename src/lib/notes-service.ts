import { databases, APPWRITE_CONFIG, ID } from "./appwrite";
import { Query } from "appwrite";

export interface Note {
    $id?: string;
    title: string;
    content: string;
    tags?: string[];
    category?: string;
    isPinned?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

const NOTES_COLLECTION_ID = "notes"; // Default, user can update in .env.local

export const notesService = {
    async createNote(note: Omit<Note, "$id" | "createdAt" | "updatedAt">) {
        return await databases.createDocument(
            APPWRITE_CONFIG.databaseId,
            NOTES_COLLECTION_ID,
            ID.unique(),
            {
                ...note,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        );
    },

    async getNotes(limit = 25, offset = 0) {
        try {
            return await databases.listDocuments(
                APPWRITE_CONFIG.databaseId,
                NOTES_COLLECTION_ID,
                [
                    Query.orderDesc("updatedAt"),
                    Query.limit(limit),
                    Query.offset(offset)
                ]
            );
        } catch (error) {
            console.error("Error fetching notes:", error);
            // Return empty list if collection doesn't exist yet to prevent crash
            return { documents: [], total: 0 };
        }
    },

    async updateNote(id: string, note: Partial<Note>) {
        return await databases.updateDocument(
            APPWRITE_CONFIG.databaseId,
            NOTES_COLLECTION_ID,
            id,
            {
                ...note,
                updatedAt: new Date().toISOString()
            }
        );
    },

    async deleteNote(id: string) {
        return await databases.deleteDocument(
            APPWRITE_CONFIG.databaseId,
            NOTES_COLLECTION_ID,
            id
        );
    }
};
