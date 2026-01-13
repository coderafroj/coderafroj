import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../components/ui/Button';
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

  const handleFormat = (formatter) => {
    const { content, contentSelection } = formatter(editorState.content, textSelection);
    setEditorState(prev => ({
      ...prev,
      content,
      hasUnsavedChanges: true
    }));
    // We can't easily force selection back to the textarea here without a ref, 
    // but the editor components should handle it if passed back.
  };

  const handleContentChange = (field, value) => {
    setEditorState(prev => ({
      ...prev,
      [field]: value,
      hasUnsavedChanges: true
    }));
  };

  const handleSave = async () => {
    if (!editorState.title) {
      setError('Artifact title required for persistence.');
      return;
    }

    setEditorState(prev => ({ ...prev, isSaving: true }));
    try {
      const timestamp = serverTimestamp();
      const noteData = {
        title: editorState.title,
        description: editorState.description,
        content: editorState.content,
        tags: editorState.tags,
        featuredImage: editorState.featuredImage,
        status: editorState.status,
        updatedAt: timestamp,
      };

      if (mode === 'create') {
        const newDocRef = doc(collection(db, 'notes'));
        await setDoc(newDocRef, {
          ...noteData,
          createdAt: timestamp,
        });
        navigate('/admin');
      } else {
        const docRef = doc(db, 'notes', id);
        await updateDoc(docRef, noteData);

        // Sync draft
        try {
          const draftRef = doc(db, 'drafts', id);
          await setDoc(draftRef, { ...noteData, status: 'synced', updatedAt: timestamp });
        } catch (draftErr) {
          console.warn('Draft sync failed:', draftErr);
        }
      }

      setEditorState(prev => ({
        ...prev,
        isSaving: false,
        lastSaved: new Date(),
        hasUnsavedChanges: false
      }));
    } catch (err) {
      console.error('Persistence error:', err);
      setError('Core terminal failed to persist artifact.');
    } finally {
      setEditorState(prev => ({ ...prev, isSaving: false }));
    }
  };

  const [activeEditorTab, setActiveEditorTab] = useState('write');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary-glow font-mono animate-pulse tracking-widest uppercase">Initializing Editor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="text-red-500 font-bold text-xl uppercase tracking-tighter flex items-center gap-3">
          <AlertCircle size={32} /> Error: {error}
        </div>
        <Button onClick={() => navigate('/admin')} variant="ghost">Return to Systems</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 pb-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
              {mode === 'create' ? 'Compose Note' : 'Refine Artifact'}
            </h1>
            <p className="text-dim-text font-mono text-[10px] tracking-[0.2em] uppercase">SYSTEM_ID: {id || 'NEW_SEQUENCE'}</p>
          </div>
          <div className="flex md:hidden w-full bg-white/5 p-1 rounded-2xl border border-white/5">
            <button onClick={() => setActiveEditorTab('write')} className={twMerge("flex-1 py-3 rounded-xl text-[10px] font-mono font-bold tracking-widest transition-all", activeEditorTab === 'write' ? "bg-primary text-white shadow-lg" : "text-slate-500")}>WRITE</button>
            <button onClick={() => setActiveEditorTab('preview')} className={twMerge("flex-1 py-3 rounded-xl text-[10px] font-mono font-bold tracking-widest transition-all", activeEditorTab === 'preview' ? "bg-primary text-white shadow-lg" : "text-slate-500")}>PREVIEW</button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className={twMerge("lg:col-span-12", activeEditorTab === 'preview' ? 'hidden lg:block' : 'block')}>
            <EditorToolbar
              onSave={handleSave}
              isSaving={editorState.isSaving}
              lastSaved={editorState.lastSaved}
              textSelection={textSelection}
              onFormat={handleFormat}
            />
          </div>

          <div className={twMerge("lg:col-span-7 space-y-10", activeEditorTab === 'write' ? 'block' : 'hidden lg:block')}>
            <section className="space-y-6">
              <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-primary-glow">Artifact Metadata</h3>
              <MetadataEditor
                title={editorState.title}
                description={editorState.description}
                tags={editorState.tags}
                featuredImage={editorState.featuredImage}
                status={editorState.status}
                onChange={handleContentChange}
              />
            </section>

            <section className="space-y-6">
              <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-primary-glow">Data Matrix (Markdown)</h3>
              <EditorPane
                value={editorState.content}
                onChange={(value) => handleContentChange('content', value)}
                onSelectionChange={setTextSelection}
              />
            </section>
          </div>

          <div className={twMerge("lg:col-span-5 lg:sticky lg:top-32", activeEditorTab === 'preview' ? 'block' : 'hidden lg:block')}>
            <section className="space-y-6">
              <h3 className="text-[10px] font-mono tracking-[0.4em] uppercase text-sky-400">Live Preview</h3>
              <PreviewPane content={editorState.content} />
            </section>
          </div>
        </div>

        <KeyboardShortcutHandler
          onSave={handleSave}
          onFormat={handleFormat}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
