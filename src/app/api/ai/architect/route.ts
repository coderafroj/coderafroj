import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://kodarafroj.com", // Optional, for OpenRouter tracking
        "X-Title": "Kodarafroj AI Architect",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Cost-effective but powerful
        messages: [
          {
            role: "system",
            content: "You are the Kodarafroj AI Architect. Your task is to provide high-level technical architectures, folder structures, and implementation plans for software projects. Use Markdown. Be concise, professional, and focus on scalability."
          },
          {
            role: "user",
            content: `Project Requirements: ${prompt}\n\nExisting Context: ${context || "None"}`
          }
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("AI Architect Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
