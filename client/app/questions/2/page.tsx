import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import ProgressBar from "@/components/QuestioPage/ProgressBar";
import { SecondQuestion } from "./SecondQuestion"; 
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full ">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

       
            <SecondQuestion/>
            <ProgressBar/>
        
        
      </main>

      <Footer/>
    </div>
  );
}