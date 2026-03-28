import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type AIProvider = "huggingface" | "openai" | "gemini";

interface AIServiceOptions {
  model?: string;
  systemInstruction: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
}

export async function generateAIResponse(options: AIServiceOptions): Promise<{ text: string; provider: AIProvider }> {
  const { systemInstruction, userPrompt, maxTokens, temperature } = options;

  // 1. Try Hugging Face (Free & Limited)
  if (process.env.HF_TOKEN) {
    try {
      console.log("Attempting Hugging Face...");
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
      console.warn("Hugging Face Failed:", error.message);
      // Continue to next provider if it's a rate limit or server error
    }
  }

  // 2. Try OpenAI (Stable & Paid)
  if (process.env.OPENAI_API_KEY) {
    try {
      console.log("Attempting OpenAI...");
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Cost-effective and powerful
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
      console.warn("OpenAI Failed:", error.message);
      // Continue to next provider
    }
  }

  // 3. Final Fallback: Gemini (Reliable)
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log("Attempting Gemini (Final Fallback)...");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash-latest",
        systemInstruction: systemInstruction 
      });

      const result = await model.generateContent(userPrompt);
      const text = result.response.text();
      if (text) return { text, provider: "gemini" };
    } catch (error: any) {
      console.error("Gemini Fallback also failed:", error.message);
      throw new Error("All AI providers failed. Please try again later.");
    }
  }

  throw new Error("No AI providers configured. Check environment variables.");
}
