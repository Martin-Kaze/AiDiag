"use client"

import { useSelector , useDispatch } from "react-redux";
import { useState , useEffect} from "react";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import TypeWriter from "@/components/QuestioPage/TypeWriter";
import { setField } from "@/state/slices/UserInputSlice";
import { useRouter } from "next/navigation"
import { AppDispatch, RootState } from "@/state/store";


const TOPIC_CHIPS: Record<string, string[]> = {
  pain:       ["Neck", "Shoulders", "Back", "Spine",  "All",  "Other"],
  posture: ["Neck", "Shoulders", "Back", "Spine",  "All", 'Head',  "Other"],
  other:    ["Head pain", "Energy loss", "Brain fog", "Bad Habits", "Other"],
};

export function SecondQuestion() {
  
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const topic = useSelector((state: RootState) => state.UserInputReducer.selections);
  const activeTopic = topic[1];
  
  const [selected, setSelected] = useState('');

  const handleSubmit = (chip: string) => {
    dispatch(setField( {key: "2", value :chip }));
    router.push('/questions/3');
  };


  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Bot size={36} />
      <TypeWriter text="What's the main thing?" />
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {TOPIC_CHIPS[activeTopic]?.map((chip) => (
          <button
            key={chip}
            onClick={() => handleSubmit(chip)}
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