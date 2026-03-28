import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const token = process.env.HF_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "HF_TOKEN is not configured" }, { status: 500 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: token,
    });

    const chatCompletion = await client.chat.completions.create({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [
        { 
          role: "system", 
          content: "You are an elite Coding Teacher. Explain concepts clearly with code examples. Keep your tone encouraging and extremely technical." 
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    const text = chatCompletion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ result: text.trim() });
  } catch (error: any) {
    console.error("Teacher Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
