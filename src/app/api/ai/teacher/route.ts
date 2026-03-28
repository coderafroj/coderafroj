import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { fallBackToGemini } from "@/lib/gemini-fallback";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const token = process.env.HF_TOKEN;
    const systemInstruction = "You are an elite Coding Teacher. Explain concepts clearly with code examples. Keep your tone encouraging and extremely technical.";

    if (token) {
      try {
        const client = new OpenAI({
          baseURL: "https://router.huggingface.co/v1",
          apiKey: token,
        });

        const chatCompletion = await client.chat.completions.create({
          model: "Qwen/Qwen2.5-72B-Instruct",
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt }
          ],
          max_tokens: 1500,
          temperature: 0.7
        });

        const text = chatCompletion.choices[0]?.message?.content;
        if (text) return NextResponse.json({ result: text.trim() });
      } catch (hfError: any) {
        console.warn("HF Failed, falling back to Gemini:", hfError.message);
      }
    }

    console.log("Using Gemini Fallback for Teacher");
    const fallbackText = await fallBackToGemini(systemInstruction, prompt);
    return NextResponse.json({ result: fallbackText });

  } catch (error: any) {
    console.error("Teacher Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
