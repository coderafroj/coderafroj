import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import EditorToolbar from '../components/editor/EditorToolbar';
import EditorPane from '../components/editor/EditorPane';
import PreviewPane from '../components/editor/PreviewPane';
import MetadataEditor from '../components/editor/MetadataEditor';
import KeyboardShortcutHandler from '../components/editor/KeyboardShortcutHandler';
import { useAutoSave } from '../services/AutoSaveManager';

const NoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const mode = id ? 'edit' : 'create';

  const [editorState, setEditorState] = useState({
    title: '',
    description: '',
    content: '',
    tags: [],
    featuredImage: '',
    status: 'draft',
    lastSaved: null,
    isSaving: false,
    hasUnsavedChanges: false,
  });
  const [textSelection, setTextSelection] = useState({ start: 0, end: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-save hook
  // We use editorState for data, and rely on hasUnsavedChanges to know when to save? 
  // actually use-debounce handles debounce, but we should pass data only when changed.
  // The hook internally saves 'data'. We should call 'save' when content changes.

  const saveDraft = useAutoSave(id || 'new', 30000); // 30s interval

  // Effect to trigger auto-save when state changes and has unsaved changes
  useEffect(() => {
    if (editorState.hasUnsavedChanges && editorState.status === 'draft') {
      saveDraft({
        title: editorState.title,
        description: editorState.description,
        content: editorState.content,
        tags: editorState.tags,
        featuredImage: editorState.featuredImage,
      }, (status) => {
        if (status === 'saving') {
          setEditorState(prev => ({ ...prev, isSaving: true }));
        } else if (status === 'saved') {
          setEditorState(prev => ({
            ...prev,
            isSaving: false,
            lastSaved: new Date()
          }));
        } else if (status === 'error') {
          setEditorState(prev => ({ ...prev, isSaving: false }));
        }
      });
    }
  }, [editorState, saveDraft]);

  useEffect(() => {
    if (mode === 'edit' && id) {
      loadNote(id);
    } else {
      setIsLoading(false);
    }
  }, [id, mode]);

  const loadNote = async (noteId) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'notes', noteId);
      const draftRef = doc(db, 'drafts', noteId);

      const [docSnap, draftSnap] = await Promise.all([
        getDoc(docRef),
        getDoc(draftRef)
      ]);

      let data = null;
      let isFromDraft = false;

      if (draftSnap.exists()) {
        const draftData = draftSnap.data();
        // If note exists, only use draft if draft is newer
        if (docSnap.exists()) {
          const noteTimestamp = docSnap.data().updatedAt?.toMillis() || 0;
          const draftTimestamp = draftData.updatedAt?.toMillis() || 0;
          if (draftTimestamp > noteTimestamp) {
            data = draftData;
            isFromDraft = true;
          } else {
            data = docSnap.data();
          }
        } else {
          // Note doesn't exist but draft does (maybe created but never saved as note?)
          data = draftData;
          isFromDraft = true;
        }
      } else if (docSnap.exists()) {
        data = docSnap.data();
      }

      if (data) {
        setEditorState({
          title: data.title || '',
          description: data.description || '',
          content: data.content || '',
          tags: data.tags || [],
          featuredImage: data.featuredImage || '',
          status: isFromDraft ? 'draft' : (data.status || 'draft'), // If from draft, force status draft? Or keep?
          lastSaved: data.updatedAt ? data.updatedAt.toDate() : null,
          isSaving: false,
          hasUnsavedChanges: isFromDraft, // If loaded from draft, treating as unsaved changes so we can save to note? 
          // Or, if we load draft, we should probably treat it as "unsaved changes relative to main note"
          // actually if it's a draft, hasUnsavedChanges=false initially for the *draft*, but we want to eventually save to note.
          // Let's set hasUnsavedChanges=false for now, as the editor content matches the (draft) source.
          // However, if we want to prompt user "Unsaved draft loaded", we might handle that via UI notification.
        });
        if (isFromDraft) {
          // Optional: Notify user draft was loaded
          console.log("Loaded from draft");
        }
      } else {
        setError('Note not found.');
      }
    } catch (err) {
      console.error('Error loading note:', err);
      setError('Failed to load note.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (field, value) => {
    setEditorState(prev => ({
      ...prev,
      [field]: value,
      hasUnsavedChanges: true,
    }));
  };

  const handleSave = async () => {
    setEditorState(prev => ({ ...prev, isSaving: true }));
    try {
      const noteData = {
        title: editorState.title,
        description: editorState.description,
        content: editorState.content,
        tags: editorState.tags,
        featuredImage: editorState.featuredImage,
        status: editorState.status,
        updatedAt: serverTimestamp(),
      };

      if (mode === 'create') {
        const newId = Date.now().toString();
        const newDocRef = doc(db, 'notes', newId);
        await setDoc(newDocRef, { ...noteData, createdAt: serverTimestamp() });
        // After successful creation, navigate to the actual note ID
        navigate(`/admin/notes/edit/${newId}`, { replace: true });
        setEditorState(prev => ({
          ...prev,
          hasUnsavedChanges: false,
          lastSaved: new Date(),
        }));
      } else {
        const docRef = doc(db, 'notes', id);
        await updateDoc(docRef, noteData);
        setEditorState(prev => ({
          ...prev,
          hasUnsavedChanges: false,
          lastSaved: new Date(),
        }));
      }
    } catch (err) {
      console.error('Error saving note:', err);
      setError('Failed to save note.');
    } finally {
      setEditorState(prev => ({ ...prev, isSaving: false }));
    }
  };

  // Navigation warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (editorState.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [editorState.hasUnsavedChanges]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading note...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-white mb-2">
            {mode === 'create' ? 'Create New Note' : 'Edit Note'}
          </h1>
          <p className="text-slate-400">
            {mode === 'create' ? 'Write your new note' : 'Update your note content'}
          </p>
        </motion.div>

        <EditorToolbar
          onSave={handleSave}
          isSaving={editorState.isSaving}
          lastSaved={editorState.lastSaved}
          textSelection={textSelection}
          onFormat={handleFormat}
        />

        <KeyboardShortcutHandler
          onSave={handleSave}
          onFormat={handleFormat}
        />


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-6">
            <MetadataEditor
              title={editorState.title}
              description={editorState.description}
              tags={editorState.tags}
              featuredImage={editorState.featuredImage}
              status={editorState.status}
              onChange={handleContentChange}
            />

            <EditorPane
              value={editorState.content}
              onChange={(value) => handleContentChange('content', value)}
              onSelectionChange={setTextSelection}
            />
          </div>

          <PreviewPane content={editorState.content} />
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
