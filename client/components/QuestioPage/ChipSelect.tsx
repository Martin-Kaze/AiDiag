"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import TypeWriter from "../FirstPage/TypeWriter"; 
import { SetInfo2 } from "@/state/slices/UserInputSlice";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

interface ChipSelectProps {
  question: string;
  chips: string[];
  type: string;
  route : string
}

export function ChipSelect({ question, chips, type, route }: ChipSelectProps) {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();
const router = useRouter();
  const handleSelect = (chip: string) => {
    setSelected(chip);
    
    if (type === 'Info2') dispatch(SetInfo2(chip));
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Bot size={36} />
      <TypeWriter text={question} />
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => {handleSelect(chip), router.push(route) }}
            className={cn(
              "px-4 py-2 rounded-full border text-sm transition-all",
              selected === chip
                ? "bg-black text-white border-black"
                : "bg-white text-black border-neutral-300 hover:border-black"
            )}
          >
            {chip}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Tap one to continue</p>
    </div>
  );
}