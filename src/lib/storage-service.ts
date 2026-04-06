import { storage, APPWRITE_CONFIG, ID } from "./appwrite";

export const storageService = {
  /**
   * Uploads a file to Appwrite Storage and returns the download URL.
   * @param file The file object to upload
   * @param onProgress Callback for upload progress
   */
  async uploadFile(
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      const response = await storage.createFile(
        APPWRITE_CONFIG.bucketId,
        ID.unique(),
        file
      );

      // Construct the public URL for the file
      // NOTE: Ensure the bucket has public read permissions in Appwrite Console
      const fileId = response.$id;
      const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://tor.cloud.appwrite.io/v1";
      const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "69d36094003741ad3f33";
      
      const downloadURL = `${endpoint}/storage/buckets/${APPWRITE_CONFIG.bucketId}/files/${fileId}/view?project=${projectId}`;
      
      if (onProgress) onProgress(100);
      return downloadURL;
    } catch (error) {
      console.error("Appwrite Upload failed:", error);
      throw error;
    }
  }
};
