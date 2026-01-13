import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PreviewPane = ({ content }) => {
  // Debounce content updates by 300ms
  const [debouncedContent] = useDebounce(content, 300);

  const components = useMemo(() => ({
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }), []);

  return (
    <div className="obsidian-card p-6 rounded-xl border border-[#30363d] sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-lg font-bold text-white mb-4">Preview</h3>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown components={components}>
          {debouncedContent || '*Preview will appear here...*'}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PreviewPane;
