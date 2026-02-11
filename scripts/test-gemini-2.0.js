import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAcaSgNCeve4kl7UUN0NoWj_Ypqs4P1l1Y";

async function testModel() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const modelName = "gemini-2.0-flash";

    console.log(`Testing model: ${modelName}...`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, confirm you are working.");
        const response = await result.response;
        console.log(`✅ SUCCESS: ${modelName} is working!`);
        console.log(`Response: ${response.text()}`);
    } catch (error) {
        console.log(`❌ FAILED: ${modelName}`);
        console.error(error);
    }
}

testModel();
