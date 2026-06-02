"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import type { UIMessage } from "ai";
import { toast } from "sonner";

const QUICK_CHIPS = [
  { label: "💤 Better sleep", text: "How can I improve my sleep?" },
  { label: "🥗 Nutrition", text: "What should I eat today?" },
  { label: "🧘 Stress relief", text: "Help me manage stress" },
  { label: "💪 Workout", text: "Create a workout plan for me" },
];

const initialMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hey! I'm WellAi. Ask me anything about your wellness, sleep, nutrition, or mental health 💚",
      },
    ],
  },
];

export const DashboardClient = () => {
  const [input, setInput] = useState("");

  const { messages, status, sendMessage, error } = useChat({
    messages: initialMessages,
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fillChip = (text: string) => {
    setInput(text);
  };

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-[560px] bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-sm">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-neutral-100">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-300 to-teal-500 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 15l-4.9 3.2 1.9-5.8L4 8.8h6.1z"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-800 leading-none mb-0.5">WellAi</p>
          <p className="text-xs text-teal-500 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Ready to help
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded-md hover:bg-neutral-100"
          title="New chat"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgb(212_212_212)_transparent]">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex gap-2 items-end max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-medium ${
                  isUser
                    ? "bg-purple-50 text-purple-700"
                    : "bg-teal-50 text-teal-600"
                }`}
              >
                {isUser ? "You" : "✦"}
              </div>
              <div>
                <div
                  className={`px-3.5 py-2.5 text-sm leading-relaxed ${
                    isUser
                      ? "bg-teal-600 text-white rounded-2xl rounded-br-sm"
                      : "bg-white border border-neutral-200 text-neutral-800 rounded-2xl rounded-bl-sm shadow-sm"
                  }`}
                >
                  {m.parts?.map((part, i) =>
                    part.type === "text" ? (
                      <p key={i} className={i > 0 ? "mt-1" : ""}>{part.text}</p>
                    ) : null
                  )}
                </div>
                <p className="text-[10px] text-neutral-400 mt-1 px-1">{getTime()}</p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2 items-end max-w-[85%]">
            <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] bg-teal-50 text-teal-600">✦</div>
            <div className="px-3.5 py-3 bg-white border border-neutral-200 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-neutral-300 inline-block animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 px-3 py-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
          Rate limit hit — please wait a moment before sending again.
        </div>
      )}

      {/* Input area */}
      <div className="px-4 pb-4 pt-2 border-t border-neutral-100">
        <div
          className={`flex items-center gap-2 bg-neutral-50 border rounded-xl px-4 py-2 transition-all ${
            input ? "border-teal-400 ring-2 ring-teal-400/10" : "border-neutral-200"
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about your wellness..."
            className="flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none py-1"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-8 h-8 rounded-lg bg-teal-600 hover:bg-teal-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0"
            aria-label="Send message"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Quick chips */}
        <div className="flex gap-2 flex-wrap mt-2">
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip.text}
              onClick={() => fillChip(chip.text)}
              className="text-xs px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-500 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all whitespace-nowrap"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};