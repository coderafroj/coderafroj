import { Bold, Italic, Heading, List, Link as LinkIcon, Code, Image, Save, Check, AlertCircle } from 'lucide-react';
import { applyBold, applyItalic, applyHeading, insertList, insertLink, insertCodeBlock } from '../../utils/markdownFormatting';

const EditorToolbar = ({ onSave, isSaving, lastSaved, textSelection, onFormat }) => {
  const formatBold = () => {
    onFormat((content, selection) => {
      return applyBold(content, selection.start, selection.end);
    });
  };

  const formatItalic = () => {
    onFormat((content, selection) => {
      return applyItalic(content, selection.start, selection.end);
    });
  };

  const formatHeading = () => {
    onFormat((content, selection) => {
      return applyHeading(content, selection.start, selection.end);
    });
  };

  const formatList = () => {
    onFormat((content, selection) => {
      return insertList(content, selection.start, selection.end);
    });
  };

  const formatLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      onFormat((content, selection) => {
        return insertLink(content, selection.start, selection.end, url);
      });
    }
  };

  const formatCode = () => {
    onFormat((content, selection) => {
      return insertCodeBlock(content, selection.start, selection.end);
    });
  };

  const getSaveIndicator = () => {
    if (isSaving) {
      return (
        <span className="flex items-center gap-2 text-yellow-400 text-sm">
          <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          Saving...
        </span>
      );
    }
    if (lastSaved) {
      return (
        <span className="flex items-center gap-2 text-green-400 text-sm">
          <Check size={16} />
          Saved at {lastSaved.toLocaleTimeString()}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="obsidian-card p-4 rounded-xl border border-[#30363d] flex flex-wrap items-center gap-3">
      <button
        onClick={formatBold}
        className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-slate-300 hover:text-white"
        title="Bold (Ctrl+B)"
      >
        <Bold size={20} />
      </button>

      <button
        onClick={formatItalic}
        className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-slate-300 hover:text-white"
        title="Italic (Ctrl+I)"
      >
        <Italic size={20} />
      </button>

      <button
        onClick={formatHeading}
        className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-slate-300 hover:text-white"
        title="Heading"
      >
        <Heading size={20} />
      </button>

      <button
        onClick={formatList}
        className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-slate-300 hover:text-white"
        title="List"
      >
        <List size={20} />
      </button>

      <button
        onClick={formatLink}
        className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-slate-300 hover:text-white"
        title="Link (Ctrl+K)"
      >
        <LinkIcon size={20} />
      </button>

      <button
        onClick={formatCode}
        className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-slate-300 hover:text-white"
        title="Code Block"
      >
        <Code size={20} />
      </button>

      <div className="h-6 w-px bg-[#30363d] mx-2" />

      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 disabled:bg-primary/50 rounded-lg transition-colors text-white font-medium"
        title="Save (Ctrl+S)"
      >
        <Save size={18} />
        Save
      </button>

      <div className="ml-auto">
        {getSaveIndicator()}
      </div>
    </div>
  );
};

export default EditorToolbar;
