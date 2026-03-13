
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopicViewer from './TopicViewer';
import { FirestoreService } from '../../services/FirestoreService';

const TopicPage = () => {
    const { courseId, topicSlug } = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = React.useState(null);
    const [course, setCourse] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const loadTopic = async () => {
            if (!courseId || !topicSlug) return;
            try {
                setLoading(true);
                const cloudNotes = await FirestoreService.getNotes(courseId);
                const cloudTopic = cloudNotes.find(n => n.slug === topicSlug || n.id === topicSlug);
                const cloudCourses = await FirestoreService.getCourses();
                const cloudCourse = cloudCourses.find(c => c.id === courseId);

                if (cloudTopic) {
                    setTopic(cloudTopic);
                }
                if (cloudCourse) {
                    setCourse({ ...cloudCourse, notes: cloudNotes });
                }
            } finally {
                setLoading(false);
            }
        };
        loadTopic();
    }, [courseId, topicSlug]);

    // Calculate Next/Prev
    const currentIndex = course?.notes?.findIndex(n => n.id === topic?.id || n.slug === topic?.slug) ?? -1;
    const prevTopic = currentIndex > 0 ? course.notes[currentIndex - 1] : null;
    const nextTopic = (currentIndex >= 0 && currentIndex < course.notes.length - 1) ? course.notes[currentIndex + 1] : null;

    if (!topic) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <h2 className="text-2xl font-bold text-gray-400 mb-2">Topic Not Found</h2>
                <p className="text-gray-500">The requested topic could not be found.</p>
                <button
                    onClick={() => navigate(`/learn/${courseId}`)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Back to Course
                </button>
            </div>
        );
    }

    return (
        <TopicViewer
            topic={topic}
            prevTopic={prevTopic}
            nextTopic={nextTopic}
            courseId={courseId}
            course={course}
        />
    );
};

export default TopicPage;
