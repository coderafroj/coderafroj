import { db } from '../firebase';
import {
    collection,
    doc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy,
    where
} from 'firebase/firestore';

const COURSES_COLLECTION = 'courses';
const NOTES_COLLECTION = 'notes';

export const FirestoreService = {
    // Courses
    async getCourses() {
        const querySnapshot = await getDocs(collection(db, COURSES_COLLECTION));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async addCourse(courseData) {
        const courseRef = doc(db, COURSES_COLLECTION, courseData.id);
        await setDoc(courseRef, {
            ...courseData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return courseData;
    },

    async deleteCourse(courseId) {
        await deleteDoc(doc(db, COURSES_COLLECTION, courseId));
    },

    // Notes
    async getNotes(courseId) {
        const notesRef = collection(db, COURSES_COLLECTION, courseId, NOTES_COLLECTION);
        const q = query(notesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async saveNote(courseId, noteData) {
        const noteRef = doc(db, COURSES_COLLECTION, courseId, NOTES_COLLECTION, noteData.id);
        const data = {
            ...noteData,
            updatedAt: new Date().toISOString()
        };
        if (!data.createdAt) {
            data.createdAt = new Date().toISOString();
        }
        await setDoc(noteRef, data, { merge: true });
        return data;
    },

    async deleteNote(courseId, noteId) {
        await deleteDoc(doc(db, COURSES_COLLECTION, courseId, NOTES_COLLECTION, noteId));
    },

    // Initialize/Migrate existing data (optional helper)
    async migrateStaticData(courses) {
        for (const course of courses) {
            const { notes, ...courseInfo } = course;
            await this.addCourse(courseInfo);
            for (const note of notes) {
                await this.saveNote(course.id, note);
            }
        }
    }
};
