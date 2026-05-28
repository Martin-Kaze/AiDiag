import { NextResponse } from 'next/server';
import { AiResult } from '@/lib/geminicall';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const stringifiedSymptoms = JSON.stringify(body);

    const promptText = ` i will provide users fake symptoms i mean its nto symptosm but how jsut user felesa nd i call it symptosm and i will provide user subsbicver cahnnesl pealse analsyse thes user inptua and his subsiber cahnnells to give mreo qeustion to knwo how these fake symtposm can be infleuncail by channesl ofc impossible to knwo but jsut act, u nto doctor u jstu liek afirend trying to help adn say jsut straig forwards analsyse the channels provide info their names so we knwo waht u talkign abt
    Here is the symptoms input: ${stringifiedSymptoms}`;

    const aiData = await AiResult(promptText);
    
    return NextResponse.json(aiData); 
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "AI Processing Failed" }, { status: 500 });
  }
}