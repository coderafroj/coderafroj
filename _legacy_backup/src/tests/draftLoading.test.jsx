import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import fc from 'fast-check';
import NoteEditor from '../pages/NoteEditor';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';

// Mock Firebase
vi.mock('../firebase', () => ({
    db: {}
}));

vi.mock('firebase/firestore', () => ({
    doc: vi.fn(),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
    serverTimestamp: vi.fn(),
}));

// Mock child components to simplify testing
vi.mock('../components/editor/EditorToolbar', () => ({ default: () => <div /> }));
vi.mock('../components/editor/EditorPane', () => ({
    default: ({ value }) => <div data-testid="editor-content">{value}</div>
}));
vi.mock('../components/editor/PreviewPane', () => ({ default: () => <div /> }));
vi.mock('../components/editor/MetadataEditor', () => ({ default: () => <div /> }));
vi.mock('../components/editor/KeyboardShortcutHandler', () => ({ default: () => <div /> }));

// Mock AutoSave hook (we don't need it for loading, but it's called)
vi.mock('../services/AutoSaveManager', () => ({
    useAutoSave: () => vi.fn()
}));

describe('Draft Loading Logic', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('should prioritize newer draft over existing note', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1 }), // noteId
                fc.string(), // note content
                fc.string(), // draft content
                fc.date(), // note time
                fc.date(), // draft time
                async (noteId, noteContent, draftContent, noteTime, draftTime) => {
                    cleanup();
                    vi.clearAllMocks();

                    // Ensure noteId is valid for route
                    // Mock getDoc behavior
                    // getDoc is called twice: once for note, once for draft
                    getDoc.mockImplementation((ref) => {
                        // We can't easily distinguish ref arg in mock without checking path
                        // But we know the order or we can infer.
                        // Actually, we can assume route provides ID.
                        // Mock implementation to check ref (which we mocked as returning an obj)
                        // This is tricky with simple mocks.
                        // Let's rely on call order or use specific mock returns if possible.
                        // In actual code: Promise.all([getDoc(docRef), getDoc(draftRef)])
                        return Promise.resolve({ exists: () => false }); // default
                    });

                    // We need to control the mocks more precisely.
                    // Let's manually setup mocks per run

                    const noteTimestamp = { toMillis: () => noteTime.getTime(), toDate: () => noteTime };
                    const draftTimestamp = { toMillis: () => draftTime.getTime(), toDate: () => draftTime };

                    getDoc
                        .mockResolvedValueOnce({ // Note
                            exists: () => true,
                            data: () => ({ content: noteContent, updatedAt: noteTimestamp })
                        })
                        .mockResolvedValueOnce({ // Draft
                            exists: () => true,
                            data: () => ({ content: draftContent, updatedAt: draftTimestamp })
                        });

                    render(
                        <MemoryRouter initialEntries={[`/admin/notes/edit/${encodeURIComponent(noteId)}`]}>
                            <Routes>
                                <Route path="/admin/notes/edit/:id" element={<NoteEditor />} />
                            </Routes>
                        </MemoryRouter>
                    );

                    // Wait for loading
                    // If draft is newer, expect draftContent
                    // If note is newer or equal, expect noteContent
                    const expectedContent = (draftTime.getTime() > noteTime.getTime()) ? draftContent : noteContent;

                    await waitFor(() => {
                        expect(screen.getByTestId('editor-content')).toHaveTextContent(expectedContent);
                    });
                }
            ),
            { numRuns: 10 }
        );
    });
});
