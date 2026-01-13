import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useDebouncedCallback } from 'use-debounce';

class AutoSaveManager {
  constructor(noteId, onStatusChange) {
    this.noteId = noteId;
    this.onStatusChange = onStatusChange || (() => { });
    this.lastContent = null;
  }

  async saveDraft(data) {
    if (!this.noteId) return;

    // Don't save if content hasn't changed (optional optimization, but good for reducing writes)
    // For now, we rely on the component to call us when changes happen.

    this.onStatusChange('saving');

    try {
      const draftRef = doc(db, 'drafts', this.noteId);
      await setDoc(draftRef, {
        ...data,
        updatedAt: serverTimestamp(),
        isDraft: true
      }, { merge: true });

      this.onStatusChange('saved');
    } catch (error) {
      console.error('Auto-save failed:', error);
      this.onStatusChange('error');
    }
  }
}

// React Hook wrapper
export const useAutoSave = (noteId, saveInterval = 30000) => {
  const save = useDebouncedCallback(async (data, statusCallback) => {
    const manager = new AutoSaveManager(noteId, statusCallback);
    await manager.saveDraft(data);
  }, saveInterval);

  return save;
};

export default AutoSaveManager;
