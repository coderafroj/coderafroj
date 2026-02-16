import React, { useState, useEffect } from 'react';
import { Book, Star, ExternalLink, Loader2, RefreshCw, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DevLibrary() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            // Fetch trending programming books (Architecture, AI, React, System Design)
            const queries = ['system design', 'software architecture', 'artificial intelligence', 'react js'];
            const query = queries[Math.floor(Math.random() * queries.length)];

            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${query}&orderBy=newest&langRestrict=en&maxResults=4&startIndex=${page * 4}`);
            const data = await response.json();

            if (data.items) {
                setBooks(data.items);
            }
        } catch (err) {
            setError('Connection Failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [page]);

    const handleNext = () => setPage(prev => prev + 1);

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <Book size={14} />
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white uppercase tracking-wider">Dev_Library_v1</h3>
                        <p className="text-[8px] font-mono text-slate-500">GOOGLE_BOOKS_API_LINKED</p>
                    </div>
                </div>
                <button
                    onClick={fetchBooks}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                    <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="flex-1 overflow-visible relative min-h-[160px]">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 size={24} className="text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        <AnimatePresence mode="wait">
                            {books.map((book, index) => {
                                const info = book.volumeInfo;
                                const thumbnail = info.imageLinks?.thumbnail?.replace('http:', 'https:') || '';

                                return (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative flex gap-3 p-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 rounded-xl transition-all duration-300"
                                    >
                                        <div className="w-12 h-16 shrink-0 rounded-md overflow-hidden shadow-lg bg-black/50 border border-white/10 relative">
                                            {thumbnail ? (
                                                <img src={thumbnail} alt={info.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-indigo-900/20">
                                                    <Book size={16} className="text-indigo-500/50" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-xs font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                                                    {info.title}
                                                </h4>
                                                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                                    {info.authors?.[0] || 'Unknown Author'}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-1">
                                                    <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                                    <span className="text-[9px] font-mono text-slate-400">{info.averageRating || 'NEW'}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="text-[10px] font-bold text-indigo-400 hover:text-white uppercase tracking-wider flex items-center gap-1">
                                                        PREVIEW
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <a
                                            href={info.previewLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 z-10"
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <button
                onClick={handleNext}
                className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300 hover:text-white transition-all rounded-lg"
            >
                Load Next Batch
            </button>
        </div>
    );
}
