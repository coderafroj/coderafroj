import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const components = {
    types: {
        image: ({ value }) => (
            <div className="my-8 overflow-hidden rounded-2xl border border-white/10 group">
                <img
                    src={urlFor(value).url()}
                    alt={value.alt || ''}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                {value.caption && (
                    <p className="p-4 text-xs text-dim-text text-center font-mono opacity-60">
                        {value.caption}
                    </p>
                )}
            </div>
        ),
        codeBlock: ({ value }) => (
            <div className="my-8 rounded-2xl overflow-hidden border border-white/10 obsidian-card">
                {value.filename && (
                    <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center">
                        <span className="text-[10px] font-mono text-primary-glow tracking-widest">{value.filename}</span>
                        <span className="text-[10px] font-mono text-dim-text uppercase">{value.language}</span>
                    </div>
                )}
                <div className="p-1">
                    <SyntaxHighlighter
                        language={value.language || 'javascript'}
                        style={atomDark}
                        customStyle={{
                            margin: 0,
                            background: 'transparent',
                            fontSize: '13px',
                            lineHeight: '1.6',
                        }}
                    >
                        {value.code}
                    </SyntaxHighlighter>
                </div>
            </div>
        ),
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-black text-white mt-12 mb-6 tracking-tight uppercase italic">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold text-white mt-10 mb-5 tracking-tight border-l-4 border-primary pl-4">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h3>,
        normal: ({ children }) => <p className="text-dim-text text-lg leading-relaxed mb-6 font-light">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary-glow bg-primary/5 p-6 rounded-r-2xl my-8 italic text-white/80">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        code: ({ children }) => <code className="bg-white/10 px-2 py-0.5 rounded font-mono text-primary-glow text-sm">{children}</code>,
        link: ({ children, value }) => (
            <a
                href={value.href}
                className="text-primary-glow hover:underline decoration-primary/30 underline-offset-4 transition-all"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
    },
};

export const TutorialRenderer = ({ content }) => {
    return (
        <div className="max-w-4xl mx-auto py-10">
            <PortableText value={content} components={components} />
        </div>
    );
};
