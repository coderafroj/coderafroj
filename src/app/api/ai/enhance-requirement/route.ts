import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY || "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";
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Title": "Kodarafroj Requirement Enhancer",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Fast for interactive enhancement
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
      }),
    });

    const data = await response.json();
    return NextResponse.json({ enhanced: data.choices?.[0]?.message?.content });
  } catch (error) {
    console.error("Enhance Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
