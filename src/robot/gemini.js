// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";
import { config, model } from "./config";

async function promptAi(contents) {
    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });
    let ans = [];
    for await (const chunk of response) {
        ans.push(chunk.text);
    }

    return ans.join("");
}

export default promptAi;
