"use client"
import { Input } from "@/components/ui/input"
import { useSelector , useDispatch } from "react-redux";
import { increase } from "@/state/slices/ProgressSlice";
import { useState , useEffect} from "react";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import TypeWriter from "./TypeWriter";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation"



export function InputBasic() {
  const dispatch = useDispatch();
    const router = useRouter()
    useEffect(() => {
    router.prefetch("/questions") // preload page
  }, [])

  const [text, setText] = useState("");
  const showText = useSelector((state: any) => state.ShowTextRedue.show);
  const [ButtonText, setButtonText] = useState<boolean>(false)
  return (
    
    <>
    
      {showText && (
        <div className="flex flex-col gap-2 w-full items-center">
          <Bot size={40}/>
          <TypeWriter text="How can I help you today?"  />
          <Input 
          maxLength={150}
            placeholder="Write here..." 
            className={cn("resize-none w-full animate-in fade-in slide-in-from-top-2 mt-5 ", text.length >= 150 ? "animate-pulse border-red-500 bg-red-100!" : "") }
            style={{ backgroundColor: 'white' }} 
            onChange={(e) => {
             setText( e.target.value); 
            const hasText = e.target.value.length > 0;
            if (hasText !== ButtonText) {
    setButtonText(hasText);
  }
}
              
              }
          />
          <p className="text-neutral-500"> {ButtonText ? 'Keep it brief 150 characters max' : 'Your answer helps us personalise your experience'} </p>
        <Button 
        type="submit"
        onClick={() => {
            router.push("/questions");
             dispatch(increase(10))
        } }      
        > {ButtonText ? 'SUMMIT' : 'SKIP'} </Button>
        
        </div>
      )}
    </>
  );
}