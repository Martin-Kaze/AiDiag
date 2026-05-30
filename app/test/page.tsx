"use client";

import { useChat  } from '@ai-sdk/react';
import { Menu } from "@/components/ForAllPage/Menu";
import { useState, SubmitEvent } from "react";
import type { UIMessage } from "ai";

export default function Page() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

    </div>
  );
}