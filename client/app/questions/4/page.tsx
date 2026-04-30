
import { Menu } from "@/components/ForAllPage/Menu";
import { Footer } from "@/components/ForAllPage/Footer";
import ProgressBar from "@/components/QuestioPage/ProgressBar";
import ButtonPushRoute from "@/components/QuestioPage/ButtonPushRoute";

import { Bot } from "lucide-react";
import QuestionPhoto from "@/components/QuestioPage/QuestionPhoto";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen w-full">

      <header className="w-full"><Menu /></header>

      <main className="flex flex-1 flex-col gap-6 p-8 max-w-3xl w-full mx-auto  ">
   
        <div className="flex flex-col justify-center items-center">
   
      <p className="text-3xl font-bold text-center"> How far can you bend seated?</p>
        </div>
        
  <div className="border-2 bg-white px-5 rounded-2xl pb-2">
<QuestionPhoto image={["/images/siting-1.png" , "/images/siting-2.png" , "/images/siting-3.png"]} route={'questions/stading'} questionNr="4"/>

  </div>

    <ButtonPushRoute route='/questions/5' classname="" text='NEXT'/>
    
    <ProgressBar />
      </main>

     <Footer/>

    </div>
  );
}