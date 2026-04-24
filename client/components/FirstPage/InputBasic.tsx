"use client"
import { Input } from "@/components/ui/input"
import { useSelector , useDispatch } from "react-redux";
import { SetExplained } from "@/state/slices/UserInputSlice";
import { useState , useEffect} from "react";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import TypeWriter from "./TypeWriter";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation"
import { AppDispatch, RootState } from "@/state/store";


const TOPIC_CHIPS: Record<string, string[]> = {
  heal:        ["Low mood", "Anxiety", "Poor sleep", "Stress"],
  undersantd:  ["Low energy", "Pain", "Fitness", "Weight"],
  signals:     ["Mind & body", "Habits", "All of the above"],
};

export function InputBasic() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const topic = useSelector((state: RootState) => state.UserInputReducer.Selected);
  const [selected, setSelected] = useState('');

  const handleSubmit = (chip: string) => {
    dispatch(SetExplained(chip));
    fetch('/api/symptoms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initalinput: chip }),
    });
    router.push('/questions/aboutyou');
  };

  if (!topic) return null;

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <Bot size={36} />
      <TypeWriter text="What's the main thing?" />
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {TOPIC_CHIPS[topic]?.map((chip) => (
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