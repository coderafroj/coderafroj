
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
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                course={course}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-900/50 backdrop-blur-sm relative">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center p-4 border-b border-white/10 bg-gray-900/95 sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 mr-3 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-semibold text-lg text-white truncate">{course.title}</span>
                </div>

                {/* Content Scroll Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 lg:p-12 scroll-smooth">
                    <div className="max-w-5xl mx-auto">
                        {/* If we are at the root of the course, show a welcome message */}
                        {location.pathname === `/learn/${courseId}` ? (
                            <div className="text-center py-20 space-y-6 animate-fade-in-up">
                                <div className="inline-flex p-6 rounded-full bg-blue-500/10 text-blue-400 mb-4 ring-1 ring-blue-500/20">
                                    <BookOpen size={48} />
                                </div>
                                <h1 className="text-4xl font-bold text-white mb-4">Welcome to {course.title}</h1>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                                    {course.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Select a topic from the sidebar to start learning.
                                </p>
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
