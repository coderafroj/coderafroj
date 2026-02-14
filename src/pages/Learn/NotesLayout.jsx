
import React, { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, BookOpen, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import { FirestoreService } from '../../services/FirestoreService';

const NotesLayout = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sync course and its missions from Firestore
    useEffect(() => {
        const syncData = async () => {
            if (!courseId) return;
            try {
                setLoading(true);
                const cloudCourses = await FirestoreService.getCourses();
                const cloudCourse = cloudCourses.find(c => c.id === courseId);

                if (cloudCourse) {
                    const cloudNotes = await FirestoreService.getNotes(courseId);
                    setCourse({ ...cloudCourse, notes: cloudNotes });
                } else {
                    navigate('/learn');
                }
            } catch (err) {
                console.error("Layout Sync Error:", err);
            } finally {
                setLoading(false);
            }
        };
        syncData();
    }, [courseId, navigate]);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    if (!course) return null;

    return (
        <div className="flex h-screen bg-[#030014] text-gray-100 overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Sidebar */}
            <Sidebar
                course={course}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#030014] relative">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                {/* Mobile Header (Hidden when floating button is best) */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#030014]/90 backdrop-blur-xl sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 rounded-xl bg-white/5 text-white shadow-lg active:scale-95 transition-all"
                        >
                            <Menu size={20} />
                        </button>
                        <span className="font-bold text-sm text-white truncate max-w-[200px]">{course.title}</span>
                    </div>
                </div>

                {/* Mobile Floating Explorer Trigger */}
                <AnimatePresence>
                    {!isSidebarOpen && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden fixed bottom-10 right-6 z-40 p-5 rounded-full bg-blue-600 text-white shadow-[0_15px_30px_rgba(37,99,235,0.4)] border border-blue-400/20 active:scale-90 transition-all group"
                        >
                            <LayoutGrid size={24} className="group-hover:rotate-12 transition-transform" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Content Scroll Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10 scroll-smooth pt-16 md:pt-20 lg:pt-24">
                    <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
                        {/* If we are at the root of the course, show a welcome message */}
                        {location.pathname === `/learn/${courseId}` ? (
                            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="w-20 h-20 rounded-[2rem] bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(59,130,246,0.1)]">
                                        <BookOpen size={32} className="text-blue-400" />
                                    </div>
                                    <div className="space-y-3">
                                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">
                                            Mission <span className="text-blue-500">Parameters</span>
                                        </h2>
                                        <p className="text-slate-400 max-w-md mx-auto font-light leading-relaxed">
                                            Protocol loaded: <span className="text-blue-400 font-bold">{course.title}</span>.
                                            Side menu se module select karein ya niche diye gaye button se explore karein.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSidebarOpen(true)}
                                        className="px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                    >
                                        Initialize Exploration
                                    </button>
                                </motion.div>
                            </div>
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NotesLayout;
