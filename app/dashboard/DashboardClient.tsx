"use client";

import { useChat } from '@ai-sdk/react';
import { useState, SubmitEvent } from "react";
import type { UIMessage } from "ai";

const initialMessages: UIMessage[] = [
    {
        id: "welcome",
        role: "assistant",
        parts: [
            { type: "text", text: "Let me check that." },
            { type: "text", text: "hehe" },
            { type: "text", text: "Here is what I found..." }
        ],
    },
];



export const DashboardClient = ( ) => {
    const [input, setInput] = useState("");

    const { messages, status, sendMessage, error } = useChat({
        messages: initialMessages,
    });

    const isLoading = status === 'submitted' || status === 'streaming';

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage({ text: input });
        setInput("");
      };
    

    return (
    
        <>
                <p className="text-3xl font-bold text-center"> Text chat </p>

                 <div className="flex flex-col h-150 max-w-2xl w-full mx-auto p-4 bg-white text-slate-900 border rounded-xl shadow-sm">
        
   
          <div className="border-b pb-4 mb-4">
            <h1 className="text-xl font-semibold">WellAi Chat</h1>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`p-3 rounded-lg max-w-[80%] ${
                  m.role === 'user' 
                    ? 'bg-slate-100 ml-auto border border-slate-200' 
                    : 'bg-white border border-slate-200 shadow-sm'
                }`}
              >
                <span className="font-semibold block mb-1 text-sm text-slate-500">
                  {m.role === 'user' ? 'You' : 'AI'}
                </span>
   
                <div className="whitespace-pre-wrap">
                  {m.parts?.map((part, i) => (
                    part.type === 'text' ? <p key={i}>{part.text}</p> : null
                  ))}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="text-slate-400 text-sm animate-pulse">WellAi is typing...</div>
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
              disabled={isLoading || !input}
              className="bg-slate-900 text-white px-6 py-3 rounded-md font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </form>

{error && (
    <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
      Slow down! You hit the free tier rate limit. Please wait a minute before sending another message.
    </div>
  )}

        </div>

        </>
        
  )
}
