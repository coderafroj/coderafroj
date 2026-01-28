import { fundamentals } from './fundamentals';
import { cProgramming } from './c-programming';
import { python } from './python';
import { hardware } from './hardware';
import { office } from './office';
import { internet } from './internet';

// Combine all notes into a single array for backward compatibility and search
export const allNotes = [
    ...fundamentals,
    ...cProgramming,
    ...python,
    ...hardware,
    ...office,
    ...internet
];

// Export categories separately for the new UI
export const noteCategories = {
    fundamentals: {
        title: 'Computer Fundamentals',
        description: 'Basics of Computer Science',
        notes: fundamentals
    },
    cProgramming: {
        title: 'C Programming',
        description: 'Master the mother of all languages',
        notes: cProgramming
    },
    python: {
        title: 'Python Masterclass',
        description: 'Zero to Hero in Python',
        notes: python
    },
    hardware: {
        title: 'Hardware & Maintenance',
        description: 'PC Assembly & Troubleshooting',
        notes: hardware
    },
    office: {
        title: 'Office Automation',
        description: 'MS Word, Excel & PowerPoint',
        notes: office
    },
    internet: {
        title: 'Internet & Web Tech',
        description: 'Web Development & Security',
        notes: internet
    }
};

export const courses = [
    { id: 'computer-fundamentals', ...noteCategories.fundamentals },
    { id: 'c-programming', ...noteCategories.cProgramming },
    { id: 'python-masterclass', ...noteCategories.python },
    { id: 'office-automation', ...noteCategories.office },
    { id: 'pc-maintenance-troubleshooting', ...noteCategories.hardware },
    { id: 'internet-web-technology', ...noteCategories.internet }
];

// Helper Functions
export const getCourseById = (id) => {
    return courses.find(c => c.id === id);
};

export const getTopicBySlug = (courseId, slug) => {
    const course = getCourseById(courseId);
    if (!course) return null;
    return course.notes.find(note => note.slug === slug || note.id === slug);
};

export default allNotes;
