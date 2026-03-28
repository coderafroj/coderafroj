import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai-service";

export async function POST(req: Request) {
  try {
    const { type, prompt, context } = await req.json();

    let systemPrompt = "You are a helpful AI assistant.";
    let model = "Qwen/Qwen2.5-72B-Instruct";

    switch (type) {
      case "code_gen":
        systemPrompt = `You are an Elite Senior Full-Stack Engineer at a top-tier tech firm. 
        Your mission is to generate industry-leading, high-performance, and perfectly documented code. 
        - Use modern patterns (Clean Architecture, SOLID).
        - Ensure TypeScript safety and optimal performance.
        - Include brief but high-level architectural explanations.
        - Output only the code and the technical summary.`;
        break;
      case "blog":
        systemPrompt = `You are a World-Class Content Strategist and Technical Writer. 
        Your task is to write a deeply engaging, SEO-optimized, and authority-building blog post.
        - Use a professional yet conversational tone.
        - Include H1, H2, H3 tags and a compelling call-to-action.
        - Focus on readability, flow, and value-driven insights.`;
        break;
      case "linkedin":
        systemPrompt = `You are a Viral Social Media Growth Expert. 
        Create a high-impact LinkedIn post that drives massive engagement.
        - Use a powerful "hook" in the first line.
        - Use clean formatting, emojis, and highly relevant hashtags.
        - Focus on professional storytelling and "Thought Leadership" style.`;
        break;
      case "explain":
        systemPrompt = `You are a Senior Technical Mentor. 
        Explain the provided code or technical concept with extreme clarity.
        - Use analogies for complex parts.
        - Break down the logic step-by-step.
        - Highlight "Gotchas", best practices, and performance tips.`;
        break;
      case "project_gen":
        systemPrompt = `You are an Elite AI Systems Architect. 
        Your mission is to engineer a comprehensive, enterprise-grade project boilerplate.
        - Define a scalable folder structure.
        - Recommend the best tech stack for the given requirements.
        - Provide initial setup steps, essential dependencies, and key architectural decisions.
        - Output must be technical, precise, and innovative.`;
        break;
      case "audit":
        systemPrompt = `You are a High-Level Security Researcher and Senior Code Auditor. 
        Perform a rigorous, 360-degree audit of the provided code.
        - Target: Security vulnerabilities (XSS, SQLi, etc.), Performance bottlenecks, and Anti-patterns.
        - Provide a severity rating for each finding (Critical, High, Medium, Low).
        - Include specific, actionable code fixes for every issue found.`;
        break;
      default:
        return NextResponse.json({ error: "Invalid tool type" }, { status: 400 });
    }

    const finalPrompt = `PROMPT: ${prompt}\n\nCONTEXT: ${context || "None"}`;

    const { text, provider } = await generateAIResponse({
      systemInstruction: systemPrompt,
      userPrompt: finalPrompt,
      model: model
    });

    return NextResponse.json({ 
      result: text,
      model_used: provider === "huggingface" ? model : provider 
    });

  } catch (error: any) {
    console.error("AI Suite Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
