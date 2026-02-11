const API_KEY = "AIzaSyAcaSgNCeve4kl7UUN0NoWj_Ypqs4P1l1Y";

async function checkModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    console.log(`Fetching from: ${url}`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
            return;
        }

        console.log("Successfully fetched models:");
        if (data.models) {
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`); // e.g. "models/gemini-pro"
                }
            });
        } else {
            console.log("No models returned.");
        }

    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

checkModels();
