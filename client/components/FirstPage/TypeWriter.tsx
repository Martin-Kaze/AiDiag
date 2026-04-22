"use client";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

export default function TypeWriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  
  // Select only what you need
  const topic = useSelector((state: any) => state.ShowTextRedue?.topic);

  // useMemo prevents a "new" string reference from being created on every render
  const finalString = useMemo(() => {
    return topic && topic !== "not selected" ? `You said "` +  `${topic}` + `", tell me more if you want` : text 
  }, [text, topic]);

  useEffect(() => {
    // If for some reason finalString is empty, don't start
    if (!finalString) return;

    let i = 0;
    setDisplayed(""); // Clean start for the animation

    const interval = setInterval(() => {
      // Use the stable finalString here
      setDisplayed(finalString.slice(0, i));
      i++;
      
      if (i > finalString.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [finalString]); // This array is now stable and size is always 1

  return <span>{displayed}</span>;
}