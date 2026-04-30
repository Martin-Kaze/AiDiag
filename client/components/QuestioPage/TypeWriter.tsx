"use client";
import { useEffect, useState } from "react";

export default function TypeWriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;
    let i = 1;
    setDisplayed(text.slice(0, 1));
    const interval = setInterval(() => {
      if (i >= text.length) return clearInterval(interval);
      setDisplayed(text.slice(0, ++i));
    }, 45);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}