import { GoogleGenerativeAI } from "@google/generative-ai";

// User's API Key
const API_KEY = "AIzaSyAcaSgNCeve4kl7UUN0NoWj_Ypqs4P1l1Y";

async function listModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("Fetching available models...");

    try {
        // There isn't a direct listModels method exposed easily in the high-level SDK helper sometimes,
        // but we can try a simple generation with a known 'safe' model to see if auth works,
        // OR just try to access the model list if the SDK supports it.
        // Actually, for the JS SDK, listing models usually requires the admin API or REST.
        // Let's try to 'guess' by trying a few known ones and printing which one works.

        const candidateModels = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-pro",
            "gemini-1.5-pro-latest",
            "gemini-1.0-pro",
            "gemini-pro"
        ];

        for (const modelName of candidateModels) {
            console.log(`Testing model: ${modelName}...`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello, are you there?");
                const response = await result.response;
                console.log(`✅ SUCCESS: ${modelName} is working!`);
                console.log(`Response: ${response.text()}`);
                return; // Found a working one
            } catch (error) {
                console.log(`❌ FAILED: ${modelName} - ${error.message.split('[')[1] || error.message}`);
            }
        }

        console.log("All common models failed.");

    } catch (error) {
        console.error("Fatal Error:", error);
    }
}

listModels();
