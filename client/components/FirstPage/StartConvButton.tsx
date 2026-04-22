"use client"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { TurnOn, TurnOff, SetTopic} from "@/state/slices/ShowTextSlice"
import { increase } from "@/state/slices/ProgressSlice"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation';

export  function StartConvButton(props: { 
  children: React.ReactNode
  topic: "I need to understand my pain" | "I need to be healed" | "I need to know my body signals"
  className?: string
}) {
  const router = useRouter();
   const dispatch = useDispatch();
  return (
   
    <Button 
      onClick={() => {
      dispatch(TurnOn());
      dispatch(SetTopic(props.topic));
      dispatch(increase(10))
     
      }
    }
     className={cn(
  "flex-1 w-[50%] whitespace-normal h-auto py-1 ",
  props.className, 
  
)}
    >
      {props.children}
    </Button>
  )
}
