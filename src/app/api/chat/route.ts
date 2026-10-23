// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { companyKnowledge } from "@/app/data/instructions";
// import { NextResponse } from "next/server";

// // Initialize the SDK
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { history, message } = body;

//     // Use gemini-flash-lite-latest to avoid the 503 service unavailable overload of gemini-flash-latest and bypass 20 RPD limits
//     const model = genAI.getGenerativeModel({
//       // model: "gemini-3.1-flash-lite",
//       model: "gemini-flash-lite-latest",
//       // model: 'gemini-2.5-flash-lite', not working exceed 
//       systemInstruction: companyKnowledge,
//     });

//     // 1. Format the history array for Gemini
//     const formattedHistory = history.map((msg: any) => ({
//       role: msg.role === "user" ? "user" : "model",
//       parts: [{ text: msg.content }],
//     }));

//     // 2. Gemini requires history to start with a 'user' message.
//     // Strip out the initial AI greeting.
//     while (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
//       formattedHistory.shift();
//     }

//     // 3. Gemini STRICTLY requires alternating roles (user, model, user, model).
//     // Because we are about to use `chat.sendMessage(message)` (which acts as a 'user'),
//     // the history array MUST end with a 'model' role.
//     if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === "user") {
//       formattedHistory.pop(); // Remove it to prevent the sequence from breaking
//     }

//     // 4. Start the chat with the clean, perfectly alternating history
//     const chat = model.startChat({
//       history: formattedHistory,
//     });

//     // 5. Send the new user message
//     const result = await chat.sendMessage(message);
//     const responseText = result.response.text();

//     return NextResponse.json({ reply: responseText });

//   } catch (error: any) {
//     // This will print the EXACT Google error in your terminal to help debug
//     console.error("Detailed Gemini API Error:", error.message || error);

//     return NextResponse.json(
//       { error: "Failed to process chat request.", details: error.message },
//       { status: 500 }
//     );
//   }
// }







/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { companyKnowledge } from "@/app/data/instructions";
import { NextResponse } from "next/server";

// Initialize the SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// ==========================================
// PASTE STEP 1: Helper function to fetch rate
// ==========================================
async function getLiveUsdToLkrRate(): Promise<number> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 }, // Caches rate for 1 hour for fast chat responses
    });
    if (!res.ok) throw new Error("Failed to fetch live rate");
    const data = await res.json();
    return data?.rates?.LKR || 337; 
  } catch (err) {
    console.error("Error fetching live exchange rate, using fallback:", err);
    return 337; // Fallback match
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { history, message } = body;

    // ========================================================
    // PASTE STEP 2: Fetch the live rate & build dynamic prompt
    // ========================================================
    const liveRate = await getLiveUsdToLkrRate();

    const dynamicSystemInstruction = `
      ${companyKnowledge}
      
      [DYNAMIC REAL-TIME UPDATE FOR THIS CONVERSATION]:
      - The current live exchange rate fetched right now is: **1 USD = ${liveRate.toFixed(2)} LKR**. 
      - Always use this exact rate (${liveRate.toFixed(2)} LKR per 1 USD) when calculating ticket prices or answering currency conversion questions for users today.
    `;

    // Use gemini-flash-lite-latest to avoid the 503 service unavailable overload
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: dynamicSystemInstruction, // <-- Pass the dynamic instructions here
    });

    // 1. Format the history array for Gemini
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // 2. Gemini requires history to start with a 'user' message.
    while (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
      formattedHistory.shift();
    }

    // 3. Gemini STRICTLY requires alternating roles (user, model, user, model).
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