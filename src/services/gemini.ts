import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getFantasyAdvice(prompt: string) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are an elite fantasy football analyst. Provide data-driven, actionable advice for start/sit, waivers, and trades. Be concise and confident.",
    }
  });
  
  const response = await model;
  return response.text;
}

export async function getPlayerProjections(playerData: any) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: JSON.stringify(playerData),
    config: {
      systemInstruction: "Analyze player data and provide weekly projections and risk assessment. Return in JSON format.",
      responseMimeType: "application/json",
    }
  });
  
  const response = await model;
  return JSON.parse(response.text || "{}");
}
