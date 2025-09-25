import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AIzaSyDrPeNyfZ2mQ8FNswu6oxPLrixq4GuMqP4"});

export async function askAi(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return (response.text);
}
