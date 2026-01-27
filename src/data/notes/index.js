
import { computerFundamentals } from './computer-fundamentals';
import { cProgramming } from './c-programming';
import { iot } from './iot';
import { pythonMasterclass } from './python-masterclass';
import { officeAutomation } from './office-automation';

export const courses = [
    computerFundamentals,
    cProgramming,
    pythonMasterclass,
    iot,
    officeAutomation
];

export const getCourseById = (id) => courses.find(course => course.id === id);

export const getTopicBySlug = (courseId, slug) => {
    const course = getCourseById(courseId);
    if (!course) return null;
    return course.topics.find(topic => topic.slug === slug);
};
