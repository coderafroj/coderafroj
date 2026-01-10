/**
 * Token storage utility
 */

const STORAGE_KEY = 'github_token';

export const tokenStorage = {
    set: (token) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, token);
        }
    },
    get: () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(STORAGE_KEY);
        }
        return null;
    },
    remove: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    },
};
