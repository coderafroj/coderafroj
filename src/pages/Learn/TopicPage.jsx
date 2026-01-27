
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopicViewer from './TopicViewer';
import { getTopicBySlug } from '../../data/notes';

const TopicPage = () => {
    const { courseId, topicSlug } = useParams();
    const navigate = useNavigate();

    const topic = getTopicBySlug(courseId, topicSlug);

    useEffect(() => {
        if (!topic) {
            // Optional: Redirect or show 404
            // navigate(`/learn/${courseId}`);
        }
    }, [topic, courseId, navigate]);

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

    return <TopicViewer topic={topic} />;
};

export default TopicPage;
