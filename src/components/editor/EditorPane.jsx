import { useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const EditorPane = ({ value, onChange, onSelectionChange }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleSelect = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = value.substring(start, end);
      onSelectionChange({ start, end, text });
    }
  };

  const handleKeyDown = (e) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className="obsidian-card p-6 rounded-xl border border-[#30363d]">
      <h3 className="text-lg font-bold text-white mb-4">Editor</h3>
      <TextareaAutosize
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        placeholder="Write your note content in markdown..."
        className="w-full bg-transparent text-slate-300 placeholder-slate-600 focus:outline-none font-mono text-sm resize-none"
        minRows={20}
      />
    </div>
  );
};

export default EditorPane;
