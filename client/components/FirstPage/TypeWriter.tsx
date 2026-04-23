"use client";
import { RootState } from "@/state/store";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const TOPIC_PROMPTS: Record<string, string> = {
  heal: "What does healing look like for you right now?",
  undersantd: "What part of your pain feels the hardest to make sense of?",
  signals: "What is your body trying to tell you?",
};

export default function TypeWriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const topic = useSelector((state: RootState) => state.UserInputReducer.Selected);

  const finalString = useMemo(() => {
    return topic ? TOPIC_PROMPTS[topic] ?? text : text;
  }, [text, topic]);

  useEffect(() => {
    if (!finalString) return;

    let i = 1;
    setDisplayed(finalString.slice(0, 1));

    const interval = setInterval(() => {
      if (i >= finalString.length) {
        clearInterval(interval);
        return;
      }
      i++;
      setDisplayed(finalString.slice(0, i));
    }, 45);

    return () => clearInterval(interval);
  }, [finalString]);

  return <span>{displayed}</span>;
}