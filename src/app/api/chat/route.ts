/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { companyKnowledge } from "@/app/data/instructions";
import { NextResponse } from "next/server";

// Initialize the SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { history, message } = body;

    // Use -latest to prevent 404 errors on newer SDK version
    const model = genAI.getGenerativeModel({
    //   model: "gemini-1.5-flash-latest",
     model: 'gemini-2.5-flash-lite',
      systemInstruction: companyKnowledge, 
    });

    // 1. Format the history array for Gemini
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // 2. Gemini requires history to start with a 'user' message.
    // Strip out the initial AI greeting.
    while (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
      formattedHistory.shift();
    }

    // 3. Gemini STRICTLY requires alternating roles (user, model, user, model).
    // Because we are about to use `chat.sendMessage(message)` (which acts as a 'user'),
    // the history array MUST end with a 'model' role.
    if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === "user") {
        formattedHistory.pop(); // Remove it to prevent the sequence from breaking
    }

    // 4. Start the chat with the clean, perfectly alternating history
    const chat = model.startChat({
      history: formattedHistory,
    });

    // 5. Send the new user message
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
    
  } catch (error: any) {
    // This will print the EXACT Google error in your terminal to help debug
    console.error("Detailed Gemini API Error:", error.message || error);
    
    return NextResponse.json(
      { error: "Failed to process chat request.", details: error.message },
      { status: 500 }
    );
  }
}