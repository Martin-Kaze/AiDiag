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
          <TypeWriter text={`Where do you want to start?`} />
        </h1>

        <div
          className="flex flex-wrap flex-col gap-4 h-auto items-center"
        >


          <StartConvButton topic="heal">I want to heal</StartConvButton>
          <StartConvButton topic="undersantd">I want to understand</StartConvButton>
          <StartConvButton topic="signals">I feel it in my body</StartConvButton>

          <p className="text-neutral-400"> Which feels right to you?</p>

        
        </div>
           </>
      )}
    </>
  

  )
}