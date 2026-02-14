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
        if (!courseId) throw new Error("Course ID is required to fetch notes.");
        const notesRef = collection(db, COURSES_COLLECTION, courseId, NOTES_COLLECTION);
        const q = query(notesRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async saveNote(courseId, noteData) {
        if (!courseId || !noteData?.id) {
            const errorMsg = `Invalid Mission Path. Course ID (${courseId}) and Mission ID (${noteData?.id}) are required.`;
            console.error("Missing path segments:", { courseId, noteId: noteData?.id });
            throw new Error(errorMsg);
        }
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
        if (!courseId || !noteId) {
            const errorMsg = `Invalid Deactivation Path. Course ID (${courseId}) and Mission ID (${noteId}) are required.`;
            console.error("Missing path segments for deletion:", { courseId, noteId });
            throw new Error(errorMsg);
        }
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
