"use client"
import { Button } from "../ui/button"
import { useDispatch,  } from "react-redux"
import { SetSelected } from "@/state/slices/UserInputSlice" 
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation';

export  function StartConvButton(props: { 
  children: React.ReactNode
  topic: "heal" | "undersantd" | "signals"
  className?: string
}) {
  const router = useRouter();
   const dispatch = useDispatch();
  return (
   
    <Button 
      onClick={() => {
      dispatch(SetSelected(props.topic));
      }
    }
     className={cn(
  "flex-1 w-[50%] text-nowrap h-auto py-1 ",
  props.className, 
  
)}
    >
      {props.children}
    </Button>
  )
}
