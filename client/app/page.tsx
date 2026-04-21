
import { StartConvButton} from "@/components/Buttons/StartConvButton";
import StartConvButtonGroup from "@/components/StartConvButtonGroup/StartConvButtonGroup";
import { Menu } from "@/components/Menu";
import { InputBasic } from "@/components/Input/InputBasic"; 
import { Textarea } from "@/components/ui/textarea"
import { Bot, HandFist, HeartPulse } from "lucide-react";
import TypeWriter from "@/components/TypeWriter";
import Test from "@/components/test";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

       
       
        <StartConvButtonGroup/>

        <InputBasic />

     
        
      </main>

      <footer className="border-t p-2 ">
        <p className="text-neutral-700">© 2026 Wellness</p>
      </footer>

    </div>
  );
}