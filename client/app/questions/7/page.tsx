import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import ProgressBar from "@/components/QuestioPage/ProgressBar";
import { ChipSelect } from "@/components/QuestioPage/ChipSelect";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full ">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto">

       <ChipSelect question="How is your posture affecting you day-to-day?" chips={['Pain or discomfort', 'Low energy', 'Affects my confidence', 'Not sure yet']}  type="7" route="/questions/8" />
            <ProgressBar/>

        
        
      </main>

      <Footer/>

    </div>
  );
}