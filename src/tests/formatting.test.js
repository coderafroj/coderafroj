import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { applyBold, applyItalic, applyHeading, insertLink } from '../utils/markdownFormatting';

describe('Markdown Formatting Properties', () => {
    // Property 3: Markdown formatting consistency

    it('applyBold should always wrap selection in double asterisks', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.nat(),
                fc.nat(),
                (text, a, b) => {
                    // Normalize start/end
                    const len = text.length;
                    const pos1 = a % (len + 1);
                    const pos2 = b % (len + 1);
                    const start = Math.min(pos1, pos2);
                    const end = Math.max(pos1, pos2);

                    if (start > len || end > len) return true; // safety check

                    const selection = text.substring(start, end);
                    const result = applyBold(text, start, end);

                    expect(result).toContain(`**${selection}**`);
                    expect(result.length).toBe(text.length + 4);
                }
            )
        );
    });

    it('applyItalic should always wrap selection in single asterisks', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.nat(),
                fc.nat(),
                (text, a, b) => {
                    const len = text.length;
                    const pos1 = a % (len + 1);
                    const pos2 = b % (len + 1);
                    const start = Math.min(pos1, pos2);
                    const end = Math.max(pos1, pos2);

                    const selection = text.substring(start, end);
                    const result = applyItalic(text, start, end);

                    expect(result).toContain(`*${selection}*`);
                    expect(result.length).toBe(text.length + 2);
                }
            )
        );
    });

    it('applyHeading should prepend hashes', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.nat(),
                fc.nat(),
                (text, a, b) => {
                    const len = text.length;
                    const pos1 = a % (len + 1);
                    const pos2 = b % (len + 1);
                    const start = Math.min(pos1, pos2);
                    const end = Math.max(pos1, pos2);

                    const selection = text.substring(start, end);
                    const result = applyHeading(text, start, end, 2);

                    expect(result).toContain(`## ${selection}`);
                }
            )
        );
    });

    it('insertLink should format as [selection](url)', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.nat(),
                fc.nat(),
                fc.webUrl(),
                (text, a, b, url) => {
                    const len = text.length;
                    const pos1 = a % (len + 1);
                    const pos2 = b % (len + 1);
                    const start = Math.min(pos1, pos2);
                    const end = Math.max(pos1, pos2);

                    const selection = text.substring(start, end);
                    const result = insertLink(text, start, end, url);

                    // Note: if selection contains ] or (, it might break naive inclusion check if we were parsing, 
                    // but string containment should hold.
                    expect(result).toContain(`[${selection}](${url})`);
                }
            )
        );
    });
});
