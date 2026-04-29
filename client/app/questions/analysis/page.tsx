'use client'
import { Menu } from "@/components/ForAllPage/Menu";
import { useMyLogic } from "@/lib/useMyLogic";
import { Bot } from "lucide-react";
import ProgressBar from "@/components/QuestioPage/ProgressBar";
import PostureChecker from "../../../components/QuestioPage/PostureChecker";
import ButtonPushRoute from "@/components/QuestioPage/ButtonPushRoute";
export default function Home() {
  useMyLogic();



  return (
    <div className="flex flex-col min-h-screen w-full items-center">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

       <Bot className="absolute self-center" size={50}/>
         
        <PostureChecker/>
          
          <ProgressBar/>
        
      <ButtonPushRoute classname="bg-neutral-600 w-fit self-center" text="Skip (Not Recommeded)" route="/questions/6" dispatcher={ {key: 'skipped', value: true}}/>

      </main>

      <footer className="border-t p-2 ">
        <p className="text-neutral-700">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}