import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai-service";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const token = process.env.HF_TOKEN;
    const systemInstruction = "You are an elite Coding Teacher. Explain concepts clearly with code examples. Keep your tone encouraging and extremely technical.";

    const { text, provider } = await generateAIResponse({
      systemInstruction: systemInstruction,
      userPrompt: prompt,
      maxTokens: 1500,
      temperature: 0.7
    });

    return NextResponse.json({ result: text });

  } catch (error: any) {
    console.error("Teacher Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
