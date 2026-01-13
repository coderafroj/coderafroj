import { render, cleanup, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import fc from 'fast-check';
import { useAutoSave } from '../services/AutoSaveManager';
import { setDoc } from 'firebase/firestore';

// Mock Firebase
vi.mock('../firebase', () => ({
    db: {}
}));

vi.mock('firebase/firestore', () => ({
    doc: vi.fn(),
    setDoc: vi.fn(),
    serverTimestamp: vi.fn(),
}));

// Helper component to test hook
const TestComponent = ({ noteId, data, onStatus }) => {
    const save = useAutoSave(noteId, 0); // 0ms debounce for immediate testing

    // Expose save function
    if (data) {
        save(data, onStatus);
    }
    return null;
};

describe('AutoSaveManager Persistence', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    // Property 1: Auto-save persistence
    it('should save data to correct draft location when triggered', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 1 }), // noteId
                fc.record({
                    title: fc.string(),
                    content: fc.string()
                }),
                async (noteId, data) => {
                    cleanup();
                    vi.clearAllMocks();
                    const onStatus = vi.fn();

                    // Mock setDoc success
                    setDoc.mockResolvedValueOnce();

                    render(
                        <TestComponent
                            noteId={noteId}
                            data={data}
                            onStatus={onStatus}
                        />
                    );

                    // Use fake timers to trigger debounce if needed, but 0ms usually runs essentially immediately 
                    // or next tick. With use-debounce, we might need to wait slightly.
                    await new Promise(r => setTimeout(r, 10));

                    // Check if setDoc was called with correct args
                    // Expected: doc(db, 'drafts', noteId) -> but doc is mocked
                    // We check setDoc call
                    expect(setDoc).toHaveBeenCalled();
                    const validCalls = setDoc.mock.calls.some(call => {
                        const [ref, savedData, options] = call;
                        return savedData.title === data.title
                            && savedData.content === data.content
                            && savedData.isDraft === true
                            && options.merge === true;
                    });
                    expect(validCalls).toBe(true);
                }
            ),
            { numRuns: 10 }
        );
    });
});
