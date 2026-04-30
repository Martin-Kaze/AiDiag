import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import ProgressBar from "@/components/QuestioPage/ProgressBar";
import { ChipSelect } from "@/components/QuestioPage/ChipSelect";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full ">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

       <ChipSelect question="Please describe your daily activity level" chips={['Mostly sitting', 'Mix of sitting & moving', 'On my feet all day']}  type="8" route="/questions/scary" />
            <ProgressBar/>

        
        
      </main>

      <Footer/>

    </div>
  );
}