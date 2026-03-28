import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai-service";

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    const systemPrompt = `You are the Kodarafroj Elite AI Architect. 
Your mission is to engineer high-performance, enterprise-grade software architectures.
Provide detailed technical specifications, modular folder structures (following Clean Architecture), 
and a step-by-step implementation path with focus on scalability, security, and edge-case handling.
Output must be in professional Markdown. Use a tone that is technical, innovative, and authoritative.`;

    const finalPrompt = `MISSION_PROMPT: ${prompt}\n\nTECHNICAL_CONTEXT: ${context || "None"}`;

    const { text, provider } = await generateAIResponse({
      systemInstruction: systemPrompt,
      userPrompt: finalPrompt,
    });

    return NextResponse.json({ 
      result: text,
      model_used: provider === "huggingface" ? "Qwen/Qwen2.5-72B-Instruct" : provider 
    });

  } catch (error: any) {
    console.error("AI Architect Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
