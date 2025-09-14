// app/api/gemini/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" , 
    generationConfig: {
    temperature: 0.9, // higher = more randomness
    topP: 0.95,       // nucleus sampling
    topK: 40,         // limits sampling pool
  },
});


export async function POST(req: Request) {
  try {
    const { prompt, humor } = await req.json();

    if (!prompt || !humor) {
      return NextResponse.json(
        { error: "Prompt and humor are required." },
        { status: 400 }
      );
    }
    const fullPrompt = `Create a ${humor} joke that is witty, original, and easy to understand, based on the topic: ${prompt}. Make sure it has a clear setup and punchline.`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({ output: text });

  } catch (error) {
    console.error("Server-side error:", error);
    return NextResponse.json({ error: "Failed to generate content." }, { status: 500 });
  }
}