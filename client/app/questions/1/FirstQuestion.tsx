"use client"
import { useSelector , useDispatch } from "react-redux";
import { StartConvButton } from "./StartConvButton"; 
import { setField } from "@/state/slices/UserInputSlice";
import TypeWriter from "../../../components/QuestioPage/TypeWriter"; 
import { Bot } from "lucide-react";
import { RootState, AppDispatch } from "@/state/store";
import { useEffect } from "react";

export default function FirstQuestion(){ 


  const dispatch : AppDispatch = useDispatch();

 
  return (
    <>
             <h1 className=" text-xl sm:text-3xl font-bold flex justify-center gap-3">
          <Bot className="animate-float  " size={40} strokeWidth={1} absoluteStrokeWidth />
          <TypeWriter text={`Whats your main goal?`} />
        </h1>

        <div
          className="flex flex-wrap flex-col gap-4 h-auto items-center"
        >


          <StartConvButton topic="posture" route="/questions/2">Fix Posture</StartConvButton>
          <StartConvButton topic="pain" route="/questions/2">Ease the pain</StartConvButton>
          <StartConvButton topic="other" route="/questions/2"> Other </StartConvButton>

          <p className="text-neutral-400"> Which feels right to you?</p>

        
        </div>
           </>
    
  
  

  )
}