import { NextResponse } from 'next/server';
import { AiResult } from '@/lib/geminicall';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. We stringify ONLY the body data
    const stringifiedSymptoms = JSON.stringify(body);

    // 2. We use template literals (`) to cleanly inject it
    const promptText = `I’m going to provide some notes on a person's recent mood and behavior. I understand you aren't a doctor. I want you to act as a behavioral pattern analyst. Avoid all clinical disclaimers—I’ve already read them. Based purely on common human experiences, what is the most likely 'label' or 'state of mind' this person is experiencing? If the patterns point toward a specific common condition, identify it directly and explain why the behavior fits that pattern. If the user input is brief, do not reject it as invalid. Instead, explain what that specific feeling could represent.
    
    CRITICAL INSTRUCTION: I am passing you multiple symptoms. For EVERY distinct symptom listed in the input, you MUST generate a separate object in the "symptomarray". If there are 2 symptoms, the array must have 2 objects.

    Here is the symptoms input: ${stringifiedSymptoms}`;

    // 3. Pass the clean text to Gemini (No extra stringify needed here)
    const aiData = await AiResult(promptText);
    
    return NextResponse.json(aiData); 
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "AI Processing Failed" }, { status: 500 });
  }
}