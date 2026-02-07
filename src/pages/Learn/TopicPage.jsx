
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopicViewer from './TopicViewer';
import { getTopicBySlug, getCourseById } from '../../data/notes';

const TopicPage = () => {
    const { courseId, topicSlug } = useParams();
    const navigate = useNavigate();

    const course = getCourseById(courseId);
    const topic = getTopicBySlug(courseId, topicSlug);

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
