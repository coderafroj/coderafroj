import { Card } from './ui/Card';
import { ExternalLink, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
    return (
        <Card className="obsidian-card group relative overflow-hidden flex flex-col p-0 border-white/5 h-[500px]">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative overflow-hidden h-64">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 backdrop-blur-[2px]" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-primary-glow font-bold tracking-widest uppercase">
                        {project.category || 'Legacy'}
                    </div>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow relative z-20">
                <div className="flex items-center gap-2 mb-4 opacity-50">
                    <Terminal size={12} className="text-primary-glow" />
                    <span className="text-[10px] font-mono tracking-widest">OBJ_ID: {project.id?.slice(0, 8)}</span>
                </div>

                <h3 className="text-2xl font-black text-white mb-3 tracking-tighter group-hover:text-primary-glow transition-colors duration-500 line-clamp-1">
                    {project.title}
                </h3>

                <p className="text-dim-text text-sm mb-6 flex-grow line-clamp-3 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags?.map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-dim-text border border-white/5 group-hover:border-primary/20 transition-all">
                            {tag.toUpperCase()}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                    <a href={project.liveLink || project.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <button className="w-full group/btn relative px-6 py-3 bg-white text-black rounded-xl font-black tracking-widest text-[10px] hover:bg-primary-glow hover:text-white transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                            <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
                                {project.category === "Design Piece" ? (
                                    <>Order Design <Sparkles size={14} /></>
                                ) : (
                                    <>View Module <ExternalLink size={14} /></>
                                )}
                            </span>
                        </button>
                    </a>
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;

