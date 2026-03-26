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
        model: "anthropic/claude-3.5-sonnet:beta", 
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
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("AI Architect Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
