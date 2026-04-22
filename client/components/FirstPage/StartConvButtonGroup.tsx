"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { StartConvButton } from "./StartConvButton";
import { cn } from "@/lib/utils"
import TypeWriter from "./TypeWriter";
import { Bot } from "lucide-react";
export default function StartConvButtonGroup(){ 
  const topic = useSelector((state: any) => state.ShowTextRedue.topic);
  const show = useSelector((state: any) => state.ShowTextRedue.show);

  return (
    <>
     {!show && (


<>

             <h1 className=" text-xl sm:text-3xl font-bold flex justify-center gap-3">
          <Bot className="animate-float  " size={40} strokeWidth={1} absoluteStrokeWidth />
          <TypeWriter text={`What option resonates with you the most in this moment?`} />
        </h1>

        <div
          className="flex flex-wrap flex-col gap-4 h-auto items-center"
        >


          <StartConvButton topic="I need to be healed">"I'm ready to heal, and be better"</StartConvButton>
          <StartConvButton topic="I need to understand my pain">"I want to understand my pain"</StartConvButton>
          <StartConvButton topic="I need to know my body signals">"My body is sending signals" </StartConvButton>

          <p className="text-neutral-400"> Choose what you want</p>

        
        </div>
           </>
      )}
    </>
  

  )
}