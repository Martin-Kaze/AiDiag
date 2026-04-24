'use client'
import { Menu } from "@/components/ForAllPage/Menu";
import ProgressBar from "@/components/ForAllPage/ProgressBar";
import ProvidePersonalInfo from "@/components/QuestioPage/ProvidePersonalInfo";
import { useMyLogic } from "@/lib/useMyLogic";
export default function Home() {
  useMyLogic();
  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

       
            hello
        
        
      </main>

      <footer className="border-t p-2 ">
        <p className="text-neutral-700">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}