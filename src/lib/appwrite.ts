import { Client, Account, Databases, Storage, ID } from "appwrite";

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "69d36094003741ad3f33");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };

// Configuration Constants
export const APPWRITE_CONFIG = {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "main",
    docsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DOCS_COLLECTION_ID || "documentation",
    categoriesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID || "doc_categories",
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "doc_images"
};
