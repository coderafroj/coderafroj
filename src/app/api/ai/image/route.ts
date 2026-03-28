import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

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

    const client = new InferenceClient(token);

    const response = await client.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: { num_inference_steps: 30 },
    });
    
    // Cast to Blob as it actually returns a Blob despite TS typings
    const imageBlob = response as unknown as Blob;

    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": imageBlob.type || "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error: any) {
    console.error("Image Gen Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate image" }, { status: 500 });
  }
}
