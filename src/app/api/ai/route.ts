import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { fallBackToGemini } from "@/lib/gemini-fallback";

export async function POST(req: Request) {
  try {
    const { type, prompt, context } = await req.json();

    let systemPrompt = "You are a helpful AI assistant.";
    let model = "Qwen/Qwen2.5-72B-Instruct"; // Generic powerful free model

    switch (type) {
      case "code_gen":
        systemPrompt = `You are an Elite Senior Full-Stack Engineer at a top-tier tech firm. 
        Your mission is to generate industry-leading, high-performance, and perfectly documented code. 
        - Use modern patterns (Clean Architecture, SOLID).
        - Ensure TypeScript safety and optimal performance.
        - Include brief but high-level architectural explanations.
        - Output only the code and the technical summary.`;
        model = "Qwen/Qwen2.5-72B-Instruct"; 
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
        model = "Qwen/Qwen2.5-72B-Instruct";
        break;
      case "project_gen":
        systemPrompt = `You are an Elite AI Systems Architect. 
        Your mission is to engineer a comprehensive, enterprise-grade project boilerplate.
        - Define a scalable folder structure.
        - Recommend the best tech stack for the given requirements.
        - Provide initial setup steps, essential dependencies, and key architectural decisions.
        - Output must be technical, precise, and innovative.`;
        model = "Qwen/Qwen2.5-72B-Instruct";
        break;
      case "audit":
        systemPrompt = `You are a High-Level Security Researcher and Senior Code Auditor. 
        Perform a rigorous, 360-degree audit of the provided code.
        - Target: Security vulnerabilities (XSS, SQLi, etc.), Performance bottlenecks, and Anti-patterns.
        - Provide a severity rating for each finding (Critical, High, Medium, Low).
        - Include specific, actionable code fixes for every issue found.`;
        model = "Qwen/Qwen2.5-72B-Instruct";
        break;
      default:
        return NextResponse.json({ error: "Invalid tool type" }, { status: 400 });
    }

    const finalPrompt = `PROMPT: ${prompt}\n\nCONTEXT: ${context || "None"}`;

    if (process.env.HF_TOKEN) {
      try {
        const client = new OpenAI({
          baseURL: "https://router.huggingface.co/v1",
          apiKey: process.env.HF_TOKEN,
        });

        const chatCompletion = await client.chat.completions.create({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: finalPrompt },
          ],
        });

        const text = chatCompletion.choices[0]?.message?.content;
        if (text) {
          return NextResponse.json({ 
             result: text,
             model_used: model 
          });
        }
      } catch (hfError: any) {
        console.warn("HF Suite Failed, falling back to Gemini:", hfError.message);
      }
    }

    console.log("Using Gemini Fallback for AI Suite");
    const fallbackText = await fallBackToGemini(systemPrompt, finalPrompt);
    return NextResponse.json({ result: fallbackText, model_used: "gemini-1.5-flash (Fallback)" });

  } catch (error: any) {
    console.error("AI Suite Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
