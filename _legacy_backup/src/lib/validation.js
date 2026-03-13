/**
 * Token validation utility
 */

export const validateToken = (token) => {
    if (!token) return false;

    // Basic GitHub PAT patterns:
    // - Fine-grained tokens: github_pat_...
    // - Classic tokens: ghp_...
    const githubPatRegex = /^(ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59})$/;

    // Relaxed check for development or different token types
    return token.length >= 40;
};
