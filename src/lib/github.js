/**
 * GitHub API wrapper using @octokit/rest
 */

import { Octokit } from '@octokit/rest';

export class GitHubAPI {
    constructor(token = null) {
        this.octokit = null;
        this.token = token;
        if (token) {
            this.setToken(token);
        }
    }

    /**
     * Set authentication token
     */
    setToken(token) {
        this.token = token;
        this.octokit = new Octokit({
            auth: token,
            baseUrl: 'https://api.github.com',
        });
    }

    /**
     * Clear authentication
     */
    clearToken() {
        this.token = null;
        this.octokit = null;
    }

    /**
     * Check if authenticated
     */
    isAuthenticated() {
        return this.octokit !== null;
    }

    /**
     * Get authenticated user
     */
    async getUser() {
        if (!this.octokit) {
            throw new Error('Not authenticated');
        }

        try {
            const { data } = await this.octokit.users.getAuthenticated();
            return {
                id: data.id,
                login: data.login,
                name: data.name || data.login,
                avatar_url: data.avatar_url,
                email: data.email,
            };
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch user data');
        }
    }

    /**
     * Get user repositories
     */
    async getRepositories() {
        if (!this.octokit) {
            throw new Error('Not authenticated');
        }

        try {
            const { data } = await this.octokit.repos.listForAuthenticatedUser({
                sort: 'updated',
                per_page: 100,
            });

            return data.map((repo) => ({
                id: repo.id,
                name: repo.name,
                full_name: repo.full_name,
                description: repo.description,
                private: repo.private,
                html_url: repo.html_url,
                created_at: repo.created_at,
                updated_at: repo.updated_at,
                language: repo.language,
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                watchers_count: repo.watchers_count,
                open_issues_count: repo.open_issues_count,
                topics: repo.topics || [],
                size: repo.size,
                default_branch: repo.default_branch || 'main',
            }));
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch repositories');
        }
    }

    /**
     * Create a new repository
     */
    async createRepository(name, isPrivate = false) {
        if (!this.octokit) {
            throw new Error('Not authenticated');
        }

        try {
            const { data } = await this.octokit.repos.createForAuthenticatedUser({
                name,
                private: isPrivate,
                auto_init: true,
            });

            return {
                id: data.id,
                name: data.name,
                full_name: data.full_name,
                description: data.description,
                private: data.private,
                html_url: data.html_url,
                created_at: data.created_at,
                updated_at: data.updated_at,
                language: data.language,
                stargazers_count: data.stargazers_count,
            };
        } catch (error) {
            throw new Error(error.message || 'Failed to create repository');
        }
    }

    /**
     * Upload file to repository
     */
    async uploadFile(owner, repo, path, content, message) {
        if (!this.octokit) {
            throw new Error('Not authenticated');
        }

        try {
            // Check if file exists
            let sha;
            try {
                const { data } = await this.octokit.repos.getContent({
                    owner,
                    repo,
                    path,
                });
                if (data && 'sha' in data) {
                    sha = data.sha;
                }
            } catch (error) {
                // File doesn't exist, which is fine for new uploads
                if (error.status !== 404) {
                    throw error;
                }
            }

            // Create or update file
            await this.octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path,
                message,
                content,
                sha,
            });
        } catch (error) {
            throw new Error(error.message || 'Failed to upload file');
        }
    }

    /**
     * Get repository contents (files/folders)
     */
    async getRepoContents(owner, repo, path = '') {
        if (!this.octokit) {
            throw new Error('Not authenticated');
        }

        try {
            const { data } = await this.octokit.repos.getContent({
                owner,
                repo,
                path,
            });

            // Ensure data is always an array
            const contents = Array.isArray(data) ? data : [data];

            return contents.map((item) => ({
                name: item.name,
                path: item.path,
                type: item.type, // 'file' or 'dir'
                size: item.size,
                sha: item.sha,
                url: item.html_url,
                download_url: item.download_url,
            }));
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch repository contents');
        }
    }

    /**
     * Get file content from repository
     */
    async getFileContent(owner, repo, path) {
        if (!this.octokit) {
            throw new Error('Not authenticated');
        }

        try {
            const { data } = await this.octokit.repos.getContent({
                owner,
                repo,
                path,
            });

            if (data.type !== 'file') {
                throw new Error('Path is not a file');
            }

            // Decode base64 content
            const content = atob(data.content);

            return {
                name: data.name,
                path: data.path,
                size: data.size,
                content: content,
                encoding: data.encoding,
                sha: data.sha,
                download_url: data.download_url,
            };
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch file content');
        }
    }

    /**
     * Get repository README
     */
    async getRepoReadme(owner, repo) {
        if (!this.octokit) {
            throw new Error('Not authenticated');
        }

        try {
            const { data } = await this.octokit.repos.getReadme({
                owner,
                repo,
            });

            return {
                name: data.name,
                path: data.path,
                content: atob(data.content),
                download_url: data.download_url,
            };
        } catch (error) {
            // README not found is not critical
            return null;
        }
    }

    /**
     * Convert File to base64
     */
    static async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result;
                // Remove data URL prefix (e.g., "data:image/png;base64,")
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = (error) => reject(error);
        });
    }
}

// Export singleton instance
export const githubAPI = new GitHubAPI();
