
import FirstQuestion from "@/app/questions/1/FirstQuestion"; 
import { Menu } from "@/components/ForAllPage/Menu";
import ProgressBar from "@/components/QuestioPage/ProgressBar";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

       
        <FirstQuestion/>
        <ProgressBar/>
        
      </main>

      <footer className="border-t p-2 ">
        <p className="text-neutral-700">© 2026 Wellness.chat</p>
      </footer>

    </div>
  );
}