import { useEffect } from 'react';
import { applyBold, applyItalic, insertLink } from '../../utils/markdownFormatting';

const KeyboardShortcutHandler = ({ onSave, onFormat, onUndo, onRedo }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Check for Ctrl/Cmd key
            if (!(e.ctrlKey || e.metaKey)) return;

            switch (e.key.toLowerCase()) {
                case 's':
                    e.preventDefault();
                    onSave();
                    break;
                case 'b':
                    e.preventDefault();
                    onFormat((content, selection) =>
                        applyBold(content, selection.start, selection.end)
                    );
                    break;
                case 'i':
                    e.preventDefault();
                    onFormat((content, selection) =>
                        applyItalic(content, selection.start, selection.end)
                    );
                    break;
                case 'k':
                    e.preventDefault();
                    const url = prompt('Enter URL:');
                    if (url) {
                        onFormat((content, selection) =>
                            insertLink(content, selection.start, selection.end, url)
                        );
                    }
                    break;
                case 'z':
                    // Undo/Redo is complex with controlled inputs.
                    // For now, we only prevent default if handlers are provided,
                    // otherwise let browser handle standard undo in textarea.
                    // Note requirements said "Trigger corresponding formatting/save actions".
                    if (e.shiftKey) {
                        if (onRedo) {
                            e.preventDefault();
                            onRedo();
                        }
                    } else {
                        if (onUndo) {
                            e.preventDefault();
                            onUndo();
                        }
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onSave, onFormat, onUndo, onRedo]);

    return null; // Logic-only component
};

export default KeyboardShortcutHandler;
