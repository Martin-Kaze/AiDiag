"use client"
import { Button } from "../../../components/ui/button"
import { useDispatch,  } from "react-redux"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation';
import { setField } from "@/state/slices/UserInputSlice";

export  function StartConvButton(props: { 
  children: React.ReactNode
  topic: "posture" | "pain" | "other"
  className?: string
  route : string
}) {
  const router = useRouter();
   const dispatch = useDispatch();
  return (
   
    <Button 
      onClick={() => {
      dispatch(setField( { key : '1' , value: props.topic }) );
      router.push('/questions/2');
      }
    }
     className={cn(
  "flex-1 w-full text-nowrap h-auto py-1 ",
  props.className, 
  
)}
    >
      {props.children}
    </Button>
  )
}
