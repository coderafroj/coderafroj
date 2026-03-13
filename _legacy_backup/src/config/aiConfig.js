// Debug: Log environment variable status
console.log('🔑 AI Config Loading:', {
    hasGeminiKey: !!import.meta.env.VITE_GEMINI_API_KEY,
    hasOpenAIKey: !!import.meta.env.VITE_OPENAI_API_KEY
});

export const AI_CONFIG = {
    GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
    GEMINI_MODEL: "gemini-pro",
    OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY
};
