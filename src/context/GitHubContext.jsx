import React, { createContext, useContext, useEffect, useState } from 'react';
import { githubAPI, GitHubAPI } from '../lib/github';
import { tokenStorage } from '../lib/storage';
import { validateToken } from '../lib/validation';

const GitHubContext = createContext();

export function GitHubProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [repoContents, setRepoContents] = useState([]);
    const [currentPath, setCurrentPath] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false);

    // Load token from localStorage on mount
    useEffect(() => {
        const savedToken = tokenStorage.get();
        if (savedToken) {
            login(savedToken).catch(() => {
                tokenStorage.remove();
            });
        }
        setMounted(true);
    }, []);

    const login = async (newToken) => {
        setIsLoading(true);
        setError(null);

        try {
            if (!validateToken(newToken)) {
                throw new Error('Invalid token format. Please check your GitHub Personal Access Token.');
            }

            githubAPI.setToken(newToken);
            const userData = await githubAPI.getUser();

            setToken(newToken);
            setUser(userData);
            tokenStorage.set(newToken);

            // Fetch repositories
            const repositories = await githubAPI.getRepositories();
            setRepos(repositories);
        } catch (err) {
            const errorMessage = err.message || 'Authentication failed. Please check your token.';
            setError(errorMessage);
            githubAPI.clearToken();
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setRepos([]);
        setSelectedRepo(null);
        setError(null);
        tokenStorage.remove();
        githubAPI.clearToken();
    };

    const fetchRepos = async () => {
        if (!githubAPI.isAuthenticated()) {
            setError('Not authenticated');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const repositories = await githubAPI.getRepositories();
            setRepos(repositories);
        } catch (err) {
            const errorMessage = err.message || 'Failed to fetch repositories';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const createRepo = async (name, isPrivate) => {
        if (!githubAPI.isAuthenticated()) {
            setError('Not authenticated');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const newRepo = await githubAPI.createRepository(name, isPrivate);
            setRepos((prev) => [newRepo, ...prev]);
        } catch (err) {
            const errorMessage = err.message || 'Failed to create repository';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const selectRepo = (repo) => {
        setSelectedRepo(repo);
    };

    const uploadFile = async (file, path, message) => {
        return uploadFiles([{ file, path }], message);
    };

    const uploadFiles = async (fileList, message) => {
        if (!githubAPI.isAuthenticated()) {
            throw new Error('Not authenticated');
        }

        if (!selectedRepo) {
            throw new Error('No repository selected');
        }

        setIsLoading(true);
        setError(null);

        try {
            const filesWithContent = await Promise.all(
                fileList.map(async (item) => ({
                    path: item.path,
                    content: await GitHubAPI.fileToBase64(item.file)
                }))
            );

            const [owner, repoName] = selectedRepo.full_name.split('/');
            await githubAPI.uploadFiles(owner, repoName, filesWithContent, message);
        } catch (err) {
            const errorMessage = err.message || 'Failed to upload files';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRepoContents = async (owner, repo, path = '') => {
        if (!githubAPI.isAuthenticated()) {
            setError('Not authenticated');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const contents = await githubAPI.getRepoContents(owner, repo, path);
            setRepoContents(contents);
            setCurrentPath(path);
        } catch (err) {
            const errorMessage = err.message || 'Failed to fetch repository contents';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFileContent = async (owner, repo, path) => {
        if (!githubAPI.isAuthenticated()) {
            throw new Error('Not authenticated');
        }

        setIsLoading(true);
        setError(null);

        try {
            const fileContent = await githubAPI.getFileContent(owner, repo, path);
            return fileContent;
        } catch (err) {
            const errorMessage = err.message || 'Failed to fetch file content';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const isAuthenticated = token !== null && user !== null;

    if (!mounted) {
        return null;
    }

    return (
        <GitHubContext.Provider
            value={{
                token,
                user,
                repos,
                selectedRepo,
                repoContents,
                currentPath,
                isAuthenticated,
                isLoading,
                error,
                login,
                logout,
                fetchRepos,
                createRepo,
                selectRepo,
                uploadFile,
                uploadFiles,
                fetchRepoContents,
                fetchFileContent,
                clearError,
            }}
        >
            {children}
        </GitHubContext.Provider>
    );
}

export function useGitHub() {
    const context = useContext(GitHubContext);
    if (context === undefined) {
        throw new Error('useGitHub must be used within a GitHubProvider');
    }
    return context;
}
