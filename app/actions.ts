"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateRoast(situation: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { error: "API key not configured" };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Using 1.5-flash as it has better availability on free tier
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Give a light, playful, non-offensive roast of this situation. Include little insults and a brutal roast that makes people laugh and also give a suggestion to him. Add emojis in your reply to make it more fun. Use simple words.
  Keep it short and reply in 2 - 3 sentences only.
  Avoid hate speech, or anything genuinely hurtful. 
  Focus on the humor of the situation.
  
  Situation: ${situation}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return { roast: text };
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    
    const errorMessage = error?.message || "";
    
    if (errorMessage.includes("429") || errorMessage.includes("quota")) {
      return { error: "I've roasted too many people today and my brain is fried. Try again in a minute! 🔥" };
    }
    
    if (errorMessage.includes("API key not valid")) {
      return { error: "Invalid API Key. Please check your .env file." };
    }
    
    if (errorMessage.includes("SAFETY")) {
      return { error: "That situation is too dark even for me! Keep it lighter." };
    }

    return { error: "Gemini is having a moment. Try again shortly!" };
  }
}
