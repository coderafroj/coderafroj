import { GoogleGenerativeAI } from "@google/generative-ai";

export async function fallBackToGemini(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyBKo1cwjllC7v9mptRdq94hrcZvQbSrxKw";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt 
  });
  
  const result = await model.generateContent(userPrompt);
  return result.response.text();
}
