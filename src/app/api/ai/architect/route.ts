import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    if (!process.env.HF_TOKEN) {
      return NextResponse.json({ error: "HF Token not configured" }, { status: 500 });
    }

    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: process.env.HF_TOKEN,
    });

    const chatCompletion = await client.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content: `You are the Kodarafroj Elite AI Architect. 
          Your mission is to engineer high-performance, enterprise-grade software architectures.
          Provide detailed technical specifications, modular folder structures (following Clean Architecture), 
          and a step-by-step implementation path with focus on scalability, security, and edge-case handling.
          Output must be in professional Markdown. Use a tone that is technical, innovative, and authoritative.`
        },
        {
          role: "user",
          content: `MISSION_PROMPT: ${prompt}\n\nTECHNICAL_CONTEXT: ${context || "None"}`
        }
      ],
    });

    return NextResponse.json({
       result: chatCompletion.choices[0]?.message?.content,
       model_used: "mistralai/Mistral-7B-Instruct-v0.2"
    });
  } catch (error: any) {
    console.error("AI Architect Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
