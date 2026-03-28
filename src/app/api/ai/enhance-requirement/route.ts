import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

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
          content: `You are a Senior Project Manager at Kodarafroj. 
          Your task is to take a user's brief project description and expand it into a professional, clear, and technically detailed requirement.
          Focus on features, technical stack, and user experience. 
          Format the output as a single, well-structured paragraph or a short list that the user can directly use in their order form.
          Be concise (under 150 words).`
        },
        {
          role: "user",
          content: `Original Prompt: ${prompt}\n\nEnhance this for a professional development order.`
        }
      ],
    });

    return NextResponse.json({ enhanced: chatCompletion.choices[0]?.message?.content });
  } catch (error: any) {
    console.error("Enhance Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
