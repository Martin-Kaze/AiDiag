
import StartConvButton from "@/components/Buttons/StartConvButton";
import { Menu } from "@/components/Menu";
import { Textarea } from "@/components/ui/textarea"
import { Bot } from "lucide-react";
import TypeWriter from "@/components/TypeWriter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">
       
        <h1 className=" text-2xl font-bold flex items-center gap-3">
  <Bot className="animate-float" size={40} strokeWidth={1} absoluteStrokeWidth  />
 < TypeWriter text={'How can I help you today?'}/>
</h1>
        
        <div className="flex flex-wrap gap-4">
          <StartConvButton topic="support">Find Support</StartConvButton>
           <StartConvButton topic="heal">Start Healing</StartConvButton>
          <StartConvButton topic="clarity">Find Clarity</StartConvButton>
         
        </div>


        <div >
         Choose between these...
        </div>

        <Textarea disabled={true} placeholder="Write here..." rows={4} className="resize-none w-full" />
        
 

      </main>

      <footer className="border-t p-2 bg-background">
        <p className="text-neutral-700">© 2026 Wellness</p>
      </footer>
    </div>
  );
}