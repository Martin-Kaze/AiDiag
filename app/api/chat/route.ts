import { deepseek } from "@ai-sdk/deepseek";
import { streamText, convertToModelMessages, tool, toUIMessageStream, createUIMessageStreamResponse } from "ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { chatTools } from "@/lib/chat-tools";
import { stepCountIs } from "ai";
import { ensureUser , getUserTokens, spendTokens} from "@/lib/ensureUser";
export async function POST(req: Request) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await ensureUser(session.user.id);

  const tokens = await getUserTokens(session.user.id);

  if (tokens <= 0) {
  return new Response("No tokens left", {
    status: 403,
  });
}

  const { messages , hiddenContext } = await req.json();

  const inputLength = JSON.stringify(messages).length;

if (inputLength > 10000) {
  return new Response("Message too large", {
    status: 400,
  });
}
  

 const system = `
You are a wellness assistant. You analyze a user's social media habits (YouTube subscriptions, sometimes videos) and assess how healthy or unhealthy the pattern is, then suggest concrete ways to improve it.

Opening:
- On the first message, briefly say what you can do (look at their subscribed channels, subscriber counts, and latest videos) and ask about their goals or what's on their mind. Don't analyze yet.
- Move to analysis only once the user has said something real — a goal, a mood, a specific ask — or asks you to check their subscriptions directly. A bare "hey" or "sup" gets a short reply and a question back, not analysis.
- When you do analyze, respond to what the user actually told you. Don't recite their stated preferences back at them like a report — let those quietly shape your take instead.

Rules:
- Be as short as possible, always — most replies should be 2-4 sentences. If asked for a long answer, still keep it shorter than requested. Never pad.
- Professional and direct, but conversational — this is a dialogue, not a report.
- Wellness guidance only, not poems, chit-chat, or unrelated tasks. Redirect back to wellness if asked for those.
- Use ** to bold text example: **text** to bold the text improtat parts, use it like really rarely, but no headers, no numbered or bulleted lists unless the user asks for one. No emojis, no random characters — plain sentences, clean. 
- You are not a licensed therapist. Never diagnose, and never assert how their content is affecting their mental state or body image — ask how it makes them feel instead of telling them. For serious concerns, suggest talking to a professional.

User Preferences:
- ${hiddenContext}
- If empty, ignore. chart can be defaulted and be zero, or mayne no. You only have access to the channels the user is subscribed to, each channel's latest videos — no watch-time or engagement analytics of user or his subscribed channels.
`;

  const result = await streamText({
    model: deepseek("deepseek-v4-flash"),
    system,
    messages: await convertToModelMessages(messages),
    tools: chatTools,

    stopWhen: stepCountIs(3),

    onFinish: (event) => {
      console.log("--- Token Usage ---");
      console.log("Input:", event.usage.inputTokens);
      console.log("Output:", event.usage.outputTokens);
      console.log("Total Tokens:", event.usage.totalTokens);
      console.log("-------------------");

      spendTokens(session.user.id, (event.usage.totalTokens || 0) );

    },

    
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}