import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type AIProvider = "huggingface" | "openai" | "gemini" | "groq";

interface AIServiceOptions {
  model?: string;
  systemInstruction: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
}

export async function generateAIResponse(options: AIServiceOptions): Promise<{ text: string; provider: AIProvider }> {
  const { systemInstruction, userPrompt, maxTokens, temperature } = options;

  // 1. Try OpenAI (Stable & Paid - User wants this to run first)
  if (process.env.OPENAI_API_KEY) {
    try {
      console.log("Attempting OpenAI...");
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const chatCompletion = await openai.chat.completions.create({
        model: options.model || "gpt-4o-mini", // Very fast and cheap model, user can change to gpt-4o if desired
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt },
        ],
        max_tokens: maxTokens || 1500,
        temperature: temperature || 0.7,
      });

      const text = chatCompletion.choices[0]?.message?.content;
      if (text) return { text, provider: "openai" };
    } catch (error: any) {
      console.error("OpenAI Failure Details:", {
        message: error.message,
        status: error.status,
        name: error.name
      });
    }
  }

  // 2. Try Gemini (Reliable Fallback)
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log("Attempting Gemini...");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      // "gemini-1.5-pro" aligns better with Google Cloud Console Pro accounts and typically has fewer 404s than "flash-latest"
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        systemInstruction: systemInstruction 
      });

      const result = await model.generateContent(userPrompt);
      const text = result.response.text();
      if (text) return { text, provider: "gemini" };
    } catch (error: any) {
      console.error("Gemini Failure Details:", {
        message: error.message,
        name: error.name
      });
      console.warn("Hint: If using a Google Cloud Console key and hitting errors, ensure the 'Generative Language API' is enabled in your Google Cloud Project.");
    }
  }

  // 3. Try Groq (Ultra-Fast)
  const groqKey = process.env.GROQ_API_KEY || process.env.GROQ_api_KEY;
  if (groqKey) {
    try {
      console.log("Attempting Groq...");
      const groq = new OpenAI({
        apiKey: groqKey,
        baseURL: "https://api.groq.com/openai/v1",
      });

      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile", // Very powerful and fast
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt },
        ],
        max_tokens: maxTokens || 2048,
        temperature: temperature || 0.7,
      });

      const text = chatCompletion.choices[0]?.message?.content;
      if (text) return { text, provider: "groq" };
    } catch (error: any) {
      console.error("Groq Failure Details:", {
        message: error.message,
        status: error.status,
        name: error.name,
        stack: error.stack
      });
    }
  }

  // 4. Try Hugging Face (Free & Limited)
  if (process.env.HF_TOKEN) {
    try {
      console.log("Attempting Hugging Face (Final Fallback)...");
      const client = new OpenAI({
        baseURL: "https://router.huggingface.co/v1",
        apiKey: process.env.HF_TOKEN,
      });

      const chatCompletion = await client.chat.completions.create({
        model: options.model || "Qwen/Qwen2.5-72B-Instruct",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt },
        ],
        max_tokens: maxTokens || 1500,
        temperature: temperature || 0.7,
      });

      const text = chatCompletion.choices[0]?.message?.content;
      if (text) return { text, provider: "huggingface" };
    } catch (error: any) {
      console.error("Hugging Face Failure Details:", {
        message: error.message,
        status: error.status,
        name: error.name
      });
    }
  }

  throw new Error("All AI providers failed. Check your API keys and environment variables.");
}
