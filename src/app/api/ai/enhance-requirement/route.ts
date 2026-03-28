import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { fallBackToGemini } from "@/lib/gemini-fallback";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = `You are a Senior Project Manager at Kodarafroj. 
Your task is to take a user's brief project description and expand it into a professional, clear, and technically detailed requirement.
Focus on features, technical stack, and user experience. 
Format the output as a single, well-structured paragraph or a short list that the user can directly use in their order form.
Be concise (under 150 words).`;

    const finalPrompt = `Original Prompt: ${prompt}\n\nEnhance this for a professional development order.`;

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
          return NextResponse.json({ enhanced: text });
        }
      } catch (hfError: any) {
        console.warn("HF Suite Failed for Enhance Requirement, falling back to Gemini:", hfError.message);
      }
    }

    console.log("Using Gemini Fallback for Enhance Requirement");
    const fallbackText = await fallBackToGemini(systemPrompt, finalPrompt);
    return NextResponse.json({ enhanced: fallbackText });

  } catch (error: any) {
    console.error("Enhance Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
