import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const token = process.env.HF_TOKEN;
    if (!token) {
      return NextResponse.json({ error: "HF_TOKEN is not configured" }, { status: 500 });
    }

    const res = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `<s>[INST] You are an elite Coding Teacher. Explain concepts clearly with code examples. \n\nUser Question: ${prompt} [/INST]`,
          parameters: { 
            max_new_tokens: 1500,
            temperature: 0.7,
            return_full_text: false 
          },
          options: { wait_for_model: true }
        })
      }
    );

    if (!res.ok) {
       const errText = await res.text();
       throw new Error(`HF Error: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    let text = data[0]?.generated_text || "No response generated.";
    
    // Clean up if the model repeats the prompt
    if (text.includes("[/INST]")) {
      text = text.split("[/INST]")[1].trim();
    }

    return NextResponse.json({ result: text.trim() });
  } catch (error: any) {
    console.error("Teacher Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
