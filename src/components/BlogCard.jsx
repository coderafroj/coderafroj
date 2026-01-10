import { Card } from './ui/Card';
import { ArrowRight, Clock, Calendar, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
    return (
        <Card className="obsidian-card group flex flex-col p-6 border-white/5 h-full relative overflow-hidden">
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 backdrop-blur-[1px]" />
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000 ease-out"
                />
            </div>

            <div className="flex items-center gap-4 text-[10px] font-mono text-dim-text mb-4 tracking-widest uppercase opacity-60">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-secondary-glow" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-secondary-glow" /> {post.readTime || '5_MIN_READ'}</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-3 tracking-tighter group-hover:text-secondary-glow transition-all duration-500 leading-tight line-clamp-2 uppercase">
                {post.title}
            </h3>

            <p className="text-dim-text text-sm mb-6 line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                {post.description || post.excerpt}
            </p>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                    {post.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-[9px] font-mono px-2 py-1 rounded bg-white/5 text-dim-text border border-white/5 group-hover:border-secondary/20 transition-all">
                            <Hash size={8} /> {tag.toUpperCase()}
                        </span>
                    ))}
                </div>
                <Link to={`/blog/${post.slug || post.id}`} className="text-secondary-glow p-2 rounded-xl bg-secondary/10 hover:bg-secondary hover:text-white transition-all duration-500">
                    <ArrowRight size={18} />
                </Link>
            </div>
        </Card>
    );
};

export default BlogCard;

