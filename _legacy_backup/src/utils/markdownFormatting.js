/**
 * Markdown formatting utility functions
 */

export const applyBold = (text, start, end) => {
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  const after = text.substring(end);
  return `${before}**${selected}**${after}`;
};

export const applyItalic = (text, start, end) => {
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  const after = text.substring(end);
  return `${before}*${selected}*${after}`;
};

export const applyHeading = (text, start, end, level = 2) => {
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  const after = text.substring(end);
  const hashes = '#'.repeat(level);
  return `${before}${hashes} ${selected}${after}`;
};

export const insertList = (text, start, end, ordered = false) => {
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  const after = text.substring(end);
  const prefix = ordered ? '1. ' : '- ';
  return `${before}${prefix}${selected}${after}`;
};

export const insertLink = (text, start, end, url) => {
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  const after = text.substring(end);
  return `${before}[${selected}](${url})${after}`;
};

export const insertCodeBlock = (text, start, end, language = '') => {
  const before = text.substring(0, start);
  const selected = text.substring(start, end);
  const after = text.substring(end);
  return `${before}\n\`\`\`${language}\n${selected}\n\`\`\`\n${after}`;
};

export const insertImage = (text, start, url, alt = 'image') => {
  const before = text.substring(0, start);
  const after = text.substring(start);
  return `${before}![${alt}](${url})${after}`;
};
