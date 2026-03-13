import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import NoteEditor from '../pages/NoteEditor';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

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

// Mock child components
vi.mock('../components/editor/EditorToolbar', () => ({
    default: ({ onSave, onFormat }) => (
        <div data-testid="toolbar">
            <button onClick={onSave}>Save</button>
            <button onClick={() => onFormat((c) => c + '!')}>Format</button>
        </div>
    )
}));

vi.mock('../components/editor/EditorPane', () => ({
    default: ({ value, onChange }) => (
        <textarea
            data-testid="editor-pane"
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    )
}));

vi.mock('../components/editor/MetadataEditor', () => ({
    default: () => <div data-testid="metadata-editor" />
}));

vi.mock('../components/editor/PreviewPane', () => ({
    default: () => <div data-testid="preview-pane" />
}));

vi.mock('../services/AutoSaveManager', () => ({
    useAutoSave: () => vi.fn()
}));

vi.mock('../components/editor/KeyboardShortcutHandler', () => ({ default: () => null }));

describe('NoteEditor Properties', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    // Property 8: Unsaved changes warning
    it.skip('should prevent navigation (via beforeunload) when content is changed', async () => {
        // Setup
        cleanup(); // Clean up previous render

        // Mock getDoc to return empty (new note behavior)
        const { getDoc } = await import('firebase/firestore');
        getDoc.mockResolvedValue({ exists: () => false });

        render(
            <MemoryRouter initialEntries={['/admin/notes/new']}>
                <Routes>
                    <Route path="/admin/notes/new" element={<NoteEditor />} />
                </Routes>
            </MemoryRouter>
        );

        // Simulate typing
        const textarea = await screen.findByTestId('editor-pane');
        fireEvent.change(textarea, { target: { value: 'test content' } });

        // Wait for state update to propagate
        await screen.findByDisplayValue('test content');

        // Mock event
        const event = new Event('beforeunload', { bubbles: true, cancelable: true });
        Object.defineProperty(event, 'returnValue', {
            get: vi.fn(),
            set: vi.fn(),
            configurable: true
        });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        // Trigger
        window.dispatchEvent(event);

        // Assert
        expect(preventDefaultSpy).toHaveBeenCalled();
    });
});
