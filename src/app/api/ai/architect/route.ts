import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { fallBackToGemini } from "@/lib/gemini-fallback";

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    const systemPrompt = `You are the Kodarafroj Elite AI Architect. 
Your mission is to engineer high-performance, enterprise-grade software architectures.
Provide detailed technical specifications, modular folder structures (following Clean Architecture), 
and a step-by-step implementation path with focus on scalability, security, and edge-case handling.
Output must be in professional Markdown. Use a tone that is technical, innovative, and authoritative.`;

    const finalPrompt = `MISSION_PROMPT: ${prompt}\n\nTECHNICAL_CONTEXT: ${context || "None"}`;

    if (process.env.HF_TOKEN) {
      try {
        const client = new OpenAI({
          baseURL: "https://router.huggingface.co/v1",
          apiKey: process.env.HF_TOKEN,
        });

        const chatCompletion = await client.chat.completions.create({
          model: "Qwen/Qwen2.5-72B-Instruct",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: finalPrompt }
          ],
        });

        const text = chatCompletion.choices[0]?.message?.content;
        if (text) {
          return NextResponse.json({
             result: text,
             model_used: "Qwen/Qwen2.5-72B-Instruct"
          });
        }
      } catch (hfError: any) {
        console.warn("HF Suite Failed for Architect, falling back to Gemini:", hfError.message);
      }
    }

    console.log("Using Gemini Fallback for AI Architect");
    const fallbackText = await fallBackToGemini(systemPrompt, finalPrompt);
    return NextResponse.json({ result: fallbackText, model_used: "gemini-1.5-flash (Fallback)" });

  } catch (error: any) {
    console.error("AI Architect Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
