import { render, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import fc from 'fast-check';
import KeyboardShortcutHandler from '../components/editor/KeyboardShortcutHandler';
import { applyBold, applyItalic, insertLink } from '../utils/markdownFormatting';

describe('KeyboardShortcutHandler Properties', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('should trigger correct formatting on Ctrl+Key combos', () => {
        fc.assert(
            fc.property(
                fc.constantFrom('b', 'i', 'k'),
                fc.string(),
                (key, promptResult) => {
                    cleanup();
                    const onSave = vi.fn();
                    const onFormat = vi.fn();
                    const onUndo = vi.fn();
                    const onRedo = vi.fn();

                    // Mock prompt for 'k'
                    vi.spyOn(window, 'prompt').mockReturnValue(promptResult || 'https://example.com');

                    render(
                        <KeyboardShortcutHandler
                            onSave={onSave}
                            onFormat={onFormat}
                            onUndo={onUndo}
                            onRedo={onRedo}
                        />
                    );

                    const event = new KeyboardEvent('keydown', {
                        key: key,
                        ctrlKey: true,
                        bubbles: true,
                        cancelable: true
                    });
                    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

                    window.dispatchEvent(event);

                    if (key === 'b') {
                        expect(onFormat).toHaveBeenCalledTimes(1);
                        expect(preventDefaultSpy).toHaveBeenCalled();
                        // Verify callback
                        const callback = onFormat.mock.calls[0][0];
                        const result = callback('test', { start: 0, end: 4 });
                        expect(result).toBe(applyBold('test', 0, 4));
                    } else if (key === 'i') {
                        expect(onFormat).toHaveBeenCalledTimes(1);
                        expect(preventDefaultSpy).toHaveBeenCalled();
                        const callback = onFormat.mock.calls[0][0];
                        const result = callback('test', { start: 0, end: 4 });
                        expect(result).toBe(applyItalic('test', 0, 4));
                    } else if (key === 'k') {
                        if (promptResult || 'https://example.com') { // prompt implies logic
                            expect(onFormat).toHaveBeenCalledTimes(1);
                            expect(preventDefaultSpy).toHaveBeenCalled();
                            const callback = onFormat.mock.calls[0][0];
                            const result = callback('test', { start: 0, end: 4 });
                            const url = promptResult || 'https://example.com';
                            expect(result).toBe(insertLink('test', 0, 4, url));
                        }
                    }
                }
            )
        );
    });

    it('should trigger save on Ctrl+S', () => {
        const onSave = vi.fn();
        render(<KeyboardShortcutHandler onSave={onSave} />);

        const event = new KeyboardEvent('keydown', {
            key: 's',
            ctrlKey: true,
            bubbles: true,
            cancelable: true
        });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
        window.dispatchEvent(event);

        expect(onSave).toHaveBeenCalled();
        expect(preventDefaultSpy).toHaveBeenCalled();
    });
});
