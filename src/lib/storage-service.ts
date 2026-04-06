import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import { storage } from "./firebase";

export const storageService = {
  /**
   * Uploads a file to Firebase Storage and returns the download URL.
   * @param file The file object to upload
   * @param path The path in storage (e.g., 'docs/images/')
   * @param onProgress Callback for upload progress
   */
  async uploadFile(
    file: File, 
    path: string = "documentation/images/",
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const storageRef = ref(storage, `${path}${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }
};
