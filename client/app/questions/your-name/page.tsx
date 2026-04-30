"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NamePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("userName", trimmed);
    router.push("/questions/processing");
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full"><Menu /></header>

      <main className="relative flex flex-1 flex-col items-center justify-center gap-6 p-8 max-w-sm w-full mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-neutral-800 mb-2">
            What should we call you?
          </h1>
          <p className="text-neutral-500 text-sm">
            We'll use your name to personalize your wellness plan.
          </p>
        </div>

        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          className="w-full text-center text-base"
          autoFocus
        />

        <Button
          onClick={handleContinue}
          disabled={!name.trim()}
          className="w-full"
        >
          Continue
        </Button>
      </main>

      <Footer />
    </div>
  );
}