"use client"
import { useSelector , useDispatch } from "react-redux";
import { StartConvButton } from "./StartConvButton";
import { SetSelected } from "@/state/slices/UserInputSlice";
import TypeWriter from "./TypeWriter";
import { Bot } from "lucide-react";
import { RootState, AppDispatch } from "@/state/store";
import { useEffect } from "react";

export default function StartConvButtonGroup(){ 

  const selected = useSelector((state: RootState) => state.UserInputReducer.Selected);
  const dispatch : AppDispatch = useDispatch();

  useEffect(() => {
  dispatch(SetSelected(false))  
  }, [])
  
  return (
    <>
     {!selected && (


<>

             <h1 className=" text-xl sm:text-3xl font-bold flex justify-center gap-3">
          <Bot className="animate-float  " size={40} strokeWidth={1} absoluteStrokeWidth />
          <TypeWriter text={`What option resonates with you the most in this moment?`} />
        </h1>

        <div
          className="flex flex-wrap flex-col gap-4 h-auto items-center"
        >


          <StartConvButton topic="heal">"I'm ready to heal, and be better"</StartConvButton>
          <StartConvButton topic="undersantd">"I want to understand my pain"</StartConvButton>
          <StartConvButton topic="signals">"My body is sending signals" </StartConvButton>

          <p className="text-neutral-400"> Choose what you want</p>

        
        </div>
           </>
      )}
    </>
  

  )
}