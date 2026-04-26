"use client"
import { useSelector , useDispatch } from "react-redux";
import { StartConvButton } from "../FirstPage/StartConvButton"; 
import { SetSelected } from "@/state/slices/UserInputSlice";
import TypeWriter from "../FirstPage/TypeWriter"; 
import { Bot } from "lucide-react";
import { RootState, AppDispatch } from "@/state/store";
import { useEffect } from "react";

export default function FirstQuestion(){ 

  const selected = useSelector((state: RootState) => state.UserInputReducer.Selected);
  const dispatch : AppDispatch = useDispatch();

  useEffect(() => {
  dispatch(SetSelected(false))  
  }, [])
  
  return (
    <>
     


<>

             <h1 className=" text-xl sm:text-3xl font-bold flex justify-center gap-3">
          <Bot className="animate-float  " size={40} strokeWidth={1} absoluteStrokeWidth />
          <TypeWriter text={`Whats your main goal?`} />
        </h1>

        <div
          className="flex flex-wrap flex-col gap-4 h-auto items-center"
        >


          <StartConvButton topic="heal">Fix Posture</StartConvButton>
          <StartConvButton topic="undersantd">Ease the pain</StartConvButton>
          <StartConvButton topic="signals"> Other </StartConvButton>

          <p className="text-neutral-400"> Which feels right to you?</p>

        
        </div>
           </>
    
    </>
  

  )
}