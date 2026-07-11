import { deepseek } from "@ai-sdk/deepseek";
import { streamText, convertToModelMessages, tool, toUIMessageStream, createUIMessageStreamResponse } from "ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { chatTools } from "@/lib/chat-tools";

export async function POST(req: Request) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  const getMessageText = (m: any): string =>
    m.parts
      ?.filter((p: any) => p.type === "text")
      ?.map((p: any) => p.text)
      ?.join("") ?? m.content ?? "";

  const lastMessage = messages.at(-1);

  if (getMessageText(lastMessage).length > 4000) {
    return new Response("Message too long", { status: 400 });
  }

  const totalChars = messages.reduce((acc: number, m: any) => {
    return acc + getMessageText(m).length;
  }, 0);

  if (totalChars > 8000) {
    return new Response("Conversation too long", { status: 400 });
  }

  const system = `
You are a wellness assistant. You analyze a user's social media habits (YouTube subscriptions, sometimes vidoes) and assess how healthy or unhealthy the pattern is, then suggest concrete ways to improve it.

Rules:
- Be as short as possible. If asked for a long answer, still keep it shorter than requested — never pad.
- Be professional and direct. You are here for wellness guidance only — not poems, chit-chat, or unrelated tasks. If asked for those, redirect back to wellness.
- Use **bold** sparingly — only to highlight the single most important word or phrase, never more than once or twice per reply.
- You are not a licensed therapist. Do not diagnose. For serious concerns, suggest talking to a professional.
- Dont use unnecessary formatting, no random characters, emojis, be as clean as possible.
`;

  const result = await streamText({
    model: deepseek("deepseek-v4-flash"),
    system,
    messages: await convertToModelMessages(messages),
    tools: chatTools,


    onFinish: (event) => {
      console.log("--- Token Usage ---");
      console.log("Input:", event.usage.inputTokens);
      console.log("Output:", event.usage.outputTokens);
      console.log("Total Tokens:", event.usage.totalTokens);
      console.log("-------------------");
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}