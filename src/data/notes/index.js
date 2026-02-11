import { computerFundamentals as fundamentalData } from './computer-fundamentals';
const fundamentals = fundamentalData.topics || fundamentalData;
import { cProgramming as cData } from './c-programming';
const cProgramming = cData.topics || cData;
import { pythonMasterclass as pythonData } from './python-masterclass';
const python = pythonData.topics || pythonData;
import { hardware as hardwareData } from './hardware';
const hardware = hardwareData.topics || hardwareData;
import { office as officeData } from './office';
const office = officeData.topics || officeData;
import { iot as iotData } from './iot';
const iot = iotData.topics || iotData;
import { javascript as jsData } from './javascript';
const javascript = jsData.topics || jsData;
import { html as htmlData } from './html';
const html = htmlData.topics || htmlData;
import { css as cssData } from './css';
const css = cssData.topics || cssData;
import { react as reactData } from './react';
const react = reactData.topics || reactData;
import { java as javaData } from './java';
const java = javaData.topics || javaData;
import { cpp as cppData } from './cpp';
const cpp = cppData.topics || cppData;
import { internet as internetData } from './internet';
const internet = internetData.topics || internetData;

// Combine all notes into a single array for backward compatibility and search
export const allNotes = [
    ...fundamentals,
    ...cProgramming,
    ...python,
    ...hardware,
    ...office,
    ...internet,
    ...iot,
    ...javascript,
    ...html,
    ...css,
    ...react,
    ...java,
    ...cpp
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
    },
    javascript: {
        title: 'JavaScript Deep Dive',
        description: 'Modern ES6+ and Beyond',
        notes: javascript
    },
    html: {
        title: 'HTML5 Mastery',
        description: 'Semantic Web Structure',
        notes: html
    },
    css: {
        title: 'Advanced CSS3',
        description: 'Modern Layouts & Animations',
        notes: css
    },
    react: {
        title: 'React.js Ecosystem',
        description: 'Component-Based UI Development',
        notes: react
    },
    java: {
        title: 'Java Programming',
        description: 'Enterprise Object-Oriented Dev',
        notes: java
    },
    cpp: {
        title: 'C++ Systems Programming',
        description: 'Performance & Low-Level Control',
        notes: cpp
    },
    iot: {
        title: 'Internet of Things',
        description: 'Sensors, Protocols, and Cloud Integration',
        notes: iot
    }
};

export const courses = [
    { id: 'computer-fundamentals', ...noteCategories.fundamentals },
    { id: 'c-programming', ...noteCategories.cProgramming },
    { id: 'python-masterclass', ...noteCategories.python },
    { id: 'office-automation', ...noteCategories.office },
    { id: 'pc-maintenance-troubleshooting', ...noteCategories.hardware },
    { id: 'internet-web-technology', ...noteCategories.internet },
    { id: 'iot-mastery', ...noteCategories.iot },
    { id: 'javascript-deep-dive', ...noteCategories.javascript },
    { id: 'html5-mastery', ...noteCategories.html },
    { id: 'advanced-css3', ...noteCategories.css },
    { id: 'react-js-ecosystem', ...noteCategories.react },
    { id: 'java-programming', ...noteCategories.java },
    { id: 'cpp-systems-programming', ...noteCategories.cpp }
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
