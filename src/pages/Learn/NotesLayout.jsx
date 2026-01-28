
import React, { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Menu, BookOpen } from 'lucide-react';
import Sidebar from './Sidebar';
import { getCourseById } from '../../data/notes';

const NotesLayout = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const course = getCourseById(courseId);

    // Redirect if course not found
    useEffect(() => {
        if (courseId && !course) {
            navigate('/learn');
        }
    }, [courseId, course, navigate]);

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

                {/* Mobile Header */}
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
                    {/* Mini Course Icon/Badge */}
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <BookOpen size={14} className="text-blue-400" />
                    </div>
                </div>

                {/* Content Scroll Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10 scroll-smooth">
                    <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
                        {/* If we are at the root of the course, show a welcome message */}
                        {location.pathname === `/learn/${courseId}` ? (
                            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in-up">
                                <div className="relative group">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                                    <div className="relative h-24 w-24 rounded-3xl bg-[#0a0a16] border border-white/10 flex items-center justify-center shadow-2xl">
                                        <BookOpen size={40} className="text-blue-400" />
                                    </div>
                                </div>

                                <div className="max-w-2xl">
                                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{course.title}</span>
                                    </h1>
                                    <p className="text-lg text-gray-400 leading-relaxed font-light">
                                        {course.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95"
                                >
                                    Start Learning
                                </button>
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
