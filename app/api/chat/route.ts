import { deepseek } from '@ai-sdk/deepseek'
import { streamText, convertToModelMessages } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

const getMessageText = (m: any): string =>
  m.parts
    ?.filter((p: any) => p.type === 'text')
    ?.map((p: any) => p.text)
    ?.join('') ?? m.content ?? ''

const lastMessage = messages.at(-1)
if (getMessageText(lastMessage).length > 4000) {
  return new Response('Message too long', { status: 400 })
}

const totalChars = messages.reduce((acc: number, m: any) => {
  return acc + getMessageText(m).length
}, 0)

if (totalChars > 8000) {
  return new Response('Conversation too long', { status: 400 })
}
  const result = await streamText({
     model: deepseek('deepseek-v4-flash'),
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