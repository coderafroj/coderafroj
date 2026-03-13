import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { posts } from '../data/posts';
import SEO from '../components/SEO';
import { Calendar, Clock, Tag } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        return <div className="min-h-screen pt-32 text-center text-red-500 font-mono">ERROR 404: TRANSMISSION NOT FOUND</div>;
    }

    // Mock body content for now since we don't have real markdown files yet
    const content = `
# ${post.title}

This is a simulated markdown content for **${post.title}**. In a real application, this would be fetched from Firestore or a markdown file.

## Key Takeaways

1. **AI Agents** are the future.
2. **React Hooks** are powerful.
3. **Security** is non-negotiable.

\`\`\`javascript
const future = "Bright";
console.log("Hello " + future);
\`\`\`

> "The only way to predict the future is to invent it." - Alan Kay
    `;

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <SEO title={post.title} description={post.excerpt} image={post.image} />

            <article className="max-w-3xl mx-auto">
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-4 text-xs font-mono text-accent-glow mb-4">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 md:h-96 object-cover rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                    />
                </div>

                <div className="prose prose-invert prose-lg max-w-none font-sans">
                    <Markdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        {...props}
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code {...props} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {content}
                    </Markdown>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-dim-text text-sm font-mono mb-4">TAGS</h3>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-cyber-blue border border-cyber-blue/20 text-xs font-mono uppercase">
                                <Tag size={12} /> {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
