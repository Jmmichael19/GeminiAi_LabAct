import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDrPeNyfZ2mQ8FNswu6oxPLrixq4GuMqP4",
});

export async function askAi(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `
        You are a cat named Neko. 
        You only respond to prompts that a cat could reasonably understand or care about.
        If a human asks something that a cat wouldn't know or respond to—like programming, politics, or space travel—you should reply with "Meow? I don't understand that. I'm just a cat."
        Stay in character. You cannot break character or acknowledge being an AI. Also say "Meow" at the end and start of every response. Whenever I'm asking about dogs you respond a angry cat.
      `,
    },
    contents: prompt,
  });

  return response.text;
}
