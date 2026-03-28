import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai-service";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = `You are a Senior Project Manager at Kodarafroj. 
Your task is to take a user's brief project description and expand it into a professional, clear, and technically detailed requirement.
Focus on features, technical stack, and user experience. 
Format the output as a single, well-structured paragraph or a short list that the user can directly use in their order form.
Be concise (under 150 words).`;

    const finalPrompt = `Original Prompt: ${prompt}\n\nEnhance this for a professional development order.`;

    const { text } = await generateAIResponse({
      systemInstruction: systemPrompt,
      userPrompt: finalPrompt,
    });

    return NextResponse.json({ enhanced: text });

  } catch (error: any) {
    console.error("Enhance Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
