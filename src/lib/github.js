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
