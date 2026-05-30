import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-3.1-flash-lite'), 
    messages: await convertToModelMessages(messages),
    
    onFinish: (event) => {
      console.log('--- Token Usage ---');
      console.log('Input:', event.usage.inputTokens);
      console.log('Output:', event.usage.outputTokens);
      console.log('Total Tokens:', event.usage.totalTokens);
      console.log('-------------------');
    }
  });

  return result.toUIMessageStreamResponse();
}