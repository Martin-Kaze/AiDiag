"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect } from "react";
import { lastAssistantMessageIsCompleteWithToolCalls, type UIMessage } from 'ai';
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { DefaultChatTransport } from "ai";
import { DrawerNonModal } from "./DrawerNonModal";
import { Simplify_Channel } from "@/lib/simplify-channels";


function renderText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}



export const DashboardClient = () => {

  const [youtubeData, setYoutubeData] = useState<any>(null);
const [youtubeLoading, setYoutubeLoading] = useState(true);

  const [input, setInput] = useState("");
  const [session, setSession] = useState<typeof authClient.$Infer.Session | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setSession(data);
      setIsPending(false);
    });
  }, []);

  useEffect(() => {
  fetch("/api/youtube/subscriptions")
    .then((res) => res.json())
    .then((data) => setYoutubeData(data))
    
    .catch((error) =>{ console.error("YouTube fetch failed:", error);
      toast.error("Couldn't load YouTube data");
     })
    .finally(() =>{ setYoutubeLoading(false) ; console.log(youtubeData)});
    
}, []);
 
const { messages, setMessages, status, sendMessage, error, addToolOutput } = useChat({
  messages: [{
    id: "welcome",
    role: "assistant",
    parts: [{ type: "text", text: "Hello!" }],
  }] as UIMessage[],

  transport: new DefaultChatTransport({
    api: "/api/chat",
  }),

  onError: (error: any) => {
    toast.error(error.message);
  },

  async onToolCall({ toolCall }) {
  if (toolCall.dynamic) return;

  if (toolCall.toolName === 'getSubList') {
    if (youtubeLoading) {
      // don't execute the real logic — but still must resolve the tool call
      addToolOutput({
        toolCallId: toolCall.toolCallId,
        tool: toolCall.toolName,
        output: { success: false, error: 'Subscriptions are still loading.' },
      });
      return;
    }

    addToolOutput({
      toolCallId: toolCall.toolCallId,
      tool: toolCall.toolName,
      output: { success: true, subscriptions: Simplify_Channel(youtubeData) },
    });
  }
},

  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
});



useEffect(() => {
  if (!isPending && session) {
    setMessages([{
      id: "welcome",
      role: "assistant",
      parts: [{ type: "text", text: `Hello **${session.user.name}**, how can i help you?` }],
    }]);
  }
}, [isPending, session, setMessages]);


  const isLoading = status === "submitted" || status === "streaming";
  
const onSubmit = (e: any) => {
    e.preventDefault();

    if (!input.trim()) return;

    sendMessage(
      { text: input },
       /*{
        body: {
      hiddenContext: nothing, can acess it in api /chat const { messages , hiddenContext} = await req.json();
    },
    }*/
    );
    setInput("");
  };

  return (
    <>
      <div className="col-span-2 flex flex-col h-150  w-full md:max-w-[80%] p-4 bg-white text-slate-900 border rounded-xl shadow-sm">
        <div className="border-b pb-4 mb-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Talk for help</h1>

          
        <DrawerNonModal name={ (session)?  "Settings" : "Login"} login={ (session) ? true : false} data={youtubeData}/>
          
          
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-3 rounded-lg max-w-fit ${
                m.role === "user"
                  ? "bg-slate-100 ml-auto border border-slate-200"
                  : "bg-white border border-slate-200 shadow-sm"
              }`}
            >
              <span className="font-semibold block mb-1 text-sm text-slate-500">
                {m.role === "user" ? "You" : "AI"}
              </span>

              <div className="whitespace-pre-wrap">
  {m.parts?.map((part, i) =>
    part.type === "text" ? (
      <p key={i}>{renderText(part.text)}</p>
    ) : null
  )}
</div>
            </div>
          ))}

          {isLoading && (
            <div className="text-slate-400 text-sm animate-pulse">
              WellAi is typing...
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex gap-2 pt-2 border-t">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 border border-slate-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-slate-900 text-white px-6 py-3 rounded-md font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </form>

        {error && (
          <div className="p-3 mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            Slow down! You hit the free tier rate limit. Please wait a minute
            before sending another message.
          </div>
        )}
      </div>
    </>
  );
};